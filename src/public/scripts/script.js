
/* ======= QUICK FIX SHIMS — paste this at top of script.js ======= */

/**
 * protectPage shim
 * If you later want to enforce auth, replace the body with real logic.
 * For now it simply returns false (not redirecting) to avoid crashes.
 */
if (typeof protectPage === "undefined") {
  function protectPage(options = {}) {
    // Example: if you want to redirect unauthenticated users,
    // set localStorage.setItem('userRegistered','true') on login
    try {
      const registered = localStorage.getItem("userRegistered") === "true";
      if (!registered && options.redirect !== false) {
        // don't auto-redirect by default (avoids surprise navigation during debugging)
        // To enable redirecting, call protectPage({redirect:true})
      }
      return registered;
    } catch (err) {
      return false;
    }
  }
}

/**
 * Ensure username variable exists
 * Many scripts read username directly — provide a safe default.
 */
if (typeof username === "undefined") {
  var username = (function(){
    try {
      return localStorage.getItem("username") || ""; 
    } catch (e) {
      return "";
    }
  })();
}

/**
 * safeAfter helper to avoid "Cannot read properties of null (reading 'after')" errors.
 * Usage replacement: instead of `el.after(node)` use `safeAfter(el, node)` or
 * `safeAfterSelector('#some-id', htmlStringOrNode)`.
 */
function safeAfter(targetOrSelector, nodeOrHtml) {
  try {
    let target;
    if (!targetOrSelector) return false;
    if (typeof targetOrSelector === "string") {
      target = document.querySelector(targetOrSelector);
    } else {
      target = targetOrSelector;
    }
    if (!target) return false;

    if (typeof nodeOrHtml === "string") {
      target.insertAdjacentHTML("afterend", nodeOrHtml);
    } else if (nodeOrHtml instanceof Node) {
      target.parentNode && target.parentNode.insertBefore(nodeOrHtml, target.nextSibling);
    }
    return true;
  } catch (e) {
    console.warn("safeAfter failed", e);
    return false;
  }
}

/**
 * safeRun — wrapper to run code and never let one error stop the rest.
 * Use: safeRun(() => { /* risky code * / });
 */
function safeRun(fn, label = "safeRun") {
  try {
    fn && fn();
  } catch (err) {
    console.error("Ignored error in", label, err);
  }
}

/* ======= End shims ======= */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const formMessage = document.getElementById('formMessage');
  const passwordStrength = document.createElement('div');
  passwordStrength.style.marginTop = '5px';
  passwordStrength.style.fontSize = '0.9rem';
  passwordStrength.style.fontWeight = '500';
  password.after(passwordStrength);

  // Helper function: check password strength
  function getPasswordStrength(pw) {
    let strength = 0;
    if(pw.length >= 6) strength++;
    if(/[A-Z]/.test(pw)) strength++;
    if(/[0-9]/.test(pw)) strength++;
    if(/[@$!%*?&]/.test(pw)) strength++;
    switch(strength) {
      case 0:
      case 1: return {text: 'Weak', color: '#ff4d4d'};
      case 2: return {text: 'Moderate', color: '#ffb84d'};
      case 3: return {text: 'Strong', color: '#4ade80'};
      case 4: return {text: 'Very Strong', color: '#22c55e'};
    }
  }

  // Real-time password strength check
  password.addEventListener('input', () => {
    const strength = getPasswordStrength(password.value);
    passwordStrength.textContent = strength.text;
    passwordStrength.style.color = strength.color;
  });

  // Real-time confirm password check
  confirmPassword.addEventListener('input', () => {
    if(confirmPassword.value !== password.value) {
      confirmPassword.style.borderColor = '#ff4d4d';
    } else {
      confirmPassword.style.borderColor = '#4ade80';
    }
  });

  // Real-time email validation
  email.addEventListener('input', () => {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.value.match(emailPattern)) {
      email.style.borderColor = '#ff4d4d';
    } else {
      email.style.borderColor = '#4ade80';
    }
  });

  // Real-time full name check
  fullName.addEventListener('input', () => {
    if(fullName.value.trim().length < 3) {
      fullName.style.borderColor = '#ff4d4d';
    } else {
      fullName.style.borderColor = '#4ade80';
    }
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.style.color = '#ff6b6b';

    if(fullName.value.trim().length < 3) {
      formMessage.textContent = 'Full Name must be at least 3 characters.';
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.value.match(emailPattern)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    if(password.value.length < 6) {
      formMessage.textContent = 'Password must be at least 6 characters.';
      return;
    }

    if(password.value !== confirmPassword.value) {
      formMessage.textContent = 'Passwords do not match.';
      return;
    }

    // Success
    formMessage.style.color = '#4ade80';
    formMessage.textContent = 'Account created successfully! Redirecting...';

    setTimeout(() => {
      window.location.href = 'signin.html';
    }, 1500);
  });
});
fullName.addEventListener('input', () => {
  fullName.classList.toggle('invalid', fullName.value.trim().length < 3);
  fullName.classList.toggle('valid', fullName.value.trim().length >= 3);
});

