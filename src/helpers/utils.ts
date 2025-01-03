import dotenv from "dotenv";
import config from "../config/config"; // Impor modul config.ts

dotenv.config();

// data name
export const excelFile = 'data.xlsx';

// table name
export const tableName = config.tableName || 'table_name';

// column to insert/update
export const allowedColumns = config.allowedColumns || ["column_1", "column_2"];

// validate column, if need it only, or you can modify this validate
export const columnLengths = config.columnLengths;

export const columnInExcel = config.columnInExcel;

// main column
export const conflictColumn = config.conflictColumn || {
    column: 'main_column',
    type: 'unique',
};

// Create columnMapping dinamis
const columnMapping: { [key: string]: string } = {};
for (let i = 0; i < columnInExcel.length; i++) {
  columnMapping[columnInExcel[i]] = allowedColumns[i];
}

// Func for mapping data Excel to column database
export const mapDataToDatabase = (excelRow: any) => {
    const mappedRow: any = {};
    for (const [excelColumn, dbColumn] of Object.entries(columnMapping)) {
      if (allowedColumns.includes(dbColumn)) {
        mappedRow[dbColumn] = excelRow[excelColumn];
      }
    }
    return mappedRow;
  };