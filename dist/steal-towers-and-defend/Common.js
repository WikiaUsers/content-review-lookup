/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
  'use strict';

  // Decimal coefficient + decimal exponent avoids Number's Infinity limit.
  function decimal(text) {
    var match = /^\+?(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:e([+-]?\d+))?$/i.exec(text.trim());
    if (!match) { throw new Error('Enter a positive number, such as 1, 2.5, or 1e1000.'); }
    var fraction = match[3] || match[2] || '';
    var digits = ((match[1] || '') + fraction).replace(/^0+/, '');
    if (!digits) { throw new Error('Enter a multiplier greater than zero.'); }
    var exponent = BigInt(match[4] || '0') - BigInt(fraction.length);
    var zeros = /0+$/.exec(digits);
    if (zeros) {
      digits = digits.slice(0, -zeros[0].length);
      exponent += BigInt(zeros[0].length);
    }
    return { coefficient: BigInt(digits), exponent: exponent };
  }

  function multiply(left, right) {
    return {
      coefficient: left.coefficient * right.coefficient,
      exponent: left.exponent + right.exponent
    };
  }

  function compare(left, right) {
    var a = left.coefficient.toString();
    var b = right.coefficient.toString();
    var aOrder = left.exponent + BigInt(a.length);
    var bOrder = right.exponent + BigInt(b.length);
    if (aOrder !== bOrder) { return aOrder > bOrder ? 1 : -1; }
    var width = Math.max(a.length, b.length);
    a += '0'.repeat(width - a.length);
    b += '0'.repeat(width - b.length);
    return a === b ? 0 : (a > b ? 1 : -1);
  }

  // Keep 32 significant decimal digits when adding to enormous values.
  // This avoids allocating a string as large as a scientific exponent.
  function precision(value) {
    var digits = value.coefficient.toString();
    var extra = Math.max(0, digits.length - 32);
    return { coefficient: BigInt(digits.slice(0, digits.length - extra)), exponent: value.exponent + BigInt(extra) };
  }

  function add(left, right) {
    left = precision(left);
    right = precision(right);
    var difference = left.exponent - right.exponent;
    if (difference > BigInt(64) || difference < BigInt(-64)) {
      return compare(left, right) >= 0 ? left : right;
    }
    var exponent = left.exponent < right.exponent ? left.exponent : right.exponent;
    return precision({
      coefficient: left.coefficient * (BigInt(10) ** (left.exponent - exponent)) + right.coefficient * (BigInt(10) ** (right.exponent - exponent)),
      exponent: exponent
    });
  }

  function sizeDamageFactor(size) {
    if (compare(size, decimal('1')) < 0) { throw new Error('Enter a size of 1 or greater.'); }
    if (compare(size, decimal('2')) < 0) {
      return add(decimal('0.9'), multiply(size, decimal('0.1')));
    }
    return add(decimal('1'), multiply(size, decimal('0.05')));
  }

  function display(value) {
    var digits = value.coefficient.toString();
    var exponent = value.exponent;
    var zeros = /0+$/.exec(digits);
    if (zeros) {
      digits = digits.slice(0, -zeros[0].length);
      exponent += BigInt(zeros[0].length);
    }
    var order = exponent + BigInt(digits.length - 1);
    if (order >= BigInt(21) || order <= BigInt(-7)) {
      return digits.charAt(0) + (digits.length > 1 ? '.' + digits.slice(1) : '') + 'e' + order.toString();
    }
    var point = Number(BigInt(digits.length) + exponent);
    if (point <= 0) { return '0.' + '0'.repeat(-point) + digits; }
    var integer = point >= digits.length ? digits + '0'.repeat(point - digits.length) : digits.slice(0, point);
    var fraction = point < digits.length ? '.' + digits.slice(point) : '';
    return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + fraction;
  }

  var nextId = 0;
  function initialize(root) {
    var controls = root.querySelector('.std-unit-controls');
    if (!controls || controls.getAttribute('data-calculator-ready')) { return; }
    var status = root.querySelector('.std-unit-status');
    if (typeof BigInt !== 'function') {
      status.textContent = 'Showing base stats. Update your browser to use the multiplier calculator.';
      return;
    }
    var baseDamage = decimal(root.getAttribute('data-base-damage'));
    var baseDps = decimal(root.getAttribute('data-base-dps'));
    var baseRange = Number(root.getAttribute('data-base-range'));
    // 0.15 is inferred from the supplied 100x Silver Dog screenshot (28.96).
    var rangePerDouble = Number(root.getAttribute('data-size-range-per-double') || '0.15');
    var rangeCapText = root.getAttribute('data-max-range');
    var rangeCap = rangeCapText ? Number(rangeCapText) : null;
    var rangeEstimated = root.getAttribute('data-range-estimated') !== 'false' || rangeCap === null;
    var variants = [
      { name: 'Normal', factor: 1, range: 0 },
      { name: 'Silver', factor: 2, range: 5 },
      { name: 'Gold', factor: 3, range: 10 },
      { name: 'Rainbow', factor: 5, range: 15 }
    ];
    var selectedVariant = variants[0];
    var towerUpUses = 0;
    nextId += 1;
    var id = 'std-unit-multiplier-' + nextId;
    var label = document.createElement('label');
    label.className = 'std-unit-input-label';
    label.htmlFor = id;
    label.textContent = 'Size multiplier';
    var wrap = document.createElement('div');
    wrap.className = 'std-unit-input-wrap';
    var input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.value = '1';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-invalid', 'false');
    var suffix = document.createElement('span');
    suffix.className = 'std-unit-input-suffix';
    suffix.textContent = '×';
    suffix.setAttribute('aria-hidden', 'true');
    var note = root.querySelector('.std-unit-calculator-note');
    note.id = id + '-note';
    status.id = id + '-status';
    input.setAttribute('aria-describedby', note.id + ' ' + status.id);
    wrap.appendChild(input);
    wrap.appendChild(suffix);
    controls.appendChild(label);
    controls.appendChild(wrap);
    var variantGroup = document.createElement('fieldset');
    variantGroup.className = 'std-unit-variants';
    var legend = document.createElement('legend');
    legend.textContent = 'Trait — choose one';
    variantGroup.appendChild(legend);
    variants.forEach(function (variant, index) {
      var option = document.createElement('label');
      option.className = 'std-unit-variant std-unit-variant-' + variant.name.toLowerCase();
      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = id + '-variant';
      radio.value = variant.name;
      radio.checked = index === 0;
      var face = document.createElement('span');
      face.className = 'std-unit-variant-face';
      var name = document.createElement('strong');
      name.textContent = variant.name;
      var bonus = document.createElement('span');
      bonus.textContent = variant.factor + '× damage · +' + variant.range + ' range';
      face.appendChild(name);
      face.appendChild(bonus);
      option.appendChild(radio);
      option.appendChild(face);
      variantGroup.appendChild(option);
      radio.addEventListener('change', function () {
        if (radio.checked) { selectedVariant = variant; update(); }
      });
    });
    controls.appendChild(variantGroup);
    var towerUpButton = document.createElement('button');
    towerUpButton.type = 'button';
    towerUpButton.className = 'std-unit-tower-up';
    towerUpButton.setAttribute('aria-describedby', note.id);
    towerUpButton.addEventListener('click', function () {
      towerUpUses = (towerUpUses + 1) % 3;
      update();
    });
    controls.appendChild(towerUpButton);
    controls.setAttribute('data-calculator-ready', 'true');

    function update() {
      var towerUpFactor = [1, 13, 169][towerUpUses];
      towerUpButton.textContent = '★ Tower Up: ' + towerUpUses + '/2';
      towerUpButton.setAttribute('data-active', towerUpUses > 0 ? 'true' : 'false');
      towerUpButton.setAttribute('aria-label', 'Tower Up: ' + towerUpUses + ' of 2 uses. Activate to cycle uses.');
      var rangeNode = root.querySelector('.std-unit-range');
      try {
        var multiplier = decimal(input.value);
        var sizeBonus = sizeDamageFactor(multiplier);
        var towerUp = decimal(String(towerUpFactor));
        var trait = decimal(String(selectedVariant.factor));
        var damage = display(multiply(multiply(multiply(baseDamage, towerUp), sizeBonus), trait));
        var dps = display(multiply(multiply(multiply(baseDps, towerUp), sizeBonus), trait));
        var baseSize = compare(multiplier, decimal('1')) === 0;
        var sizeDigits = multiplier.coefficient.toString();
        var leading = sizeDigits.slice(0, 16);
        var logSize = Math.log2(Number(leading)) + (Number(multiplier.exponent) + sizeDigits.length - leading.length) * Math.log2(10);
        var scaledRange = baseRange * (1 + rangePerDouble * logSize) + selectedVariant.range;
        if (rangeCap !== null) { scaledRange = Math.min(scaledRange, rangeCap); }
        if (rangeNode) {
          rangeNode.textContent = Number.isFinite(scaledRange) ? ((!baseSize && rangeEstimated ? '≈' : '') + scaledRange.toLocaleString('en-US', { maximumFractionDigits: 2 })) : 'Cap unknown';
          rangeNode.title = baseSize ? 'Range at base size, including trait bonus.' : (rangeEstimated ? 'Estimate: coefficient 0.15 inferred from the screenshot; maximum range is unconfirmed. Trait bonus is added after size scaling.' : 'Size-scaled range plus trait bonus, capped at maximum range.');
        }
        root.querySelector('.std-unit-damage').textContent = damage;
        root.querySelector('.std-unit-dps').textContent = dps;
        root.querySelector('.std-unit-multiplier').textContent = display(multiplier) + '× · ' + selectedVariant.name + ' · ★ ' + towerUpUses + '/2';
        input.setAttribute('aria-invalid', 'false');
        status.textContent = '';
      } catch (error) {
        input.setAttribute('aria-invalid', 'true');
        root.querySelector('.std-unit-damage').textContent = '—';
        root.querySelector('.std-unit-dps').textContent = '—';
        root.querySelector('.std-unit-multiplier').textContent = '—';
        if (rangeNode) { rangeNode.textContent = '—'; }
        status.textContent = error.message || 'Enter a valid positive multiplier.';
      }
    }
    input.addEventListener('input', update);
    update();
  }

  function scan(content) {
    var scope = content && content[0] ? content[0] : document;
    if (scope.matches && scope.matches('.std-unit')) { initialize(scope); }
    Array.prototype.forEach.call(scope.querySelectorAll('.std-unit'), initialize);
  }

  if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('wikipage.content').add(scan);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(); });
  } else {
    scan();
  }
}());