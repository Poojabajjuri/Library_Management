const prisma = require("../prisma");
const readCSV = require("./readCSV");

async function seedBooks() {

    try {

        const books = await readCSV("./data/books.csv");

        for (const book of books) {

            await prisma.books.create({

                data: {

                    id: book.id,
                    title: book.title,
                    isbn: book.isbn,
                    author_id: book.author_id,
                    category_id: book.category_id,
                    publication_year: Number(book.publication_year),
                    publisher: book.publisher || null,
                    language: book.language,
                    total_copies: Number(book.total_copies),
                    available_copies: Number(book.available_copies),
                    shelf_location: book.shelf_location || null

                }

            });

        }

        console.log("✅ Books Imported");

    } catch (err) {

        console.error(err);

    } finally {

        await prisma.$disconnect();

    }
}

seedBooks();