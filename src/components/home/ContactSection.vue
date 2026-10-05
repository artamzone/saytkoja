<script setup>
import { content } from '../../data/content'
import ContactButton from '../ui/ContactButton.vue'
</script>
<template><section class="contact-section container"><p class="eyebrow">{{ content.contactCta.eyebrow }}</p><h2>{{ content.contactCta.title }}</h2><p>{{ content.contactCta.text }}</p><ContactButton /></section></template>