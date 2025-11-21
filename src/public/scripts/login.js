document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await res.json();

      //   if (!res.ok) {
      //     alert(data.message || "Login failed!");
      //     return;
      //   }

      localStorage.setItem("token", data.token);

      console.log(data);

      // Success
      //   alert("Login successful!");
      window.location.href = "/profile"; // redirect to dashboard
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  });
});
