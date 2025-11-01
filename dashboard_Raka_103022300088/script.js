document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua data JSON
  Promise.all([
    fetch("jadwal.json").then(res => res.json()),
    fetch("keuntungan.json").then(res => res.json()),
    fetch("area.json").then(res => res.json())
  ])
  .then(([jadwal, keuntungan, area]) => {
    tampilkanJadwal(jadwal);
    tampilkanKeuntungan(keuntungan);
    tampilkanArea(area);
  })
  .catch(err => console.error("Gagal memuat data:", err));
});

// ====== Fungsi Render Data ======
function tampilkanJadwal(jadwal) {
  const container = document.getElementById("jadwal-container");
  const info = document.getElementById("info-jadwal");

  container.innerHTML = jadwal.map(item => `
    <div class="card">
      <div class="card-text">
        <h5>${item.tanggal}</h5>
        <p>${item.jam}</p>
        <p><strong>Sampah:</strong> ${item.sampah}</p>
        <p><strong>Kurir:</strong> ${item.kurir}</p>
        <p><strong>Lokasi:</strong> ${item.lokasi}</p>
      </div>
      <div class="card-icon">&#128100;</div>
    </div>
  `).join("");


  const total = jadwal.length;
  const start = total > 0 ? 1 : 0;
  const end = total;
  info.textContent = `Menampilkan ${start} sampai ${end} dari ${total} data.`;
}


function tampilkanJadwal(jadwal) {
  const container = document.getElementById("jadwal-container");
  const info = document.getElementById("info-jadwal");

  container.innerHTML = jadwal.map(item => `
    <div class="card">
      <div class="card-text">
        <h5>${item.tanggal}</h5>
        <p>${item.jam}</p>
        <p><strong>Sampah:</strong> ${item.sampah}</p>
        <p><strong>Kurir:</strong> ${item.kurir}</p>
        <p><strong>Lokasi:</strong> ${item.lokasi}</p>
      </div>
      <div class="card-icon">&#128100;</div>
    </div>
  `).join("");

  const total = jadwal.length;
  info.textContent = total > 0
    ? `Menampilkan 1 sampai ${total} dari ${total} data.`
    : "Tidak ada data tersedia.";
}

function tampilkanKeuntungan(keuntungan) {
  const container = document.getElementById("keuntungan-container");
  const info = document.getElementById("info-keuntungan");

  container.innerHTML = keuntungan.map(item => `
    <div class="card">
      <div class="card-text">
        <h5>Nama: ${item.nama}</h5>
        <p><strong>Rekening:</strong> ${item.rekening}</p>
        <p><strong>Bank:</strong> ${item.bank}</p>
        <p><strong>Nominal:</strong> ${item.nominal}</p>
        <p><strong>Status:</strong> ${item.status}</p>
      </div>
      <div class="card-icon">&#128100;</div>
    </div>
  `).join("");

  const total = keuntungan.length;
  info.textContent = total > 0
    ? `Menampilkan 1 sampai ${total} dari ${total} data.`
    : "Tidak ada data tersedia.";
}

function tampilkanArea(area) {
  const container = document.getElementById("area-container");
  const info = document.getElementById("info-area");

  container.innerHTML = area.map(item => `
    <div class="card">
      <div class="card-text">
        <h5>${item.alamat}</h5>
        <p><strong>RT/RW:</strong> ${item.rtrw}</p>
        <p><strong>Nama Pemohon:</strong> ${item.pemohon}</p>
      </div>
      <div class="card-icon">&#127968;</div>
    </div>
  `).join("");

  const total = area.length;
  info.textContent = total > 0
    ? `Menampilkan 1 sampai ${total} dari ${total} data.`
    : "Tidak ada data tersedia.";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});
