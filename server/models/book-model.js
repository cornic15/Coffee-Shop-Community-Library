const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema(
    {
        isbn: {
            type: Number,
            required: true
        },
        title: {
            type: String,
    
            required: true
        },
        author: {
            type: String,
            required: false
        },
        publication_year: {
            type: Number,
            required: false
        },
        publisher: {
            type: String,
            required: true
        },
        image_url_s: {
            type: String,
            required: false
        },
        image_url_m: {
            type: String,
            required: false
        },
        image_url_l: {
            type: String,
            required: false
        },
        copies: {
            type: Number,
            required: false
        },
        available: {
            type: Number,
            required: false
        },
    },
    { timestamps: true },
);







module.exports = mongoose.model('book', Book);
