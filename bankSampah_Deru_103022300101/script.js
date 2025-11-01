document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("data-bank-body");
  const tombolTambah = document.querySelector(".btn-tambah");
  const modalTambah = document.getElementById("modal-tambah");
  const formTambah = document.getElementById("form-tambah");
  const tombolTutup = document.querySelector(".btn-tutup");
  const tombolBatal = document.querySelector(".btn-batal");

  let dataBank = [
    {
      nama: "Bank Sampah Hijau Lestari",
      alamat: "Jl. Melati No. 45, Bandung",
      jenis: "Plastik, Kertas",
      status: "Aktif",
    },
  ];

  function renderTabel() {
    tableBody.innerHTML = "";
    if (dataBank.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data.</td></tr>`;
      return;
    }

    dataBank.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.alamat}</td>
        <td>${item.jenis}</td>
        <td><span class="badge ${item.status === "Aktif" ? "aktif" : "nonaktif"}">${item.status}</span></td>
        <td>
          <button class="btn-aksi btn-edit" data-index="${index}">Edit</button>
          <button class="btn-aksi btn-hapus" data-index="${index}">Hapus</button>
        </td>`;
      tableBody.appendChild(row);
    });
  }

  // buka / tutup modal
  const openModal = () => modalTambah.classList.add("active");
  const closeModal = () => modalTambah.classList.remove("active");

  tombolTambah.addEventListener("click", openModal);
  tombolTutup.addEventListener("click", closeModal);
  tombolBatal.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modalTambah) closeModal();
  });

  // tambah data baru
  formTambah.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("tambah-nama").value;
    const alamat = document.getElementById("tambah-alamat").value;
    const jenis = document.getElementById("tambah-jenis").value;
    const status = document.getElementById("tambah-status").value;

    dataBank.push({ nama, alamat, jenis, status });
    renderTabel();
    closeModal();
    formTambah.reset();
  });

  // hapus data
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-hapus")) {
      const index = e.target.dataset.index;
      if (confirm("Yakin ingin menghapus data ini?")) {
        dataBank.splice(index, 1);
        renderTabel();
      }
    }

    if (e.target.classList.contains("btn-edit")) {
      alert("Fitur edit bisa ditambahkan nanti");
    }
  });

  renderTabel();
});
