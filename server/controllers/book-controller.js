/* eslint-disable no-undef, arrow-body-style */
const book = require('../models/book-model');

getbooks = async (req, res) => {
    console.log ("getbooks");
    await book.find({}, (err, books) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 400 in 'getbooks': ${err}`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!books.length) {
            console.error(`[Hack.Diversity React Template] - 404 in 'getbooks': books not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'books not found',
                });
        }
        console.log(`[Hack.Diversity React Template] - 200 in 'getbooks': books fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                books: books,
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'getbooks': ${err}`);
        console.error(err);
        return res
            .status(404)
            .json({
                success: false,
                error: err
            });
    });
};

getBookById = async (req, res) => {
    await book.find({ _id: req.params.id }, (err, books) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 400 in 'getbookById': ${err}`);
            throw res
                .status(400)
                .json({
                    success: false,
                    error: err,
                });
        }
        if (!books.length) {
            console.error(`[Hack.Diversity React Template] - 404 in 'getbookById': book not found`);
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'book not found',
                });
        }
        console.log(`[Hack.Diversity React Template] - 200 in 'getbookById': book fetched!`);
        return res
            .status(200)
            .json({
                success: true,
                book: books[0],
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'getbookById': ${err}`);
        console.error(err);
        return err;
    });
};

createbook = (req, res) => {
    const body = req.body;
    // console.log('----------------------- createbook: req -----------------------')
    // console.log(req);
    // console.log('----------------------- createbook: body -----------------------')
    // console.log(body);

    if (!body) {
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an book.',
            });
    }

    const book = new book(body);

    if (!book) {
        console.error(`[Hack.Diversity React Template] - 400 in 'createbook': 'book' is malformed.`);
        return res
            .status(400)
            .json({
                success: false,
                message: "'book' is malformed"
            });
    }

    // console.log('----------------------- createbook: book -----------------------')
    // console.log(book);

    return book
        .save()
        .then(() => {
            console.error(`[Hack.Diversity React Template] - 201 in 'createbook': book created!`);
            return res
                .status(201)
                .json({
                    success: true,
                    id: book._id,
                    message: 'book created!',
                });
        })
        .catch(err => {
            console.error(`[Hack.Diversity React Template] - caught error in 'createbook': ${err.errors.name}`);
            Object.keys(err.errors).forEach(errorKey => {
                console.error(`ERROR for: ${errorKey}`);
                console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
            })
            return res
                .status(400)
                .json({
                    success: false,
                    error: err.errors,
                    message: err.errors.name,
                });
        });
};

updatebook = (req, res) => {
    console.log ("updatebook");
    const body = req.body;
    // console.log('----------------------- updatebook: req -----------------------');
    // console.log(req);
    // console.log('----------------------- updatebook: body -----------------------');
    // console.log(body);
    if (!body) {
        console.error(`[Hack.Diversity React Template] - 400 in 'updatebook': You must provide an book to update.`);
        return res
            .status(400)
            .json({
                success: false,
                error: 'You must provide an book to update.',
            });
    }
/*
    const bookForUpdate = {
        _id: req.params.id,
        name: body.name,
        daysOfWeek: body.daysOfWeek,
        timeframeNote: body.timeframeNote,
        priority: body.priority,
        content: body.content,
    };
*/
    const bookForUpdate = {
        _id: req.params.id,
        copies: req.body.copies
    };
console.log ("update books: ");
console.log(bookForUpdate);
    // console.log('----------------------- updatebook: res -----------------------');
    // console.log(res);

    return book.updateOne({ _id: req.params.id }, bookForUpdate, (err, writeOpRes) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 404 in 'updatebook': book not found!`);
            console.error(err);
            return res
                .status(404)
                .json({
                    success: false,
                    error: err,
                    message: 'book not found!'+bookForUpdate,
                });
        }
        // TODO: make this neater
        // console.log('----------------------- updatebook: book -----------------------');
        // console.log(book);
        return writeOpRes;
    })
    .then(resp => {
        // console.log('----------------------- updatebook - findOne: res -----------------------');
        // console.log(res);
        console.log(`[Hack.Diversity React Template] - 200 in 'updatebook': book updated!`);
        res.status(200)
            .json({
                success: true,
                id: req.params.id,
                message: 'book updated!',
                writeOpResult: resp
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'updatebook': ${err}`);
        console.error(err);
        return err;
    });
};

deletebook = async (req, res) => {
    await book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
        if (err) {
            console.error(`[Hack.Diversity React Template] - 400 in 'deletebook': ${err}`);
            return res
                .status(400)
                .json({
                    succes: false,
                    error: err,
                });
        }

        if (!book) {
            console.error(`[Hack.Diversity React Template] - 400 in 'deletebook': book not found!`);
            return res
                .status(400)
                .json({
                    success: false,
                    error: 'book not found!',
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                book: book,
            });
    }).catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'deletebook': ${err}`);
        console.error(err);
        return err;
    });
};

module.exports = {
    getbooks,
    getBookById,
    createbook,
    updatebook,
    deletebook,
};
