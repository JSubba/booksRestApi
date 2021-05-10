const mongoose = require("mongoose");
const Author = require("./author");

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    author: Author.schema,
    genre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = new mongoose.model("Book", BookSchema);
