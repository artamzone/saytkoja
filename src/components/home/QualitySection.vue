<script setup>
import { photo } from '../../data/products'
const details = [
 { title: 'Натуральная кожа', image: '22-13-01', alt: 'Фактура красной натуральной кожи и ровный шов' },
 { title: 'Ручная работа', image: '22-12-55', alt: 'Прошитые голубой и молочный кожаные ремни' },
 { title: 'Продуманные детали', image: '22-13-04', alt: 'Внутренний карман на молнии в чёрной сумке' },
 { title: 'Доставка по России', image: '22-13-00', alt: 'Крупный план карабина и крепления ремня красной сумки' },
]
</script>
<template><section id="quality" class="quality-section"><div class="container quality-layout"><div><p class="eyebrow">ЦЕННОСТЬ В МЕЛОЧАХ</p><h2>Внимание<br>к каждой <em>детали</em></h2><p class="body-copy">От первого прикосновения к коже до последнего стежка. Мы создаём вещи, которые приятно держать в руках и хочется носить каждый день.</p><RouterLink to="/about" class="text-link">Наш подход ↗</RouterLink></div><div class="quality-grid"><figure v-for="detail in details" :key="detail.title"><img :src="photo(detail.image)" :alt="detail.alt" loading="lazy"><figcaption>{{ detail.title }}</figcaption></figure></div></div></section></template>