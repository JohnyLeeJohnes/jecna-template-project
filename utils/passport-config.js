import LocalStrategy from "passport-local";
import {validatePassword} from "../service/authentication.js";
import {getUserByUsername} from "../repository/userRepository.js";

const authUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (!user) {
        return done(null, false, {message: "User not found"})
    }
    try {
        if (validatePassword(password, user.password)) {
            return done(null, user);
        } else {
            return done(null, false, {message: "Incorrect password"})
        }
    } catch (e) {
        return done(e);
    }
}

export const initPassport = (passport) => {
    passport.use(new LocalStrategy({usernameField: "username"}, authUser));
    passport.serializeUser((user, done) => {
        const {password, ...userOmited} = user;
        done(null, userOmited);
    });
    passport.deserializeUser(async (user, done) => {
        return done(null, user);
    });
}