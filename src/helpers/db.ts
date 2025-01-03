import { Pool } from "pg";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432", 10),
});

console.log(chalk.yellow("Database connection opened."));

pool.on("connect", () => {
    console.log(chalk.green("Database connection successful."));
});

// Fungsi untuk mendapatkan pool koneksi
export const getDBConnection = async () => {
    try {
        // Mengecek koneksi sebelum digunakan
        await pool.query('SELECT 1');
        console.log(chalk.green("Database connection successful!"));
        return pool;
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database Connection failed!!!.");
    }
};

// Jangan lupa menutup pool saat selesai
export const closeDBConnection = async () => {
    await pool.end();
    console.log(chalk.green("Database connection closed."));
};
