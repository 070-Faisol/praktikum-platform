# Dokumentasi Routing API v1 - Modul 4 Express.js

Dokumen ini berisi dokumentasi lengkap route API lokal yang dibangun menggunakan Express 4.21.2 dengan struktur modular dan nested routing.

---

## 1. Ringkasan Route API

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Asal Input | Status Sukses | Status Gagal | Deskripsi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1` | — | `200 OK` | — | Memeriksa status kesehatan API (Welcome endpoint) |
| `GET` | `/api/v1/jadwal` | `req.query` (`?status=`) | `200 OK` | — | Menampilkan daftar jadwal, opsional memfilter status |
| `GET` | `/api/v1/jadwal/jumlah-jadwal` | — (array jadwal) | `200 OK` | — | Menghitung total jumlah seluruh jadwal |
| `GET` | `/api/v1/jadwal/:id` | `req.params.id` | `200 OK` | `400 Bad Request`, `404 Not Found` | Mengambil detail satu jadwal berdasarkan ID |
| `POST` | `/api/v1/jadwal` | `req.body` (JSON) | `201 Created` | `400 Bad Request` | Menambahkan data jadwal baru |
| `PUT` | `/api/v1/jadwal/:id` | `req.params.id` & `req.body` | `200 OK` | `404 Not Found` | Mengubah/memperbarui data jadwal yang ada |
| `DELETE` | `/api/v1/jadwal/:id` | `req.params.id` | `200 OK` | `404 Not Found` | Menghapus data jadwal dari memory array |
| `GET` | `/api/v1/jadwal/:jadwalId/peserta` | `req.params.jadwalId` (Router Induk) | `200 OK` | `404 Not Found` | Menampilkan seluruh peserta pada jadwal tertentu |
| `POST` | `/api/v1/jadwal/:jadwalId/peserta` | `req.params.jadwalId` & `req.body` | `201 Created` | `400 Bad Request`, `404 Not Found` | Menambahkan peserta baru ke jadwal tertentu |
| `GET` | `/api/v1/jadwal/:jadwalId/peserta/:pesertaId` | `req.params.jadwalId` & `req.params.pesertaId` | `200 OK` | `404 Not Found` | Mengambil detail satu peserta pada jadwal tertentu |

---

## 2. Detail Endpoint & Contoh Response

### 2.1. Welcome Endpoint
- **Method**: `GET`
- **URL**: `/api/v1`
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Welcome to API v1",
    "data": null
  }
  ```

### 2.2. Get All / Filter Jadwal
- **Method**: `GET`
- **URL**: `/api/v1/jadwal` atau `/api/v1/jadwal?status=aktif`
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Daftar jadwal berhasil diambil",
    "data": [
      { "id": 1, "mataKuliah": "Pemrograman Berbasis Platform", "status": "aktif" },
      { "id": 2, "mataKuliah": "Basis Data", "status": "aktif" }
    ]
  }
  ```

### 2.3. Hitung Jumlah Jadwal (Route Statis)
- **Method**: `GET`
- **URL**: `/api/v1/jadwal/jumlah-jadwal`
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Jumlah jadwal berhasil dihitung",
    "data": { "total": 3 }
  }
  ```

### 2.4. Get Detail Jadwal by ID
- **Method**: `GET`
- **URL**: `/api/v1/jadwal/:id` (Contoh: `/api/v1/jadwal/1`)
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Jadwal berhasil diambil",
    "data": { "id": 1, "mataKuliah": "Pemrograman Berbasis Platform", "status": "aktif" }
  }
  ```
- **Response Gagal (`400 Bad Request`)** - ID non-angka (misal: `/api/v1/jadwal/abc`):
  ```json
  {
    "status": false,
    "message": "id harus berupa angka"
  }
  ```
- **Response Gagal (`404 Not Found`)** - ID tidak ditemukan (misal: `/api/v1/jadwal/99`):
  ```json
  {
    "status": false,
    "message": "Jadwal tidak ditemukan"
  }
  ```

### 2.5. Tambah Jadwal Baru
- **Method**: `POST`
- **URL**: `/api/v1/jadwal`
- **Body Request**: `{"mataKuliah": "Keamanan Aplikasi", "status": "aktif"}`
- **Response Sukses (`201 Created`)**:
  ```json
  {
    "status": true,
    "message": "Jadwal berhasil ditambahkan",
    "data": { "id": 4, "mataKuliah": "Keamanan Aplikasi", "status": "aktif" }
  }
  ```

### 2.6. Update Jadwal
- **Method**: `PUT`
- **URL**: `/api/v1/jadwal/:id` (Contoh: `/api/v1/jadwal/1`)
- **Body Request**: `{"status": "selesai"}`
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Jadwal berhasil diperbarui",
    "data": { "id": 1, "mataKuliah": "Pemrograman Berbasis Platform", "status": "selesai" }
  }
  ```

