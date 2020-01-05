const express = require('express');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

let port = process.env.PORT;
if (port == null || port == '') {
	port = 3000;
}

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

const budgetRouter = require('./routes/budgetRouter.js');
app.use('/', budgetRouter);
