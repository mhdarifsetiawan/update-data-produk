import chalk from "chalk";
import { getDBConnection } from "../helpers/db";
import { allowedColumns, columnLengths, conflictColumn, mapDataToDatabase } from "../helpers/utils";
import { writeLog } from "../helpers/writeLogLocal";

type RowData = {
    [key: string]: any;
};

type ColumnLength = {
    column: string;
    maxLength: number;
};

export const insertToDatabase = async (data: RowData[], tableName: string) => {
    try {
        const pool = await getDBConnection();
        let insertCount = 0;
        let updateCount = 0;

        for (const row of data) {
            try {
                // Validate length data, You can delete it if you don't need it
                for (const columnLength of columnLengths as ColumnLength[]) {
                    if (String(row[columnLength.column]).length > columnLength.maxLength) {
                        throw new Error(`Data ${columnLength.column} "${row[columnLength.column]}" is too long, maximum ${columnLength.maxLength} characters.`);
                    }
                }

                // Map data Excel ke kolom database
                const mappedRow = mapDataToDatabase(row);
                
                const columns = allowedColumns.map((key: string) => `"${key}"`).join(', ');
                const values = allowedColumns.map((key: string) => mappedRow[key]);

                // Execute the query and get the response
                const query = `
                    INSERT INTO ${tableName} (${columns})
                    VALUES (${values.map((_value: any, index: number) => `$${index + 1}`).join(', ')})
                    ON CONFLICT (${conflictColumn.column})
                    DO UPDATE SET 
                        ${allowedColumns.map((key: string) => `"${key}" = EXCLUDED."${key}"`).join(', ')}
                    RETURNING xmax
                `;

                // Run the query and get the response
                const result = await pool.query(query, values);

                // Check if the operation is an insert or update based on the xmax value
                if (result.rows[0]?.xmax === 0) {
                    console.log(chalk.green(`Insert row ${insertCount} successful`));
                    insertCount++;
                } else {
                    console.log(chalk.blue(`update row ${updateCount} successful`));
                    updateCount++;
                }
            } catch (error: any) {
                console.error(`Failed to upload row: ${JSON.stringify(row)}`, error);
                writeLog(`Gagal upload row: ${JSON.stringify(row)} - ${error.message}`);
            }
        }

        console.log(chalk.green(`Successfully uploaded ${insertCount} new rows to table ${tableName}.`));
        console.log(chalk.green(`Successfully updated ${updateCount} rows in table ${tableName}.`));
        return { insertCount, updateCount }; // Return the number of rows inserted and updated
    } catch (error) {
        console.error("Database connection failed:", error);
        return { insertCount: 0, updateCount: 0 }; // If the connection fails, no rows are inserted or updated
    }
};
