const logging = require('./src/common/loggingUtil');
const logger = logging.getLogger('MainApp');
const express = require('express');
require('./src/db/mongoose');
const path = require('path');
const hbs = require('hbs');
const goobookRouter = require('./src/routers/goobooks');
const bookRouter = require('./src/routers/books');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './src/public');
console.log(publicDirectoryPath);

const viewsPath = path.join(__dirname, './src/public/templates/views');
const partialsPath = path.join(__dirname, './src/public/templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// body parser json
app.use(express.json());

// Setup log for app
app.use(logging.expressLogger);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Book Search',
        name: 'Kevin Vo'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Student Info',
        name: 'Kevin Vo'
    })
});

app.use(goobookRouter);
app.use(bookRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});