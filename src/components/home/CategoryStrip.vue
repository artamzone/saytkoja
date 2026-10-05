<script setup>
import { categories } from '../../data/products'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
<template><section id="collections" class="section container"><SectionTitle eyebrow="НАЙДИТЕ СВОЁ" title="Для разных граней вас" /><div class="category-strip"><RouterLink v-for="category in categories" :key="category.id" :to="{ path: '/catalog', query: { category: category.id } }" class="category-card"><div class="image-frame"><img :src="category.image" :alt="category.title" width="721" height="1280" loading="lazy"></div><h3>{{ category.title }}</h3><p>{{ category.caption }}</p><span class="text-link">Смотреть <span>↗</span></span></RouterLink></div></section></template>