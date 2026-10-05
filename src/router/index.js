import { createRouter, createWebHistory } from 'vue-router'
import { brandName, siteConfig } from '../data/site'
import { content } from '../data/content'
import { visibleProducts as products } from '../data/products'
const router = createRouter({
 history: createWebHistory(),
 routes: [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: siteConfig.seo.title } },
  { path: '/catalog', name: 'catalog', component: () => import('../views/CatalogView.vue'), meta: { title: content.seo.catalog } },
  { path: '/catalog/:slug', name: 'product', component: () => import('../views/ProductView.vue') },
  ...[['about',content.seo.about,'About'],['delivery',content.seo.delivery,'Delivery'],['contacts',content.seo.contacts,'Contacts'],['privacy',content.seo.privacy,'Privacy']].map(([path,title,view]) => ({ path: '/' + path, name: path, component: { About: () => import('../views/AboutView.vue'), Delivery: () => import('../views/DeliveryView.vue'), Contacts: () => import('../views/ContactsView.vue'), Privacy: () => import('../views/PrivacyView.vue') }[view], meta: { title } })),
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: content.seo.notFound } },
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
 const title = (product?.title || to.meta.title || content.seo.productNotFound) + ' — ' + brandName
 const description = product?.shortDescription || siteConfig.seo.description
 document.title = title
 document.querySelector('meta[name="description"]').content = description
 document.querySelector('meta[property="og:title"]').content = title
 document.querySelector('meta[property="og:description"]').content = description
 document.querySelector('meta[property="og:image"]').content = siteConfig.siteUrl + (product?.images[0] || siteConfig.seo.image)
})
export default router
