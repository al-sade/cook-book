const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('../db/mongoose');
const {Recipe} = require('../models/recipe');
const {ObjectID} = require('mongodb');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/recipe', (req, res) => {
    Recipe.find().then((recipes) => {
        if (!recipes) {
            res.status(404).send();
        }

        res.status(200).send(recipes);
    }, (e) => {
        res.status(400).send();
    })
});

app.get('/recipe/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    Recipe.findById(id).then((recipe) => {
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
