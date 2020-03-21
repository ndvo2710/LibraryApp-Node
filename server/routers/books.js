const MongoStore = require('../store/MongoStore');
const mongoStore = new MongoStore();
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtil');
const logger = logging.getLogger(__filename);

router.post('books', async (req, res) => {
    logger.info('<------ Book Router');
    try {
        const book = await mongoStore.saveBook(req.body);
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})