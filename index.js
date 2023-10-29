import express from 'express';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.js'
import path, {dirname} from "path";
import {fileURLToPath} from 'url';
import sessions from "express-session";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/login', loginRoutes);

app.get("/", (req, res) => {
    if (!req.session.authenticated) {
        res.redirect("/login")
    }
    res.render("index", {data: req.sessionID});
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
