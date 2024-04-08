<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availbility
            <transition name="fade">
                <span v-if="noAVailability" class="text-danger"> Not available</span>
            </transition>
            <transition name="fade">
                <span v-if="hasAvailability" class="text-success"> Available</span>
            </transition>
        </h6>
        <div class="form-row">
            <div class="form-group- col-md6">
                <label for="from">From</label>
                <input type="text" name="from" class="form-control form-control-sm" placeholder="Start Date"
                    v-model="from" :class="[{ 'is-invalid': errorFor('from') }]">
                <v-errors :errors="errorFor('from')"></v-errors>
            </div>
            <div class="form-group- col-md6">
                <label for="to">To</label>
                <input type="text" name="to" class="form-control form-control-sm" placeholder="To Date" v-model="to"
                    :class="[{ 'is-invalid': errorFor('to') }]">
                <v-errors :errors="errorFor('to')"></v-errors>
            </div>
        </div>

        <button class="btn btn-secondary btn-block mt-4 mb-4" @click="check">
            <span v-if="!loading">Check!</span>
            <span v-if="loading">
                <i class="fas fa-circle-notch fa-spin"></i> Checking...
            </span>
        </button>
    </div>
</template>
<script>
import response from '../shared/utils/response.js';
import ValidationErrors from '../shared/mixins/ValidationErrors';
export default {
    mixins: [ValidationErrors],
    props: {
        bookableId: [String, Number]
    },
    setup() {
        const { is404, is422 } = response();

        return { is404, is422 }
    },
    data() {
        return {
            loading: false,
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            status: null,
            errors: null
        }
    },
    methods: {
        async check() {
            this.loading = true;
            this.errors = null;
            this.$store.dispatch('setLastSearch', {
                from: this.from,
                to: this.to
            });

            try {
                this.status = (await axios.get(
                    `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
                )).status;
                this.$emit("availability", this.hasAvailability);
            } catch (err) {
                if (this.is422(err)) {
                    this.errors = err.response.data.errors;
                }

                this.status = err.response.status;
                this.$emit("availability", this.hasAvailability);
            }
            this.loading = false;
        },
    },
    computed: {
        hasErrors() {
            return this.status === 422 && this.errors;
        },
        hasAvailability() {
            return this.status === 200;
        },
        noAVailability() {
            return this.status === 404;
        },
    }
}
</script>

<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: grey;
    font-weight: bolder;
}

.is-invalid {
    boder-color: #b22222;
    background-image: none;
}

.invalid-feedback {
    color: #b22222;
}
</style>