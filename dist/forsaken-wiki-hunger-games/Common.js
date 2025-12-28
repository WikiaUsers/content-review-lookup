/* Any JavaScript here will be loaded for all users on every page load. */
// up up down down (improved)
mw.loader.using(['mediawiki.util'], function () {
  const konamiCode = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a'
  ];
  let buffer = [];

  function isTypingInInput(target) {
    const tag = (target && target.tagName) ? target.tagName.toUpperCase() : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (target && target.isContentEditable) return true;
    return false;
  }

  function showToastFallback(message) {
    // Create toast container if it doesn't exist
    let container = document.querySelector('#konami-toast');
    if (!container) {
      container = document.createElement('div');
      container.id = 'konami-toast';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      container.style.maxWidth = '300px';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.background = '#1e1b4b';
    toast.style.color = '#fff';
    toast.style.padding = '12px 20px';
    toast.style.marginTop = '10px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 0 12px rgba(0,0,0,0.5)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';

    container.appendChild(toast);
    // Animate in
    requestAnimationFrame(() => { toast.style.opacity = '1'; });

    // Auto-remove after 4s
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function notify(message) {
    // Use MediaWiki notify if available, else fallback
    if (typeof mw !== 'undefined' && mw.notify) {
      mw.notify(message, { tag: 'konami-code', autoHide: 4000 });
    } else {
      showToastFallback(message);
    }
  }

  function matchesKonami(buf) {
    if (buf.length !== konamiCode.length) return false;
    for (let i = 0; i < konamiCode.length; i++) {
      // compare case-insensitively for letter keys (and arrows still match)
      if (konamiCode[i].toLowerCase() !== buf[i].toLowerCase()) return false;
    }
    return true;
  }

  function keydownHandler(e) {
    if (isTypingInInput(e.target)) return; // ignore typing in inputs

    const key = e.key;
    buffer.push(key);
    if (buffer.length > konamiCode.length) buffer.shift();

    if (matchesKonami(buffer)) {
      notify('🎉 You have unlocked admin powers!');
      buffer = []; // reset
      // If you want to avoid repeated triggers, you could remove the listener here:
      // document.removeEventListener('keydown', keydownHandler);
    }
  }

  document.addEventListener('keydown', keydownHandler, { passive: true });
});