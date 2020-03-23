const bookSearch = require('../utils/bookSearch');
const express = require('express');
const router = new express.Router();
const logging = require('../common/loggingUtil');
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
		try {
			// this ISBN 9781789133806 crashed the app
			// Catch this error
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
		} catch (e) {
			logger.info('Something wrong with bookData dict callback. Note: last time it has something wrong with categories missing. Catch error to avoid app crash!!!');
			logger.debug(e);
		}

	});
});

module.exports = router;