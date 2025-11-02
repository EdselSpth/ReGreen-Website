document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("data-bank-body");
  const tombolTambah = document.querySelector(".btn-tambah");
  const modalTambah = document.getElementById("modal-tambah");
  const modalEdit = document.getElementById("modal-edit");
  const formTambah = document.getElementById("form-tambah");
  const formEdit = document.getElementById("form-edit");
  const tombolTutup = document.querySelectorAll(".btn-tutup");
  const tombolBatal = document.querySelectorAll(".btn-batal");

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

  formTambah.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("tambah-nama").value;
    const alamat = document.getElementById("tambah-alamat").value;
    const jenis = document.getElementById("tambah-jenis").value;
    const status = document.getElementById("tambah-status").value;

    dataBank.push({ nama, alamat, jenis, status });
    renderTabel();
    closeAllModals();
    formTambah.reset();
  });

  tableBody.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.dataset.index;

    if (target.classList.contains("btn-hapus")) {
      if (confirm("Yakin ingin menghapus data ini?")) {
        dataBank.splice(index, 1);
        renderTabel();
      }
    }

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

  renderTabel();
});
document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});