<template>
  <div class="home">
      <div class="container-fluid">
          <div class="row top10 row-padded">
              <div class="col-lg-4 justify-left">
                  <div style="display: inline-flex;">
                  <v-text-field clearable
                                class="search"
                                append-icon="search"
                                @change="addIngredient"
                                v-model="search"
                                placeholder="Insert Ingredient"></v-text-field>
                      <div id="basket"  v-if="ingredients.length > 0">
                          <ul class="ingredients-list">
                              <li v-for="(item, i) in ingredients" :key="item.name">
                                  <v-chip close v-model="item.stat" @input="removeIngredient(item)">
                                      {{ item.name }}<br>
                                  </v-chip>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="col-lg-8">
              </div>
          </div>
          <div class="row justify-left top0">
              <div class="col-lg-12">
                  <recipe-list :recipes="recipes"></recipe-list>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    import recipeList from './RecipesList.vue'

    export default {
        components: {
            recipeList
        },
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
          if($event.length && !this.ingredients.map(x => x.name.toLowerCase()).includes($event.toLowerCase())){
              this.ingredients.push({name: $event, stat: true});
              this.getRecipes();
          }
          this.search = ''
        },
        getRecipes () {
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
        removeIngredient($event){
              this.ingredients = this.ingredients.filter(item => item.name.search($event.name));
              this.recipes = this.recipes.filter(x => {
                  !x.ingredients.toString().includes($event.name)
              });

            this.getRecipes();
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #basket {
        padding: 10px;
        display: -webkit-inline-box;
        float: left;
    }

    .search{
        margin: 0 25px;
    }

    .ingredients-list {
        list-style: none;
    }
    .ingredients-list li{
        min-width:100%;
    }

    span.v-chip {
        float: left;
    }

</style>
