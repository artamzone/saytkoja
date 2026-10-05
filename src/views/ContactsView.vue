<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Send, Phone, ArrowUpRight } from 'lucide-vue-next'
import { siteConfig } from '../data/siteConfig'
import { contactLink, contactMessage } from '../utils/contact'
const route = useRoute()
const title = computed(() => typeof route.query.product === 'string' ? route.query.product : '')
const message = computed(() => contactMessage(title.value))
const copied = ref('')
async function copy() {
 try { await navigator.clipboard.writeText(message.value); copied.value = 'Сообщение скопировано' }
 catch { copied.value = 'Выделите и скопируйте сообщение вручную.' }
}
</script>
<template><section class="section container page-section contacts-page"><p class="eyebrow">ДАВАЙТЕ ПОЗНАКОМИМСЯ</p><h1>Ваша история<br>начинается <em>с разговора</em></h1><p class="page-intro">Поможем выбрать модель и обсудим ваши идеи.</p><div class="contact-options"><div><Send /><h2>Telegram</h2><a v-if="siteConfig.telegram" :href="contactLink(title)" class="text-link">Написать мастеру <ArrowUpRight :size="17" /></a><p v-else>Контакт скоро появится</p></div><div><span class="vk-icon">vk</span><h2>ВКонтакте</h2><a v-if="siteConfig.vk" :href="siteConfig.vk" class="text-link">Открыть диалог ↗</a><p v-else>Контакт скоро появится</p></div><div><Phone /><h2>Телефон</h2><a v-if="siteConfig.phone" :href="'tel:' + siteConfig.phone.replace(/[^+\d]/g, '')">{{ siteConfig.phone }}</a><p v-else>Номер скоро появится</p></div></div><div v-if="title" class="notice"><h2>Ваше сообщение мастеру</h2><p>{{ message }}</p><button class="text-link" @click="copy">Скопировать сообщение ↗</button><p role="status">{{ copied }}</p></div><p v-if="!siteConfig.telegram && !siteConfig.vk" class="fine-print">Сайт готовится к открытию. Контакты мастерской ещё не опубликованы.</p></section></template>