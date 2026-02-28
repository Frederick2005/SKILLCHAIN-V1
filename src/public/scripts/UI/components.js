// components.js - Traditional Multi-Page Version

function initUIComponents() {
  initFooterDropdown();
  initCategoryManager();
  initAutoScroll();
}

// -------------------------
// Footer Dropdown
// -------------------------
function initFooterDropdown() {
  const toggles = document.querySelectorAll(".footer-toggle");
  if (!toggles.length) return;

  toggles.forEach(t =>
    t.addEventListener("click", () => {
      const ul = t.nextElementSibling;
      if (!ul) return;
      ul.style.display = ul.style.display === "block" ? "none" : "block";
    })
  );
}

// -------------------------
// Category Manager
// -------------------------
function initCategoryManager() {
  const categorySelect = document.getElementById("lesson-category");
  const wrapper = document.getElementById("new-category-wrapper");
  const input = document.getElementById("new-category-input");
  const btn = document.getElementById("add-category-btn");
  if (!categorySelect || !wrapper || !input || !btn) return;

  categorySelect.addEventListener("change", () => {
    const show = categorySelect.value === "__add_new__";
    wrapper.style.display = show ? "flex" : "none";
    if (show) input.focus();
    else input.value = "";
  });

  btn.addEventListener("click", () => {
    const val = input.value.trim();
    if (!val) return;

    const option = document.createElement("option");
    option.value = val.toLowerCase().replace(/\s+/g, "-");
    option.textContent = val;

    categorySelect.insertBefore(option, categorySelect.lastElementChild);
    categorySelect.value = option.value;

    input.value = "";
    wrapper.style.display = "none";
    console.log("New category added:", val);
  });
}

function initAutoScroll() {
  const container = document.querySelector(".scroll-container");
  const items = document.querySelectorAll(".scroll-item");
  if (!container || !items.length) return;

  let currentIndex = 0;
  const total = items.length;

  // Auto scroll without changing focus
  setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    const nextItem = items[currentIndex];
    container.scrollTo({
      left: nextItem.offsetLeft - container.offsetLeft,
      behavior: "smooth"
    });
  }, 3000);

  // Mouse drag scroll
  let isDown = false, startX, scrollLeft;
  container.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  container.addEventListener("mouseup", () => isDown = false);
  container.addEventListener("mouseleave", () => isDown = false);
  container.addEventListener("mousemove", e => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    container.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

// sidebar.js 
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  let toggleBtn = document.getElementById("sidebar-toggle");

  // If no toggle button exists, create one dynamically
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "sidebar-toggle";
    toggleBtn.classList.add("sidebar-toggle");
    toggleBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
    document.body.appendChild(toggleBtn);
  }

  if (!sidebar) return;

  const body = document.body;

  function updateIcon() {
    const icon = toggleBtn.querySelector("i");
    if (!icon) return;

    const isMobile = window.innerWidth <= 1023;
    if ((sidebar.classList.contains("collapsed") && !isMobile) || (sidebar.classList.contains("open") && isMobile)) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-arrow-left");
    } else {
      icon.classList.remove("fa-arrow-left");
      icon.classList.add("fa-bars");
    }
  }

  function toggleSidebar() {
    const isMobile = window.innerWidth <= 1023;

    if (isMobile) {
      sidebar.classList.toggle("open");
      body.classList.toggle("sidebar-open");
    } else {
      sidebar.classList.toggle("collapsed");
      body.classList.toggle("sidebar-collapsed");
      toggleBtn.classList.toggle("collapsed");
    }

    updateIcon();
  }

  toggleBtn.addEventListener("click", toggleSidebar);

  // Close mobile sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth > 1023) return;

    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      body.classList.remove("sidebar-open");
      toggleBtn.classList.remove("collapsed");
      updateIcon();
    }
  });

  // Handle window resize: reset classes appropriately
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) {
      sidebar.classList.remove("open");
      body.classList.remove("sidebar-open");
    }
    if (window.innerWidth <= 1023) {
      sidebar.classList.remove("collapsed");
      body.classList.remove("sidebar-collapsed");
      toggleBtn.classList.remove("collapsed");
    }
    updateIcon();
  });

  // Initial icon setup
  updateIcon();
});

  /* =========================================
   SKILLCHAIN NAVBAR INTERACTION SCRIPT
   -----------------------------------------
   Handles:
   1. Moving the animated active indicator
   2. Updating active nav item on click
   3. Setting initial active position on page load
========================================= */


/* Select all navigation items */
const navItems = document.querySelectorAll(".nav-item");

/* Select the animated active indicator element */
const indicator = document.querySelector(".nav-indicator");


/* =========================================
   FUNCTION: moveIndicator
   -----------------------------------------
   Moves the active background indicator
   to match the clicked/active nav item.
========================================= */
function moveIndicator(element) {

  // Get the position and size of the clicked item
  const itemRect = element.getBoundingClientRect();

  // Get the position of the navbar container
  const navRect = element.parentElement.getBoundingClientRect();

  // Set indicator width to match nav item width
  indicator.style.width = itemRect.width + "px";

  // Position indicator horizontally inside navbar
  indicator.style.left = (itemRect.left - navRect.left) + "px";

  // Position indicator vertically (for desktop alignment)
  indicator.style.top = (itemRect.top - navRect.top + 20) + "px";
}


/* =========================================
   EVENT LISTENER: Click on nav item
   -----------------------------------------
   - Removes previous active class
   - Adds active class to clicked item
   - Moves animated indicator
========================================= */
navItems.forEach(item => {

  item.addEventListener("click", function () {

    // Remove active class from current active item
    const currentActive = document.querySelector(".nav-item.active");
    if (currentActive) {
      currentActive.classList.remove("active");
    }

    // Add active class to clicked item
    this.classList.add("active");

    // Move animated indicator
    moveIndicator(this);

  });

});


/* =========================================
   EVENT LISTENER: Page Load
   -----------------------------------------
   Automatically position indicator
   on the nav item that already
   has the "active" class when page loads.
========================================= */
window.addEventListener("load", function () {

  const activeItem = document.querySelector(".nav-item.active");

  if (activeItem) {
    moveIndicator(activeItem);
  }

});