import chalk from "chalk";
import * as xlsx from "xlsx";

export const readExcelFile = async (filePath: string) => {
    const workbook = xlsx.readFile(filePath); // Membaca file
    const sheetName = workbook.SheetNames[0]; // Ambil nama sheet pertama
    let sheetData: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 }); // Membaca data dengan header sebagai array

    // Filter baris kosong
    sheetData = sheetData.filter((row: any) =>
        row.some((cell: any) => cell !== undefined && cell !== null && cell !== "")
    );

    // Pastikan bahwa header adalah array dan mengubah header menjadi huruf kecil dan mengganti spasi dengan garis bawah
    const headers: string[] = sheetData[0] as string[]; // Menjamin bahwa sheetData[0] adalah array
    const transformedHeaders = headers.map((header) =>
        header.toLowerCase().replace(/\s+/g, "_")
    );

    // Ganti header di baris pertama dan map data ke header yang telah diubah
    const mappedData = sheetData.slice(1).map((row: any[]) => {
        const rowObject: Record<string, any> = {}; // Menggunakan Record untuk memastikan bahwa setiap key adalah string
        row.forEach((value, index) => {
            rowObject[transformedHeaders[index]] = value;
        });
        return rowObject;
    });

    console.log(chalk.green(`Total ada ${mappedData.length} baris data dari Excel`));
    console.log(chalk.blue(`Sampel data => ${JSON.stringify(mappedData[0])}`));
    return mappedData; // Array of objects dengan header yang sudah diubah
};
