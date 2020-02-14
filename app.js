const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgSession = require('connect-pg-simple')(session);

const app = express();
const path = require('path');

const { Pool } = require('pg');
const pgPool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'ProdDb',
  password: process.env.DB_PASSWORD,
  port: 5432
});

pgPool.connect();

app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })
);

app.use(bodyParser.json({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Sets the port the server listens on. If it is being ran on Heroku,
// Heroku will set the port, otherwise it uses port 3000 on the local machine
let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}

// Starts the app
app.listen(port, () => {
  console.log(`Budget Better app listening on port ${port}!`);
});

// Sets up the endpoints the server will listen on
const budgetRouter = require('./routes/budgetRouter.js');
app.use('/', budgetRouter);
