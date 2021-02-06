const express = require('express');

const bookController = require('../controllers/book-controller');

const router = express.Router();

router.get('/books', bookController.getbooks);
router.get('/book/:id', bookController.getBookById);
router.get('/checkInOut/:action/:id', bookController.checkInOut);
router.get('/checkout/:id', bookController.getBookById);
router.post('/book', bookController.createbook);
router.put('/book/:id', bookController.updatebook);
router.delete('/book/:id', bookController.deletebook);



module.exports = router;
