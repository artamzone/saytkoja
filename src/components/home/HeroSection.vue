<script setup>
import { computed } from 'vue'
import { content } from '../../data/content'
import { visibleProducts } from '../../data/products'
import { ArrowDown, Sparkles, Leaf, MapPin } from 'lucide-vue-next'
import BaseButton from '../ui/BaseButton.vue'
// Не оставляем ссылку на скрытое изделие в hero.
const imageLink = computed(() => content.hero.imageLink.startsWith('/catalog/') &&
  !visibleProducts.some(product => content.hero.imageLink === '/catalog/' + product.slug)
  ? content.hero.buttonTo : content.hero.imageLink)
</script>
<template><section class="hero container"><div class="hero-copy"><p class="eyebrow"><span class="tiny-line"></span> {{ content.hero.eyebrow }}</p><h1>{{ content.hero.titleStart }}<br><em>{{ content.hero.titleEmphasis }}</em>{{ content.hero.titleEnd }}<span class="accent-dot">.</span></h1><p class="hero-description">{{ content.hero.textStart }}<br>{{ content.hero.textEnd }}</p><BaseButton :to="content.hero.buttonTo">{{ content.hero.buttonText }}</BaseButton><div class="hero-note"><span>{{ content.hero.noteNumber }}</span> {{ content.hero.note }}</div></div><div class="hero-photo"><img :src="content.hero.image" width="853" height="1280" :alt="content.hero.imageAlt" fetchpriority="high"><div class="photo-label"><span>{{ content.hero.imageLabel }}</span><RouterLink :to="imageLink" :aria-label="content.hero.imageLinkLabel">↗</RouterLink></div></div></section><div class="container benefits"><span><MapPin />{{ content.hero.benefitOrigin }}</span><span><Leaf />{{ content.hero.benefitMaterial }}</span><span><Sparkles />{{ content.hero.benefitHandmade }}</span><a :href="content.hero.discoverTo" class="discover" :aria-label="content.hero.discoverLabel"><ArrowDown /></a></div></template>