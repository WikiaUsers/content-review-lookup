// ========================================================================
// UWAWVERSE: HUD-LOCKED ISE STOCKS BUTTON
// ========================================================================
(function (mw, $) {
  'use strict';

  function initHudISE() {
    if (document.getElementById('uwaw-ise-hud-btn')) return;

    var style = document.createElement('style');
    style.innerHTML = `
      #uwaw-ise-hud-btn {
        background: rgba(1, 6, 14, 0.95) !important;
        border: 1px solid #00ffcc !important;
        color: #00ffcc !important;
        padding: 4px 10px !important;
        border-radius: 4px !important;
        font-family: 'Courier New', monospace !important;
        font-size: 11px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        margin-left: 10px !important;
        display: inline-block !important;
        z-index: 2147483647 !important;
        box-shadow: 0 0 10px rgba(0, 255, 204, 0.2) !important;
      }
      #uwaw-ise-hud-btn:hover {
        background: rgba(0, 255, 204, 0.3) !important;
      }

      #uwaw-ise-terminal {
        position: fixed !important; top: 80px !important; right: 20px !important;
        width: 340px !important; background: rgba(1, 6, 14, 0.98) !important;
        border: 1px solid #00ffcc88 !important; border-radius: 8px !important;
        padding: 12px !important; z-index: 2147483646 !important;
        font-family: 'Courier New', monospace !important; font-size: 10px !important;
        color: #00ffcc !important; box-shadow: 0 0 25px rgba(0, 255, 204, 0.2) !important;
        display: none;
      }

      .ise-header {
        display: flex !important; justify-content: space-between !important;
        border-bottom: 1px solid #00ffcc44 !important; padding-bottom: 6px !important; margin-bottom: 8px !important;
        font-weight: bold !important;
      }

      .ise-card {
        background: rgba(0, 255, 204, 0.03) !important; border: 1px solid #00ffcc33 !important;
        border-radius: 4px !important; padding: 8px !important; margin-bottom: 6px !important;
      }

      .ise-row { display: flex !important; justify-content: space-between !important; align-items: center !important; }
      .stock-up { color: #00ff66 !important; font-weight: bold; }
      .stock-down { color: #ff0055 !important; font-weight: bold; }

      .ise-sparkline {
        width: 100% !important; height: 24px !important; margin-top: 6px !important;
        background: rgba(0,0,0,0.3) !important; border-bottom: 1px dashed #00ffcc55 !important;
        position: relative !important; display: flex !important; align-items: flex-end !important; gap: 3px !important; padding: 2px !important;
        box-sizing: border-box !important;
      }
      .ise-bar { flex: 1 !important; background: #00ffcc66 !important; transition: height 0.3s ease; }

      .ise-tape {
        max-height: 50px !important; overflow-y: hidden !important; font-size: 8px !important;
        color: #8899a6 !important; border-top: 1px solid #00ffcc22 !important; margin-top: 6px !important; padding-top: 4px !important;
      }
    `;
    document.head.appendChild(style);

    // Terminal Modal Box
    var terminal = document.createElement('div');
    terminal.id = 'uwaw-ise-terminal';
    terminal.innerHTML = `
      <div class="ise-header">
        <span>📈 ISE TACTICAL EXCHANGE</span>
        <span style="color: #ffaa00;">FEED: ONLINE</span>
      </div>

      <div class="ise-card">
        <div class="ise-row">
          <span><b>LUFFY (LFY)</b> <span style="font-size: 8px; color: #8899a6;">RSI: 68.2</span></span>
          <span id="ise-lfy-price" class="stock-up">1,420.50 ₳</span>
        </div>
        <div class="ise-sparkline" id="spark-lfy">
          <div class="ise-bar" style="height: 40%;"></div>
          <div class="ise-bar" style="height: 55%;"></div>
          <div class="ise-bar" style="height: 45%;"></div>
          <div class="ise-bar" style="height: 70%;"></div>
          <div class="ise-bar" style="height: 60%;"></div>
          <div class="ise-bar" style="height: 85%;"></div>
        </div>
      </div>

      <div class="ise-card">
        <div class="ise-row">
          <span><b>FELSIA ORE (FLS)</b> <span style="font-size: 8px; color: #8899a6;">VOL: HIGH</span></span>
          <span id="ise-fls-price" class="stock-down">84.20 ₳</span>
        </div>
        <div class="ise-sparkline" id="spark-fls">
          <div class="ise-bar" style="height: 70%;"></div>
          <div class="ise-bar" style="height: 60%;"></div>
          <div class="ise-bar" style="height: 50%;"></div>
          <div class="ise-bar" style="height: 35%;"></div>
          <div class="ise-bar" style="height: 40%;"></div>
          <div class="ise-bar" style="height: 30%;"></div>
        </div>
      </div>

      <div class="ise-tape" id="ise-tape-feed">
        <div>[14:21:05] EXEC: 50 LFY @ 1,420.50 ₳ (BUY)</div>
        <div>[14:21:02] EXEC: 200 FLS @ 84.25 ₳ (SELL)</div>
      </div>
    `;
    document.body.appendChild(terminal);

    // Button
    var btn = document.createElement('button');
    btn.id = 'uwaw-ise-hud-btn';
    btn.textContent = '📈 ISE STOCKS';

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (terminal.style.display === 'none' || terminal.style.display === '') {
        terminal.style.display = 'block';
        btn.style.background = 'rgba(0, 255, 204, 0.3)';
      } else {
        terminal.style.display = 'none';
        btn.style.background = 'rgba(1, 6, 14, 0.95)';
      }
    });

    // Attach right into your custom "Uwawaverse (V2) Wiki" header bar title area
    var hudHeader = document.querySelector('.page-header__title, h1, #firstHeading');
    if (hudHeader) {
      hudHeader.appendChild(btn);
    } else {
      document.body.appendChild(btn);
    }

    // Market simulation loop
    let lfyP = 1420.50;
    let flsP = 84.20;

    setInterval(function() {
      if (terminal.style.display === 'block') {
        lfyP += (Math.random() - 0.47) * 4.2;
        flsP += (Math.random() - 0.53) * 1.5;

        var lfyEl = document.getElementById('ise-lfy-price');
        var flsEl = document.getElementById('ise-fls-price');

        if (lfyEl) {
          lfyEl.textContent = lfyP.toFixed(2) + ' ₳';
          lfyEl.className = Math.random() > 0.4 ? 'stock-up' : 'stock-down';
        }
        if (flsEl) {
          flsEl.textContent = flsP.toFixed(2) + ' ₳';
          flsEl.className = Math.random() > 0.5 ? 'stock-up' : 'stock-down';
        }

        var lfyBars = document.querySelectorAll('#spark-lfy .ise-bar');
        lfyBars.forEach(b => {
          var h = Math.floor(Math.random() * 60) + 20;
          b.style.height = h + '%';
        });

        var tape = document.getElementById('ise-tape-feed');
        if (tape && Math.random() > 0.6) {
          var d = new Date();
          var timeStr = d.toTimeString().split(' ')[0];
          var asset = Math.random() > 0.5 ? 'LFY' : 'FLS';
          var price = asset === 'LFY' ? lfyP.toFixed(2) : flsP.toFixed(2);
          var type = Math.random() > 0.5 ? 'BUY' : 'SELL';
          var color = type === 'BUY' ? '#00ff66' : '#ff0055';
          
          var div = document.createElement('div');
          div.style.color = color;
          div.textContent = `[${timeStr}] EXEC: 100 ${asset} @ ${price} ₳ (${type})`;
          tape.insertBefore(div, tape.firstChild);
          if (tape.children.length > 4) tape.removeChild(tape.lastChild);
        }
      }
    }, 2500);

  }

  if (mw && mw.hook) {
    mw.hook('wikipage.content').add(initHudISE);
  }

  $(document).ready(function() {
    initHudISE();
  });

})(mediaWiki, jQuery);