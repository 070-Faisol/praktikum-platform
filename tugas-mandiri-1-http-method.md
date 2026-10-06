# Tugas Mandiri 1 — Mengenal HTTP Method dan Endpoint

Berikut adalah tabel hasil pengujian kelima HTTP method menggunakan layanan publik HTTPBin (`https://httpbin.org`) melalui Postman:

| No | Method | Endpoint | Data yang dikirim | Status | Hasil (Response Body / Informasi Server) |
|:--:|:--|:--|:--|:--:|:---|
| 1 | GET | `/get` | Query parameter (kosong) | 200 | Server mengembalikan metadata request, termasuk `args: {}`, `headers`, IP pengirim (`origin`), serta URL target. |
| 2 | POST | `/post` | JSON / Body (`{"pesan": "halo post"}`) | 200 | Server berhasil menerima dan memantulkan kembali data JSON (`"pesan": "halo post"`), lengkap dengan header dan informasi `origin`. |
| 3 | PUT | `/put` | JSON / Body | 200 | Server memproses method PUT untuk memperbarui data; mengembalikan respons sukses dengan struktur metadata request. |
| 4 | PATCH | `/patch` | JSON / Body | 200 | Server memproses method PATCH untuk pembaruan sebagian data; mengembalikan respons sukses dengan struktur metadata request. |
| 5 | DELETE | `/delete` | - | 200 | Server memproses method DELETE untuk menghapus data; mengembalikan respons sukses beserta informasi request. |

## Screenshot Pengujian Postman
![GET](./asset/Screenshot%20(262).png)
![POST](./asset/Screenshot%20(263).png)
![PUT](./asset/Screenshot%20(264).png)
![PATCH](./asset/Screenshot%20(265).png)
![DELETE](./asset/Screenshot%20(266).png)