const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./userModal");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/google/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();

        if (!user) {
          // Jeśli użytkownik nie istnieje, zarejestruj go
          const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            // Możesz dodatkowo dodać inne informacje z profilu OAuth
          });

          await newUser.save();

          return done(null, newUser);
        } else {
          // Jeśli użytkownik już istnieje, zaloguj go
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user data to/from session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
