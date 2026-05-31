/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.getScript('/w/index.php?title=MediaWiki:Countdown.js&action=raw&ctype=text/javascript');


/* Tab scroll position */
$(function() {
  var tabScrollPos = 0;
  $(document).on('click', '.wds-tabs__tab', function() {
    tabScrollPos = $('.wds-tabs__content').scrollTop();
    setTimeout(function() {
      $('.wds-tabs__content').scrollTop(tabScrollPos);
    }, 50);
  });
});

/* Confetti */
$(function() {
  var interval;
  function spawnConfetti(box) {
    var c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = ['#672ec9','#1fa7bf','#de9610','#eb3636','#10b981'][Math.floor(Math.random()*5)];
    c.style.width = (Math.random() * 6 + 6) + 'px';
    c.style.height = (Math.random() * 6 + 6) + 'px';
    box.appendChild(c);
    setTimeout(function() { c.remove(); }, 1200);
  }
  document.querySelectorAll('.rgbb').forEach(function(box) {
    box.addEventListener('mouseenter', function() {
      interval = setInterval(function() { spawnConfetti(box); }, 50);
    });
    box.addEventListener('mouseleave', function() {
      clearInterval(interval);
      box.querySelectorAll('.confetti-piece').forEach(function(c) { c.remove(); });
    });
  });
});

/* Cycle Card */
$(function() {
  $(document).on('click', '.cycle-card', function() {
    var card = this;
    var items = $(card).find('.items-grid-item');
    var current = parseInt($(card).attr('data-current') || '0');
    items.eq(current).css('display', 'none');
    current = (current + 1) % items.length;
    items.eq(current).css('display', 'block');
    $(card).attr('data-current', current);
  });
});

/* Special thing so scroll bar is centered (for the power fruits)*/
mw.hook('wikipage.content').add(function() {
  var el = document.getElementById('scroll');
  if (el) {
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }
});


/* SLIMES PAGE */
var RARITY_THRESHOLDS = [
  { max: 5, name: 'Basic', color: '#FFFFFF' },
  { max: 20, name: 'Common', color: '#a6ff8b' },
  { max: 60, name: 'Uncommon', color: '#98f0be' },
  { max: 450, name: 'Rare', color: '#85d0fb' },
  { max: 2500, name: 'Epic', color: '#ba85ff' },
  { max: 15000, name: 'Legendary', color: '#ffac7b' },
  { max: 60000, name: 'Mythic', color: '#ff87bf' },
  { max: 500000, name: 'Divine', color: '#fee989' },
  { max: 4000000, name: 'Prismatic', color: '#5dfbcb' },
  { max: 25000000, name: 'Transcendent', color: '#e084ff' },
  { max: 250000000, name: 'Ethereal', color: '#aadeff' },
  { max: 4000000000, name: 'Secret', color: '#ff4a4a' },
  { max: 50000000000, name: 'Celestial', color: '#b6e8ff' },
  { max: 500000000000, name: 'Astral', color: '#4189e0' },
  { max: 7000000000000, name: 'Nova', color: '#db88d3' },
  { max: 75000000000000, name: 'Solar', color: '#f5c842' },
  { max: 700000000000000, name: 'Lunar', color: '#9098de' },
  { max: 10000000000000000, name: 'Galactic', color: '#644b99' },
  { max: 100000000000000000, name: 'Stellar', color: '#54f4e0' },
  { max: 1000000000000000000, name: 'Nebula', color: '#5d3772' },
  { max: 10000000000000000000, name: 'Quantum', color: '#24d494' },
  { max: 100000000000000000000, name: 'Void', color: '#352f5a' },
  { max: 1000000000000000000000, name: 'Paradox', color: '#cc5b57' },
];

function getRarityFromChance(chance) {
  for (var i = 0; i < RARITY_THRESHOLDS.length; i++) {
    if (chance <= RARITY_THRESHOLDS[i].max) return RARITY_THRESHOLDS[i];
  }
  return RARITY_THRESHOLDS[RARITY_THRESHOLDS.length - 1];
}

