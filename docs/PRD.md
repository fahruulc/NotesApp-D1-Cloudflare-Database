# PRD --- Notes App

> **Status:** Draft v1.0\
> **Project type:** Learning project / personal notes app\
> **Last updated:** 2026-10-13

## 1. Ringkasan

Notes App adalah aplikasi web full-stack sederhana untuk membuat,
membaca, mengedit, dan menghapus catatan pribadi. Aplikasi dibuat
menggunakan Next.js dan TypeScript dalam satu codebase (monolith),
memakai Prisma ORM untuk akses data, serta Cloudflare D1 sebagai
database SQLite terkelola. Aplikasi ditargetkan berjalan di ekosistem
Cloudflare.

Fokus proyek ini adalah mempelajari alur pengembangan aplikasi
full-stack, pemodelan data dengan Prisma, migrasi schema, akses database
D1, dan deployment. Autentikasi dan fitur kolaborasi tidak termasuk
dalam versi awal.

## 2. Latar Belakang dan Tujuan

Proyek dimulai dari starter Next.js yang masih kosong. Aplikasi Notes
dipilih karena ruang lingkupnya kecil, tetapi mencakup siklus dasar
pengembangan aplikasi berbasis database.

### Tujuan

-   Membangun aplikasi Notes yang benar-benar berfungsi dari UI hingga
    database.
-   Mempraktikkan Next.js full-stack dengan TypeScript.
-   Menggunakan Prisma ORM untuk operasi database yang type-safe.
-   Menggunakan Cloudflare D1 sebagai database SQLite.
-   Memahami migration dan perbedaan database lokal dengan remote.
-   Men-deploy aplikasi ke Cloudflare dan mendokumentasikan cara
    menjalankannya.

### Indikator keberhasilan

-   Pengguna dapat membuat, melihat, mengedit, dan menghapus catatan.
-   Data tetap tersedia setelah halaman dimuat ulang dan setelah
    deployment baru yang tidak menghapus database.
-   Operasi database hanya dilakukan dari sisi server.
-   Schema database dapat dibuat dan diperbarui melalui migration yang
    terdokumentasi.
-   Aplikasi dapat dijalankan secara lokal dan diakses melalui URL
    deployment Cloudflare.

## 3. Target Pengguna

**Pengguna utama:** pemilik aplikasi untuk penggunaan pribadi dan
pembelajaran.

Aplikasi versi awal tidak memiliki akun pengguna. Karena itu, aplikasi
**tidak boleh dianggap sebagai tempat penyimpanan catatan privat yang
aman untuk banyak pengguna**. Siapa pun yang dapat mengakses URL
aplikasi berpotensi melihat atau mengubah catatan jika tidak ada kontrol
akses tambahan.

## 4. Ruang Lingkup

### 4.1 Fitur dalam scope (MVP)

1.  Menampilkan daftar catatan.
2.  Membuat catatan baru.
3.  Menampilkan isi catatan.
4.  Mengedit catatan yang sudah ada.
5.  Menghapus catatan dengan konfirmasi.
6.  Validasi judul dan isi catatan.
7.  Menampilkan kondisi loading, kosong, sukses, dan error secara wajar.
8.  Menyimpan data secara persisten di Cloudflare D1.
9.  Mendukung tampilan desktop dan mobile.
10. Menyediakan petunjuk setup, migration, pengembangan lokal, dan
    deployment dalam README.

### 4.2 Tidak termasuk dalam scope

-   Autentikasi, registrasi, dan manajemen akun.
-   Catatan terpisah untuk setiap pengguna.
-   Kolaborasi atau berbagi catatan.
-   Rich-text editor, lampiran file, gambar, dan upload.
-   Tag, folder, kategori, pin, favorit, dan pencarian lanjutan.
-   Sinkronisasi offline.
-   Notifikasi, komentar, dan riwayat versi.
-   Integrasi AI.
-   Aplikasi mobile native.

Fitur di luar scope dapat dipertimbangkan setelah MVP selesai.

