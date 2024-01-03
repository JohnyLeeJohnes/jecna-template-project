import express              from 'express';
import sessions             from 'express-session';
import bodyParser           from 'body-parser';
import cookieParser         from 'cookie-parser';
import authRouter           from "./routes/auth.js"
import bookRouter           from "./routes/book.js"
import logger               from "./service/logger.js"
import expressWinston       from "express-winston";
import {format, transports} from "winston";

//Create & Configure app
const app  = express();
const port = 3000;

// logger.error("error message");
// logger.warn("warning message");
// logger.info("info message");
// logger.debug("debug message");

app.use(sessions({
    secret:            "jecna-test",
    resave:            false,
    saveUninitialized: false,
}))
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Create logger
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels:    true
}))

// Create endpoints
app.get('/error', (req, res) => {
    throw new Error('This is a custom error')
})
app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);
app.get('*', (req, res) => res.status(400).send("Invalid path"));

//Create Error logger (After routes)
app.use(expressWinston.errorLogger({
    transports: [
        new transports.File({
            filename: 'logs/error-from-middleware.log'
        })
    ],
    format:     format.combine(
        format.colorize(),
        format.json()
    )
}));


//Error handler
app.use((err, req, res, next) => {
    res.status(500).send('Something broke');
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})
