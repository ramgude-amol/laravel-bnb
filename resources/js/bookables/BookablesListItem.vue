<template>
    <div>

        <div class="card w-100">
            <div class="card-body">
                <router-link :to="{ name: 'bookable', params: { id: id } }">
                   <h5 class="card-title"> {{ title }}</h5>
                </router-link>
                <p class="card-text"> {{ description }}</p>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: { 'title': String, 'id': Number, 'description': String }
}
</script>