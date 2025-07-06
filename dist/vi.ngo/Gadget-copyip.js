document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.copy-ip').forEach(function (el) {
    const ip = el.dataset.ip;
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.marginLeft = '6px';
    button.style.cursor = 'pointer';
    button.onclick = function () {
      navigator.clipboard.writeText(ip).then(function () {
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 1200);
      });
    };
    el.appendChild(button);
  });
});