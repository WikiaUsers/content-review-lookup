/* CopyCode function, used for Template:CopyCode */

(function () {
	'use strict';

	function copyText(text) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			return navigator.clipboard.writeText(text);
		}

		return new Promise(function (resolve, reject) {
			var textarea = document.createElement('textarea');

			textarea.value = text;
			textarea.style.position = 'fixed';
			textarea.style.left = '-9999px';

			document.body.appendChild(textarea);

			textarea.focus();
			textarea.select();

			try {
				document.execCommand('copy');
				resolve();
			} catch (e) {
				reject(e);
			}

			document.body.removeChild(textarea);
		});
	}

	function activate(button) {
		var label = button.querySelector('.code-copy-label');
		var before = button.querySelector('.code-copy-before');
		var after = button.querySelector('.code-copy-after');
		var value = button.querySelector('.code-copy-value');

		if (!label || !before || !after || !value) {
			return;
		}

		var duration = parseInt(
			button.getAttribute('data-copy-duration'),
			10
		) || 1500;

		copyText(value.textContent).then(function () {
			clearTimeout(button.copyCodeTimer);

			label.textContent = after.textContent;
			button.classList.add('code-copy-success');

			button.copyCodeTimer = setTimeout(function () {
				label.textContent = before.textContent;
				button.classList.remove('code-copy-success');
			}, duration);
		});
	}

	document.addEventListener('click', function (event) {
		var button = event.target.closest('.code-copy-button');

		if (button) {
			activate(button);
		}
	});

	document.addEventListener('keydown', function (event) {
		var button = event.target.closest('.code-copy-button');

		if (!button) {
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			activate(button);
		}
	});
})();

/* ######### CALCULATOR ######### */

/* ==========================================================================
 * Upgrade calculator — Template:LevelCalc
 *
 * Data:      Module:CharData/data.json
 * Styles:    MediaWiki:Common.css  (.lvlcalc block)
 * Template:  Template:LevelCalc    (inserts <div class="lvlcalc">)
 *
 * All rates below were reverse-engineered from in-game measurements and
 * verified against them; see the template's talk page for the raw data.
 * Both curves are piecewise geometric: each level multiplies the previous
 * level's value by the rate of the segment it falls in. The rates are the
 * same for every character — rarity only sets the two base values.
 *
 *   income (cash per second), base = value at level 1:
 *     levels   2 -> 100:  x1.0352 per level  (99 steps)
 *     levels 101 -> 250:  x1.0081 per level  (150 steps)
 *     levels 251 -> 750:  x1.0028 per level  (500 steps)
 *     levels 751 and up:  x1.0023 per level
 *   Verified to the cent at level 755 (Ada Smasher, Demonic, paired):
 *   36,062,986,568,828 predicted vs 36,062,986,568,802 in game.
 *
 *   food (level-up cost), base = cost of the very first upgrade (1 -> 2):
 *     up to level   76:  x1.134  per level  (74 steps)
 *     levels  77 -> 151:  x1.03   per level  (75 steps)
 *     levels 152 -> 300:  x1.01604 per level (149 steps)
 *     levels 301 -> 501:  x1.00802 per level (201 steps)
 *     levels 502 -> 751:  x1.025  per level  (250 steps)
 *     levels 752 and up:  x1.12   per level
 *   The two middle rates read as 1.016 and 1.008 at a glance, but every
 *   precise sample from level 400 up then came out a flat 0.8% low. The
 *   extra digits above are an empirical fit to the 300-310 level-by-level
 *   sweep plus six 3-4 digit samples between 400 and 756; they cut the
 *   worst error on those from 0.9% to 0.2%. Replace them with exact values
 *   if anyone ever measures a few consecutive levels around 250 and 450.
 *   Every boundary was pinned with consecutive-level measurements; they are
 *   not evenly spaced, 300/301 was confirmed level by level, and the last
 *   one sits one level later than the income break at 751. The x1.12 tail
 *   came from the game's own "Level Up 10" price at level 755: 224.2T for
 *   ten levels, which x1.025 cannot produce (143.4T).
 *
 *   DISCOUNTS. Level-up cost can be discounted — 75% from one shop and 10%
 *   from another, and they MULTIPLY rather than add: 0.25 x 0.90 = 0.225,
 *   i.e. 77.5% off, not 85%. The food bases below are the UNDISCOUNTED
 *   values and the widget has one toggle per discount, both off by default,
 *   so a reader who owns neither sees true prices.
 *   The first measurements for this table were taken on discounted saves,
 *   which is why the bases first came out ~4.4x too low: one save had both
 *   discounts (x0.225) and another only the big one (x0.25). Ratios between
 *   levels are discount-proof, so the rates were never affected — only the
 *   bases, and those were re-derived once the two factors were known.
 *
 *   food base per rarity (undiscounted):
 *     Common 2, Uncommon 5, Rare 2, Epic 4, Legendary 5, Mythical 8,
 *     Cosmic 16, Secret 22, Rainbow 40, Ascended 72, Divine 225,
 *     Supreme 740, Celestial 1250, Ancient 4000, God 8800,
 *     Omniscient 12500, Transcendent 17500, Exclusive 20
 *   Uncommon is an exact copy of Legendary and Common an exact copy of
 *   Rare — that is the game's own data, not a typo here, and it means
 *   Uncommon really does cost more to level than the rarer Rare.
 * ========================================================================== */