email.addEventListener('input', () => {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  email.classList.toggle('invalid', !email.value.match(emailPattern));
  email.classList.toggle('valid', email.value.match(emailPattern));
});

password.addEventListener('input', () => {
  const strength = getPasswordStrength(password.value);
  passwordStrength.textContent = strength.text;
  passwordStrength.style.color = strength.color;
  password.classList.toggle('invalid', password.value.length < 6);
  password.classList.toggle('valid', password.value.length >= 6);
});

confirmPassword.addEventListener('input', () => {
  confirmPassword.classList.toggle('invalid', confirmPassword.value !== password.value);
  confirmPassword.classList.toggle('valid', confirmPassword.value === password.value);
});

// -------------------- HERO ANIMATIONS --------------------
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero h1, .hero h2");
  const heroText = document.querySelector(".hero p");
  const heroCTA = document.querySelectorAll(".hero .cta a");

  if(heroTitle) heroTitle.style.opacity = 0;
  if(heroText) heroText.style.opacity = 0;

  // Fade in hero content
  setTimeout(() => {
    if(heroTitle) heroTitle.style.transition = "opacity 1s, transform 1s";
    if(heroText) heroText.style.transition = "opacity 1s, transform 1s";
    if(heroTitle) heroTitle.style.opacity = 1;
    if(heroTitle) heroTitle.style.transform = "translateY(0)";
    if(heroText) heroText.style.opacity = 1;
    if(heroText) heroText.style.transform = "translateY(0)";
  }, 500);

  heroCTA.forEach((btn, i) => {
    btn.style.opacity = 0;
    setTimeout(() => {
      btn.style.transition = "opacity 0.8s ease, transform 0.3s ease";
      btn.style.opacity = 1;
      btn.style.transform = "translateY(0)";
    }, 800 + i * 200);
  });
});

// -------------------- SMOOTH SCROLL FOR NAV LINKS --------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// -------------------- FORM VALIDATION --------------------
const forms = document.querySelectorAll("form");

forms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const inputs = form.querySelectorAll("input[required], textarea[required]");
    inputs.forEach(input => {
      if(input.value.trim() === "") {
        input.classList.add("invalid");
        input.classList.remove("valid");
        valid = false;
      } else {
        input.classList.add("valid");
        input.classList.remove("invalid");
      }
    });

    // Password match check
    const password = form.querySelector('input[name="password"]');
    const confirm = form.querySelector('input[name="confirm_password"]');
    if(password && confirm) {
      if(password.value !== confirm.value) {
        confirm.classList.add("invalid");
        confirm.classList.remove("valid");
        valid = false;
        alert("Passwords do not match!");
      } else if(confirm.value !== "") {
        confirm.classList.add("valid");
        confirm.classList.remove("invalid");
      }
    }

    if(valid) {
      alert("Form submitted successfully! (Simulated)");
      form.reset();
      inputs.forEach(i => i.classList.remove("valid"));
    }
  });
});

// -------------------- SHOW / HIDE PASSWORD --------------------
document.querySelectorAll(".toggle-password").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const input = document.querySelector(`#${toggle.dataset.target}`);
    if(input) {
      input.type = input.type === "password" ? "text" : "password";
      toggle.textContent = input.type === "password" ? "Show" : "Hide";
    }
  });
});

// -------------------- MOBILE MENU TOGGLE --------------------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
function isUserRegistered() {
    return localStorage.getItem("userRegistered") === "true";
}

document.getElementById("start-learning-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (isUserRegistered()) {
        window.location.href = "account.html";
    } else {
        window.location.href = "new_account.html";
    }
});

document.getElementById("become-creator-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (isUserRegistered()) {
        window.location.href = "create.html";
    } else {
        window.location.href = "new_account.html";
    }
});

