// auth.js - SkillChain Auth Module
// Handles login, signup, logout, forgot/reset password, verify email

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
});

function initAuth() {
  handleLogin();
  handleSignup();
  handleForgotPassword();
  handleResetPassword();
  handleLogout();
  handleVerifyEmail();
}

// -------------------------
// Utilities
// -------------------------

function getCSRFToken() {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute("content") : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(elementId, text, type = "info") {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.className = `auth-message ${type}`;
}

function startCooldown(button, seconds = 60) {
  button.disabled = true;
  let timer = seconds;

  const interval = setInterval(() => {
    button.textContent = `Resend in ${timer--}s`;
    if (timer < 0) {
      clearInterval(interval);
      button.disabled = false;
      button.textContent = "Resend verification email";
    }
  }, 1000);
}

// -------------------------
// Login
// -------------------------
function handleLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const remember = form.remember?.checked || false;

    if (!email || !password) return alert("Please fill all fields");
    if (!isValidEmail(email)) return alert("Invalid email");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCSRFToken()
        },
        body: JSON.stringify({ email, password, remember }),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Redirect to dashboard/home
      window.location.href = "/src/public/templates/main/home.html";
    } catch (err) {
      showMessage("login-message", err.message, "error");
    }
  });
}

// -------------------------
// Signup
// -------------------------
function handleSignup() {
  const form = document.getElementById("signup-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form["confirm-password"].value;

    if (!username || !email || !password || !confirmPassword)
      return alert("All fields are required");
    if (!isValidEmail(email)) return alert("Invalid email");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (password.length < 8) return alert("Password must be at least 8 characters");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCSRFToken()
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // Redirect to verify email page
      window.location.href = "verify-email.html";
    } catch (err) {
      showMessage("signup-message", err.message, "error");
    }
  });
}

// -------------------------
// Forgot Password
// -------------------------
function handleForgotPassword() {
  const form = document.getElementById("forgot-password-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!email || !isValidEmail(email)) return alert("Invalid email");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCSRFToken()
        },
        body: JSON.stringify({ email }),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      showMessage("forgot-message", "Password reset link sent!", "success");
      form.reset();
    } catch (err) {
      showMessage("forgot-message", err.message, "error");
    }
  });
}

// -------------------------
// Reset Password
// -------------------------
function handleResetPassword() {
  const form = document.getElementById("reset-password-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPassword = form["new-password"].value;
    const confirmPassword = form["confirm-password"].value;

    if (!newPassword || newPassword !== confirmPassword)
      return alert("Passwords do not match");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCSRFToken()
        },
        body: JSON.stringify({ password: newPassword }),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");

      showMessage("reset-message", "Password updated! Redirecting...", "success");
      setTimeout(() => window.location.href = "login.html", 3000);
    } catch (err) {
      showMessage("reset-message", err.message, "error");
    }
  });
}

// -------------------------
// Logout
// -------------------------
function handleLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "X-CSRF-Token": getCSRFToken() },
        credentials: "include"
      });

      sessionStorage.clear();
      localStorage.removeItem("userToken");
      window.location.href = "login.html";
    } catch (err) {
      console.error("Logout failed", err);
    }
  });
}

// -------------------------
// Verify Email
// -------------------------
function handleVerifyEmail() {
  const resendBtn = document.getElementById("resend-email-btn");
  if (!resendBtn) return;

  const isVerified = localStorage.getItem("emailVerified") === "true";
  if (isVerified) {
    resendBtn.disabled = true;
    resendBtn.textContent = "Email already verified";
    showMessage("verify-message", "Your email is already verified.", "success");
    return;
  }

  resendBtn.addEventListener("click", async () => {
    startCooldown(resendBtn);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "X-CSRF-Token": getCSRFToken() },
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Could not resend email");

      localStorage.setItem("emailVerified", "true");
      showMessage("verify-message", "Email verified! Redirecting...", "success");
      setTimeout(() => window.location.href = "login.html", 3000);
    } catch (err) {
      showMessage("verify-message", err.message, "error");
    }
  });
}
