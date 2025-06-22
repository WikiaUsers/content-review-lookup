document.querySelectorAll('.gear-icon').forEach(el => {
  el.addEventListener('click', () => {
    const idx = el.getAttribute('data-gear');
    document.querySelectorAll('.gear-desc').forEach(d => d.style.display = 'none');
    const target = document.querySelector('.gear-desc-' + idx);
    if (target) target.style.display = 'block';
  });
});