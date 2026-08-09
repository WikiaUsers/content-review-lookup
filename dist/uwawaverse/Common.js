/* ==========================================================================
   UWAWAVERSE INTERACTIVE COCKPIT / TERMINAL JS SUITE
   ========================================================================== */
   /* ==========================================================================
   UWAWAVERSE DEEP SPACE ORBITAL MODULE (WARP DRIVE, PLASMA & SOLAR GAUGES)
   ========================================================================== */
/* ==========================================================================
   UWAWAVERSE FULL AVIONICS FLIGHT DECK (ASI, VSI, ALTIMETER & AOA INDEXER)
   ========================================================================== */
   /* ==========================================================================
   UWAWAVERSE MK. INFINITY COCKPIT (THROTTLE, PITCH LADDER & EJECT)
   ========================================================================== */
/* ==========================================================================
   UWAWAVERSE CATHODE CONTROL PANEL (CRT SCANLINES, DEGAUSS & TOGGLE SWITCHES)
   ========================================================================== */
/* ==========================================================================
   UWAWAVERSE HUD ADJUSTER & MINIMIZER (INSTANT RETRY LOADER)
   ========================================================================== */

(function () {
  'use strict';

  function applyHUDAdjustments() {
    // 1. Reposition Luffy Gauge to Middle-Right
    const luffy = document.getElementById('hud-luffy-gauge');
    if (luffy) {
      luffy.style.top = '50%';
      luffy.style.bottom = 'auto';
      luffy.style.right = '25px';
      luffy.style.left = 'auto';
      luffy.style.transform = 'translateY(-50%)';
    }

    // 2. Target ALL panels (including bottom submarine console)
    const panelSelectors = [
      '#hud-cathode-panel',
      '#hud-avionics-suite',
      '#hud-analog-dashboard',
      '#hud-space-widget',
      '#hud-depth-widget',
      '#hud-luffy-gauge',
      '#sub-flight-console',
      '.sub-console-bottom'
    ];

    panelSelectors.forEach((selector) => {
      const panel = document.querySelector(selector);
      if (!panel || panel.dataset.minimizable === 'true') return;

      panel.dataset.minimizable = 'true';
      panel.style.transition = 'all 0.3s ease';

      const minBtn = document.createElement('div');
      minBtn.innerHTML = '–';
      minBtn.title = 'Minimize Panel';
      minBtn.style.cssText = `
        position: absolute; top: 6px; right: 8px;
        width: 14px; height: 14px; background: rgba(0, 255, 102, 0.2);
        border: 1px solid #00ff66; color: #00ff66; font-family: monospace;
        font-size: 11px; font-weight: bold; line-height: 12px;
        text-align: center; cursor: pointer; border-radius: 2px;
        z-index: 999999; user-select: none;
      `;

      let isMinimized = false;

      minBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMinimized = !isMinimized;

        Array.from(panel.children).forEach((child) => {
          if (child !== minBtn) child.style.display = isMinimized ? 'none' : '';
        });

        if (isMinimized) {
          panel.dataset.prevPadding = panel.style.padding;
          panel.style.padding = '4px 28px 4px 12px';
          panel.style.minHeight = '24px';
          panel.style.height = 'auto';
          minBtn.innerHTML = '+';
        } else {
          panel.style.padding = panel.dataset.prevPadding || '';
          minBtn.innerHTML = '–';
        }
      });

      if (getComputedStyle(panel).position === 'static') {
        panel.style.position = 'relative';
      }
      panel.appendChild(minBtn);
    });
  }

  // Poll every 500ms so it catches elements the exact millisecond they render
  const hudInterval = setInterval(() => {
    applyHUDAdjustments();
  }, 500);

  // Stop polling after 10 seconds to save performance
  setTimeout(() => clearInterval(hudInterval), 10000);

})();

})();

})();
(function () {
  'use strict';

  // --- 1. LUFFY PRECISION ANALOG AIRCRAFT GAUGE ---
  function initLuffyGauge() {
    if (document.getElementById('hud-luffy-gauge')) return;

    const gauge = document.createElement('div');
    gauge.id = 'hud-luffy-gauge';
    gauge.style.cssText = `
      position: fixed; Top: 13px; right: 13px;
      width: 130px; height: 130px; border-radius: 50%;
      background: #020b05; border: 3px solid #00ff66;
      box-shadow: 0 0 15px rgba(0,255,102,0.4), inset 0 0 15px rgba(0,0,0,0.9);
      z-index: 999998; font-family: monospace; pointer-events: auto;
      user-select: none;
    `;

    gauge.innerHTML = `
      <!-- CAT EARS HOUSING DESIGN -->
      <div style="position:absolute; top:-12px; left:12px; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:16px solid #00ff66;"></div>
      <div style="position:absolute; top:-12px; right:12px; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:16px solid #00ff66;"></div>

      <!-- GAUGE LABELS -->
      <div style="position:absolute; top:20px; width:100%; text-align:center; color:#00ff66; font-size:8px; font-weight:bold; letter-spacing:1px;">
        LUFFY CADWELL
      </div>
      <div style="position:absolute; top:32px; width:100%; text-align:center; color:#00ff66; font-size:7px; opacity:0.8;">
        CATNIP PSI
      </div>

      <!-- ANALOG TICK MARKS -->
      <div style="position:absolute; top:50%; left:50%; width:100px; height:100px; transform:translate(-50%,-50%);">
        <span style="position:absolute; top:12px; left:18px; color:#00ff66; font-size:7px;">0</span>
        <span style="position:absolute; top:2px; left:46px; color:#00ff66; font-size:7px;">50</span>
        <span style="position:absolute; top:12px; right:14px; color:#ff3300; font-size:7px;">100</span>
      </div>

      <!-- SUB-DIALS -->
      <div style="position:absolute; bottom:25px; left:25px; width:28px; height:28px; border-radius:50%; border:1px solid #00ff66; text-align:center;">
        <div style="font-size:5px; color:#00ff66; margin-top:5px;">FLUFF</div>
        <div style="font-size:6px; color:#00ff66; font-weight:bold;">MAX</div>
      </div>
      <div style="position:absolute; bottom:25px; right:25px; width:28px; height:28px; border-radius:50%; border:1px solid #00ff66; text-align:center;">
        <div style="font-size:5px; color:#00ff66; margin-top:5px;">PURR</div>
        <div style="font-size:6px; color:#00ff66; font-weight:bold;">100%</div>
      </div>

      <!-- NEEDLE PIN & POINTER -->
      <div id="luffy-needle" style="position:absolute; top:50%; left:50%; width:2px; height:42px; background:#ff3300; transform-origin: bottom center; transform: translate(-50%, -100%) rotate(-60deg); transition: transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1.2); box-shadow:0 0 6px #ff3300;"></div>
      <div style="position:absolute; top:50%; left:50%; width:10px; height:10px; background:#00ff66; border-radius:50%; transform:translate(-50%,-50%); box-shadow:0 0 8px #00ff66;"></div>

      <!-- OVERDRIVE ALERT LIGHT -->
      <div id="catnip-alert" style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); font-size:6px; color:#002200; background:#00ff66; padding:1px 4px; border-radius:2px; font-weight:bold;">
        STABLE
      </div>
    `;

    document.body.appendChild(gauge);

    // Mouse velocity affects needle deflection!
    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
      const speed = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      lastX = e.clientX;
      lastY = e.clientY;

      const angle = Math.min(60, -60 + speed * 2.2);
      const needle = document.getElementById('luffy-needle');
      const alert = document.getElementById('catnip-alert');

      if (needle) needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
      
      if (alert) {
        if (angle > 30) {
          alert.style.background = '#ff3300';
          alert.style.color = '#ffffff';
          alert.textContent = 'OVERDRIVE!';
        } else {
          alert.style.background = '#00ff66';
          alert.style.color = '#002200';
          alert.textContent = 'STABLE';
        }
      }
    });

    // Click gauge for Meow Sonar trigger
    gauge.addEventListener('click', triggerLuffySonar);
  }

  // --- 2. MEOW-SONAR RADAR PULSE ('Shift' + 'L') ---
  function triggerLuffySonar() {
    // Visual Sonar Ripple
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: fixed; bottom: 85px; left: 85px;
      width: 10px; height: 10px; border-radius: 50%;
      border: 3px solid #00ff66; transform: translate(-50%, 50%);
      pointer-events: none; z-index: 999999;
      box-shadow: 0 0 15px #00ff66;
      transition: width 0.8s ease-out, height 0.8s ease-out, opacity 0.8s ease-out;
    `;
    document.body.appendChild(wave);

    setTimeout(() => {
      wave.style.width = '1200px';
      wave.style.height = '1200px';
      wave.style.opacity = '0';
    }, 20);

    setTimeout(() => wave.remove(), 850);

    // Audio Chirp
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  // Hotkey Trigger ('Shift' + 'L')
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.shiftKey && e.key.toLowerCase() === 'l') {
      triggerLuffySonar();
    }
  });

  // --- INITIALIZE LUFFY GAUGE ---
  setTimeout(() => {
    initLuffyGauge();
  }, 3200);

})();
(function () {
  'use strict';

  // --- 1. CRT SCANLINE & PHOSPHOR OVERLAY ---
  function initCRTOverlay() {
    if (document.getElementById('crt-glass-overlay')) return;

    const crtOverlay = document.createElement('div');
    crtOverlay.id = 'crt-glass-overlay';
    crtOverlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 9999990;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                  linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      background-size: 100% 3px, 6px 100%;
      box-shadow: inset 0 0 100px rgba(0,0,0,0.75);
    `;

    document.body.appendChild(crtOverlay);

    // CRT Screen Flicker animation style
    const crtStyle = document.createElement('style');
    crtStyle.id = 'crt-flicker-style';
    crtStyle.innerHTML = `
      @keyframes crtFlicker {
        0% { opacity: 0.97; }
        50% { opacity: 1; }
        52% { opacity: 0.92; }
        54% { opacity: 1; }
        80% { opacity: 0.96; }
        100% { opacity: 0.98; }
      }
      #crt-glass-overlay {
        animation: crtFlicker 0.15s infinite;
      }
    `;
    document.head.appendChild(crtStyle);
  }

  // --- 2. PHYSICAL CATHODE CONTROL PANEL ---
  function initCathodePanel() {
    if (document.getElementById('hud-cathode-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'hud-cathode-panel';
    panel.style.cssText = `
      position: fixed; top: 60px; left: 25px;
      background: #08100a; border: 2px solid #00ff66;
      box-shadow: inset 0 0 10px #000, 0 0 15px rgba(0, 255, 102, 0.3);
      padding: 8px 12px; border-radius: 4px; z-index: 999998;
      font-family: monospace; font-size: 10px; color: #00ff66;
      pointer-events: auto;
    `;

    panel.innerHTML = `
      <div style="font-weight:bold; border-bottom:1px solid #00ff66; padding-bottom:3px; margin-bottom:6px; text-shadow:0 0 5px #00ff66;">
        [CATHODE CONTROL PANEL]
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <!-- TOGGLE SCANLINES -->
        <label style="display:flex; justify-style:space-between; align-items:center; cursor:pointer;">
          <span>SCANLINES:</span>
          <input type="checkbox" id="toggle-scanlines" checked style="accent-color:#00ff66; cursor:pointer;">
        </label>
        <!-- TOGGLE CRT FLICKER -->
        <label style="display:flex; justify-style:space-between; align-items:center; cursor:pointer;">
          <span>PHOSPHOR FLICKER:</span>
          <input type="checkbox" id="toggle-flicker" checked style="accent-color:#00ff66; cursor:pointer;">
        </label>
        <!-- DEGAUSS BUTTON -->
        <button id="btn-degauss" style="background:#002200; border:1px solid #00ff66; color:#00ff66; font-family:monospace; font-size:9px; padding:4px; font-weight:bold; cursor:pointer; border-radius:3px; margin-top:2px;">
          🧲 DEGAUSS CRT
        </button>
      </div>
    `;

    document.body.appendChild(panel);

    // Panel Event Listeners
    document.getElementById('toggle-scanlines').addEventListener('change', (e) => {
      const crt = document.getElementById('crt-glass-overlay');
      if (crt) crt.style.display = e.target.checked ? 'block' : 'none';
    });

    document.getElementById('toggle-flicker').addEventListener('change', (e) => {
      const crtStyle = document.getElementById('crt-flicker-style');
      if (crtStyle) crtStyle.disabled = !e.target.checked;
    });

    document.getElementById('btn-degauss').addEventListener('click', triggerDegauss);
  }

  // --- 3. CRT DEGAUSS EFFECT ('Shift' + 'G') ---
  function triggerDegauss() {
    // Synth Degauss Hum & Metallic Snap
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}

    // Screen Electro-Magnetic Wobble Distortion
    document.documentElement.style.transition = 'filter 0.05s ease-out, transform 0.05s ease-out';
    document.documentElement.style.filter = 'contrast(200%) hue-rotate(90deg) invert(20%)';
    
    let shakes = 0;
    const degaussInterval = setInterval(() => {
      const rx = (Math.random() - 0.5) * 20;
      const ry = (Math.random() - 0.5) * 20;
      document.documentElement.style.transform = `scale(1.02) translate(${rx}px, ${ry}px)`;
      shakes++;
      if (shakes > 10) {
        clearInterval(degaussInterval);
        document.documentElement.style.filter = 'none';
        document.documentElement.style.transform = 'none';
      }
    }, 40);
  }

  // Hotkey Trigger ('Shift' + 'G')
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.shiftKey && e.key.toLowerCase() === 'g') {
      triggerDegauss();
    }
  });

  // --- INITIALIZE CATHODE MODULE ---
  setTimeout(() => {
    initCRTOverlay();
    initCathodePanel();
  }, 3000);

})();
(function () {
  'use strict';

  // --- 1. DYNAMIC HUD PITCH LADDER & VELOCITY VECTOR ---
  function initPitchLadder() {
    if (document.getElementById('hud-pitch-ladder')) return;

    const container = document.createElement('div');
    container.id = 'hud-pitch-ladder';
    container.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 240px; height: 200px; pointer-events: none;
      z-index: 999995; opacity: 0.7; transition: transform 0.05s linear;
    `;

    container.innerHTML = `
      <!-- VELOCITY VECTOR / FLIGHT PATH MARKER -->
      <div id="hud-vv-marker" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:16px; height:16px; border:2px solid #00ff66; border-radius:50%;">
        <div style="position:absolute; top:-6px; left:6px; width:2px; height:6px; background:#00ff66;"></div>
        <div style="position:absolute; top:6px; left:-8px; width:8px; height:2px; background:#00ff66;"></div>
        <div style="position:absolute; top:6px; right:-8px; width:8px; height:2px; background:#00ff66;"></div>
      </div>
      <!-- PITCH RUNG +10 -->
      <div style="position:absolute; top:20%; left:20%; width:60%; border-top:2px dashed #00ff66; text-align:right; color:#00ff66; font-family:monospace; font-size:9px;">+10</div>
      <!-- PITCH RUNG 00 (HORIZON) -->
      <div style="position:absolute; top:50%; left:10%; width:80%; border-top:2px solid #00ff66; text-align:right; color:#00ff66; font-family:monospace; font-size:10px; font-weight:bold;">00</div>
      <!-- PITCH RUNG -10 -->
      <div style="position:absolute; top:80%; left:20%; width:60%; border-top:2px dashed #00ff66; text-align:right; color:#00ff66; font-family:monospace; font-size:9px;">-10</div>
    `;

    document.body.appendChild(container);

    // Track cursor to shift Flight Path Marker & Pitch Ladder
    document.addEventListener('mousemove', (e) => {
      const offsetX = (e.clientX - window.innerWidth / 2) * 0.15;
      const offsetY = (e.clientY - window.innerHeight / 2) * 0.15;
      container.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    });
  }

  // --- 2. ENGINE THROTTLE LEVER WIDGET ---
  function initThrottleLever() {
    if (document.getElementById('hud-throttle-box')) return;

    const throttleBox = document.createElement('div');
    throttleBox.id = 'hud-throttle-box';
    throttleBox.style.cssText = `
      position: fixed; bottom: 25px; right: 185px;
      width: 45px; height: 110px; background: rgba(2, 12, 6, 0.92);
      border: 1px solid #00ff66; box-shadow: 0 0 12px rgba(0,255,102,0.3);
      padding: 6px; box-sizing: border-box; border-radius: 4px;
      z-index: 999998; display: flex; flex-direction: column; align-items: center;
    `;

    throttleBox.innerHTML = `
      <div style="font-family:monospace; font-size:8px; color:#00ff66; font-weight:bold;">PWR</div>
      <div style="flex:1; width:8px; background:#002200; border:1px solid #00ff66; margin:4px 0; position:relative; border-radius:3px;">
        <div id="throttle-fill" style="position:absolute; bottom:0; width:100%; height:40%; background:#00ff66; box-shadow:0 0 8px #00ff66;"></div>
      </div>
      <div id="throttle-txt" style="font-family:monospace; font-size:8px; color:#00ff66;">40%</div>
    `;

    document.body.appendChild(throttleBox);

    let powerLevel = 40;
    window.addEventListener('wheel', (e) => {
      powerLevel = Math.max(0, Math.min(100, powerLevel - e.deltaY * 0.05));
      const fill = document.getElementById('throttle-fill');
      const txt = document.getElementById('throttle-txt');
      if (fill) fill.style.height = powerLevel + '%';
      if (txt) {
        if (powerLevel > 85) {
          txt.style.color = '#ff3300';
          txt.textContent = 'MAX!!';
        } else {
          txt.style.color = '#00ff66';
          txt.textContent = Math.round(powerLevel) + '%';
        }
      }
    });
  }

  // --- 3. EJECTION SEAT SYSTEM ('Shift' + 'E') ---
  function initEjectSystem() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.shiftKey && e.key.toLowerCase() === 'e') {
        // Ejection Flash Overlay
        const ejectFlash = document.createElement('div');
        ejectFlash.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: #ffffff; z-index: 99999999; opacity: 1;
          transition: opacity 1.2s ease-out; pointer-events: none;
        `;
        document.body.appendChild(ejectFlash);

        // Blast Audio
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.5);

          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.5);
        } catch (e) {}

        // Screen Eject Upward Surge
        document.body.style.transition = 'transform 0.6s cubic-bezier(0.1, 0.9, 0.2, 1)';
        document.body.style.transform = 'translateY(-120vh)';

        setTimeout(() => ejectFlash.style.opacity = '0', 50);

        setTimeout(() => {
          alert('[EJECT! EJECT! EJECT! // CANOPY JETTISONED]');
          document.body.style.transform = 'none';
          setTimeout(() => ejectFlash.remove(), 1200);
        }, 800);
      }
    });
  }

  // --- INITIALIZE INFINITY MODULE ---
  setTimeout(() => {
    initPitchLadder();
    initThrottleLever();
    initEjectSystem();
  }, 2800);

})();

