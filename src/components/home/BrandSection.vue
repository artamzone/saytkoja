<script setup>
import { content } from '../../data/content'
import BaseButton from '../ui/BaseButton.vue'
</script>
<template><section class="section container brand-section"><img :src="content.aboutPreview.image" :alt="content.aboutPreview.imageAlt" loading="lazy" width="853" height="1280"><div><p class="eyebrow">{{ content.aboutPreview.eyebrow }}</p><h2>{{ content.aboutPreview.titleStart }}<br><em>{{ content.aboutPreview.titleEmphasis }}</em></h2><p class="body-copy">{{ content.aboutPreview.text }}</p><p class="body-copy">{{ content.aboutPreview.secondText }}</p><BaseButton :to="content.aboutPreview.buttonTo" outline>{{ content.aboutPreview.buttonText }}</BaseButton></div></section></template>