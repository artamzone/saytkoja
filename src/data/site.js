// Контакты: полные HTTPS-ссылки. Пустое значение отключает соответствующую кнопку.
export const siteConfig = {
  brandName: 'Мастерская',
  brandMark: 'м.',
  tagline: 'КОЖАНЫЕ ИСТОРИИ',
  phone: '',
  telegram: '', // https://t.me/username
  vk: '', // https://vk.me/community
  max: '',
  email: '',
  city: '',
  address: '',
  siteUrl: '', // Публичный домен без завершающего слеша.
  seo: {
    title: 'Сумки ручной работы',
    description: 'Сумки ручной работы из натуральной кожи. Познакомьтесь с коллекцией и обсудите своё изделие с мастером.',
    image: '/images/products/photo_2026-10-05_22-13-02.jpg',
  },
}
export const brandName = siteConfig.brandName
export const navigation = [
  { label: 'Каталог', to: '/catalog' },
  { label: 'Коллекции', to: '/#collections', footer: false },
  { label: 'О мастере', to: '/about' },
  { label: 'Доставка', to: '/delivery' },
  { label: 'Контакты', to: '/contacts' },
]
