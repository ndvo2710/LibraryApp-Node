const mongooseConnect = require('../db/mongoose');
const mongoose = require('mongoose');
const bookModel = require('../models/book');
const logging = require('../../commonUtils/loggingUtil.js');
const logger = logging.getLogger('MongoStore');

class MongoStore {
	constructor() {
		mongooseConnect();
		this.Book = bookModel;
	}
	
	async saveBook(bookDict) {
		const newBook = new this.Book(bookDict);
		try {
			await newBook.save();
			logger.info(`new book ${bookDict.title} saved to DB`);
		} catch(e) {
			logger.info('save new book to DB failed: ')
			logger.debug(e);
			logger.debug(bookDict);
		}
	}
	
	async getAllBook() {
		try {
			const books = await this.Book.find({});
			return books;
		} catch (e) {
			logger.info('Failed to run getAllBook');
			logger.debug(e);
		}
		
	}
}

module.exports = MongoStore;