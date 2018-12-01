<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6">
            <h1>{{ Title }}</h1>

            <form>
                <h2>title</h2>
                <label for="title">Title</label>
                <input type="text" id="title" class="form-control" v-model.lazy="formData.title">

                <label for="instructions">Instructions</label>
                <textarea type="text"
                          id="instructions"
                          class="form-control"
                          v-on:keydown.enter.prevent="addStep($event)"
                          v-model="step"></textarea>
                <ul class="list-group" style="text-align: left;">
                    <li class="list-group-item" v-for="(step, i) in formData.instructions" :key="step">
                        {{ i+1 }} - {{ step }}
                        <button type="button" class="close" aria-label="Close" @click="removeItem(step)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </li>
                </ul>

                <label for="instructions">Ingredients</label>
                <textarea type="text"
                          id="ingredients"
                          class="form-control"
                          v-on:keydown.enter.prevent="addIngredient($event)"
                          v-model="ingredient"></textarea>
                <ul class="list-group" style="text-align: left;">
                    <li class="list-group-item" v-for="(ingredient, i) in formData.ingredients" :key="ingredient">
                        {{ i+1 }} - {{ ingredient }}
                        <button type="button" class="close" aria-label="Close" @click="removeIngredient(ingredient)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </li>
                </ul>

                    <br>
                <button type="submit" class="form-control" @click="onSubmit">Submit</button>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                Title: "Recipes Manager",
                step:'',
                ingredient:'',
                formData: {
                    title: '',
                    instructions: [],
                    ingredients: []
                }
            }
        },
        methods: {
            addStep(event) {
                if(event && !this.formData.instructions.includes(this.step)){
                    this.formData.instructions.push(this.step) ;
                    this.step = '';
                }
            },
            addIngredient(event) {
                if(event && !this.formData.ingredients.includes(this.ingredient)){
                    this.formData.ingredients.push(this.ingredient) ;
                    this.ingredient = '';
                }
            },
            onSubmit ($event) {
                $event.preventDefault();
                axios.post('http://localhost:3000/recipe', {
                    title: this.formData.title,
                    instructions: this.formData.instructions,
                    ingredients: this.formData.ingredients
                }).then(res => {
                    if(res.status === 200) {
                        this.formData = {
                            title: '',
                                instructions: [],
                                ingredients: []
                        }
                    }
                }).catch(e => console.log(e))
            },
            removeItem(step) {
               this.formData.instructions =  this.formData.instructions.filter(item => item !== step );
            },
            removeIngredient(ingredient) {
               this.formData.ingredients = this.formData.ingredients.filter(item => item !== ingredient );
            }
        }
    }
</script>

<style scoped>

</style>
