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

/*scaling*/

(function() {
  function updateFloatingImages() {
    document.querySelectorAll('.sliming img').forEach(function(img) {
      var sliming = img.closest('.sliming');
      var scale = parseFloat(sliming.dataset.scale) || 1;
      if (scale <= 1) return;

      var ghost = img._ghost;
      if (!ghost) {
        ghost = document.createElement('img');
        ghost.src = img.src;
        ghost.style.cssText = 'position:fixed;pointer-events:none;z-index:2;transform-origin:center center;';
        document.body.appendChild(ghost);
        img._ghost = ghost;
        img.style.opacity = '0';
      }

      var rect = img.getBoundingClientRect();
      var w = rect.width * scale;
      var h = rect.height * scale;
      var ox = parseFloat(sliming.dataset.ox) || 0;
      var oy = parseFloat(sliming.dataset.oy) || 0;

      ghost.style.width = w + 'px';
      ghost.style.height = h + 'px';
      ghost.style.left = (rect.left + rect.width / 2 - w / 2 + ox) + 'px';
      ghost.style.top  = (rect.top + rect.height / 2 - h / 2 + oy) + 'px';
    });

    requestAnimationFrame(updateFloatingImages);
  }

  function updateGhostPositions() {
    document.querySelectorAll('.sliming img').forEach(function(img) {
      var ghost = img._ghost;
      if (!ghost) return;
      var sliming = img.closest('.sliming');
      var scale = parseFloat(sliming.dataset.scale) || 1;
      if (scale <= 1) return;

      var rect = img.getBoundingClientRect();
      var w = rect.width * scale;
      var h = rect.height * scale;
      var ox = parseFloat(sliming.dataset.ox) || 0;
      var oy = parseFloat(sliming.dataset.oy) || 0;

      ghost.style.left = (rect.left + rect.width / 2 - w / 2 + ox) + 'px';
      ghost.style.top  = (rect.top + rect.height / 2 - h / 2 + oy) + 'px';
    });
  }

  window.addEventListener('scroll', updateGhostPositions, { passive: true });

  window.addEventListener('load', function() {
    document.querySelectorAll('.sliming').forEach(function(div) {
      var scale = parseFloat(div.dataset.scale) || 1;
      if (scale > 1) {
        var img = div.querySelector('img');
        if (img && img.complete) {
          updateFloatingImages();
        } else if (img) {
          img.addEventListener('load', updateFloatingImages);
        }
      }
    });
  });
})();

/*Slime view*/

(function () {
  function init() {
    function closeAll() {
      document.querySelectorAll('.slime-view').forEach(function(p) { p.remove(); });
      document.querySelectorAll('.slime.active').forEach(function(s) { s.classList.remove('active'); });
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