<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Menu, X, Send } from 'lucide-vue-next'
import { brandName, siteConfig, navigation } from '../../data/site'
import { content } from '../../data/content'
import { contactLink } from '../../utils/contact'
import ContactButton from '../ui/ContactButton.vue'
import MobileMenu from './MobileMenu.vue'
const link = computed(() => contactLink())
const open = ref(false)
const toggle = ref(null)
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
function close() { open.value = false; toggle.value?.focus() }
</script>
<template><header class="site-header" @keydown.esc="close">
  <div class="container header-inner">
    <button ref="toggle" class="icon-button menu-toggle" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? content.header.closeMenu : content.header.openMenu" @click="open = !open"><component :is="open ? X : Menu" :size="22" /></button>
    <RouterLink to="/" class="brand" :aria-label="content.header.homeLabel"><span class="brand-mark" aria-hidden="true">{{ siteConfig.brandMark }}</span><span>{{ brandName }}<small>{{ siteConfig.tagline }}</small></span></RouterLink>
    <nav class="desktop-nav" :aria-label="content.header.navigationLabel"><RouterLink v-for="item in navigation" :key="item.to" :to="item.to">{{ item.label }}</RouterLink></nav>
    <ContactButton class="header-contact" outline />
    <component :is="link ? 'a' : 'button'" :href="link || undefined" :disabled="!link" class="icon-button mobile-contact" :aria-label="content.header.contactLabel"><Send :size="21" /></component>
  </div><MobileMenu v-if="open" @close="close" />
</header></template>