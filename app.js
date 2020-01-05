const express = require('express');
const ejs = require('ejs');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

app.use(bodyParser.json({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	expressSession({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true
	})
);

let port = process.env.PORT;
if (port == null || port == '') {
	port = 3000;
}

app.listen(port, () => {
	console.log(`Budget Better app listening on port ${port}!`);
});

// app.post('/register', (req, res) => {
// 	console.log('Got body:', req.body);
// 	res.sendStatus(200);
// });

const budgetRouter = require('./routes/budgetRouter.js');
app.use('/', budgetRouter);
