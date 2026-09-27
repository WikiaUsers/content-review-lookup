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
 * Exact formulas:
 *   income cashpersec:
 *     Levels 1 -> 100:  x1.0352 per level (99 steps)
 *     Levels 100 -> 250: x1.0081 per level (150 steps)
 *     Levels 250 -> 750: x1.0028 per level (500 steps)
 *     Levels 750+:      x1.0023 per level
 *
 *   food (Level Up Cost):
 *     Base cost: Common=2, Uncommon=5, Rare=2, Epic=4, Legendary=5,
 *                Mythical=8, Cosmic=16, Secret=22, Rainbow=40, Ascended=72,
 *                Divine=225, Supreme=740, Celestial=1250, Ancient=4000,
 *                God=8800, Omniscient=12500, Transcendent=17500, Exclusive=20
 *     multiplier (applied to previous level):
 *       Levels 1 -> 75:   x1.134 per level (74 steps)
 *       Levels 75 -> 150:  x1.03  per level (75 steps)
 *       Levels 150 -> 300: x1.016 per level (150 steps)
 *       Levels 300 -> 500: x1.008 per level (200 steps)
 *       Levels 500 -> 750: x1.025 per level (250 steps)
 *       Levels 750+:      x1.12  per level
 * ========================================================================== */

