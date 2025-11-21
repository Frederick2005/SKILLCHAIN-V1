document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".create-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = form.querySelector('input[name="title"]').value;
    const description = form.querySelector(
      'textarea[name="description"]'
    ).value;
    const category = form.querySelector('select[name="category"]').value;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/content/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category: category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Creation failed!");
        return;
      }

      console.log(data);

      // Success
      alert("Content created successfully!");
      window.location.href = "/profile"; // redirect to dashboard
    } catch (err) {
      console.error("Creation error:", err);
      alert("Something went wrong. Try again.");
    }
  });
});
