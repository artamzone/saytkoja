<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Menu, X, Send } from 'lucide-vue-next'
import { brandName, navigation } from '../../data/siteConfig'
import { contactLink } from '../../utils/contact'
import ContactButton from '../ui/ContactButton.vue'
import MobileMenu from './MobileMenu.vue'
const open = ref(false)
const toggle = ref(null)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
function close() { open.value = false; toggle.value?.focus() }
</script>
<template><header class="site-header" @keydown.esc="close">
  <div class="container header-inner">
    <button ref="toggle" class="icon-button menu-toggle" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? 'Закрыть меню' : 'Открыть меню'" @click="open = !open"><component :is="open ? X : Menu" :size="22" /></button>
    <RouterLink to="/" class="brand" aria-label="На главную"><span class="brand-mark" aria-hidden="true">м.</span><span>{{ brandName }}<small>КОЖАНЫЕ ИСТОРИИ</small></span></RouterLink>
    <nav class="desktop-nav" aria-label="Основная навигация"><RouterLink v-for="item in navigation" :key="item.to" :to="item.to">{{ item.label }}</RouterLink></nav>
    <ContactButton class="header-contact" outline />
    <component :is="contactLink().startsWith('/') ? RouterLink : 'a'" v-bind="contactLink().startsWith('/') ? { to: contactLink() } : { href: contactLink() }" class="icon-button mobile-contact" aria-label="Связаться с мастером"><Send :size="21" /></component>
  </div><MobileMenu v-if="open" @close="close" />
</header></template>