## 5. User Stories

-   Sebagai pengguna, saya ingin melihat semua catatan agar dapat
    menemukan catatan yang sudah saya buat.
-   Sebagai pengguna, saya ingin membuat catatan dengan judul dan isi
    agar informasi dapat disimpan.
-   Sebagai pengguna, saya ingin membuka sebuah catatan agar dapat
    membaca isinya.
-   Sebagai pengguna, saya ingin mengedit catatan agar informasi tetap
    akurat.
-   Sebagai pengguna, saya ingin menghapus catatan setelah konfirmasi
    agar catatan yang tidak diperlukan dapat dibuang.
-   Sebagai pengguna, saya ingin menerima pesan yang jelas ketika input
    tidak valid atau operasi gagal.
-   Sebagai developer, saya ingin schema dan perubahan database dikelola
    melalui migration agar lingkungan lokal dan remote dapat disiapkan
    secara konsisten.

## 6. Persyaratan Fungsional

### FR-01 --- Daftar catatan

-   Sistem menampilkan catatan yang tersimpan.
-   Urutan default adalah catatan terbaru lebih dahulu (`createdAt`
    menurun).
-   Setiap item menampilkan judul, cuplikan isi, dan waktu pembuatan
    atau pembaruan.
-   Jika belum ada catatan, tampilkan empty state dengan ajakan membuat
    catatan.

### FR-02 --- Membuat catatan

-   Pengguna mengisi judul dan isi.
-   Judul wajib diisi setelah spasi di awal/akhir dihapus.
-   Isi boleh kosong.
-   Sistem menyimpan catatan ke D1 melalui Prisma di sisi server.
-   Setelah berhasil, UI memperbarui daftar atau membuka catatan yang
    baru dibuat.
-   Jika gagal, tampilkan pesan error yang dapat dipahami.

### FR-03 --- Melihat detail catatan

-   Pengguna dapat membuka catatan dari daftar.
-   Sistem menampilkan judul, isi, dan waktu terkait.
-   Jika ID tidak ditemukan, sistem menampilkan status not found yang
    sesuai.

### FR-04 --- Mengedit catatan

-   Pengguna dapat mengubah judul dan isi.
-   Validasi judul yang sama dengan proses pembuatan diterapkan.
-   Sistem menyimpan perubahan dan memperbarui `updatedAt`.
-   ID yang tidak ditemukan tidak boleh dianggap berhasil.

### FR-05 --- Menghapus catatan

-   Pengguna harus mengonfirmasi penghapusan.
-   Setelah berhasil, catatan hilang dari daftar.
-   Jika ID tidak ditemukan atau operasi gagal, UI menampilkan hasil
    yang sesuai.

### FR-06 --- Validasi dan error

-   Validasi dilakukan di server, bukan hanya melalui atribut form di
    browser.
-   Input tidak tepercaya tidak boleh dimasukkan ke SQL melalui string
    concatenation.
-   Error teknis tidak menampilkan stack trace atau detail internal
    kepada pengguna.
-   Form mencegah pengiriman berulang yang tidak disengaja selama
    operasi berlangsung.

## 7. Persyaratan Non-Fungsional

-   **Kesederhanaan:** implementasi diprioritaskan agar mudah dibaca dan
    dipelajari.
-   **Type safety:** gunakan TypeScript dan tipe hasil Prisma sejauh
    sesuai.
-   **Keamanan:** semua akses database berlangsung di server; jangan
    mengirim kredensial atau binding database ke client.
-   **Validasi:** validasi input di server; library validasi seperti Zod
    bersifat opsional, bukan kewajiban MVP.
-   **Responsivitas:** UI dapat digunakan di layar desktop dan ponsel.
-   **Aksesibilitas dasar:** kontrol form memiliki label, tombol dapat
    digunakan dengan keyboard, dan dialog konfirmasi dapat dipahami.
-   **Maintainability:** pisahkan UI, validasi, dan akses data
    secukupnya; hindari abstraksi berlebihan untuk aplikasi kecil.
