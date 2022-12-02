/* eslint-disable camelcase */
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const passport = require('passport');

const {secret} = global.gConfig;
const Users = require('./src/models/UserModel');

// Setup work and export for the JWT passport strategy
function auth() {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: secret,
    };
    passport.use(
        new JwtStrategy(opts, (jwtPayload, callback) => {
            // eslint-disable-next-line no-underscore-dangle
            const userId = jwtPayload._id;
            // eslint-disable-next-line consistent-return
            Users.findById(userId, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                } else {
                    callback(null, false);
                }
            });
        }),
    );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
