import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../views/MainPage.vue';
import HouseDetail from '@/views/HouseDetail.vue';

const routes = [
    { path: '/', name: 'MainPage', component: MainPage },
    { path: '/detail/:id', name: 'HouseDetail', component: HouseDetail },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router