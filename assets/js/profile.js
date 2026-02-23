const role = localStorage.getItem("role");
document.getElementById("role").value = role;

if (role === "mahasiswa") {
  document.getElementById("form-mahasiswa").classList.remove("hidden");
}

if (role === "dosen") {
  document.getElementById("form-dosen").classList.remove("hidden");
}

function simpanProfil() {
  alert("Profil siap disimpan (nanti kita sambung ke Firestore)");
}
