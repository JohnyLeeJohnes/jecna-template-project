import crypto               from "crypto";
import express              from "express";
import {checkAuthenticated} from "../middleware/auth.js";
import {dbPool}             from "../database.js";

const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) => {
    const [rows,] = await dbPool.query("SELECT * FROM book");
    res.status(200).send(rows);
})
router.post("/", checkAuthenticated, async (req, res) => {
    if (!req.body.name || !req.body.author || !req.body.createdDate) {
        res.status(400).send("Some values are missing");
    }

    try {
        await dbPool.query(
            "INSERT INTO book (id, name, author, createdDate) VALUES (?,?,?,?)",
            [crypto.randomUUID(), req.body.name, req.body.author, new Date(req.body.createdDate)]
        );
        res.status(200).send("Book successfully added");
    } catch {
        res.status(400).send("Something went wrong");
    }
})
router.put("/", checkAuthenticated, async (req, res) => {
    if (!req.body.id || !req.body.name || !req.body.author || !req.body.createdDate) {
        res.status(400).send("Some values are missing");
    }

    try {
        await dbPool.query(
            "UPDATE book SET name = ?, author = ?, createdDate = ? WHERE id = ?",
            [req.body.name, req.body.author, new Date(req.body.createdDate), req.body.id]
        );
        res.status(200).send("Book successfully updated");
    } catch {
        res.status(400).send("Something went wrong");
    }
});
router.delete("/", checkAuthenticated, async (req, res) => {
    if (!req.body.id) {
        res.status(400).send("Book ID is missing");
    }

    try {
        await dbPool.query("DELETE FROM book WHERE id = ?", [req.body.id]);
        res.status(200).send("Book successfully deleted");
    } catch {
        res.status(400).send("Something went wrong");
    }
});

export default router;