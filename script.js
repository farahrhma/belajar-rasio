/* =========================================================
   BELAJAR RASIO - SMP KELAS 7
   Bagian yang biasanya kamu ubah: MATERI, LATIHAN, KUIS
========================================================= */


/* ---------- 1. NAVIGASI ---------- */

function showPage(id) {
  document.querySelectorAll(".page").forEach(function (p) {
    p.classList.toggle("active", p.id === id);
  });
  document.querySelectorAll(".links button").forEach(function (b) {
    b.classList.toggle("on", b.dataset.page === id);
  });
  window.scrollTo({ top: 0 });
}

document.querySelectorAll("[data-page]").forEach(function (el) {
  el.addEventListener("click", function () { showPage(el.dataset.page); });
});


/* ---------- 2. MATERI ----------
   Taruh file PDF kamu di folder "materi/" dengan nama
   sesuai kolom "pdf" di bawah (atau ganti namanya di sini). */

/* Versi materi. Versi 1 memakai nama file di kolom "pdf" apa adanya.
   Versi 2 memakai nama yang sama ditambah "-v2", misalnya
   materi/1-konsep-rasio-v2.pdf. Ubah "nama" sesuka kamu
   (misalnya "Ringkas" dan "Lengkap"). */

const VERSI = [
  { nama: "Versi 1", akhiran: "" },
  { nama: "Versi 2", akhiran: "-v2" }
];

const MATERI = [
  {
    judul: "Konsep Rasio",
    pdf: "materi/1-konsep-rasio.pdf",
    isi: "Rasio adalah perbandingan dua besaran yang sejenis. Rasio a dan b ditulis a : b atau a/b.",
    contoh: "Di kelas ada 12 siswa laki-laki dan 18 siswa perempuan. Rasio laki-laki : perempuan = 12 : 18 = 2 : 3."
  },
  {
    judul: "Selisih dan Rasio",
    pdf: "materi/2-selisih-dan-rasio.pdf",
    isi: "Selisih menunjukkan berapa lebihnya (pengurangan), sedangkan rasio menunjukkan berapa kali lipatnya (perbandingan).",
    contoh: "Bilangan 4 dan 8 punya selisih 4 dan rasio 1 : 2. Jika keduanya ditambah 4 menjadi 8 dan 12, selisihnya tetap 4 tetapi rasionya berubah menjadi 2 : 3."
  },
  {
    judul: "Faktor Skala",
    pdf: "materi/3-faktor-skala.pdf",
    isi: "Faktor skala adalah bilangan pengali untuk memperbesar atau memperkecil ukuran. Pada peta, skala 1 : 200 berarti 1 cm pada peta mewakili 200 cm sebenarnya.",
    contoh: "Sebuah gambar panjangnya 4 cm. Dengan faktor skala 3, panjangnya menjadi 4 × 3 = 12 cm."
  },
  {
    judul: "Rasio Ekuivalen dan Proporsi",
    pdf: "materi/4-rasio-ekuivalen-proporsi.pdf",
    isi: "Rasio ekuivalen didapat dengan mengalikan atau membagi kedua bagian rasio dengan bilangan yang sama. Proporsi adalah pernyataan bahwa dua rasio bernilai sama.",
    contoh: "2 : 3 = 4 : 6 = 6 : 9. Untuk proporsi 2/3 = x/12, kalikan 3 dengan 4 untuk mendapat 12, jadi x = 2 × 4 = 8."
  },
  {
    judul: "Laju Perubahan",
    pdf: "materi/5-laju-perubahan.pdf",
    isi: "Laju membandingkan dua besaran yang satuannya berbeda, misalnya kecepatan = jarak ÷ waktu.",
    contoh: "Mobil menempuh 180 km dalam 3 jam. Lajunya = 180 ÷ 3 = 60 km/jam."
  }
];

const menu = document.getElementById("materi-menu");
const isi = document.getElementById("materi-isi");

