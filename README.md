# HANA25 - Aplikasi Kenangan untuk Rikhanatun Ni'mah

_**HANA25**_ adalah aplikasi web yang didedikasikan untuk merayakan ulang tahun ke-25 **Rikhanatun Ni'mah**, yang dirancang untuk menyimpan kenangan indah melalui momen-momen yang telah dijalani bersama. Setiap elemen dari aplikasi ini dirancang dengan penuh perhatian dan kasih sayang, menciptakan sebuah tempat di mana kenangan dapat dikenang dan dihargai dalam format digital yang elegan.

## Deskripsi Aplikasi

HANA25 memungkinkan pengguna untuk menyimpan, melihat, dan berbagi momen-momen penting melalui gambar dan video yang diunggah. Aplikasi ini memberikan pengalaman interaktif dengan antarmuka yang responsif dan desain modern. Dalam rangka merayakan ulang tahun ke-25, aplikasi ini juga menyediakan fitur untuk menambahkan momen baru dan menikmati kenangan bersama orang tercinta.

## Teknologi yang Digunakan

### 1\. **Next.js 15**

Next.js adalah framework React yang memberikan kemudahan dalam pembangunan aplikasi dengan optimasi performa yang tinggi, seperti **Server-Side Rendering** (SSR) dan **Static Site Generation** (SSG). Next.js juga memungkinkan pembuatan aplikasi yang sangat responsif dan mudah diakses di berbagai perangkat.

### 2\. **Tailwind CSS**

Tailwind CSS digunakan untuk menciptakan desain yang cepat dan fleksibel. Dengan kelas utilitas yang mudah disesuaikan, Tailwind memungkinkan pengembangan antarmuka yang bersih, responsif, dan estetis, cocok dengan konsep aplikasi HANA25 yang sederhana namun penuh makna.

### 3\. **Daisy UI**

Daisy UI adalah plugin untuk Tailwind CSS yang menyediakan berbagai komponen antarmuka siap pakai. Dengan Daisy UI, aplikasi dapat memiliki desain yang modern dan konsisten, dari tombol hingga kartu untuk momen kenangan.

### 4\. **Firebase Firestore**

Firebase Firestore digunakan untuk menyimpan data aplikasi, termasuk gambar dan video yang terkait dengan setiap momen yang diunggah. Dengan Firestore, data dapat disimpan secara real-time, memungkinkan pengalaman yang lancar saat mengakses dan berbagi kenangan.

### 5\. **Framer Motion**

Framer Motion memungkinkan animasi halus dan interaktif di seluruh aplikasi, memberikan pengalaman visual yang lebih hidup dan menyenangkan saat berinteraksi dengan momen yang telah disimpan.

### 6\. **Genkit Firebase & Gemini AI API**

Aplikasi ini juga menggunakan Genkit Firebase untuk mengelola data dan Gemini AI API untuk menghasilkan quotes indah yang memberikan sentuhan personal pada setiap kenangan. Dengan integrasi API ini, setiap momen dapat dilengkapi dengan quotes yang dihasilkan secara dinamis.

## Fitur Utama

* **Tambah Momen:** Pengguna dapat menambahkan momen baru dalam bentuk gambar atau video.
* **Galeri Kenangan:** Semua momen yang diunggah dapat dilihat dalam tampilan galeri yang elegan.
* **Keamanan Pengguna:** Hanya pengguna yang terautentikasi yang dapat menambahkan momen baru.
* **Animasi Interaktif:** Menyediakan animasi halus untuk meningkatkan pengalaman pengguna saat menjelajah kenangan.
* **Quotes Dinamis:** Momen dapat dilengkapi dengan quotes yang dihasilkan oleh Gemini AI API, memberikan sentuhan pribadi pada setiap kenangan.

## Instalasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi HANA25 di mesin lokal Anda:

1. **Clone Repository**  
    Clone repositori ke dalam sistem Anda: `git clone https://github.com/idugeni/hana25.git`
2. **Instalasi Dependensi**  
    Instal dependensi yang diperlukan dengan perintah: `npm install --legacy-peer-deps`
3. **Jalankan Aplikasi**  
    Jalankan aplikasi dengan perintah: `npm run dev`
4. **Akses Aplikasi**  
    Buka browser dan kunjungi `http://localhost:3000`

## Struktur Folder

```bash
HANA25/
├── .github/
│   └── workflows/
│       └── codeql.yml
├── public/
│   ├── assets/
│   │   └── media/
│   │       └── Ed Sheeran - Photograph.mp3
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate-quote/
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── gift/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── icon.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── moments/
│   │   │   ├── [id]/
│   │   │   │   ├── edit/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── add/
│   │   │   │   └── page.tsx
│   │   │   ├── delete/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── quotes/
│   │   │   └── page.tsx
│   ├── components/
│   │   ├── AudioPlayer.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── firebase/
│   │   └── firebaseConfig.ts
│   ├── utils/
│   │   └── MetadataContext.tsx
│   ├── tsconfig.json
│   └── turbo.json
├── .gitignore
├── eslint.config.mjs
├── LICENSE
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
```

## File Penting (.env)

Jangan lupa untuk mengatur konfigurasi `Gemini AI API` dan `Firebase` di file `.env` Anda:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ACCESS_TOKEN=
NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=
```

Made with love by **Jagad Brahma Wiraatmaja** for **Rikhanatun Ni'mah**.
