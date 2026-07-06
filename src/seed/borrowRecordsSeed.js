const prisma = require("../prisma");
const readCSV = require("./readCSV");

async function seedBorrowRecords() {

    try {

        const borrowRecords = await readCSV("./data/borrow_records.csv");

        for (const record of borrowRecords) {

            await prisma.borrow_records.create({

                data: {

                    user_id: record.user_id,
                    book_id: record.book_id,
                    borrow_date: new Date(record.borrow_date),
                    due_date: new Date(record.due_date),
                    return_date: record.return_date
                        ? new Date(record.return_date)
                        : null,
                    status: record.status

                }

            });

        }

        console.log("✅ Borrow Records Imported");

    } catch (err) {

        console.error(err);

    } finally {

        await prisma.$disconnect();

    }
}

seedBorrowRecords();