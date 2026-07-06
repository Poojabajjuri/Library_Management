const prisma = require("../prisma");

async function refreshMaterializedView() {
    try {
        await prisma.$executeRawUnsafe(`
            REFRESH MATERIALIZED VIEW book_search_mv;
        `);

        console.log("[MV] book_search_mv refreshed successfully.");
    } catch (error) {
        console.error("[MV] Refresh failed:", error);
        throw error; 
    }
}

module.exports = refreshMaterializedView;