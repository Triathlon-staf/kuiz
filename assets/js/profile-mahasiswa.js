const auth = firebase.auth();
const db = firebase.firestore();

function simpanProfilMahasiswa() {
  const user = auth.currentUser;
  if (!user) return alert("Belum login");

  db.collection("users").doc(user.uid).set({
    uid: user.uid,
    role: "mahasiswa",
    nama: document.getElementById("nama").value,
    nim: document.getElementById("nim").value,
    prodi: document.getElementById("prodi").value,
    angkatan: document.getElementById("angkatan").value,
    email: user.email
  })
  .then(() => {
    location.href = "mahasiswa/dashboard.html";
  })
  .catch(err => alert(err.message));
}
