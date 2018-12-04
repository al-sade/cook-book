<template>
    <div class="container">
        <button @click="goBack()">< Back</button>
        <div class="row app-info">
        <div class="col-lg-9 justify-content-left">
            <h1>{{item.title}}</h1>
            <v-chip v-for="tag in item.tags" :key="tag">{{tag}}</v-chip>
            <ul>
                <li>Level: {{ item.level }}</li>
                <li>Time: {{ item.time }}</li>
            </ul>
        </div>
        <div class="col-lg-3">
            <v-img :src="'https://' + item.img"></v-img>
        </div>
    </div>
    <div class="row app-info">
        <div class="col-lg-6">
            <h2>Ingredients</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="item in item.ingredients">{{ item }}</li>
            </ul>
        </div>
        <div class="col-lg-6">
            <h2>Instructions</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="step in item.instructions">{{ step }}</li>
            </ul>
        </div>
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
        },
        methods: {
            goBack () {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .app-info {
        background: #faebd7;
        padding: 25px;
    }

    h3{
        float: left;
    }
</style>
