import chalk from "chalk";
import { closeDBConnection } from "./helpers/db";
import { excelFile, tableName } from "./helpers/utils";
import { insertToDatabase } from "./service/insertToDatabase";
import { readExcelFile } from "./service/readExcelFile";

const main = async () => {
    try {
        console.log(chalk.bgYellow(`============ Process Start ============`));
        const readFile = await readExcelFile(excelFile);
        if (readFile) {
            const insertTodatabase = await insertToDatabase(readFile, tableName)
            if (insertTodatabase) {
                console.log(chalk.bgYellow(`============ Process Ended ============`));
            }
        }
    } finally {
        await closeDBConnection();
    }
};

main().catch((err) => console.error("Something wrong:", err));