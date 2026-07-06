const prisma = require("../prisma");
const readCSV = require("./readCSV");

async function seedCategories() {

    try {

        const categories = await readCSV("./data/categories.csv");

        for (const category of categories) {

            await prisma.categories.create({

                data: {

                    id: category.id,
                    name: category.name,
                    description: category.description || null

                }

            });

        }

        console.log("✅ Categories Imported");

    } catch (err) {

        console.error(err);

    } finally {

        await prisma.$disconnect();

    }
}

seedCategories();