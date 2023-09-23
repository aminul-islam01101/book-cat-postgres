import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { configs } from './env.configs';

//% Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: configs.googleClientId as string,
      clientSecret: configs.googleClientSecret as string,
      callbackURL: configs.googleLoginCallback,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    },
    (accessToken, refreshToken, profile, cb) => {
      const {
        given_name: firstName,
        family_name: lastName,
        picture: profileImage,
        email_verified: verified,
        email,
      } = profile._json;
      const userObj = {
        firstName,
        lastName,
        profileImage,
        verified,
        signInMethod: profile.provider,
        googleId: profile.id,
        email,
        accessToken,
        refreshToken,
      };
      try {
        //     const existingUser = await User.findOne({ googleId: profile.id });

        //     if (existingUser) {
        //       return cb(null, existingUser);
        //     }

        //     const newUser = new User({ googleId: profile.id });

        //     await newUser.save();
        return cb(null, userObj);
      } catch (error) {
        return cb(error as Error, undefined);
      }
    }
  )
);
