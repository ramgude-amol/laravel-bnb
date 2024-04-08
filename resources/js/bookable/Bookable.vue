<template>
    <div class="row">
        <div class="col-md-8">
            <div v-if="loading">Loading...</div>
            <div class="card" v-else>
                <div class="card-body">
                    <h2> {{ bookable.title }}</h2>
                    <hr>
                    <article>{{ bookable.description }}</article>
                </div>
            </div>
            <review-list :bookable-id="this.$route.params.id"></review-list>
        </div>


        <div class="col-md-4">
            <availability :bookable-id="this.$route.params.id" @availability="checkPrice($event)"></availability>
            <transition name="fade">
                <price-breakdown v-if="price" :price="price" class="mb-4 mt-4"></price-breakdown>
            </transition>
            <transition name="fade">
                <button class="btn btn-outline-secondary btn-block" v-if="price" :price="price" @click="addToBasket"
                    :disabled="inBasketAlready">Book now</button>
            </transition>

            <button class="btn btn-outline-secondary btn-block" v-if="inBasketAlready" @click="removeFromBasket">Remove
                from basket
            </button>


            <div v-if="inBasketAlready" class="mt-4 text-muted warning">Seems like you've added this object to basket
                already. If you want to change dates, remove from the basket first.
            </div>
        </div>
    </div>
</template>

<script>
import Availability from "../Bookable/Availability";
import ReviewList from "../Bookable/ReviewList";
import PriceBreakdown from "../Bookable/PriceBreakdown";
import { mapState, mapGetters } from "vuex";

export default {
    components: {
        Availability,
        ReviewList,
        PriceBreakdown
    },

    data() {
        return {
            bookable: null,
            loading: false,
            price: null,
        }
    },
    created() {
        this.loading = true;
        axios.get(`/api/bookable/${this.$route.params.id}`)
            .then(response => { this.bookable = response.data.data; this.loading = false; })

    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch"
        }),
        inBasketAlready() {
            if (this.bookable == null) {
                return;
            }

            return this.$store.getters.inBasketAlready(this.bookable.id);
        }
    },
    methods: {
        async checkPrice(isAvailable) {
            console.log(isAvailable);
            if (!isAvailable) {
                this.price = null;
                return;
            }
            try {
                this.price = (await axios.get(
                    `/api/bookable/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)
                ).data.data
            } catch (err) {
                this.price = null;
            }
        },

        addToBasket() {
            this.$store.dispatch('addToBasket', {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            });
        },
        removeFromBasket() {
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        }
    }
}
</script>