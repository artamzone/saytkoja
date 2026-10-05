<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
defineProps({ to: String, href: String, outline: Boolean })
</script>
<template>
  <component :is="to ? RouterLink : href ? 'a' : 'button'" v-bind="to ? { to } : href ? { href } : { type: 'button' }" :class="['button', { 'button-outline': outline }]"><slot /><ArrowUpRight :size="17" aria-hidden="true" /></component>
</template>