const auth = firebase.auth();

// REGISTER
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    alert("Lengkapi data");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem("role", role);
      alert("Register berhasil");
      location.href = "index.html";
    })
    .catch(err => alert(err.message));
}

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      const role = localStorage.getItem("role");

      if (role === "mahasiswa") {
        location.href = "mahasiswa/dashboard.html";
      } else if (role === "dosen") {
        location.href = "dosen/dashboard.html";
      } else {
        alert("Role tidak ditemukan");
      }
    })
    .catch(err => alert(err.message));
}
