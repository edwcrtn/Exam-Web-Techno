// Import
let express = require('express');
let connection = require('./db'); // Import the db connection

// Initialization de l'app
const port = 8000;
let app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

let router = require('./routes');
app.use('/', router);

// Launch app
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
