import assert from 'node:assert/strict'
import fs from 'node:fs'
import { chromium } from '@playwright/test'
import { siteConfig } from '../src/data/site.js'
import { products } from '../src/data/products.js'
import { categories } from '../src/data/categories.js'
import { content } from '../src/data/content.js'
import { contactLink, contactMessage } from '../src/utils/contact.js'

const saved = { ...siteConfig }
try {
  for (const channel of ['telegram', 'vk', 'max', 'phone', 'email']) siteConfig[channel] = ''
  assert.equal(contactLink('Тест'), null)
  siteConfig.telegram = 'https://t.me/test'
  siteConfig.vk = 'https://vk.me/test'
  const message = 'Здравствуйте! Мне понравилось изделие «Тест». Хотел(а) бы узнать подробнее.'
  assert.equal(contactMessage('Тест'), message)
  assert.equal(new URL(contactLink('Тест')).searchParams.get('text'), message)
  assert.equal(new URL(contactLink('Тест', 'vk')).hostname, 'vk.me')
  assert.equal(new URL(contactLink('Тест', 'vk')).searchParams.get('text'), message)
  siteConfig.telegram = 'не ссылка'
  assert.equal(contactLink('Тест', 'telegram'), null)
  siteConfig.phone = '+7 (999) 123-45-67'
  assert.equal(contactLink(null, 'phone'), 'tel:+79991234567')
} finally {
  Object.assign(siteConfig, saved)
}

function checkImages(value) {
  if (typeof value === 'string' && value.startsWith('/images/')) assert.ok(fs.existsSync('public' + value), value)
  else if (Array.isArray(value)) value.forEach(checkImages)
  else if (value && typeof value === 'object') Object.values(value).forEach(checkImages)
}
checkImages([products, categories, content, siteConfig])

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const base = 'http://127.0.0.1:5173'
try {
  const context = await browser.newContext()
  // Override served data only: original files remain unchanged.
  await context.route('**/src/data/products.js*', async route => {
    const response = await route.fetch()
    const body = (await response.text()).replace('"visible": true', '"visible": false').replaceAll('"featured": true', '"featured": false')
    await route.fulfill({ response, body })
  })
  await context.route('**/src/data/categories.js*', async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace('"visible": true', '"visible": false') })
  })
  const page = await context.newPage()
  await page.goto(base)
  await page.locator('h1').waitFor()
  assert.equal(await page.locator('.popular .product-card').count(), 0)
  assert.equal(await page.locator('.category-card').count(), categories.length - 1)
  await page.goto(base + '/catalog')
  await page.locator('h1').waitFor()
  assert.equal(await page.locator('.product-card').count(), products.length - 1)
  assert.equal(await page.getByRole('button', { name: categories[0].title, exact: true }).count(), 0)
  await page.goto(base + '/catalog/' + products[0].slug)
  await page.getByRole('heading', { name: content.notFound.title, exact: true }).waitFor()
  assert.ok((await page.title()).startsWith(content.seo.productNotFound))
  await page.goto(base + '/catalog/' + products[1].slug)
  await page.locator('.product-info').waitFor()
  assert.equal(await page.locator('.product-card a[href="/catalog/' + products[0].slug + '"]').count(), 0)
  await context.close()

  const contactsContext = await browser.newContext()
  await contactsContext.route('**/src/data/site.js*', async route => {
    const response = await route.fetch()
    const body = (await response.text())
      .replace(/telegram:\s*["']{2}/, 'telegram: "https://t.me/test"')
      .replace(/vk:\s*["']{2}/, 'vk: "https://vk.me/test"')
    await route.fulfill({ response, body })
  })
  const contactsPage = await contactsContext.newPage()
  await contactsPage.goto(base + '/catalog/' + products[0].slug)
  await contactsPage.locator('.product-info a.button').waitFor()
  const cardLink = new URL(await contactsPage.locator('.product-info a.button').getAttribute('href'))
  assert.equal(cardLink.hostname, 't.me')
  assert.equal(cardLink.searchParams.get('text'), contactMessage(products[0].title))
  await contactsPage.goto(base + '/contacts?product=' + encodeURIComponent(products[0].title))
  await contactsPage.locator('.contact-options a').first().waitFor()
  const links = await contactsPage.locator('.contact-options a').evaluateAll(elements => elements.map(a => a.href))
  assert.deepEqual(links.map(link => new URL(link).hostname), ['t.me', 'vk.me'])
  for (const link of links) assert.equal(new URL(link).searchParams.get('text'), contactMessage(products[0].title))
  await contactsContext.close()
  console.log('PASS: data photo paths, contact helper/message, empty and filled contacts, independent Telegram/VK, visible/featured flags, hidden category, direct product route and related products.')
} finally {
  await browser.close()
}
