/* Data undangan (nama, tanggal, acara, rekening, galeri, cerita) — edit di file ini. */
/* ============ DATA — edit di sini ============ */
// Semua foto memakai file lokal di folder img/ (foto kostumer).
const U = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}&h=${h}`;
// Kosongkan ("" / []) bagian opsional bila tidak dipakai: live, giftAddress, gifts, story.
const C = {
  bride: {
    full: "Nadia Safira Rahma", // nama + gelar
    nick: "Nadia", // nama panggilan (tampil di cover)
    ig: "nadia.safira", // tanpa @
    wa: "6281234567890", // format 62xxx
    father: "Budi Santoso",
    mother: "Siti Aminah",
    role: "Putri", // Putri / Putri pertama / Putri kedua ...
    address: "Jl. Melati No. 10 RT 01 RW 02, Kec. Contoh, Kota Contoh",
    // 2 foto = carousel otomatis (bergeser ke kanan). Isi 1 foto saja bila tidak ingin carousel.
    photos: ["img/bride1.jpg", "img/bride2.jpg"],
  },
  groom: {
    full: "Raka Pratama Wijaya",
    nick: "Raka",
    ig: "raka.pratama",
    wa: "6281298765432",
    father: "Hendra Wijaya",
    mother: "Ratna Dewi",
    role: "Putra",
    address: "Jl. Kenanga No. 25 RT 03 RW 04, Kec. Contoh, Kota Contoh",
    // 2 foto = carousel otomatis (bergeser ke kiri).
    photos: ["img/groom1.jpg", "img/groom2.jpg"],
  },
  date: "2028-12-12T07:30:00", // tanggal & jam mulai acara (Sabtu, 12 Desember 2026)
  // Identitas & teks undangan
  site: {
    title: "The Wedding of Nadia & Raka", // judul tab browser
    copyright: "© 2026 Aisyae Digital Invitation — Dibuat dengan cinta.",
    designer: { name: "saevitation.com", url: "https://saevitation.com/" }, // kredit desainer
    instagram: {
      handle: "@saevitation",
      url: "https://www.instagram.com/saevitation",
    },
  },
  text: {
    greeting: "Assalamu'alaikum Wr. Wb.",
    intro:
      "Segala puji bagi Allah SWT yang telah menjadikan hamba-Nya hidup berpasang-pasangan. Dengan memohon ridho, rahmat, dan berkah-Nya, kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam acara pernikahan kami.",
    quote:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    quoteSource: "AR-RUM AYAT : 21",
    closing:
      "Merupakan sebuah kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Terima kasih.",
  },
  // URL Web App Google Apps Script (berakhiran /exec) untuk RSVP & ucapan. Kosongkan = disimpan di browser saja (hanya untuk uji coba)
  rsvp: "https://script.google.com/macros/s/AKfycbxVkihOSPwomaeVq1pex5KlUNAsYgXa2RB_c3wGJzQ7vsHzuRF5-Q1Mh4ny_BuM2F1gbw/exec",
  // 3 foto slide otomatis di bagian atas (setelah tombol Buka Undangan diklik), bergeser ke kanan. Disarankan portrait 2:3. Isi 1 foto = diam.
  hero: ["img/hero1.jpg", "img/hero2.jpg", "img/hero3.jpg"],
  // 2 foto slide ke kanan otomatis sebagai latar footer (rasio bebas, landscape/portrait). Kosongkan [] = pakai bg.foot & bg.quote.
  footPhotos: ["img/foot1.jpg", "img/foot2.jpg"],
  // foto latar tiap bagian
  bg: {
    cover: "img/akad1.jpg",
    quote: "img/live1.jpg",
    foot: "img/live2.jpg",
    date: "img/resepsi2.jpg",
  },
  events: [
    {
      t: "Akad Nikah",
      // photos: 2 foto = carousel otomatis; date (opsional) = tanggal khusus acara ini, kosong = tanggal utama
      photos: ["img/akad1.jpg", "img/akad2.jpg"],
      time: "07.30 - 09.00 WIB",
      place: "Gedung Serbaguna Mawar",
      addr: "Jl. Contoh Raya No. 123, Kec. Contoh, Kota Contoh, Provinsi Contoh 12345",
      map: "https://maps.google.com/?q=Gedung+Serbaguna+Mawar",
    },
    {
      t: "Resepsi",
      photos: ["img/resepsi1.jpg", "img/resepsi2.jpg"],
      time: "10.00 - 15.00 WIB",
      place: "Gedung Serbaguna Mawar",
      addr: "Jl. Contoh Raya No. 123, Kec. Contoh, Kota Contoh, Provinsi Contoh 12345",
      map: "https://maps.google.com/?q=Gedung+Serbaguna+Mawar",
    },
  ],
  // live streaming (kosongkan "" jika tidak ada). platform: nama platform di judul kartu; photos: 2 foto slide ke kanan otomatis (kosongkan [] = 2 foto pertama galeri)
  live: {
    platform: "YouTube",
    url: "https://www.youtube.com/@nadia-raka/live",
    photos: ["img/live1.jpg", "img/live2.jpg"],
  },
  falling: true, // efek daun maroon berjatuhan; false = matikan
  music: "sound/PUJANINGSING.mp3", // lagu latar: taruh file mp3 di folder sound/
  // alamat pengiriman kado (kosongkan {} jika tidak dipakai)
  giftAddress: {
    name: "Nadia",
    addr: "Jl. Melati No. 10 RT 01 RW 02, Kec. Contoh, Kota Contoh",
  },
  // rekening amplop digital (boleh lebih dari satu; kosongkan [] jika tidak dipakai)
  gifts: [{ bank: "BCA", no: "1234567890", name: "Nadia Safira Rahma" }],
  // galeri: disarankan 6 foto portrait agar ringan (tampil sebagai slider + thumbnail)
  // video prewedding di atas foto galeri: tempel link YouTube atau ID videonya (kosongkan "" jika tidak ada)
  video: {
    url: "https://www.youtube.com/watch?v=QMForPSc-Mc",
    title: "Video Prewedding",
  },
  gallery: [
    "img/gallery1.jpg",
    "img/gallery2.jpg",
    "img/gallery3.jpg",
    "img/gallery4.jpg",
    "img/gallery5.jpg",
    "img/gallery6.jpg",
  ],
  // 2 foto slide atas-bawah otomatis di bagian RSVP (rasio 4:3). Kosongkan [] = pakai 2 foto pertama galeri.
  rsvpPhotos: ["img/rsvp1.jpg", "img/rsvp2.jpg"],
  // cerita (kosongkan [] jika tidak dipakai)
  // 2 foto cerita (carousel otomatis bergeser ke bawah)
  storyPhotos: ["img/story1.jpg", "img/story2.jpg"],
  // contoh isi (hapus tanda // di depan, lalu isi dengan cerita asli):
  // story: [
  //   { d: "09 September 2016", t: "Awal Bertemu", p: "Tulis cerita singkat di sini." },
  //   { d: "12 Desember 2016", t: "Menjalin Hubungan", p: "Tulis cerita singkat di sini." },
  //   { d: "15 Januari 2023", t: "Bertunangan", p: "Tulis cerita singkat di sini." },
  // ],
  // CERITA DUMMY — ganti dengan cerita asli kostumer (kosongkan [] jika tidak dipakai)
  story: [
    {
      d: "09 September 2018",
      t: "Awal Bertemu",
      p: "Awal mula kami bertemu adalah dalam sebuah acara sederhana yang tidak pernah kami duga akan menjadi awal dari perjalanan panjang ini.",
    },
    {
      d: "12 Desember 2018",
      t: "Menjalin Hubungan",
      p: "Setelah berkomunikasi beberapa bulan dan menemukan kecocokan, akhirnya kami memutuskan untuk menjalin sebuah komitmen.",
    },
    {
      d: "15 Januari 2026",
      t: "Bertunangan",
      p: "Setelah menjalin hubungan beberapa tahun, akhirnya kami memantapkan hati untuk membawa hubungan ini ke jenjang yang lebih serius.",
    },
  ],
};
/* =============================================== */
