document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "../login_Edsel_103022300016/login.html";
  }
});

document.getElementById("daftarBtn").addEventListener("click", function() {
  alert("Logika pendaftaran akun kurir dijalankan!");
});