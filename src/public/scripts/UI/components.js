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

// sidebar.js - harmonized version
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