const fs = require("fs");
const csv = require("csv-parser");
const prisma = require("../prisma");

async function importBookContents() {
    const rows = [];

    fs.createReadStream("./data/book_contents.csv")
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", async () => {
            try {
                for (const row of rows) {
                    await prisma.book_contents.create({
                        data: {
                            book_id: row.book_id,
                            content: row.content
                        }
                    });
                }

                console.log("✅ book_contents imported successfully.");
            } catch (error) {
                console.error(error);
            } finally {
                await prisma.$disconnect();
            }
        });
}

importBookContents();