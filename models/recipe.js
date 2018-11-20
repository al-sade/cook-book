const {mongoose} = require('../db/mongoose');

const Recipe = mongoose.model('recipe', {
    title: {
        type: String,
        minlength: 1
    },
    instructions: {
        type: Array,
        minlength: 1
    },
    ingredients: {
        type: Array
    },
    tags: {
        type: Array
    }
});

module.exports = {
    Recipe
};