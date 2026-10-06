# Tugas Mandiri 2 — Memahami HTTP Status Code

Berikut adalah hasil pengujian HTTP status code menggunakan endpoint `/status/:code` di HTTPBin:

| Status Code | Arti | Hasil Pengujian | Kapan Digunakan |
|:--:|:---|:---|:---|
| **200** | OK | Berhasil memproses request dan mengembalikan data. | Ketika operasi request berhasil secara normal. |
| **201** | Created | Berhasil membuat resource/data baru di server. | Digunakan setelah berhasil melakukan aksi `POST` (misal: registrasi user baru atau tambah data). |
| **400** | Bad Request | Server menolak request karena sintaks/format payload salah. | Ketika input dari client tidak valid atau data form tidak lengkap. |
| **401** | Unauthorized | Akses ditolak karena belum melakukan autentikasi (belum login). | Ketika mengakses halaman/API privat tanpa token login yang sah. |
| **403** | Forbidden | Server mengenali user, tetapi hak akses tidak diizinkan. | Ketika user biasa mencoba mengakses halaman khusus admin. |
| **404** | Not Found | Endpoint atau alamat URL yang diminta tidak ditemukan. | Ketika URL atau data ID di database tidak ada. |
| **500** | Internal Server Error| Terjadi kesalahan sistem atau error di sisi kode server. | Ketika ada error fatal di backend (misal: query database salah atau exception tak tertangkap). |

## Pertanyaan Analisis

1. **Apa perbedaan 400 dan 404?**
   - **400 (Bad Request):** Permintaan dikirim ke alamat yang benar, tetapi format data/payload dari client rusak atau tidak valid.
   - **404 (Not Found):** Format request bisa jadi benar, tetapi alamat endpoint URL atau resource yang dicari tidak ada di server.

2. **Apa perbedaan 401 dan 403?**
   - **401 (Unauthorized):** Client belum login atau identitasnya belum dikenali sama sekali.
   - **403 (Forbidden):** Client sudah login, tetapi tidak memiliki izin/hak akses untuk membuka halaman tersebut.

3. **Mengapa 500 menunjukkan masalah pada sisi server?**
   - Karena kode 5xx mengindikasikan bahwa server gagal memproses permintaan akibat kesalahan internal pada kode program, kegagalan koneksi database, atau gangguan infrastruktur di backend, bukan karena kesalahan input dari client.

4. **Apakah semua error HTTP berarti server mengalami kerusakan?**
   - Tidak. Error kelompok 4xx murni merupakan kesalahan di sisi client (salah URL, salah input, belum login), sedangkan servernya sendiri berjalan sangat normal.

## Screenshot Pengujian Status Code
![200](./asset/Screenshot%20(268).png)
![201](./asset/Screenshot%20(269).png)
![400](./asset/Screenshot%20(270).png)
![401](./asset/Screenshot%20(271).png)
![403](./asset/Screenshot%20(272).png)
![404](./asset/Screenshot%20(273).png)
![500](./asset/Screenshot%20(274).png)