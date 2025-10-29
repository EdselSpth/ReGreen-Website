document.addEventListener("DOMContentLoaded", () => {

    const tableBody = document.getElementById("data-pengguna-body");
    const tombolTambah = document.querySelector(".btn-tambah");
    const pageInfo = document.getElementById("page-info");
    
    const modalTambah = document.getElementById("modal-tambah");
    const modalEdit = document.getElementById("modal-edit");
    const modalPassword = document.getElementById("modal-password");
    
    const formTambah = document.getElementById("form-tambah");
    const formEdit = document.getElementById("form-edit");
    const formPassword = document.getElementById("form-password");

    const tombolTutup = document.querySelectorAll(".btn-tutup");
    const tombolBatal = document.querySelectorAll(".btn-batal");

    let dataAplikasi = [];


    async function muatData() {
        try {
            const response = await fetch('data_akun.json'); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            dataAplikasi = await response.json();
            renderTabel(dataAplikasi);
        } catch (error) {
            console.error("Gagal memuat data:", error);
            pageInfo.innerText = "Gagal memuat data.";
            tableBody.innerHTML = `<tr role="row"><td colspan="4" style="text-align:center;">Gagal memuat data.</td></tr>`;
        }
    }

    function renderTabel(data) {
        tableBody.innerHTML = "";
        if (data.length === 0) {
            pageInfo.innerText = "Tidak ada data.";
            tableBody.innerHTML = `<tr role="row"><td colspan="4" style="text-align:center;">Belum ada data.</td></tr>`;
            return;
        }

        data.forEach((item) => {
            const tr = document.createElement("tr");
            const unikId = item.email; 

            tr.innerHTML = `
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td>
                    <button class="btn-aksi btn-edit" data-id="${unikId}">
                        ✏️
                    </button>
                    <button class="btn-aksi btn-hapus" data-id="${unikId}">
                        🗑️
                    </button>
                    <button class="btn-aksi btn-password" data-id="${unikId}">
                        🔑
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
        
        pageInfo.innerText = `Menampilkan 1 sampai ${data.length} dari ${data.length} data.`;
    }

    function openModal(modal) {
        if (modal) {
            modal.classList.add("active");
        }
    }

    function closeModal() {
        if (modalTambah) modalTambah.classList.remove("active");
        if (modalEdit) modalEdit.classList.remove("active");
        if (modalPassword) modalPassword.classList.remove("active");
    }

    tombolTambah.addEventListener("click", () => {
        openModal(modalTambah);
    });

    tombolTutup.forEach(button => {
        button.addEventListener("click", closeModal);
    });

    tombolBatal.forEach(button => {
        button.addEventListener("click", closeModal);
    });

    window.addEventListener("click", (event) => {
        if (event.target == modalTambah) closeModal();
        if (event.target == modalEdit) closeModal();
        if (event.target == modalPassword) closeModal();
    });

    formTambah.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const newUser = {
            username: document.getElementById("tambah-username").value,
            email: document.getElementById("tambah-email").value,
            role: document.getElementById("tambah-role").value,
        };

        dataAplikasi.push(newUser);
        
        renderTabel(dataAplikasi);
        
        closeModal();
        formTambah.reset();
        
        console.log("Data baru ditambahkan (simulasi):", newUser);
    });

    tableBody.addEventListener("click", (event) => {
        const targetButton = event.target.closest(".btn-aksi");
        if (!targetButton) return; 

        const id = targetButton.dataset.id; 
        const user = dataAplikasi.find(u => u.email === id);
        if (!user) return; 

        if (targetButton.classList.contains("btn-edit")) {
            document.getElementById("edit-user-id").value = user.email;
            document.getElementById("edit-username").value = user.username;
            document.getElementById("edit-email").value = user.email;
            document.getElementById("edit-role").value = user.role;
            openModal(modalEdit);
        }

        if (targetButton.classList.contains("btn-password")) {
            document.getElementById("password-user-id").value = user.email;
            document.getElementById("password-user-email").innerText = user.email;
            openModal(modalPassword);
        }

        if (targetButton.classList.contains("btn-hapus")) {
            if (confirm(`Yakin ingin menghapus pengguna "${user.username}" (${user.email})?`)) {
                dataAplikasi = dataAplikasi.filter(u => u.email !== id);
                renderTabel(dataAplikasi);
                console.log(`Data dengan ID ${id} dihapus (simulasi).`);
            }
        }
    });

    formEdit.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const id = document.getElementById("edit-user-id").value;
        const index = dataAplikasi.findIndex(u => u.email === id);
        
        if (index > -1) {
            dataAplikasi[index].username = document.getElementById("edit-username").value;
            dataAplikasi[index].email = document.getElementById("edit-email").value;
            dataAplikasi[index].role = document.getElementById("edit-role").value;
            
            renderTabel(dataAplikasi);
            
            console.log("Data diupdate (simulasi):", dataAplikasi[index]);
        }
        
        closeModal();
    });

    formPassword.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const id = document.getElementById("password-user-id").value;
        const passBaru = document.getElementById("password-baru").value;
        const passKonfirm = document.getElementById("password-konfirmasi").value;
        
        if (passBaru !== passKonfirm) {
            alert("Password baru dan konfirmasi tidak cocok!");
            return;
        }

        console.log(`(Simulasi) Password untuk ${id} telah diubah menjadi: ${passBaru}`);
        
        alert(`Password untuk ${id} berhasil diubah!`);
        closeModal();
        formPassword.reset();
    });

    muatData();

});