// ============ AUTH ============

function hashSim(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
}

const Auth = {

  async login(email, password) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, msg: data.msg || "Login failed" };
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("nt_session", JSON.stringify(data.user));

      return { success: true };

    } catch (err) {
      return { success: false, msg: "Server error" };
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("nt_session");
    window.location.href = "../index.html";
  },

  getSession() {
    return JSON.parse(localStorage.getItem("nt_session") || "null");
  },

  isLoggedIn() {
    return !!localStorage.getItem("token");
  },

  isAdmin() {
    const user = this.getSession();
    return user && user.role === "admin";
  }
};

// inside login route
// if (email === "admin@naturestouch.com" && password === "admin123") {
//   return res.json({
//     msg: "Admin login",
//     token: "admin-token",
//     user: {
//       email,
//       name: "Admin",
//       role: "admin"
//     }
//   });
// }
