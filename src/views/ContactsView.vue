<script setup>
import { content } from '../data/content'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Send, Phone, ArrowUpRight } from 'lucide-vue-next'
import { siteConfig } from '../data/site'
import { contactLink, contactMessage } from '../utils/contact'
const route = useRoute()
const title = computed(() => typeof route.query.product === 'string' ? route.query.product : '')
const message = computed(() => contactMessage(title.value))
const copied = ref('')
async function copy() {
 try { await navigator.clipboard.writeText(message.value); copied.value = content.contacts.copied }
 catch { copied.value = content.contacts.copyFailed }
}
</script>
<template><section class="section container page-section contacts-page"><p class="eyebrow">{{ content.contacts.eyebrow }}</p><h1>{{ content.contacts.titleStart }}<br>{{ content.contacts.titleMiddle }}<em>{{ content.contacts.titleEmphasis }}</em></h1><p class="page-intro">{{ content.contacts.intro }}</p><div class="contact-options"><div><Send /><h2>{{ content.contacts.telegramLabel }}</h2><a v-if="contactLink(title, 'telegram')" :href="contactLink(title, 'telegram')" class="text-link">{{ content.contacts.write }}<ArrowUpRight :size="17" /></a><p v-else>{{ content.contacts.pending }}</p></div><div><span class="vk-icon">vk</span><h2>{{ content.contacts.vkLabel }}</h2><a v-if="contactLink(title, 'vk')" :href="contactLink(title, 'vk')" class="text-link">{{ content.contacts.dialog }}</a><p v-else>{{ content.contacts.pending }}</p></div><div><Phone /><h2>{{ content.contacts.phoneLabel }}</h2><a v-if="contactLink(title, 'phone')" :href="contactLink(title, 'phone')">{{ siteConfig.phone }}</a><p v-else>{{ content.contacts.phonePending }}</p></div><div v-if="contactLink(title, 'max')"><Send /><h2>{{ content.contacts.maxLabel }}</h2><a :href="contactLink(title, 'max')" class="text-link">{{ content.contacts.dialog }}</a></div><div v-if="contactLink(title, 'email')"><Send /><h2>{{ content.contacts.emailLabel }}</h2><a :href="contactLink(title, 'email')">{{ siteConfig.email }}</a></div></div><p v-if="siteConfig.city || siteConfig.address" class="body-copy">{{ siteConfig.city }} {{ siteConfig.address }}</p><div v-if="title" class="notice"><h2>{{ content.contacts.messageTitle }}</h2><p>{{ message }}</p><button class="text-link" @click="copy">{{ content.contacts.copy }}</button><p role="status">{{ copied }}</p></div><p v-if="!contactLink(title)" class="fine-print">{{ content.contacts.unavailable }}</p></section></template>