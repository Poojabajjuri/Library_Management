const prisma = require("../prisma");
const readCSV = require("./readCSV");

async function seedUsers() {
    try {

        const users = await readCSV("./data/users.csv");

        for (const user of users) {

            await prisma.users.create({

                data: {

                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    password: user.password,
                    phone: user.phone || null,
                    role: user.role,
                    status: user.status === "true"

                }

            });

        }

        console.log("✅ Users Imported");

    } catch (err) {

        console.error(err);

    } finally {

        await prisma.$disconnect();

    }
}

seedUsers();