/*
 * SEMUA TEKS SITUS ADA DI FILE INI.
 * Data di bawah adalah data FIKTIF sebagai contoh. Ganti setiap bagian yang
 * bertanda "GANTI DENGAN DATA ASLI". Daftar lengkapnya ada di GANTI-DATA.md.
 */

// ---------------------------------------------------------------------------
// GANTI DENGAN DATA ASLI: judul tab, deskripsi untuk Google, dan alamat situs.
// siteUrl diisi setelah deploy (contoh: "https://raka.vercel.app"), tanpa "/"
// di akhir. Dipakai untuk og:image supaya pratinjau link di WhatsApp/LinkedIn
// memakai alamat lengkap. Boleh dikosongkan.
// ---------------------------------------------------------------------------
export const meta = {
  pageTitle: "Noval Fawwaz Amanulloh · Rekayasa Perangkat Lunak",
  pageDescription:
    "Portofolio Noval Fawwaz Amanulloh, siswa kelas 12 RPL. Proyek kasir kantin, katalog UMKM, dan absensi QR yang dipakai di sekitar sekolah.",
  siteUrl: "",
};

// ---------------------------------------------------------------------------
// GANTI DENGAN DATA ASLI: identitas, sekolah, dan isi kartu ID.
// Foto tidak diatur di sini: cukup timpa file public/foto.webp (rasio 4:5).
// status boleh dikosongkan ("") supaya tidak tampil di hero.
// ---------------------------------------------------------------------------
export const profile = {
  fullName: "Noval Fawwaz Amanulloh",
  nickname: "Noval",
  major: "Rekayasa Perangkat Lunak",
  grade: "Kelas 12",
  school: "SMK Daarul Abroor",
  studentId: "RPL-12-2026",
  photoAlt:
    "Foto setengah badan Noval memakai seragam sekolah, menghadap kamera",
  tagline:
    "Berfokus pada pengembangan web full-stack, mulai dari slicing antarmuka responsif hingga perancangan basis data relasional melalui proyek praktis seperti web toko online dan sistem informasi perpustakaan. Di luar sekolah, saya mengelola bisnis produk digital DigishopID secara mandiri—mengatur operasional katalog, alur transaksi, hingga interaksi pelanggan. Pengalaman mengelola bisnis sendiri ini membentuk cara kerja saya: kode tidak hanya harus rapi dan fungsional, tetapi harus benar-benar menyelesaikan masalah dan mudah digunakan.",
  status: "Terbuka untuk kolaborasi proyek",
};

// ---------------------------------------------------------------------------
// GANTI DENGAN DATA ASLI: keahlian.
// used     = sudah dipakai di proyek (where = di proyek mana)
// learning = sedang dipelajari (note = sedang belajar lewat apa)
// ---------------------------------------------------------------------------
export const skills = {
  usedIntro: "Alat yang sudah saya pakai sampai proyeknya jalan.",
  used: [
    { name: "HTML dan CSS", where: "Semua proyek" },
    { name: "JavaScript", where: "CekRefund, bot WhatsApp" },
    { name: "TypeScript", where: "Bot WhatsApp" },
    { name: "Laravel", where: "DigishopIndo" },
    { name: "MySQL", where: "DigishopIndo" },
    { name: "Tailwind CSS", where: "DigishopIndo" },
    { name: "Git dan GitHub", where: "Semua proyek sejak kelas 11" },
    { name: "Python", where: "Bot WhatsApp & Telegram, latihan dasar algoritma kelas 10" },
  ],
  learningIntro: "Yang sedang saya kejar sekarang, belum masuk proyek jadi.",
  learning: [
    { name: "React", note: "Mempelajari konsep komponen, state, dan rendering untuk modernisasi tampilan antarmuka web." },
    { name: "REST API", note: "Mempelajari pemisahan backend Laravel agar endpoint data bisa dikonsumsi fleksibel oleh frontend atau integrasi layanan luar." },
  ],
};

