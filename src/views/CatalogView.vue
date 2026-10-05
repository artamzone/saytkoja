<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories, products } from '../data/products'
import ProductGrid from '../components/catalog/ProductGrid.vue'
const route = useRoute()
const router = useRouter()
const active = computed(() => categories.some(c => c.id === route.query.category) ? route.query.category : 'all')
const filtered = computed(() => active.value === 'all' ? products : products.filter(p => p.category === active.value || p.tags.includes(active.value)))
function select(category) { router.replace({ query: category === 'all' ? {} : { category } }) }
</script>
<template><section class="section container page-section"><p class="eyebrow">КОЖАНЫЕ ИСТОРИИ</p><h1>Каталог изделий</h1><p class="page-intro">Найдите вещь, которая откликается именно вам.</p><div class="filters" aria-label="Фильтр по категории"><button :aria-pressed="active === 'all'" @click="select('all')">Все изделия</button><button v-for="category in categories" :key="category.id" :aria-pressed="active === category.id" @click="select(category.id)">{{ category.title }}</button></div><p class="result-count" aria-live="polite">Изделий: {{ filtered.length }}</p><ProductGrid :products="filtered" /></section></template>