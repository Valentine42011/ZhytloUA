<script setup>
import { ref, onMounted } from 'vue';
import { computed } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog'

const isAddOpen = ref(false);
const isOpen = ref(false);

const newListing = ref({
    title: '',
    city: '',
    price: '',
    type: '',
    image: '',
    phone: '',
    desc: ''
});

const listings = ref([]);

onMounted(() => {
    const saved = localStorage.getItem('customListings');
    if (saved) {
        listings.value = JSON.parse(saved);
    }
});

const addListing = () => {
    if (!newListing.value.title || !newListing.value.city || !newListing.value.price) {
        alert('Заповніть усі обовʼязкові поля');
        return;
    };

    const newItem = {
        ...newListing.value,
        id: Date.now(),
        price: parseInt(newListing.value.price),
        ownerEmail: localStorage.getItem('loggedEmail') || 'Гість',
        ownerName: localStorage.getItem('loggedEmail')?.split('@')[0] || 'Гість',
        ownerPhone: newListing.value.phone || 'Невідомо'
    };

    listings.value.push(newItem);
    localStorage.setItem('customListings', JSON.stringify(listings.value));

  //clear form
    newListing.value = {
        title: '',
        city: '',
        price: '',
        type: '',
        image: '',
        phone: '',
        desc: ''
    };
};

const myListings = computed(() => {
    return listings.value.filter(item => item.ownerEmail === userEmail);
});

const deleteListing = (id) => {
    if (confirm('Ви впевнені, що хочете видалити це оголошення?')) {
        // Видаляємо з масиву listings оголошення з id === переданому id
        listings.value = listings.value.filter(item => item.id !== id);

        // Оновлюємо локальне сховище
        localStorage.setItem('customListings', JSON.stringify(listings.value));
    }
};

const userEmail = localStorage.getItem('loggedEmail') || 'Гість';
const userName = localStorage.getItem('loggedName') || 'Гість';
</script>

<template>
    <div class="px-[50px] py-[20px]">
        <h1 class="mb-[400px] text-2xl font-bold">Привіт, {{ userName }}</h1>
        <Dialog v-model:open="isAddOpen">
            <DialogTrigger as-child>
                <Button class="mr-[20px]">Додати оголошення</Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Додати оголошення:</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div class="grid gap-4 py-4">
                    <Input v-model="newListing.title" placeholder="Заголовок" />
                    <Input v-model="newListing.city" placeholder="Місто" />
                    <Input v-model="newListing.price" type="number" placeholder="Ціна" />
                    <Input v-model="newListing.type" placeholder="Тип (квартира, будинок…)" />
                    <Input v-model="newListing.image" placeholder="URL зображення" />
                    <Input v-model="newListing.phone" type="number" placeholder="Номер телефону" />
                    <textarea v-model="newListing.desc" placeholder="Опис" class="border rounded px-3 py-2"></textarea>
                </div>

                <div class="flex justify-end gap-2">
                    <Button @click="isAddOpen = false" variant="outline">Скасувати</Button>
                    <Button @click="addListing">Додати</Button>
                </div>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="isOpen">
            <DialogTrigger as-child>
                <Button variant="ghost">Мої оголошення</Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Мої оголошення:</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div v-if="myListings.length > 0" class="space-y-4 max-h-[400px] overflow-auto">
                    <div v-for="listing in myListings" :key="listing.id" class="border p-3 rounded relative">
                        <h3 class="font-semibold">{{ listing.title }}</h3>
                        <p>Місто: {{ listing.city }}</p>
                        <p>Ціна: {{ listing.price }}</p>
                        <p>Тип: {{ listing.type }}</p>
                        <p>Телефон: {{ listing.ownerPhone }}</p>
                        <p>Опис: {{ listing.desc }}</p>
                        <img v-if="listing.image" :src="listing.image" alt="Фото" class="max-w-full max-h-48 mt-2 object-cover rounded" />
                        <Button 
                            class="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white text-sm" 
                            @click="deleteListing(listing.id)">Видалити</Button>
                    </div>
                </div>

                <div class="flex justify-end gap-2">
                    <Button @click="isOpen = false" variant="outline">Скасувати</Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>