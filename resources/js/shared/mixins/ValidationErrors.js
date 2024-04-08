export default {
    data() {
        return { errors: null }
    },
    methods: {
        errorFor(field) {
            if (this.errors && this.errors[field])
                return this.errors[field];
            return null;
        }
    }
};