import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '@components/users/user.model';
import constants from '@config/constants';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return done(undefined, false, { message: `Email ${email} not found.` });
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) return done(err, false, { message: 'Invalid email or password' });
        if (isMatch) return done(undefined, user);
        return done(undefined, false, { message: 'Invalid email or password' });
      });
    } catch (e) {
      return done(e, false);
    }
  }),
);

passport.use(
  new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: constants.JWT_SECRET },
    async (payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (!user) return done(undefined, false, { message: 'Invalid auth token' });
        return done(undefined, user.toJSON());
      } catch (e) {
        return done(e, false);
      }
    },
  ),
);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