// ---------------------------------------------------------------------------
// GANTI DENGAN DATA ASLI: proyek (2 sampai 4).
// image = nama file screenshot di folder public (rasio 16:10, lebar 1200).
// demoUrl / repoUrl boleh dikosongkan ("") supaya tombolnya tidak tampil.
// ---------------------------------------------------------------------------
export const projects = [
  {
    title: "SkeakerLokal",
    kind: "Media blog & review sepatu",
    year: "2025",
    problem:
      "Banyak penggemar sneaker lokal dan streetwear kesulitan mencari ulasan mendalam mengenai rilis sepatu serta sejarah siluet klasik dalam bahasa Indonesia yang ringkas dan mudah dipahami",
    solution:
      "SneakerLokal hadir sebagai media kurasi dan review berbasis Blogger. Proyek ini mencakup kustomisasi tema agar bersih dan responsif, konfigurasi custom domain (.web.id) via DNS management, serta penulisan artikel berfokus pada keterbacaan (readability) dan optimasi visual gambar.",
    stack: ["Blogger (CMS), HTML/CSS Customization, Custom Domain DNS"],
    role: "Setup Domain/DNS, Custom Styling Blogspot, & Content Publisher",
    image: "/proyek-1.webp",
    imageAlt: "Tampilan bloger sneakerlokal",
    demoUrl: "https://www.sneakerlokalid.web.id/",
    repoUrl: "",
  },
  {
    title: "DigishopIndo",
    kind: "Platform e-commerce produk digital",
    year: "2025",
    problem:
      "Transaksi produk digital sering kali berjalan manual lewat chat, yang rawan salah rekap stok dan memperlambat konfirmasi pembayaran.",
    solution:
      "DigishopIndo dibangun sebagai platform web e-commerce berbasis Laravel untuk mengotomatisasi etalase produk, sistem keranjang belanja, hingga manajemen autentikasi pengguna. Proyek ini memadukan backend relasional untuk pencatatan transaksi dengan antarmuka yang bersih dan responsif.",
    stack: ["Laravel, MySQL, Blade, Tailwind CSS"],
    role: "Dikerjakan secara mandiri : desain, dan coding",
    image: "/proyek-2.webp",
    imageAlt: "Halaman website e commerce",
    demoUrl: "",
    repoUrl: "",
  },
  {
    title: "Kalkulator Cek Refung",
    kind: "CekRefund",
    year: "2026",
    problem:
      "Menghitung nilai pengembalian dana (refund) sisa hari garansi langganan digital secara manual sering keliru karena rumus prorata dan potongan biaya layanan yang rumit.",
    solution:
      "CekRefund menyelesaikannya lewat kalkulator interaktif satu layar: cukup masukkan harga beli, sisa hari, dan durasi total, maka nominal pengembalian bersih langsung terhitung otomatis sesuai slider fee. Dilengkapi juga dengan utilitas hitung hari, penanggalan, kalender, dan opsi tema latar.",
    stack: ["JavaScript, HTML, CSS, Custom Domain & Web Hosting"],
    role: "Dikerjakan sendiri: perancangan logika hitung, UI interaktif, dan deployment domain",
    image: "/proyek-3.webp",
    imageAlt: "Layar AbsenQR berisi kode QR di kiri dan tabel kehadiran siswa di kanan",
    demoUrl: "https://www.cekrefund.biz.id/",
    repoUrl: "",
  },
];

// ---------------------------------------------------------------------------
// GANTI DENGAN DATA ASLI: perjalanan kelas 10 sampai 12.
// ---------------------------------------------------------------------------
export const journey = [
  {
    grade: "Kelas 10",
    period: "2024/2025",
    title: "Mulai dari logika, Python, dan HTML dasar",
    text: "Mempelajari dasar algoritma pemrograman dan Python di sekolah, lalu mulai bereksperimen dengan HTML dan CSS untuk membuat halaman web sederhana pertama kali.",
  },
  {
    grade: "Kelas 11",
    period: "2025/2026",
    title: "Eksplorasi automasi, bot, dan merintis DigishopID",
    text: "Mulai membuat automasi seperti bot WhatsApp dan Telegram menggunakan JavaScript, TypeScript, dan Python. Di periode ini, saya juga mulai merintis bisnis produk digital mandiri—berawal dari nama Digital Market hingga bertransformasi menjadi DigishopID bersama channel YouTube untuk edukasi dan promosi produk digital. Pengalaman ini melatih saya memahami alur transaksi nyata dan kebutuhan pelanggan langsung.",
  },
  {
    grade: "Kelas 12",
    period: "2026/2027",
    title: "Membangun aplikasi web mandiri dan utilitas bisnis",
    text: "Membangun web e-commerce DigishopIndo menggunakan Laravel dan Tailwind CSS untuk mengotomatisasi katalog dan autentikasi pengguna secara lokal, serta merilis web kalkulator CekRefund (cekrefund.biz.id) yang sudah live dengan custom domain untuk menyelesaikan masalah kalkulasi refund prorata. Di samping itu, saya aktif mempelajari ekosistem modern seperti React dan REST API sebagai rencana pengembangan aplikasi ke depan.",
  },
];

// ---------------------------------------------------------------------------
// GANTI DENGAN DATA ASLI: kontak.
// whatsapp memakai format wa.me + kode negara tanpa "+" dan tanpa angka 0 di depan.
// ---------------------------------------------------------------------------
export const contact = {
  heading: "Mau ngobrol soal proyek?",
  text: "Paling cepat lewat email atau WhatsApp. Biasanya saya balas di hari yang sama sepulang sekolah.",
  email: "novalfawazamanulloh09@gmail.com",
  whatsappUrl: "https://wa.me/6287812263358",
  whatsappLabel: "+62 878 1226 3358",
  githubUrl: "https://github.com/arahasia190-lgtm",
  githubLabel: "github.com/arahasia190-lgtm",
  linkedinUrl: "https://linktr.ee/digishopid",
  linkedinLabel: "linktr.ee/digishopid",
};
