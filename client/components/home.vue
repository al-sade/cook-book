<template>
  <div class="home">
    <h1>Ingredients Driven Cook Book</h1>
      <div class="container-fluid">
          <div class="row">
              <div class="col-lg-6 offset-lg-3" >
                  <v-text-field clearable append-icon="search" @change="addIngredient" v-model="search"></v-text-field>
                  <div class="alert" v-if="ingredients.length == 0">Insert at least one ingredient...</div>
                  <div id="basket">
                      <v-chip close v-for="(item, i) in ingredients" :key="item.name" v-model="item.stat" @input="ingredientRemoved(item)">
                          {{ item.name }}
                      </v-chip>
                  </div>
                  <v-btn @click="onSubmit">Search</v-btn>
              </div>

          </div>

          <div class="row">
              <div class="col-lg-6">
                  <router-link v-for="recipe in recipes" :key="recipe.title" :to="{path: `recipe/${recipe.title}`}">
                      <a>{{recipe.title}}</a>
                  </router-link>
              </div>
          </div>

      </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
            msg: 'Welcome to ingredients based cook book',
            ingredients: [],
            search:'',
            recipes: {}
        }
      },
      methods: {
          addIngredient ($event) {
          if(!this.ingredients.map(x => x.name.toLowerCase()).includes($event.toLowerCase())){
              this.ingredients.push({name: $event, stat: true})
          }
          this.search = ''
        },
        onSubmit ($event) {
            this.axios.get('/recipe', {
                params: {
                    ingredients: this.ingredients
                }
            }).then(res => {
                if (res.status === 200) {
                    this.recipes = res.data;
                }
            }).catch(e => console.log(e));
        },
        ingredientRemoved($event){
          this.ingredients = this.ingredients.filter(item => item.name !== $event.name);
        //              this.ingredients.filter(item)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
