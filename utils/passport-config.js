import LocalStrategy                    from "passport-local";
import {validatePassword}               from "../service/authentication.js";
import {getUserById, getUserByUsername} from "../model/user.js";

const authUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (user === null) {
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
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}