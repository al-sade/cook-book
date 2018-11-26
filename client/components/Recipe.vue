<template>
    <div class="row">
        <div class="col-lg-6 offset-lg-3">

            <h2>{{item.title}}</h2>
            <ul>
                <li v-for="step in item.instructions">{{ step }}</li>
            </ul>
            <h1>Ingredients</h1>
            <ul>
                <li v-for="item in item.ingredients">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['recipe'],
        mounted() {
            this.axios.get(`/recipe/${this.$route.params.title}`).then(res => {
                this.item = res.data.recipe;
            }).catch(e => {
                console.log(e);
            });
        },
        data () {
            return {
                item: {}
            }
        }
    }
</script>

<style scoped>

</style>