(function () {
  'use strict';

  function createAvionicsSuite() {
    if (document.getElementById('hud-avionics-suite')) return;

    const suite = document.createElement('div');
    suite.id = 'hud-avionics-suite';
    suite.style.cssText = `
      position: fixed; top: 185px; left: 25px;
      display: flex; flex-direction: column; gap: 10px;
      background: rgba(2, 10, 5, 0.92); border: 2px solid #00ff66;
      box-shadow: 0 0 18px rgba(0, 255, 102, 0.4); padding: 10px;
      border-radius: 6px; z-index: 999998; pointer-events: auto;
    `;

    suite.innerHTML = `
      <!-- MASTER CAUTION & AOA STACK -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #00ff66; padding-bottom:6px;">
        <div id="master-caution-btn" style="background:#331100; border:1px solid #ff6600; color:#ff6600; font-family:monospace; font-size:9px; font-weight:bold; padding:3px 6px; border-radius:3px; cursor:pointer;">
          MASTER CAUTION
        </div>
        <!-- AOA INDEXER STACK -->
        <div style="display:flex; gap:3px;">
          <div id="aoa-up" style="width:8px; height:10px; background:#113311; border:1px solid #00ff66;"></div>
          <div id="aoa-mid" style="width:8px; height:10px; background:#332200; border:1px solid #ffaa00;"></div>
          <div id="aoa-down" style="width:8px; height:10px; background:#330000; border:1px solid #ff0033;"></div>
        </div>
      </div>

      <!-- INSTRUMENT DIALS ROW -->
      <div style="display:flex; gap:10px; margin-top:4px;">

        <!-- 1. AIRSPEED INDICATOR (ASI) -->
        <div style="text-align:center;">
          <svg width="65" height="65" viewBox="0 0 100 100" style="border-radius:50%; border:2px solid #00ff66; background:#001105;">
            <circle cx="50" cy="50" r="44" stroke="rgba(0,255,102,0.2)" stroke-width="2" fill="none"/>
            <text x="50" y="25" fill="#00ff66" font-size="9" font-family="monospace" text-anchor="middle">KTS</text>
            <text x="75" y="53" fill="#00ff66" font-size="8" font-family="monospace">100</text>
            <text x="50" y="82" fill="#00ff66" font-size="8" font-family="monospace" text-anchor="middle">200</text>
            <text x="20" y="53" fill="#00ff66" font-size="8" font-family="monospace">300</text>
            <!-- Needle -->
            <g id="needle-asi" transform="rotate(-120 50 50)" style="transition: transform 0.1s linear;">
              <line x1="50" y1="50" x2="50" y2="14" stroke="#00ff66" stroke-width="3" stroke-linecap="round"/>
              <circle cx="50" cy="50" r="4" fill="#00ff66"/>
            </g>
          </svg>
          <div style="font-family:monospace; font-size:9px; color:#00ff66;">AIRSPEED</div>
        </div>

        <!-- 2. ALTIMETER (ALT) -->
        <div style="text-align:center;">
          <svg width="65" height="65" viewBox="0 0 100 100" style="border-radius:50%; border:2px solid #00ff66; background:#001105;">
            <circle cx="50" cy="50" r="44" stroke="rgba(0,255,102,0.2)" stroke-width="2" fill="none"/>
            <text x="50" y="24" fill="#00ff66" font-size="9" font-family="monospace" text-anchor="middle">ALT</text>
            <!-- Long Needle (100s) & Short Needle (1000s) -->
            <g id="needle-alt-long" transform="rotate(0 50 50)">
              <line x1="50" y1="50" x2="50" y2="12" stroke="#00ff66" stroke-width="2"/>
            </g>
            <g id="needle-alt-short" transform="rotate(0 50 50)">
              <line x1="50" y1="50" x2="50" y2="24" stroke="#ffaa00" stroke-width="4"/>
            </g>
            <circle cx="50" cy="50" r="5" fill="#00ff66"/>
          </svg>
          <div style="font-family:monospace; font-size:9px; color:#00ff66;">ALTITUDE</div>
        </div>

        <!-- 3. VERTICAL SPEED INDICATOR (VSI) -->
        <div style="text-align:center;">
          <svg width="65" height="65" viewBox="0 0 100 100" style="border-radius:50%; border:2px solid #00ff66; background:#001105;">
            <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(0,255,102,0.3)" stroke-width="1"/>
            <text x="22" y="32" fill="#00ff66" font-size="8" font-family="monospace">+2</text>
            <text x="22" y="72" fill="#00ff66" font-size="8" font-family="monospace">-2</text>
            <text x="75" y="53" fill="#00ff66" font-size="8" font-family="monospace">VSI</text>
            <!-- Needle -->
            <g id="needle-vsi" transform="rotate(0 50 50)" style="transition: transform 0.15s ease-out;">
              <line x1="50" y1="50" x2="16" y2="50" stroke="#00ff66" stroke-width="3" stroke-linecap="round"/>
              <circle cx="50" cy="50" r="4" fill="#00ff66"/>
            </g>
          </svg>
          <div style="font-family:monospace; font-size:9px; color:#00ff66;">CLIMB/DES</div>
        </div>

      </div>
    `;

    document.body.appendChild(suite);

    // --- REAL-TIME FLIGHT DATA DYNAMICS ---
    let lastMouseX = 0, lastMouseY = 0;
    let lastScrollY = window.scrollY;

    // Mouse Speed -> Airspeed Indicator (ASI)
    document.addEventListener('mousemove', (e) => {
      const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      const asiNeedle = document.getElementById('needle-asi');
      if (asiNeedle) {
        const knotAngle = Math.min(140, -120 + dist * 5);
        asiNeedle.setAttribute('transform', `rotate(${knotAngle} 50 50)`);
      }
    });

    // Scroll Position -> Altimeter & VSI
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      // Altimeter
      const altLong = document.getElementById('needle-alt-long');
      const altShort = document.getElementById('needle-alt-short');
      if (altLong && altShort) {
        altLong.setAttribute('transform', `rotate(${currentScroll * 0.8} 50 50)`);
        altShort.setAttribute('transform', `rotate(${currentScroll * 0.08} 50 50)`);
      }

      // VSI (Vertical Speed)
      const vsiNeedle = document.getElementById('needle-vsi');
      if (vsiNeedle) {
        const vsiAngle = Math.max(-50, Math.min(50, delta * 1.5));
        vsiNeedle.setAttribute('transform', `rotate(${vsiAngle} 50 50)`);
      }

      // High-speed Scroll -> AOA / Stall Warning & Master Caution
      const aoaUp = document.getElementById('aoa-up');
      const aoaMid = document.getElementById('aoa-mid');
      const aoaDown = document.getElementById('aoa-down');
      const cautionBtn = document.getElementById('master-caution-btn');

      if (Math.abs(delta) > 40) {
        // High Rate of Climb/Descent -> Red Stall Warning
        if (aoaDown) aoaDown.style.background = '#ff0033';
        if (cautionBtn) {
          cautionBtn.style.background = '#ff3300';
          cautionBtn.style.color = '#ffffff';
          cautionBtn.textContent = '! WARNING: STALL !';
        }
      } else {
        if (aoaDown) aoaDown.style.background = '#330000';
        if (aoaMid) aoaMid.style.background = '#ffaa00';
        if (cautionBtn) {
          cautionBtn.style.background = '#331100';
          cautionBtn.style.color = '#ff6600';
          cautionBtn.textContent = 'MASTER CAUTION';
        }
      }
    });
  }

  // INITIALIZE AVIONICS FLIGHT DECK
  setTimeout(createAvionicsSuite, 2600);

})();
(function () {
  'use strict';

  let isWarping = false;

  // --- 1. ORBITAL TELEMETRY & SOLAR GAUGES ---
  function initSpaceWidget() {
    if (document.getElementById('hud-space-widget')) return;

    const spaceBox = document.createElement('div');
    spaceBox.id = 'hud-space-widget';
    spaceBox.style.cssText = `
      position: fixed; top: 185px; right: 25px;
      background: rgba(4, 8, 20, 0.9); border: 1px solid #00ccff;
      box-shadow: 0 0 12px rgba(0, 204, 255, 0.3); color: #00ccff;
      font-family: monospace; font-size: 11px; padding: 8px 12px;
      z-index: 999998; border-radius: 4px; pointer-events: auto;
    `;

    spaceBox.innerHTML = `
      <div style="font-weight:bold; border-bottom:1px solid #00ccff; margin-bottom:4px; padding-bottom:2px;">
        [ORBITAL_NAV // SECTOR_09]
      </div>
      <div>VELOCITY: <span id="space-speed-val">28,000</span> KM/H</div>
      <div>SOLAR FLARE: <span id="space-rad-val" style="color:#00ff66;">LOW (0.02 mSv)</span></div>
      <div>THRUSTERS: <span style="color:#00ccff;">PLASMA ACTIVE</span></div>
    `;

    document.body.appendChild(spaceBox);

    // Dynamic speed telemetry fluctuation
    setInterval(() => {
      const speedElem = document.getElementById('space-speed-val');
      if (speedElem && !isWarping) {
        const baseSpeed = 28000 + Math.floor(Math.random() * 120 - 60);
        speedElem.textContent = baseSpeed.toLocaleString();
      }
    }, 800);
  }


  // --- 2. WARP DRIVE HYPERSPEED EFFECT ('Shift' + 'W') ---
  function triggerWarpDrive() {
    if (isWarping) return;
    isWarping = true;

    const speedElem = document.getElementById('space-speed-val');
    if (speedElem) speedElem.textContent = 'WARP 9.8 (LIGHTSPEED)';

    // Play Synth Warp Audio Burst
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {}

    // Screen Shake & Star Stretch
    document.body.style.transition = 'transform 0.1s linear';
    let shakes = 0;
    const shakeInterval = setInterval(() => {
      const rx = (Math.random() - 0.5) * 8;
      const ry = (Math.random() - 0.5) * 8;
      document.body.style.transform = `translate(${rx}px, ${ry}px)`;
      shakes++;
      if (shakes > 12) {
        clearInterval(shakeInterval);
        document.body.style.transform = 'none';
        isWarping = false;
        alert('[WARP JUMP COMPLETE // ORBIT STABILIZED]');
      }
    }, 80);
  }


  // --- 3. PLASMA THRUSTER ENGINE CURSOR PARTICLES ---
  function initPlasmaThrusters() {
    document.addEventListener('mousemove', function (e) {
      if (Math.random() > 0.4) return; // Throttle particle creation

      const plasma = document.createElement('div');
      plasma.style.cssText = `
        position: fixed; top: ${e.clientY + 12}px; left: ${e.clientX - 6}px;
        width: 4px; height: 4px; background: #00ccff;
        box-shadow: 0 0 8px #00ccff, 0 0 14px #0066ff; border-radius: 50%;
        pointer-events: none; z-index: 999998; opacity: 0.9;
        transition: transform 0.5s ease-out, opacity 0.5s ease-out;
      `;

      document.body.appendChild(plasma);

      setTimeout(() => {
        plasma.style.transform = 'translateY(18px) scale(0.1)';
        plasma.style.opacity = '0';
        setTimeout(() => plasma.remove(), 500);
      }, 40);
    });
  }


  // --- 4. KEYBOARD HOTKEYS ---
  document.addEventListener('keydown', function (e) {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // 'Shift' + 'W' -> Engage Warp Drive
    if (e.shiftKey && e.key.toLowerCase() === 'w') {
      triggerWarpDrive();
    }

    // 'Shift' + 'R' -> Solar Radiation Alert
    if (e.shiftKey && e.key.toLowerCase() === 'r') {
      const radElem = document.getElementById('space-rad-val');
      if (radElem) {
        radElem.style.color = '#ff9900';
        radElem.textContent = 'WARNING: CRITICAL (8.40 mSv)';
      }
      alert('[SOLAR RADIATION SPIKE DETECTED // DEFENSIVE SHIELD POLARIZED]');
    }
  });


  // --- INITIALIZE SPACE MODULE ---
  setTimeout(() => {
    initSpaceWidget();
    initPlasmaThrusters();
  }, 2200);

})();
   
   /* ==========================================================================
   UWAWAVERSE ANALOG COCKPIT GAUGES MODULE (SVG DIALS & ROTATING NEEDLES)
   ========================================================================== */

