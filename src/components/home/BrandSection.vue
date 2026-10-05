<script setup>
import BaseButton from '../ui/BaseButton.vue'
import { photo } from '../../data/products'
</script>
<template><section class="section container brand-section"><img :src="photo('22-12-52')" alt="Карамельная замшевая сумка в повседневном осеннем образе" loading="lazy" width="853" height="1280"><div><p class="eyebrow">О МАСТЕРСКОЙ</p><h2>Наша мастерская —<br><em>ваши истории</em></h2><p class="body-copy">Мы верим, что любимые вещи не случайны. Они отражают ваш характер, хранят воспоминания и со временем становятся только ближе.</p><p class="body-copy">Натуральные материалы, ручная работа и личный диалог. Обсудим форму, оттенок и детали — чтобы сумка стала по-настоящему вашей.</p><BaseButton to="/about" outline>Познакомиться с мастером</BaseButton></div></section></template>