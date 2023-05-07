import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";

const GOOGLE_CLIENT_ID = "612271809968-eu4autg545lk7spksm29rv0r0s7bbrqo.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL: "/login",
      },
      async function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        const user=profile

          return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