-   **Persistensi:** data produksi berada di D1 remote dan tidak
    bergantung pada filesystem lokal Worker.
-   **Biaya:** mulai dengan tier gratis selama memenuhi syarat dan kuota
    penyedia; monitor penggunaan dan jangan mengasumsikan seluruh
    layanan akan selalu gratis.

## 8. Data Model

Model awal hanya memiliki satu entitas: `Note`.

  Field         Tipe konseptual   Aturan
  ------------- ----------------- ------------------------------------------
  `id`          Integer           Primary key, auto-increment
  `title`       String            Wajib, tidak boleh kosong setelah trim
  `content`     String            Wajib pada schema, default string kosong
  `createdAt`   DateTime          Diisi saat record dibuat
  `updatedAt`   DateTime          Diisi saat record dibuat dan diperbarui

Catatan implementasi: - Gunakan Prisma schema dengan provider `sqlite`
untuk kompatibilitas D1. - Nama model/field dapat dipetakan ke nama
tabel/kolom SQLite jika diperlukan. - D1 remote dan database simulasi
lokal merupakan lingkungan terpisah. - Perubahan schema harus disertai
migration SQL yang ditinjau sebelum diterapkan. - Jangan menyimpan data
rahasia di contoh seed atau fixture.

## 9. Arsitektur dan Teknologi

### Stack target

-   **Framework:** Next.js, App Router, TypeScript.
-   **UI:** React dan CSS/styling yang sudah tersedia dari starter;
    pilih pendekatan sederhana dan konsisten.
-   **ORM:** Prisma ORM v7 dengan adapter D1 yang sesuai.
-   **Database:** Cloudflare D1 (SQLite).
-   **Runtime/hosting:** Cloudflare Workers melalui jalur deployment
    Next.js yang kompatibel.
-   **Tooling Cloudflare:** Wrangler untuk binding, database, migration
    SQL, local development, dan deployment.
-   **Version control:** Git.

### Prinsip arsitektur

-   Satu codebase Next.js sebagai full-stack monolith.
-   Komponen UI tidak mengakses database secara langsung.
-   Query Prisma hanya dijalankan di server-side code (misalnya Server
    Actions atau Route Handlers).
-   Semua operasi tulis dan input pengguna divalidasi di server.
-   Gunakan binding D1 Cloudflare pada runtime Worker, bukan
    mengandalkan file SQLite lokal sebagai database produksi.
-   Jangan membuat Worker API terpisah kecuali ada kebutuhan arsitektur
    baru.

### Catatan kompatibilitas

Cloudflare dapat memperbarui rekomendasi dan jalur deployment Next.js.
Sebelum implementasi, verifikasi dokumentasi Cloudflare terbaru untuk
adapter Next.js yang dipilih dan pastikan adapter tersebut kompatibel
dengan Prisma ORM v7, `@prisma/adapter-d1`, serta binding D1. Jangan
mencampur contoh konfigurasi dari adapter yang berbeda tanpa validasi.

Dokumentasi awal: - Prisma ORM v7 + D1:
https://www.prisma.io/docs/guides/v7/deployment/cloudflare-d1 -
Cloudflare Next.js:
https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/ -
OpenNext bindings (jika menggunakan OpenNext):
https://opennext.js.org/cloudflare/bindings - Cloudflare D1 migrations:
https://developers.cloudflare.com/d1/reference/migrations/

## 10. Alur Pengguna Utama

### Membuat catatan

1.  Pengguna membuka halaman utama.
2.  Pengguna memilih tombol "Catatan Baru".
3.  Sistem menampilkan form judul dan isi.
4.  Pengguna mengisi judul dan isi lalu menyimpan.
5.  Server memvalidasi input.
6.  Prisma menyimpan data ke D1.
7.  UI menampilkan catatan yang berhasil dibuat atau pesan error.

### Mengedit catatan

1.  Pengguna memilih catatan.
2.  Pengguna memilih aksi edit.
3.  Form diisi dengan data yang ada.
4.  Pengguna mengubah data dan menyimpan.
5.  Server memvalidasi dan memperbarui data di D1.
6.  UI menampilkan hasil terbaru.