function parseStat(str) {
  str = str.trim();
  var mult = 1;
  var lower = str.toLowerCase();
  if (lower.endsWith('k')) { mult = 1e3; str = str.slice(0,-1) }
  else if (lower.endsWith('m')) { mult = 1e6; str = str.slice(0,-1); }
  else if (lower.endsWith('b')) { mult = 1e9; str = str.slice(0,-1); }
  else if (lower.endsWith('t')) { mult = 1e12; str = str.slice(0,-1); }
  else if (lower.endsWith('qd')) { mult = 1e15; str = str.slice(0,-1); }
  else if (lower.endsWith('qn')) { mult = 1e18; str = str.slice(0,-1); }
  else if (lower.endsWith('sx')) { mult = 1e21; str = str.slice(0,-1); }

  return parseFloat(str) * mult;
}

function formatStat(n) {
  function clean(x) { return parseFloat(x.toFixed(2)).toString(); }
  if (n >= 1e21) return clean(n / 1e21) + 'Sx';
  if (n >= 1e18) return clean(n / 1e18) + 'Qn';
  if (n >= 1e15) return clean(n / 1e15) + 'Qd';
  if (n >= 1e12) return clean(n / 1e12) + 'T';
  if (n >= 1e9)  return clean(n / 1e9) + 'B';
  if (n >= 1e6)  return clean(n / 1e6) + 'M';
  if (n >= 1e3)  return clean(n / 1e3) + 'K';
  return clean(n);
}

function drawSparkle(ctx, x, y, size, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(size * 0.15, -size * 0.15, size, 0);
  ctx.quadraticCurveTo(size * 0.15, size * 0.15, 0, size);
  ctx.quadraticCurveTo(-size * 0.15, size * 0.15, -size, 0);
  ctx.quadraticCurveTo(-size * 0.15, -size * 0.15, 0, -size);
  ctx.fill();

  ctx.restore();
}

(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  var allStars = [];
  const STAR_COUNT = 4;

  function initStars(img) {
    const rect = img.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const stars = [];
    var positions = [
    { rx: 0.25, ry: 0.25 },
    { rx: 0.70, ry: 0.25 },
    { rx: 0.6, ry: 0.7 },
    { rx: 0.15, ry: 0.75 }
   ];
    for (var i = 0; i < STAR_COUNT; i++) {
      var sizeBase = (Math.random() * 0.06 + 0.04) * Math.min(w, h);
      stars.push({
        rx: positions[i].rx,
        ry: positions[i].ry,
        size: sizeBase,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005
      });
    }
    return { img: img, stars: stars };
  }

  function setup() {
    var targets = Array.from(document.querySelectorAll('img.shiny'))
      .concat(Array.from(document.querySelectorAll('.shiny img')))
      .concat(Array.from(document.querySelectorAll('.slime-inside.shiny img')));

    targets.forEach(function(img) {
      if (img.dataset.starsInit) return;
      img.dataset.starsInit = '1';
      if (img.complete && img.naturalWidth > 0) {
        allStars.push(initStars(img));
      } else {
        img.addEventListener('load', function() { allStars.push(initStars(img)); });
      }
    });
  }

  function removeStars(img) {
    allStars = allStars.filter(function(e) { return e.img !== img; });
    delete img.dataset.starsInit;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allStars.forEach(function(entry) {
      const img = entry.img;
      const rect = img.getBoundingClientRect();

      entry.stars.forEach(function(s) {
        const x = rect.left + s.rx * rect.width;
        const y = rect.top + s.ry * rect.height;
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.001 * s.speed * 30 + s.phase));
        drawSparkle(ctx, x, y, s.size, alpha);
      });
    });
    requestAnimationFrame(draw);
  }

  window.starsSetup = setup;
  window.starsRemove = removeStars;
  window.allStars = allStars;

  window.addEventListener('load', function() {
    setup();
    resizeCanvas();
    requestAnimationFrame(draw);
  });
})();


/*Slime view*/

