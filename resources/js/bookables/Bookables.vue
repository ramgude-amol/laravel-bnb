<template>
    <div>
        <div v-if="loading">Data is loading...</div>
        rows: {{ rows }}
        <div v-if="!loading">
            <div v-for="row in rows" :key="'row' + row" class="row mb-4">
                <div class="col d-flex align-items-stretch" v-for="(bookable, column) in bookablesInRow(row)"
                    :key="'row' + row + column">
                    <BookablesListItem v-bind="bookable"></BookablesListItem>
                </div>

                <div class="col" v-for="p in placeHolderInRow(row)" :key="'row' + row + p">
                    {{ p }}</div>
            </div>



        </div>
    </div>
</template>

<script>
import BookablesListItem from './BookablesListItem.vue';
export default {
    data: function () {
        return {
            loading: true,
            bookables: null,
            columns: 3,
        }
    },
    components: {
        BookablesListItem
    },
    computed: {
        rows() {
            return this.bookables ? Math.ceil(this.bookables.length / this.columns) : 0;
        }
    },
    methods: {
        bookablesInRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns);
        },

        placeHolderInRow(row) {
            return this.columns - this.bookablesInRow(row).length;
        }
    },
    created() {

        /* const p = new Promise(function (resolve, reject) {
             console.log(resolve);
             console.log(reject);
             setTimeout(() => {
             }, 3000);
         })
             .then(result => console.log('here is res::' + result))
             .catch(result => console.log('error:' + result));
     */
        this.loading = true;

        axios.get('/api/bookables').then(response => {
            this.bookables = response.data.data;
            this.loading = false;
        });
    },
}
</script>