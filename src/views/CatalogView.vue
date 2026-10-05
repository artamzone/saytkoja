<script setup>
import { content } from '../data/content'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { visibleProducts as products } from '../data/products'
import { visibleCategories as categories } from '../data/categories'
import ProductGrid from '../components/catalog/ProductGrid.vue'
const route = useRoute()
const router = useRouter()
const active = computed(() => categories.some(c => c.id === route.query.category) ? route.query.category : 'all')
const filtered = computed(() => active.value === 'all' ? products : products.filter(p => p.category === active.value || p.tags?.includes(active.value)))
function select(category) { router.replace({ query: category === 'all' ? {} : { category } }) }
</script>
<template><section class="section container page-section"><p class="eyebrow">{{ content.catalog.eyebrow }}</p><h1>{{ content.catalog.title }}</h1><p class="page-intro">{{ content.catalog.intro }}</p><div class="filters" :aria-label="content.catalog.filterLabel"><button :aria-pressed="active === 'all'" @click="select('all')">{{ content.catalog.all }}</button><button v-for="category in categories" :key="category.id" :aria-pressed="active === category.id" @click="select(category.id)">{{ category.title }}</button></div><p class="result-count" aria-live="polite">{{ content.catalog.count }}{{ filtered.length }}</p><ProductGrid :products="filtered" /></section></template>