document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});

fetch("../keuntungan_Reza_103022300109/dataKeuntungan.json")
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nama}</td>
        <td>${item.nominal}</td>
        <td>${item.rekening}</td>
        <td>${item.metode}</td>
        <td>
          <button class="btn btn-terima">Terima</button>
          <button class="btn btn-tolak">Tolak</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error("Gagal load data JSON:", err));