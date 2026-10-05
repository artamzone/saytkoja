<script setup>
import { content } from '../data/content'
</script>
<template><section class="section container page-section empty-page"><p class="eyebrow">{{ content.notFound.eyebrow }}</p><h1>{{ content.notFound.title }}</h1><p>{{ content.notFound.text }}</p><RouterLink to="/catalog" class="button">{{ content.notFound.linkText }}</RouterLink></section></template>