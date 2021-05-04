const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// The schema used for creating, storing and calling users

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}); // details required for account creation/login

userSchema.pre('save', function (next) {
  const user = this;
  // this function is used to create a hashed password with bcrypt and a salt in order to store and interact with passwords securely in the database

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    // creates the salt (generated code that you combine with the hashed password for increased complexity and safety )
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      // combines the password and salt into the hashed password.
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  // compares the password to the input to check if they match
  const user = this;

  return new Promise((resolve, reject) => {
    // a promise request to validate the password match or reject it if they don't match
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', userSchema);
// exporting the schema for use under the reference "User"
