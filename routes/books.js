const express = require("express");
const router = express.Router();
const author = require("../models/author");
const Book = require("../models/books");

router.post("/", (req, res) => {
    book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        genre: req.body.genre,
    });

    book.save()
        .then((book) => {
            res.send(book);
        })
        .catch((error) => {
            res.status(500).send("Book not stored in db");
        });
});

module.exports = router;
