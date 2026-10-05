<script setup>
import { content } from '../../data/content'
import { visibleProducts as products } from '../../data/products'
import ProductGrid from '../catalog/ProductGrid.vue'
import SectionTitle from '../ui/SectionTitle.vue'
</script>
<template><section class="section container popular"><div class="section-top"><SectionTitle :eyebrow="content.popular.eyebrow" :title="content.popular.title" /><RouterLink :to="content.popular.linkTo" class="text-link">{{ content.popular.linkText }}</RouterLink></div><ProductGrid :products="products.filter(product => product.featured)" /></section></template>