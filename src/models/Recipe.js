const mongoose = require('mongoose');

// the schema used to store recipes in the database

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }, // this is the user id, with a foreign key ref to User.js
  name: {
    type: String,
    default: '',
  }, // name of the recipe as it comes from the Spoonacular api
  recipeId: {
    type: String,
    default: '', // the recipe id as it comes from the Spoonacular api
  },
});

mongoose.model('Recipe', recipeSchema); // exporting the schema for use under the reference "Recipe"
