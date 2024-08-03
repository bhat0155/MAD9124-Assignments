const passport = require("passport");

const { Strategy: BearerStrategy } = require("passport-http-bearer");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const debug = require("debug")("app:passport");

// TODO move bcrypt into a user service
const bcrypt = require("bcrypt");

const User = require("../models/user");
const tokenService = require("../services/tokenService");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

passport.use(
  new BearerStrategy(function (token, done) {
    try {
      
      const user = tokenService.verifyToken(token);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const {
        id: googleId,
        name: { familyName, givenName },
        photos,
      } = profile;

      try {
        debug({ ekam: [googleId, profile.displayName] });
        const user = await User.findOneAndReplace(
          {
            googleId,
          },
          {
            name: profile.displayName,
            googleId,
          },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        ).lean();
        debug({ user });
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
