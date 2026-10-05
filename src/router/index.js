import { createRouter, createWebHistory } from 'vue-router'
import { brandName, siteConfig } from '../data/siteConfig'
import { products } from '../data/products'
const router = createRouter({
 history: createWebHistory(),
 routes: [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: 'Сумки ручной работы' } },
  { path: '/catalog', name: 'catalog', component: () => import('../views/CatalogView.vue'), meta: { title: 'Каталог изделий' } },
  { path: '/catalog/:slug', name: 'product', component: () => import('../views/ProductView.vue') },
  ...[['about','О мастерской','About'],['delivery','Доставка и заказ','Delivery'],['contacts','Контакты','Contacts'],['privacy','Конфиденциальность','Privacy']].map(([path,title,view]) => ({ path: '/' + path, name: path, component: { About: () => import('../views/AboutView.vue'), Delivery: () => import('../views/DeliveryView.vue'), Contacts: () => import('../views/ContactsView.vue'), Privacy: () => import('../views/PrivacyView.vue') }[view], meta: { title } })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Страница не найдена' } },
 ],
 scrollBehavior(to, from, saved) {
  if (saved) return saved
  if (to.hash) return { el: to.hash, top: 100 }
  if (to.path === from.path) return false
  return { top: 0 }
 }
})
router.afterEach(to => {
 const product = to.name === 'product' ? products.find(p => p.slug === to.params.slug) : null
 const title = (product?.title || to.meta.title || 'Изделие не найдено') + ' — ' + brandName
 const description = product?.shortDescription || 'Сумки ручной работы из натуральной кожи. Познакомьтесь с коллекцией и обсудите своё изделие с мастером.'
 document.title = title
 document.querySelector('meta[name="description"]').content = description
 document.querySelector('meta[property="og:title"]').content = title
 document.querySelector('meta[property="og:description"]').content = description
 document.querySelector('meta[property="og:image"]').content = siteConfig.siteUrl + (product?.images[0] || '/images/photo_2026-10-05_22-13-02.jpg')
})
export default router
