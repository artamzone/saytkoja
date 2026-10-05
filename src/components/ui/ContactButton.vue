<script setup>
import { computed } from 'vue'
import { content } from '../../data/content'
import BaseButton from './BaseButton.vue'
import { contactLink } from '../../utils/contact'
const props = defineProps({ title: String, outline: Boolean })
const link = computed(() => contactLink(props.title))
</script>
<template><BaseButton :href="link || undefined" :disabled="!link" :outline="outline">{{ content.contact.buttonText }}</BaseButton></template>