### Menghapus catatan

1.  Pengguna memilih aksi hapus.
2.  UI meminta konfirmasi.
3.  Jika pengguna membatalkan, data tidak berubah.
4.  Jika pengguna mengonfirmasi, server menghapus catatan.
5.  UI memperbarui daftar dan menampilkan hasil operasi.

## 11. Halaman dan UI

-   `/` --- daftar catatan, empty state, dan tombol membuat catatan.
-   `/notes/new` --- form membuat catatan.
-   `/notes/[id]` --- detail catatan.
-   `/notes/[id]/edit` --- form mengedit catatan.

Rute di atas adalah usulan untuk App Router dan boleh disederhanakan
apabila Server Actions atau pola routing yang dipilih lebih sesuai.
Gunakan UI minimal: judul aplikasi, daftar catatan, form sederhana,
tombol simpan/batal, dan konfirmasi penghapusan.

## 12. Kriteria Penerimaan (Acceptance Criteria)

MVP dianggap selesai jika semua hal berikut terpenuhi:

-   [ ] Aplikasi berjalan secara lokal.
-   [ ] Pengguna dapat membuat catatan dengan judul valid.
-   [ ] Judul kosong ditolak dengan pesan yang jelas.
-   [ ] Catatan yang dibuat muncul di daftar.
-   [ ] Catatan dapat dibuka dan isinya terbaca.
-   [ ] Catatan dapat diedit dan perubahan tersimpan.
-   [ ] Catatan dapat dihapus setelah konfirmasi.
-   [ ] ID yang tidak ditemukan menghasilkan kondisi not found/error
    yang sesuai.
-   [ ] Data tetap ada setelah reload.
-   [ ] Query database berjalan di server dan menggunakan Prisma.
-   [ ] Migration SQL terdokumentasi dan dapat diterapkan ke D1 lokal.
-   [ ] Migration dapat diterapkan ke D1 remote dengan langkah
    eksplisit.
-   [ ] Aplikasi berhasil di-deploy ke Cloudflare Workers.
-   [ ] README menjelaskan setup, development, migration, dan
    deployment.
-   [ ] Tidak ada kredensial, token, atau database ID sensitif yang
    di-commit sebagai secret.

## 13. Strategi Pengujian

### Pengujian manual minimum

-   Membuat catatan dengan judul dan isi.
-   Membuat catatan dengan isi kosong.
-   Mengirim judul kosong atau hanya spasi.
-   Membuka ID yang tidak ada.
-   Mengedit judul dan isi.
-   Menghapus catatan dan membatalkan konfirmasi.
-   Memastikan daftar tetap benar setelah reload.
-   Memastikan data lokal dan remote tidak tertukar.
-   Menguji alur utama pada ukuran layar desktop dan mobile.

### Pengujian otomatis (bertahap)

Untuk MVP, minimal tambahkan test untuk validasi judul dan fungsi data
penting jika struktur proyek sudah stabil. Pengujian end-to-end dapat
ditambahkan setelah CRUD berjalan. Jangan menunda fitur dasar hanya demi
menyiapkan test framework yang terlalu kompleks.

## 14. Migration dan Lingkungan

Pisahkan tiga hal berikut:

-   **Schema Prisma:** definisi model yang menjadi acuan struktur data.
-   **Migration SQL:** file SQL yang dihasilkan/dikelola dari perubahan
    schema dan ditinjau sebelum diterapkan.
-   **Database D1:** database lokal untuk development dan database
    remote untuk deployment.

Untuk Prisma ORM v7 + D1, ikuti workflow resmi yang menggunakan
`prisma migrate diff` untuk menghasilkan SQL lalu Wrangler untuk
menerapkannya ke D1. Jangan mengasumsikan workflow `prisma migrate dev`
yang umum dipakai pada database server berlaku sama untuk D1.

