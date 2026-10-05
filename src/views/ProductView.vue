<script setup>
import { content } from '../data/content'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { visibleProducts as products } from '../data/products'
import ProductGallery from '../components/catalog/ProductGallery.vue'
import ProductInfo from '../components/catalog/ProductInfo.vue'
import ProductGrid from '../components/catalog/ProductGrid.vue'
import NotFoundView from './NotFoundView.vue'
const route = useRoute()
const product = computed(() => products.find(p => p.slug === route.params.slug))
const related = computed(() => products.filter(p => p.id !== product.value?.id).sort((a,b) => Number(b.category === product.value?.category) - Number(a.category === product.value?.category)).slice(0,3))
</script>
<template><template v-if="product"><section class="container section page-section"><nav class="breadcrumbs" :aria-label="content.product.breadcrumbLabel"><RouterLink to="/catalog">{{ content.product.catalogLink }}</RouterLink><span>/</span><span>{{ product.title }}</span></nav><div class="product-layout"><ProductGallery :images="product.images" :title="product.title" /><ProductInfo :product="product" /></div></section><section class="section container"><h2 class="mb-8">{{ content.product.relatedTitle }}</h2><ProductGrid :products="related" /></section></template><NotFoundView v-else /></template>