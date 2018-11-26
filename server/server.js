const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Recipe} = require('./models/recipe');

var app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/recipe', (req, res) => {
    if (req.query.ingredients){
        let ingredients = req.query.ingredients.map(x => JSON.parse(x).name);

        Recipe.find({ingredients: {$in: ingredients}}).then((recipes) => {
            console.log("recipes" + recipes);
            if (!recipes) {
                res.status(404).send();
            }
            res.status(200).send(recipes);
        }, (e) => {
            res.status(400).send();
        })
    }
});

app.get('/recipe/:title', (req, res) => {
    let title = req.params.title;

    Recipe.findOne({title}).then((recipe) => {
        if (!recipe) {
            res.status(404).send();
        }

        res.status(200).send({recipe});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.post('/recipe', (req, res) => {
    let recipe = new Recipe({
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        categories: req.body.categories
    });

    recipe.save().then((recipe) => {
        res.send(recipe);
    }, (e) => {
        res.status(400).send(e);
    })
});


app.delete('/recipe/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send("Not a valid id");
    }

    Recipe.findByIdAndRemove(id).then((recipe) => {
        if (!recipe) {
            res.status(404).send()
        }

        res.status(200).send(recipe);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.patch('/recipe/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Not a valid id');
    }

    let body = _.pick(req.body, ["title", "instructions", "ingredients", "categories"]);

    Recipe.findByIdAndUpdate(id, {$set: body}, {new: true}).then((recipe) => {
        if (!recipe) {
            return res.status(404).send()
        }

        res.send(recipe)
    }).catch((e) => {
        return res.status(400).send();
    })

});
app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});
