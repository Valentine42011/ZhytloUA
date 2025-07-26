<script setup>
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import { listings } from '@/data/listings.js';

const router = useRouter();
const route = useRoute();

function goToPage(path) {
    router.push(path).catch(err => {
        console.error('Router push error:', err);
    });
}

const id = parseInt(route.params.id);
const listing = listings.find(item => item.id === id);
</script>

<template>
    <div class="p-6 max-w-3xl mx-auto">
        <div v-if="listing">
            <img :src="listing.image" alt="Фото" class="w-full h-[400px] object-cover rounded mb-6"/>
            <h1 class="text-3xl font-bold">{{ listing.title }}</h1>
            <p class="text-lg">Місто: {{ listing.city }}</p>
            <p class="text-lg">Ціна: {{ listing.price }} грн</p>
            <p class="text-lg">Тип: {{ listing.type }}</p>

            <p class="text-lg mt-[20px] font-bold">Опис:</p>
            <p class="text-lg">{{ listing.desc }}</p>

            <p class="text-lg mt-[20px] font-bold">Інформація про власника(ці):</p>
            <p class="text-lg">Ім'я: {{ listing.ownerName }}</p>
            <p class="text-lg">Номер телефону: {{ listing.ownerPhone }}</p>
            <p class="text-lg">Email: {{ listing.ownerEmail }}</p>
            <Button @click="goToPage('/')" class="mt-[20px] bg-blue-600 hover:bg-blue-800">
            Повернутись назад</Button>
        </div>
        <div v-else>
            <p class="font-bold">Упс! Схоже щось пішло не так 😔</p>
            <p>Оголошення не знайдено.</p>
            <Button @click="goToPage('/')" class="mt-[20px] bg-blue-600 hover:bg-blue-800">
            Повернутись назад</Button>
        </div>
    </div>
</template>
