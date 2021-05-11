const express = require("express");
const router = express.Router();
const author = require("../models/author");
const { Book, validateBook } = require("../models/books");

//create books
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

//fetch all books
router.get("/", async (req, res) => {
    let books = await Book.find().sort({ createdAt: "desc" });
    try {
        res.send(books);
    } catch (error) {
        res.status(500).send("Cannot fetch books");
    }
});

//fetch book by Id
router.get("/:bookId", async (req, res) => {
    let book = await Book.findById(req.params.bookId);
    try {
        // if (book) res.send(book);
        // res.status(404).send("Book not found");
        res.send(book);
    } catch (error) {
        res.status(500).send("Cannot fetch books");
    }
});

//update book
router.put("/:bookId", async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.bookId,
        {
            name: req.body.bookName,
            author: {
                name: req.body.authorName,
                age: req.body.authorAge,
            },
            genre: req.body.genre,
        },
        { new: true }
    );

    if (!updatedBook) res.status(404).send("Book not updated");
    res.send(updatedBook);
});

//delete book
router.delete("/:bookId", async (req, res) => {
    const deleteBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deleteBook) res.status(404).send(`Book not deleted`);

    res.send(deleteBook);
});

module.exports = router;
