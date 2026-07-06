const express = require("express");

const router = express.Router();

const {

    getBooks,
    getBookByTitle,
    searchBookContent,
    createBook,
    updateBook,
    deleteBook

} = require("../controllers/bookController");


router.get("/search", searchBookContent);

router.get("/title/:title", getBookByTitle);

router.get("/", getBooks);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id",deleteBook);

module.exports = router;