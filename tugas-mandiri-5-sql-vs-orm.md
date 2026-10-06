
Pada tugas ini, kita memilih operasi sederhana yaitu **menambahkan data baru (Insert)** ke dalam tabel `jadwal`.

## 1. Implementasi Kode

### A. SQL Mentah (Menggunakan Node.js dan library `mysql2`)

```javascript
const mysql = require('mysql2/promise');

async function tambahJadwal(mataPelajaran, jam, hari) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sekolah_db'
  });

  // Menggunakan prepared statement dengan parameter ? untuk mencegah SQL Injection
  const query = 'INSERT INTO jadwal (mata_pelajaran, jam, hari) VALUES (?, ?, ?);';
  const [result] = await connection.execute(query, [mataPelajaran, jam, hari]);
  
  await connection.end();
  return result.insertId;
}
```

### B. ORM (Menggunakan Prisma)
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function tambahJadwal(mataPelajaran, jam, hari) {
  const jadwalBaru = await prisma.jadwal.create({
    data: {
      mataPelajaran: mataPelajaran,
      jam: jam,
      hari: hari
    }
  });
  return jadwalBaru;
}
```

## 2. Perbandingan dan Analisis
# Rangkuman Konsep Basis Data: SQL Mentah vs ORM & Keamanan

1. **Apa perbedaan SQL mentah dan ORM?**
   SQL mentah mengharuskan programmer menulis string query SQL secara manual menggunakan sintaks basis data murni, sedangkan ORM (*Object-Relational Mapping*) memetakan tabel basis data menjadi objek pemrograman sehingga interaksi dilakukan melalui fungsi/method objek bahasa pemrograman.

2. **Apa kelebihan SQL mentah?**
   Performa eksekusi lebih cepat tanpa lapisan perantara, serta memberikan fleksibilitas penuh untuk membuat query yang sangat kompleks atau kustomisasi tingkat lanjut.

3. **Apa kelebihan ORM?**
   Kode menjadi lebih bersih, mudah dibaca, aman dari kesalahan pengetikan nama kolom/tabel (*type-safe*), dan mendukung fitur migrasi basis data otomatis.

4. **Apa risiko SQL injection?**
   SQL injection adalah celah keamanan berbahaya di mana penyerang dapat menyisipkan atau memanipulasi perintah SQL ilegal melalui input form untuk merusak, mencuri, atau menghapus isi basis data.

5. **Mengapa penggunaan parameter query dapat mengurangi risiko SQL injection?**
   Karena parameter query (seperti tanda `?` pada *prepared statements*) memperlakukan input pengguna secara ketat hanya sebagai nilai data murni, bukan sebagai bagian dari instruksi kode perintah SQL yang bisa dieksekusi sistem.

6. **Bagaimana ORM membantu programmer dalam mengakses database?**
   ORM membungkus perintah SQL yang rumit menjadi fungsi-fungsi bahasa pemrograman yang intuitif dan natural, sehingga programmer tidak perlu menghafal atau menulis sintaks SQL secara manual.