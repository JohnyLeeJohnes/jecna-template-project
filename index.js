import express              from 'express';
import flash                from "express-flash";
import sessions             from 'express-session';
import bodyParser           from 'body-parser';
import cookieParser         from 'cookie-parser';
import passport             from "passport";
import path, {dirname}      from 'path';
import {fileURLToPath}      from 'url';
import {rootIndexAction}    from "./controllers/rootController.js";
import {initPassport}       from "./utils/passport-config.js";
import {checkAuthenticated} from "./utils/auth.js";
import authRouter           from "./routes/auth.js"
import methodOverride       from "method-override";
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
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(methodOverride('_method'))
app.use(flash());

//Load CSS
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use(express.static(path.join(__dirname, 'public')));

//Base routes
app.get('/', checkAuthenticated, rootIndexAction);
app.use(authRouter);
app.get('*', (req, res) => {
    res.status(404).render("util/404", {title: "Page not found"})
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.APP_PORT}`)
})