MATERI.forEach(function (m, i) {
  const btn = document.createElement("button");
  btn.textContent = (i + 1) + ". " + m.judul;
  btn.addEventListener("click", function () {
    menu.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    let tabs = "";
    VERSI.forEach(function (v, k) {
      tabs += '<button data-v="' + k + '"' + (k === 0 ? ' class="on"' : "") + ">" + v.nama + "</button>";
    });

    isi.innerHTML =
      "<h3>" + m.judul + "</h3>" +
      "<p>" + m.isi + "</p>" +
      '<div class="contoh"><b>Contoh:</b> ' + m.contoh + "</div>" +
      '<div class="versi">' + tabs + "</div>" +
      '<iframe src="' + m.pdf + '" title="Slide ' + m.judul + '"></iframe>' +
      '<a class="unduh" href="' + m.pdf + '" target="_blank" rel="noopener">Buka atau unduh PDF</a>';

    const frame = isi.querySelector("iframe");
    const tautan = isi.querySelector(".unduh");
    const tombolVersi = isi.querySelectorAll(".versi button");

    tombolVersi.forEach(function (t) {
      t.addEventListener("click", function () {
        const v = VERSI[Number(t.dataset.v)];
        const alamat = m.pdf.replace(".pdf", v.akhiran + ".pdf");
        tombolVersi.forEach(function (x) { x.classList.remove("on"); });
        t.classList.add("on");
        frame.src = alamat;
        tautan.href = alamat;
      });
    });
  });
  menu.appendChild(btn);
});


/* ---------- 3. SIMULASI (5 buah) ---------- */

function fpb(a, b) { return b === 0 ? a : fpb(b, a % b); }
function sed(a, b) { const g = fpb(a, b); return (a / g) + " : " + (b / g); }
function koma(n) { return String(n).replace(".", ","); }
function el(id) { return document.getElementById(id); }


/* Pilihan simulasi (tab) */

document.querySelectorAll(".sim-menu button").forEach(function (b) {
  b.addEventListener("click", function () {
    document.querySelectorAll(".sim-menu button").forEach(function (x) {
      x.classList.toggle("on", x === b);
    });
    document.querySelectorAll(".sim").forEach(function (p) {
      p.classList.toggle("active", p.id === "sim-" + b.dataset.sim);
    });
    if (b.dataset.sim === "5") gambar5();
  });
});


/* Simulasi 1: Konsep rasio */

const sR = el("s-r");
const sB = el("s-b");

function updateSimulasi() {
  const r = Number(sR.value);
  const b = Number(sB.value);
  const g = fpb(r, b);

  el("n-r").textContent = r;
  el("n-b").textContent = b;
  el("r-asli").textContent = r + " : " + b;
  el("r-sederhana").textContent = (r / g) + " : " + (b / g);

  let bola = "";
  for (let i = 0; i < r; i++) bola += '<span class="dot r big"></span>';
  for (let i = 0; i < b; i++) bola += '<span class="dot b big"></span>';
  el("bola").innerHTML = bola;

  el("r-catatan").textContent = g > 1
    ? "Kedua bilangan dibagi " + g + " (FPB dari " + r + " dan " + b + ") supaya rasionya sederhana."
    : "Rasio ini sudah sederhana karena FPB dari " + r + " dan " + b + " adalah 1.";
}

sR.addEventListener("input", updateSimulasi);
sB.addEventListener("input", updateSimulasi);
updateSimulasi();


/* Simulasi 2: Selisih dan rasio */

function updateSim2() {
  const a = Number(el("s2a").value);
  const b = Number(el("s2b").value);
  const t = Number(el("s2t").value);
  const A = a + t;
  const B = b + t;

  el("a2").textContent = a;
  el("b2").textContent = b;
  el("t2").textContent = t;
  el("bar2a").style.width = (A / 35 * 100) + "%";
  el("bar2b").style.width = (B / 35 * 100) + "%";
  el("v2a").textContent = A;
  el("v2b").textContent = B;

  const selisih = Math.abs(b - a);
  el("sel2").textContent = "awal " + selisih + ", sekarang " + Math.abs(B - A);
  el("ras2").textContent = sed(a, b) + " (awal)  →  " + sed(A, B) + " (sekarang)";

  el("cat2").textContent = a === b
    ? "Kedua batang sama panjang, jadi rasionya selalu 1 : 1. Coba buat A dan B berbeda."
    : t === 0
      ? "Geser slider \"Keduanya ditambah\" untuk melihat perubahannya."
      : "Selisih tetap " + selisih + ", tetapi rasionya berubah menjadi " + sed(A, B) + ".";
}

