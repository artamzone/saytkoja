import { siteConfig } from '../data/site.js'
import { content } from '../data/content.js'

export const contactMessage = (title) => title
  ? content.contact.productMessage.replace('{title}', title)
  : content.contact.generalMessage

// Один helper для CTA и отдельных контактов. Пустые/некорректные контакты отключены.
export function contactLink(title, channel) {
  if (!channel) {
    for (const name of ['telegram', 'vk', 'max', 'phone', 'email']) {
      const link = contactLink(title, name)
      if (link) return link
    }
    return null
  }
  const value = siteConfig[channel]?.trim()
  if (!value) return null
  const message = contactMessage(title)
  if (channel === 'phone') {
    const number = value.replace(/[^+\d]/g, '')
    return /\d/.test(number) ? `tel:${number}` : null
  }
  if (channel === 'email') return `mailto:${value}?body=${encodeURIComponent(message)}`
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    url.searchParams.set('text', message)
    return url.href
  } catch {
    return null
  }
}
