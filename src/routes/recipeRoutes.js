const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

// The route for making post and get requests related to the Recipe data model

const Recipe = mongoose.model('Recipe');

const router = express.Router(); // the express frameworks router which requests are made to

router.use(requireAuth); // telling this router to require authorization of the user profile to access the methods

router.get('/recipes', async (req, res) => {
  // request to get the recipes saved to the users account
  const recipes = await Recipe.find({ userId: req.user.id });

  res.send(recipes);
});

router.post('/recipes', async (req, res) => {
  // request to save recipes to the users account
  const { name, recipeId } = req.body;

  if (!name || !recipeId) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and recipeId' });
  }

  try {
    const recipe = new Recipe({ name, recipeId, userId: req.user.id });
    await recipe.save();
    res.send(recipe);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router; // exporting the route for use in index.js
