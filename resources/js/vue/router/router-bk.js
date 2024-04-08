import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home/',
            component: () => import('../views/home')
        }, 
    ]
});

export default router
