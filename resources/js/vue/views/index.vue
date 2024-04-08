<template id="app">
    <div >
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link class="navbar-brand mr-auto" :to="{ name: 'home' }">Home</router-link>
            <router-link class="navbar-brand mr-auto" to="/review/00353f8f-12f2-4b8c-8679-ddfd33d5888a">Add
                Review
            </router-link>
            <router-link class="nav-link" :to="{ name: 'basket' }">
                Basket
                <span v-if="itemsInBasket" class="badge badge-secondary">{{ itemsInBasket }}</span>
            </router-link>
        </nav>

        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
    name: "App.vue",
    created() {
        this.$router.options.routes.forEach(route => {
            this.items.push({
                name: route.name
                , path: route.path
            })
        })
    }
    ,
    data() {
        return {
            items: []
        }
    },
    computed: {
        ...mapState({
            lastSearchComputed: "lastSearch",
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        })
    },
    beforeCreate() {
        this.$store.dispatch("loadStoredState");
    }
}
</script>

<style scoped></style>
