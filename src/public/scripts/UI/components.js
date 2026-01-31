// footer drop-down menu
document.querySelectorAll('.footer-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const ul = toggle.nextElementSibling;
      ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    });
  });
  
  // Adding new categories 
  
  document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("lesson-category");
  const newCategoryWrapper = document.getElementById("new-category-wrapper");
  const newCategoryInput = document.getElementById("new-category-input");
  const addCategoryBtn = document.getElementById("add-category-btn");

  // Show input when "Add new category" is selected
  categorySelect.addEventListener("change", () => {
    if (categorySelect.value === "__add_new__") {
      newCategoryWrapper.style.display = "flex";
      newCategoryInput.focus();
    } else {
      newCategoryWrapper.style.display = "none";
      newCategoryInput.value = "";
    }
  });

  // Add new category
  addCategoryBtn.addEventListener("click", () => {
    const newCategory = newCategoryInput.value.trim();

    if (!newCategory) return;

    const value = newCategory.toLowerCase().replace(/\s+/g, "-");

    // Create new option
    const option = document.createElement("option");
    option.value = value;
    option.textContent = newCategory;

    // Insert before "+ Add new category"
    categorySelect.insertBefore(
      option,
      categorySelect.lastElementChild
    );

    // Select it
    categorySelect.value = value;

    // Reset input
    newCategoryInput.value = "";
    newCategoryWrapper.style.display = "none";

    // 🔥 This is where later you will send to DB
    console.log("New category added:", newCategory);
  });
});
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