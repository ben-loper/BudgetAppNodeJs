const express = require('Express');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const port = 3000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

app.get('/', (req, res) => {
	res.render('index');
});
