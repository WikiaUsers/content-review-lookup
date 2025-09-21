/* MediaWiki:Gadget-potential-calculator.js
   Robust Potential Calculator - site-wide gadget
   Injects UI into any <div class="potential-calculator" data-coeff="..." data-offset="...">
*/
(function () {
  'use strict';

  function createUI(div) {
    if (!div || div.dataset._potInit === '1') return;
    div.dataset._potInit = '1';
    try {
      var lbl = div.querySelector('strong');
      if (!lbl) {
        lbl = document.createElement('strong');
        lbl.textContent = div.dataset.label || 'Potential Calculator';
        div.appendChild(lbl);
      }

      var ui = document.createElement('div');
      ui.className = 'potential-calculator-ui';
      ui.style.marginTop = '6px';

      var input = document.createElement('input');
      input.type = 'number';
      input.placeholder = 'Quality';
      input.style.width = '6em';
      input.style.marginRight = '6px';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Calculate';
      btn.style.marginRight = '6px';

      var out = document.createElement('span');
      out.style.display = 'inline-block';
      out.style.minWidth = '120px';
      out.style.marginLeft = '6px';
      out.textContent = '';

      btn.addEventListener('click', function () {
        var raw = input.value;
        if (raw === '' || raw.indexOf(',') !== -1 || raw.indexOf('.') !== -1) {
          out.textContent = 'Enter integer quality (no commas/decimals)';
          return;
        }
        var q = parseInt(raw, 10);
        if (isNaN(q) || q < 0) {
          out.textContent = 'Quality must be a non-negative integer';
          return;
        }
        var coeff = parseFloat(div.dataset.coeff);
        var offset = parseFloat(div.dataset.offset);
        if (isNaN(coeff)) coeff = -0.179;
        if (isNaN(offset)) offset = -12.1;
        var value = (q * coeff) + offset;
        var display = (Math.abs(value - Math.round(value)) < 1e-9) ? value.toString() : value.toFixed(3);
        out.textContent = 'Quality ' + q + ' → ' + display;
      });

      ui.appendChild(input);
      ui.appendChild(btn);
      ui.appendChild(out);

      div.appendChild(ui);
    } catch (e) {
      console.error('Potential Calc: createUI error', e);
    }
  }

  function scanAndInit() {
    try {
      var nodes = document.querySelectorAll('.potential-calculator');
      Array.prototype.forEach.call(nodes, function (div) {
        createUI(div);
      });
    } catch (e) {
      console.error('Potential Calc: scanAndInit error', e);
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(scanAndInit, 50);
  } else {
    document.addEventListener('DOMContentLoaded', scanAndInit);
    setTimeout(scanAndInit, 500);
  }

  try {
    var mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes && m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.matches && node.matches('.potential-calculator')) {
            createUI(node);
          } else if (node.querySelector) {
            var found = node.querySelector('.potential-calculator');
            if (found) createUI(found);
          }
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  } catch (e) {
    try {
      if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function () { scanAndInit(); });
      }
    } catch (e2) {}
  }

  window.__potCalcInit = scanAndInit;
})();