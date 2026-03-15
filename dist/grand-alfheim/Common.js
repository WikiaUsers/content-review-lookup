mw.hook('wikipage.content').add(function () {
	
  // EVENT TIMER
  
  function nowEST(offset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + offset * 3600000);
  }
  function format(ms) {
    const t = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${h}h ${m}m ${s}s`;
  }
  function updateTimer(box) {
    const offset = Number(box.dataset.timezone || -5);
    const now = nowEST(offset);
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const windows = [
      new Date(y, m, d, 0, 0, 0),
      new Date(y, m, d, 6, 0, 0),
      new Date(y, m, d, 12, 0, 0),
      new Date(y, m, d, 18, 0, 0)
    ];
    let start, end;
    for (const w of windows) {
      const e = new Date(w.getTime() + 10 * 60000);
      if (now < e) {
        start = w;
        end = e;
        break;
      }
    }
    if (!start) {
      start = new Date(y, m, d + 1, 0, 0, 0);
      end = new Date(start.getTime() + 10 * 60000);
    }
    const status = box.querySelector('.ga-event-status');
    const countdown = box.querySelector('.ga-event-countdown');
    if (now >= start && now < end) {
      status.textContent = 'Event is Active';
      status.style.color = '#6dff6d';
      status.style.textShadow = '0 0 8px #2aff2a';
      countdown.textContent = 'Time left: ' + format(end - now);
    } else {
      status.textContent = 'Event is Not Active';
      status.style.color = '#ff6d6d';
      status.style.textShadow = '0 0 8px #ff2a2a';
      countdown.textContent = 'Next Opening in: ' + format(start - now);
    }
  }
  document.querySelectorAll('.ga-event-timer').forEach(function (box) {
    updateTimer(box);
    setInterval(function () {
      updateTimer(box);
    }, 1000);
  });

});

// COLLAPSE TOGGLE
(function () {
  'use strict';

  function initCollapses() {
    document.querySelectorAll('.ga-collapse').forEach(function (box) {
      var header = box.querySelector('.ga-collapse-header');
      if (!header || box.dataset.collapseInit) return;
      box.dataset.collapseInit = '1';

      header.addEventListener('click', function () {
        box.classList.toggle('open');
      });
    });
  }

  initCollapses();

  var obs = new MutationObserver(initCollapses);
  obs.observe(document.body, { childList: true, subtree: true });
})();