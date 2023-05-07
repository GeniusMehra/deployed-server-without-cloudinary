import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";

const GOOGLE_CLIENT_ID = "612271809968-ubflja6th8852dffm08kcivrrt969eou.apps.googleusercontent.com";
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

