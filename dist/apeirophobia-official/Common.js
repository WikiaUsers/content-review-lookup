


console.log("JS LOADED");

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('booting');

  const title = document.querySelector('#terminal-title');
  if (title) {
    const text = 'ACCESS GRANTED… WELCOME TO THE OFFICIAL APEIROPHOBIA WIKI';
    let i = 0;

    function type() {
      title.textContent = text.substring(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(type, 40 + Math.random() * 25);
      }
    }

    type();
  }

  const cards = document.querySelectorAll('.terminal-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('boot-visible');
    }, index * 60);
  });
});

document.addEventListener('mouseover', (e) => {
  const card = e.target.closest('.terminal-card');
  if (!card) return;
  card.classList.add('scanning');
});

document.addEventListener('mouseout', (e) => {
  const card = e.target.closest('.terminal-card');
  if (!card) return;
  card.classList.remove('scanning');
});

function pulseRandomCard() {
  const cards = document.querySelectorAll('.terminal-card');
  if (!cards.length) return;

  const target = cards[Math.floor(Math.random() * cards.length)];
  target.classList.add('pulse');

  setTimeout(() => {
    target.classList.remove('pulse');
  }, 600);
}

setInterval(pulseRandomCard, 5000);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.terminal-card').forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes('unknown')) {
      card.classList.add('threat-unknown');
    }

    if (text.includes('hostile') || text.includes('aggressive')) {
      card.classList.add('threat-hostile');
    }

    if (text.includes('active')) {
      card.classList.add('threat-active');
    }

    if (text.includes('critical') || text.includes('extreme')) {
      card.classList.add('threat-critical');
    }
  });
});

document.addEventListener('click', (e) => {
  const card = e.target.closest('.terminal-card');
  if (!card) return;

  const link = card.dataset.link;
  if (!link) return;

  window.location.href = link;
});

const input = document.getElementById('command-input');

if (input) {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.toLowerCase().trim();

      switch (cmd) {
        case '!entities':
          window.location.href = '/wiki/Entities';
          break;
        case '!levels':
          window.location.href = '/wiki/Levels';
          break;
        case '!characters':
          window.location.href = '/wiki/Characters';
          break;
        case '!lore':
          window.location.href = '/wiki/Lore';
          break;
        default:
          alert('Command not recognized.');
      }

      input.value = '';
    }
  });
}
/* Any JavaScript here will be loaded for all users on every page load. */