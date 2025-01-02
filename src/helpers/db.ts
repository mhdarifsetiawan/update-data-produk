import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432", 10),
});

// Opsional: Log koneksi berhasil
pool.on("connect", () => {
    console.log("Koneksi ke database berhasil.");
});

// Fungsi untuk mendapatkan pool koneksi
export const getDBConnection = async () => {
    try {
        // Mengecek koneksi sebelum digunakan
        await pool.query('SELECT 1');
        console.log("Koneksi database berhasil!");
        return pool;
    } catch (error) {
        console.error("Koneksi ke database gagal:", error);
        throw new Error("Gagal terkoneksi ke database.");
    }
};

// Jangan lupa menutup pool saat selesai
export const closeDBConnection = async () => {
    await pool.end();
    console.log("Koneksi database ditutup.");
};
