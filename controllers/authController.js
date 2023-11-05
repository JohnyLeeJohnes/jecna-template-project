import {hashPassword} from "../service/authentication.js"
import {insertUser}   from "../repository/userRepository.js";
import crypto         from "crypto";
import passport       from "passport";

export const loginIndexAction = async (req, res) => {
    res.render("login", {title: "Login"});
}

export const registerIndexAction = async (req, res) => {
    res.render("register", {title: "Register"});
}

export const loginAction = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
});

export const registerAction = async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.redirect("/register");
        }
        const user = {
            id: crypto.randomUUID(),
            username: req.body.username,
            email: req.body.email,
            password: hashPassword(req.body.password),
        }
        await insertUser(user);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.redirect("/register");
    }
}

export const logoutAction = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
}