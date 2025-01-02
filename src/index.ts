import { closeDBConnection, getDBConnection } from "./helpers/db";
import { insertToDatabase } from "./service/insertToDatabase";
import { readExcelFile } from "./service/readExcelFile";

const main = async () => {
    try {
        const readFile = await readExcelFile("data.xlsx");
        if (readFile) {
            const insertTodatabase = await insertToDatabase(readFile, "smartcash.mt_produk_pulsa")
            if (insertTodatabase) {
                console.log(`beres bossss`);
            }
        }
    } finally {
        await closeDBConnection();
    }
};

main().catch((err) => console.error("Terjadi kesalahan di aplikasi utama:", err));