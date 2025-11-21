document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const formMessage = document.getElementById("formMessage");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect input values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Quick validation
    if (!username || !email || !password) {
      formMessage.textContent = "All fields are required!";
      return;
    }

    // POST /api/auth/register
    async function register(username, email, password) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      // Save token
      localStorage.setItem("token", data.token);
      return data;
    }

    register(username, email, password);

    // Build the payload
    // const payload = { username, email, password };

    // try {
    //   // Send data to backend
    //   const response = await fetch("/api/auth/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     formMessage.style.color = "#ff6b6b";
    //     formMessage.textContent = data.message || "Registration failed!";
    //     return;
    //   }

    //   // Success
    //   formMessage.style.color = "#28a745";
    //   formMessage.textContent = "Account created successfully! Redirecting...";

    //   // Redirect after 1 second
    //   setTimeout(() => {
    //     window.location.href = "/signin";
    //   }, 1000);
    // } catch (error) {
    //   console.error("Signup Error:", error);
    //   formMessage.style.color = "#ff6b6b";
    //   formMessage.textContent = "Something went wrong. Try again.";
    // }
  });
});
