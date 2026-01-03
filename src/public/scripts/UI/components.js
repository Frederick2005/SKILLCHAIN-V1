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