export const siteConfig = {
  brandName: '', // Until filled, the neutral name «Мастерская» is displayed.
  telegram: '', // Full https://t.me/username URL.
  vk: '', // Direct conversation URL, e.g. https://vk.me/community.
  phone: '',
  siteUrl: '', // Production origin, without trailing slash.
}
export const brandName = siteConfig.brandName || 'Мастерская'
export const navigation = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Коллекции', to: '/#collections' },
  { label: 'О мастере', to: '/about' },
  { label: 'Доставка', to: '/delivery' },
  { label: 'Контакты', to: '/contacts' },
]
