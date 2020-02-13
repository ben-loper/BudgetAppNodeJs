const express = require('express');
const ejs = require('ejs');
// const expressSession = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

app.use(bodyParser.json({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
// 	expressSession({
// 		secret: 'keyboard cat',
// 		resave: true,
// 		saveUninitialized: true
// 	})
// );

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
