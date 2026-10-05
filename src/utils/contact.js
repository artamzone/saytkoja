import { siteConfig } from '../data/siteConfig'
export const contactMessage = (title) => title
  ? `Здравствуйте! Мне понравилось изделие "${title}". Хотел(а) бы узнать подробнее.`
  : 'Здравствуйте! Хотел(а) бы узнать больше о ваших изделиях.'
export function contactLink(title) {
  const message = contactMessage(title)
  if (siteConfig.telegram) {
    const url = new URL(siteConfig.telegram)
    url.searchParams.set('text', message)
    return url.href
  }
  if (siteConfig.vk) {
    const url = new URL(siteConfig.vk)
    url.searchParams.set('text', message)
    return url.href
  }
  return title ? `/contacts?product=${encodeURIComponent(title)}` : '/contacts'
}
