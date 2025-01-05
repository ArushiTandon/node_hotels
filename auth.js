const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new localStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (UserName, password, done) => {
      try {
        console.log("received credentials:", UserName, password);
        const user = await Person.findOne({ username: UserName });
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: 'Incorrect UserName' });
        }
  
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
          console.log("Authentication successful");
          return done(null, user);
        } else {
          console.log("Incorrect password");
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (error) {
        return done(error);
      }
    }
  ));

module.exports = passport;