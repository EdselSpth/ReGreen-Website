document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("data-bank-body");
  const tombolTambah = document.querySelector(".btn-tambah");
  const modalTambah = document.getElementById("modal-tambah");
  const modalEdit = document.getElementById("modal-edit");
  const formTambah = document.getElementById("form-tambah");
  const formEdit = document.getElementById("form-edit");
  const tombolTutup = document.querySelectorAll(".btn-tutup");
  const tombolBatal = document.querySelectorAll(".btn-batal");

  let dataBank = [];

  //LOAD DATA DARI JSON
  async function loadData() {
    try {
      const res = await fetch("dataBank.json");
      if (!res.ok) throw new Error("Gagal memuat file JSON");
      dataBank = await res.json();
      renderTabel();
    } catch (err) {
      console.error(err);
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Gagal memuat data JSON</td></tr>`;
    }
  }

  //RENDER TABEL
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

  //MODAL CONTROL
  function openModal(modal) {
    modal.classList.add("active");
  }

  function closeAllModals() {
    modalTambah.classList.remove("active");
    modalEdit.classList.remove("active");
  }

  tombolTambah.addEventListener("click", () => openModal(modalTambah));
  tombolTutup.forEach(btn => btn.addEventListener("click", closeAllModals));
  tombolBatal.forEach(btn => btn.addEventListener("click", closeAllModals));
  window.addEventListener("click", (e) => {
    if (e.target === modalTambah || e.target === modalEdit) closeAllModals();
  });

  //TAMBAH DATA
  formTambah.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("tambah-nama").value;
    const alamat = document.getElementById("tambah-alamat").value;
    const jenis = document.getElementById("tambah-jenis").value;
    const status = document.getElementById("tambah-status").value;

    const newData = { nama, alamat, jenis, status };
    dataBank.push(newData);

    renderTabel();
    closeAllModals();
    formTambah.reset();

    console.log("Data baru ditambahkan:", newData);
  });

  //EDIT & HAPUS
  tableBody.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.dataset.index;

    // Hapus Data
    if (target.classList.contains("btn-hapus")) {
      if (confirm("Yakin ingin menghapus data ini?")) {
        dataBank.splice(index, 1);
        renderTabel();
      }
    }

    // Edit Data
    if (target.classList.contains("btn-edit")) {
      const bank = dataBank[index];
      document.getElementById("edit-index").value = index;
      document.getElementById("edit-nama").value = bank.nama;
      document.getElementById("edit-alamat").value = bank.alamat;
      document.getElementById("edit-jenis").value = bank.jenis;
      document.getElementById("edit-status").value = bank.status;
      openModal(modalEdit);
    }
  });

  //SIMPAN HASIL EDIT
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = document.getElementById("edit-index").value;
    dataBank[index] = {
      nama: document.getElementById("edit-nama").value,
      alamat: document.getElementById("edit-alamat").value,
      jenis: document.getElementById("edit-jenis").value,
      status: document.getElementById("edit-status").value,
    };
    renderTabel();
    closeAllModals();
  });

  //INISIALISASI
  loadData();
});
