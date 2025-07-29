import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../views/MainPage.vue';
import HouseDetail from '@/views/HouseDetail.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
    { path: '/', name: 'MainPage', component: MainPage },
    { path: '/detail/:id', name: 'HouseDetail', component: HouseDetail },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router