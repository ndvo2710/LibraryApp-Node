const bookSearch = require('../utils/bookSearch');
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtil');
const logger = logging.getLogger(__filename);

router.get('/goobooks', (req, res) => {
	logger.info('<------ GooBook Router');
	if (!req.query.searchType || !req.query.searchValue) {
		return res.send({
			error: 'You must provide searchType and searchValue'
		});
	}
	bookSearch(req.query.searchType, req.query.searchValue, (error, bookData) => {
		if (error) {
			return res.send({ error });
		}
		logger.debug(`bookData : ${JSON.stringify(bookData)}`);		
		res.send({
			// id: bookData.id,
			title: `${bookData.volumeInfo.title}: ${bookData.volumeInfo.subtitle}`,
			authors: bookData.volumeInfo.authors.join(' , '),
			publisher: bookData.volumeInfo.publisher,
			categories: bookData.volumeInfo.categories.join(' , '),
			pageCount: bookData.volumeInfo.pageCount,
			imageLink: `https://books.google.com/books/content?id=${bookData.id}&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api`,
			description: bookData.volumeInfo.description,
			// book: bookData
		});
	});
});

module.exports = router;