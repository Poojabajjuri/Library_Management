const prisma = require("../prisma");
const readCSV = require("./readCSV");

async function seedAuthors() {

    const authors = await readCSV("./data/authors.csv");

    for (const author of authors) {

        await prisma.authors.create({

            data: {

                id: author.id,
                name: author.name,
                biography: author.biography,
                nationality: author.nationality

            }

        });

    }

    console.log("Authors Imported");

}

seedAuthors()
.catch(console.error)
.finally(async () => {

    await prisma.$disconnect();

});