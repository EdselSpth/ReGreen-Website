document.addEventListener("DOMContentLoaded", () => {
  // === VARIABEL GLOBAL UNTUK MENYIMPAN DATA ===
  let dataKategori = [];

  // === SELEKTOR DOM ===
  const dataBody = document.getElementById("data-body");

  // Modal Tambah
  const btnTambah = document.getElementById("btnTambah");
  const modalTambah = document.getElementById("modal-tambah");
  const formTambah = document.getElementById("form-tambah");
  const tambahNama = document.getElementById("tambah-nama");
  const tambahHarga = document.getElementById("tambah-harga");
  // Deskripsi Dihilangkan

  // Modal Edit
  const modalEdit = document.getElementById("modal-edit");
  const formEdit = document.getElementById("form-edit");
  const editIndex = document.getElementById("edit-index"); // Input hidden
  const editNama = document.getElementById("edit-nama");
  const editHarga = document.getElementById("edit-harga");
  // Deskripsi Dihilangkan

  // Tombol Modal (Tutup & Batal)
  const btnTutup = document.querySelectorAll(".btn-tutup");
  const btnBatal = document.querySelectorAll(".btn-batal");

  // === FUNGSI READ (R) ===
  /**
   * Merender (menampilkan) semua data dari array 'dataKategori' ke dalam tabel HTML.
   * Tabel hanya memiliki 3 kolom (Nama, Harga, Aksi).
   */
  function renderTable() {
    dataBody.innerHTML = ""; // Kosongkan tabel
    
    // Colspan disetel 3, sesuai dengan thead HTML Anda (Nama, Harga, Aksi)
    const colspan = 3; 

    if (dataKategori.length === 0) {
      dataBody.innerHTML = `<tr><td colspan="${colspan}" style="text-align: center;">Tidak ada data.</td></tr>`;
      return;
    }

    dataKategori.forEach((item, index) => {
      const tr = document.createElement("tr");

      // Format harga ke Rupiah
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

    // Setelah tabel dirender, tambahkan event listener ke tombol-tombol baru
    addEditDeleteListeners();
  }

  // === FUNGSI CREATE (C) ===
  /**
   * Menangani event 'submit' pada form tambah data.
   */
  formTambah.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah form reload halaman

    const newData = {
      nama_kategori: tambahNama.value,
      harga_per_kg: parseInt(tambahHarga.value),
      // Deskripsi Dihilangkan
    };

    dataKategori.push(newData); // Tambah ke array
    renderTable(); // Render ulang tabel

    modalTambah.style.display = "none";
    formTambah.reset();
  });

  // === FUNGSI UPDATE (U) ===
  /**
   * Membuka modal edit dan mengisinya dengan data yang ada.
   * @param {number} index - Indeks data yang akan diedit
   */
  function openEditModal(index) {
    const item = dataKategori[index];

    // Isi form edit
    editIndex.value = index;
    editNama.value = item.nama_kategori;
    editHarga.value = item.harga_per_kg;
    // Deskripsi Dihilangkan

    modalEdit.style.display = "block";
  }

  /**
   * Menangani event 'submit' pada form edit data.
   */
  formEdit.addEventListener("submit", (e) => {
    e.preventDefault();

    const index = parseInt(editIndex.value);
    const updatedData = {
      nama_kategori: editNama.value,
      harga_per_kg: parseInt(editHarga.value),
      // Deskripsi Dihilangkan
    };

    dataKategori[index] = updatedData; // Timpa data lama dengan data baru
    renderTable(); // Render ulang tabel

    modalEdit.style.display = "none";
  });

  // === FUNGSI DELETE (D) ===
  /**
   * Menghapus data dari array berdasarkan index.
   * @param {number} index - Indeks data yang akan dihapus
   */
  function deleteData(index) {
    const nama = dataKategori[index].nama_kategori;
    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${nama}"?`)) {
      dataKategori.splice(index, 1); // Hapus 1 item dari array
      renderTable(); // Render ulang tabel
    }
  }

  /**
   * Menambahkan event listener ke tombol 'Edit' dan 'Hapus' di tabel.
   */
  function addEditDeleteListeners() {
    document.querySelectorAll(".btn-edit").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        openEditModal(index);
      });
    });

    document.querySelectorAll(".btn-hapus").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        deleteData(index);
      });
    });
  }

  // === KONTROL MODAL ===
  // Buka Modal Tambah
  btnTambah.addEventListener("click", () => {
    modalTambah.style.display = "block";
  });

  // Tutup Modal (via tombol 'x')
  btnTutup.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalTambah.style.display = "none";
      modalEdit.style.display = "none";
    });
  });

  // Tutup Modal (via tombol 'Batal')
  btnBatal.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalTambah.style.display = "none";
      modalEdit.style.display = "none";
    });
  });

  // Tutup Modal (jika klik di luar modal)
  window.addEventListener("click", (e) => {
    if (e.target === modalTambah) {
      modalTambah.style.display = "none";
    }
    if (e.target === modalEdit) {
      modalEdit.style.display = "none";
    }
  });

  // === INISIALISASI APLIKASI ===
  /**
   * Fungsi utama untuk memuat data dari JSON dan memulai aplikasi.
   */
  function initApp() {
    fetch("data.json") // Mengambil data dari file
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Data dimuat hanya dengan 2 properti
        dataKategori = data.map((item) => ({
          nama_kategori: item.nama_kategori,
          harga_per_kg: item.harga_per_kg,
        }));

        renderTable(); // Tampilkan data ke tabel setelah berhasil dimuat
      })
      .catch((error) => {
        console.error("Gagal memuat data:", error);
        // Colspan disetel 3, sesuai dengan thead HTML Anda (Nama, Harga, Aksi)
        dataBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: red;">Gagal memuat data. Pastikan file 'data.json' tersedia.</td></tr>`;
      });
  }

  // Jalankan aplikasi
  initApp();
});