const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: '',
  },
  recipeId: {
    type: String,
    default: '',
  },
});

mongoose.model('Recipe', recipeSchema);
