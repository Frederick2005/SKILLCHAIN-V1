document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const root = document.documentElement;
  const icon = toggleBtn.querySelector("i");
  const label = toggleBtn.querySelector("span");

  // Apply UI based on current theme
  function updateThemeUI(isDark) {
    if (isDark) {
      // DARK active → button switches to LIGHT
      icon.className = "fas fa-sun";
      label.textContent = " Light Mode";

      toggleBtn.style.background =
        getComputedStyle(root).getPropertyValue("--color-card-bg").trim();
      toggleBtn.style.color =
        getComputedStyle(root).getPropertyValue("--color-text").trim();
    } else {
      // LIGHT active → button switches to DARK
      icon.className = "fas fa-moon";
      label.textContent = " Dark Mode";

      toggleBtn.style.background =
        getComputedStyle(root).getPropertyValue("--color-bg").trim();
      toggleBtn.style.color =
        getComputedStyle(root).getPropertyValue("--color-primary").trim();
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  if (isDark) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }

  updateThemeUI(isDark);

  // Toggle on click
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.add("rotate");
    setTimeout(() => toggleBtn.classList.remove("rotate"), 400);

    const darkActive = root.getAttribute("data-theme") === "dark";

    if (darkActive) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      updateThemeUI(false);
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      updateThemeUI(true);
    }
  });
});