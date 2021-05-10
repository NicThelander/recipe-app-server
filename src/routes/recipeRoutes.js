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

router.post('/recipes/delete', async (req, res) => {
  // method for deleting saved recipes
  const { recipeId } = req.body;

  Recipe.findOneAndDelete(recipeId, (err, Recipe) => {
    if (err) {
      return console.log(err);
    }
  });
  console.log('Recipe deleted');
  res.status(200).send();
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
    var existenceChecker;
    await Recipe.findOne({ recipeId }, async function (err, obj) {
      // checks if the recipe already exists in list before adding it

      if (obj !== null) {
        return (existenceChecker = true);
      }

      return (existenceChecker = false);
    });

    if (existenceChecker) {
      throw 'recipe already saved';
    } else {
      // attempts to add recipe if check passes
      const recipe = new Recipe({ name, recipeId, userId: req.user.id });

      await recipe.save();

      res.send(recipe);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ error: err.message });
  }
});
module.exports = router; // exporting the route for use in index.js
