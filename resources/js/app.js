/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import Vuex from "vuex"
import storeDefinition from "./store.js";
import App from './vue/views/index.vue'
import router from './vue/router/routes.js';
import StarRating from './shared/components/StarRating.vue';
import FatalError from './shared/components/FatalError.vue';
import ValdationErrors from './shared/components/ValidationErrors.vue';
import Success from './shared/components/Success.vue';
/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp(App);

app.component('star-rating', StarRating);
app.component('fatal-error', FatalError);
app.component('v-errors', ValdationErrors);
app.component('success', Success);

app.use(router);
app.use(Vuex);

const store = new Vuex.Store(storeDefinition);
app.use(store);
// async function beforeCreate(store) {
//     store.dispatch('loadStoredState');
// }
// app.use(beforeCreate);



// import ExampleComponent from './components/ExampleComponent.vue';
// app.component('example-component', ExampleComponent);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

app.mount('#app');

