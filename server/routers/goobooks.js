// this version is used to dump all collected data into json
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const dumpJsonDirectoryPath = path.join(process.env.ROOT_DIR, './playground/dumpData')
const bookSearch = require('../utils/bookSearch');
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtil');
const logger = logging.getLogger(__filename);

router.get('/goobooks', (req, res) => {
	logger.debug('<------ Book Router');
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
		const resultJSON = {
			// id: bookData.id,
			title: `${bookData.volumeInfo.title}: ${bookData.volumeInfo.subtitle}`,
			authors: bookData.volumeInfo.authors.join(' , '),
			publisher: bookData.volumeInfo.publisher,
			categories: bookData.volumeInfo.categories.join(' , '),
			pageCount: bookData.volumeInfo.pageCount,
			imageLink: `https://books.google.com/books/content?id=${bookData.id}&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api`,
			description: bookData.volumeInfo.description,
			// book: bookData
		};
		
		const jsonfp = path.join(dumpJsonDirectoryPath, `${bookData.id}.json`);
		logger.info(`Write JSON to file ${jsonfp}`);
		fs.writeFile(jsonfp, JSON.stringify(resultJSON), function(err) {
			if (err) {
				logger.error(err);
			}
		});
		
		res.send(resultJSON);
	});
});

module.exports = router;