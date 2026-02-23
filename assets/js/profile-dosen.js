const auth = firebase.auth();
const db = firebase.firestore();

function simpanProfilDosen() {
  const user = auth.currentUser;
  if (!user) return alert("Belum login");

  db.collection("users").doc(user.uid).set({
    uid: user.uid,
    role: "dosen",
    nama: document.getElementById("nama").value,
    nip: document.getElementById("nip").value,
    jabatan: document.getElementById("jabatan").value,
    email: user.email
  })
  .then(() => {
    location.href = "dosen/dashboard.html";
  })
  .catch(err => alert(err.message));
}
