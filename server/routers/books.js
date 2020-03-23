const MongoStore = require('../store/MongoStore');
const mongoStore = new MongoStore();
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtil');
const logger = logging.getLogger(__filename);

router.post('/books', async (req, res) => {
    logger.info('<------ Book Router');
    try {
        const book = await mongoStore.saveBook(req.body);
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/books', async (req, res) => {
    try {
        const books = await mongoStore.getAllBook();
        res.send(books);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        const book = await mongoStore.getBookById(req.params.id);
        if (!book) {
            return res.status(404).send();
        }
        res.send(book);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/books/:id', async (req, res) => {
    try {
        const book = await mongoStore.updateBookById(req.params.id, req.body);
        if (!book) {
            return res.status(404).send();
        }
        res.send(book);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/books/:id', async (req, res) => {
    try {
        const book = await mongoStore.deleteBookById(req.params.id);
        if (!book) {
            res.status(404).send()
        }
        res.send(book);
    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;