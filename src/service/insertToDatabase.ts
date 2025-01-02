import chalk from "chalk";
import { getDBConnection } from "../helpers/db";

export const insertToDatabase = async (data: any[], tableName: string) => {
    try {
        const pool = await getDBConnection(); // Pastikan koneksi berhasil sebelum melanjutkan
        let insertCount = 0;
        let updateCount = 0;

        for (const row of data) {
            try {
                const { id_produk, kuota, alias, deskripsi } = row;
                const jenis = row.nama_paket;
                const masaaktif = row.masa_aktif;

                // Pastikan id_produk adalah string
                const idProdukString = String(id_produk);

                // Tentukan kolom yang akan di-insert atau di-update
                const columns = '"id_produk", "jenis", deskripsi, kuota, masaaktif, alias';
                const values = [idProdukString, jenis, deskripsi, kuota, masaaktif, alias];
                
                // Query dengan ON CONFLICT untuk melakukan update jika id_produk sudah ada
                const query = `
                    INSERT INTO ${tableName} (${columns})
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ON CONFLICT ("id_produk") 
                    DO UPDATE SET 
                        "jenis" = EXCLUDED."jenis", 
                        deskripsi = EXCLUDED.deskripsi,
                        kuota = EXCLUDED.kuota,
                        masaaktif = EXCLUDED.masaaktif,
                        alias = EXCLUDED.alias
                    RETURNING xmax
                `;

                // Jalankan query dan dapatkan respons
                const result = await pool.query(query, values);

                // Periksa apakah operasi adalah insert atau update berdasarkan nilai xmax
                if (result.rows[0]?.xmax === 0) {
                    insertCount++;
                } else {
                    updateCount++;
                }
            } catch (error) {
                console.error(`Gagal mengunggah baris: ${JSON.stringify(row)}`, error);
            }
        }

        console.log(chalk.green(`Berhasil mengunggah ${insertCount} baris baru ke tabel ${tableName}.`));
        console.log(chalk.blue(`Berhasil memperbarui ${updateCount} baris di tabel ${tableName}.`));
        return { insertCount, updateCount }; // Kembalikan jumlah data yang berhasil di-insert dan di-update
    } catch (error) {
        console.error("Koneksi ke database gagal:", error);
        return { insertCount: 0, updateCount: 0 }; // Jika koneksi gagal, tidak ada baris yang di-insert atau di-update
    }
};
