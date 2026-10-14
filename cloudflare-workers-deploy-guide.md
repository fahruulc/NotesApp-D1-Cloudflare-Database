# Deploy Next.js + Cloudflare Workers + D1

Panduan ringkas command dari project lokal sampai deploy ke Cloudflare Workers.

> **Folder project:** `D:/Fachrur Rizhky/Content/notes-app-d1-cloudflare`  
> **Worker:** `notes-app-d1-cloudflare`  
> **Database D1:** `notes-db`

## 1. Masuk ke folder project

Buka Git Bash:

```bash
cd "D:/Fachrur Rizhky/Content/notes-app-d1-cloudflare"
```

## 2. Install dependencies

Jalankan saat pertama kali clone project, atau ketika dependencies berubah:

```bash
npm install
```

## 3. Login ke Cloudflare

Jalankan jika belum login, atau sesi login sudah tidak berlaku:

```bash
npx wrangler login
```

Perintah ini membuka browser untuk autentikasi Cloudflare.

## 4. Build dan jalankan preview lokal

```bash
npm run preview
```

Script project ini menjalankan:

```bash
opennextjs-cloudflare build && opennextjs-cloudflare preview
```

- `build`: membangun Next.js dan menghasilkan output untuk Cloudflare di `.open-next/`.
- `preview`: menguji hasil build secara lokal dalam lingkungan Workers.
- Preview tidak memperbarui Worker production.

Hentikan preview dengan `Ctrl + C`.

## 5. Deploy ke Cloudflare Workers

```bash
npm run deploy
```

Script project ini menjalankan:

```bash
opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

- Build dijalankan terlebih dahulu.
- Jika build berhasil, OpenNext men-deploy hasilnya melalui Wrangler.
- Deploy pertama dapat membuat Worker; deploy berikutnya memperbarui Worker dengan nama yang sama di `wrangler.jsonc`.
- Setelah selesai, buka URL `*.workers.dev` yang ditampilkan di terminal.

## 6. Verifikasi data di remote D1

Untuk menghitung jumlah catatan pada database production:

```bash
npx wrangler d1 execute notes-db --remote --command="SELECT COUNT(*) AS total_notes FROM Note;"
```

`--remote` berarti command dijalankan pada database D1 Cloudflare, bukan database lokal. Query ini hanya membaca jumlah data.

## 7. Alur singkat untuk update UI berikutnya

Setiap kali selesai mengubah UI:

```bash
npm run preview
```

Periksa hasilnya, hentikan preview dengan `Ctrl + C`, lalu deploy:

```bash
npm run deploy
```

Kemudian buka kembali URL Worker yang sama. Deployment UI biasanya tidak mengubah isi database D1.

## Catatan penting

- Simpan `wrangler.jsonc`, source code, `package.json`, `package-lock.json`, Prisma schema, dan file migrasi SQL di Git.
- Jangan commit `.env`, `.dev.vars`, token Cloudflare, API key, atau credential rahasia.
- Folder hasil generate seperti `.open-next/` dan `.wrangler/` tidak perlu di-commit.
- Repository ini public dan aplikasi Notes belum memiliki autentikasi. Jangan gunakan data sensitif; endpoint publik mungkin dapat diakses orang lain untuk membaca atau mengubah catatan.
- Schema tabel remote `Note` sudah dibuat sebelumnya secara langsung. Status migrasi Wrangler mungkin masih menunjukkan migrasi awal sebagai pending. **Jangan jalankan `wrangler d1 migrations apply` secara membabi buta**, karena tabelnya sudah ada dan migrasi dapat gagal akibat tabel duplikat. Rekonsiliasi status migrasi secara terencana jika diperlukan.
- Peringatan Node.js `DEP0190` yang muncul setelah deploy bukan dengan sendirinya berarti deployment gagal; periksa apakah log menampilkan `Success` dan URL Worker.
