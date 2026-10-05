<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import { contactLink } from '../../utils/contact'
const props = defineProps({ title: String, outline: Boolean })
const link = computed(() => contactLink(props.title))
</script>
<template><BaseButton :to="link.startsWith('/') ? link : undefined" :href="link.startsWith('/') ? undefined : link" :outline="outline">Написать мастеру</BaseButton></template>