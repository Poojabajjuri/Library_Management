const prisma = require("../prisma");
const refreshMaterializedView = require("../utils/refreshMaterializedView");

async function getBooks(req, res) {

    try {

        const books = await prisma.$queryRaw`

            SELECT *
            FROM book_search_mv
            ORDER BY title;

        `;

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch books."
        });


    }

};

const getBookByTitle = async (req, res) => {

    try {

        const { title } = req.params;

        const books = await prisma.$queryRaw`

            SELECT *

            FROM book_search_mv

            WHERE title ILIKE ${'%'+title+'%'};

        `;

        if (books.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Book not found"

            });

        }

        res.status(200).json({

            success: true,

            data: books

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const searchBookContent = async (req, res) => {

    try {

        const { query } = req.query;

        if (!query) {

            return res.status(400).json({

                success: false,

                message: "Search query is required."

            });

        }

        const books = await prisma.$queryRaw`

            SELECT
                id,
                title,
                author_name,
                category_name,
                publication_year,
                publisher,
                language,
                content

            FROM book_search_mv

            WHERE to_tsvector('english', COALESCE(content, ''))
                  @@ plainto_tsquery('english', ${query});

        `;

        res.status(200).json({

            success: true,

            count: books.length,

            data: books

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const createBook = async (req, res) => {

    try {

        const {

            title,
            isbn,
            author_id,
            category_id,
            publication_year,
            publisher,
            language,
            total_copies,
            available_copies,
            shelf_location,

        } = req.body;

        const book = await prisma.books.create({

            data: {

                title,
                isbn,
                author_id,
                category_id,
                publication_year,
                publisher,
                language,
                total_copies,
                available_copies,
                shelf_location

            }

        });


        await refreshMaterializedView();

        res.status(201).json({

            success: true,
            message: "Book created successfully",

            data: book

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const updateBook = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            isbn,
            author_id,
            category_id,
            publication_year,
            publisher,
            language,
            total_copies,
            available_copies,
            shelf_location
        } = req.body;

        const updatedBook = await prisma.books.update({

            where: {
                id
            },

            data: {

                title,
                isbn,
                author_id,
                category_id,
                publication_year,
                publisher,
                language,
                total_copies,
                available_copies,
                shelf_location

            }

        });

        await refreshMaterializedView();

        res.status(200).json({

            success: true,
            message: "Book updated successfully",
            data: updatedBook

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const deleteBook = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.books.delete({

            where: {
                id
            }

        });

        await refreshMaterializedView();

        res.status(200).json({

            success: true,
            message: "Book deleted successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
module.exports = {
    getBooks,
    getBookByTitle,
    searchBookContent,
    createBook,
    updateBook,
    deleteBook
};

