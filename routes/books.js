const express = require("express");
const router = express.Router();
const author = require("../models/author");
const { Book, validateBook } = require("../models/books");

router.post("/", async (req, res) => {
    const error = await validateBook(req.body);

    if (error.message) res.status(400).send(error.message);
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
