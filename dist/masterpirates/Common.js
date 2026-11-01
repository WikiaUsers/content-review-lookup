/* Any JavaScript here will be loaded for all users on every page load. */

(function () {
  'use strict';

  var CONFIG = {
    scrollReveal: true,
    tabFade: true,
    backToTop: true
  };

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1) Scroll reveal ---------- */
  function initReveal(root) {
    if (!CONFIG.scrollReveal || reduceMotion || !('IntersectionObserver' in window)) return;

    var targets = root.querySelectorAll('.mpw-box, .mpw-nav-img, .mpw-game');
    if (!targets.length) return;

    /* สูตรปรับตามจำนวนชิ้นในกลุ่มเดียวกัน (กลุ่ม = ชิ้นที่อยู่ใน parent เดียวกัน)
       - ชิ้นน้อย (1–3): ช้า นุ่ม  → ห่าง ~140ms, ใช้เวลาเล่น 700ms
       - ปานกลาง (4–8): ห่าง ~600/n ms, 550ms
       - เยอะ (9+): ถี่ขึ้น ขั้นต่ำ 25ms, 400ms
       ทั้งกลุ่มจบภายในประมาณ 600ms เสมอ */
    function stepFor(n) {
      return Math.max(25, Math.min(140, 600 / n));
    }
    function durFor(n) {
      return n <= 3 ? 700 : (n <= 8 ? 550 : 400);
    }

    var io = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) {
        return entry.isIntersecting;
      });
      // เรียงตามตำแหน่ง: บนลงล่าง แล้วซ้ายไปขวา
      visible.sort(function (a, b) {
        var ra = a.target.getBoundingClientRect();
        var rb = b.target.getBoundingClientRect();
        var rowA = Math.round(ra.top / 24);
        var rowB = Math.round(rb.top / 24);
        return rowA !== rowB ? rowA - rowB : ra.left - rb.left;
      });

      // แบ่งกลุ่มตาม parent (รักษาลำดับที่เรียงแล้ว)
      var groups = [];
      visible.forEach(function (entry) {
        var parent = entry.target.parentNode;
        var g = null;
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].parent === parent) { g = groups[i]; break; }
        }
        if (!g) { g = { parent: parent, items: [] }; groups.push(g); }
        g.items.push(entry.target);
      });

      var offset = 0;
      groups.forEach(function (g) {
        var n = g.items.length;
        var step = stepFor(n);
        var dur = durFor(n);
        g.items.forEach(function (el, k) {
          el.style.setProperty('--mpw-delay', Math.round(offset + k * step) + 'ms');
          el.style.setProperty('--mpw-dur', dur + 'ms');
          el.classList.add('mpw-in');
          io.unobserve(el);
        });
        // กลุ่มถัดไปเริ่มเมื่อกลุ่มนี้เล่นไปราวครึ่งทาง (ไม่เกิน 400ms)
        offset = Math.min(offset + n * step * 0.4, 400);
      });
    }, { threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) {
      if (el.getAttribute('data-mpw-reveal')) return;
      el.setAttribute('data-mpw-reveal', '1');
      el.classList.add('mpw-reveal');
      io.observe(el);
    });
  }

  /* ---------- 2) Tab fade ---------- */
  function initTabFade() {
    if (!CONFIG.tabFade || reduceMotion) return;
    document.addEventListener('click', function (e) {
      var tab = e.target.closest && e.target.closest('.tabber .wds-tabs__tab');
      if (!tab) return;
      setTimeout(function () {
        var panel = document.querySelector('.tabber .wds-tab__content.wds-is-current');
        if (!panel) return;
        panel.classList.remove('mpw-tabfade');
        void panel.offsetWidth; // รีสตาร์ทแอนิเมชัน
        panel.classList.add('mpw-tabfade');
      }, 0);
    });
  }

  /* ---------- 3) Back to top ---------- */
  function initBackToTop() {
    if (!CONFIG.backToTop || document.getElementById('mpw-top')) return;
    var btn = document.createElement('button');
    btn.id = 'mpw-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Back to top');
    btn.textContent = '▲';
    document.body.appendChild(btn);

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        btn.classList.toggle('mpw-top-show', window.pageYOffset > 450);
        ticking = false;
      });
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- เริ่มทำงาน ---------- */
  function start(root) {
    initReveal(root || document);
  }

  initTabFade();
  initBackToTop();

  if (window.mw && mw.hook) {
    mw.hook('wikipage.content').add(function ($content) {
      start($content && $content[0] ? $content[0] : document);
    });
  } else {
    start(document);
  }
})();