### 2.7. Hapus Jadwal
- **Method**: `DELETE`
- **URL**: `/api/v1/jadwal/:id` (Contoh: `/api/v1/jadwal/3`)
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Jadwal berhasil dihapus",
    "data": { "id": 3, "mataKuliah": "Jaringan Komputer", "status": "selesai" }
  }
  ```

### 2.8. Get Peserta dari Jadwal (Route Bersarang)
- **Method**: `GET`
- **URL**: `/api/v1/jadwal/:jadwalId/peserta` (Contoh: `/api/v1/jadwal/1/peserta`)
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Daftar peserta berhasil diambil",
    "data": [
      { "id": 101, "jadwalId": 1, "nim": "2026001", "nama": "Alya" },
      { "id": 102, "jadwalId": 1, "nim": "2026002", "nama": "Bima" }
    ]
  }
  ```
- **Response Gagal (`404 Not Found`)** - Jadwal Induk tidak ditemukan (misal: `/api/v1/jadwal/99/peserta`):
  ```json
  {
    "status": false,
    "message": "Jadwal tidak ditemukan"
  }
  ```

### 2.9. Get Single Peserta dari Jadwal
- **Method**: `GET`
- **URL**: `/api/v1/jadwal/:jadwalId/peserta/:pesertaId` (Contoh: `/api/v1/jadwal/1/peserta/101`)
- **Response Sukses (`200 OK`)**:
  ```json
  {
    "status": true,
    "message": "Peserta berhasil diambil",
    "data": { "id": 101, "jadwalId": 1, "nim": "2026001", "nama": "Alya" }
  }
  ```
- **Response Gagal (`404 Not Found`)** - Peserta ada di jadwal lain / tidak ditemukan (misal: `/api/v1/jadwal/1/peserta/103`):
  ```json
  {
    "status": false,
    "message": "Peserta tidak ditemukan pada jadwal ini"
  }
  ```

### 2.10. Tambah Peserta ke Jadwal
- **Method**: `POST`
- **URL**: `/api/v1/jadwal/:jadwalId/peserta` (Contoh: `/api/v1/jadwal/2/peserta`)
- **Body Request**: `{"nim": "2026004", "nama": "Damar"}`
- **Response Sukses (`201 Created`)**:
  ```json
  {
    "status": true,
    "message": "Peserta berhasil ditambahkan",
    "data": { "id": 104, "jadwalId": 2, "nim": "2026004", "nama": "Damar" }
  }
  ```
- **Response Gagal (`400 Bad Request`)** - Body tidak lengkap:
  ```json
  {
    "status": false,
    "message": "nim dan nama wajib diisi"
  }
  ```

---

## 3. Tabel Pengujian Hasil Aktual (Tahap 9)

| No. | Request | Harapan | Hasil Aktual | Status |
| :-: | :--- | :--- | :--- | :-: |
| 1 | `GET /api/v1` | 200, pesan welcome | Status 200, `"Welcome to API v1"` | Lulus |
| 2 | `GET /api/v1/jadwal?status=aktif` | 200, hanya data aktif | Status 200, mengembalikan jadwal id 1 & 2 | Lulus |
| 3 | `GET /api/v1/jadwal/abc` | 400, id harus angka | Status 400, `"id harus berupa angka"` | Lulus |
| 4 | `GET /api/v1/jadwal/99` | 404, jadwal tidak ditemukan | Status 404, `"Jadwal tidak ditemukan"` | Lulus |
| 5 | `POST /api/v1/jadwal` dengan body valid | 201, objek baru | Status 201, `"Jadwal berhasil ditambahkan"` | Lulus |
| 6 | `GET /api/v1/jadwal/1/peserta` | 200, peserta jadwal 1 | Status 200, peserta Alya & Bima | Lulus |
| 7 | `GET /api/v1/jadwal/1/peserta/103` | 404, peserta berada di jadwal lain | Status 404, `"Peserta tidak ditemukan pada jadwal ini"` | Lulus |
| 8 | `GET /api/v1/alamat-salah` | 404, fallback route | Status 404, `"Route GET /api/v1/alamat-salah tidak ditemukan"` | Lulus |

---

## 4. Perbandingan Konsep dengan Sistem ATLAS (Tahap 10)

Dalam perancangan REST API standar modern:
- Endpoint yang tidak ditemukan menggunakan **HTTP Status 404 (Not Found)** untuk menandakan bahwa resource/path tidak ada di server. Hal ini sesuai dengan prinsip RESTful API dan standar RFC 7231.
- Sistem legacy seperti **ATLAS** mengembalikan **HTTP Status 500 (Api tidak tersedia)** saat route tidak cocok.
- **Catatan Analisis**: Status 500 mengindikasikan *Internal Server Error* (kesalahan teknis di sisi server), sedangkan 404 mengindikasikan kesalahan lokasi *Client Request*. Oleh karena itu, penggunaan HTTP 404 pada API Express ini merupakan praktik yang lebih tepat dan komunikatif bagi pengembang client/frontend.