(function () {
	'use strict';

	var DATA_PAGE = 'Module:CharData/data.json';

	/* Rarities, strongest first — this order also drives the rarity filter
	   and the sort order of the character list.
	   food: undiscounted base cost of the first upgrade (1 -> 2). */
	var RARITY = {
		exclusive:    { n: 'Exclusive',    c: '#8a8a93', food: 20 },
		transcendent: { n: 'Transcendent', c: '#f0f0f5', food: 17500 },
		omniscient:   { n: 'Omniscient',   c: '#b8a0e8', food: 12500 },
		god:          { n: 'God',          c: '#d4a72c', food: 8800 },
		ancient:      { n: 'Ancient',      c: '#c9743a', food: 4000 },
		celestial:    { n: 'Celestial',    c: '#5aa9dd', food: 1250 },
		supreme:      { n: 'Supreme',      c: '#e06a3a', food: 740 },
		divine:       { n: 'Divine',       c: '#d9a521', food: 225 },
		ascended:     { n: 'Ascended',     c: '#9b6fe0', food: 72 },
		rainbow:      { n: 'Rainbow',      c: '#3f9fd4', food: 40 },
		secret:       { n: 'Secret',       c: '#e04f8e', food: 22 },
		cosmic:       { n: 'Cosmic',       c: '#4f7fd4', food: 16 },
		mythical:     { n: 'Mythical',     c: '#e0574a', food: 8 },
		legendary:    { n: 'Legendary',    c: '#d9a33a', food: 5 },
		epic:         { n: 'Epic',         c: '#a06fd0', food: 4 },
		rare:         { n: 'Rare',         c: '#4a90d9', food: 2 },
		uncommon:     { n: 'Uncommon',     c: '#4a9d6b', food: 5 },
		common:       { n: 'Common',       c: '#8a8a93', food: 2 }
	};

	/* RARITY is written strongest first, so its key order is the ranking. */
	var RARITY_RANK = {};
	Object.keys(RARITY).forEach(function (k, i) { RARITY_RANK[k] = i; });

	/* Mutations multiply income and cost no food, so they are worth far more
	   than levels: Demonic x10 is worth about 823 levels on the x1.0028
	   segment, and being paired (x3) about 393.

	   Colours are not here: each name doubles as its CSS class, the way
	   rarities do, so .mut-demonic in Common.css is the only place a
	   mutation is recoloured and {{Mutation|Demonic}} matches this widget. */
	var MUT = [
		['No mutation', 1], ['Demonic', 10], ['Dracula', 8], ['Nightmare', 7],
		['Angelic', 6], ['Mars', 6], ['Void', 6], ['Sinister', 5],
		['Lunar', 4], ['Solar', 4], ['Toxic', 4], ['Complexity', 2.5],
		['Ghost', 2.5], ['Blood', 2], ['Electric', 2], ['Lava', 2],
		['Slime', 2], ['Zombie', 2], ['Diamond', 1.5], ['Frozen', 1.5],
		['Party', 1.5], ['Gold', 1.2], ['Honey', 1.2]
	];

	/* same shape the rest of the code uses: {n, x} plus the class name */
	MUT = MUT.map(function (m) {
		return {
			n: m[0],
			x: m[1],
			cls: m[1] === 1 ? '' :
				'mutation-text mut-' + m[0].toLowerCase().replace(/ /g, '-')
		};
	});

	/* ---------- maths ---------- */

	/* Income segments: {steps} levels at {rate}, applied in order.
	   99 + 150 covers levels 2..250; the last segment runs to the cap. */
	var CashPerSeconds = [
		{ steps: 99, rate: 1.0352 },
		{ steps: 150, rate: 1.0081 },
		{ steps: 500, rate: 1.0028 },
		{ steps: 9999, rate: 1.0023 }
	];

	function getCpsCurveMultiplier(lvl) {
		var rem = Math.max(1, Math.floor(lvl)) - 1;
		if (rem <= 0) { return 1; }
		var mult = 1;
		for (var i = 0; i < CashPerSeconds.length; i++) {
			var seg = CashPerSeconds[i];
			var take = Math.min(rem, seg.steps);
			mult *= Math.pow(seg.rate, take);
			rem -= take;
			if (rem <= 0) { break; }
		}
		return mult;
	}

	function incomeAt(base, L) {
		return base * getCpsCurveMultiplier(L);
	}

	/* Food segments. The step counts place the boundaries exactly where they
	   were measured: 74 steps reach level 76, +75 reach 151, +149 reach 300,
	   +201 reach 501, and everything past that is x1.025.
	   Getting these counts wrong shifts a boundary by a level — do not round
	   them to neater numbers. */
	var FoodsMultiplier = [
		{ steps: 74, rate: 1.134 },
		{ steps: 75, rate: 1.03 },
		{ steps: 149, rate: 1.01604 },
		{ steps: 201, rate: 1.00802 },
		{ steps: 250, rate: 1.025 },
		{ steps: 9999, rate: 1.12 }
	];

	function getLevelCurveMultiplier(lvl) {
		var rem = Math.max(1, Math.floor(lvl)) - 1;
		if (rem <= 0) { return 1; }
		var mult = 1;
		for (var i = 0; i < FoodsMultiplier.length; i++) {
			var seg = FoodsMultiplier[i];
			var take = Math.min(rem, seg.steps);
			mult *= Math.pow(seg.rate, take);
			rem -= take;
			if (rem <= 0) { break; }
		}
		return mult;
	}

	/* Cost of the upgrade FROM lvl TO lvl+1. "keep" is the fraction of the
	   price actually paid: 1 with no discount, 0.225 with 75% and 10% both
	   bought. The game rounds each level to a whole number and never shows
	   less than 1, which is why the cheapest rarities display "1" for their
	   first several levels. */
	function foodAt(rarityKey, lvl, keep) {
		var r = (rarityKey || '').toLowerCase();
		var base = (RARITY[r] && RARITY[r].food != null) ? RARITY[r].food : 0;
		if (!base) { return 0; }
		var k = (typeof keep === 'number' && keep > 0) ? keep : 1;
		return Math.max(1, Math.floor(base * getLevelCurveMultiplier(lvl) * k + 0.5));
	}

	/* Total food to go from level a to level b. */
	function foodSum(rarityKey, a, b, keep) {
		var s = 0, l;
		for (l = a; l < b; l++) {
			s += foodAt(rarityKey, l, keep);
		}
		return s;
	}

	/* Short-scale suffixes, the same ladder the game itself uses. */
	var Suffix = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No',
		'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg',
		'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg'];

	function shrt(n) {
		if (!isFinite(n)) { return '∞'; }
		if (n < 1000) { return String(Math.round(n)); }
		var tier = Math.floor(Math.log10(n) / 3);
		if (tier >= Suffix.length) { tier = Suffix.length - 1; }
		var v = n / Math.pow(10, tier * 3);
		return (v >= 100 ? v.toFixed(0) : v.toFixed(2)) + Suffix[tier];
	}

	function exact(n) {
		if (!isFinite(n)) { return '∞'; }
		if (n >= 1e21) { return n.toExponential(3).replace('e+', ' × 10^'); }
		return Math.round(n).toLocaleString('en-US');
	}

	/* ---------- small helpers ---------- */

	function el(tag, cls, text) {
		var e = document.createElement(tag);
		if (cls) { e.className = cls; }
		if (text != null) { e.textContent = text; }
		return e;
	}

	/* Paints a mutation's name in its own colour, by reusing the same
	   .mutation-text / .mut-<name> classes {{Mutation|...}} uses. "No
	   mutation" has no class and keeps the theme's own colour. */
	function paintMut(node, m) {
		if (m && m.cls) { node.className = (node.className + ' ' + m.cls).trim(); }
		return node;
	}

	/* English needs "an Omniscient" but "a Transcendent". */
	function article(word) {
		return /^[aeiou]/i.test(word || '') ? 'an' : 'a';
	}

	/* A coloured rarity name, the way Template:Item writes one. */
	function rarityNode(r) {
		return el('span', 'rarity-text item-' + r, (RARITY[r] || {}).n || r);
	}

	/* "Dracula (8x)" — the shape the comparison rows and the dropdown use. */
	function mutLabel(m) {
		return m.x === 1 ? m.n : m.n + ' (' + m.x + '×)';
	}

	/* Special:FilePath serves the original file; ?width= makes MediaWiki
	   return a scaled thumbnail instead, which is what a list wants.
	   The file name must match the character's display name (the "n" field
	   in data.json) exactly, e.g. File:Sabera II.png. */
	function artUrl(name, width) {
		return mw.config.get('wgScriptPath') + '/index.php?title=' +
			encodeURIComponent('Special:FilePath/' + name + '.png') +
			'&width=' + width;
	}

	/* Rebuilds the markup of Template:Item so the calculator reuses the
	   rarity frames, halftone and gradients already defined in Common.css. */
	function itemNode(c, size) {
		var wrap = el('div', 'item item-' + c.r);
		wrap.style.setProperty('--size', size + 'px');

		wrap.appendChild(el('div', 'itemcontainer-overlay'));

		var cont = el('div', 'itemcontainer');
		var bg = el('div', 'itemcontainer-background');
		bg.appendChild(el('div', 'itemcontainer-halftone'));
		cont.appendChild(bg);

		var icon = el('div', 'itemcontainer-icon');
		var img = new Image();
		img.alt = '';
		img.loading = 'lazy';
		img.decoding = 'async';
		img.onerror = function () {
			icon.textContent = '';
			var ph = el('span', 'lvlcalc-ph', c.name.charAt(0).toUpperCase());
			icon.appendChild(ph);
		};
		img.src = artUrl(c.name, Math.round(size * 1.6));
		icon.appendChild(img);
		cont.appendChild(icon);

		wrap.appendChild(cont);
		return wrap;
	}

	/* ---------- building one widget ---------- */

	function build(root, chars) {
		var cur = null;

		root.textContent = '';
		root.classList.add('is-ready');

		/* --- markup --- */
		var main = el('div', 'lvlcalc-main');

		var slotBox = el('div', 'lvlcalc-slot');
		var slotBtn = el('button');
		slotBtn.type = 'button';
		slotBtn.setAttribute('aria-expanded', 'false');
		var slotArt = el('span', 'lvlcalc-art');
		slotBtn.appendChild(slotArt);
		var cap = el('div', 'lvlcalc-cap', 'click to change');
		slotBox.appendChild(slotBtn);
		slotBox.appendChild(cap);

		var body = el('div', 'lvlcalc-body');

		var who = el('div', 'lvlcalc-who');
		var nameEl = el('b', null, '—');
		var dotEl = el('span', 'lvlcalc-dot', '•');
		var rareEl = el('span', 'lvlcalc-tag');
		var baseEl = el('span', 'lvlcalc-base', '');
		who.appendChild(nameEl);
		who.appendChild(dotEl);
		who.appendChild(rareEl);
		who.appendChild(baseEl);

		var row = el('div', 'lvlcalc-row');

		var uid = 'lc' + Math.random().toString(36).slice(2, 8);

		var fLv = el('span', 'lvlcalc-f');
		var lLv = el('label', null, 'Level');
		lLv.htmlFor = uid + 'a';
		var steps = el('span', 'lvlcalc-steps');
		var inA = el('input');
		inA.type = 'number'; inA.min = 1; inA.max = 1000; inA.value = 1; inA.id = uid + 'a';
		var inB = el('input');
		inB.type = 'number'; inB.min = 1; inB.max = 1000; inB.value = 100;
		inB.setAttribute('aria-label', 'Target level');
		steps.appendChild(inA);
		steps.appendChild(el('span', 'lvlcalc-sep'));
		steps.appendChild(el('span', 'lvlcalc-ar', '→'));
		steps.appendChild(el('span', 'lvlcalc-sep'));
		steps.appendChild(inB);
		fLv.appendChild(lLv);
		fLv.appendChild(steps);

		/* Mutation picker. A native <select> cannot colour its options on
		   most browsers, and the colours are half the point here, so this is
		   a button plus a panel of coloured names. It keeps the keyboard and
		   the aria wiring a select would have given for free. */
		var mutIdx = 0;

		var fMut = el('span', 'lvlcalc-f');
		var lMut = el('span', 'lvlcalc-lbl', 'Mutation');
		var mutBox = el('span', 'lvlcalc-mut');
		var mutBtn = el('button', 'lvlcalc-mutbtn');
		mutBtn.type = 'button';
		mutBtn.id = uid + 'm';
		mutBtn.setAttribute('aria-haspopup', 'listbox');
		mutBtn.setAttribute('aria-expanded', 'false');
		var mutTxt = el('span', 'lvlcalc-mutname');
		var mutCar = el('span', 'lvlcalc-caret', '▾');
		mutBtn.appendChild(mutTxt);
		mutBtn.appendChild(mutCar);

		var mutPop = el('div', 'lvlcalc-mutpop');
		mutPop.hidden = true;
		mutPop.setAttribute('role', 'listbox');
		mutBox.appendChild(mutBtn);
		mutBox.appendChild(mutPop);
		fMut.appendChild(lMut);
		fMut.appendChild(mutBox);

		function mutVal() { return MUT[mutIdx] || MUT[0]; }

		function paintMutBtn() {
			var m = mutVal();
			mutTxt.textContent = mutLabel(m);
			mutTxt.className = 'lvlcalc-mutname';
			paintMut(mutTxt, m);
			mutBtn.classList.toggle('is-set', mutIdx !== 0);
		}

		function closeMut() {
			mutPop.hidden = true;
			mutBtn.setAttribute('aria-expanded', 'false');
		}

		function buildMutPop() {
			mutPop.textContent = '';
			MUT.forEach(function (m, i) {
				var o = el('button', 'lvlcalc-mutopt');
				o.type = 'button';
				o.setAttribute('role', 'option');
				o.setAttribute('aria-selected', String(i === mutIdx));
				if (i === mutIdx) { o.classList.add('is-on'); }
				o.appendChild(paintMut(el('span', 'lvlcalc-mutoptn', m.n), m));
				o.appendChild(el('span', 'lvlcalc-mutx', m.x === 1 ? '—' : '×' + m.x));
				o.addEventListener('click', function () {
					mutIdx = i;
					paintMutBtn();
					closeMut();
					mutBtn.focus();
					calc();
				});
				mutPop.appendChild(o);
			});
		}

		mutBtn.addEventListener('click', function () {
			var open = mutPop.hidden;
			if (open) { buildMutPop(); }
			mutPop.hidden = !open;
			mutBtn.setAttribute('aria-expanded', String(open));
		});
		mutBox.addEventListener('keydown', function (ev) {
			if (ev.key === 'Escape' && !mutPop.hidden) { closeMut(); mutBtn.focus(); }
		});
		document.addEventListener('click', function (ev) {
			if (!mutPop.hidden && !mutBox.contains(ev.target)) { closeMut(); }
		});
		paintMutBtn();

		var swLbl = el('label', 'lvlcalc-sw');
		var swIn = el('input');
		swIn.type = 'checkbox';
		swIn.checked = true;
		swLbl.appendChild(swIn);
		swLbl.appendChild(el('span', 'lvlcalc-track'));
		swLbl.appendChild(el('span', null, 'paired ×3'));

		row.appendChild(fLv);
		row.appendChild(fMut);
		row.appendChild(swLbl);

		/* Level-up discount. Two shops sell 10% and 75% off and they MULTIPLY,
		   so owning both is 0.25 x 0.90 = 0.225 — 77.5% off, not 85%. That is
		   the MAX option; there is nothing else to stack on top.
		   Account-wide rather than per-character, so it sits on its own quiet
		   line, and it starts at None: a reader who owns neither discount
		   sees true prices. */
		var DISCOUNTS = [
			['None', 1],
			['10%', 0.9],
			['75%', 0.25],
			['MAX', 0.225]
		];
		var discPick = 0;

		var disc = el('div', 'lvlcalc-disc');
		disc.appendChild(el('span', null, 'Level-up discount'));
		var seg = el('div', 'lvlcalc-seg');
		seg.setAttribute('role', 'radiogroup');
		seg.setAttribute('aria-label', 'Level-up discount');
		var segBtns = DISCOUNTS.map(function (d, i) {
			var b = el('button', null, d[0]);
			b.type = 'button';
			b.setAttribute('role', 'radio');
			b.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
			b.addEventListener('click', function () {
				discPick = i;
				segBtns.forEach(function (o, j) {
					o.setAttribute('aria-checked', j === i ? 'true' : 'false');
				});
				calc();
			});
			seg.appendChild(b);
			return b;
		});
		disc.appendChild(seg);

		var out = el('div', 'lvlcalc-out');

		/* left column: money */
		var colInc = el('div', 'lvlcalc-col');
		var incK = el('span', 'lvlcalc-k', 'Income');
		var incBig = el('span', 'lvlcalc-big', '—');
		var incExact = el('span', 'lvlcalc-exact', '');
		var incNow = el('span', 'lvlcalc-now', '');

		var modRow = el('div', 'lvlcalc-mod');
		var modBox = el('span', 'lvlcalc-modbox');
		var modIn = el('input');
		modIn.type = 'text';
		modIn.inputMode = 'decimal';
		modIn.placeholder = '1';
		modIn.setAttribute('aria-label', 'Extra multiplier');
		modBox.appendChild(modIn);
		modBox.appendChild(el('span', 'lvlcalc-x', '×'));
		var modOut = el('span', 'lvlcalc-modout', '');
		modRow.appendChild(modBox);
		modRow.appendChild(modOut);

		colInc.appendChild(incK);
		colInc.appendChild(incBig);
		colInc.appendChild(incExact);
		colInc.appendChild(incNow);
		colInc.appendChild(modRow);

		/* right column: food */
		var colFood = el('div', 'lvlcalc-col is-food');
		var foodK = el('span', 'lvlcalc-k', 'Food');
		var foodBig = el('span', 'lvlcalc-big', '—');
		var foodExact = el('span', 'lvlcalc-exact', '');
		var foodNext = el('span', 'lvlcalc-now', '');
		colFood.appendChild(foodK);
		colFood.appendChild(foodBig);
		colFood.appendChild(foodExact);
		colFood.appendChild(foodNext);

		out.appendChild(colInc);
		out.appendChild(colFood);

		body.appendChild(who);
		body.appendChild(row);
		body.appendChild(disc);
		body.appendChild(out);
		main.appendChild(slotBox);
		main.appendChild(body);

		var pick = el('div', 'lvlcalc-pick');
		pick.hidden = true;
		var hd = el('div', 'lvlcalc-hd');
		var q = el('input');
		q.type = 'search';
		q.placeholder = 'search by name';
		q.setAttribute('aria-label', 'Search characters');
		var rf = el('select');
		rf.setAttribute('aria-label', 'Filter by rarity');
		var o0 = el('option', null, 'all rarities');
		o0.value = '';
		rf.appendChild(o0);
		Object.keys(RARITY).forEach(function (k) {
			var o = el('option', null, RARITY[k].n);
			o.value = k;
			rf.appendChild(o);
		});
		hd.appendChild(q);
		hd.appendChild(rf);
		var list = el('div', 'lvlcalc-list');
		pick.appendChild(hd);
		pick.appendChild(list);

		root.appendChild(main);
		root.appendChild(pick);

		/* ---- team comparison ----------------------------------------------
		   Two line-ups side by side. What matters is income PER SLOT: the plot
		   has a fixed number of stands, so five characters earning 50T/s are
		   worth less than one earning 40T/s — the other four stands could hold
		   something. A paired character costs a second slot for its partner,
		   which is drawn as a grey cell, unless that partner is in the same
		   line-up already. */

		var teams = { a: [], b: [] };

		var cmp = el('div', 'lvlcalc-cmp');

		var addRow = el('div', 'lvlcalc-add');
		addRow.appendChild(el('span', null, 'Add this character to'));
		['a', 'b'].forEach(function (side) {
			var b = el('button', 'lvlcalc-addbtn', side.toUpperCase());
			b.type = 'button';
			b.addEventListener('click', function () {
				if (!cur) { return; }
				teams[side].push({
					c: cur,
					lvl: lvl(inB),
					mut: mutVal(),
					paired: swIn.checked && cur.pair
				});
				drawTeams();
			});
			addRow.appendChild(b);
		});

		var teamWrap = el('div', 'lvlcalc-teams');
		var panes = {};
		['a', 'b'].forEach(function (side) {
			var pane = el('div', 'lvlcalc-team');
			var head = el('div', 'lvlcalc-teamhead', side.toUpperCase());
			var bar = el('div', 'lvlcalc-bar');
			var rows = el('div', 'lvlcalc-tlist');
			var tot = el('div', 'lvlcalc-tot');
			pane.appendChild(head);
			pane.appendChild(bar);
			pane.appendChild(rows);
			pane.appendChild(tot);
			teamWrap.appendChild(pane);
			panes[side] = { bar: bar, rows: rows, tot: tot, head: head };
		});

		var verdict = el('div', 'lvlcalc-verdict');

		/* With nothing picked yet the two empty columns are just a hole in the
		   page, so the whole block collapses to one line until it has
		   something to show. */
		var hint = el('div', 'lvlcalc-hint',
			'Set a character up above, then put it in A or B to compare line-ups.');

		cmp.appendChild(addRow);
		cmp.appendChild(hint);
		cmp.appendChild(teamWrap);
		cmp.appendChild(verdict);
		root.appendChild(cmp);

		var RANK = {};
		Object.keys(RARITY).forEach(function (k, i) { RANK[k] = i; });

		/* Pairs up the characters that need a partner.

		   Two characters in the same line-up can satisfy each other, but only
		   one at a time — three Angelias still need three Selenes, not one.
		   So this is a matching problem, not a "is the partner here?" lookup.
		   Whoever cannot be matched gets a grey stand for a partner brought in
		   from outside.

		   Matched greedily, taking the character with the fewest options
		   first, which is exact for every line-up a plot can actually hold. */
		function countGhosts(list) {
			var want = [];
			list.forEach(function (e, i) { if (e.paired) { want.push(i); } });
			if (!want.length) { return 0; }

			var options = {};
			want.forEach(function (i) {
				options[i] = want.filter(function (j) {
					return j !== i &&
						(list[i].c.partners || []).indexOf(list[j].c.key) >= 0;
				});
			});

			var taken = {}, ghosts = 0;
			function freeOptions(i) {
				return options[i].filter(function (j) { return !taken[j]; });
			}

			while (true) {
				var free = want.filter(function (i) { return !taken[i]; });
				if (!free.length) { break; }

				var pick = null, picksOptions = null;
				free.forEach(function (i) {
					var o = freeOptions(i);
					if (pick === null || o.length < picksOptions.length) {
						pick = i;
						picksOptions = o;
					}
				});

				if (!picksOptions.length) {
					taken[pick] = true;
					ghosts++;
					continue;
				}

				var mate = picksOptions[0];
				var mateCount = freeOptions(mate).length;
				picksOptions.forEach(function (j) {
					var o = freeOptions(j).length;
					if (o < mateCount) { mate = j; mateCount = o; }
				});

				taken[pick] = true;
				taken[mate] = true;
			}

			return ghosts;
		}

		/* Income, slots used and the cells to draw for one line-up. */
		function teamStats(side) {
			var list = teams[side];
			var income = 0;
			var cells = [];

			list.forEach(function (e) {
				e.income = incomeAt(e.c.inc, e.lvl) * e.mut.x * (e.paired ? 3 : 1);
				income += e.income;
				cells.push({ r: e.c.r, rank: RANK[e.c.r] === undefined ? 99 : RANK[e.c.r] });
			});

			var ghosts = countGhosts(list);

			cells.sort(function (x, y) { return x.rank - y.rank; });
			for (var i = 0; i < ghosts; i++) { cells.push({ r: null, rank: 999 }); }

			var slots = list.length + ghosts;
			return {
				list: list,
				income: income,
				slots: slots,
				ghosts: ghosts,
				perSlot: slots ? income / slots : 0,
				cells: cells
			};
		}

		function drawTeams() {
			var st = { a: teamStats('a'), b: teamStats('b') };
			var anything = st.a.slots > 0 || st.b.slots > 0;

			if (anything) {
				cmp.classList.remove('is-empty');
			} else {
				cmp.classList.add('is-empty');
				return;
			}

			['a', 'b'].forEach(function (side) {
				var s = st[side];
				var pane = panes[side];

				pane.head.textContent = side.toUpperCase();
				if (s.slots) {
					pane.head.appendChild(el('span', null,
						'  \u00b7  ' + s.slots + ' slot' + (s.slots === 1 ? '' : 's') +
						(s.ghosts ? ', ' + s.ghosts + ' for partners' : '')));
				}

				pane.bar.textContent = '';
				pane.bar.hidden = !s.slots;
				s.cells.forEach(function (c) {
					var cell = el('span', 'lvlcalc-cell' + (c.r ? ' item-' + c.r : ' is-empty'));
					cell.title = c.r ? (RARITY[c.r] || {}).n || c.r : 'stand taken by a pair partner';
					pane.bar.appendChild(cell);
				});

				pane.rows.textContent = '';
				if (!s.list.length) {
					pane.rows.appendChild(el('div', 'lvlcalc-none', 'nothing here yet'));
				}
				s.list.forEach(function (e, i) {
					var row = el('div', 'lvlcalc-trow');
					var nm = el('span', 'rarity-text item-' + e.c.r, e.c.name);
					/* "Lv.500 Dracula (8x) paired" — the mutation keeps its own
					   colour so a line-up is readable at a glance. */
					var meta = el('span', 'lvlcalc-tmeta');
					meta.appendChild(el('span', null, 'Lv.' + e.lvl));
					if (e.mut && e.mut.x !== 1) {
						meta.appendChild(paintMut(
							el('span', 'lvlcalc-tmut', mutLabel(e.mut)), e.mut));
					}
					if (e.paired) {
						meta.appendChild(el('span', 'lvlcalc-tpair', 'paired'));
					}
					var val = el('span', 'lvlcalc-tval', shrt(e.income) + '/s');
					var del = el('button', 'lvlcalc-del', '\u00d7');
					del.type = 'button';
					del.setAttribute('aria-label', 'Remove ' + e.c.name);
					del.addEventListener('click', function () {
						teams[side].splice(i, 1);
						drawTeams();
					});
					row.appendChild(nm);
					row.appendChild(meta);
					row.appendChild(val);
					row.appendChild(del);
					pane.rows.appendChild(row);
				});

				pane.tot.textContent = '';
				if (s.slots) {
					pane.tot.appendChild(el('div', 'lvlcalc-totmain',
						'$' + shrt(s.income) + '/s'));
					pane.tot.appendChild(el('div', 'lvlcalc-totsub',
						'$' + shrt(s.perSlot) + '/s per slot'));
				}
			});

			verdict.textContent = '';
			if (!st.a.slots || !st.b.slots) { return; }

			/* Per slot is the verdict that matters, because stands are the
			   thing you cannot buy more of. Raw income is reported too, since
			   a line-up can lead on one and lose on the other. */
			var perKey = st.a.perSlot >= st.b.perSlot ? 'a' : 'b';
			var perLoser = perKey === 'a' ? 'b' : 'a';
			var perRatio = st[perLoser].perSlot
				? st[perKey].perSlot / st[perLoser].perSlot : 0;

			var rawKey = st.a.income >= st.b.income ? 'a' : 'b';
			var rawLoser = rawKey === 'a' ? 'b' : 'a';
			var rawRatio = st[rawLoser].income
				? st[rawKey].income / st[rawLoser].income : 0;

			var up = function (k) { return k.toUpperCase(); };

			if (st.a.slots === st.b.slots) {
				verdict.appendChild(el('div', 'is-main',
					up(perKey) + ' earns ' + perRatio.toFixed(2) +
					'\u00d7 more on the same ' + st.a.slots + ' slots.'));

			} else if (rawKey === perKey) {
				/* same line-up leads on both counts — nothing to weigh up */
				var win = el('div', 'is-main');
				win.appendChild(el('b', null, up(perKey) + ' wins outright'));
				win.appendChild(el('span', null,
					': ' + perRatio.toFixed(2) + '\u00d7 more per slot and ' +
					rawRatio.toFixed(2) + '\u00d7 more in total, on ' +
					st[perKey].slots + ' slots against ' + st[perLoser].slots + '.'));
				verdict.appendChild(win);

			} else {
				verdict.appendChild(el('div', 'is-main',
					up(perKey) + ' earns ' + perRatio.toFixed(2) +
					'\u00d7 more per slot (' + st.a.slots + ' vs ' +
					st.b.slots + ' slots used).'));

				var split = el('div');
				split.appendChild(el('b', null,
					up(rawKey) + ' earns ' + rawRatio.toFixed(2) + '\u00d7 more'));
				split.appendChild(el('span', null,
					' in raw income, but only by taking more stands \u2014 ' +
					'fill the spare ones and ' + up(perKey) + ' wins.'));
				verdict.appendChild(split);
			}

			/* Rarity is a separate currency from income: a line-up can lose
			   on cash per second and still be the one people want to trade
			   for. Only worth saying when one side actually reaches higher. */
			function topRarity(side) {
				var best = null;
				st[side].list.forEach(function (e) {
					var rank = RARITY_RANK[e.c.r];
					if (rank === undefined) { return; }
					if (best === null || rank < RARITY_RANK[best]) { best = e.c.r; }
				});
				return best;
			}

			var ra = topRarity('a'), rb = topRarity('b');
			if (ra && rb && RARITY_RANK[ra] !== RARITY_RANK[rb]) {
				var hi = RARITY_RANK[ra] < RARITY_RANK[rb] ? ra : rb;
				var lo = hi === ra ? rb : ra;
				var hiSide = hi === ra ? 'A' : 'B';

				var dem = el('div', 'lvlcalc-demand');
				dem.appendChild(el('span', null, 'Trade demand is higher for ' +
					hiSide + ': ' + article((RARITY[hi] || {}).n) + ' '));
				dem.appendChild(rarityNode(hi));
				dem.appendChild(el('span', null, ' is harder to get than ' +
					article((RARITY[lo] || {}).n) + ' '));
				dem.appendChild(rarityNode(lo));
				dem.appendChild(el('span', null, '.'));
				verdict.appendChild(dem);
			}
		}

		drawTeams();

		/* --- behaviour --- */

		function lvl(input) {
			var n = parseInt(input.value, 10);
			if (isNaN(n)) { n = 1; }
			return Math.min(1000, Math.max(1, n));
		}

		function extraMult() {
			var v = parseFloat(modIn.value.replace(/[^\d.]/g, ''));
			return (isFinite(v) && v > 0) ? v : 1;
		}

		/* The two toggles -> the fraction of the price still paid. */
		function keepFraction() {
			return DISCOUNTS[discPick][1];
		}

		function calc() {
			if (!cur) { return; }
			var a = lvl(inA), b = lvl(inB);
			var k = mutVal().x * (swIn.checked && cur.pair ? 3 : 1);
			var r = (cur.r || '').toLowerCase();

			/* Clona has no income of her own — she copies the best character
			   on the plot, so a number here would be meaningless. */
			if (cur.key === 'clona') {
				incK.textContent = 'Income at level ' + b;
				incBig.textContent = '25% of best stand';
				incExact.textContent = '(Copies top plot character)';
				incNow.textContent = 'Special ability (no cash per second)';
				modOut.textContent = '';
			} else {
				var atB = incomeAt(cur.inc, b) * k;
				var atA = incomeAt(cur.inc, a) * k;

				incK.textContent = 'Income at level ' + b;
				incBig.textContent = '~$' + shrt(atB) + '/s';
				incExact.textContent = '(~$' + exact(atB) + '/s)';
				incNow.textContent = 'now: $' + shrt(atA) + '/s (Lvl. ' + a + ')';

				var ex = extraMult();
				modOut.textContent = ex === 1 ? '' : '= ~$' + shrt(atB * ex) + '/s';
			}

			var fb = (RARITY[r] || {}).food;
			if (fb == null) {
				foodK.textContent = 'Food';
				foodBig.textContent = 'no data';
				foodExact.textContent = '';
				foodNext.textContent = 'food base for ' +
					((RARITY[r] || {}).n || cur.r) + ' not measured yet';
				return;
			}

			var keep = keepFraction();
			var off = keep < 1
				? ' \u00b7 ' + (Math.round((1 - keep) * 1000) / 10) + '% off'
				: '';
			if (b > a) {
				var total = foodSum(r, a, b, keep);
				foodK.textContent = 'Food ' + a + ' → ' + b + off;
				foodBig.textContent = '~' + shrt(total);
				foodExact.textContent = '(~' + exact(total) + ')';
			} else {
				foodK.textContent = 'Food' + off;
				foodBig.textContent = '—';
				foodExact.textContent = '';
			}
			foodNext.textContent = a >= 1000
				? ''
				: 'next level: ~' + shrt(foodAt(r, a, keep)) + ' (Lvl. ' + (a + 1) + ')';
		}

		function setChar(c) {
			cur = c;
			var r = RARITY[c.r] || { n: c.r, c: 'inherit' };
			nameEl.textContent = c.name;
			nameEl.className = 'rarity-text item-' + c.r;
			dotEl.className = 'lvlcalc-dot rarity-text item-' + c.r;
			rareEl.textContent = r.n;
			rareEl.className = 'lvlcalc-tag rarity-text item-' + c.r;
			baseEl.textContent = c.key === 'clona' ? '(25% best)' : '(' + shrt(c.inc) + '/s)';
			slotArt.textContent = '';
			slotArt.appendChild(itemNode(c, 104));
			swLbl.hidden = !c.pair;
			cap.textContent = 'click to change';
			calc();
		}

		function drawList() {
			var needle = q.value.trim().toLowerCase();
			var filt = rf.value;
			list.textContent = '';
			var hit = chars.filter(function (c) {
				return (!needle || c.name.toLowerCase().indexOf(needle) >= 0) &&
					(!filt || c.r === filt);
			});
			if (!hit.length) {
				list.appendChild(el('div', 'lvlcalc-none', 'Nothing found'));
				return;
			}
			hit.slice(0, 300).forEach(function (c) {
				var r = RARITY[c.r] || { n: c.r, c: 'inherit' };
				var btn = el('button');
				btn.type = 'button';
				if (c === cur) { btn.setAttribute('aria-current', 'true'); }
				var th = el('span', 'lvlcalc-th');
				th.appendChild(itemNode(c, 46));
				var nm = el('span', 'lvlcalc-nm');
				nm.appendChild(el('span', 'rarity-text item-' + c.r, c.name));
				nm.appendChild(el('em', 'rarity-text item-' + c.r, r.n));
				var cashTxt = c.key === 'clona' ? '25% best' : shrt(c.inc) + '/s';
				nm.appendChild(el('i', 'lvlcalc-cash', cashTxt));
				btn.appendChild(th);
				btn.appendChild(nm);
				btn.addEventListener('click', function () {
					setChar(c);
					pick.hidden = true;
					slotBtn.setAttribute('aria-expanded', 'false');
				});
				list.appendChild(btn);
			});
		}

		[inA, inB, swIn, modIn].forEach(function (e) {
			e.addEventListener('input', calc);
			e.addEventListener('change', calc);
		});
		q.addEventListener('input', drawList);
		rf.addEventListener('change', drawList);
		slotBtn.addEventListener('click', function () {
			var open = pick.hidden;
			pick.hidden = !open;
			slotBtn.setAttribute('aria-expanded', String(open));
			if (open) { drawList(); q.focus(); }
		});

		/* starting character: from the template's data-char, else first in list */
		var want = (root.getAttribute('data-char') || '').trim().toLowerCase();
		var start = null;
		if (want) {
			chars.some(function (c) {
				if (c.key === want) { start = c; return true; }
				return false;
			});
		}
		setChar(start || chars[0]);
		drawList();
	}

	/* ---------- data loading and start-up ---------- */

	var loading = null;

	function loadChars() {
		if (loading) { return loading; }
		var url = mw.config.get('wgScript') + '?title=' +
			encodeURIComponent(DATA_PAGE) + '&action=raw&ctype=application/json';

		loading = fetch(url).then(function (r) {
			if (!r.ok) { throw new Error('HTTP ' + r.status); }
			return r.json();
		}).then(function (raw) {
			/* The data is an array, because its order is the order the game
			   lists characters in and that is what the wiki pages render.
			   A character's key is its display name in lower case. */
			var list = (raw && raw.chars) || [];

			/* Pairs are declared once, on either side, so build the other
			   direction here: a character is pairable if it lists partners
			   or is named by someone else. */
			var partners = {};
			function link(a, b) {
				if (a === b) { return; }
				partners[a] = partners[a] || [];
				if (partners[a].indexOf(b) < 0) { partners[a].push(b); }
			}
			list.forEach(function (e) {
				if (!e || !e.n) { return; }
				var k = String(e.n).toLowerCase();
				(e.pairs || []).forEach(function (n) {
					var b = String(n).toLowerCase();
					link(k, b);
					link(b, k);
				});
			});

			var out = [];
			list.forEach(function (e) {
				if (!e || !e.n || typeof e.inc !== 'number') { return; }
				var k = String(e.n).toLowerCase();
				out.push({
					key: k,
					name: e.n,
					r: (e.r || '').toLowerCase(),
					inc: e.inc,
					partners: partners[k] || [],
					pair: !!(partners[k] && partners[k].length)
				});
			});

			/* strongest rarity first (RARITY is declared in that order),
			   then by income inside each rarity */
			var order = {};
			Object.keys(RARITY).forEach(function (k, i) { order[k] = i; });
			out.sort(function (x, y) {
				var ox = order[x.r], oy = order[y.r];
				if (ox === undefined) { ox = 999; }
				if (oy === undefined) { oy = 999; }
				if (ox !== oy) { return ox - oy; }
				return y.inc - x.inc;
			});
			return out;
		});
		return loading;
	}

	function init($content) {
		var nodes = ($content ? $content[0] : document).querySelectorAll('.lvlcalc:not(.is-ready)');
		if (!nodes.length) { return; }

		loadChars().then(function (chars) {
			if (!chars.length) { return; }
			Array.prototype.forEach.call(nodes, function (n) {
				try {
					build(n, chars);
				} catch (err) {
					mw.log.error('[LevelCalc]', err);
				}
			});
		}).catch(function (err) {
			mw.log.error('[LevelCalc] failed to load ' + DATA_PAGE, err);
		});
	}

	mw.hook('wikipage.content').add(init);
}());