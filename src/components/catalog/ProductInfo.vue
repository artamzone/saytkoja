<script setup>
import { content } from '../../data/content'
import ContactButton from '../ui/ContactButton.vue'
defineProps({ product: Object })
</script>
<template><div class="product-info"><p class="eyebrow">{{ content.product.eyebrow }}</p><h1>{{ product.title }}</h1><p class="product-price">{{ product.price }}</p><p class="body-copy">{{ product.description }}</p><dl><div><dt>{{ content.product.material }}</dt><dd>{{ product.material }}</dd></div><div><dt>{{ content.product.size }}</dt><dd>{{ product.size }}</dd></div><div><dt>{{ content.product.colors }}</dt><dd>{{ product.colors.join(', ') }}</dd></div></dl><h2 class="small-heading">{{ content.product.details }}</h2><ul class="detail-list"><li v-for="detail in product.details" :key="detail">{{ detail }}</li></ul><ContactButton :title="product.title" /><p class="fine-print">{{ product.availability }}</p><RouterLink :to="content.product.deliveryTo" class="text-link">{{ content.product.deliveryLink }}</RouterLink></div></template>