document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(event) {
        
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === "" || password === "") {
            loginMessage.innerHTML = `<div class="alert alert-danger" role="alert">Email dan Kata Sandi tidak boleh kosong.</div>`;
        } else if (email === "admin@mail.com" && password === "admin123") {
            loginMessage.innerHTML = `<div class="alert alert-success" role="alert">Login berhasil! Mengalihkan...</div>`;
            
            setTimeout(() => {
                window.location.href = '../dashboard_Raka_103022300088/dashboard.html'; 
            }, 2000);

        } else {
            loginMessage.innerHTML = `<div class="alert alert-danger" role="alert">Email atau Kata Sandi salah.</div>`;
        }
    });
});