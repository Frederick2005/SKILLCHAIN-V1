// ===== Save User to Local Storage (SIGNUP) =====
function registerUser(event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!username || !email || !password) {
        alert("All fields are required!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("skillchainUser", JSON.stringify(userData));

    alert("Account created successfully!");
    window.location.href = "login.html";
}



// ===== LOGIN FUNCTION =====
function loginUser(event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("skillchainUser"));

    if (!savedUser) {
        alert("No account found! Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Incorrect email or password.");
    }
}



// ===== CHECK LOGIN STATE =====
function protectPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}



// ===== LOGOUT FUNCTION =====
function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}