(function () {
  'use strict';

  function createAnalogGauges() {
    if (document.getElementById('hud-analog-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.id = 'hud-analog-dashboard';
    dashboard.style.cssText = `
      position: fixed; bottom: 25px; left: 130px;
      display: flex; gap: 12px; align-items: center;
      background: rgba(0, 15, 8, 0.9); border: 1px solid #00ff66;
      box-shadow: 0 0 15px rgba(0,255,102,0.3); padding: 8px 12px;
      border-radius: 6px; z-index: 999998; pointer-events: auto;
    `;

    dashboard.innerHTML = `
      <!-- 1. ATTITUDE INDICATOR (ARTIFICIAL HORIZON) -->
      <div style="text-align:center;">
        <svg id="gauge-horizon" width="60" height="60" viewBox="0 0 100 100" style="border-radius:50%; border:2px solid #00ff66; background:#001a08;">
          <g id="horizon-disc" transform="rotate(0 50 50)">
            <rect x="0" y="0" width="100" height="50" fill="#00ff66" opacity="0.3"/>
            <rect x="0" y="50" width="100" height="50" fill="#002200"/>
            <line x1="0" y1="50" x2="100" y2="50" stroke="#00ff66" stroke-width="3"/>
          </g>
          <!-- Fixed Wings Crosshair -->
          <line x1="25" y1="50" x2="40" y2="50" stroke="#00ff66" stroke-width="4"/>
          <line x1="60" y1="50" x2="75" y2="50" stroke="#00ff66" stroke-width="4"/>
          <circle cx="50" cy="50" r="3" fill="#00ff66"/>
        </svg>
        <div style="font-family:monospace; font-size:9px; color:#00ff66; margin-top:2px;">PITCH/ROLL</div>
      </div>

      <!-- 2. ANALOG PRESSURE / DEPTH NEEDLE GAUGE -->
      <div style="text-align:center;">
        <svg id="gauge-pressure" width="60" height="60" viewBox="0 0 100 100" style="border-radius:50%; border:2px solid #00ff66; background:#00150a;">
          <circle cx="50" cy="50" r="42" stroke="rgba(0,255,102,0.3)" stroke-width="2" fill="none"/>
          <!-- Ticks -->
          <line x1="50" y1="12" x2="50" y2="20" stroke="#00ff66" stroke-width="2"/>
          <line x1="88" y1="50" x2="80" y2="50" stroke="#00ff66" stroke-width="2"/>
          <line x1="50" y1="88" x2="50" y2="80" stroke="#00ff66" stroke-width="2"/>
          <line x1="12" y1="50" x2="20" y2="50" stroke="#00ff66" stroke-width="2"/>
          <!-- Rotating Needle -->
          <g id="needle-pressure" transform="rotate(-45 50 50)" style="transition: transform 0.2s ease-out;">
            <line x1="50" y1="50" x2="50" y2="16" stroke="#ff3300" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="5" fill="#ff3300"/>
          </g>
        </svg>
        <div style="font-family:monospace; font-size:9px; color:#00ff66; margin-top:2px;">PRESSURE</div>
      </div>

      <!-- 3. COMPASS / HEADING BEARING DIAL -->
      <div style="text-align:center;">
        <svg id="gauge-compass" width="60" height="60" viewBox="0 0 100 100" style="border-radius:50%; border:2px solid #00ff66; background:#00150a;">
          <g id="dial-compass" transform="rotate(0 50 50)" style="transition: transform 0.1s linear;">
            <circle cx="50" cy="50" r="44" stroke="#00ff66" stroke-width="1" stroke-dasharray="4,4" fill="none"/>
            <text x="50" y="22" fill="#00ff66" font-size="12" font-family="monospace" text-anchor="middle">N</text>
            <text x="82" y="54" fill="#00ff66" font-size="10" font-family="monospace" text-anchor="middle">E</text>
            <text x="50" y="86" fill="#00ff66" font-size="10" font-family="monospace" text-anchor="middle">S</text>
            <text x="18" y="54" fill="#00ff66" font-size="10" font-family="monospace" text-anchor="middle">W</text>
          </g>
          <!-- Fixed Lubber Line -->
          <polygon points="50,8 46,16 54,16" fill="#00ff66"/>
        </svg>
        <div style="font-family:monospace; font-size:9px; color:#00ff66; margin-top:2px;">HEADING</div>
      </div>
    `;

    document.body.appendChild(dashboard);

cccc    // --- ANIMATION INTERACTION LOOP ---
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', function () {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      lastScroll = currentScroll;

      // 1. Tilt Horizon on Scroll
      const horizon = document.getElementById('horizon-disc');
      if (horizon) {
        const angle = Math.max(-35, Math.min(35, delta * 2));
        horizon.setAttribute('transform', `rotate(${angle} 50 50)`);
      }

      // 2. Rotate Compass Dial on Scroll
      const compass = document.getElementById('dial-compass');
      if (compass) {
        const compassAngle = (currentScroll * 0.4) % 360;
        compass.setAttribute('transform', `rotate(${compassAngle} 50 50)`);
      }
    });

    // 3. Pressure Needle Fluctuation
    setInterval(() => {
      const needle = document.getElementById('needle-pressure');
      if (needle) {
        const randomAngle = -60 + Math.floor(Math.random() * 120);
        needle.setAttribute('transform', `rotate(${randomAngle} 50 50)`);
      }
    }, 600);
  }

  // INITIALIZE ANALOG GAUGES
  setTimeout(createAnalogGauges, 2400);

})();
   /* ==========================================================================
   UWAWAVERSE SUBMARINE DEEP-DIVE MODULE (DEPTH GAUGE, BUBBLES & BALLAST)
   ========================================================================== */

