<script setup>
import { ref, watch } from 'vue'
const props = defineProps({ images: Array, title: String })
const selected = ref(0)
watch(() => props.images, () => { selected.value = 0 })
</script>
<template><div class="gallery"><div class="gallery-main"><img :src="images[selected]" :alt="title + ' — фото ' + (selected + 1)"></div><div class="gallery-thumbnails" aria-label="Фотографии изделия"><button v-for="(src, index) in images" :key="src" :aria-label="'Показать фото ' + (index + 1)" :aria-pressed="selected === index" @click="selected = index"><img :src="src" :alt="title + ', ракурс ' + (index + 1)" loading="lazy"></button></div></div></template>