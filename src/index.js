require('./models/User');
require('./models/Recipe');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const requireAuth = require('./middlewares/requireAuth');

// this is the js file that makes the server run, you can start up the server by using cd to get into the recipe-server folder and running npm run dev (A script which is in the package.json)

const app = express(); // creating the express framework app

app.use(bodyParser.json()); // used to parse middleware

app.use(authRoutes); // this is where the authRoutes and recipeRoutes express routers are added for use in the server
app.use(recipeRoutes);

const mongoUri = // this is where the server accesses the mongodb database with the connection string
  'mongodb+srv://nic:testpass97@cluster0.dih4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

if (!mongoUri) {
  throw new Error(`Error with the mongoUri`);
}
mongoose.connect(mongoUri, {
  // the function and rules for connecting to mongodb
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  // for when the mongodb connection succeeds
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  // for if the mongodb connection fails
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  // will output the users email if validated, mostly for postman testing and will probably remove in production
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  // declaring the port used for the server
  console.log('Listening on port 3000');
});