["s2a", "s2b", "s2t"].forEach(function (id) { el(id).addEventListener("input", updateSim2); });
updateSim2();


/* Simulasi 3: Faktor skala */

const PX_PER_CM = 30;

function updateSim3() {
  const k = Number(el("s3").value);
  const p = 4 * k;
  const l = 3 * k;

  el("k3").textContent = koma(k);
  el("rect3").style.width = (p * PX_PER_CM) + "px";
  el("rect3").style.height = (l * PX_PER_CM) + "px";
  el("p3").textContent = "4 × " + koma(k) + " = " + koma(p) + " cm";
  el("l3").textContent = "3 × " + koma(k) + " = " + koma(l) + " cm";

  const arah = k < 1
    ? "Faktor skala di bawah 1 memperkecil gambar."
    : k > 1
      ? "Faktor skala di atas 1 memperbesar gambar."
      : "Faktor skala 1 membuat ukuran tetap sama.";
  el("c3").textContent = arah + " Perbandingan panjang : lebar tetap 4 : 3.";
}

el("s3").addEventListener("input", updateSim3);
updateSim3();


/* Simulasi 4: Rasio ekuivalen dan proporsi */

function updateSim4() {
  const a = Number(el("s4a").value);
  const b = Number(el("s4b").value);
  const kk = Number(el("s4k").value);

  el("a4").textContent = a;
  el("b4").textContent = b;
  el("k4").textContent = kk;

  let h = "<tr><th>Faktor</th><th>Rasio</th><th>Pecahan</th></tr>";
  for (let k = 1; k <= 6; k++) {
    h += "<tr" + (k === kk ? ' class="pilih"' : "") + ">" +
      "<td>× " + k + "</td>" +
      "<td>" + (a * k) + " : " + (b * k) + "</td>" +
      "<td>" + (a * k) + "/" + (b * k) + "</td></tr>";
  }
  el("tabel4").innerHTML = h;
  el("prop4").textContent = "Proporsi: " + a + "/" + b + " = " + (a * kk) + "/" + (b * kk);
}

["s4a", "s4b", "s4k"].forEach(function (id) { el(id).addEventListener("input", updateSim4); });
updateSim4();


/* Simulasi 5: Laju perubahan (grafik jarak-waktu) */

const cv = el("grafik5");
const cx = cv.getContext("2d");
let t5 = 5;
let anim5 = null;

function gambar5() {
  const v = Number(el("s5").value);
  const W = cv.width, H = cv.height;
  const L = 55, R = W - 15, T = 20, B = H - 40;
  const jarak = v * t5;

  cx.clearRect(0, 0, W, H);
  cx.font = "13px sans-serif";
  cx.lineWidth = 1;

  for (let i = 0; i <= 5; i++) {
    const x = L + (R - L) * i / 5;
    const y = B - (B - T) * i / 5;
    cx.strokeStyle = "#e6e1cf";
    cx.beginPath(); cx.moveTo(x, T); cx.lineTo(x, B); cx.stroke();
    cx.beginPath(); cx.moveTo(L, y); cx.lineTo(R, y); cx.stroke();
    cx.fillStyle = "#5d6785";
    cx.textAlign = "center"; cx.fillText(i, x, B + 17);
    cx.textAlign = "right"; cx.fillText(i * 100, L - 8, y + 4);
  }

  cx.strokeStyle = "#1d2b4f"; cx.lineWidth = 2;
  cx.beginPath(); cx.moveTo(L, T); cx.lineTo(L, B); cx.lineTo(R, B); cx.stroke();
  cx.fillStyle = "#1d2b4f";
  cx.textAlign = "center"; cx.fillText("waktu (jam)", (L + R) / 2, H - 6);
  cx.textAlign = "left"; cx.fillText("jarak (km)", 6, 14);

  const px = L + (R - L) * t5 / 5;
  const py = B - (B - T) * jarak / 500;
  cx.strokeStyle = "#2a6fdb"; cx.lineWidth = 4;
  cx.beginPath(); cx.moveTo(L, B); cx.lineTo(px, py); cx.stroke();
  cx.fillStyle = "#e4572e";
  cx.beginPath(); cx.arc(px, py, 6, 0, Math.PI * 2); cx.fill();

  el("v5").textContent = v;
  el("mobil5").style.left = "calc((100% - 44px) * " + (jarak / 500) + ")";
  el("info5").textContent = t5 === 0
    ? "Tekan Jalankan untuk memulai."
    : "Setelah " + koma(Math.round(t5 * 10) / 10) + " jam: jarak = " + v + " × " +
      koma(Math.round(t5 * 10) / 10) + " = " + koma(Math.round(jarak)) + " km. " +
      "Laju = jarak ÷ waktu = " + v + " km/jam.";
}

