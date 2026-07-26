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
// ✅ 60fps buttery-smooth movement
function updateCockpitHUD() {
  if (hudPanel) {
    var x = getTargetX();
    hudPanel.style.left = x + 'px';
  }
  // ========================================================================
// UWAXVERSE: TRADINGVIEW-STYLE TACTICAL TERMINAL & COCKPIT
// ========================================================================
(function (mw, $) {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

// ========================================================================
// UWAWVERSE: IN-HUD TACTICAL TERMINAL INJECTOR
// ========================================================================
(function (mw, $) {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // ========================================================================
  // 1. UWAX STOCK MARKET DATA & TRADINGVIEW ENGINE
  // ========================================================================
  var stocks = {
    'CATX': { name: 'Cathematics Ltd.', price: 142.50, volatility: 0.02, history: [138, 140, 139, 142, 141, 143, 142.5] },
    'LUFF': { name: 'Luffy Fluff Tech', price: 890.10, volatility: 0.05, history: [870, 875, 882, 880, 888, 885, 890.1] },
    'FROGS': { name: 'Tea House Amphibians', price: 45.20, volatility: 0.08, history: [42, 43, 41, 44, 43.5, 45, 45.2] },
    'UWAV': { name: 'Uwawverse Core Systems', price: 2300.00, volatility: 0.01, history: [2280, 2290, 2285, 2295, 2305, 2298, 2300] },
    'CROAK': { name: 'Overflow Bio-Labs', price: 12.80, volatility: 0.12, history: [11.5, 12, 11.8, 12.5, 12.2, 12.7, 12.8] }
  };

  var activeSymbol = 'CATX';

  window.renderTradingTerminalHTML = function () {
    var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000);
    var portfolio = JSON.parse(localStorage.getItem('uwaw_portfolio') || '{}');
    var stock = stocks[activeSymbol];
    var owned = portfolio[activeSymbol] || 0;

    var html = `
      <div style="display: flex; flex-direction: column; height: 100%; font-family: monospace; color: #00ffcc; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; background: #040810; padding: 10px 15px; border-bottom: 1px solid #00ffcc44; border-radius: 6px 6px 0 0;">
          <div>
            <span style="color: #8899a6; font-size: 11px;">LIQUID CAPITAL:</span>
            <strong style="color: #00ffcc; font-size: 1.1rem; margin-left: 8px;">₡${wallet.toLocaleString('en-US', {minimumFractionDigits:2})}</strong>
          </div>
          <div>
            <span style="color: #8899a6; font-size: 11px;">ACTIVE FEED:</span>
            <strong style="color: #00ff66; font-size: 1.1rem; margin-left: 8px;">${activeSymbol} (${stock.name})</strong>
          </div>
        </div>

        <div style="display: flex; flex: 1; min-height: 380px; background: #050a14;">
          <div style="width: 210px; border-right: 1px solid #00ffcc33; padding: 10px; overflow-y: auto; background: #040812;">
            <div style="font-size: 10px; color: #8899a6; margin-bottom: 8px; letter-spacing: 1px;">MARKET WATCH</div>
    `;

    Object.keys(stocks).forEach(function (sym) {
      var s = stocks[sym];
      var isSelected = sym === activeSymbol;
      var bgStyle = isSelected ? 'background: rgba(0,255,204,0.15); border-color: #00ffcc;' : 'background: rgba(0,255,204,0.02); border-color: rgba(0,255,204,0.1);';
      
      html += `
        <div onclick="switchActiveStock('${sym}')" style="${bgStyle} border: 1px solid; padding: 8px; margin-bottom: 6px; border-radius: 4px; cursor: pointer;">
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 11px;">
            <span>${sym}</span>
            <span style="color: #00ff66;">₡${s.price.toFixed(2)}</span>
          </div>
          <div style="font-size: 9px; color: #8899a6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s.name}</div>
        </div>
      `;
    });

    html += `
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; padding: 12px; background: #050b16;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; background: rgba(0,255,204,0.03); padding: 8px 12px; border: 1px solid #00ffcc22; border-radius: 4px;">
              <div>
                <span style="font-size: 1.4rem; font-weight: bold; color: #00ffcc;">₡${stock.price.toFixed(2)}</span>
                <span style="font-size: 11px; color: #00ff66; margin-left: 10px;">▲ VOLATILITY: ${(stock.volatility * 100).toFixed(1)}%</span>
              </div>
              <div style="font-size: 11px; color: #8899a6;">
                SHARES OWNED: <strong style="color: #00ffcc;">${owned}</strong>
              </div>
            </div>

            <div style="flex: 1; background: #03060c; border: 1px solid #00ffcc33; border-radius: 4px; position: relative; min-height: 180px; display: flex; align-items: center; justify-content: center;">
              <canvas id="uwax-tv-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 12px;">
              <button onclick="tradeStock('${activeSymbol}', 'buy')" style="flex: 1; background: #00ffcc; color: #050a14; border: none; padding: 10px; font-weight: bold; font-family: monospace; cursor: pointer; border-radius: 4px; font-size: 12px; box-shadow: 0 0 10px rgba(0,255,204,0.4);">BUY 1 SHARE</button>
              <button onclick="tradeStock('${activeSymbol}', 'sell')" style="flex: 1; background: transparent; border: 1px solid #ff3366; color: #ff3366; padding: 10px; font-weight: bold; font-family: monospace; cursor: pointer; border-radius: 4px; font-size: 12px;">SELL 1 SHARE</button>
            </div>
          </div>
        </div>
      </div>
    `;
    return html;
  };

  window.drawTradingChart = function () {
    var canvas = document.getElementById('uwax-tv-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 400;
    canvas.height = canvas.parentElement.clientHeight || 180;

    var history = stocks[activeSymbol].history;
    var min = Math.min.apply(null, history) * 0.99;
    var max = Math.max.apply(null, history) * 1.01;
    var range = max - min || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.05)';
    ctx.lineWidth = 1;
    for (var x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (var y = 0; y < canvas.height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 2;
    var stepX = canvas.width / (history.length - 1 || 1);
    for (var i = 0; i < history.length; i++) {
      var px = i * stepX;
      var py = canvas.height - ((history[i] - min) / range) * (canvas.height - 20) - 10;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  };

  window.switchActiveStock = function (sym) {
    activeSymbol = sym;
    var body = document.getElementById('uwax-terminal-body-content');
    if (body) {
      body.innerHTML = window.renderTradingTerminalHTML();
      window.drawTradingChart();
    }
  };

  window.tradeStock = function (symbol, action) {
    var stock = stocks[symbol];
    var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000);
    var portfolio = JSON.parse(localStorage.getItem('uwaw_portfolio') || '{}');
    var owned = portfolio[symbol] || 0;

    if (action === 'buy') {
      if (wallet < stock.price) { alert('Insufficient capital!'); return; }
      wallet -= stock.price;
      portfolio[symbol] = owned + 1;
    } else if (action === 'sell') {
      if (owned <= 0) { alert('You do not own any shares of ' + symbol); return; }
      wallet += stock.price;
      portfolio[symbol] = owned - 1;
    }

    localStorage.setItem('uwaw_wallet_balance', wallet.toFixed(2));
    localStorage.setItem('uwaw_portfolio', JSON.stringify(portfolio));

    var body = document.getElementById('uwax-terminal-body-content');
    if (body) {
      body.innerHTML = window.renderTradingTerminalHTML();
      window.drawTradingChart();
    }
  };

  window.launchUwaxMarket = function () {
    var existing = document.getElementById('uwax-tv-modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'uwax-tv-modal-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(6px);
      z-index: 2147483647; display: flex; align-items: center; justify-content: center;
    `;

    overlay.innerHTML = `
      <div style="background:#060b18; border:2px solid #00ffcc; border-radius:8px; width:680px; max-width:92%; height:460px; display:flex; flex-direction:column; box-shadow:0 0 35px rgba(0,255,204,0.4); position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:center; background: #040810; border-bottom:1px solid #00ffcc44; padding:10px 15px; border-radius: 6px 6px 0 0;">
          <h2 style="margin:0; color:#00ffcc; font-family:monospace; font-size:1.1rem; letter-spacing:1px;">📈 UWAX TRADINGVIEW TACTICAL TERMINAL</h2>
          <button id="close-uwax-modal-btn" style="background:none; border:1px solid #ff3366; color:#ff3366; font-weight:bold; cursor:pointer; padding:3px 8px; border-radius:3px; font-family:monospace;">✕</button>
        </div>
        <div id="uwax-terminal-body-content" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
          ${window.renderTradingTerminalHTML()}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.getElementById('close-uwax-modal-btn').onclick = function() { overlay.remove(); };
    setTimeout(window.drawTradingChart, 50);
  };

  // ========================================================================
  // 2. INJECT BUTTON DIRECTLY INTO YOUR WIKI HEADER / SUBMARINE HUD
  // ========================================================================
  function injectHudMarketButton() {
    if (document.getElementById('hud-uwax-trigger-btn')) return;

    // Target your wiki header title area (e.g. right next to "Uwawaverse (V2) Wiki")
    var targetHeader = document.querySelector('.mw-page-title-main, #firstHeading, h1');
    if (!targetHeader) return;

    var btn = document.createElement('button');
    btn.id = 'hud-uwax-trigger-btn';
    btn.style.cssText = `
      background: rgba(0, 255, 204, 0.2) !important;
      color: #00ffcc !important;
      border: 1px solid #00ffcc !important;
      padding: 5px 12px !important;
      font-family: monospace !important;
      font-size: 11px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      border-radius: 4px !important;
      margin-left: 15px !important;
      vertical-align: middle !important;
      box-shadow: 0 0 10px rgba(0, 255, 204, 0.4) !important;
    `;
    btn.innerHTML = '📈 OPEN UWAX TERMINAL';
    btn.onclick = function () {
      window.launchUwaxMarket();
    };

    targetHeader.appendChild(btn);
  }

  setInterval(injectHudMarketButton, 500);

})(mediaWiki, jQuery);
  // ========================================================================
// UWAWVERSE: KILL & REPLACE ENGINE
// ========================================================================
(function () {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  function killAndReplaceUI() {
    // 1. KILL FANDOM CONTAINERS
    var fandomSelectors = [
      '.global-navigation',
      '.fandom-community-header',
      '.fandom-sticky-header',
      '#rail-wrapper',
      '.page__right-rail',
      '.top-ads-container',
      '.bottom-ads-container',
      '.page-footer',
      '.global-footer',
      '.wds-global-navigation'
    ];

    fandomSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    });

    // 2. REPLACE WITH COCKPIT TOP BAR (If missing)
    if (!document.getElementById('uwaw-master-cockpit-bar')) {
      var topBar = document.createElement('div');
      topBar.id = 'uwaw-master-cockpit-bar';
      topBar.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: rgba(4, 15, 25, 0.98);
        border-bottom: 2px solid #00ffcc;
        padding: 8px 15px;
        box-sizing: border-box;
        font-family: monospace;
        z-index: 99999;
        position: sticky;
        top: 0;
        box-shadow: 0 2px 15px rgba(0, 255, 204, 0.3);
      `;

      topBar.innerHTML = `
        <!-- Left: Replacement Logo & Home Controls -->
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="/wiki/Main_Page" style="
            background: rgba(0, 255, 204, 0.15); color: #00ffcc; border: 1px solid #00ffcc;
            padding: 5px 12px; font-family: monospace; font-weight: bold; font-size: 11px;
            text-decoration: none; border-radius: 3px; display: inline-flex; align-items: center; gap: 6px;
            box-shadow: 0 0 8px rgba(0,255,204,0.4);
          ">🏠 [SYS_HOME]</a>
          
          <button id="replace-uwax-btn" style="
            background: rgba(0, 255, 204, 0.2); color: #00ffcc; border: 1px solid #00ffcc;
            padding: 5px 12px; font-family: monospace; font-weight: bold; font-size: 11px;
            cursor: pointer; border-radius: 3px; box-shadow: 0 0 8px rgba(0,255,204,0.4);
          ">📈 UWAX MARKET</button>
        </div>

        <!-- Right: Telemetry & Status -->
        <div style="display: flex; align-items: center; gap: 15px; font-size: 11px; color: #00ffcc;">
          <span>DECK_STATUS: <strong style="color: #00ff66;">ACTIVE</strong></span>
          <span id="cockpit-live-clock">UTC --:--:--</span>
        </div>
      `;

      // Prepend right to the very top of the page body
      document.body.insertBefore(topBar, document.body.firstChild);

      // Event listener for replacement market button
      document.getElementById('replace-uwax-btn').onclick = function () {
        if (typeof window.launchUwaxMarket === 'function') {
          window.launchUwaxMarket();
        } else {
          alert('UWAX Market module initializing...');
        }
      };
    }

    // Live clock update
    var clock = document.getElementById('cockpit-live-clock');
    if (clock) {
      var now = new Date();
      clock.textContent = 'UTC ' + now.toUTCString().split(' ')[4];
    }
  }

  // Run on aggressive interval to ensure replacement stands firm against reloads
  setInterval(killAndResurrectUI, 200);

  function killAndResurrectUI() {
    killAndReplaceUI();
    var main = document.querySelector('.main-container, .page, #content');
    if (main) {
      main.style.setProperty('margin', '0', 'important');
      main.style.setProperty('padding', '0', 'important');
      main.style.setProperty('width', '100%', 'important');
      main.style.setProperty('max-width', '100%', 'important');
      main.style.setProperty('background', 'transparent', 'important');
    }
  }
})();
  // ========================================================================
// PERSISTENT CLOSE, MINIMIZE & RE-OPEN CONTROLLER
// ========================================================================
(function () {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  var CONSOLE_ID = 'submarine-flight-deck-console';

  // 1. STATE READ/WRITE HELPERS
  window.isConsoleClosed = function () {
    return sessionStorage.getItem('uwaw_closed_' + CONSOLE_ID) === 'true';
  };

  // RE-OPEN ACTION (Used when clicking + or a launch button)
  window.reopenSubmarineConsole = function () {
    sessionStorage.setItem('uwaw_closed_' + CONSOLE_ID, 'false');
    sessionStorage.setItem('uwaw_minimized_' + CONSOLE_ID, 'false'); // Expand upon explicit launch
    
    var consoleBox = document.getElementById(CONSOLE_ID) || document.querySelector('.submarine-console, [class*="submarine"]');
    if (consoleBox) {
      consoleBox.style.display = 'block';
      consoleBox.classList.remove('console-minimized');
    }
  };

  // PERMANENT CLOSE ACTION
  window.closeSubmarineConsole = function () {
    sessionStorage.setItem('uwaw_closed_' + CONSOLE_ID, 'true');
    var consoleBox = document.getElementById(CONSOLE_ID) || document.querySelector('.submarine-console, [class*="submarine"]');
    if (consoleBox) {
      consoleBox.style.display = 'none';
    }
  };

  // 2. CONSOLE MANAGING LOOP
  function manageSubmarineConsole() {
    var consoleBox = document.getElementById(CONSOLE_ID) || document.querySelector('.submarine-console, [class*="submarine"]');
    if (!consoleBox) return;

    consoleBox.id = CONSOLE_ID; // Force consistent ID

    // If marked closed in sessionStorage, keep it hidden
    if (isConsoleClosed()) {
      consoleBox.style.display = 'none';
      return;
    } else {
      consoleBox.style.display = 'block';
    }

    // Read Minimized State
    var isMinimized = sessionStorage.getItem('uwaw_minimized_' + CONSOLE_ID) === 'true';
    if (isMinimized) {
      consoleBox.classList.add('console-minimized');
    } else {
      consoleBox.classList.remove('console-minimized');
    }

    // Attach Controls (Minimize + Close)
    if (!document.getElementById('console-header-controls')) {
      var controlGroup = document.createElement('div');
      controlGroup.id = 'console-header-controls';
      controlGroup.style.cssText = 'position: absolute; top: 6px; right: 10px; display: flex; gap: 6px; z-index: 10000;';

      // MINIMIZE / EXPAND TOGGLE
      var minBtn = document.createElement('button');
      minBtn.className = 'sub-min-toggle';
      minBtn.innerHTML = isMinimized ? '[ + ]' : '[ _ ]';
      minBtn.title = 'Minimize / Expand';

      minBtn.onclick = function (e) {
        e.stopPropagation();
        var currentlyMin = consoleBox.classList.contains('console-minimized');
        if (currentlyMin) {
          consoleBox.classList.remove('console-minimized');
          sessionStorage.setItem('uwaw_minimized_' + CONSOLE_ID, 'false');
          minBtn.innerHTML = '[ _ ]';
        } else {
          consoleBox.classList.add('console-minimized');
          sessionStorage.setItem('uwaw_minimized_' + CONSOLE_ID, 'true');
          minBtn.innerHTML = '[ + ]';
        }
      };

      // CLOSE BUTTON
      var closeBtn = document.createElement('button');
      closeBtn.className = 'sub-min-toggle';
      closeBtn.style.borderColor = '#ff3366';
      closeBtn.style.color = '#ff3366';
      closeBtn.innerHTML = '✕';
      closeBtn.title = 'Close Console';

      closeBtn.onclick = function (e) {
        e.stopPropagation();
        closeSubmarineConsole();
      };

      controlGroup.appendChild(minBtn);
      controlGroup.appendChild(closeBtn);
      consoleBox.style.position = 'relative';
      consoleBox.appendChild(controlGroup);
    }
  }

  setInterval(manageSubmarineConsole, 400);
})();
  // ========================================================================
// UWAWVERSE MODULE: WIDGET STATE PERSISTENCE (MINIMIZE MEMORY)
// ========================================================================
(function () {
  'use strict';

  // Safeguard for code editor
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // 1. HELPERS FOR SAVING & READING STATES
  window.setWidgetState = function (widgetId, state) {
    // state can be 'open', 'minimized', or 'closed'
    sessionStorage.setItem('uwaw_widget_' + widgetId, state);
  };

  window.getWidgetState = function (widgetId) {
    return sessionStorage.getItem('uwaw_widget_' + widgetId) || 'open'; // default to open
  };

  // 2. ENHANCED MODAL / POPUP ENGINE WITH STATE MEMORY
  window.openModalPersistent = function (widgetId, title, contentHTML) {
    var currentState = getWidgetState(widgetId);

    // If the user closed or minimized it on a previous page, respect that state!
    if (currentState === 'closed') {
      console.log('[HUD] Skipping widget load (' + widgetId + ') - User closed it on previous page.');
      return;
    }

    var existing = document.getElementById(widgetId);
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = widgetId;
    overlay.className = 'uwaw-modal-overlay' + (currentState === 'minimized' ? ' uwaw-minimized' : '');
    
    overlay.innerHTML = `
      <div class="uwaw-modal-box">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #00ffcc44; padding-bottom:8px; margin-bottom:12px;">
          <h2 style="margin:0; color:#00ffcc; font-size:1.1rem; font-family:monospace;">${title}</h2>
          <div style="display:flex; gap:8px;">
            <button class="uwaw-min-btn" title="Minimize" style="background:none; border:1px solid #00ffcc; color:#00ffcc; cursor:pointer; font-weight:bold; border-radius:3px;">_</button>
            <button class="uwaw-close-btn" title="Close" style="background:none; border:1px solid #ff3366; color:#ff3366; cursor:pointer; font-weight:bold; border-radius:3px;">✕</button>
          </div>
        </div>
        <div class="uwaw-modal-body" style="${currentState === 'minimized' ? 'display:none;' : 'display:block;'}">
          ${contentHTML}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // MINIMIZE TOGGLE ACTION
    var minBtn = overlay.querySelector('.uwaw-min-btn');
    var body = overlay.querySelector('.uwaw-modal-body');

    minBtn.onclick = function () {
      if (body.style.display === 'none') {
        body.style.display = 'block';
        overlay.classList.remove('uwaw-minimized');
        setWidgetState(widgetId, 'open');
      } else {
        body.style.display = 'none';
        overlay.classList.add('uwaw-minimized');
        setWidgetState(widgetId, 'minimized');
      }
    };
// ========================================================================
// SUBMARINE CONSOLE MINIMIZER ENGINE
// ========================================================================
(function () {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  function applyConsoleState() {
    // Find submarine console container
    var consoleBox = document.querySelector('.submarine-console, [class*="submarine"], [class*="flight-deck"]');
    
    // Fallback search by inner text if class names differ
    if (!consoleBox) {
      var allDivs = document.querySelectorAll('div');
      allDivs.forEach(function (d) {
        if (d.textContent.includes('SUBMARINE & FLIGHT DECK CONSOLE')) {
          consoleBox = d;
        }
      });
    }

    if (!consoleBox) return;

    // Read stored state from sessionStorage
    var isMinimized = sessionStorage.getItem('uwaw_sub_console_minimized') === 'true';

    if (isMinimized) {
      consoleBox.classList.add('console-minimized');
    } else {
      consoleBox.classList.remove('console-minimized');
    }

    // Add Minimize/Expand Toggle Button if missing
    if (!document.getElementById('sub-console-min-btn')) {
      var minBtn = document.createElement('button');
      minBtn.id = 'sub-console-min-btn';
      minBtn.className = 'sub-min-toggle';
      minBtn.innerHTML = isMinimized ? '[ + ] EXPAND CONSOLE' : '[ _ ] MINIMIZE';

      minBtn.onclick = function (e) {
        e.stopPropagation();
        var currentlyMin = consoleBox.classList.contains('console-minimized');

        if (currentlyMin) {
          consoleBox.classList.remove('console-minimized');
          sessionStorage.setItem('uwaw_sub_console_minimized', 'false');
          minBtn.innerHTML = '[ _ ] MINIMIZE';
        } else {
          consoleBox.classList.add('console-minimized');
          sessionStorage.setItem('uwaw_sub_console_minimized', 'true');
          minBtn.innerHTML = '[ + ] EXPAND CONSOLE';
        }

        if (typeof playSciFiBeep === 'function') playSciFiBeep(900, 'sine', 0.05);
      };

      // Inject button into top corner of console header
      consoleBox.style.position = 'relative';
      consoleBox.appendChild(minBtn);
    }
  }

  setInterval(applyConsoleState, 600);
})();
    // CLOSE ACTION
    var closeBtn = overlay.querySelector('.uwaw-close-btn');
    closeBtn.onclick = function () {
      overlay.remove();
      setWidgetState(widgetId, 'closed');
    };
  };
})();
  // ========================================================================
// FANDOM HEADER REPLACEMENT: TACTICAL FLIGHT DECK HEADER
// ========================================================================
(function () {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  function replaceFandomHeader() {
    // Target Fandom's header wrapper block
    var fandomNav = document.querySelector('.fandom-community-header__local-navigation, .fandom-community-header__main-container');
    if (!fandomNav) return;

    // 1. Hide original Fandom controls
    var innerFandomBtns = fandomNav.querySelectorAll('.wds-dropdown, .wds-button, .wiki-tools, .page-counter');
    innerFandomBtns.forEach(function (el) {
      el.style.display = 'none';
    });

    // 2. Build or update our custom Flight Deck Header
    if (document.getElementById('uwaw-flightdeck-topbar')) return;

    var replacementHeader = document.createElement('div');
    replacementHeader.id = 'uwaw-flightdeck-topbar';
    replacementHeader.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: rgba(4, 15, 25, 0.95);
      border: 1px solid #00ffcc;
      border-radius: 4px;
      padding: 6px 14px;
      margin-top: 6px;
      box-shadow: inset 0 0 10px rgba(0, 255, 204, 0.2), 0 0 12px rgba(0, 255, 204, 0.3);
      font-family: monospace;
      box-sizing: border-box;
    `;

    replacementHeader.innerHTML = `
      <!-- Left Controls: Page Navigation & Market -->
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #00ffcc; font-weight: bold; letter-spacing: 1px;">[SYS_NAV]</span>
        <button id="hdr-uwax-btn" style="
          background: rgba(0, 255, 204, 0.15); color: #00ffcc; border: 1px solid #00ffcc;
          padding: 4px 10px; font-family: monospace; font-weight: bold; font-size: 11px;
          cursor: pointer; border-radius: 3px; box-shadow: 0 0 6px rgba(0,255,204,0.4);
        ">📈 UWAX MARKET</button>
        <button id="hdr-drawer-btn" style="
          background: rgba(0, 255, 204, 0.15); color: #00ffcc; border: 1px solid #00ffcc;
          padding: 4px 10px; font-family: monospace; font-size: 11px; cursor: pointer; border-radius: 3px;
        ">📂 DIRECTORY</button>
      </div>

      <!-- Right Telemetry Status -->
      <div style="display: flex; align-items: center; gap: 15px; font-size: 11px; color: #00ffcc;">
        <span>SYS_STATUS: <strong style="color: #00ff66;">ONLINE</strong></span>
        <span>DEFENSES: <strong style="color: #00ffcc;">100%</strong></span>
        <span id="hdr-clock-display" style="opacity: 0.8;">UTC --:--:--</span>
      </div>
    `;

    // Append replacement directly into the header block
    fandomNav.appendChild(replacementHeader);

    // Event Listeners
    document.getElementById('hdr-uwax-btn').onclick = function () {
      if (typeof openModal === 'function' && typeof renderExtendedMarketHTML === 'function') {
        openModal('UWAX Stock Exchange Floor', renderExtendedMarketHTML());
      } else {
        alert('UWAX Market Module initializing...');
      }
    };

    document.getElementById('hdr-drawer-btn').onclick = function () {
      var drawer = document.getElementById('custom-nav-drawer');
      if (drawer) drawer.classList.toggle('drawer-open');
    };

    // Live Header Clock
    setInterval(function () {
      var clock = document.getElementById('hdr-clock-display');
      if (clock) {
        var now = new Date();
        clock.textContent = 'UTC ' + now.toUTCString().split(' ')[4];
      }
    }, 1000);
  }

  setInterval(replaceFandomHeader, 500);
})();
  // --- FORCE-INJECT UWAX BUTTON TO TOP HUD BAR ---
(function () {
  'use strict';

  function attachStockButton() {
    var topBar = document.getElementById('custom-standalone-shell') || document.getElementById('uwaw-hud-bar');
    if (!topBar) return;

    // Don't add duplicate buttons
    if (document.getElementById('uwax-global-top-btn')) return;
// ========================================================================
// SELF-CONTAINED UWAX STOCK MARKET ENGINE + KEYBIND FIX
// ========================================================================
(function () {
  'use strict';

  // 1. STOCK DATA & LOGIC
  var stocks = [
    { symbol: 'CATX', name: 'Cathematics Ltd.', price: 142.50, volatility: 0.02 },
    { symbol: 'LUFF', name: 'Luffy Fluff Tech', price: 890.10, volatility: 0.05 },
    { symbol: 'FROGS', name: 'Tea House Amphibians', price: 45.20, volatility: 0.08 },
    { symbol: 'UWAV', name: 'Uwawverse Core Systems', price: 2300.00, volatility: 0.01 },
    { symbol: 'CROAK', name: 'Overflow Bio-Labs', price: 12.80, volatility: 0.12 }
  ];

  window.renderMarketHTML = function () {
    var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000);
    var portfolio = JSON.parse(localStorage.getItem('uwaw_portfolio') || '{}');

    var html = `
      <div style="background:#050a14; padding:10px; border-radius:6px; margin-bottom:15px; border:1px solid #00ffcc44; color:#00ffcc; font-family:monospace;">
        BALANCE: <strong style="color:#00ffcc; font-size:1.2rem;">₡${wallet.toLocaleString('en-US', {minimumFractionDigits:2})}</strong>
      </div>
    `;

    stocks.forEach(function (s) {
      var delta = (Math.random() - 0.49) * (s.price * s.volatility);
      s.price = Math.max(0.5, s.price + delta);
      var colorStyle = delta >= 0 ? 'color:#00ff66;' : 'color:#ff3366;';
      var owned = portfolio[s.symbol] || 0;

      html += `
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,204,0.05); border:1px solid rgba(0,255,204,0.2); padding:10px; margin-bottom:8px; border-radius:4px; font-family:monospace;">
          <div>
            <strong style="color:#00ffcc; font-size:1.1rem;">${s.symbol}</strong> <small style="color:#aaa;">(${s.name})</small><br>
            <span style="${colorStyle} font-weight:bold;">₡${s.price.toFixed(2)}</span> | Owned: <strong style="color:#00ffcc;">${owned}</strong>
          </div>
          <div>
            <button onclick="tradeStock('${s.symbol}', ${s.price}, 'buy')" style="background:#00ffcc; color:#050a14; border:none; padding:5px 12px; font-weight:bold; cursor:pointer; border-radius:3px; margin-right:5px;">BUY</button>
            <button onclick="tradeStock('${s.symbol}', ${s.price}, 'sell')" style="background:none; border:1px solid #ff3366; color:#ff3366; padding:4px 10px; font-weight:bold; cursor:pointer; border-radius:3px;">SELL</button>
          </div>
        </div>
      `;
    });

    return html;
  };

  window.tradeStock = function(symbol, price, action) {
    var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000);
    var portfolio = JSON.parse(localStorage.getItem('uwaw_portfolio') || '{}');
    var owned = portfolio[symbol] || 0;

    if (action === 'buy') {
      if (wallet < price) { alert('Insufficient funds!'); return; }
      wallet -= price;
      portfolio[symbol] = owned + 1;
    } else if (action === 'sell') {
      if (owned <= 0) { alert('You do not own any shares of ' + symbol); return; }
      wallet += price;
      portfolio[symbol] = owned - 1;
    }

    localStorage.setItem('uwaw_wallet_balance', wallet.toFixed(2));
    localStorage.setItem('uwaw_portfolio', JSON.stringify(portfolio));
    
    var modalBody = document.getElementById('uwax-modal-body-content');
    if (modalBody) modalBody.innerHTML = window.renderMarketHTML();
  };

  // 2. POPUP MODAL CREATOR
  window.launchUwaxMarket = function () {
    var existing = document.getElementById('uwax-market-modal-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'uwax-market-modal-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(5px);
      z-index: 999999999; display: flex; align-items: center; justify-content: center;
    `;

    overlay.innerHTML = `
      <div style="background:#060b18; border:2px solid #00ffcc; border-radius:8px; width:500px; max-width:90%; padding:20px; box-shadow:0 0 25px rgba(0,255,204,0.4); position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #00ffcc44; padding-bottom:10px; margin-bottom:15px;">
          <h2 style="margin:0; color:#00ffcc; font-family:monospace; font-size:1.3rem;">📈 UWAX STOCK EXCHANGE FLOOR</h2>
          <button id="close-uwax-modal-btn" style="background:none; border:1px solid #ff3366; color:#ff3366; font-weight:bold; cursor:pointer; padding:3px 8px; border-radius:3px;">✕</button>
        </div>
        <div id="uwax-modal-body-content">
          ${window.renderMarketHTML()}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('close-uwax-modal-btn').onclick = function() {
      overlay.remove();
    };
  };

  // 3. INJECT GUARANTEED TRIGGER BUTTON
  function attachGuaranteedMarketBtn() {
    if (document.getElementById('guaranteed-uwax-trigger')) return;

    var btn = document.createElement('button');
    btn.id = 'guaranteed-uwax-trigger';
    btn.style.cssText = `
      position: fixed !important; top: 12px !important; right: 20px !important;
      z-index: 99999999 !important; background: #00ffcc !important; color: #050a14 !important;
      border: 2px solid #00ffcc !important; padding: 8px 16px !important; font-family: monospace !important;
      font-size: 13px !important; font-weight: bold !important; cursor: pointer !important;
      border-radius: 6px !important; box-shadow: 0 0 15px rgba(0, 255, 204, 0.8) !important;
    `;
    btn.innerHTML = '📈 UWAX MARKET';

    btn.onclick = function () {
      window.launchUwaxMarket();
    };

    document.body.appendChild(btn);
  }

  setInterval(attachGuaranteedMarketBtn, 800);

  // Safe Shortcut: Press 'Ctrl + Space' to open market anytime (No Shift conflicts)
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.ctrlKey && e.code === 'Space') {
      e.preventDefault();
      window.launchUwaxMarket();
    }
  });

})();
    var btn = document.createElement('button');
    btn.id = 'uwax-global-top-btn';
    btn.className = 'hud-nav-btn';
    btn.style.cssText = 'background: #00ffcc; color: #050a14; font-weight: bold; cursor: pointer; margin-left: 10px; border: none; padding: 4px 10px; border-radius: 4px;';
    btn.innerHTML = '📈 UWAX MARKET';

    btn.onclick = function () {
      if (typeof openModal === 'function' && typeof renderExtendedMarketHTML === 'function') {
        openModal('UWAX Stock Exchange Floor', renderExtendedMarketHTML());
      } else {
        alert('Stock Market engine loading... try clicking again in 1 second!');
      }
    };
    // ========================================================================
// TOTAL FANDOM DOM OBLITERATION & RE-ROOTING ENGINE
// ========================================================================
(function () {
  'use strict';

  // Safeguard: Don't run in editor mode unless testmode=1 is active
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // List of all native Fandom structural targets to terminate
  var fandomTargets = [
    '.global-navigation',
    '.fandom-community-header',
    '.fandom-sticky-header',
    '.wiki-page-header__rail',
    '#rail-wrapper',
    '.page__right-rail',
    '.top-ads-container',
    '.bottom-ads-container',
    '.fandom-community-header__background',
    '.render-wiki-recommendations',
    '.page-footer',
    '.global-footer',
    '.wds-global-navigation',
    '.community-header-wrapper'
  ];

  // 1. HARD REMOVAL FUNCTION
  function purgeFandomDOM() {
    fandomTargets.forEach(function (selector) {
      var elements = document.querySelectorAll(selector);
      elements.forEach(function (el) {
        el.remove(); // Completely deletes the element from browser memory
      });
    });

    // Strip margin/padding overrides on Fandom's main structural wrappers
    var mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      mainContainer.style.cssText = 'margin: 0 !important; padding: 60px 20px 20px 20px !important; width: 100% !important; max-width: 100% !important; background: transparent !important;';
    }

    var resizablePage = document.querySelector('.page');
    if (resizablePage) {
      resizablePage.style.cssText = 'width: 100% !important; max-width: 100% !important; background: transparent !important;';
    }
  }

  // 2. MUTATION OBSERVER (Prevents Fandom JS from re-creating elements)
  var observer = new MutationObserver(function () {
    purgeFandomDOM();
  });

  // Start observing the whole document body instantly
  function armNuke() {
    purgeFandomDOM();
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', armNuke);
  } else {
    armNuke();
  }
})();

    topBar.appendChild(btn);
  }

  // Check every half second until the top bar exists
  var interval = setInterval(function () {
    if (document.getElementById('custom-standalone-shell') || document.getElementById('uwaw-hud-bar')) {
      attachStockButton();
      clearInterval(interval);
    }
  }, 500);
})();
  // --- FANDOM UI OVERHAUL: COCKPIT OVERRIDE ---
(function () {
  'use strict';

  // 1. SAFEGUARD: Don't burn the PC down if we are editing in the browser
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    console.log('[HUD] Code editor detected. Pausing HUD loop to keep PC cool.');
    return;
  }

  // 2. DOM PURGE & STYLING INJECTION
  function overhaulInterface() {
    // Hide native Fandom distraction layers (Ads, Rail, Global Navigation)
    var elementsToNuke = [
      '.global-navigation',
      '.wiki-page-header__rail',
      '#rail-wrapper',
      '.page__right-rail',
      '.top-ads-container',
      '.bottom-ads-container',
      '.fandom-community-header__background'
    ];

    elementsToNuke.forEach(function (selector) {
      var node = document.querySelector(selector);
      if (node) node.style.display = 'none';
    });
    // --- COCKPIT CO-PILOT: LUFFY OVERLAY ---
(function () {
  'use strict';

  function spawnLuffy() {
    if (document.getElementById('hud-luffy-copilot')) return;

    // 1. Create Luffy Widget Container
    var luffy = document.createElement('div');
    luffy.id = 'hud-luffy-copilot';
    
    // Smooth GPU positioning
    luffy.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 30px;
      width: 90px;
      height: 90px;
      z-index: 999999;
      pointer-events: auto;
      cursor: pointer;
      transition: transform 0.2s ease-out;
      will-change: transform;
    `;

    // 2. Add fluffy cat SVG/Graphics
    luffy.innerHTML = `
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <!-- Ears -->
        <polygon points="25,35 15,10 40,25" fill="#111" />
        <polygon points="75,35 85,10 60,25" fill="#111" />
        <polygon points="27,32 20,15 37,25" fill="#ff9999" />
        <polygon points="73,32 80,15 63,25" fill="#ff9999" />
        
        <!-- Fluffy Head & Body -->
        <circle cx="50" cy="65" r="30" fill="#111" />
        <circle cx="50" cy="45" r="28" fill="#111" />
        
        <!-- Bright Tactical Eyes -->
        <ellipse cx="38" cy="42" rx="6" ry="8" fill="#ffeb3b" />
        <ellipse cx="62" cy="42" rx="6" ry="8" fill="#ffeb3b" />
        <ellipse cx="38" cy="42" rx="2" ry="6" fill="#000" />
        <ellipse cx="62" cy="42" rx="2" ry="6" fill="#000" />
        
        <!-- Nose & Whiskers -->
        <polygon points="50,48 47,52 53,52" fill="#ff9999" />
        <line x1="25" y1="48" x2="5" y2="45" stroke="#444" stroke-width="2" />
        <line x1="25" y1="52" x2="5" y2="55" stroke="#444" stroke-width="2" />
        <line x1="75" y1="48" x2="95" y2="45" stroke="#444" stroke-width="2" />
        <line x1="75" y1="52" x2="95" y2="55" stroke="#444" stroke-width="2" />
      </svg>
    `;
    
    // ========================================================
// UWAWVERSE CORE TAKEOVER: SYSTEM OVERRIDE & UWAX EXCHANGE
// ========================================================
(function () {
  'use strict';

  // 1. SAFEMODE & EDITOR PROTECTOR
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // 2. STYLESHEET INJECTION (Cockpit Core + Stock Exchange Theme)
  function injectTakeoverStyles() {
    if (document.getElementById('uwawverse-theme')) return;
    var style = document.createElement('style');
    style.id = 'uwawverse-theme';
    style.textContent = `
      /* NUKE FANDOM DISTRACTIONS */
      .global-navigation, #rail-wrapper, .page__right-rail, 
      .top-ads-container, .bottom-ads-container, .fandom-community-header__background,
      .fandom-sticky-header, .render-wiki-recommendations { display: none !important; }

      /* FULLSCREEN CANVAS OVERRIDE */
      body { background: #050811 !important; color: #00ffcc !important; font-family: monospace !important; }
      .main-container { margin: 0 !important; width: 100% !important; max-width: 100% !important; background: transparent !important; }
      .page-content { background: rgba(10, 15, 30, 0.85) !important; border: 1px solid #00ffcc33; padding: 20px; border-radius: 8px; }

      /* TACTICAL HUD TOP BAR */
      #uwaw-hud-bar {
        position: fixed; top: 0; left: 0; width: 100%; height: 42px;
        background: #080c18; border-bottom: 2px solid #00ffcc;
        display: flex; align-items: center; justify: space-between;
        padding: 0 20px; z-index: 999999; box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
      }
      .hud-nav-btn {
        background: #00ffcc22; color: #00ffcc; border: 1px solid #00ffcc;
        padding: 4px 12px; margin-right: 10px; cursor: pointer; border-radius: 4px;
        font-weight: bold; font-family: monospace; transition: all 0.2s;
      }
      .hud-nav-btn:hover { background: #00ffcc; color: #050811; box-shadow: 0 0 10px #00ffcc; }

      /* CUSTOM POPUP / MODAL SYSTEM */
      .uwaw-modal-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.85); display: flex; align-items: center;
        justify-content: center; z-index: 1000000; backdrop-filter: blur(5px);
      }
      .uwaw-modal-box {
        background: #0a0f1d; border: 2px solid #00ffcc; width: 550px; max-width: 90%;
        padding: 24px; border-radius: 8px; box-shadow: 0 0 30px rgba(0, 255, 204, 0.3);
      }

      /* UWAX STOCK MARKET WIDGET */
      .stock-ticker-card {
        background: #0d1424; border: 1px solid #00ffcc44; border-radius: 6px;
        padding: 12px; margin: 10px 0; display: flex; justify-content: space-between; align-items: center;
      }
      .stock-up { color: #00ff66; }
      .stock-down { color: #ff3366; }
    `;
    document.head.appendChild(style);
  }

  // 3. TOP HUD NAVBAR INJECTION
  function createHUDHeader() {
    if (document.getElementById('uwaw-hud-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'uwaw-hud-bar';
    bar.innerHTML = `
      <div>
        <span style="letter-spacing:2px; font-weight:bold; margin-right:20px;">🛸 UWAWVERSE HUD</span>
        <button class="hud-nav-btn" id="btn-open-market">📈 UWAX MARKET</button>
        <button class="hud-nav-btn" id="btn-custom-alert">⚡ COCKPIT ALERT</button>
      </div>
      <div id="hud-credits-display">CREDITS: 1,000 ₡</div>
    `;
    document.body.appendChild(bar);

    document.getElementById('btn-open-market').onclick = function() {
      openModal('UWAX Stock Exchange', renderMarketHTML());
    };

    document.getElementById('btn-custom-alert').onclick = function() {
      openModal('SYSTEM WARNING', '<h3 style="color:#ff3366;">⚠️ HYPERDRIVE FLUID LOW</h3><p>Co-pilot Luffy demands treats before jumping to lightspeed.</p>');
    };
  }

  // 4. CUSTOM MODAL / POP-UP ENGINE
  window.openModal = function (title, contentHTML) {
    var existing = document.getElementById('uwaw-active-modal');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'uwaw-active-modal';
    overlay.className = 'uwaw-modal-overlay';
    overlay.innerHTML = `
      <div class="uwaw-modal-box">
        <div style="display:flex; justify-space-between; align-items:center; border-bottom:1px solid #00ffcc44; padding-bottom:10px; margin-bottom:15px;">
          <h2 style="margin:0; color:#00ffcc; font-size:1.2rem;">${title}</h2>
          <button id="close-uwaw-modal" style="background:none; border:none; color:#ff3366; font-size:1.5rem; cursor:pointer;">✕</button>
        </div>
        <div class="uwaw-modal-body">${contentHTML}</div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('close-uwaw-modal').onclick = function () { overlay.remove(); };
  };

  // 5. UWAWVERSE STOCK MARKET SIMULATOR (UWAX)
  var stocks = [
    { symbol: 'CATX', name: 'Cathematics Ltd.', price: 142.50, change: 3.2 },
    { symbol: 'LUFF', name: 'Luffy Fluff Tech', price: 890.10, change: 12.8 },
    { symbol: 'FROGS', name: 'Tea House Amphibians', price: 45.20, change: -1.4 },
    { symbol: 'UWAV', name: 'Uwawverse Core Systems', price: 2300.00, change: 0.5 }
  ];

  function renderMarketHTML() {
    var html = '<p>Live UWAX Market Feed (Auto-ticks every frame):</p>';
    stocks.forEach(function (s) {
      // Simulate micro-fluctuations
      var delta = (Math.random() - 0.48) * 2;
      s.price = Math.max(1, s.price + delta);
      s.change = delta;
      var colorClass = s.change >= 0 ? 'stock-up' : 'stock-down';
      var sign = s.change >= 0 ? '+' : '';
// ========================================================================
// UWAWVERSE OVERHAUL: PERSISTENT TRADING FLOOR + RADAR HUD MODULE
// ========================================================================
(function () {
  'use strict';

  // 1. SAFEMODE & CODE EDITOR SAFEGUARD
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // 2. PERSISTENT WALLET & PORTFOLIO ENGINE (localStorage)
  var STORAGE_KEY_WALLET = 'uwaw_wallet_balance';
  var STORAGE_KEY_PORTFOLIO = 'uwaw_portfolio';

  function getWallet() {
    var saved = localStorage.getItem(STORAGE_KEY_WALLET);
    return saved !== null ? parseFloat(saved) : 1000.00; // Default 1,000 ₡
  }

  function setWallet(amount) {
    localStorage.setItem(STORAGE_KEY_WALLET, amount.toFixed(2));
    updateWalletDisplay();
  }

  function getPortfolio() {
    var saved = localStorage.getItem(STORAGE_KEY_PORTFOLIO);
    return saved ? JSON.parse(saved) : { CATX: 0, LUFF: 0, FROGS: 0, UWAV: 0 };
  }

  function setPortfolio(portfolio) {
    localStorage.setItem(STORAGE_KEY_PORTFOLIO, JSON.stringify(portfolio));
  }

  function updateWalletDisplay() {
    var display = document.getElementById('hud-credits-display');
    if (display) {
      display.textContent = 'CREDITS: ' + getWallet().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₡';
    }
  }

  // 3. STYLESHEET INJECTION (HUD + RADAR + TRADING)
  function injectStyles() {
    if (document.getElementById('uwawverse-trading-styles')) return;
    var style = document.createElement('style');
    style.id = 'uwawverse-trading-styles';
    style.textContent = `
      /* RADAR CONTAINER */
      #hud-radar-box {
        position: relative; width: 38px; height: 38px;
        background: #040d1a; border: 1px solid #00ffcc; border-radius: 50%;
        margin-right: 15px; overflow: hidden; box-shadow: 0 0 8px rgba(0,255,204,0.4);
      }
      #hud-radar-canvas { width: 100%; height: 100%; display: block; }

      /* TRADING TICKER CARDS */
      .uwax-trade-card {
        background: #0a1124; border: 1px solid #00ffcc33; border-radius: 6px;
        padding: 12px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;
      }
      .uwax-btn {
        background: #00ffcc15; color: #00ffcc; border: 1px solid #00ffcc;
        padding: 4px 10px; margin-left: 5px; cursor: pointer; border-radius: 4px;
        font-weight: bold; font-family: monospace; transition: all 0.15s;
      }
      .uwax-btn:hover { background: #00ffcc; color: #050811; box-shadow: 0 0 8px #00ffcc; }
      .uwax-btn-sell { border-color: #ff3366; color: #ff3366; background: #ff336615; }
      .uwax-btn-sell:hover { background: #ff3366; color: #fff; box-shadow: 0 0 8px #ff3366; }
    `;
    document.head.appendChild(style);
  }
// ========================================================================
// FANDOM ENGINE NEUTRALIZER & CSS CANNIBAL
// ========================================================================
(function () {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // 1. NEUTRALIZE FANDOM GLOBAL OBJECTS & AD ENGINES
  try {
    if (window.fandom) window.fandom.config = {};
    if (window.Wikia) window.Wikia.adEngine = { init: function() {}, run: function() {} };
  } catch (e) {}

  // 2. HARD LIST OF FANDOM DOM NODES TO DESTROY
  var fandomKillList = [
    '.global-navigation',
    '.fandom-community-header',
    '.fandom-sticky-header',
    '.wiki-page-header__rail',
    '#rail-wrapper',
    '.page__right-rail',
    '.top-ads-container',
    '.bottom-ads-container',
    '.fandom-community-header__background',
    '.render-wiki-recommendations',
    '.page-footer',
    '.global-footer',
    '.wds-global-navigation',
    '.community-header-wrapper',
    '.fandom-community-header__local-navigation',
    '.fandom-community-header__main-container'
  ];

  function hardNukeFandom() {
    fandomKillList.forEach(function (selector) {
      var nodes = document.querySelectorAll(selector);
      nodes.forEach(function (node) {
        // Unmount & completely delete node from memory
        if (node && node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    });

    // Strip width bounds so your custom cockpit stretches 100%
    var mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      mainContainer.style.setProperty('margin', '0', 'important');
      mainContainer.style.setProperty('padding', '0', 'important');
      mainContainer.style.setProperty('width', '100%', 'important');
      mainContainer.style.setProperty('max-width', '100%', 'important');
      mainContainer.style.setProperty('background', 'transparent', 'important');
    }
  }
// ========================================================================
// FLOATING GUARANTEED UWAX STOCK MARKET TRIGGER
// ========================================================================
(function () {
  'use strict';

  function spawnFloatingMarketBtn() {
    if (document.getElementById('floating-uwax-trigger')) return;

    var btn = document.createElement('button');
    btn.id = 'floating-uwax-trigger';
    btn.style.cssText = `
      position: fixed !important;
      top: 15px !important;
      right: 20px !important;
      z-index: 99999999 !important;
      background: #00ffcc !important;
      color: #050a14 !important;
      border: 2px solid #00ffcc !important;
      padding: 8px 16px !important;
      font-family: monospace !important;
      font-size: 13px !important;
      font-weight: bold !important;
      cursor: pointer !important;
      border-radius: 6px !important;
      box-shadow: 0 0 15px rgba(0, 255, 204, 0.8) !important;
      transition: all 0.2s ease !important;
    `;
    btn.innerHTML = '📈 UWAX MARKET';

    btn.onclick = function () {
      if (typeof openModal === 'function' && typeof renderExtendedMarketHTML === 'function') {
        openModal('UWAX Stock Exchange Floor', renderExtendedMarketHTML());
      } else if (typeof openModalPersistent === 'function' && typeof renderExtendedMarketHTML === 'function') {
        openModalPersistent('uwax_market_popup', 'UWAX Stock Exchange Floor', renderExtendedMarketHTML());
      } else {
        alert('⚡ Stock Market Module Loading... Try clicking again in 1 second!');
      }
    };

    btn.onmouseover = function () {
      btn.style.transform = 'scale(1.08)';
      btn.style.boxShadow = '0 0 25px rgba(0, 255, 204, 1)';
    };

    btn.onmouseout = function () {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 0 15px rgba(0, 255, 204, 0.8)';
    };

    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', spawnFloatingMarketBtn);
  } else {
    spawnFloatingMarketBtn();
  }

  // Keep re-checking in case Fandom tries to clear body nodes
  setInterval(spawnFloatingMarketBtn, 1000);
})();
  // Run on tight loop to prevent Fandom's async loading scripts from re-injecting elements
  var killTimer = setInterval(hardNukeFandom, 100);

  // Stop aggressive loop after 5 seconds to save browser CPU
  setTimeout(function () {
    clearInterval(killTimer);
  }, 5000);

  // Re-arm on DOM updates
  if (document.body) {
    var observer = new MutationObserver(hardNukeFandom);
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
  // 4. COCKPIT RADAR CANVAS SCANNER
  function initCockpitRadar() {
    var container = document.getElementById('hud-radar-box');
    if (!container) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'hud-radar-canvas';
    canvas.width = 76;
    canvas.height = 76;
    container.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var angle = 0;

    // Simulated contact dots
    var blips = [
      { r: 18, a: 0.8 },
      { r: 28, a: 2.3 },
      { r: 12, a: 4.1 }
    ];

    function drawRadar() {
      ctx.clearRect(0, 0, 76, 76);

      // Radar Grid Circles
      ctx.strokeStyle = 'rgba(0, 255, 204, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(38, 38, 35, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(38, 38, 20, 0, Math.PI * 2); ctx.stroke();

      // Crosshairs
      ctx.beginPath(); ctx.moveTo(38, 3); ctx.lineTo(38, 73); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3, 38); ctx.lineTo(73, 38); ctx.stroke();

      // Rotating Radar Sweeper
      ctx.save();
      ctx.translate(38, 38);
      ctx.rotate(angle);
      ctx.fillStyle = 'rgba(0, 255, 204, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 35, 0, Math.PI / 3);
      ctx.fill();
      ctx.restore();

      // Blips / Contacts
      blips.forEach(function (b) {
        var bx = 38 + b.r * Math.cos(b.a);
        var by = 38 + b.r * Math.sin(b.a);
        ctx.fillStyle = '#00ffcc';
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      angle += 0.05;
      requestAnimationFrame(drawRadar);
    }

    drawRadar();
  }

  // 5. STOCKS MARKET DATA & TRADE EXECUTION
  var stocks = [
    { symbol: 'CATX', name: 'Cathematics Ltd.', price: 142.50, change: 0 },
    { symbol: 'LUFF', name: 'Luffy Fluff Tech', price: 890.10, change: 0 },
    { symbol: 'FROGS', name: 'Tea House Amphibians', price: 45.20, change: 0 },
    { symbol: 'UWAV', name: 'Uwawverse Core Systems', price: 2300.00, change: 0 }
  ];

  window.buyStock = function (symbol) {
    var stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    var wallet = getWallet();
    if (wallet < stock.price) {
      alert('⚠️ INSUFFICIENT CREDITS! Need ₡' + stock.price.toFixed(2));
      return;
    }

    setWallet(wallet - stock.price);
    var portfolio = getPortfolio();
    portfolio[symbol] = (portfolio[symbol] || 0) + 1;
    setPortfolio(portfolio);

    refreshTradeModal();
  };

  window.sellStock = function (symbol) {
    var stock = stocks.find(s => s.symbol === symbol);
    var portfolio = getPortfolio();

    if (!portfolio[symbol] || portfolio[symbol] <= 0) {
      alert('⚠️ NO SHARES TO SELL!');
      return;
    }

    setWallet(getWallet() + stock.price);
    portfolio[symbol] -= 1;
    setPortfolio(portfolio);

    refreshTradeModal();
  };

  function renderTradeMarketHTML() {
    var portfolio = getPortfolio();
    var wallet = getWallet();

    var html = '<div style="margin-bottom:15px; font-weight:bold; color:#00ffcc;">WALLET: ₡' + wallet.toLocaleString('en-US', { minimumFractionDigits: 2 }) + '</div>';

    stocks.forEach(function (s) {
      // Simulate live price drift
      var delta = (Math.random() - 0.48) * 1.8;
      s.price = Math.max(1, s.price + delta);
      s.change = delta;

      var colorStyle = s.change >= 0 ? 'color:#00ff66;' : 'color:#ff3366;';
      var owned = portfolio[s.symbol] || 0;

      html += `
        <div class="uwax-trade-card">
          <div>
            <strong>${s.symbol}</strong> <small style="opacity:0.7;">(${s.name})</small><br>
            <span style="${colorStyle}">₡${s.price.toFixed(2)}</span> | Owned: <strong style="color:#00ffcc;">${owned}</strong>
          </div>
          <div>
            <button class="uwax-btn" onclick="buyStock('${s.symbol}')">BUY</button>
            <button class="uwax-btn uwax-btn-sell" onclick="sellStock('${s.symbol}')">SELL</button>
          </div>
        </div>
      `;
    });

    return html;
  }

  function refreshTradeModal() {
    var modalBody = document.querySelector('#uwaw-active-modal .uwaw-modal-body');
    if (modalBody) {
      modalBody.innerHTML = renderTradeMarketHTML();
    }
  }

  // 6. INITIALIZATION & HUD MOUNT
  function init() {
    injectStyles();

    // Attach Radar to Top Bar if available
    var bar = document.getElementById('uwaw-hud-bar');
    if (bar && !document.getElementById('hud-radar-box')) {
      var radarBox = document.createElement('div');
      radarBox.id = 'hud-radar-box';
      bar.insertBefore(radarBox, bar.firstChild);
      initCockpitRadar();
    }

    updateWalletDisplay();
  }
  
  // ========================================================================
// UWAWVERSE SYSTEM HIJACK & ADVANCED UWAX MARKET ENGINE
// ========================================================================
(function () {
  'use strict';

  // 1. SAFEMODE & CODE EDITOR SAFEGUARD
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // ========================================================================
  // SYSTEM HIJACK: OVERRIDING FANDOM ENGINE & MEDIAWIKI NATIVES
  // ========================================================================

  // A. Hijack Page Title & Community Header Text dynamically
  function hijackPageTitles() {
    var originalTitle = document.title;
    document.title = "🛸 [UWAW-OS] " + originalTitle.replace(' | Fandom', '');

    var communityHeader = document.querySelector('.fandom-community-header__title');
    if (communityHeader) {
      communityHeader.innerHTML = '<span style="color:#00ffcc; text-shadow:0 0 10px #00ffcc;">UWAWVERSE COCKPIT TERMINAL</span>';
    }
  }

  // B. Hijack MediaWiki's Native Notification System (mw.notify)
  // Replaces default popups with glowing tactical HUD warnings!
  if (window.mw && mw.notify) {
    var originalNotify = mw.notify;
    mw.notify = function (message, options) {
      console.log('[HUD HIJACK] Intercepted Notification:', message);
      
      // Inject native toast styled with HUD colors
      var toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed; top: 60px; right: 20px; z-index: 1000000;
        background: #080c18; border: 1px solid #00ffcc; color: #00ffcc;
        padding: 12px 20px; font-family: monospace; border-radius: 4px;
        box-shadow: 0 0 15px rgba(0, 255, 204, 0.4); animation: hudToast 0.3s ease;
      `;
      toast.innerHTML = '⚡ <strong>[UWAW-SYSTEM]</strong> ' + message;
      document.body.appendChild(toast);

      setTimeout(() => { toast.remove(); }, 3500);
    };
  }

  // C. Hijack Links / Internal Wiki Router
  // Forces custom route links to open native HUD Modals without full page reloads!
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a');
    if (target && target.getAttribute('href')) {
      var href = target.getAttribute('href');
      if (href.includes('Special:UwawMarket') || href.includes('Special:UWAX')) {
        e.preventDefault();
        openModal('UWAX Stock Exchange Floor', renderExtendedMarketHTML());
      }
    }
  }, true);


  // ========================================================================
  // EXTENDED UWAX ECONOMY ENGINE (Shorting, Bank Loans & Events)
  // ========================================================================

  var STORAGE_KEY_LOAN = 'uwaw_bank_loan';
  
  function getLoan() {
    return parseFloat(localStorage.getItem(STORAGE_KEY_LOAN) || '0');
  }
  function setLoan(amt) {
    localStorage.setItem(STORAGE_KEY_LOAN, amt.toFixed(2));
  }

  // Expanded Stock List with Volatility Ratings
  var stocks = [
    { symbol: 'CATX', name: 'Cathematics Ltd.', price: 142.50, volatility: 0.02 },
    { symbol: 'LUFF', name: 'Luffy Fluff Tech', price: 890.10, volatility: 0.05 },
    { symbol: 'FROGS', name: 'Tea House Amphibians', price: 45.20, volatility: 0.08 },
    { symbol: 'UWAV', name: 'Uwawverse Core Systems', price: 2300.00, volatility: 0.01 },
    { symbol: 'CROAK', name: 'Overflow Bio-Labs', price: 12.80, volatility: 0.12 },
    { symbol: 'HYPER', name: 'Cockpit Drive Energy', price: 560.00, volatility: 0.04 }
  ];

  // Bank Loan Mechanics
  window.takeBankLoan = function () {
    var currentLoan = getLoan();
    if (currentLoan >= 5000) {
      mw.notify('Bank refused loan! Max debt limit reached (5,000 ₡).');
      return;
    }
    setLoan(currentLoan + 1000);
    localStorage.setItem('uwaw_wallet_balance', (parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000) + 1000).toFixed(2));
    mw.notify('Bank Loan Approved! +1,000 ₡ added to balance.');
    refreshModal();
  };

  window.payBankLoan = function () {
    var currentLoan = getLoan();
    var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 0);

    if (currentLoan <= 0) {
      mw.notify('You have no outstanding bank debt.');
      return;
    }
    if (wallet < 1000) {
      mw.notify('Need at least 1,000 ₡ to make a repayment.');
      return;
    }

    setLoan(Math.max(0, currentLoan - 1000));
    localStorage.setItem('uwaw_wallet_balance', (wallet - 1000).toFixed(2));
    mw.notify('Paid 1,000 ₡ towards bank loan.');
    refreshModal();
  };

  // Render Extended Market Interface
  function renderExtendedMarketHTML() {
    var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000);
    var loan = getLoan();
    var portfolio = JSON.parse(localStorage.getItem('uwaw_portfolio') || '{}');

    var html = `
      <div style="background:#050a14; padding:10px; border-radius:6px; margin-bottom:15px; border:1px solid #00ffcc44; display:flex; justify-content:space-between;">
        <div>WALLET: <strong style="color:#00ffcc;">₡${wallet.toLocaleString('en-US', {minimumFractionDigits:2})}</strong></div>
        <div>DEBT: <strong style="color:#ff3366;">₡${loan.toLocaleString('en-US', {minimumFractionDigits:2})}</strong></div>
      </div>
      <div style="margin-bottom:15px;">
        <button class="uwax-btn" onclick="takeBankLoan()">🏦 TAKE 1,000 ₡ LOAN</button>
        <button class="uwax-btn uwax-btn-sell" onclick="payBankLoan()">💳 PAY 1,000 ₡ DEBT</button>
      </div>
      <hr style="border-color:#00ffcc22; margin-bottom:15px;">
    `;

    stocks.forEach(function (s) {
      // Micro price swing based on volatility
      var delta = (Math.random() - 0.49) * (s.price * s.volatility);
      s.price = Math.max(0.5, s.price + delta);

      var colorStyle = delta >= 0 ? 'color:#00ff66;' : 'color:#ff3366;';
      var owned = portfolio[s.symbol] || 0;

      html += `
        <div class="uwax-trade-card">
          <div>
            <strong>${s.symbol}</strong> <small style="opacity:0.7;">(${s.name})</small><br>
            <span style="${colorStyle}">₡${s.price.toFixed(2)}</span> | Owned: <strong style="color:#00ffcc;">${owned}</strong>
          </div>
          <div>
            <button class="uwax-btn" onclick="buyStock('${s.symbol}')">BUY</button>
            <button class="uwax-btn uwax-btn-sell" onclick="sellStock('${s.symbol}')">SELL</button>
          </div>
        </div>
      `;
    });

    return html;
  }

  function refreshModal() {
    var modalBody = document.querySelector('#uwaw-active-modal .uwaw-modal-body');
    if (modalBody) modalBody.innerHTML = renderExtendedMarketHTML();
    var display = document.getElementById('hud-credits-display');
    if (display) {
      var wallet = parseFloat(localStorage.getItem('uwaw_wallet_balance') || 1000);
      display.textContent = 'CREDITS: ' + wallet.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' ₡';
    }
  }

  // Execute Hijack Phase
  function initHijack() {
    hijackPageTitles();
    
    // Inject market link directly onto Fandom's top header
    var headerNav = document.querySelector('.fandom-community-header__local-navigation');
    if (headerNav && !document.getElementById('hijacked-market-link')) {
      var navItem = document.createElement('li');
      navItem.id = 'hijacked-market-link';
      navItem.innerHTML = '<a href="/wiki/Special:UwawMarket" style="color:#00ffcc; font-weight:bold;">📈 UWAX EXCHANGE</a>';
      headerNav.appendChild(navItem);
    }
  }
  
  // --- NON-FANDOM CUSTOM SHELL & NAVIGATION OVERRIDE ---
(function () {
  'use strict';

  // Safeguard: Stop execution when using the browser code editor (prevents lag)
  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  function injectCustomShell() {
    if (document.getElementById('custom-standalone-shell')) return;

    // Create standalone header frame
    var header = document.createElement('header');
    header.id = 'custom-standalone-shell';
    header.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 48px;
      background: #050a14; border-bottom: 2px solid #00ffcc;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 20px; z-index: 9999999; box-shadow: 0 0 15px rgba(0, 255, 204, 0.3);
      font-family: monospace;
    `;

    var currentWikiName = mw.config.get('wgSiteName') || 'UWAWVERSE';

    header.innerHTML = `
      <div style="display:flex; align-items:center; gap:15px;">
        <a href="/wiki/Main_Page" style="color:#00ffcc; font-weight:bold; font-size:1.1rem; text-decoration:none;">
          🛸 ${currentWikiName} [OS MODE]
        </a>
        <a href="/wiki/Special:UwawMarket" style="color:#00ffcc; background:rgba(0,255,204,0.1); border:1px solid #00ffcc; padding:4px 10px; border-radius:4px; text-decoration:none;">
          📈 UWAX
        </a>
      </div>
      
      <div style="display:flex; align-items:center; gap:10px;">
        <!-- Custom Search Box -->
        <input type="text" id="custom-wiki-search" placeholder="SEARCH DATABASE..." style="
          background: #081020; border: 1px solid #00ffcc; color: #00ffcc;
          padding: 4px 10px; font-family: monospace; border-radius: 4px; outline: none;
        " />
        <button id="custom-search-btn" style="
          background: #00ffcc; color: #050a14; border: none; padding: 4px 12px;
          font-weight: bold; font-family: monospace; cursor: pointer; border-radius: 4px;
        ">GO</button>
      </div>
    `;

    document.body.prepend(header);

    // Search Execution
    function runSearch() {
      var query = document.getElementById('custom-wiki-search').value;
      if (query.trim() !== '') {
        window.location.href = '/wiki/Special:Search?search=' + encodeURIComponent(query);
      }
    }
// ========================================================================
// UWAWVERSE MODULE: WEB AUDIO SFX ENGINE & SLIDE-OUT TACTICAL DRAWER
// ========================================================================
(function () {
  'use strict';

  if (mw.config.get('wgAction') === 'edit' && window.location.href.indexOf('testmode=1') === -1) {
    return;
  }

  // ----------------------------------------------------------------------
  // 1. PURE CODE SCI-FI SOUND SYNTHESIZER (Web Audio API)
  // ----------------------------------------------------------------------
  var audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // High-tech beep for button clicks
  window.playSciFiBeep = function (freq = 880, type = 'sine', duration = 0.08) {
    try {
      initAudio();
      if (!audioCtx) return;

      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      // Frequency drop for tactile click feel
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Low volume (8%)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('[AUDIO SFX] Sound play blocked:', e);
    }
  };

  // Heavy cyber sweep sound for drawer opening
  window.playDrawerSweep = function () {
    try {
      initAudio();
      if (!audioCtx) return;

      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) {}
  };

  // ----------------------------------------------------------------------
  // 2. SLIDE-OUT TACTICAL DRAWER INJECTION
  // ----------------------------------------------------------------------
  function buildDrawer() {
    if (document.getElementById('custom-nav-drawer')) return;

    var drawer = document.createElement('div');
    drawer.id = 'custom-nav-drawer';
    drawer.innerHTML = `
      <div style="font-weight:bold; color:#00ffcc; border-bottom:1px solid #00ffcc44; padding-bottom:8px; margin-bottom:15px; letter-spacing:1px;">
        📂 SYSTEM DIRECTORY
      </div>
      <a href="/wiki/Main_Page" class="drawer-link">🏠 MAIN TERMINAL</a>
      <a href="/wiki/Special:UwawMarket" class="drawer-link">📈 UWAX MARKET</a>
      <a href="/wiki/Special:RecentChanges" class="drawer-link">⚡ RECENT LOGS</a>
      <a href="/wiki/Special:Random" class="drawer-link">🎲 RANDOM ENTRY</a>
      <a href="/wiki/Special:SpecialPages" class="drawer-link">🛠️ ALL UTILITIES</a>
    `;

    document.body.appendChild(drawer);

    // Attach sound triggers to all buttons/links
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.hud-nav-btn, .uwax-btn, .drawer-link, #custom-search-btn');
      if (btn) {
        playSciFiBeep(1200, 'sine', 0.06);
      }
    });
  }

  // Attach Toggle Button to Custom Top Bar
  function attachDrawerToggler() {
    var topBar = document.getElementById('custom-standalone-shell') || document.getElementById('uwaw-hud-bar');
    if (!topBar || document.getElementById('drawer-toggle-btn')) return;

    var toggleBtn = document.createElement('button');
    toggleBtn.id = 'drawer-toggle-btn';
    toggleBtn.className = 'hud-nav-btn';
    toggleBtn.style.marginRight = '10px';
    toggleBtn.innerHTML = '☰ MENU';

    toggleBtn.onclick = function () {
      var drawer = document.getElementById('custom-nav-drawer');
      if (drawer) {
        drawer.classList.toggle('drawer-open');
        playDrawerSweep();
      }
    };

    topBar.insertBefore(toggleBtn, topBar.firstChild);
  }

  function init() {
    buildDrawer();
    attachDrawerToggler();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
    document.getElementById('custom-search-btn').onclick = runSearch;
    document.getElementById('custom-wiki-search').onkeypress = function (e) {
      if (e.key === 'Enter') runSearch();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCustomShell);
  } else {
    injectCustomShell();
  }
})();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHijack);
  } else {
    initHijack();
  }
})();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
      html += `
        <div class="stock-ticker-card">
          <div>
            <strong>${s.symbol}</strong> <small>(${s.name})</small>
          </div>
          <div class="${colorClass}">
            ₡${s.price.toFixed(2)} (${sign}${s.change.toFixed(2)}%)
          </div>
        </div>
      `;
    });
    return html;
  }

  // 6. SPECIAL VIRTUAL PAGES (e.g., wiki.fandom.com/wiki/Special:UwawMarket)
  function handleSpecialPages() {
    var pageName = mw.config.get('wgPageName');
    if (pageName.indexOf('Special:UwawMarket') !== -1 || pageName.indexOf('Special:UWAX') !== -1) {
      document.title = "UWAX Stock Exchange | Uwawverse";
      var contentArea = document.querySelector('#mw-content-text') || document.body;
      contentArea.innerHTML = `
        <div style="margin-top:50px;">
          <h1>📈 UWAX — Uwawverse Central Stock Exchange</h1>
          <p>Welcome to the main trading floor. Buy, sell, and watch the markets tick live.</p>
          <div id="uwax-live-floor"></div>
        </div>
      `;
      
      setInterval(function() {
        var floor = document.getElementById('uwax-live-floor');
        if (floor) floor.innerHTML = renderMarketHTML();
      }, 2000);
    }
  }

  // INITIALIZE TAKEOVER
  function init() {
    injectTakeoverStyles();
    createHUDHeader();
    handleSpecialPages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

    document.body.appendChild(luffy);

    // 3. Interactive Purr / Bounce on Click
    luffy.addEventListener('click', function () {
      luffy.style.transform = 'scale(1.3) translateY(-10px)';
      setTimeout(function () {
        luffy.style.transform = 'scale(1) translateY(0)';
      }, 200);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', spawnLuffy);
  } else {
    spawnLuffy();
  }
})();

    // Make content container take up full screen space for our HUD overlay
    var mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      mainContainer.style.margin = '0';
      mainContainer.style.width = '100%';
      mainContainer.style.maxWidth = '100%';
    }
  }

  // Execute purge safely on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', overhaulInterface);
  } else {
    overhaulInterface();
  }
})();
  
  // --- PURE JS SMOOTH COCKPIT & MINIMIZE CONTROLLER ---
(function () {
  var isMinimized = false;

  // Smooth position tracking values
  var currentX = 0, currentY = 0;
  var targetX = 0, targetY = 0;

  // Pure JS Minimize animation state (1 = fully open, 0 = fully minimized)
  var currentScale = 1;
  var targetScale = 1;
  var currentOpacity = 1;
  var targetOpacity = 1;

  var cockpit = null;
  var toggleBtn = null;
  var animFrameId = null;

  function initCockpitHUD() {
    cockpit = document.querySelector('.middle-cockpit'); // Update selector if needed
    toggleBtn = document.querySelector('#cockpit-toggle-btn'); // Update selector if needed

    if (!cockpit) return;

    // Direct JS click listener for toggle button
    if (toggleBtn) {
      toggleBtn.onclick = function (e) {
        if (e) e.preventDefault();
        isMinimized = !isMinimized;

        // Set target values for pure JS transition
        targetScale = isMinimized ? 0 : 1;
        targetOpacity = isMinimized ? 0 : 1;
      };
    }

    // Single 60FPS Pure JS Rendering Loop
    function render() {
      // 1. Smooth Position Interpolation (Lerp 12%)
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      // 2. Smooth Minimize/Maximize Interpolation (Lerp 10%)
      currentScale += (targetScale - currentScale) * 0.10;
      currentOpacity += (targetOpacity - currentOpacity) * 0.10;

      // 3. Apply pure JS hardware-accelerated transform & opacity
      if (cockpit) {
        // Hide completely when scale hits ~0 to save CPU
        if (currentScale < 0.01) {
          cockpit.style.visibility = 'hidden';
        } else {
          cockpit.style.visibility = 'visible';
          cockpit.style.opacity = currentOpacity.toFixed(3);
          
          // Combines position + scale into ONE GPU-accelerated transform string!
          cockpit.style.transform = 
            'translate3d(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px, 0) ' +
            'scale(' + currentScale.toFixed(3) + ')';
        }
      }

      animFrameId = requestAnimationFrame(render);
    }

    // Ensure no duplicate loops are running
    if (animFrameId) cancelAnimationFrame(animFrameId);
    animFrameId = requestAnimationFrame(render);
  }

  // Position update function (call this from mousemove or gyro events)
  window.updateCockpitTarget = function (newX, newY) {
    targetX = newX;
    targetY = newY;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCockpitHUD);
  } else {
    initCockpitHUD();
  }
})();
  
// --- SMOOTH COCKPIT CONTROLLER ---
var currentX = 0, currentY = 0;
var targetX = 0, targetY = 0;
var cockpitPanel = null;

// Call this function whenever mouse/movement changes target coordinates
function updateTargetPos(newX, newY) {
  targetX = newX;
  targetY = newY;
}

// Liquid-smooth 60FPS Render Loop
function animateCockpit() {
  if (!cockpitPanel) {
    cockpitPanel = document.querySelector('.hud-cockpit-panel'); // Change to your cockpit element ID/class
  }

  if (cockpitPanel) {
    // LERP FORMULA: Smoothly glide 15% (0.15) toward target each frame
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    // GPU-accelerated transform (runs on graphics card for 0% lag)
    cockpitPanel.style.transform = 'translate3d(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px, 0)';
  }

  // Request next smooth screen refresh frame
  requestAnimationFrame(animateCockpit);
}

// Start the smooth animation engine
requestAnimationFrame(animateCockpit);
  
  // Requests the next smooth frame automatically
  requestAnimationFrame(updateCockpitHUD);
}

// Start the smooth animation loop
requestAnimationFrame(updateCockpitHUD);
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
  



} // <--- THIS CLOSES THE UNFINISHED BLOCK ABOVE IT!

// --- HOTKEY TRIGGER ('Shift' + 'L') ---
(function () {
  function handleLuffyHotkey(e) {
    if (!document.activeElement) return;
    var tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;

    if (e.shiftKey && e.key && e.key.toLowerCase() === 'l') {
      if (typeof triggerLuffySonar === 'function') {
        triggerLuffySonar();
      }
    }
  }

  document.removeEventListener('keydown', handleLuffyHotkey);
  document.addEventListener('keydown', handleLuffyHotkey);
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

    // --- ANIMATION INTERACTION LOOP ---
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