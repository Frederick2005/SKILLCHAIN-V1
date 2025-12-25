

// core.js
// footer drop-down menu
document.querySelectorAll('.footer-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const ul = toggle.nextElementSibling;
      ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    });
  });

function initSidebar() {
  const sidebar = document.getElementById("sc-sidebar");
  const openBtn = document.getElementById("sc-sidebar-btn");
  const closeBtn = document.getElementById("sc-close-btn");
  const overlay = document.getElementById("sc-overlay");

  if (!sidebar || !openBtn) return;

  openBtn.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  closeBtn.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };
}console.log("get that")