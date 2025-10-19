/* Any JavaScript here will be loaded for all users on every page load. */

/** 
 * Blasting Tubes Calculator 
 * Added globally via Common.js
 * Works only on page: Blasting_tubes
 */
(function () {
  if (typeof mw === 'undefined' || !mw.config) return;

  // Run only on this page
  if (mw.config.get('wgPageName') !== 'Blasting_tubes') return;

  document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('blasting_tubes-calculator-placeholder');
    if (!placeholder) return;

    // --- Create container ---
    const container = document.createElement('div');
    container.id = 'blasting-calculator';
    container.className = 'rr-calculator';

    const title = document.createElement('h3');
    title.textContent = 'Blasting Tubes Calculator';
    container.appendChild(title);

    // --- Input field ---
    const label = document.createElement('label');
    label.setAttribute('for', 'bt-amount');
    label.textContent = 'Enter amount:';
    container.appendChild(label);

    const amountInput = document.createElement('input');
    amountInput.id = 'bt-amount';
    amountInput.type = 'number';
    amountInput.min = '0';
    amountInput.placeholder = 'insert amount';
    container.appendChild(amountInput);

    // --- Grid layout ---
    const grid = document.createElement('div');
    grid.className = 'rr-grid';
    container.appendChild(grid);

    // Left side: per unit
    const leftDiv = document.createElement('div');
    const h4Per = document.createElement('h4');
    h4Per.textContent = 'Per tube (recipe)';
    leftDiv.appendChild(h4Per);

    const perUnitList = document.createElement('ul');
    perUnitList.id = 'per-unit-list';
    leftDiv.appendChild(perUnitList);
    grid.appendChild(leftDiv);

    // Right side: totals table
    const rightDiv = document.createElement('div');
    const h4Totals = document.createElement('h4');
    h4Totals.textContent = 'Totals';
    rightDiv.appendChild(h4Totals);

    const table = document.createElement('table');
    table.id = 'totals-table';
    table.className = 'rr-table';
    table.setAttribute('role', 'table');

    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Item</th><th>Per tube</th><th>Total</th></tr>';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    rightDiv.appendChild(table);

    // Reset button
    const actions = document.createElement('div');
    actions.className = 'rr-actions';
    const btnReset = document.createElement('button');
    btnReset.id = 'bt-reset';
    btnReset.textContent = 'Reset';
    actions.appendChild(btnReset);
    rightDiv.appendChild(actions);

    // Error message
    const errorBox = document.createElement('div');
    errorBox.id = 'bt-error';
    errorBox.className = 'rr-error';
    errorBox.setAttribute('aria-live', 'polite');
    rightDiv.appendChild(errorBox);

    grid.appendChild(rightDiv);

    // Replace placeholder with calculator
    placeholder.replaceWith(container);

    // --- Calculation logic ---
    const perUnit = {
      "Raw meat": 3,
      "Vial": 3,
      "Pot of water": 1,
      "Saltpeter": 3,
      "Vitriol": 5,
      "Mountain flour": 1,
      "Wrapper paper": 1,
      "Logs": 2
    };

    function fmt(n) {
      return Number.isInteger(n)
        ? n.toString()
        : parseFloat(n.toFixed(4)).toString();
    }

    function renderPerUnit() {
      perUnitList.innerHTML = '';
      for (const [name, value] of Object.entries(perUnit)) {
        const li = document.createElement('li');
        li.textContent = `${name}: ${value}`;
        perUnitList.appendChild(li);
      }
    }

    function calculateAndRender() {
      errorBox.textContent = '';
      const amt = Number(amountInput.value);
      if (!isFinite(amt) || amt <= 0) {
        tbody.innerHTML = '';
        return;
      }
      tbody.innerHTML = '';
      for (const [name, per] of Object.entries(perUnit)) {
        const total = per * amt;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${name}</td><td>${fmt(per)}</td><td>${fmt(total)}</td>`;
        tbody.appendChild(tr);
      }
    }

    function resetAll() {
      amountInput.value = '';
      tbody.innerHTML = '';
      errorBox.textContent = '';
    }

    // --- Event bindings ---
    amountInput.addEventListener('input', calculateAndRender);
    btnReset.addEventListener('click', resetAll);

    renderPerUnit();
  });
})();


/* === Combat Level Calculator === */
$(document).ready(function() {
  const placeholder = document.getElementById('combat_level-calculator-placeholder');
  if (!placeholder) return;

  const container = document.createElement('div');
  container.className = 'rr-calculator';
  container.id = 'combat-calculator';
  container.innerHTML = `
    <h3>Combat Level Calculator</h3>
    <div class="rr-grid">
      <div>
        <label>Attack: <input type="number" id="cl-attack" value="1" min="0" max=""></label>
        <label>Strength: <input type="number" id="cl-strength" value="1" min="0" max=""></label>
        <label>Defence: <input type="number" id="cl-defence" value="1" min="0" max=""></label>
        <label>Hitpoints: <input type="number" id="cl-hitpoints" value="10" min="0" max=""></label>
        <label>Range: <input type="number" id="cl-range" value="1" min="0" max=""></label>
        <label>Magic: <input type="number" id="cl-magic" value="1" min="0" max=""></label>
      </div>
    </div>
    <h4>Result:</h4>
    <div id="cl-result">—</div>
    <div id="cl-details"></div>
  `;

  placeholder.replaceWith(container);

  function calcCombatLevel() {
    const att = parseFloat($('#cl-attack').val()) || 0;
    const str = parseFloat($('#cl-strength').val()) || 0;
    const def = parseFloat($('#cl-defence').val()) || 0;
    const hp  = parseFloat($('#cl-hitpoints').val()) || 0;
    const rng = parseFloat($('#cl-range').val()) || 0;
    const mag = parseFloat($('#cl-magic').val()) || 0;

    const melee = Math.floor(0.32 * (att + str));
    const defence = Math.floor(0.27 * (def + hp));
    const ranged = Math.floor(0.32 * (1.5 * rng));
    const magic = Math.floor(0.32 * (1.5 * mag));

    let style = "melee";
    if (ranged >= melee && ranged >= magic) style = "ranged";
    else if (magic >= melee && magic >= ranged) style = "magic";

    const combat = 1 + defence + Math.max(melee, ranged, magic);

    $('#combat-calculator')
      .removeClass('melee ranged magic')
      .addClass(style);

    $('#cl-result').text(combat);
    $('#cl-details').text(
      `Main style: ${style.charAt(0).toUpperCase() + style.slice(1)}`
    );
  }

  // Update upon input
  $('#combat-calculator input').on('input', calcCombatLevel);

  // Default level 3 Combat
  calcCombatLevel();
});