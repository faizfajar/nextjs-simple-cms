# 📋 Next.js Simple CMS

CMS sederhana berbasis Next.js, dirancang untuk mengelola daftar **Menu** dan **Group Menu** secara lokal menggunakan `localStorage`.

## ✨ Fitur

* ✅ Autentikasi (dummy login)
* 📁 Manajemen **Group Menu**
* 📄 Manajemen **Menu**
* 🗃 Data disimpan di `localStorage`
* ⚡ UI responsive & clean dengan TailwindCSS

## 🧱 Teknologi

* [Next.js App Router](https://nextjs.org/docs/app)
* [TypeScript](https://www.typescriptlang.org/)
* [TailwindCSS](https://tailwindcss.com/)
* `localStorage` untuk penyimpanan data sementara

## 🚀 Struktur Folder

```
src/
├── app/
│   ├── login/                → Halaman Login
│   ├── home/                 → Dashboard setelah login
│   └── settings/
│       ├── menu/             → Manajemen Menu
│       └── group_menu/       → Manajemen Group Menu
├── components/               → Komponen UI (Form, Table, Layout, dll)
├── context/                  → Context (AuthContext, MenuContext)
└── styles/                   → Global CSS
```

## 🧪 Menjalankan Project

1. **Clone repo ini**:

   ```bash
   git clone https://github.com/faizfajar/nextjs-simple-cms.git
   cd nextjs-simple-cms
   ```

2. **Install dependency**:

   ```bash
   npm install
   ```

3. **Jalankan lokal**:

   ```bash
   npm run dev
   ```

4. **Login dummy**:

   * Username: `admin`
   * Password: `admin123`

## 📃 Catatan

* Tidak menggunakan database — semua data hilang jika cache browser dibersihkan.

## 📚 Rencana Pengembangan

* [ ] Export/import data sebagai JSON
* [ ] Tambah pagination & pencarian
* [ ] Tambah role/permission

## 👨‍💼 Author

* [@faizfajar](https://github.com/faizfajar)

---

> Built with ❤️ using Next.js & Tailwind.
