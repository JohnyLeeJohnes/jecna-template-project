import express                          from "express";
import crypto                           from "crypto";
import {hashPassword, validatePassword} from "../helper/authentication.js";
import {dbPool}                         from "../database.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const [rows,] = await dbPool.query("SELECT * FROM user WHERE username = ?", [req.body.username]);
    if (!rows) {
        res.status(400).send("Invalid username");
    }

    const user = rows[0];
    if (validatePassword(req.body.password, user.password)) {
        req.session.userId = user.id;
        res.status(200).send(user.id);
    } else {
        res.status(400).send("Invalid password");
    }
});
router.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send("Some parameters are missing");
    }

    try {
        await dbPool.query(
            "INSERT INTO user (id, username, email, password) VALUES (?,?,?,?)",
            [crypto.randomUUID(), req.body.username, req.body.email, hashPassword(req.body.password)]
        );
        res.status(200).send(result);
    } catch {
        res.status(400).send("Something went wrong");
    }
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

export default router;