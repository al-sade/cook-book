const mongoose = require('mongoose');
// const db = require('../db-config');

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/RecipeBook', {
    useNewUrlParser: true
}).then(res => {
    console.log('Mongoose connected');
}).catch(e => {
    console.log('Mongoose failed to connect');
});

module.exports = {
    mongoose
};
