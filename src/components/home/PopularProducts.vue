<script setup>
import { products } from '../../data/products'
import ProductGrid from '../catalog/ProductGrid.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
<template><section class="section container popular"><div class="section-top"><SectionTitle eyebrow="ВЫБОР, КОТОРЫЙ ОСТАЁТСЯ С ВАМИ" title="Популярные модели" /><RouterLink to="/catalog" class="text-link">Весь каталог ↗</RouterLink></div><ProductGrid :products="products.slice(0, 3)" /></section></template>