(function () {
	'use strict';

	var DATA_PAGE = 'Module:CharData/data.json';

	/* Rarities: label, colour and exact base food */
	var RARITY = {
		exclusive: { n: 'Exclusive', c: '#8a8a93', food: 20 },
		transcendent: { n: 'Transcendent', c: '#f0f0f5', food: 17500 },
		omniscient: { n: 'Omniscient', c: '#b8a0e8', food: 12500 },
		god: { n: 'God', c: '#d4a72c', food: 8800 },
		ancient: { n: 'Ancient', c: '#c9743a', food: 4000 },
		celestial: { n: 'Celestial', c: '#5aa9dd', food: 1250 },
		supreme: { n: 'Supreme', c: '#e06a3a', food: 740 },
		divine: { n: 'Divine', c: '#d9a521', food: 225 },
		ascended: { n: 'Ascended', c: '#9b6fe0', food: 72 },
		rainbow: { n: 'Rainbow', c: '#3f9fd4', food: 40 },
		secret: { n: 'Secret', c: '#e04f8e', food: 22 },
		cosmic: { n: 'Cosmic', c: '#4f7fd4', food: 16 },
		mythical: { n: 'Mythical', c: '#e0574a', food: 8 },
		legendary: { n: 'Legendary', c: '#d9a33a', food: 5 },
		epic: { n: 'Epic', c: '#a06fd0', food: 4 },
		rare: { n: 'Rare', c: '#4a90d9', food: 2 },
		uncommon: { n: 'Uncommon', c: '#4a9d6b', food: 5 },
		common: { n: 'Common', c: '#8a8a93', food: 2 }
	};

	/* mutation */
	var MUT = [
		['No mutation', 1], ['Demonic', 10], ['Dracula', 8], ['Nightmare', 7],
		['Angelic', 6], ['Mars', 6], ['Void', 6], ['Sinister', 5],
		['Lunar', 4], ['Solar', 4], ['Toxic', 4], ['Complexity', 2.5],
		['Ghost', 2.5], ['Blood', 2], ['Electric', 2], ['Lava', 2],
		['Slime', 2], ['Zombie', 2], ['Diamond', 1.5], ['Frozen', 1.5],
		['Party', 1.5], ['Gold', 1.2], ['Honey', 1.2]
	];

	/* ---------- maths ---------- */

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

	var FoodsMultiplier = [
		{ steps: 74, rate: 1.134 },
		{ steps: 75, rate: 1.03 },
		{ steps: 150, rate: 1.016 },
		{ steps: 200, rate: 1.008 },
		{ steps: 250, rate: 1.025 },
		{ steps: 9999, rate: 1.12 } /* fallback for +750 level, no change after that */
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

	function foodAt(rarityKey, lvl) {
		var r = (rarityKey || '').toLowerCase();
		var base = (RARITY[r] && RARITY[r].food != null) ? RARITY[r].food : 0;
		if (!base) { return 0; }
		return Math.max(1, Math.floor(base * getLevelCurveMultiplier(lvl) + 0.5));
	}

	function foodSum(rarityKey, a, b) {
		var s = 0, l;
		for (l = a; l < b; l++) {
			s += foodAt(rarityKey, l);
		}
		return s;
	}

	/* Short-scale suffixes */
	var Suffix = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No',
		'Dc', 'Ud', 'Dd', 'Td', 'Qad', 'Qid', 'Sxd', 'Spd', 'Ocd', 'Nod', 'Vg',
		'Uvg', 'Dvg', 'Tvg', 'Qavg', 'Qivg', 'Sxvg', 'Spvg', 'Ocvg', 'Novg'];

	function shrt(n) {
		if (!isFinite(n)) { return '\u221e'; }
		if (n < 1000) { return String(Math.round(n)); }
		var tier = Math.floor(Math.log10(n) / 3);
		if (tier >= Suffix.length) { tier = Suffix.length - 1; }
		var v = n / Math.pow(10, tier * 3);
		return (v >= 100 ? v.toFixed(0) : v.toFixed(2)) + Suffix[tier];
	}

	function exact(n) {
		if (!isFinite(n)) { return '\u221e'; }
		if (n >= 1e21) { return n.toExponential(3).replace('e+', ' \u00d7 10^'); }
		return Math.round(n).toLocaleString('en-US');
	}

	/* ---------- small helpers ---------- */

	function el(tag, cls, text) {
		var e = document.createElement(tag);
		if (cls) { e.className = cls; }
		if (text != null) { e.textContent = text; }
		return e;
	}

	function artUrl(name, width) {
		return mw.config.get('wgScriptPath') + '/index.php?title=' +
			encodeURIComponent('Special:FilePath/' + name + '.png') +
			'&width=' + width;
	}

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
		var dotEl = el('span', 'lvlcalc-dot', '\u2022');
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
		steps.appendChild(el('span', 'lvlcalc-ar', '\u2192'));
		steps.appendChild(el('span', 'lvlcalc-sep'));
		steps.appendChild(inB);
		fLv.appendChild(lLv);
		fLv.appendChild(steps);

		var fMut = el('span', 'lvlcalc-f');
		var lMut = el('label', null, 'Mutation');
		lMut.htmlFor = uid + 'm';
		var selMut = el('select');
		selMut.id = uid + 'm';
		MUT.forEach(function (m) {
			var o = el('option', null, m[1] === 1 ? m[0] : m[0] + ' \u00d7' + m[1]);
			o.value = m[1];
			selMut.appendChild(o);
		});
		fMut.appendChild(lMut);
		fMut.appendChild(selMut);

		var swLbl = el('label', 'lvlcalc-sw');
		var swIn = el('input');
		swIn.type = 'checkbox';
		swIn.checked = true;
		swLbl.appendChild(swIn);
		swLbl.appendChild(el('span', 'lvlcalc-track'));
		swLbl.appendChild(el('span', null, 'paired \u00d73'));

		row.appendChild(fLv);
		row.appendChild(fMut);
		row.appendChild(swLbl);

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
		modBox.appendChild(el('span', 'lvlcalc-x', '\u00d7'));
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

		function calc() {
			if (!cur) { return; }
			var a = lvl(inA), b = lvl(inB);
			var k = (parseFloat(selMut.value) || 1) * (swIn.checked && cur.pair ? 3 : 1);
			var r = (cur.r || 'common').toLowerCase();

			if (cur.key === 'clona') {
				incK.textContent = 'Income at level ' + b;
				incBig.textContent = '25% of best stand';
				incExact.textContent = '(Copies top plot character)';
				incNow.textContent = 'Special ability (no cash per seconds)';
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

			var fb = (RARITY[cur.r] || {}).food;
			if (!fb) {
				foodK.textContent = 'Food';
				foodBig.textContent = 'no data';
				foodExact.textContent = '';
				foodNext.textContent = 'food base for ' +
					((RARITY[cur.r] || {}).n || cur.r) + ' not measured yet';
				return;
			}

			if (b > a) {
				var total = foodSum(r, a, b);
				foodK.textContent = 'Food ' + a + ' \u2192 ' + b;
				foodBig.textContent = '~' + shrt(total);
				foodExact.textContent = '(~' + exact(total) + ')';
			} else {
				foodK.textContent = 'Food';
				foodBig.textContent = '—';
				foodExact.textContent = '';
			}
			foodNext.textContent = a >= 1000
				? ''
				: 'next level: ~' + shrt(foodAt(r, a)) + ' (Lvl. ' + (a + 1) + ')';
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

		[inA, inB, selMut, swIn, modIn].forEach(function (e) {
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
			var out = [];
			Object.keys(raw).forEach(function (key) {
				if (key.charAt(0) === '_') { return; }
				var e = raw[key];
				if (!e || typeof e.inc !== 'number') { return; }
				out.push({
					key: key,
					name: e.n || key.replace(/\b\w/g, function (ch) { return ch.toUpperCase(); }),
					r: e.r,
					inc: e.inc,
					pair: !!e.pair
				});
			});

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