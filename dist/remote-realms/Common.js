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

    // --- Calculator HTML ---
    placeholder.innerHTML = `
      <div id="blasting-calculator" class="rr-calculator">
        <h3>Blasting Tubes Calculator</h3>
        <label for="bt-amount">Enter amount:</label>
        <input id="bt-amount" type="number" min="0" placeholder="insert amount" value="" />
        <div class="rr-grid">
          <div>
            <h4>Per tube (recipe)</h4>
            <ul id="per-unit-list"></ul>
          </div>
          <div>
            <h4>Totals</h4>
            <table id="totals-table" class="rr-table" role="table">
              <thead><tr><th>Item</th><th>Per tube</th><th>Total</th></tr></thead>
              <tbody></tbody>
            </table>
            <div class="rr-actions">
              <button id="bt-reset">Reset</button>
            </div>
            <div id="bt-error" class="rr-error" aria-live="polite"></div>
          </div>
        </div>
      </div>
    `;

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

    const amountInput = document.getElementById('bt-amount');
    const perUnitList = document.getElementById('per-unit-list');
    const totalsBody = document.querySelector('#totals-table tbody');
    const errorBox = document.getElementById('bt-error');
    const btnReset = document.getElementById('bt-reset');

    function fmt(n){return Number.isInteger(n)?n.toString():parseFloat(n.toFixed(4)).toString();}

    function renderPerUnit(){
      perUnitList.innerHTML = '';
      Object.keys(perUnit).forEach(name=>{
        const li=document.createElement('li');
        li.textContent=`${name}: ${perUnit[name]}`;
        perUnitList.appendChild(li);
      });
    }

    function calculateAndRender(){
      errorBox.textContent='';
      const amt=Number(amountInput.value);
      if(!isFinite(amt)||amt<=0){
        totalsBody.innerHTML='';
        return;
      }
      totalsBody.innerHTML='';
      Object.keys(perUnit).forEach(name=>{
        const per=perUnit[name];
        const total=per*amt;
        const tr=document.createElement('tr');
        tr.innerHTML=`<td>${name}</td><td>${fmt(per)}</td><td>${fmt(total)}</td>`;
        totalsBody.appendChild(tr);
      });
    }

    function resetAll(){
      amountInput.value='';
      totalsBody.innerHTML='';
      errorBox.textContent='';
    }

    amountInput.addEventListener('input',calculateAndRender);
    btnReset.addEventListener('click',resetAll);

    renderPerUnit();
  });
})();

/** 
 * Combat Level Calculator
 * Added globally via Common.js
 * Works only on page: Combat_level
 */

(function () {
  if (typeof mw === 'undefined' || !mw.config) return;

  // Run only on this page
  if (mw.config.get('wgPageName') !== 'Combat_level') return;

  document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('combat_level-calculator-placeholder');
    if (!placeholder) return;

    // --- Calculator HTML ---
    placeholder.innerHTML = `
      <div id="combat-calculator" class="rr-calculator">
        <h3>Combat Level Calculator</h3>
        <div class="rr-grid">
          <div>
            <label>Attack: <input id="cl-attack" type="number" min="0" value="0"></label><br>
            <label>Strength: <input id="cl-strength" type="number" min="0" value="0"></label><br>
            <label>Defence: <input id="cl-defence" type="number" min="0" value="0"></label><br>
            <label>Hitpoints: <input id="cl-hitpoints" type="number" min="0" value="0"></label><br>
            <label>Range: <input id="cl-range" type="number" min="0" value="0"></label><br>
            <label>Magic: <input id="cl-magic" type="number" min="0" value="0"></label><br>
          </div>
          <div>
            <h4>Result</h4>
            <div id="cl-result" style="font-size:1.3em;font-weight:bold;margin-top:4px;">–</div>
            <div id="cl-details" class="rr-details"></div>
            <div class="rr-actions">
              <button id="cl-reset">Reset</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // --- Calculation logic ---
    const inputs = {
      attack: document.getElementById('cl-attack'),
      strength: document.getElementById('cl-strength'),
      defence: document.getElementById('cl-defence'),
      hitpoints: document.getElementById('cl-hitpoints'),
      range: document.getElementById('cl-range'),
      magic: document.getElementById('cl-magic'),
    };

    const resultBox = document.getElementById('cl-result');
    const detailsBox = document.getElementById('cl-details');
    const btnReset = document.getElementById('cl-reset');

    function floor(n) { return Math.floor(n); }

    function calculate() {
      const attack = +inputs.attack.value || 0;
      const strength = +inputs.strength.value || 0;
      const defence = +inputs.defence.value || 0;
      const hitpoints = +inputs.hitpoints.value || 0;
      const range = +inputs.range.value || 0;
      const magic = +inputs.magic.value || 0;

      const mle = floor(0.32 * (attack + strength));
      const def = floor(0.27 * (defence + hitpoints));
      const rng = floor(0.32 * ((3.0 / 2.0) * range));
      const mag = floor(0.32 * ((3.0 / 2.0) * magic));
      const combat = 1 + def + Math.max(mle, rng, mag);

      resultBox.textContent = combat;
      detailsBox.innerHTML = `
        <small>
          Melee: ${mle} | Range: ${rng} | Magic: ${mag} | Defence term: ${def}
        </small>
      `;
    }

    function resetAll() {
      for (const key in inputs) inputs[key].value = 0;
      resultBox.textContent = '–';
      detailsBox.innerHTML = '';
    }

    for (const key in inputs) inputs[key].addEventListener('input', calculate);
    btnReset.addEventListener('click', resetAll);
  });
})();