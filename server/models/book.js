const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
	title: {
		type:String,
		required: true,
		trim: true
	},
	authors: {
		type:String,
		required: true,
		trim: true
	},
	publisher: {
		type:String,
		required: true,
		trim: true
	},
	categories: {
		type:String,
		required: true,
		trim: true
	},
	pageCount: {
		type:Number,
		required: true,
	},
	imageLink: {
		type:String,
		required: 'iamgeLink can\'t be empty',
		trim: true,
		validate(value) {
			if (!validator.isURL(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	description: {
		type:String,
		required: true,
		trim: true
	},
}, {
	timestamps: true
});


module.exports = bookSchema;