function jalankan5() {
  cancelAnimationFrame(anim5);
  let mulai = null;
  function langkah(ts) {
    if (mulai === null) mulai = ts;
    t5 = Math.min(5, (ts - mulai) / 1000);
    gambar5();
    if (t5 < 5) anim5 = requestAnimationFrame(langkah);
  }
  t5 = 0;
  anim5 = requestAnimationFrame(langkah);
}

el("s5").addEventListener("input", function () {
  cancelAnimationFrame(anim5);
  t5 = 5;
  gambar5();
});
el("go5").addEventListener("click", jalankan5);
gambar5();


/* ---------- 4. LATIHAN DAN KUIS ----------
   Tiap soal: tanya, opsi (daftar), jawab (nomor opsi benar,
   mulai dari 0), bahas (penjelasan singkat). */

const LATIHAN = [
  {
    tanya: "Di kelas ada 12 siswa laki-laki dan 18 siswa perempuan. Rasio laki-laki : perempuan dalam bentuk paling sederhana adalah...",
    opsi: ["2 : 3", "3 : 2", "12 : 18", "1 : 2"],
    jawab: 0,
    bahas: "12 : 18 dibagi 6 (FPB-nya) menjadi 2 : 3."
  },
  {
    tanya: "Rasio yang ekuivalen dengan 4 : 6 adalah...",
    opsi: ["3 : 2", "2 : 3", "8 : 10", "1 : 3"],
    jawab: 1,
    bahas: "4 : 6 dibagi 2 menjadi 2 : 3."
  },
  {
    tanya: "Kelereng Ali dan Budi berbanding 3 : 5. Jika jumlah kelerengnya 40, kelereng Budi ada...",
    opsi: ["15", "20", "25", "30"],
    jawab: 2,
    bahas: "Jumlah bagian = 3 + 5 = 8. Satu bagian = 40 ÷ 8 = 5. Kelereng Budi = 5 × 5 = 25."
  },
  {
    tanya: "Skala sebuah peta 1 : 200.000. Jarak di peta 3 cm. Jarak sebenarnya adalah...",
    opsi: ["3 km", "6 km", "60 km", "600 km"],
    jawab: 1,
    bahas: "3 × 200.000 = 600.000 cm = 6.000 m = 6 km."
  },
  {
    tanya: "Sebuah mobil menempuh 180 km dalam 3 jam. Laju mobil tersebut adalah...",
    opsi: ["50 km/jam", "60 km/jam", "90 km/jam", "540 km/jam"],
    jawab: 1,
    bahas: "Laju = jarak ÷ waktu = 180 ÷ 3 = 60 km/jam."
  }
];

