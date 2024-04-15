<template>
    <div class="row">
        <success v-if="success">You've left a review, thank you very much!</success>
        <fatal-error v-if="error">Unknown error</fatal-error>
        <div v-if="!success && !error">
            <div :class="[{ 'col-md-4':  onceColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading"> Loading..</div>
                        <div v-if="hasBooking">
                            <p>stayed at <router-link
                                    :to="{ name: 'bookable', params: { id: booking.bookable.bookable_id } }">
                                    {{ booking.bookable.title }}</router-link></p>
                            <p> from: {{ booking.from }} to:{{ booking.to }}</p>
                        </div>

                    </div>
                </div>
            </div>
            <div :class="[{ 'col-md-8': onceColumn }, { 'col-mod-12': twoColumn }]">
                <div v-if="loading"> Loading..</div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>You've already left a review for this booking</h3>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label for="" class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                            <star-rating :value="review.rating" v-model="review.rating" class="fa-3x"
                                @rating-changed="onRatingChanged"></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="" class="text-muted">Describe experience</label>
                            <textarea name="cotent" cols="30" rows="10" class="form-control" v-model="review.content"
                                :class="[{ 'is-invalid': errorFor('content') }]"></textarea>
                            <v-errors :errors="errorFor('content')"></v-errors>
                        </div>

                        <button class="btn btn-lg btn-primary btn-block " @click.prevent="submit"
                            :disabled="sending">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import response from '../shared/utils/response.js';
import ValidationErrors from '../shared/mixins/ValidationErrors';
export default {
    mixins: [ValidationErrors],
    setup() {
        const { is404, is422 } = response();

        return { is404, is422 }
    },
    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false,
            errors: null,
            sending: false,
            success: false
        }
    },

    async created() {
        this.review.id = this.$route.params.id
        this.loading = true;
        try {
            this.existingReview = (await axios.get(
                `/api/reviews/${this.review.id}`
            )).data.data;
        } catch (err) {
            if (this.is404(err)) {
                try {
                    this.booking = (await axios.get(
                        `/api/booking-by-review/${this.review.id}`
                    )).data.data;
                } catch (err) {
                    this.error = !this.is404(err);
                }
            } else {
                this.error = true;
            }
        }
        this.loading = false;
    },
    computed: {
        alreadyReviewed() {
            return this.hasReview || !this.booking;
        },
        hasReview() {
            return this.existingReview !== null;
        },
        hasBooking() {
            return this.booking !== null;
        },
        onceColumn() {
            return !this.loading && this.alreadyReviewed;
        },
        twoColumn() {
            return this.loading || !this.alreadyReviewed;
        },
    },
    methods: {
        submit() {
            this.errors = null;
            this.error = false;
            this.sending = true;
            this.success = false;
            axios.post('/api/reviews', this.review)
                .then(response => {
                    this.success = 201 === response.status;
                })
                .catch(err => {
                    if (this.is422(err)) {
                        const errors = err.response.data.errors;
                        if (errors["content"] && 1 === _.size(errors)) {
                            this.errors = errors;
                            return;
                        }
                        else {
                            this.error = true;
                        }
                    }
                })
                .then(() => {
                    this.sending = false;
                })
        },
        onRatingChanged(rating) {
            this.review.rating = rating
        }
    }
}
</script>
