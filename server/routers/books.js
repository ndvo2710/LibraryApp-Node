const bookSearch = require('../utils/bookSearch');
const express = require('express');
const router = new express.Router();

router.get('/books', (req, res) => {
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

module.exports = router;