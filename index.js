import express from 'express';
import flash from "express-flash";
import sessions from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from "passport";
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import {loginAction, loginIndexAction, logoutAction, registerAction, registerIndexAction} from "./controllers/authController.js"
import {rootIndexAction} from "./controllers/rootController.js";
import {initPassport} from "./utils/passport-config.js";
import {checkAuthenticated, checkNotAuth} from "./utils/auth.js";
import 'dotenv/config';

//Init Root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
initPassport(passport);

//Create APP
const app = express();

//Set engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure APP
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize({}));
app.use(passport.session({}));

//Load CSS
app.use('/css', express.static(path.join('node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join('node_modules', 'bootstrap', 'dist', 'js')));

console.log(path.join('node_modules', 'bootstrap', 'dist', 'css'));
app.use(express.static(path.join(__dirname, 'public')));

//Base routes
app.get('/', checkAuthenticated, rootIndexAction);
app.get('/logout', checkNotAuth, logoutAction);
app.get('/login', checkNotAuth, loginIndexAction);
app.post('/login', checkNotAuth, loginAction);
app.get('/register', checkNotAuth, registerIndexAction);
app.post('/register', checkNotAuth, registerAction);
app.get('*', (req, res) => {
    res.status(404).render("404", {title: "Page not found"})
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.APP_PORT}`)
})
