import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { products } from '../src/data/products.js'
// Browser checks run against the local dev server; no remote browser dependency.
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage()
const errors = []
page.on('pageerror', e => errors.push(e.message))
const base = 'http://127.0.0.1:5173'
const routes = ['/', '/catalog', '/about', '/delivery', '/contacts', '/privacy', ...products.map(p => '/catalog/' + p.slug), '/catalog/missing', '/missing']
try {
 for (const width of [375, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  for (const route of routes) {
   await page.goto(base + route)
   await page.locator('h1').waitFor()
   assert.equal(await page.locator('h1').count(), 1, route)
   assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow ${width}: ${route}`)
  }
  await page.goto(base)
  await page.locator('.hero-photo img').waitFor()
  await page.screenshot({ path: `tests/home-${width}.png`, fullPage: true })
 }
 await page.setViewportSize({ width: 375, height: 812 })
 await page.goto(base)
 await page.getByRole('button', { name: 'Открыть меню' }).click()
 await page.locator('#mobile-menu').getByRole('link', { name: 'Каталог', exact: true }).click()
 await page.waitForURL('**/catalog')
 assert.equal(await page.locator('#mobile-menu').count(), 0)
 await page.getByRole('button', { name: 'Яркие акценты' }).click()
 assert.equal(await page.locator('.product-card').count(), products.filter(p => p.tags.includes('bright')).length)
 await page.reload()
 assert.equal(await page.getByRole('button', { name: 'Яркие акценты' }).getAttribute('aria-pressed'), 'true')
 await page.goto(base + '/catalog/red-classic')
 await page.getByRole('button', { name: 'Показать фото 2', exact: true }).click()
 assert.equal(await page.locator('.gallery-main img').getAttribute('src'), products[0].images[1])
 await page.locator('.product-info').getByRole('link', { name: 'Написать мастеру' }).click()
 await page.waitForURL('**/contacts?product=*')
 assert.match(await page.locator('.notice').innerText(), /Красная классика/)
 await page.goto(base + '/catalog')
 for (const image of await page.locator('.product-card img').all()) {
  await image.scrollIntoViewIfNeeded()
  await image.evaluate(img => img.decode())
 }
 assert.deepEqual(errors, [])
 console.log(`PASS: ${routes.length} routes × 3 widths; menu, filters, reload, gallery, CTA, images; no overflow or JS errors.`)
} finally { await browser.close() }
