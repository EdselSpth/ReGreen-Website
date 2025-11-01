// ===== Logout =====
document.getElementById("logoutBtn")?.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022330036/login.html";
  }
});

// ===== Element =====
const tblPending = document.querySelector("#tblPending tbody");
const tblAccepted = document.querySelector("#tblAccepted tbody");

// ===== Helper Functions =====
function setAcceptedUI(row) {
  const cells = row.querySelectorAll("td");
  cells[3].innerHTML = `
    <div class="status-wrapper">
      <span class="status-text accepted">Diterima</span>
      <a href="#" class="edit-link" data-action="tolak">Ubah</a>
    </div>
  `;
}

function setRejectedUI(row) {
  const cells = row.querySelectorAll("td");
  cells[3].innerHTML = `
    <div class="status-wrapper">
      <span class="status-text rejected">Ditolak</span>
      <a href="#" class="edit-link" data-action="terima">Ubah</a>
    </div>
  `;
}

function setPendingUI(row) {
  const cells = row.querySelectorAll("td");
  cells[3].innerHTML = `
    <button class="btn btn-terima">Terima</button>
    <button class="btn btn-tolak">Tolak</button>
  `;
}

function updateRowNumbers(tbody) {
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    row.querySelector("td:first-child").textContent = index + 1;
  });
}

// ===== Event Listener =====
document.addEventListener("click", function (e) {
  // TERIMA
  const terima = e.target.closest(".btn-terima");
  if (terima) {
    const row = terima.closest("tr");
    setAcceptedUI(row);
    tblAccepted.appendChild(row);
    updateRowNumbers(tblPending);
    updateRowNumbers(tblAccepted);
    return;
  }

  // TOLAK
  const tolak = e.target.closest(".btn-tolak");
  if (tolak) {
    const row = tolak.closest("tr");
    setRejectedUI(row);
    tblAccepted.appendChild(row);
    updateRowNumbers(tblPending);
    updateRowNumbers(tblAccepted);
    return;
  }

  // EDIT LINK
  const editLink = e.target.closest(".edit-link");
  if (editLink) {
    e.preventDefault();
    const row = editLink.closest("tr");
    const action = editLink.dataset.action;
    
    if (action === "tolak") {
      setRejectedUI(row);
    } else if (action === "terima") {
      setAcceptedUI(row);
    }
  }
});