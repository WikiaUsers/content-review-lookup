(function(){
var root = document.getElementById("sae-income-calculator-root");
if(!root) return;

var SAE_PETS = [];
try {
    SAE_PETS = JSON.parse(root.getAttribute('data-pets') || '[]');
} catch(e) {
    SAE_PETS = [];
}

var RARITY_ORDER = ["Common","Uncommon","Rare","Epic","Legendary","Mythic","Cosmic","Secret","Eternal","Divine","Brainrot","Monster"];

root.innerHTML = '<div class="sae-calc">'+
'<div class="sae-header">Steal an Egg &mdash; Income Calculator</div>'+
'<div class="sae-grid">'+
'<div class="sae-panel">'+
'<h3>Calculator Inputs</h3>'+
'<input class="sae-search" id="saeSearch" placeholder="Search pets by name...">'+
'<select class="sae-rarity-select" id="saeRaritySelect"></select>'+
'<div class="sae-petgrid" id="saePetGrid"></div>'+
'<div class="sae-selected-card">'+
'<div class="sae-pet-icon" id="saeSelIcon" style="background:#333"></div>'+
'<div><div class="sae-selected-name" id="saeSelName">Select a pet</div>'+
'<div class="sae-selected-meta" id="saeSelMeta">-</div></div>'+
'</div>'+
'<div class="sae-field"><label>Actual Weight (kg)</label>'+
'<div class="sae-weight-row"><input type="number" id="saeWeightInput" min="0" step="0.01" value="0"></div>'+
'<input type="range" class="sae-slider" id="saeWeightSlider" min="0" max="100" value="0" step="0.1">'+
'</div>'+
'<div class="sae-field"><label>Variant (choose one)</label>'+
'<div class="sae-tiles" id="saeVariantTiles"></div></div>'+
'<div class="sae-field"><label>Mutations (choose any number)</label>'+
'<div class="sae-tile-hint">Variant and mutations combine additively above their 1x base (e.g. Golden 2.5x + Fractured 2.75x = 4.25x total, not 6.875x).</div>'+
'<div class="sae-tiles" id="saeMutationTiles"></div></div>'+
'</div>'+
'<div class="sae-panel">'+
'<h3>Final Income</h3>'+
'<div class="sae-result-card">'+
'<div class="sae-result-label">Final Income</div>'+
'<div class="sae-result-value" id="saeResultValue">$0/s</div>'+
'<div class="sae-result-badge">Income Output</div>'+
'</div>'+
'<div class="sae-breakdown-toggle" id="saeBreakdownToggle">\u25b8 Stat Breakdown</div>'+
'<div class="sae-breakdown" id="saeBreakdown" style="display:none"></div>'+
'</div>'+
'</div>'+
'</div>';

var RARITY_COLORS = {
Common:"#9e9e9e",Uncommon:"#4caf50",Rare:"#2196f3",Epic:"#9c27b0",
Legendary:"#ff9800",Mythic:"#e91e63",Cosmic:"#673ab7",Secret:"#263238",
Eternal:"#00bcd4",Divine:"#ffca28",Brainrot:"#795548",Monster:"#c62828"
};

var VARIANTS = [
{id:"none",label:"None",mult:1},
{id:"silver",label:"Silver",mult:1.2},
{id:"golden",label:"Golden",mult:2.5},
{id:"rainbow",label:"Rainbow",mult:3.5}
];

var MUTATIONS = [
{id:"bloom",label:"Bloom",mult:1.25},
{id:"spiritbloom",label:"Spirit Bloom",mult:2.5},
{id:"fractured",label:"Fractured",mult:2.75},
{id:"scrambled",label:"Scrambled",mult:2.75},
{id:"parasite",label:"Parasite",mult:3}
];

var state = {rarity:"All", search:"", selected:null, weight:0, variant:"none", mutations:[]};

function fmtMoney(n){
if(n>=1e12) return "$"+(n/1e12).toFixed(2)+"T/s";
if(n>=1e9) return "$"+(n/1e9).toFixed(2)+"B/s";
if(n>=1e6) return "$"+(n/1e6).toFixed(2)+"M/s";
if(n>=1e3) return "$"+(n/1e3).toFixed(2)+"K/s";
return "$"+n.toFixed(2)+"/s";
}

function iconStyle(pet){
if(pet.img){
    return 'background-image:url(\''+pet.img+'\');background-color:'+(RARITY_COLORS[pet.r]||'#333');
}
return 'background:'+(RARITY_COLORS[pet.r]||'#333');
}

function renderRaritySelect(){
var el = document.getElementById("saeRaritySelect");
var options = ["All"].concat(RARITY_ORDER.filter(function(r){
    return SAE_PETS.some(function(p){ return p.r === r; });
}));
el.innerHTML = options.map(function(r){
    return '<option value="'+r+'"'+(r===state.rarity?' selected':'')+'>'+r+'</option>';
}).join("");
el.onchange = function(){
    state.rarity = el.value;
    renderPetGrid();
};
}

function renderPetGrid(){
var el = document.getElementById("saePetGrid");
var list = SAE_PETS.filter(function(p){
return (state.rarity==="All"||p.r===state.rarity) && p.n.toLowerCase().indexOf(state.search.toLowerCase())!==-1;
});
el.innerHTML = list.map(function(p){
var sel = state.selected && state.selected.n===p.n ? "selected" : "";
return '<div class="sae-pet '+sel+'" data-n="'+p.n+'">'+
    '<div class="sae-pet-icon" style="'+iconStyle(p)+'"></div>'+
    '<div class="sae-pet-name">'+p.n+'</div>'+
'</div>';
}).join("");
var els = el.querySelectorAll(".sae-pet");
for(var i=0;i<els.length;i++){
els[i].onclick = (function(node){return function(){
var pet = SAE_PETS.filter(function(x){return x.n===node.dataset.n;})[0];
selectPet(pet);
};})(els[i]);
}
}

function selectPet(pet){
state.selected = pet;
state.weight = pet.w;
document.getElementById("saeSelIcon").setAttribute('style', iconStyle(pet));
document.getElementById("saeSelName").textContent = pet.n;
document.getElementById("saeSelMeta").textContent = pet.r+" \u2022 "+pet.b+" \u2022 Base "+fmtMoney(pet.i)+" \u2022 Base Weight "+pet.w+"kg";
document.getElementById("saeWeightInput").value = pet.w;
var slider = document.getElementById("saeWeightSlider");
slider.max = Math.max(pet.w*20,10);
slider.value = pet.w;
renderPetGrid();
compute();
}

function renderTiles(){
var vEl = document.getElementById("saeVariantTiles");
vEl.innerHTML = VARIANTS.map(function(v){
return '<div class="sae-tile '+(state.variant===v.id?'active':'')+'" data-id="'+v.id+'">'+v.label+'<span class="sae-tile-mult">'+v.mult+'x</span></div>';
}).join("");
var vt = vEl.querySelectorAll(".sae-tile");
for(var i=0;i<vt.length;i++){
vt[i].onclick = (function(node){return function(){state.variant=node.dataset.id;renderTiles();compute();};})(vt[i]);
}

var mEl = document.getElementById("saeMutationTiles");
mEl.innerHTML = MUTATIONS.map(function(m){
var active = state.mutations.indexOf(m.id) !== -1;
return '<div class="sae-tile '+(active?'active':'')+'" data-id="'+m.id+'">'+m.label+'<span class="sae-tile-mult">'+m.mult+'x</span></div>';
}).join("");
var mt = mEl.querySelectorAll(".sae-tile");
for(var i=0;i<mt.length;i++){
mt[i].onclick = (function(node){return function(){
var id = node.dataset.id;
var idx = state.mutations.indexOf(id);
if(idx === -1){
    state.mutations.push(id);
} else {
    state.mutations.splice(idx,1);
}
renderTiles();
compute();
};})(mt[i]);
}
}

// Weight scaling. Base building block: scale = cube_root(actual/base).
// Three branches:
//   scale < 1   -> UNDERWEIGHT: scale^5   (steep penalty below base weight)
//   1<=scale<=5 -> scale^1.85             (== ratio^(37/60), standard growth)
//   scale > 5   -> 19.637875755794113 * (scale/5)^1.2   (== ratio^(2/5) * 125^(13/60), post-cap growth)
// NOTE: the underweight branch (scale^5, i.e. ratio^(5/3)) is solved from a single
// verified in-game data point (Equinox, 3499kg / 5000kg base -> $6.1B/s). It matches
// that data point closely but has not been cross-checked against a second underweight
// pet yet. Re-verify with another underweight, no-mutation/no-variant test before
// treating this exponent as fully confirmed.
function weightMultiplier(actualWeight, baseWeight){
if(baseWeight<=0) return {mult:1,formula:"n/a", branch:"n/a", ratio:0};
var ratio = actualWeight/baseWeight;
if(ratio<1){
    return {
        mult:Math.pow(ratio,5/3),
        formula:"(Weight \u00f7 Base)^(5/3)",
        branch:"underweight (below base weight)",
        ratio:ratio
    };
} else if(ratio<=125){
    return {
        mult:Math.pow(ratio,37/60),
        formula:"(Weight \u00f7 Base)^(37/60)",
        branch:"standard (at or above base weight, \u2264125\u00d7)",
        ratio:ratio
    };
} else {
    return {
        mult:Math.pow(ratio,2/5)*Math.pow(125,13/60),
        formula:"(Weight \u00f7 Base)^(2/5) \u00d7 125^(13/60)",
        branch:"post-cap (>125\u00d7 base weight)",
        ratio:ratio
    };
}
}

// Variant and mutations pool into ONE additive bonus above a base of 1x.
// combined = 1 + (variant.mult - 1) + sum(mutation.mult - 1 for each selected)
// e.g. Golden (2.5x) + Fractured (2.75x) = 1 + 1.5 + 1.75 = 4.25x
// NOT variant.mult * mutation1.mult * mutation2.mult...
function combinedBonus(variant, mutations){
var parts = [];
var bonusSum = 0;

if(variant && variant.mult > 1){
    var vBonus = variant.mult - 1;
    bonusSum += vBonus;
    parts.push({label: variant.label, raw: variant.mult, bonus: vBonus});
}

mutations.forEach(function(id){
    var m = MUTATIONS.filter(function(x){return x.id===id;})[0];
    if(m){
        var mBonus = m.mult - 1;
        bonusSum += mBonus;
        parts.push({label: m.label, raw: m.mult, bonus: mBonus});
    }
});

return {mult: 1 + bonusSum, parts: parts};
}

function compute(){
var bd = document.getElementById("saeBreakdown");
if(!state.selected){
document.getElementById("saeResultValue").textContent = "$0/s";
bd.innerHTML = "";
return;
}
var pet = state.selected;
var w = state.weight;
var wm = weightMultiplier(w, pet.w);
var variant = VARIANTS.filter(function(v){return v.id===state.variant;})[0];

var cb = combinedBonus(variant, state.mutations);

var afterBase = pet.i;
var afterWeight = afterBase * wm.mult;
var final = afterWeight * cb.mult;

document.getElementById("saeResultValue").textContent = fmtMoney(final);

var partsRows = cb.parts.length === 0
    ? '<div class="sae-break-sub-row"><span>None selected</span><span class="sae-break-sub-val">+0%</span></div>'
    : cb.parts.map(function(p){
        return '<div class="sae-break-sub-row"><span>'+p.label+' ('+p.raw+'x)</span><span class="sae-break-sub-val">+'+(p.bonus*100).toFixed(0)+'%</span></div>';
      }).join('');

var bonusFormulaParts = cb.parts.map(function(p){ return '('+p.raw+' \u2212 1)'; }).join(' + ');
if(bonusFormulaParts === '') bonusFormulaParts = '0';

bd.innerHTML =
'<div class="sae-break-row"><span class="sae-break-label">1. Base Income<span class="sae-break-sub">'+pet.n+' at '+pet.w+'kg, no bonuses</span></span><span class="sae-break-val">'+fmtMoney(afterBase)+'</span></div>'+

'<div class="sae-break-row"><span class="sae-break-label">2. Weight Multiplier<span class="sae-break-sub">'+w+'kg / '+pet.w+'kg base &mdash; '+wm.branch+'</span></span><span class="sae-break-val">'+wm.mult.toFixed(4)+'x</span></div>'+
'<div class="sae-break-formula">ratio = '+w+' \u00f7 '+pet.w+' = '+wm.ratio.toFixed(4)+'<br>weight_mult = '+wm.formula+' = '+wm.ratio.toFixed(4)+'^exp = '+wm.mult.toFixed(4)+'x</div>'+
'<div class="sae-break-sub-row"><span>Income after weight (Base &times; Weight Mult.)</span><span class="sae-break-sub-val">'+fmtMoney(afterWeight)+'</span></div>'+

'<div class="sae-break-row"><span class="sae-break-label">3. Combined Bonus<span class="sae-break-sub">Variant + mutations stack additively: 1 + &Sigma;(each multiplier &minus; 1)</span></span><span class="sae-break-val">'+cb.mult.toFixed(3)+'x</span></div>'+
'<div class="sae-break-formula">combined = 1 + '+bonusFormulaParts+' = '+cb.mult.toFixed(3)+'x</div>'+
partsRows+

'<div class="sae-break-row"><span class="sae-break-label" style="font-weight:700;color:#e8f7ec">Final Income<span class="sae-break-sub">'+fmtMoney(afterWeight)+' &times; '+cb.mult.toFixed(3)+'x</span></span><span class="sae-break-val" style="font-size:16px">'+fmtMoney(final)+'</span></div>';
}

document.getElementById("saeSearch").oninput = function(e){state.search=e.target.value;renderPetGrid();};
document.getElementById("saeWeightInput").oninput = function(e){state.weight=parseFloat(e.target.value)||0;document.getElementById("saeWeightSlider").value=state.weight;compute();};
document.getElementById("saeWeightSlider").oninput = function(e){state.weight=parseFloat(e.target.value)||0;document.getElementById("saeWeightInput").value=state.weight;compute();};

var toggle = document.getElementById("saeBreakdownToggle");
toggle.onclick = function(){
var bdEl = document.getElementById("saeBreakdown");
var open = bdEl.style.display !== "none";
bdEl.style.display = open ? "none" : "block";
toggle.textContent = (open ? "\u25b8" : "\u25be") + " Stat Breakdown";
};

renderRaritySelect();
renderPetGrid();
renderTiles();
})();



