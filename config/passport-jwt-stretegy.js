const passport = require('passport');

const mongoose = require('mongoose');

const Admin = require('../model/Adminmodel');


let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;



let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'khanak';


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    Admin.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }else 
        {
            return done(null, false);
        }
    });
}));