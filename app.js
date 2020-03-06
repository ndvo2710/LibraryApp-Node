const getLogger = require('../commonUtils/loggingUtil');
const logger = getLogger('MainApp');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bookSearch = require('./server/utils/bookSearch');

logger.info()
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './frontend');
console.log(publicDirectoryPath);

const viewsPath = path.join(__dirname, './frontend/templates/views');
const partialsPath = path.join(__dirname, './frontend/templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup log for app
app.use(l)

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

app.get('/book', (req, res) => {
	console.log(req.query);
	if (!req.query.searchType || ! req.query.searchValue) {
		return res.send({
			error: 'You must provide searchType and searchValue'
		})
	}
	bookSearch(req.query.searchType,
			   req.query.searchValue,
			   (errorMessage, bookData) => {
					if(errorMessage) {
						return res.send({errorMessage})
					}
					res.send({
						book: bookData,
						bookTitle: bookData.volumeInfo.title,
						bookId: bookData.id,
						
					})
				}
	)
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});