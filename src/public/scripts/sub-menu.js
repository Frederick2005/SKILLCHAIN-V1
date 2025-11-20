// Open menu
document.getElementById("menu-toggle")?.addEventListener("click", () => {
    document.getElementById("right-side-menu").classList.add("open");
});

// Close menu
document.getElementById("right-close-btn")?.addEventListener("click", () => {
    document.getElementById("right-side-menu").classList.remove("open");
});

// Submenu toggle logic
document.querySelectorAll(".submenu-toggle").forEach(toggle => {
    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        const submenu = toggle.nextElementSibling;
        const arrow = toggle.querySelector(".submenu-arrow");

        submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";

        arrow.classList.toggle("open");
    });
});