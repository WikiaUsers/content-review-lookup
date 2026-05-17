/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function () {
  var tabScrollPos = 0;

  $(document).on('click', '.wds-tabs__tab', function () {
    tabScrollPos = $('.wds-tabs__content').scrollTop();
    setTimeout(function () {
      $('.wds-tabs__content').scrollTop(tabScrollPos);
    }, 50);
  });
});

/* Confetti */
$(function() {
  let interval;

  function spawnConfetti(box) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = ['#672ec9','#1fa7bf','#de9610','#eb3636','#10b981'][Math.floor(Math.random()*5)];
    c.style.width = (Math.random() * 6 + 6) + 'px';
    c.style.height = (Math.random() * 6 + 6) + 'px';
    box.appendChild(c);
    setTimeout(() => c.remove(), 1200);
  }

  document.querySelectorAll('.rgbb').forEach(box => {
    box.addEventListener('mouseenter', () => {
      interval = setInterval(() => spawnConfetti(box), 50);
    });
    box.addEventListener('mouseleave', () => {
      clearInterval(interval);
      box.querySelectorAll('.confetti-piece').forEach(c => c.remove());
    });
  });
});