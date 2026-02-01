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