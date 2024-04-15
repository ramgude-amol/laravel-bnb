import { createRouter, createWebHistory } from 'vue-router'
import Bookables from '../../bookables/Bookables.vue';
import Bookable from '../../bookable/Bookable.vue';
import Review from '../../review/Review.vue'
import Basket from '../../basket/Basket.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => Bookables,
            name: 'home'
        }, 
        {
            path: "/bookable/:id",
            component: () => Bookable,
            name : 'bookable'
        },
        {
            path: "/review/:id",
            component: () => Review,
            name : 'review'
        },
        {
            path: "/basket",
            component: () => Basket,
            name : 'basket'
        },
    ]
});

export default router
