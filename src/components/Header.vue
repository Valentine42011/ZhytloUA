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

//test registration
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const loginEmail = ref('');
const loginPassword = ref('');

const register = () => {
    if (password.value !== confirmPassword.value) {
        alert("Паролі не збігаються");
        return;
    }

    localStorage.setItem('demoUser', JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
    }));

    isRegisterOpen.value = false;
    alert("Акаунт створено!");
};

const login = () => {
    const stored = JSON.parse(localStorage.getItem('demoUser'));
    if (!stored || loginEmail.value !== stored.email || loginPassword.value !== stored.password) {
        alert("Невірний email або пароль");
        return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedName', name.value);
    localStorage.setItem('loggedEmail', email.value);
    isLoginOpen.value = false;
    router.push('/dashboard');
};

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedName');
    localStorage.removeItem('loggedEmail');
    isLoggedIn.value = false;
    router.push('/');
};

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
                    <Input id="email" type="email" v-model="loginEmail" placeholder="you@example.com"/>
                </div>

                <div class="grid gap-2">
                    <Label for="password">Пароль</Label>
                    <Input id="password" type="password" v-model="loginPassword" placeholder="••••••••"/>
                </div>
            </div>

            <div class="flex justify-end gap-2">
                <Button @click="isLoginOpen = false" variant="outline">Скасувати</Button>
                <Button @click="login">Увійти</Button>
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
                    <Label for="email">User name</Label>
                    <Input id="name" type="text" v-model="name" placeholder="User"/>
                </div>

                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" v-model="email" placeholder="you@example.com"/>
                </div>

                <div class="grid gap-2">
                    <Label for="password">Пароль</Label>
                    <Input id="password" type="password" v-model="password" placeholder="••••••••"/>
                </div>

                <div class="grid gap-2">
                    <Label for="password">Повторіть пароль</Label>
                    <Input id="confirm-password" type="password" v-model="confirmPassword" placeholder="••••••••"/>
                </div>
            </div>

            <div class="flex justify-end gap-2">
                <Button @click="isRegisterOpen = false" variant="outline">Скасувати</Button>
                <Button @click="register">Створити</Button>
            </div>
            </DialogContent>
        </Dialog>
    </div>
    </header>
</div>
</template>
