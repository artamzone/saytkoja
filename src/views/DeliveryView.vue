<script setup>
import { content } from '../data/content'
import { PackageCheck, Truck, MessageCircle } from 'lucide-vue-next'
const icons = { message: MessageCircle, package: PackageCheck, truck: Truck }
</script>
<template><section class="section container page-section"><p class="eyebrow">{{ content.delivery.eyebrow }}</p><h1>{{ content.delivery.title }}</h1><p class="page-intro">{{ content.delivery.intro }}</p><div class="delivery-grid"><article v-for="(step, i) in content.delivery.steps" :key="step.title"><component :is="icons[step.icon]" :size="28" :stroke-width="1.3" /><span class="eyebrow">0{{ i + 1 }}</span><h2>{{ step.title }}</h2><p>{{ step.text }}</p></article></div><div class="notice"><h2>{{ content.delivery.noticeTitle }}</h2><p>{{ content.delivery.notice }}</p></div></section></template>