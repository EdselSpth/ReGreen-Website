document.addEventListener("DOMContentLoaded", () => {
  // global
  let dataKategori = [];

  // DOM
  const dataBody = document.getElementById("data-body");

  // Modal Tambah
  const btnTambah = document.getElementById("btnTambah");
  const modalTambah = document.getElementById("modal-tambah");
  const formTambah = document.getElementById("form-tambah");
  const tambahNama = document.getElementById("tambah-nama");
  const tambahHarga = document.getElementById("tambah-harga");

  // Modal Edit
  const modalEdit = document.getElementById("modal-edit");
  const formEdit = document.getElementById("form-edit");
  const editIndex = document.getElementById("edit-index");
  const editNama = document.getElementById("edit-nama");
  const editHarga = document.getElementById("edit-harga");

  // Tombol Modal (Tutup & Batal)
  const btnTutup = document.querySelectorAll(".btn-tutup");
  const btnBatal = document.querySelectorAll(".btn-batal");

  // view
  function renderTable() {
    dataBody.innerHTML = "";
    const colspan = 3;

    if (dataKategori.length === 0) {
      dataBody.innerHTML = `<tr><td colspan="${colspan}" style="text-align: center;">Tidak ada data.</td></tr>`;
      return;
    }

    dataKategori.forEach((item, index) => {
      const tr = document.createElement("tr");
      const hargaFormatted = `Rp ${item.harga_per_kg.toLocaleString("id-ID")}`;

      tr.innerHTML = `
        <td>${item.nama_kategori}</td>
        <td>${hargaFormatted}</td>
        <td class="aksi">
          <button class="btn-aksi btn-edit" data-index="${index}">Edit</button>
          <button class="btn-aksi btn-hapus" data-index="${index}">Hapus</button>
        </td>
      `;
      dataBody.appendChild(tr);
    });

    addEditDeleteListeners();
  }

  // create
  formTambah.addEventListener("submit", (e) => {
    e.preventDefault();
    const newData = {
      nama_kategori: tambahNama.value,
      harga_per_kg: parseInt(tambahHarga.value),
    };
    dataKategori.push(newData);
    renderTable();
    modalTambah.classList.remove("active");
    formTambah.reset();
  });

  // update
  function openEditModal(index) {
    const item = dataKategori[index];
    editIndex.value = index;
    editNama.value = item.nama_kategori;
    editHarga.value = item.harga_per_kg;
    modalEdit.classList.add("active");
  }

  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = parseInt(editIndex.value);
    const updatedData = {
      nama_kategori: editNama.value,
      harga_per_kg: parseInt(editHarga.value),
    };
    dataKategori[index] = updatedData;
    renderTable();
    modalEdit.classList.remove("active");
  });

  // delete
  function deleteData(index) {
    const nama = dataKategori[index].nama_kategori;
    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${nama}"?`)) {
      dataKategori.splice(index, 1);
      renderTable();
    }
  }

  function addEditDeleteListeners() {
    document.querySelectorAll(".btn-edit").forEach((button) => {
      button.addEventListener("click", (e) => openEditModal(e.target.dataset.index));
    });
    document.querySelectorAll(".btn-hapus").forEach((button) => {
      button.addEventListener("click", (e) => deleteData(e.target.dataset.index));
    });
  }

  // modal
  btnTambah.addEventListener("click", () => {
    modalTambah.classList.add("active");
  });

  [...btnTutup, ...btnBatal].forEach((btn) => {
    btn.addEventListener("click", () => {
      modalTambah.classList.remove("active");
      modalEdit.classList.remove("active");
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalTambah) modalTambah.classList.remove("active");
    if (e.target === modalEdit) modalEdit.classList.remove("active");
  });

  // inisialisasi aplikasi
  function initApp() {
    fetch("data.json")
      .then((response) => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
      .then((data) => {
        dataKategori = data.map((item) => ({
          nama_kategori: item.nama_kategori,
          harga_per_kg: item.harga_per_kg,
        }));
        renderTable();
      })
      .catch((error) => {
        console.error("Gagal memuat data:", error);
        dataBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">Gagal memuat data. Periksa 'data.json' atau koneksi server.</td></tr>`;
      });
  }

  initApp();
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});