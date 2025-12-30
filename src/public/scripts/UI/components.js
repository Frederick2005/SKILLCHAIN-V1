

// core.js
// footer drop-down menu
document.querySelectorAll('.footer-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const ul = toggle.nextElementSibling;
      ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    });
  });