(function () {
  function init() {
    function closeAll() {
      document.querySelectorAll('.slime-view').forEach(function(p) { p.remove(); });
      document.querySelectorAll('.slime.active').forEach(function(s) { s.classList.remove('active'); });
      var previewImg = document.querySelector('.slime-inside img');
      if (previewImg && window.starsRemove) window.starsRemove(previewImg);
    }

    document.querySelectorAll('#slime-grid .slime').forEach(function(slime) {
      slime.style.cursor = 'pointer';
      slime.addEventListener('click', function () {
        const grid = this.parentElement;
        const allSlimes = Array.from(grid.querySelectorAll('#slime-grid .slime'));
        const cols = 5;

        if (this.classList.contains('active')) {
          closeAll();
          return;
        }

        closeAll();
        this.classList.add('active');

        const index = allSlimes.indexOf(this);
        const firstInRow = allSlimes[Math.floor(index / cols) * cols];

        const panel = document.createElement('div');
        panel.className = 'slime-view open';
        panel.style.minHeight = this.offsetHeight + 'px';

        const content = this.querySelector('.slime-content');
        if (content) panel.innerHTML = content.innerHTML;

        firstInRow.insertAdjacentElement('beforebegin', panel);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/*Fixing bouncing animation*/
document.querySelectorAll('.slime').forEach(function(box) {
  box.addEventListener('mouseenter', function() {
    const el = box.querySelector('.sliming');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'slimed 4000ms ease-out forwards';
  });
});

/* Mutationning */
document.addEventListener('click', function(e) {
  if (!e.target.matches('.mutsel')) return;
  if (e.target.classList.contains('no')) return;

  const panel = e.target.closest('.slime-view');
  if (!panel) return;

  const activeSlime = document.querySelector('.slime.active');
  if (!activeSlime) return;

  const sliming = panel.querySelector('.slime-inside');
  const previewImg = sliming ? sliming.querySelector('img') : null;

  const filterMap = {
    'BIG': 'big',
    'HUGE': 'huge',
    'Shiny': 'shiny',
    'Inverted': 'inverted'
  };

  const cls = filterMap[e.target.textContent.trim()];
  if (!cls) return;

  const isActive = e.target.classList.toggle('active');
  sliming.classList.toggle(cls, isActive);

  if (cls === 'shiny') {
    if (previewImg) {
      if (isActive) {
        delete previewImg.dataset.starsInit;
        if (window.starsSetup) window.starsSetup();
      } else {
        if (window.starsRemove) window.starsRemove(previewImg);
      }
    }
  }

  if (cls === 'big' || cls === 'huge') {
    if (previewImg) {
      if (cls === 'big') previewImg.style.transform = isActive ? 'scale(1.5)' : '';
      if (cls === 'huge') previewImg.style.transform = isActive ? 'scale(2)' : '';
    }
    if (previewImg && window.starsRemove && window.starsSetup) {
      window.starsRemove(previewImg);
      setTimeout(function() {
        if (sliming.classList.contains('shiny')) {
          window.starsSetup();
        }
      }, 50);
    }
  }

  const bigBtn = Array.from(panel.querySelectorAll('.mutsel')).find(function(b) { return b.textContent.trim() === 'BIG'; });
  const hugeBtn = Array.from(panel.querySelectorAll('.mutsel')).find(function(b) { return b.textContent.trim() === 'HUGE'; });

  if (bigBtn && hugeBtn) {
    if (bigBtn.classList.contains('active')) {
      hugeBtn.classList.add('no');
    } else {
      hugeBtn.classList.remove('no');
    }
    if (hugeBtn.classList.contains('active')) {
      bigBtn.classList.add('no');
    } else {
      bigBtn.classList.remove('no');
    }
  }

  var titleDiv = panel.querySelector('.slime-title');
  if (titleDiv) {
    var baseName = activeSlime.querySelector('.slime-base-name');
    var base = baseName ? baseName.textContent.trim() : '';
    var rarityText = activeSlime.querySelector('.slime-rarity');
    var rare = rarityText ? rarityText.textContent.trim() : '';
    var order = ['Shiny', 'Big', 'Huge', 'Inverted'];
    var activeClasses = order.filter(function(c) { return sliming.classList.contains(c.toLowerCase()); });
    var parts = activeClasses.length > 0 ? activeClasses.join(' ') + ' ' + base : base;
    titleDiv.textContent = parts + (rare ? ' - ' + rare : '');
  }

  var baseAtk = parseStat(activeSlime.querySelector('.slime-base-atk').textContent);
  var baseHp = parseStat(activeSlime.querySelector('.slime-base-hp').textContent);

  var multiplier = 1;
  if (sliming.classList.contains('big')) multiplier *= 4;
  if (sliming.classList.contains('huge')) multiplier *= 10;
  if (sliming.classList.contains('shiny')) multiplier *= 6;
  if (sliming.classList.contains('inverted')) multiplier *= 13;

  var atkDiv = panel.querySelector('.slime-stat-atk');
  var hpDiv = panel.querySelector('.slime-stat-hp');
  if (atkDiv) atkDiv.textContent = formatStat(baseAtk * multiplier);
  if (hpDiv) hpDiv.textContent = formatStat(baseHp * multiplier);

  function parseChance(str) {
    var parts = str.split('/');
    if (parts.length < 2) return parseStat(str);
    return parseStat(parts[1].trim());
  }

  var baseChance = parseChance(activeSlime.querySelector('.slime-base-chance').textContent);
  var chanceMult = 1;
  if (sliming.classList.contains('big')) chanceMult *= 100;
  if (sliming.classList.contains('huge')) chanceMult *= 1000;
  if (sliming.classList.contains('shiny')) chanceMult *= 250;
  if (sliming.classList.contains('inverted')) chanceMult *= 2500;

  var chanceDiv = panel.querySelector('.slime-stat-chance');
  if (chanceDiv) chanceDiv.textContent = '1 / ' + formatStat(baseChance * chanceMult);

  var rarity = getRarityFromChance(baseChance * chanceMult);

  var rarityBtn = panel.querySelector('.change-color');
  if (rarityBtn) {
    rarityBtn.textContent = rarity.name;
    rarityBtn.style.color = rarity.color;
    rarityBtn.style.borderColor = rarity.color;
  }

  var titleRarity = panel.querySelector('.slime-title');
  if (titleRarity) titleRarity.style.color = rarity.color;

  var changeRarity = panel.querySelector('.change-rarity');
  if (changeRarity) {
    changeRarity.textContent = rarity.name;
    changeRarity.style.color = rarity.color;
    changeRarity.style.borderColor = rarity.color;
  }

  var chanceDisplay = panel.querySelector('.box-rarity');
  if (chanceDisplay) chanceDisplay.style.background = rarity.color;

  var lvlEl = panel.querySelector('.text-lvl');
  if (lvlEl) updateStats(lvlEl);
});

/*level*/
document.addEventListener('click', function(e) {
  var isNext = e.target.matches('.panel-switch-btn');
  var isPrev = e.target.matches('.panel-switch-btnr');
  if (!isNext && !isPrev) return;

  const panel = e.target.closest('.slime-view');
  if (!panel) return;
  const slider = panel.querySelector('.panel-slider');
  if (!slider) return;

  slider.classList.toggle('show-level');
});

document.addEventListener('input', function(e) {
  if (!e.target.matches('.text-lvl')) return;
  
  var val = e.target.textContent.replace(/[^0-9]/g, '');
  if (val === '') val = '1';
  if (parseInt(val) < 1) val = '1';
  e.target.textContent = val;
  
  var range = document.createRange();
  var sel = window.getSelection();
  range.selectNodeContents(e.target);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);

  updateStats(e.target);
});

function updateStats(levelEl) {
  const panel = levelEl.closest('.slime-view');
  if (!panel) return;
  const activeSlime = document.querySelector('.slime.active');
  if (!activeSlime) return;

  var level = parseInt(levelEl.textContent) || 1;
  var sliming = panel.querySelector('.slime-inside');

  var baseAtk = parseStat(activeSlime.querySelector('.slime-base-atk').textContent);
  var baseHp = parseStat(activeSlime.querySelector('.slime-base-hp').textContent);

  var mutMultAtk = 1;
  var mutMultHp = 1;
  if (sliming.classList.contains('big')) { mutMultAtk *= 4; mutMultHp *= 4; }
  if (sliming.classList.contains('huge')) { mutMultAtk *= 10; mutMultHp *= 10; }
  if (sliming.classList.contains('shiny')) { mutMultAtk *= 6; mutMultHp *= 6; }
  if (sliming.classList.contains('inverted')) { mutMultAtk *= 13; mutMultHp *= 13; }

  var atk = Math.round((baseAtk / 10) * (9 + level) * mutMultAtk);
  var hp  = Math.round((baseHp  / 10) * (9 + level) * mutMultHp);

  var atkDiv = panel.querySelector('.slime-stat-atk');
  var hpDiv  = panel.querySelector('.slime-stat-hp');
  if (atkDiv) atkDiv.textContent = formatStat(atk);
  if (hpDiv)  hpDiv.textContent  = formatStat(hp);
}

document.addEventListener('click', function(e) {
  var isAdd = e.target.matches('.add-lvl');
  var isRemove = e.target.matches('.remove-lvl');
  if (!isAdd && !isRemove) return;

  const panel = e.target.closest('.slime-view');
  if (!panel) return;

  var lvlEl = panel.querySelector('.text-lvl');
  if (!lvlEl) return;

  var level = parseInt(lvlEl.textContent) || 1;
  if (isAdd) level = level + 1;
  if (isRemove) {
  if (level <= 1) {
    lvlEl.classList.remove('shake-red');
    lvlEl.offsetHeight;
    lvlEl.classList.add('shake-red');
    lvlEl.addEventListener('animationend', function() {
      lvlEl.classList.remove('shake-red');
    }, { once: true });
    return;
  }
  level = level - 1;
}
  lvlEl.textContent = level;

  updateStats(lvlEl);
});

/* END OF SLIMES PAGE */

/*Clickable box*/
document.querySelectorAll('[data-url]').forEach(function(box) {
    box.style.cursor = 'pointer';
    box.addEventListener('click', function() {
        window.open(this.dataset.url, '_blank');
    });
});


/*Countdown*/
$(function () {
  mw.hook('wikipage.content').add(function () {
    var el = document.getElementById('event-countdown');
    if (!el) return;

    function parseMmSs(val) {
      var str = String(val || '0');
      var parts = str.split('.');
      var mins = parseInt(parts[0]) || 0;
      var secs = parseInt(parts[1]) || 0;
      return (mins * 60 + secs) * 1000;
    }

    var cfg = {
      title:    el.dataset.title      || 'In',
      titleUrl: el.dataset.titleUrl   || '',
      target:   el.dataset.target     || '',
      dur:      parseMmSs(el.dataset.eventDuration),
      evtTxt:   el.dataset.eventText  || 'Event now',
      color:    el.dataset.color      || '#FFFFFF',
      anim:     el.dataset.animation  || 'pulse',
      loop:     el.dataset.loop       === 'true',
      loopMs:   parseMmSs(el.dataset.loopMinutes)
    };

    if (!cfg.dur) cfg.dur = 60000;
    if (!cfg.loopMs && cfg.loop) cfg.loopMs = 3600000;

    var endTime = cfg.target ? new Date(cfg.target).getTime() : 0;
    if (!endTime || isNaN(endTime)) return;
    var evEnd = endTime + cfg.dur;
    var now = Date.now();
    var loopMs = cfg.loopMs;
    var phase;

    if (now < endTime) {
      phase = 'countdown';
    } else if (now < evEnd) {
      phase = 'event';
    } else if (cfg.loop && loopMs > 0) {
      var cycleMs = cfg.dur + loopMs;
      var elapsed = (now - endTime) % cycleMs;
      if (elapsed < cfg.dur) {
        phase = 'event';
        endTime = now - elapsed;
        evEnd = endTime + cfg.dur;
      } else {
        phase = 'countdown';
        endTime = now - elapsed + cycleMs;
        evEnd = endTime + cfg.dur;
      }
    } else {
      phase = 'done';
    }

    el.style.textAlign = 'center';

    var lbl = document.createElement(cfg.titleUrl ? 'a' : 'div');
    lbl.textContent = cfg.title;
    if (cfg.titleUrl) {
      lbl.href = cfg.titleUrl;
      lbl.style.textDecoration = 'none';
    }
    lbl.style.cssText += 'font-weight:bold;font-size:20px;text-align:center;color:#a78bfa;margin-bottom:16px;display:block';

    var num = document.createElement('div');
    num.style.cssText = 'font-size:clamp(28px,6vw,52px);font-weight:500;letter-spacing:.04em;color:' + cfg.color;

    el.appendChild(lbl);
    el.appendChild(num);

    var style = document.createElement('style');
    style.textContent =
      '@keyframes fcdPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
      '@keyframes fcdShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-3px)}60%{transform:translateX(3px)}}' +
      '@keyframes fcdBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}60%{transform:translateY(-4px)}}' +
      '@keyframes fcdStretch{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.07)}}' +
      '@keyframes fcdFlicker{0%,94%,100%{opacity:1}95%{opacity:.15}97%{opacity:.8}99%{opacity:.35}}' +
      '@keyframes fcdSpin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}' +
      '@keyframes fcdType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}' +
      '@keyframes fcdWave{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}';
    document.head.appendChild(style);

    var animMap = {
      pulse:   'fcdPulse 1s ease-in-out infinite',
      shake:   'fcdShake .6s ease-in-out infinite',
      bounce:  'fcdBounce .8s ease-in-out infinite',
      stretch: 'fcdStretch 1s ease-in-out infinite',
      flicker: 'fcdFlicker 2s linear infinite',
      spin:    'fcdSpin 2s linear infinite',
      type:    '',
      wave:    ''
    };

    function fmtMs(ms) {
      if (ms <= 0) return '0s';
      var t = Math.floor(ms / 1000);
      var d = Math.floor(t / 86400); t %= 86400;
      var h = Math.floor(t / 3600);  t %= 3600;
      var m = Math.floor(t / 60);    t %= 60;
      var parts = [];
      if (d > 0) parts.push(d + 'd');
      if (h > 0) parts.push(h + 'h');
      if (m > 0) parts.push(m + 'm');
      if (t > 0 || parts.length === 0) parts.push(t + 's');
      return parts.join(' ');
    }

    function renderWave(txt) {
      num.style.animation = 'none';
      num.innerHTML = txt.split('').map(function (ch, i) {
        if (ch === ' ') return '<span style="display:inline-block;width:.3em">&nbsp;</span>';
        return '<span style="display:inline-block;animation:fcdWave 1s ease-in-out ' + (i * .09).toFixed(2) + 's infinite;color:' + cfg.color + '">' + ch + '</span>';
      }).join('');
    }

    var animApplied = false;
    function applyAnim() {
      if (animApplied) return;
      animApplied = true;
      if (cfg.anim === 'wave' || cfg.anim === 'type') return;
      num.style.animation = 'none';
      void num.offsetWidth;
      num.style.animation = animMap[cfg.anim] || animMap.pulse;
    }

    function resetAnim() {
      animApplied = false;
    }

    function setNum(txt) {
      if (cfg.anim === 'wave') { renderWave(txt); return; }
      if (cfg.anim === 'type') {
        if (num.textContent === txt) return;
        num.textContent = txt;
        num.style.animation = 'none';
        void num.offsetWidth;
        num.style.animation = 'fcdType .35s steps(20,end)';
        return;
      }
      num.textContent = txt;
    }

    var loopAnims = ['pulse','bounce','shake','stretch','flicker','spin','wave','type'];
    var loopIdx = loopAnims.indexOf(cfg.anim);

    function enterEvent() {
      phase = 'event';
      resetAnim();
      lbl.textContent = cfg.evtTxt;
      applyAnim();
      el.classList.remove('fcd-countdown');
      el.classList.add('fcd-event');
    }

    function enterCountdown() {
      phase = 'countdown';
      resetAnim();
      lbl.textContent = cfg.title;
      applyAnim();
      el.classList.remove('fcd-event');
      el.classList.add('fcd-countdown');
    }

    function enterDone() {
      phase = 'done';
      num.style.animation = 'none';
      num.textContent = 'Done';
      lbl.textContent = cfg.title;
      el.classList.remove('fcd-event', 'fcd-countdown');
      el.classList.add('fcd-done');
    }

    el.classList.add('fcd-' + phase);
    if (phase === 'event') enterEvent();
    else if (phase === 'done') enterDone();
    else { applyAnim(); }

    setInterval(function () {
      var now = Date.now();
      if (phase === 'countdown') {
        var rem = endTime - now;
        if (rem > 0) {
          setNum(fmtMs(rem));
        } else {
          enterEvent();
        }
      } else if (phase === 'event') {
        var erem = evEnd - now;
        if (erem > 0) {
          num.textContent = fmtMs(erem) + '';
        } else {
          if (cfg.loop && loopMs > 0) {
            loopIdx = (loopIdx + 1) % loopAnims.length;
            cfg.anim = loopAnims[loopIdx];
            endTime = Date.now() + loopMs;
            evEnd = endTime + cfg.dur;
            enterCountdown();
          } else {
            enterDone();
          }
        }
      }
    }, 200);
  });
});