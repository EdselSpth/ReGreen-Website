// Logout
document.getElementById("logoutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});

const tblPendingBody = document.querySelector("#tblPending tbody");
const tblHistoryBody = document.querySelector("#tblHistory tbody");

// Load JSON Pendaftaran Area
fetch("dataPendaftaran_area.json")
  .then((res) => {
    if (!res.ok) throw new Error(`Gagal load JSON: ${res.status}`);
    return res.json();
  })
  .then((data) => {
    data.forEach(addRowToPending);
    updateNumbers(tblPendingBody);
  })
  .catch(console.error);

function addRowToPending(item) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td></td>
    <td>${item.nama ?? "-"}</td>
    <td>${item.detail_area_yang_ingin_ditambahkan ?? "-"}</td>
    <td>
      <button class="btn btn-terima">Terima</button>
      <button class="btn btn-tolak">Tolak</button>
    </td>
  `;
  tblPendingBody.appendChild(tr);
}

function addRowToHistory(fromRow, status) {
  const [ , namaCell, detailCell ] = fromRow.querySelectorAll("td");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td></td>
    <td>${namaCell.textContent}</td>
    <td>${detailCell.textContent}</td>
    <td>
      <span class="status-text ${status === "Diterima" ? "accepted" : "rejected"}">${status}</span>
      <a class="edit-link" data-status="${status}">Ubah</a>
    </td>
  `;
  tblHistoryBody.appendChild(tr);
  updateNumbers(tblHistoryBody);
}

function updateNumbers(tbody) {
  [...tbody.rows].forEach((row, i) => (row.cells[0].textContent = i + 1));
}

// Event delegation
document.addEventListener("click", (e) => {
  const acceptBtn = e.target.closest(".btn-terima");
  const rejectBtn = e.target.closest(".btn-tolak");
  const editBtn = e.target.closest(".edit-link");

  if (acceptBtn) {
    const row = acceptBtn.closest("tr");
    row.remove();
    addRowToHistory(row, "Diterima");
    updateNumbers(tblPendingBody);
  }

  if (rejectBtn) {
    const row = rejectBtn.closest("tr");
    row.remove();
    addRowToHistory(row, "Ditolak");
    updateNumbers(tblPendingBody);
  }

  if (editBtn) {
    const row = editBtn.closest("tr");
    const statusSpan = row.querySelector(".status-text");
    const now = statusSpan.textContent.trim();

    if (now === "Diterima") {
      statusSpan.textContent = "Ditolak";
      statusSpan.classList.remove("accepted");
      statusSpan.classList.add("rejected");
    } else {
      statusSpan.textContent = "Diterima";
      statusSpan.classList.remove("rejected");
      statusSpan.classList.add("accepted");
    }
  }
});
