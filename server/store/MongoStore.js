const mongooseConnect = require('../db/mongoose');
const mongoose = require('mongoose');
const bookModel = require('../models/book');
const logging = require('../../commonUtils/loggingUtil.js');
const logger = logging.getLogger('MongoStore');

class MongoStore {
	constructor() {
		mongooseConnect();
		this.Book = bookModel;
		this.updateOptions = { new: true, runValidators: true }
	}
	
	async saveBook(bookDict) {
		const newBook = new this.Book(bookDict);
		try {
			await newBook.save();
			logger.info(`new book ${bookDict.title} saved to DB`);
			return newBook;
		} catch(e) {
			throw new Error(`save new book to DB failed\n${e} with the following bookDict ${JSON.stringify(bookDict)}`);
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

	async getBookById(id) {
		try{
			const book = await this.Book.findById(id);
			if(!book) {
				throw new Error(`The book with ${id} does not exist in the system`);
			}
			logger.info(`Get Book: ${book}`);
			return book;
		} catch (e) {
			logger.info(`Failed to Get Book with id ${id}`);
			logger.debug(e);
		}
	}

	async updateAuthorById(id, authors) {
		const update = {authors: authors};
		try {
			const book = await this.Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`)
		} catch(e) {
			logger.info('Failed to update Book with id ${id}')
			logger.debug(e);
		}
	}

	async updateTitleById(id, title) {
		const update = {title: title};
		try {
			const book = await this.Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`)
		} catch(e) {
			logger.info('Failed to update Book with id ${id}')
			logger.debug(e);
		}
	}

	async updateDescriptionById(id, description) {
		const update = {description: description};
		try {
			const book = await this.Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`)
		} catch(e) {
			logger.info('failed to update Book with id ${id}')
			logger.debug(e);
		}
	}

	async updateBookById(id, partialBookDict) {
		try {
			const book = await this.Book.findByIdAndUpdate(id, partialBookDict, this.updateOptions);
			logger.info(`Updated Book: ${book}`);
			return book;
		} catch(e) {
			logger.info(`Failed to update Book with id ${id}`);
			logger.debug(e);
		}
	}

	async deleteBookById(id) {
		try {
			const book = await this.Book.findByIdAndDelete(id);
			if(!book) {
				throw new Error(`The book with ${id} does not exist in the system`);
			}
			logger.info(`Deleted Book: ${book}`);
			return book;
		} catch(e) {
			logger.info('Failed to Delete Book');
			logger.debug(e);
		}
	}

}

module.exports = MongoStore;