(function () {
  'use strict';

  let currentDepth = 4200; // Starting depth in meters
  let targetDepth = 4200;

  // --- 1. HUD DEPTH & BALLAST TELEMETRY WIDGET ---
  function initDepthWidget() {
    if (document.getElementById('hud-depth-widget')) return;

    const depthBox = document.createElement('div');
    depthBox.id = 'hud-depth-widget';
    depthBox.style.cssText = `
      position: fixed; top: 85px; right: 25px;
      background: rgba(0, 15, 12, 0.9); border: 1px solid #00ffaa;
      box-shadow: 0 0 12px rgba(0, 255, 170, 0.3); color: #00ffaa;
      font-family: monospace; font-size: 11px; padding: 8px 12px;
      z-index: 999998; border-radius: 4px; pointer-events: auto; cursor: pointer;
    `;

    depthBox.innerHTML = `
      <div style="font-weight:bold; border-bottom:1px solid #00ffaa; margin-bottom:4px; padding-bottom:2px;">
        [SUB_TELEMETRY // ABYSS]
      </div>
      <div>DEPTH: <span id="sub-depth-val">4200</span> M</div>
      <div>PRESSURE: <span id="sub-press-val">420.0</span> ATM</div>
      <div>BALLAST: <span id="sub-ballast-val">OPTIMAL</span></div>
    `;

    document.body.appendChild(depthBox);

    // Deep Creak Audio on Click
    depthBox.addEventListener('click', function () {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.8);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {}

      // Toggle Target Depth on click (Dive deeper or shallow)
      targetDepth = targetDepth === 4200 ? 8500 : 4200;
    });

    // Smooth Depth Interpolation Loop
    setInterval(() => {
      if (Math.abs(currentDepth - targetDepth) > 2) {
        currentDepth += (targetDepth - currentDepth) * 0.05;
        const depthElem = document.getElementById('sub-depth-val');
        const pressElem = document.getElementById('sub-press-val');
        if (depthElem) depthElem.textContent = Math.round(currentDepth);
        if (pressElem) pressElem.textContent = (currentDepth / 10).toFixed(1);
      }
    }, 100);
  }

  // --- 2. RISING HYDRO-BUBBLES PARTICLES ---
  function initHydroBubbles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'hud-bubble-canvas';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: -1; opacity: 0.5;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const bubbles = [];
    for (let i = 0; i < 30; i++) {
      bubbles.push({
        x: Math.random() * w,
        y: Math.random() * h + h,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1.2 + 0.4,
        wobble: Math.random() * 2
      });
    }

    function renderBubbles() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = '#00ffaa';
      ctx.lineWidth = 1;

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x + Math.sin(b.wobble) * 2, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();

        b.y -= b.speed;
        b.wobble += 0.03;

        if (b.y < -10) {
          b.y = h + 10;
          b.x = Math.random() * w;
        }
      });

      requestAnimationFrame(renderBubbles);
    }
    renderBubbles();
  }

  // --- 3. EMERGENCY SURFACE HOTKEY ('Shift' + 'S') ---
  document.addEventListener('keydown', function (e) {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.shiftKey && e.key.toLowerCase() === 's') {
      targetDepth = 0; // Blow ballast and surface!
      const ballastElem = document.getElementById('sub-ballast-val');
      if (ballastElem) ballastElem.textContent = 'BLOWING BALLAST!';
      alert('[EMERGENCY SURFACE INITIATED // BLOWING ALL BALLAST TANKS]');
      
      setTimeout(() => {
        if (ballastElem) ballastElem.textContent = 'SURFACED';
      }, 5000);
    }
  });

  // --- INITIALIZE SUBMODULE ---
  setTimeout(() => {
    initDepthWidget();
    initHydroBubbles();
  }, 2000);

})();
   
