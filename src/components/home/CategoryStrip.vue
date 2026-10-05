<script setup>
import { content } from '../../data/content'
import { visibleCategories as categories } from '../../data/categories'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
<template><section id="collections" class="section container"><SectionTitle :eyebrow="content.collections.eyebrow" :title="content.collections.title" /><div class="category-strip"><RouterLink v-for="category in categories" :key="category.id" :to="{ path: content.collections.linkTo, query: { category: category.id } }" class="category-card"><div class="image-frame"><img :src="category.image" :alt="category.title" width="721" height="1280" loading="lazy"></div><h3>{{ category.title }}</h3><p>{{ category.subtitle }}</p><span class="text-link">{{ content.collections.linkText }}<span>↗</span></span></RouterLink></div></section></template>