Setiap perubahan model yang memerlukan perubahan tabel harus memiliki
migration. Hindari mengubah schema remote secara manual tanpa mencatat
perubahan tersebut dalam repo.

## 15. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  Adapter Next.js berubah atau belum  Validasi dokumentasi Cloudflare dan
  kompatibel dengan dependency        Prisma sebelum mengunci setup.

  Workflow migration D1 berbeda dari  Ikuti panduan Prisma v7 + D1 dan
  database lain                       tinjau SQL sebelum apply.

  Database lokal dan remote tertukar  Gunakan perintah dan dokumentasi
                                      yang secara eksplisit membedakan
                                      `--local` dan `--remote`.

  Tidak ada autentikasi               Gunakan hanya untuk
                                      belajar/pribadi; jangan menyimpan
                                      data sensitif atau membuka akses
                                      publik untuk data privat.

  Binding tidak tersedia pada runtime Pastikan kode database hanya
  yang digunakan                      dijalankan di runtime Cloudflare
                                      yang mendukung binding D1.

  Perubahan konfigurasi mematahkan    Lakukan perubahan kecil, commit
  build                               Git, dan verifikasi build/preview
                                      setelah perubahan.
  -----------------------------------------------------------------------

## 16. Tahapan Development

### Tahap 1 --- Fondasi

-   [ ] Periksa versi Node.js dan starter Next.js.
-   [ ] Commit kondisi awal ke Git.
-   [ ] Pilih dan siapkan jalur deployment Next.js di Cloudflare.
-   [ ] Pastikan aplikasi starter bisa berjalan lokal dan dalam preview
    runtime target.

### Tahap 2 --- Database dan Prisma

-   [ ] Buat database D1.
-   [ ] Tambahkan binding D1 pada konfigurasi Cloudflare.
-   [ ] Instal Prisma ORM v7 dan adapter D1 yang sesuai.
-   [ ] Definisikan model `Note`.
-   [ ] Hasilkan migration SQL dan terapkan ke D1 lokal.
-   [ ] Uji koneksi/query sederhana dari server-side code.

### Tahap 3 --- CRUD

-   [ ] Implementasikan daftar dan detail catatan.
-   [ ] Implementasikan pembuatan catatan.
-   [ ] Implementasikan edit catatan.
-   [ ] Implementasikan penghapusan dengan konfirmasi.
-   [ ] Tambahkan validasi dan state loading/error/empty.

### Tahap 4 --- Verifikasi dan deployment

-   [ ] Uji seluruh acceptance criteria secara lokal.
-   [ ] Tinjau migration SQL.
-   [ ] Terapkan migration ke D1 remote.
-   [ ] Deploy ke Cloudflare Workers.
-   [ ] Uji CRUD pada URL deployment.
-   [ ] Dokumentasikan setup akhir di README.

## 17. Definisi Selesai (Definition of Done)

Sebuah fitur dianggap selesai jika: - Perilaku sesuai user story dan
acceptance criteria. - Validasi penting dijalankan di server. - Tidak
ada akses database dari client. - Error ditangani secara wajar. -
Perubahan schema disertai migration jika diperlukan. - Kode berjalan
tanpa error TypeScript/build yang diketahui. - Perubahan sudah diuji
pada lingkungan yang relevan.

## 18. Keputusan yang Sengaja Ditunda

Keputusan berikut belum diperlukan untuk MVP: - Authentication dan
multi-user. - Library form/validasi tambahan. - State management
global. - UI component library. - Search, pagination, tags, dan
kategori. - Strategi backup/retensi lanjutan. - Custom domain dan
observability lanjutan.

Keputusan ini dapat diambil setelah alur CRUD inti berjalan.

------------------------------------------------------------------------

## Catatan untuk Developer

Dokumen ini adalah acuan produk dan acceptance criteria, bukan instruksi
untuk memasang semua dependency sekaligus. Implementasikan bertahap,
verifikasi hasil setiap tahap, dan rujuk dokumentasi resmi untuk
konfigurasi yang sensitif terhadap versi.
