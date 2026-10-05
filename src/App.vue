<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import ContactSection from './components/home/ContactSection.vue'
</script>
<template><a class="skip-link" href="#main">К содержимому</a><Header /><main id="main" tabindex="-1"><RouterView /><ContactSection v-if="$route.name !== 'contacts' && $route.name !== 'privacy' && $route.name !== 'not-found'" /></main><Footer /></template>