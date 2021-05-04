const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Recipe = mongoose.model('Recipe');

const router = express.Router();

router.use(requireAuth);

router.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find({ userId: req.user.id });

  res.send(recipes);
});

router.post('/recipes', async (req, res) => {
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

module.exports = router;