mw.hook('wikipage.content').add(function ($content) {
  $content.find('.rt-wrap').each(function () {
    var $wrap = $(this);
    if ($wrap.data('rt-init')) return;
    $wrap.data('rt-init', true);


    $wrap.find('.rt-tab').on('click', function () {
      var id = $(this).attr('data-tab');
      $wrap.find('.rt-tab').removeClass('rt-active');
      $(this).addClass('rt-active');
      $wrap.find('.rt-panel').removeClass('rt-show');
      $wrap.find('.rt-panel[data-panel="' + id + '"]').addClass('rt-show');
    });

  
    $wrap.find('.rt-toggle-link').on('click', function () {
      $wrap.toggleClass('rt-collapsed');
      $(this).text($wrap.hasClass('rt-collapsed') ? 'Expand' : 'Collapse');
    });
  });
});



/* ===== Flipcard: tap / click / keyboard to flip ===== */
mw.hook('wikipage.content').add(function ($content) {
  $content.find('.flipcard').each(function () {
    var $card = $(this);

    // Only set up each card once
    if ($card.data('flipcardReady')) return;
    $card.data('flipcardReady', true);

    // Accessibility: make the card focusable and announce it as a button
    $card.attr({
      tabindex: '0',
      role: 'button',
      'aria-pressed': 'false'
    });

    function toggle() {
      var flipped = $card.toggleClass('flipped').hasClass('flipped');
      $card.attr('aria-pressed', flipped ? 'true' : 'false');
    }

    $card.on('click', function (e) {
      // Let links inside the card (like the expand button) work without flipping
      if ($(e.target).closest('a').length) return;
      toggle();
    });

    $card.on('keydown', function (e) {
      // Let links inside the card handle their own Enter key
      if ($(e.target).closest('a').length) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});


(function () {
  var W = 230;
  var GAP = 10;
  var tip = null;
  var current = null;
  window.dfGridLoaded = true;

  function getTip(card) {
    var host = $(card).closest('.mw-parser-output')[0] || document.body;
    if (!tip || tip.parentNode !== host) {
      if (tip && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }
      tip = document.createElement('div');
      tip.className = 'df-tip';
      tip.style.cssText = 'position:fixed;display:none;z-index:9999;width:' + W + 'px;pointer-events:none;';
      host.appendChild(tip);
    }
    return tip;
  }

  function sourceOf(card) {
    var $card = $(card);
    if ($card.hasClass('df-fcard')) {
      return card.querySelector($card.hasClass('flipped') ? '.df-fcard-info-s' : '.df-fcard-info-n');
    }
    return card.querySelector('.df-gpop');
  }

  function show(card) {
    var isFlip = $(card).hasClass('df-fcard');
    if (window.innerWidth <= 700 && !isFlip) {
      return;
    }
    var source = sourceOf(card);
    if (!source) {
      return;
    }
    current = card;
    var t = getTip(card);
    t.innerHTML = source.innerHTML;
    t.style.display = 'block';

    var rect = card.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var vh = document.documentElement.clientHeight;

    var left = rect.right + GAP;
    if (left + W > vw - 5) {
      left = rect.left - W - GAP;
    }
    if (left < 5) {
      left = Math.max(5, Math.min(vw - W - 5, rect.left + rect.width / 2 - W / 2));
    }

    var top = rect.top - 8;
    var height = t.offsetHeight;
    if (top + height > vh - 5) {
      top = vh - height - 5;
    }
    if (top < 5) {
      top = 5;
    }

    t.style.left = left + 'px';
    t.style.top = top + 'px';
  }

  function hide() {
    current = null;
    if (tip) {
      tip.style.display = 'none';
    }
  }

  $(document).on('mouseenter', '.df-gcard, .df-fcard', function () {
    show(this);
  });
  $(document).on('mouseleave', '.df-gcard, .df-fcard', hide);
  $(window).on('scroll', hide);

  function toggleFlip($card) {
    var flipped = $card.toggleClass('flipped').hasClass('flipped');
    $card.attr('aria-pressed', flipped ? 'true' : 'false');
    show($card[0]);
  }

  $(document).on('click', '.df-fcard', function (e) {
    if ($(e.target).closest('a').length) {
      return;
    }
    toggleFlip($(this));
  });

  $(document).on('keydown', '.df-fcard', function (e) {
    if ($(e.target).closest('a').length) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip($(this));
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.df-fcard').length) {
      hide();
    }
  });
})();

(function () {
  var ORDER = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Secret', 'Exotic', 'Exclusive'];
  window.dfwLoaded = true;

  function nodesOf($box) {
    var stop = $box.hasClass('df-world-sub') ? '.df-world' : '.df-world:not(.df-world-sub)';
    return $box.nextUntil(stop);
  }

  function refreshFold($root) {
    $root.find('.dfw-hidden').removeClass('dfw-hidden');
    $root.find('.df-world.dfw-folded').each(function () {
      nodesOf($(this)).addClass('dfw-hidden');
    });
  }

  function setBox($box, folded) {
    $box.toggleClass('dfw-folded', folded);
    $box.attr('aria-expanded', folded ? 'false' : 'true');
  }

  function buildFilter($root, $f) {
    if ($f.data('dftBuilt')) {
      return;
    }
    $f.data('dftBuilt', true);

    var noun = $f.attr('data-noun') || 'items';
    var placeholder = $f.attr('data-placeholder') || 'Search...';
    var cards = $root.find('.df-gcard, .df-fcard').toArray();

    var info = cards.map(function (card) {
      var $c = $(card);
      var rarity = $.trim($c.find('.df-gpop-rar, .df-fcard-rar').first().text());
      var $grid = $c.closest('.df-grid, .df-fgrid');
      var world = $.trim($grid.prevAll('.df-world:not(.df-world-sub)').first().find('.df-world-name').text());
      return {
        el: card,
        rarity: rarity,
        world: world,
        text: ($c.text() + ' ' + world).toLowerCase()
      };
    });

    var worlds = [];
    var rarities = [];
    info.forEach(function (it) {
      if (it.world && worlds.indexOf(it.world) === -1) {
        worlds.push(it.world);
      }
      if (it.rarity && rarities.indexOf(it.rarity) === -1) {
        rarities.push(it.rarity);
      }
    });
    rarities.sort(function (a, b) {
      var ia = ORDER.indexOf(a);
      var ib = ORDER.indexOf(b);
      if (ia === -1) { ia = 99; }
      if (ib === -1) { ib = 99; }
      return ia - ib || (a < b ? -1 : 1);
    });

    var $search = $('<div class="dft-search"></div>');
    var $input = $('<input type="text" class="dft-input">').attr('placeholder', placeholder);
    $search.append($input);

    var $world = $('<select class="dft-select"></select>').attr('aria-label', 'World')
      .append('<option value="">All worlds</option>');
    worlds.forEach(function (w) {
      $world.append($('<option></option>').attr('value', w).text(w));
    });

    var $rarity = $('<select class="dft-select"></select>').attr('aria-label', 'Rarity')
      .append('<option value="">All rarities</option>');
    rarities.forEach(function (r) {
      $rarity.append($('<option></option>').attr('value', r).text(r));
    });

    var $clear = $('<span class="dft-btn" role="button" tabindex="0">Clear</span>');
    var $fold = $('<span class="dft-btn dft-btn-main" role="button" tabindex="0">Collapse all</span>');
    var $count = $('<div class="dft-count"></div>');

    $f.removeClass('df-filter').addClass('dft-bar').empty()
      .append($search, $world, $rarity, $clear, $fold, $count);

    function syncFoldLabel() {
      var anyOpen = $root.find('.df-world.dfw-fold').not('.dfw-folded').length > 0;
      $fold.text(anyOpen ? 'Collapse all' : 'Expand all');
    }

    function run() {
      var q = $.trim($input.val()).toLowerCase();
      var tokens = q ? q.split(/\s+/) : [];
      var w = $world.val();
      var r = $rarity.val();
      var shown = 0;

      info.forEach(function (it) {
        var ok = (!w || it.world === w) && (!r || it.rarity === r);
        for (var i = 0; ok && i < tokens.length; i++) {
          if (it.text.indexOf(tokens[i]) === -1) {
            ok = false;
          }
        }
        $(it.el).toggleClass('dft-hide', !ok);
        if (ok) {
          shown++;
        }
      });

      var active = !!(q || w || r);
      if (active) {
        $count.html('Showing <b>' + shown + '</b> of ' + info.length + ' ' + mw.html.escape(noun));
      } else {
        $count.html('<b>' + info.length + '</b> ' + mw.html.escape(noun) + ' in total');
      }

      $root.find('.dft-nomatch').removeClass('dft-nomatch');
      if (active) {
        $root.find('.df-world').each(function () {
          var $box = $(this);
          var $nodes = nodesOf($box);
          var matches = $nodes.find('.df-gcard, .df-fcard').not('.dft-hide').length;
          if (matches === 0) {
            $box.addClass('dft-nomatch');
            $nodes.addClass('dft-nomatch');
          } else {
            setBox($box, false);
          }
        });
        refreshFold($root);
      }
      syncFoldLabel();
    }

    $input.on('input keyup', run);
    $world.on('change', run);
    $rarity.on('change', run);

    $clear.on('click', function () {
      $input.val('');
      $world.val('');
      $rarity.val('');
      run();
    });

    $fold.on('click', function () {
      var anyOpen = $root.find('.df-world.dfw-fold').not('.dfw-folded').length > 0;
      $root.find('.df-world.dfw-fold').each(function () {
        setBox($(this), anyOpen);
      });
      refreshFold($root);
      syncFoldLabel();
    });

    $clear.add($fold).on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });

    $root.on('click', '.dfw-fold', syncFoldLabel);

    run();
  }

  function initRoot($root, $f) {
    if (!$root.data('dfwInit')) {
      $root.data('dfwInit', true);

      $root.find('.df-world').each(function () {
        var $b = $(this);
        $b.addClass('dfw-fold').attr({ tabindex: '0', role: 'button', 'aria-expanded': 'true' });
        if (!$b.children('.dfw-toggle').length) {
          $b.append('<span class="dfw-toggle"></span>');
        }
      });

      $root.on('click', '.dfw-fold', function () {
        var $b = $(this);
        setBox($b, !$b.hasClass('dfw-folded'));
        refreshFold($root);
      });

      $root.on('keydown', '.dfw-fold', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          $(this).trigger('click');
        }
      });
    }
    buildFilter($root, $f);
  }

  function openHash() {
    var id = '';
    try {
      id = decodeURIComponent((window.location.hash || '').slice(1));
    } catch (err) {
      return;
    }
    if (!id) {
      return;
    }
    var $box = $(document.getElementById(id));
    if ($box.hasClass('dfw-folded')) {
      setBox($box, false);
      refreshFold($box.closest('.mw-parser-output'));
    }
  }

  $(window).on('hashchange', openHash);

  mw.hook('wikipage.content').add(function ($content) {
    $content.find('.df-filter').each(function () {
      var $f = $(this);
      var $root = $f.closest('.mw-parser-output');
      if (!$root.length) {
        $root = $f.parent();
      }
      initRoot($root, $f);
    });
    openHash();
  });
})();