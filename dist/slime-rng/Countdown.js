$(document).ready(function () {
  var el = document.getElementById('event-countdown');
  if (!el) return;

  var cfg = {
    title:    el.dataset.title        || 'In',
    d:        parseInt(el.dataset.days)          || 0,
    h:        parseInt(el.dataset.hours)         || 0,
    m:        parseInt(el.dataset.minutes)       || 0,
    s:        parseInt(el.dataset.seconds)       || 0,
    dur:      parseInt(el.dataset.eventDuration) || 60,
    evtTxt:   el.dataset.eventText   || 'Event now',
    color:    el.dataset.color        || '#FFFFFF',
    anim:     el.dataset.animation    || 'pulse',
    loop:     el.dataset.loop         === 'true'
  };

  var totalMs = (cfg.d * 86400 + cfg.h * 3600 + cfg.m * 60 + cfg.s) * 1000;
  if (totalMs <= 0) return;

  el.style.textAlign = 'center';

  var lbl = document.createElement('div');
  lbl.textContent = cfg.title;
  lbl.style.cssText = 'font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.6;margin-bottom:6px';

  var num = document.createElement('div');
  num.style.cssText = 'font-size:clamp(28px,6vw,52px);font-weight:500;letter-spacing:.04em;color:' + cfg.color;

  var evt = document.createElement('div');
  evt.textContent = cfg.evtTxt;
  evt.style.cssText = 'font-size:clamp(15px,2.5vw,22px);font-weight:500;color:' + cfg.color + ';display:none';

  el.appendChild(lbl);
  el.appendChild(num);
  el.appendChild(evt);

  var style = document.createElement('style');
  style.textContent =
    '@keyframes fcdPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
    '@keyframes fcdShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-3px)}60%{transform:translateX(3px)}}' +
    '@keyframes fcdBounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}60%{transform:translateY(-4px)}}' +
    '@keyframes fcdStretch{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.07)}}' +
    '@keyframes fcdFlicker{0%,94%,100%{opacity:1}95%{opacity:.15}97%{opacity:.8}99%{opacity:.35}}' +
    '@keyframes fcdSpin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}' +
    '@keyframes fcdType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}' +
    '@keyframes fcdWave{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}' +
    '@keyframes fcdEvt{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}';
  document.head.appendChild(style);

  var animMap = {
    pulse:      'fcdPulse 1s ease-in-out infinite',
    shake:      'fcdShake .6s ease-in-out infinite',
    bounce:     'fcdBounce .8s ease-in-out infinite',
    stretch:    'fcdStretch 1s ease-in-out infinite',
    flicker:    'fcdFlicker 2s linear infinite',
    spin:       'fcdSpin 2s linear infinite',
    type:       'fcdType .4s steps(20,end)',
    wave:       ''
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

  function setNum(txt) {
    if (cfg.anim === 'wave') { renderWave(txt); return; }
    if (num.textContent === txt) return;
    num.textContent = txt;
    if (cfg.anim === 'type') {
      num.style.animation = 'none';
      void num.offsetWidth;
      num.style.animation = 'fcdType .35s steps(20,end)';
    }
  }

  function applyAnim() {
    if (cfg.anim === 'wave' || cfg.anim === 'type') return;
    num.style.animation = 'none';
    void num.offsetWidth;
    num.style.animation = animMap[cfg.anim] || animMap.pulse;
  }

  var endTime = Date.now() + totalMs;
  var evEnd   = endTime + cfg.dur * 60000;
  var phase   = 'countdown';
  var loopAnims = ['pulse','bounce','shake','stretch','flicker','spin','wave','type'];
  var loopIdx = loopAnims.indexOf(cfg.anim);

  applyAnim();

  setInterval(function () {
    var now = Date.now();

    if (phase === 'countdown') {
      var rem = endTime - now;
      if (rem > 0) {
        setNum(fmtMs(rem));
      } else {
        phase = 'event';
        num.style.animation = 'none';
        num.textContent = '';
        evt.style.display = 'block';
        evt.style.animation = 'fcdEvt 1.2s ease-in-out infinite';
      }

    } else if (phase === 'event') {
      var erem = evEnd - now;
      if (erem > 0) {
        num.style.animation = 'none';
        num.textContent = fmtMs(erem) + ' left';
      } else {
        if (cfg.loop) {
          loopIdx = (loopIdx + 1) % loopAnims.length;
          cfg.anim = loopAnims[loopIdx];
          phase = 'countdown';
          endTime = Date.now() + totalMs;
          evEnd = endTime + cfg.dur * 60000;
          evt.style.display = 'none';
          evt.style.animation = 'none';
          applyAnim();
        } else {
          phase = 'done';
          num.style.animation = 'none';
          num.textContent = 'Done';
          evt.style.display = 'none';
        }
      }
    }
  }, 200);
});