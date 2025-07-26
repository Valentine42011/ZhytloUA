<script setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog'

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToPage(path) {
    console.log('Navigating to', path);
    router.push(path).catch(err => {
        console.error('Router push error:', err);
    });
};

const isRegisterOpen = ref(false);
const isLoginOpen = ref(false);

</script>

<template>
<div>
    <header class="w-full px-6 py-4 flex items-center border-b bg-white shadow-sm">
        <div @click="goToPage('/')" class="text-xl font-bold text-blue-600 cursor-pointer hover:text-blue-800">ЖитлоUA</div>
    
    <div class="flex gap-4 ml-auto">
        <Dialog v-model:open="isLoginOpen">
            <DialogTrigger as-child>
                <Button variant="ghost">Увійти</Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Вхід до акаунту</DialogTitle>
                    <DialogDescription>Введіть свої дані, щоб увійти</DialogDescription>
                </DialogHeader>

            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Пароль</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                </div>
            </div>

            <div class="flex justify-end gap-2">
                <Button @click="isLoginOpen = false" variant="outline">Скасувати</Button>
                <Button>Увійти</Button>
            </div>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="isRegisterOpen">
            <DialogTrigger as-child>
                <Button class="bg-blue-600 hover:bg-blue-800">Зареєструватись</Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Створення акаунту</DialogTitle>
                    <DialogDescription>Введіть свої дані, щоб створити акаунт</DialogDescription>
                </DialogHeader>

            <div class="grid gap-4 py-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Пароль</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Повторіть пароль</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                </div>
            </div>

            <div class="flex justify-end gap-2">
                <Button @click="isRegisterOpen = false" variant="outline">Скасувати</Button>
                <Button>Створити</Button>
            </div>
            </DialogContent>
        </Dialog>
    </div>
    </header>
</div>
</template>
