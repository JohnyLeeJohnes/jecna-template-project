import express      from 'express';
import sessions     from 'express-session';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter   from "./routes/auth.js"
import bookRouter   from "./routes/book.js"

//Create & Configure app
const app  = express();
const port = 5000;

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

//Create endpoints
app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);
app.get('*', (req, res) => res.status(400).send("Invalid path"));

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})
