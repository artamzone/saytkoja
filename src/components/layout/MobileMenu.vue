<script setup>
import { navigation } from '../../data/siteConfig'
defineEmits(['close'])
</script>
<template><nav id="mobile-menu" class="mobile-menu" aria-label="Мобильная навигация"><RouterLink v-for="item in navigation" :key="item.to" :to="item.to" @click="$emit('close')">{{ item.label }} <span aria-hidden="true">↗</span></RouterLink></nav></template>