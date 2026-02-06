document.addEventListener("DOMContentLoaded", () => {

  // Initialize common UI components (dropdowns, carousels, etc.)
  if (typeof initUIComponents === "function") initUIComponents();

  // Initialize page-specific scripts
  if (typeof initAuthPage === "function") initAuthPage();
  if (typeof initMainPage === "function") initMainPage();
  if (typeof initDashboardPage === "function") initDashboardPage();
  if (typeof initThemePage === "function") initThemePage();


  // Update copyright year dynamically
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// Smooth scroll to an element by ID
function scrollToElement(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

// Simple debounce helper
function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}