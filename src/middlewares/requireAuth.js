const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// this is where the JSON Web Token is generated to verify the users account from their app in order to stay logged in and make requests

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // gets the authorization in a format like: 'Bearer foobarbaz'

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', ''); // removes the "Bearer " section of the authorization code so you're left with just the JWT code
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    // this is where the token is verified for use
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next(); // the callback function passed in to use once the JWT is validated
  });
};
