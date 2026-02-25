const passport = require("passport");
const User = require('../models/users');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try{
        let user = await User.findone({googleId: profile.id});
        if(user){
            return done(null, user);
        }
        else
        {
            let newUser = await User.create({
                googleId: profile.id,
                username: profile.displayName,
                email :  profile.emails[0].value,
                profilePicture: profile.photos[0].value
            });
            return done(null, user);
        }
    } catch(e)
    {
        return done(null, user);
    }
  }
));