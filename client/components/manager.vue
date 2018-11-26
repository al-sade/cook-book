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
                <textarea row="5" id="instructions" class="form-control"></textarea>
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
                formData: {
                    title: '',
                    instructions: ['mix', 'eat']
                }
            }
        },
        methods: {
            onSubmit () {
                console.log(this.formData);
                axios.post('http://localhost:3000/recipe', {
                    title: this.formData.title,
                    instructions: this.formData.instructions
                }).then(res => console.log(res)).catch(e => console.log(e))
            }
        }
    }
</script>

<style scoped>

</style>
