/* =========================
   AUTH LOGIC – SkillChain
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  handleLogin();
  handleSignup();
  handleForgotPassword();
  handleResetPassword();
  handleLogout();
  handleVerifyEmail();
});

/* ------------------------------
   LOGIN LOGIC
-------------------------------*/
function handleLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const remember = form.remember.checked;

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulated API call
    console.log("Logging in:", { email, password, remember });
    const fakeResponse = { success: true, token: "abc123" };

    if (fakeResponse.success) {
      if (remember) {
        localStorage.setItem("userToken", fakeResponse.token);
      } else {
        sessionStorage.setItem("userToken", fakeResponse.token);
      }
      alert("Login successful!");
      location.hash = "#/home";
    } else {
      alert("Invalid email or password.");
    }

    form.reset();
  });
}

/* ------------------------------
   SIGNUP LOGIC
-------------------------------*/
function handleSignup() {
  const form = document.getElementById("signup-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Signing up:", { username, email });

    const fakeResponse = { success: true, token: "xyz789" };

    if (fakeResponse.success) {
      alert("Account created successfully! Please verify your email.");
      location.hash = "#/verify-email";
    } else {
      alert("Failed to create account. Try again.");
    }

    form.reset();
  });
}

/* ------------------------------
   FORGOT PASSWORD LOGIC
-------------------------------*/
function handleForgotPassword() {
  const form = document.getElementById("forgot-password-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    console.log("Sending password reset link to:", email);

    const fakeResponse = { success: true };

    if (fakeResponse.success) {
      alert(`Password reset link sent to ${email}. Check your inbox.`);
      location.hash = "#/login";
    } else {
      alert("Failed to send reset link. Try again.");
    }

    form.reset();
  });
}

/* ------------------------------
   RESET PASSWORD LOGIC
-------------------------------*/
function handleResetPassword() {
  const form = document.getElementById("reset-password-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Password reset to:", newPassword);
    alert("Password reset successfully!");
    location.hash = "#/login";

    form.reset();
  });
}

/* ------------------------------
   LOGOUT LOGIC
-------------------------------*/
function handleLogout() {
  const logoutPage = document.querySelector(".page.logout");
  if (!logoutPage) return;

  localStorage.removeItem("userToken");
  sessionStorage.clear();

  setTimeout(() => {
    location.hash = "#/login";
  }, 1500);
}

/* ------------------------------
   VERIFY EMAIL LOGIC
-------------------------------*/
function handleVerifyEmail() {
  const btn = document.getElementById("resend-email-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    console.log("Resending verification email...");
    const fakeResponse = { success: true };

    if (fakeResponse.success) {
      alert("Verification email resent! Check your inbox.");
    } else {
      alert("Failed to resend email. Try again.");
    }
  });
}

/* ------------------------------
   HELPER FUNCTIONS
-------------------------------*/
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}