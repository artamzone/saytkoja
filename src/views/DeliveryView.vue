<script setup>
import { PackageCheck, Truck, MessageCircle } from 'lucide-vue-next'
const steps = [
 { icon: MessageCircle, title: 'Обсудим изделие', text: 'Уточним наличие, размер, цвет и стоимость. Если изделие нужно изготовить, мастер сообщит срок до подтверждения заказа.' },
 { icon: PackageCheck, title: 'Согласуем отправку', text: 'Перед отправкой обсудим упаковку, адрес и удобный способ получения. Особые пожелания можно сообщить мастеру.' },
 { icon: Truck, title: 'Доставим по России', text: 'Служба доставки, стоимость и сроки зависят от вашего города и согласуются индивидуально. Фиксированные тарифы пока не опубликованы.' },
]
</script>
<template><section class="section container page-section"><p class="eyebrow">ОТ МАСТЕРСКОЙ ДО ВАС</p><h1>Доставка и заказ</h1><p class="page-intro">Без сложных форм. Всё начинается с личного диалога.</p><div class="delivery-grid"><article v-for="(step, i) in steps" :key="step.title"><component :is="step.icon" :size="28" :stroke-width="1.3" /><span class="eyebrow">0{{ i + 1 }}</span><h2>{{ step.title }}</h2><p>{{ step.text }}</p></article></div><div class="notice"><h2>Важно знать</h2><p>На сайте нет онлайн-оплаты. Условия оплаты, изготовления, обмена и возврата уточняйте у мастера до оформления заказа. Фотографии передают оттенки приблизительно: цвет может отличаться в зависимости от экрана.</p></div></section></template>