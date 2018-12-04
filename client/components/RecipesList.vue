<template>
    <div class="container-fluid">
        <div class="row top0" v-if="recipes.length > 0">
            <div class="col-lg-12">
                <v-card v-for="(recipe,i) in recipes" :key="i" width="200" height="200">
                    <router-link :to="{path: `recipe/${recipe.title}`}">
                        <v-img v-if="typeof recipe.img !== 'undefined' " :src="'http://' + recipe.img" aspect-ratio="2.75"></v-img>
                        <v-img v-else :src="'http://fill-image.jobs160.com/300x200'" aspect-ratio="2.75"></v-img>
                    </router-link>
                    <v-card-title primary-title>
                        <div>
                            <router-link :to="{path: `recipe/${recipe.title}`}">
                                {{ recipe.title | shortened }}
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
        filters: {
            shortened (value) {
                return value.length > 40 ? value.substring(0, 40) + '...' : value;
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
