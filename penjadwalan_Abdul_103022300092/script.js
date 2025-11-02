document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});

const kurirSelect = document.getElementById("kurir");
const tambahBtn = document.getElementById("tambahBtn");
const tbody = document.querySelector("#tableJadwal tbody");

// Array kurir
const kurirList = ["Rendi", "Fajar", "Budi", "Santi"];
kurirList.forEach(k => {
  const option = document.createElement("option");
  option.value = k;
  option.textContent = k;
  kurirSelect.appendChild(option);
});

// proses baca data dari dummy json
function loadJadwalFromJSON() {
  fetch("dataJadwal.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.kurir}</td>
          <td>${item.hari}</td>
          <td>${item.tanggal}</td>
          <td>${item.jamMulai}</td>
          <td>${item.jamSelesai}</td>
          <td>${item.jenis}</td>
          <td>${item.area}</td>
          <td><button class="delete-btn">Hapus</button></td>
        `;
        tbody.appendChild(row);
      });
    });
}

loadJadwalFromJSON();

// pembuatan table manual saat menambahkan jadwal
tambahBtn.addEventListener("click", function () {
  const kurir = kurirSelect.value;
  const jamMulai = document.getElementById("jamMulai").value;
  const jamSelesai = document.getElementById("jamSelesai").value;
  const hari = document.getElementById("hari").value;
  const jenis = document.getElementById("jenis").value;
  const tanggal = document.getElementById("tanggal").value;
  const area = document.getElementById("area").value;

  if (!kurir || !jamMulai || !jamSelesai || !hari || !jenis || !tanggal || !area) {
    alert("Harap isi semua data sebelum menyimpan!");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${kurir}</td>
    <td>${hari}</td>
    <td>${tanggal}</td>
    <td>${jamMulai}</td>
    <td>${jamSelesai}</td>
    <td>${jenis}</td>
    <td>${area}</td>
    <td><button class="delete-btn">Hapus</button></td>
  `;

  tbody.appendChild(row);
  alert("Data telah disimpan!");
});

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Apakah anda yakin ingin penghapus jadwal ini ?")){
      e.target.closest("tr").remove();
    }
  }
})