const KUIS = [
  {
    tanya: "Rasio 5 apel dan 15 jeruk dalam bentuk paling sederhana adalah...",
    opsi: ["1 : 3", "3 : 1", "5 : 15", "1 : 5"],
    jawab: 0,
    bahas: "5 : 15 dibagi 5 menjadi 1 : 3."
  },
  {
    tanya: "Rasio yang ekuivalen dengan 3 : 4 adalah...",
    opsi: ["6 : 7", "6 : 8", "9 : 16", "5 : 6"],
    jawab: 1,
    bahas: "3 : 4 dikali 2 menjadi 6 : 8."
  },
  {
    tanya: "Jika 2 : 5 = x : 20, maka nilai x adalah...",
    opsi: ["4", "8", "10", "50"],
    jawab: 1,
    bahas: "5 dikali 4 menjadi 20, jadi x = 2 × 4 = 8."
  },
  {
    tanya: "Uang Dina dan Eka berbanding 2 : 3. Jika jumlah uang mereka Rp150.000, uang Dina adalah...",
    opsi: ["Rp50.000", "Rp60.000", "Rp90.000", "Rp75.000"],
    jawab: 1,
    bahas: "150.000 ÷ 5 bagian = 30.000 per bagian. Uang Dina = 2 × 30.000 = Rp60.000."
  },
  {
    tanya: "Pada denah berskala 1 : 500, panjang ruangan di denah 8 cm. Panjang sebenarnya adalah...",
    opsi: ["4 m", "40 m", "400 m", "4.000 m"],
    jawab: 1,
    bahas: "8 × 500 = 4.000 cm = 40 m."
  },
  {
    tanya: "Sebuah sepeda motor menempuh 120 km dalam 2 jam. Lajunya adalah...",
    opsi: ["40 km/jam", "60 km/jam", "240 km/jam", "122 km/jam"],
    jawab: 1,
    bahas: "120 ÷ 2 = 60 km/jam."
  },
  {
    tanya: "Resep memakai 2 gelas tepung untuk 12 kue. Dengan 6 gelas tepung, banyak kue yang dibuat adalah...",
    opsi: ["18", "24", "36", "72"],
    jawab: 2,
    bahas: "6 gelas = 3 × 2 gelas, jadi kuenya 3 × 12 = 36."
  },
  {
    tanya: "Harga 3 buku adalah Rp24.000. Harga 5 buku yang sama adalah...",
    opsi: ["Rp32.000", "Rp40.000", "Rp45.000", "Rp48.000"],
    jawab: 1,
    bahas: "Harga 1 buku = 24.000 ÷ 3 = 8.000. Harga 5 buku = 5 × 8.000 = Rp40.000."
  }
];


/* Mesin soal: dipakai bersama oleh Latihan dan Kuis */

function buatSoal(idBox, daftar) {
  const box = document.getElementById(idBox);
  let nomor = 0;
  let skor = 0;

  function tampil() {
    if (nomor >= daftar.length) {
      box.innerHTML =
        "<h3>Selesai!</h3>" +
        '<div class="skor">' + skor + " / " + daftar.length + "</div>" +
        "<p>" + (skor === daftar.length
          ? "Sempurna! Kamu sudah paham rasio."
          : skor >= daftar.length / 2
            ? "Bagus! Baca lagi bagian yang masih keliru lalu coba lagi."
            : "Ayo baca materinya dulu, lalu coba lagi.") + "</p>" +
        '<button class="btn" id="' + idBox + '-ulang">Coba lagi</button>';
      document.getElementById(idBox + "-ulang").addEventListener("click", function () {
        nomor = 0; skor = 0; tampil();
      });
      return;
    }

    const s = daftar[nomor];
    let opsiHTML = "";
    s.opsi.forEach(function (o, i) {
      opsiHTML += '<button data-i="' + i + '">' + String.fromCharCode(65 + i) + ". " + o + "</button>";
    });

    box.innerHTML =
      '<div class="soal-atas"><span>Soal ' + (nomor + 1) + " / " + daftar.length + "</span><span>Skor " + skor + "</span></div>" +
      '<p class="tanya">' + s.tanya + "</p>" +
      '<div class="opsi">' + opsiHTML + "</div>" +
      '<div class="umpan"></div>';

    const tombol = box.querySelectorAll(".opsi button");
    tombol.forEach(function (t) {
      t.addEventListener("click", function () { jawab(Number(t.dataset.i), tombol); });
    });
  }

  function jawab(pilih, tombol) {
    const s = daftar[nomor];
    tombol.forEach(function (t) { t.disabled = true; });
    tombol[s.jawab].classList.add("benar");

    let judul = "Benar!";
    if (pilih === s.jawab) {
      skor++;
    } else {
      tombol[pilih].classList.add("salah");
      judul = "Belum tepat.";
    }

    const akhir = nomor === daftar.length - 1;
    box.querySelector(".umpan").innerHTML =
      '<div class="bahas"><b>' + judul + "</b> " + s.bahas + "</div>" +
      '<button class="btn" id="' + idBox + '-lanjut">' + (akhir ? "Lihat skor" : "Soal berikutnya") + "</button>";
    document.getElementById(idBox + "-lanjut").addEventListener("click", function () {
      nomor++; tampil();
    });
  }

  tampil();
}

buatSoal("latihan-box", LATIHAN);
buatSoal("kuis-box", KUIS);


/* ---------- 5. MULAI ---------- */

showPage("home");