/* ==========================================================================
   UWAWAVERSE ULTIMATE TACTICAL HUD SUITE (5-IN-1 ADVANCED EXTENSION)
   ========================================================================== */
/* ==========================================================================
   UWAWAVERSE ADVANCED TACTICAL SYSTEMS (RADAR, TERMINAL & AMBIANCE)
   ========================================================================== */
/* ==========================================================================
   UWAWAVERSE ORBITAL TACTICAL EXPANSION (STARFIELD, ALERT BARS & TARGET)
   ========================================================================== */

(function () {
  'use strict';
/* ==========================================================================
   UWAWAVERSE QUANTUM SYSTEMS MODULE (EMP, VOX & DEFENSE INTERCEPT)
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. EMP SHOCKWAVE & GLITCH TRIGGER ('E' KEY) ---
  function triggerEMP(x, y) {
    // Shockwave Ring
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: fixed; top: ${y}px; left: ${x}px;
      width: 10px; height: 10px; border: 2px solid #00ff66;
      border-radius: 50%; pointer-events: none; z-index: 9999999;
      transform: translate(-50%, -50%); opacity: 1;
      transition: width 0.6s ease-out, height 0.6s ease-out, opacity 0.6s ease-out;
      box-shadow: 0 0 20px #00ff66, inset 0 0 20px #00ff66;
    `;
    document.body.appendChild(wave);

    // Screen Glitch Overlay
    document.documentElement.style.filter = 'invert(100%) hue-rotate(180deg)';

    setTimeout(() => {
      wave.style.width = '800px';
      wave.style.height = '800px';
      wave.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      document.documentElement.style.filter = 'none';
      setTimeout(() => wave.remove(), 600);
    }, 150);
  }

  // --- 2. DEFENSE INTERCEPT TARGET MINI-GAME ('Shift' + 'D') ---
  function spawnHostileTarget() {
    const radar = document.getElementById('hud-radar-box');
    if (!radar) return;

    const bogeys = document.createElement('div');
    const randomAngle = Math.random() * Math.PI * 2;
    const dist = 35; // Inside radar canvas
    const cx = 45 + Math.cos(randomAngle) * dist;
    const cy = 45 + Math.sin(randomAngle) * dist;

    bogeys.style.cssText = `
      position: absolute; top: ${cy}px; left: ${cx}px;
      width: 6px; height: 6px; background: #ff0055;
      border-radius: 50%; box-shadow: 0 0 6px #ff0055;
      cursor: pointer; z-index: 999999; transform: translate(-50%, -50%);
      animation: blip 0.5s infinite alternate;
    `;

    radar.appendChild(bogeys);

    bogeys.addEventListener('click', function (e) {
      e.stopPropagation();
      bogeys.remove();
      alert("[TARGET NEUTRALIZED // SHIELDS SECURE]");
    });

    setTimeout(() => {
      if (bogeys.parentNode) bogeys.remove();
    }, 6000);
  }

  // --- 3. HOTKEYS & INITIALIZATION ---
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('keydown', function (e) {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // 'E' Key -> EMP Shockwave
    if (e.key.toLowerCase() === 'e') {
      triggerEMP(mouseX, mouseY);
    }

    // 'Shift' + 'D' -> Spawn Target on Radar
    if (e.shiftKey && e.key.toLowerCase() === 'd') {
      spawnHostileTarget();
    }
  });

})();

  // --- 1. DYNAMIC STARFIELD WARP CANVAS ---
  function initStarfield() {
    if (document.getElementById('hud-starfield-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hud-starfield-canvas';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: -2; opacity: 0.6;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const numStars = 70;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.8 + 0.2
      });
    }

    function renderStars() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#00ff66';

      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        s.y += s.speed;
        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
        }
      });

      requestAnimationFrame(renderStars);
    }
    renderStars();
  }


  // --- 2. RED ALERT EMERGENCY SIREN BARS ---
  function initEmergencyBars() {
    const topBar = document.createElement('div');
    const bottomBar = document.createElement('div');
    
    const style = `
      position: fixed; left: 0; width: 100vw; height: 6px;
      background: #ff0033; box-shadow: 0 0 12px #ff0033;
      z-index: 9999999; display: none; pointer-events: none;
      animation: hudPulse 0.8s infinite alternate;
    `;

    topBar.style.cssText = style + 'top: 0;';
    bottomBar.style.cssText = style + 'bottom: 0;';
    
    topBar.id = 'hud-alert-top';
    bottomBar.id = 'hud-alert-bottom';

    document.body.appendChild(topBar);
    document.body.appendChild(bottomBar);

    // Inject CSS Animation Keyframes
    const animStyle = document.createElement('style');
    animStyle.innerHTML = `
      @keyframes hudPulse {
        0% { opacity: 0.2; transform: scaleX(0.98); }
        100% { opacity: 1; transform: scaleX(1); }
      }
    `;
    document.head.appendChild(animStyle);

    // Listen to mode toggle button clicks
    document.addEventListener('click', function (e) {
      if (e.target && e.target.id === 'hud-mode-toggle') {
        const isRed = e.target.textContent.includes('RED ALERT');
        topBar.style.display = isRed ? 'block' : 'none';
        bottomBar.style.display = isRed ? 'block' : 'none';
      }
    });
  }


  // --- 3. TACTICAL TARGET COMPANION (LUFFY_CADWELL) ---
  function initTacticalTarget() {
    if (document.getElementById('hud-target-luffy')) return;

    const target = document.createElement('div');
    target.id = 'hud-target-luffy';
    target.style.cssText = `
      position: fixed; top: 20%; left: 80%;
      background: rgba(0, 20, 10, 0.85); border: 1px dashed #00ff66;
      color: #00ff66; font-family: monospace; font-size: 10px;
      padding: 4px 8px; border-radius: 3px; z-index: 999997;
      pointer-events: none; transition: top 3s ease-in-out, left 3s ease-in-out;
      box-shadow: 0 0 8px rgba(0,255,102,0.3);
    `;

    target.innerHTML = `
      <div style="font-weight:bold;">[TRK // LUFFY_CADWELL]</div>
      <div style="font-size:9px; color:#00cc55;">STATUS: PURRING // SHIELDS: MAX</div>
    `;

    document.body.appendChild(target);

    // Patrol movement routine across screen
    setInterval(() => {
      const randomY = Math.floor(Math.random() * 60) + 15; // 15% to 75%
      const randomX = Math.floor(Math.random() * 60) + 20; // 20% to 80%
      target.style.top = randomY + '%';
      target.style.left = randomX + '%';
    }, 5000);
  }


  // --- INITIALIZE EXPANSION ---
  setTimeout(() => {
    initStarfield();
    initEmergencyBars();
    initTacticalTarget();
  }, 1800);

})();

(function () {
  'use strict';

  // --- 1. ROTATING RADAR SWEEP WIDGET ---
  function createRadarScanner() {
    if (document.getElementById('hud-radar-canvas')) return;

    const container = document.createElement('div');
    container.id = 'hud-radar-box';
    container.style.cssText = `
      position: fixed; bottom: 25px; left: 25px;
      width: 90px; height: 90px;
      background: rgba(0, 15, 5, 0.85);
      border: 1px solid #00ff66; border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,255,102,0.3);
      z-index: 999998; pointer-events: none; overflow: hidden;
    `;

    const canvas = document.createElement('canvas');
    canvas.id = 'hud-radar-canvas';
    canvas.width = 90; canvas.height = 90;
    container.appendChild(canvas);
    document.body.appendChild(container);

    const ctx = canvas.getContext('2d');
    let angle = 0;

    function drawRadar() {
      ctx.clearRect(0, 0, 90, 90);

      // Radar Grid Rings
      ctx.strokeStyle = 'rgba(0, 255, 102, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(45, 45, 40, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(45, 45, 22, 0, Math.PI * 2); ctx.stroke();
      
      // Crosshairs
      ctx.beginPath(); ctx.moveTo(45, 5); ctx.lineTo(45, 85); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5, 45); ctx.lineTo(85, 45); ctx.stroke();

      // Sweep Line
      ctx.save();
      ctx.translate(45, 45);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -40);
      ctx.strokeStyle = '#00ff66';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00ff66';
      ctx.stroke();
      ctx.restore();

      angle += 0.04;
      requestAnimationFrame(drawRadar);
    }
    drawRadar();
  }


  // --- 2. AMBIENT ENGINE HUM (TOGGLE WITH 'B') ---
  let ambientOsc = null;
  let ambientGain = null;
  let isAmbientPlaying = false;

  function toggleAmbientHum() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!window.hudAudioCtx) window.hudAudioCtx = new AudioCtx();
      
      if (isAmbientPlaying) {
        ambientGain.gain.exponentialRampToValueAtTime(0.00001, window.hudAudioCtx.currentTime + 1);
        setTimeout(() => ambientOsc.stop(), 1000);
        isAmbientPlaying = false;
        alert("[AMBIENT ENGINE HUM: OFF]");
      } else {
        if (window.hudAudioCtx.state === 'suspended') window.hudAudioCtx.resume();
        ambientOsc = window.hudAudioCtx.createOscillator();
        ambientGain = window.hudAudioCtx.createGain();

        ambientOsc.type = 'sawtooth';
        ambientOsc.frequency.setValueAtTime(55, window.hudAudioCtx.currentTime); // Low 55Hz drone
        
        ambientGain.gain.setValueAtTime(0.0001, window.hudAudioCtx.currentTime);
        ambientGain.gain.exponentialRampToValueAtTime(0.008, window.hudAudioCtx.currentTime + 2);

        ambientOsc.connect(ambientGain);
        ambientGain.connect(window.hudAudioCtx.destination);
        ambientOsc.start();
        isAmbientPlaying = true;
        alert("[AMBIENT ENGINE HUM: ACTIVE]");
      }
    } catch(e) {}
  }


  // --- 3. INTERACTIVE TERMINAL CLI OVERLAY (TOGGLE WITH '~') ---
  function initCommandLine() {
    const term = document.createElement('div');
    term.id = 'hud-cli-terminal';
    term.style.cssText = `
      position: fixed; top: 10%; left: 15%; width: 70%; height: 50%;
      background: rgba(1, 12, 4, 0.95); border: 1px solid #00ff66;
      box-shadow: 0 0 25px rgba(0,255,102,0.4); color: #00ff66;
      font-family: monospace; font-size: 13px; z-index: 9999999;
      display: none; flex-direction: column; padding: 15px; box-sizing: border-box;
      border-radius: 4px;
    `;

    term.innerHTML = `
      <div style="border-bottom: 1px solid #00ff66; padding-bottom: 5px; font-weight: bold;">
        [UWAWAVERSE COMMAND TERMINAL // PRESS ESC OR ~ TO CLOSE]
      </div>
      <div id="hud-cli-output" style="flex: 1; overflow-y: auto; margin: 10px 0; white-space: pre-wrap;">
Welcome to Uwawaverse CLI v2.0. Type 'help' for available commands.
      </div>
      <div style="display: flex;">
        <span style="margin-right: 8px;">></span>
        <input type="text" id="hud-cli-input" style="flex: 1; background: transparent; border: none; color: #00ff66; font-family: monospace; outline: none;">
      </div>
    `;

    document.body.appendChild(term);

    const input = document.getElementById('hud-cli-input');
    const output = document.getElementById('hud-cli-output');

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        output.textContent += '\n> ' + input.value;
        input.value = '';

        if (cmd === 'help') {
          output.textContent += '\nAvailable Commands: help, status, ping, clear, alert, matrix';
        } else if (cmd === 'status') {
          output.textContent += '\nALL SYSTEMS NORMAL // SHIELDS: 100% // RADAR: ACTIVE';
        } else if (cmd === 'ping') {
          output.textContent += '\nPinging Relay... Response time: 14ms [STABLE]';
        } else if (cmd === 'alert') {
          const toggleBtn = document.getElementById('hud-mode-toggle');
          if (toggleBtn) toggleBtn.click();
          output.textContent += '\nMode toggled successfully.';
        } else if (cmd === 'clear') {
          output.textContent = 'Terminal cleared.';
        } else if (cmd === 'matrix') {
          output.textContent += '\nFollow the white rabbit... 🐇';
        } else {
          output.textContent += `\nCommand not recognized: '${cmd}'`;
        }

        output.scrollTop = output.scrollHeight;
      }
    });

    document.addEventListener('keydown', function(e) {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && document.activeElement !== input) return;

      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        const isOpen = term.style.display === 'flex';
        term.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) input.focus();
      }

      if (e.key === 'Escape' && term.style.display === 'flex') {
        term.style.display = 'none';
      }

      if (e.key.toLowerCase() === 'b') {
        toggleAmbientHum();
      }
    });
  }


  // --- INITIALIZE ALL NEW FEATURES ---
  setTimeout(() => {
    createRadarScanner();
    initCommandLine();
  }, 1500);

})();

(function () {
  'use strict';

  // --- GLOBAL STATE & AUDIO SYSTEM ---
  let soundMuted = false;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioContext = null;

  function triggerSynth(freq, type, duration, vol) {
    if (soundMuted) return;
    try {
      if (!audioContext) audioContext = new AudioCtx();
      if (audioContext.state === 'suspended') audioContext.resume();

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(vol || 0.02, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {}
  }


  // ==========================================================================
  // 1. TERMINAL BOOT SEQUENCE INTRO
  // ==========================================================================
  function runBootIntro() {
    if (sessionStorage.getItem('hud_booted')) return; // Run once per session

    const overlay = document.createElement('div');
    overlay.id = 'hud-boot-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: #020a04; color: #00ff66; font-family: monospace;
      font-size: 14px; z-index: 9999999; padding: 40px; box-sizing: border-box;
      display: flex; flex-direction: column; justify-content: center;
      pointer-events: none; opacity: 1; transition: opacity 0.5s ease;
    `;

    overlay.innerHTML = `
      <div style="font-weight:bold; font-size:18px; margin-bottom:15px;">[UWAWAVERSE OS v2.0 // INITIALIZING COCKPIT]</div>
      <div id="hud-boot-logs"></div>
    `;
    document.body.appendChild(overlay);

    const logs = [
      "> CHECKING CORE SYSTEMS...",
      "> CONNECTING TO ORBITAL RELAY...",
      "> CALIBRATING DEFENSE SHIELDS...",
      "> HUD INTERFACE READY."
    ];

    let step = 0;
    const logContainer = document.getElementById('hud-boot-logs');

    const bootInterval = setInterval(() => {
      if (step < logs.length) {
        const line = document.createElement('div');
        line.textContent = logs[step];
        logContainer.appendChild(line);
        triggerSynth(600 + (step * 200), 'sawtooth', 0.05, 0.02);
        step++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          overlay.style.opacity = '0';
          setTimeout(() => overlay.remove(), 500);
          sessionStorage.setItem('hud_booted', 'true');
        }, 600);
      }
    }, 250);
  }


  // ==========================================================================
  // 2. LIVE PING / LATENCY INDICATOR
  // ==========================================================================
  function initPingMeter() {
    const clockContainer = document.getElementById('hud-clock');
    if (!clockContainer) return;

    const pingElem = document.createElement('div');
    pingElem.id = 'hud-ping-display';
    pingElem.style.marginTop = '2px';
    pingElem.style.color = '#00cc55';
    pingElem.innerHTML = 'PING: <span id="hud-ping-val">--</span> ms';
    clockContainer.parentNode.appendChild(pingElem);

    function checkPing() {
      const start = Date.now();
      fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
        .then(() => {
          const latency = Date.now() - start;
          const pingVal = document.getElementById('hud-ping-val');
          if (pingVal) pingVal.textContent = latency;
        })
        .catch(() => {});
    }

    checkPing();
    setInterval(checkPing, 10000); // Update ping every 10 sec
  }


  // ==========================================================================
  // 3. KEYBOARD SHORTCUTS (HOTKEYS)
  // ==========================================================================
  function initHotkeys() {
    document.addEventListener('keydown', function (e) {
      // Avoid triggering when typing in search bars or inputs
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const key = e.key.toLowerCase();

      // 'R' -> Red Alert / Mode Toggle
      if (key === 'r') {
        const toggleBtn = document.getElementById('hud-mode-toggle');
        if (toggleBtn) toggleBtn.click();
      }

      // 'M' -> Mute Audio
      if (key === 'm') {
        soundMuted = !soundMuted;
        triggerSynth(soundMuted ? 200 : 800, 'sine', 0.1, 0.04);
        alert(soundMuted ? "[HUD AUDIO MUTED]" : "[HUD AUDIO ACTIVE]");
      }

      // 'H' -> Hide / Show Overlays
      if (key === 'h') {
        const hud = document.getElementById('hud-tactical-widget');
        if (hud) {
          hud.style.display = (hud.style.display === 'none') ? 'block' : 'none';
        }
      }
    });
  }


  // ==========================================================================
  // 4. SONAR SCROLL PING
  // ==========================================================================
  function initScrollSonar() {
    let lastScrollY = window.scrollY;
    let scrollDistance = 0;

    window.addEventListener('scroll', function () {
      const currentY = window.scrollY;
      scrollDistance += Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;

      // Trigger a deep sonar ping every 600px scrolled
      if (scrollDistance > 600) {
        triggerSynth(180, 'sine', 0.4, 0.03); // Low sonar pulse
        scrollDistance = 0;
      }
    });
  }


  // ==========================================================================
  // 5. TACTICAL CROSSHAIR & NEON TRAIL
  // ==========================================================================
  function initTacticalCursor() {
    // Hide native cursor for page body
    const style = document.createElement('style');
    style.innerHTML = `body, a, button { cursor: crosshair !important; }`;
    document.head.appendChild(style);

    // Particle Trail Generator
    document.addEventListener('mousemove', function (e) {
      if (Math.random() > 0.3) return; // Throttle particle creation

      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed; top: ${e.clientY}px; left: ${e.clientX}px;
        width: 3px; height: 3px; background: #00ff66;
        box-shadow: 0 0 6px #00ff66; border-radius: 50%;
        pointer-events: none; z-index: 999998; opacity: 0.8;
        transition: transform 0.4s ease-out, opacity 0.4s ease-out;
      `;

      document.body.appendChild(dot);

      setTimeout(() => {
        dot.style.transform = 'scale(0.1)';
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 400);
      }, 50);
    });
  }


  // ==========================================================================
  // INITIALIZATION TRIGGER
  // ==========================================================================
  setTimeout(() => {
    runBootIntro();
    initPingMeter();
    initHotkeys();
    initScrollSonar();
    initTacticalCursor();
  }, 1200);

})();

// 1. AUDIO GENERATOR
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playBeep(frequency, type, duration) {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

document.addEventListener('mouseover', function (e) {
  if (e.target.closest('a, button')) playBeep(880, 'sine', 0.04);
});

document.addEventListener('click', function (e) {
  if (e.target.closest('a, button')) playBeep(440, 'triangle', 0.08);
});

// 2. HUD WIDGET CREATOR
function launchHUD() {
  if (document.getElementById('hud-tactical-widget')) return; // Avoid duplicates

  const hud = document.createElement('div');
  hud.id = 'hud-tactical-widget';
  hud.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: rgba(0, 15, 5, 0.95);
    border: 1px solid #00ff66;
    box-shadow: 0 0 15px rgba(0,255,102,0.4);
    color: #00ff66;
    font-family: monospace;
    font-size: 11px;
    padding: 10px 14px;
    z-index: 999999;
    border-radius: 4px;
  `;

  hud.innerHTML = `
    <div style="font-weight:bold; border-bottom:1px solid #00ff66; margin-bottom:5px; padding-bottom:3px;">
      [SYS_HUD // ONLINE]
    </div>
    <div>TIME: <span id="hud-clock">00:00:00 UTC</span></div>
    <div style="margin-top:6px;">
      <button id="hud-mode-toggle" style="background:#003311; border:1px solid #00ff66; color:#00ff66; font-family:monospace; cursor:pointer; font-size:10px; padding:2px 6px;">
        MODE: GREEN
      </button>
    </div>
  `;

  document.body.appendChild(hud);

  // UTC Clock
  setInterval(function () {
    const clockElem = document.getElementById('hud-clock');
    if (clockElem) {
      const now = new Date();
      clockElem.textContent = now.toUTCString().split(' ')[4] + ' UTC';
    }
  }, 1000);

  // Toggle Modes
  let currentMode = 0;
  const modes = [
    { name: 'GREEN', filter: 'none' },
    { name: 'RED ALERT', filter: 'hue-rotate(240deg) saturate(200%)' },
    { name: 'STEALTH', filter: 'grayscale(100%) brightness(70%)' }
  ];

  document.getElementById('hud-mode-toggle').addEventListener('click', function () {
    currentMode = (currentMode + 1) % modes.length;
    this.textContent = 'MODE: ' + modes[currentMode].name;
    document.documentElement.style.filter = modes[currentMode].filter;
    playBeep(currentMode === 1 ? 300 : 600, 'square', 0.12);
  });
}

// FORCE LAUNCH AFTER 1 SECOND
setTimeout(launchHUD, 1000);
/* ============================================================
   ERROR-FREE COCKPIT & SUBMARINE ENGINE
   ============================================================ */
mw.loader.using(['jquery']).then(function () {
    $(document).ready(function () {
        if ($('#global-cockpit-deck').length) return;

        var $deck = $('<div>', { id: 'global-cockpit-deck' });

        // Left Bay: Flight & Submarine Gauges
        var leftHTML = '<div class="gauge-casing" title="Attitude Indicator">' +
            '<div class="attitude-sphere"><div class="horizon-sky"></div><div class="horizon-ground"></div></div>' +
            '<div class="attitude-reticle"></div><div class="gauge-label">ATTITUDE</div></div>' +
            '<div class="gauge-casing" title="Active Sonar Sweep">' +
            '<div class="radar-housing"><div class="radar-grid"></div><div class="radar-sweep"></div></div>' +
            '<div class="gauge-label">SONAR</div></div>' +
            '<div class="gauge-casing" title="Depth Pressure Gauge">' +
            '<div class="meter-face"><div class="meter-needle"></div></div>' +
            '<div class="gauge-label">PRESSURE</div></div>';
            
            /* ==========================================================================
   UWAWAVERSE: COCKPIT MISSION CLOCK & CRT TERMINAL FLICKER
   ========================================================================== */
(function ($) {
  'use strict';

  $(document).ready(function () {
    // 1. Inject Live Mission Clock into Header
    var $header = $('.fandom-community-header__top-container, .fandom-community-header');
    
    if ($header.length) {
      var $clockContainer = $(
        '<div id="hud-mission-clock" style="' +
          'font-family: \'Courier New\', Consolas, monospace; ' +
          'font-size: 0.8em; ' +
          'color: #00ff66; ' +
          'text-shadow: 0 0 6px rgba(0, 255, 102, 0.8); ' +
          'background: rgba(0, 0, 0, 0.6); ' +
          'border: 1px solid #00ff66; ' +
          'padding: 4px 10px; ' +
          'margin-left: auto; ' +
          'letter-spacing: 1px; ' +
          'display: inline-block;' +
        '">[SYS_TIME: <span id="hud-clock-digits">00:00:00 UTC</span>]</div>'
      );

      $header.append($clockContainer);

      // Live UTC Clock Loop
      setInterval(function () {
        var now = new Date();
        var h = String(now.getUTCHours()).padStart(2, '0');
        var m = String(now.getUTCMinutes()).padStart(2, '0');
        var s = String(now.getUTCSeconds()).padStart(2, '0');
        $('#hud-clock-digits').text(h + ':' + m + ':' + s + ' UTC');
      }, 1000);
    }
    
    /* ==========================================================================
   UWAWAVERSE: SYNTHETIC TACTICAL SWITCH AUDIO (WEB AUDIO API)
   ========================================================================== */
(function ($) {
  'use strict';

  // 1. Initialize Web Audio Context on first user interaction
  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // 2. Synthesize a sharp, mechanical relay click
  function playTacticalClick() {
    var ctx = getAudioContext();
    if (!ctx) return;

    var now = ctx.currentTime;

    // Short metallic noise burst (relay snap)
    var bufferSize = ctx.sampleRate * 0.008; // 8ms snap
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var output = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    var noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // High-pass filter for crisp metallic click
    var filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);

    // Sharp gain envelope
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  // 3. Attach click handlers to links, buttons, and UI elements
  $(document).ready(function () {
    var selector = 'a, .wds-button, button, input[type="submit"], .portable-infobox, .tabber__tab';

    $(document).on('click', selector, function () {
      playTacticalClick();
    });
  });
})(jQuery);

    // 2. Add CRT Glitch / Telemetry Attributes to Main Headings
    $('.page-header__title, .page__main h1').addClass('hud-flicker-title');
  });
})(jQuery);

        var $leftBay = $('<div>', { class: 'cockpit-instrument-bay' }).html(leftHTML);

        // Center Bay: Telemetry Log
        var centerHTML = '<div class="deck-title">SUBMARINE & FLIGHT DECK CONSOLE</div>' +
            '<div class="deck-status-log" id="deck-log">ALL SYSTEMS NOMINAL // AUTOPILOT ENGAGED</div>' +
            '<div class="readout-row"><span><span class="led-dot led-green"></span>DEPTH: 4,200M</span>' +
            '<span><span class="led-dot led-orange"></span>SYNERGY: 98%</span></div>';

        var $centerBay = $('<div>', { class: 'cockpit-center-bay' }).html(centerHTML);

        // Right Bay: Interactive Switch Matrix
        var $rightBay = $('<div>', { class: 'cockpit-switch-bay' });
        var $matrix = $('<div>', { class: 'switch-matrix' });

        var systems = ['SHIELDS', 'THRUSTERS', 'SONAR', 'BALLAST', 'CATHODE', 'RADAR'];

        $.each(systems, function (i, sys) {
            var $btn = $('<button>', {
                class: 'cockpit-btn' + (i < 2 ? ' btn-active' : ''),
                text: sys
            }).on('click', function () {
                $(this).toggleClass('btn-active');
                var state = $(this).hasClass('btn-active') ? 'ONLINE' : 'DISENGAGED';
                $('#deck-log').text('COMMAND // ' + sys + ' ' + state);
            });
            $matrix.append($btn);
        });

        var $minBtn = $('<div>', { class: 'deck-minimize', text: '[ MINIMIZE ]' }).on('click', function () {
            $deck.toggleClass('minimized');
        });

        $rightBay.append($matrix, $minBtn);
        $deck.append($leftBay, $centerBay, $rightBay);

        $('body').append($deck);
    });
});/* Floating Tactical Color & Alpha Trigger */
$(document).ready(function() {
    // Wait for Visual Editor to initialize
    mw.hook('ve.activationComplete').add(function() {
        if ($('#tactical-floating-btn').length > 0) return; // Prevent duplicates

        var $btn = $('<button id="tactical-floating-btn">🎨 Color & Alpha</button>');
        
        $('body').append('<div id="cockpit-deck" style="position:fixed; bottom:15px; left:15px; width:280px; background:rgba(3,8,12,0.95); border:2px solid #ff5500; z-index:99999; font-family:monospace; padding:12px; box-shadow:0 0 20px rgba(255,85,0,0.3); color:#00ffcc;"><b>FORCED PANEL ONLINE</b></div>');
        
        /* Independent Tactical Floating Interface */
(function() {
    function injectFloatingTool() {
        if ($('#tactical-floating-btn').length > 0) return;

        // Only inject when the visual editor toolbar is present
        if ($('.ve-ui-toolbar').length === 0) return;

        var $btn = $('<button id="tactical-floating-btn" type="button">COLOR & ALPHA</button>');
        
        $btn.css({
            'position': 'fixed',
            'bottom': '25px',
            'right': '25px',
            'z-index': '999999',
            'background-color': '#111',
            'color': '#ff5500',
            'border': '2px solid #ff5500',
            'padding': '10px 14px',
            'font-family': 'monospace',
            'font-weight': 'bold',
            'cursor': 'pointer',
            'box-shadow': '0 0 15px rgba(255, 85, 0, 0.4)'
        });

        $btn.on('click', function(e) {
            e.preventDefault();
            var hex = prompt("Enter Tactical Hex Code (e.g. #ff5500):", "#ff5500");
            if (!hex) return;
            
            var alphaInput = prompt("Enter Transparency percentage (0 for solid, 50 for semi-transparent):", "0");
            if (alphaInput === null) return;
            
            var alpha = (100 - parseInt(alphaInput || 0)) / 100;

            try {
                var target = ve.init && ve.init.target ? ve.init.target : window.ve.init.target;
                var surface = target.getSurface();
                var fragment = surface.getModel().getFragment();
                
                var cleanHex = hex.replace('#', '');
                var r = parseInt(cleanHex.substring(0, 2), 16);
                var g = parseInt(cleanHex.substring(2, 4), 16);
                var b = parseInt(cleanHex.substring(4, 6), 16);
                var rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';

                fragment.annotate('set', new ve.dm.AttributeAnnotation({
                    type: 'textStyle/span',
                    attributes: { style: 'color: ' + rgbaColor + ';' }
                }));
            } catch(err) {
                console.error("Target execution error:", err);
                alert("Please ensure text is highlighted in the editor before applying formatting.");
            }
        });
        
        /* Use mw.hook to ensure it fires on initial load AND page transitions */
mw.hook('wikipage.content').add(function () {
    if ($('#global-cockpit-deck').length) return;

    var $deck = $('<div>', { id: 'global-cockpit-deck' });

    var leftHTML = '<div style="color:#00ffcc; font-weight:bold;">[ COCKPIT_INSTRUMENTS ]</div>';
    var $leftBay = $('<div>', { class: 'cockpit-instrument-bay' }).html(leftHTML);

    var centerHTML = '<div style="color:#ff5500;">SUBMARINE TERMINAL ONLINE</div>';
    var $centerBay = $('<div>', { class: 'cockpit-center-bay' }).html(centerHTML);

    $deck.append($leftBay, $centerBay);
    $('body').append($deck);
});

        $('body').append($btn);
    }

    // Run check continuously when editor state shifts
    setInterval(injectFloatingTool, 1000);
})();
        
        // Style the floating button directly
        $btn.css({
            'position': 'fixed',
            'bottom': '20px',
            'right': '20px',
            'z-index': '99999',
            'background-color': '#222',
            'color': '#00ff00',
            'border': '1px solid #551111',
            'padding': '10px 15px',
            'font-family': 'monospace',
            'cursor': 'pointer',
            'box-shadow': '0 0 10px rgba(0,0,0,0.5)'
        });

        // Action when clicked
        $btn.on('click', function(e) {
            e.preventDefault();
            var hex = prompt("Enter Tactical Hex Code (e.g. #ff5500):", "#ff5500");
            if (!hex) return;
            
            var alphaInput = prompt("Enter Transparency percentage (0 for opaque, 50 for semi-transparent):", "0");
            if (alphaInput === null) return;
            
            var alpha = (100 - parseInt(alphaInput || 0)) / 100;

            // Apply to active surface
            try {
                var surface = ve.init.target.getSurface();
                var fragment = surface.getModel().getFragment();
                
                var r = parseInt(hex.substring(1, 3), 16);
                var g = parseInt(hex.substring(3, 5), 16);
                var b = parseInt(hex.substring(5, 7), 16);
                var rgbaColor = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';

                fragment.annotate('set', new ve.dm.AttributeAnnotation({
                    type: 'textStyle/span',
                    attributes: { style: 'color: ' + rgbaColor + ';' }
                }));
            } catch(err) {
                console.log("Surface target error:", err);
            }
        });

        $('body').append($btn);
    });

    // Remove button when exiting editor
    mw.hook('ve.deactivationComplete').add(function() {
        $('#tactical-floating-btn').remove();
    });
});

/* ============================================================
   ERROR-FREE COCKPIT & SUBMARINE ENGINE
   ============================================================ */
mw.loader.using(['jquery']).then(function () {
    $(document).ready(function () {
        if ($('#global-cockpit-deck').length) return;

        var $deck = $('<div>', { id: 'global-cockpit-deck' });

        // Left Bay: Flight & Submarine Gauges
        var leftHTML = '<div class="gauge-casing" title="Attitude Indicator">' +
            '<div class="attitude-sphere"><div class="horizon-sky"></div><div class="horizon-ground"></div></div>' +
            '<div class="attitude-reticle"></div><div class="gauge-label">ATTITUDE</div></div>' +
            '<div class="gauge-casing" title="Active Sonar Sweep">' +
            '<div class="radar-housing"><div class="radar-grid"></div><div class="radar-sweep"></div></div>' +
            '<div class="gauge-label">SONAR</div></div>' +
            '<div class="gauge-casing" title="Depth Pressure Gauge">' +
            '<div class="meter-face"><div class="meter-needle"></div></div>' +
            '<div class="gauge-label">PRESSURE</div></div>';

        var $leftBay = $('<div>', { class: 'cockpit-instrument-bay' }).html(leftHTML);

        // Center Bay: Telemetry Log
        var centerHTML = '<div class="deck-title">SUBMARINE & FLIGHT DECK CONSOLE</div>' +
            '<div class="deck-status-log" id="deck-log">ALL SYSTEMS NOMINAL // AUTOPILOT ENGAGED</div>' +
            '<div class="readout-row"><span><span class="led-dot led-green"></span>DEPTH: 4,200M</span>' +
            '<span><span class="led-dot led-orange"></span>SYNERGY: 98%</span></div>';

        var $centerBay = $('<div>', { class: 'cockpit-center-bay' }).html(centerHTML);

        // Right Bay: Interactive Switch Matrix
        var $rightBay = $('<div>', { class: 'cockpit-switch-bay' });
        var $matrix = $('<div>', { class: 'switch-matrix' });

        var systems = ['SHIELDS', 'THRUSTERS', 'SONAR', 'BALLAST', 'CATHODE', 'RADAR'];

        $.each(systems, function (i, sys) {
            var $btn = $('<button>', {
                class: 'cockpit-btn' + (i < 2 ? ' btn-active' : ''),
                text: sys
            }).on('click', function () {
                $(this).toggleClass('btn-active');
                var state = $(this).hasClass('btn-active') ? 'ONLINE' : 'DISENGAGED';
                $('#deck-log').text('COMMAND // ' + sys + ' ' + state);
            });
            $matrix.append($btn);
        });

        var $minBtn = $('<div>', { class: 'deck-minimize', text: '[ MINIMIZE ]' }).on('click', function () {
            $deck.toggleClass('minimized');
        });

        $rightBay.append($matrix, $minBtn);
        $deck.append($leftBay, $centerBay, $rightBay);

        $('body').append($deck);
    });
});