// ===== DUMMY LOGIN LOGIC =====

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const errorBox = document.querySelector(".login-error");

    // akun dummy
    const dummyAccounts = [
      { username: "mahasiswa", password: "123", role: "mahasiswa" },
      { username: "dosen", password: "123", role: "dosen" },
    ];

    const validUser = dummyAccounts.find(
      (acc) =>
        acc.username === username &&
        acc.password === password &&
        acc.role === role
    );

    if (!validUser) {
      errorBox.textContent = "Username, password, atau role salah";
      return;
    }

    // redirect sesuai role
    if (role === "mahasiswa") {
      window.location.href = "mahasiswa/dashboard.html";
    } else if (role === "dosen") {
      window.location.href = "dosen/dashboard.html";
    }
  });
});
