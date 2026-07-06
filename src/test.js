const prisma = require("./prisma");

async function main() {
    const books = await prisma.books.findMany();

    console.log(books);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });