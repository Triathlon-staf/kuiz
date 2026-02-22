// ================= SUPABASE INIT =================
const SUPABASE_URL = "https://fymofqgapfcpbhexhgvy.supabase.co";
const SUPABASE_KEY = "sb_publishable_DdAzmn3X3NlhJNpEmul0ig_c57EUCxh";

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
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!nama || !email || !password || !role) {
      registerError.textContent = "Semua field wajib diisi";
      return;
    }

    // 1️⃣ REGISTER KE SUPABASE AUTH
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      registerError.textContent = error.message;
      return;
    }

    // 2️⃣ SIMPAN PROFILE
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        nama,
        role,
      });

    if (profileError) {
      registerError.textContent = "Gagal menyimpan profil";
      console.error(profileError);
      return;
    }

    alert("Registrasi berhasil 🎉 Silakan login");
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

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
      loginError.textContent = "Semua field wajib diisi";
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      loginError.textContent = error.message;
      return;
    }

    // Ambil role dari profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      loginError.textContent = "Profil tidak ditemukan";
      return;
    }

    if (profile.role !== role) {
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
