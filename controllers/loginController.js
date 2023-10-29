import asyncHandler from "express-async-handler";

export const loginIndex = asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
        res.render("login");
    } else {
        res.redirect("/")
    }
});

export const loginLog = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;
    if (username && password) {
        req.session.authenticated = true;
        res.redirect("/");
    }
});