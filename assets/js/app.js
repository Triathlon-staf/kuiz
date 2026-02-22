// ================= SUPABASE INIT =================
const SUPABASE_URL = "ISI_PROJECT_URL";
const SUPABASE_KEY = "ISI_ANON_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ================= REGISTER =================
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    registerError.textContent = "";

    const nama = document.getElementById("nama").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!nama || !username || !password || !role) {
      registerError.textContent = "Semua field wajib diisi";
      return;
    }

    const email = `${username.toLowerCase()}@elearning.com`;

    // Auth signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      registerError.textContent = error.message;
      return;
    }

    // Insert profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      nama,
      role,
    });

    if (profileError) {
      registerError.textContent = "Gagal menyimpan profil";
      return;
    }

    alert("Registrasi berhasil 🎉");
    window.location.href = "index.html";
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!username || !password || !role) {
      loginError.textContent = "Semua field wajib diisi";
      return;
    }

    const email = `${username.toLowerCase()}@elearning.com`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      loginError.textContent = error.message;
      return;
    }

    // Ambil role dari profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile || profile.role !== role) {
      loginError.textContent = "Role tidak sesuai";
      return;
    }

    // Redirect sesuai role
    if (role === "mahasiswa") {
      window.location.href = "mahasiswa/dashboard.html";
    } else {
      window.location.href = "dosen/dashboard.html";
    }
  });
}
