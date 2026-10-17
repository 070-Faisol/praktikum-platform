# moh faisol

**2024520070**

---

## TUGAS PENDAHULUAN

1. Bandingkan struktur data pada /posts/1 dan /users/1 di JSONPlaceholder. jelaskan perbedaan field dan fungsinya
2. Analisa struktur tabel yang ada pada /posts dan /users di JSONPlaceholder. Buat diagram relasi sederhana yang menjelaskan hubungan antar tabel.
3. Analisis hubungan antara URL, method, dan data yang dikembalikan pada contoh /posts di JSONPlaceholder.
4. Bedakan penggunaan /posts/1 dan ?userId=1 berdasarkan hasil yang dikembalikan JSONPlaceholder.

---

## Jawaban

### 1.

Data pada /posts/1 jauh lebih sederhana dan fokus pada isi konten. Di dalamnya hanya terdapat empat field, yaitu userId untuk menandai siapa pemilik postingannya, id sebagai nomor unik postingan, serta title dan body yang masing-masing berisi judul dan teks utama dari tulisan tersebut.

Sebaliknya, data pada /users/1 jauh lebih kompleks dan detail karena berisi informasi lengkap tentang identitas seseorang. Selain menyimpan data dasar seperti id, name, username, email, phone, dan website, struktur ini juga menggunakan objek bersarang (nested object) untuk mengelompokkan data yang lebih spesifik. Contohnya adalah field address yang merinci alamat lengkap beserta koordinat peta, serta field company yang menjelaskan nama dan jenis perusahaan tempat pengguna tersebut bekerja.

Secara singkat, /posts/1 bertindak sebagai data konten yang berdiri sendiri tetapi terhubung ke pembuatnya lewat userId, sedangkan /users/1 adalah data profil induk yang menyimpan informasi personal secara lengkap dan mendalam.

### 2. Analisis Struktur Tabel

#### A. Tabel users (Tabel Induk / Parent Table)

Tabel ini merepresentasikan data entitas utama yaitu pengguna sistem. id (Integer, Primary Key): Nomor unik untuk mengidentifikasi setiap pengguna. name, username, email (String): Informasi identitas personal dan akun. address (Object/JSON): Data terstruktur yang mencakup alamat lengkap (street, suite, city, zipcode) serta koordinat geografis (geo: lat, lng). phone, website (String): Kontak dan situs web pengguna. company (Object/JSON): Informasi perusahaan tempat pengguna bekerja (name, catchPhrase, bs).

#### B. Tabel posts (Tabel Anak / Child Table)

Tabel ini merepresentasikan konten atau artikel yang dibuat oleh pengguna.

id (Integer, Primary Key): Nomor unik untuk setiap postingan. userId (Integer, Foreign Key): Field kunci yang merujuk langsung ke id pada tabel users. title (String): Judul dari postingan. body (String): Isi teks atau konten utama postingan.

#### Diagram Relasi Sederhana (ERD)

Hubungan antara tabel users dan posts adalah One-to-Many (1 ke Banyak). Artinya, satu pengguna dapat membuat banyak postingan, tetapi satu postingan hanya dimiliki oleh satu pengguna.

```
+-----------------------+             +-----------------------+
|         USERS         |             |         POSTS         |
+-----------------------+             +-----------------------+
| PK id        (INT)    |<----+       | PK id        (INT)    |
|    name      (STRING) |     |       | FK userId    (INT)    |
|    username  (STRING) |     +-------|    title     (STRING) |
|    email     (STRING) |  1       N  |    body      (STRING) |
|    address   (OBJECT) |             +-----------------------+
|    company   (OBJECT) |
+-----------------------+
```

### 3.

Analisis hubungan antara URL, HTTP *method*, dan data yang dikembalikan pada endpoint `/posts` di JSONPlaceholder menunjukkan penerapan standar arsitektur RESTful API yang sangat konsisten. URL berfungsi untuk menentukan sumber daya atau entitas yang dituju, seperti `/posts` untuk mengakses keseluruhan data postingan, sementara HTTP *method* bertindak sebagai instruksi yang memberi tahu server tindakan apa yang harus dilakukan terhadap data tersebut. Ketika kita menggunakan method GET pada URL dasar /posts, server merespons dengan mengembalikan sekumpulan data dalam bentuk array yang berisi daftar seluruh postingan. Sebaliknya, ketika URL tersebut ditambahkan parameter spesifik di bagian akhir, seperti /posts/1, dan dipadukan dengan method GET, server mengubah bentuk responsnya dari daftar koleksi menjadi satu objek tunggal milik postingan dengan ID nomor satu saja.

Selain untuk mengambil data, hubungan ini juga berlaku dinamis saat melakukan manipulasi data. Jika kita mengirimkan method POST ke URL /posts, server tidak lagi mengembalikan daftar atau objek lama, melainkan merespons dengan data baru yang berhasil diciptakan lengkap beserta nomor ID uniknya. Sementara itu, penggunaan URL spesifik seperti /posts/1 yang dikombinasikan dengan method perubahan seperti PUT atau PATCH akan menginstruksikan server untuk memperbarui isi data pada ID tersebut dan mengembalikan objek yang sudah termodifikasi. Secara keseluruhan, kombinasi antara alamat URL yang tepat dan pemilihan method yang sesuai secara otomatis menentukan bentuk, ukuran, serta sifat dari respons data yang diberikan oleh server.

### 4.

Perbedaan penggunaan `/posts/1` dan `/posts?userId=1` pada JSONPlaceholder terletak pada cara penentuan target data dan bentuk hasil respons yang dikembalikan oleh server. Penggunaan /posts/1 dengan path parameter berfungsi untuk mengambil satu data postingan secara spesifik berdasarkan nomor ID postingan itu sendiri. Hasil yang dikembalikan dari alamat ini berupa sebuah objek tunggal yang memuat detail lengkap dari satu pos tertentu dengan ID nomor 1.

Sebaliknya, penulisan `/posts?userId=1` menggunakan query parameter berfungsi sebagai filter untuk menyaring kumpulan data berdasarkan kriteria kepemilikan. Hasil yang dikembalikan oleh server bukanlah satu objek tunggal, melainkan sebuah array atau daftar yang berisi seluruh postingan yang dibuat oleh pengguna dengan ID 1. Dengan demikian, /posts/1 berfokus pada identitas unik suatu artikel, sementara /posts?userId=1 digunakan untuk mengelompokkan dan menampilkan semua karya tulis yang dimiliki oleh pembuat atau user tertentu.

---

