const request = require('request');

const bookSearch = (searchType, searchValue, callback) => {
	let url = ''
	if (searchType === 'isbn') {
		url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchValue}&orderBy=newest&maxResults=1`
	} else if (searchType === 'author') {
		url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&orderBy=newest&maxResults=1`
	} else if (searchType === 'title') {
		url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&orderBy=newest&maxResults=1`
	}
	
	console.log(url);
    request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to coonect to Google Book Api Service', undefined);
		} else if (body.error) {
			callback('Unable to connect to Google Book Api Service', body);
		} else if (body.totalItems === 0) {
			callback('This book does not exists in system !!!', undefined);
		} else {
			callback(undefined, body.items[0]);
		}
		
    })
};

module.exports = bookSearch;