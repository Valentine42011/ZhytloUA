<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { listings } from '@/data/listings.js';

const router = useRouter();

function goToPage(path) {
    console.log('Navigating to', path);
    router.push(path).catch(err => {
        console.error('Router push error:', err);
    });
};

const cityFilter = ref('');
const priceFrom = ref(null);
const priceTo = ref(null);
const typeFilter = ref([]);

const types = ['квартира', 'будинок'];

const filteredListings = computed(() => {
    return listings.filter(item => {
        const matchesCity = !cityFilter.value || item.city.toLowerCase().includes(cityFilter.value.toLowerCase());
        const matchesPriceFrom = !priceFrom.value || item.price >= priceFrom.value;
        const matchesPriceTo = !priceTo.value || item.price <= priceTo.value;
        const matchesType = typeFilter.value.length === 0 || typeFilter.value.includes(item.type);
        return matchesCity && matchesPriceFrom && matchesPriceTo && matchesType;
    });
});
</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Оренда житла</h1>

        <div class="mb-6 space-y-4">
            <div>
                <label class="block font-semibold mb-1">Місто</label>
                <input type="text" v-model="cityFilter" placeholder="Введіть місто" class="border p-2 rounded w-full" />
            </div>

            <div class="flex gap-4">
                <div>
                    <label class="block font-semibold mb-1">Ціна від</label>
                    <input type="number" v-model.number="priceFrom" placeholder="0" class="border p-2 rounded w-32" />
                </div>

                <div>
                    <label class="block font-semibold mb-1">Ціна до</label>
                    <input type="number" v-model.number="priceTo" placeholder="100000" class="border p-2 rounded w-32" />
                </div>
            </div>

            <div>
                <label class="block font-semibold mb-1">Тип житла</label>
                <div class="flex gap-4">
                    <label v-for="type in types" :key="type" class="flex items-center gap-2">
                    <input type="checkbox" :value="type" v-model="typeFilter" />
                    <span>{{ type }}</span>
                    </label>
                </div>
            </div>
        </div>

        <div>
            <h2 class="text-2xl font-semibold mb-4">Оголошення</h2>
            <ul class="space-y-3">
                <li v-for="item in filteredListings" :key="item.id" class="border rounded p-4 shadow-sm cursor-pointer" @click="goToPage(`/detail/${item.id}`)">
                    <img :src="item.image" alt="Фото житла" class="w-full h-[300px] object-cover rounded mb-4" />
                    <h3 class="font-bold text-[30px]">{{ item.title }}</h3>
                    <p class="text-[20px]">Місто: {{ item.city }}</p>
                    <p class="text-[20px]">Ціна: {{ item.price }} грн</p>
                    <p class="text-[20px]">Тип: {{ item.type }}</p>
                </li>
            </ul>

            <p v-if="filteredListings.length === 0" class="mt-4 text-gray-500">За вашим запитом нічого не знайдено.</p>
        </div>
    </div>
</template>
