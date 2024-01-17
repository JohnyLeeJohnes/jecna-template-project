const express      = require('express');
const sessions     = require('express-session');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const db           = require('./models');
const authRouter   = require('./routes/auth.js');

//Create & Configure app
const app  = express();
const port = 3000;

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

//Sync DB
db.sequelize.sync();

//Create endpoints
app.use('/api/auth', authRouter);
app.get('*', (req, res) => res.status(400).send("Invalid path"));

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})


