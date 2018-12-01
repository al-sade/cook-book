<template>
    <div class="container-fluid">
        <div class="row top0" v-if="recipes.length > 0">
            <div class="col-lg-6">
                <!--<p v-for="recipe in recipes">{{recipe[0]}}</p>-->
                <v-card v-for="recipe in recipes" :key="recipe.title" width="200">
                    <router-link :to="{path: `recipe/${recipe.title}`}">
                        <v-img :src="require('../assets/images/foodpic.jpg')" aspect-ratio="2.75"></v-img>
                    </router-link>
                    <v-card-title primary-title>
                        <div>
                            <router-link :to="{path: `recipe/${recipe.title}`}">
                                {{ recipe.title }}
                            </router-link>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn flat color="orange" disabled>Share</v-btn>
                        <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['recipes'],
        data() {
            return {

            }
        }
    }
</script>

<style>
    .v-card {
        float: left;
        margin: 10px;
    }
</style>
