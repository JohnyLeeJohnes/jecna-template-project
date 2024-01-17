const express                          = require("express");
const {hashPassword, validatePassword} = require("../helper/authentication.js");
const {User}                           = require("../models");

const router = express.Router();

router.post('/login', async (req, res) => {
    if (req.body.email) {
        const user = await User.findOne({where: {email: req.body.email}});
        if (user) {
            if (validatePassword(req.body.password, user.password)) {
                req.session.userId = user.id;
                res.status(200).send({id: user.id});
            } else {
                res.status(400).send({error: "Password Incorrect"});
            }
        } else {
            res.status(404).send({error: "User does not exist"});
        }
    } else {
        res.status(404).send({error: "Email is missing"});
    }
});

router.post('/register', async (req, res) => {
    User.create({
        username: req.body.username,
        email:    req.body.email,
        password: hashPassword(req.body.password)
    }).catch((err) => {
        res.status(400).send(err);
    }).then(() => {
        res.status(200).send('Success!');
    });
});

router.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send('Unable to log out')
        } else {
            res.send('Logout successful')
        }
    });
});

module.exports = router;