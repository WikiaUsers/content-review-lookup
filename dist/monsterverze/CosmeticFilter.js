/* MonsterVerze Cosmetic Live Filter */

(function () {
	'use strict';

	window.mvCosmeticFilterLoaded = true;
	console.log('MonsterVerze CosmeticFilter.js loaded');

	function cleanText(value) {
		return String(value || '')
			.toLowerCase()
			.replace(/&nbsp;/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	}

	function prettyText(value) {
		return String(value || '')
			.replace(/&nbsp;/g, ' ')
			.replace(/\s+/g, ' ')
			.trim();
	}

	function normalizeType(value) {
		var type = cleanText(value);

		if (type === 'face') return 'faces';
		if (type === 'accessory') return 'accessories';
		if (type === 'top') return 'tops';
		if (type === 'bottom') return 'bottoms';
		if (type === 'shoe' || type === 'shoes') return 'footwear';
		if (type === 'full') return 'full';
		if (type === 'wing') return 'wings';
		if (type === 'arm') return 'arms';

		return type;
	}

	function typeLabel(value) {
		value = normalizeType(value);

		if (value === 'hair') return 'Hair';
		if (value === 'faces') return 'Faces';
		if (value === 'accessories') return 'Accessories';
		if (value === 'tops') return 'Tops';
		if (value === 'full') return 'Full';
		if (value === 'arms') return 'Arms';
		if (value === 'bottoms') return 'Bottoms';
		if (value === 'footwear') return 'Footwear';
		if (value === 'wings') return 'Wings';

		return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
	}

	function normalizeSource(value) {
		var source = cleanText(value);

		if (
			source === 'investor' ||
			source === 'investor item' ||
			source === 'investor items' ||
			source === 'investor only'
		) return 'investor';

		if (source === 'code' || source === 'codes' || source === 'code items') return 'code';

		if (source === 'v.i.m' || source === 'v.i.m items' || source === 'vim items') return 'vim';

		if (
			source === 'mv bootique' ||
			source === 'mv bootique items' ||
			source === 'bootique' ||
			source === 'bootique items' ||
			source === 'shop' ||
			source === 'shop items'
		) return 'bootique';

		if (source === 'quest items') return 'quest';

		if (
			source === 'event items' ||
			source === 'competition' ||
			source === 'competition mode' ||
			source === 'competition items'
		) return 'event';

		if (source === 'free items') return 'free';

		return source;
	}

	function sourceLabel(value) {
		value = normalizeSource(value);

		if (value === 'free') return 'Free Items';
		if (value === 'code') return 'Code Items';
		if (value === 'bootique') return 'MV Bootique Items';
		if (value === 'vim') return 'V.I.M Items';
		if (value === 'quest') return 'Quest Items';
		if (value === 'event') return 'Event Items';
		if (value === 'investor') return 'Investor Items';

		return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
	}

	function normalizeStyle(value) {
		var style = cleanText(value);

		if (
			style === 'fem' ||
			style === 'female' ||
			style === 'feminine hair' ||
			style === 'feminine hairstyles' ||
			style === 'feminine faces' ||
			style === 'feminine face'
		) return 'feminine';

		if (
			style === 'masc' ||
			style === 'male' ||
			style === 'masculine hair' ||
			style === 'masculine hairstyles' ||
			style === 'masculine faces' ||
			style === 'masculine face'
		) return 'masculine';

		if (
			style === 'uni' ||
			style === 'unisex' ||
			style === 'both' ||
			style === 'all' ||
			style === 'neutral'
		) return 'unisex';

		return style;
	}

	function styleLabel(value) {
		value = normalizeStyle(value);

		if (value === 'feminine') return 'Feminine';
		if (value === 'masculine') return 'Masculine';
		if (value === 'unisex') return 'Unisex';

		return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
	}

	function styleMatches(cardStyle, wantedStyle) {
		if (!wantedStyle) return true;
		if (cardStyle === wantedStyle) return true;

		if (cardStyle === 'unisex' && (wantedStyle === 'feminine' || wantedStyle === 'masculine')) {
			return true;
		}

		return false;
	}

	function applyStyleView(list, controls) {
		var styleValue = controls.style ? normalizeStyle(controls.style.value) : '';

		list.classList.remove('mv-style-feminine');
		list.classList.remove('mv-style-masculine');

		if (styleValue === 'feminine') {
			list.classList.add('mv-style-feminine');
		} else if (styleValue === 'masculine') {
			list.classList.add('mv-style-masculine');
		}
	}

	function normalizeSeason(value) {
		return cleanText(value)
			.replace(/season/g, '')
			.replace(/[^0-9/]/g, '')
			.trim();
	}

	function getNewStatus(card) {
		var raw = cleanText(card.getAttribute('data-new') || '');

		if (raw === 'new') return 'new';
		if (raw === 'not-new' || raw === 'not new') return 'not-new';

		if (card.querySelector('.mv-new-badge-label, .mv-new-badge-inline, .mv-infobox-new-label')) {
			return 'new';
		}

		return 'not-new';
	}

	function splitCredits(value) {
		return prettyText(value)
			.replace(/\s+and\s+/gi, ' & ')
			.replace(/\s*,\s*/g, ' & ')
			.split('&')
			.map(function (part) {
				return prettyText(part);
			})
			.filter(Boolean);
	}

	function makeOption(value, label) {
		var option = document.createElement('option');
		option.value = value;
		option.textContent = label;
		return option;
	}

	function getCardData(card) {
		var name = card.getAttribute('data-name') || card.textContent || '';
		var type = card.getAttribute('data-type') || '';
		var source = card.getAttribute('data-source') || '';
		var style = card.getAttribute('data-style') || '';
		var credit = card.getAttribute('data-credit') || card.getAttribute('data-credits') || '';
		var season = card.getAttribute('data-season-plain') || '';
		var newStatus = getNewStatus(card);

		return {
			name: cleanText(name),
			namePretty: prettyText(name),
			type: normalizeType(type),
			source: normalizeSource(source),
			style: normalizeStyle(style),
			credit: cleanText(credit),
			creditPretty: prettyText(credit),
			season: normalizeSeason(season),
			newStatus: newStatus,
			searchText: cleanText([
				name,
				type,
				source,
				style,
				credit,
				season,
				newStatus,
				card.textContent || ''
			].join(' '))
		};
	}

	function typeSortValue(type) {
		var order = {
			hair: 1,
			faces: 2,
			accessories: 3,
			tops: 4,
			full: 5,
			arms: 6,
			bottoms: 7,
			footwear: 8,
			wings: 9
		};

		return order[normalizeType(type)] || 999;
	}

	function sourceSortValue(source) {
		var order = {
			free: 1,
			code: 1,
			bootique: 2,
			quest: 3,
			event: 4,
			vim: 5,
			investor: 6
		};

		return order[normalizeSource(source)] || 999;
	}

	function styleSortValue(style) {
		var order = {
			feminine: 1,
			masculine: 2,
			unisex: 3
		};

		return order[normalizeStyle(style)] || 999;
	}

	function seasonSortValue(season) {
		var first = String(season || '').split('/')[0];
		var number = parseInt(first, 10);

		return isNaN(number) ? 999 : number;
	}

	function newSortValue(status) {
		return status === 'new' ? 1 : 2;
	}

	function uniqueValues(cards, key) {
		var values = {};

		cards.forEach(function (card) {
			var data = getCardData(card);
			if (data[key]) values[data[key]] = true;
		});

		return Object.keys(values);
	}

	function addStyles() {
		if (document.getElementById('mv-cosmetic-filter-css')) return;

		var style = document.createElement('style');
		style.id = 'mv-cosmetic-filter-css';
		style.textContent =
			'.mv-cosmetic-controls{' +
				'display:flex!important;' +
				'flex-wrap:wrap!important;' +
				'gap:8px!important;' +
				'align-items:center!important;' +
				'justify-content:center!important;' +
				'padding:10px!important;' +
				'border-bottom:1px solid #ff00e6!important;' +
				'background:rgba(20,0,25,.92)!important;' +
			'}' +

			'.mv-cosmetic-search,.mv-cosmetic-select,.mv-cosmetic-reset{' +
				'min-height:32px!important;' +
				'border-radius:6px!important;' +
				'border:1px solid #ff00e6!important;' +
				'background:#2a0630!important;' +
				'color:#fff!important;' +
				'font-family:Urbanist,sans-serif!important;' +
				'font-weight:800!important;' +
				'box-shadow:0 0 6px rgba(255,0,230,.45)!important;' +
			'}' +

			'.mv-cosmetic-search{' +
				'width:min(320px,95%)!important;' +
				'padding:4px 10px!important;' +
			'}' +

			'.mv-cosmetic-select{' +
				'padding:4px 8px!important;' +
			'}' +

			'.mv-cosmetic-reset{' +
				'padding:4px 12px!important;' +
				'cursor:pointer!important;' +
				'background:#d600c8!important;' +
			'}' +

			'.mv-cosmetic-reset:hover{' +
				'filter:brightness(1.15)!important;' +
			'}' +

			'.mv-cosmetic-count{' +
				'font-family:Urbanist,sans-serif!important;' +
				'font-weight:900!important;' +
				'color:#fff!important;' +
				'text-shadow:1px 1px 0 #000!important;' +
				'padding:4px 8px!important;' +
			'}' +

			'.mv-cosmetic-no-results{' +
				'display:none!important;' +
				'margin:18px auto!important;' +
				'padding:12px!important;' +
				'text-align:center!important;' +
				'color:#fff!important;' +
				'font-family:Urbanist,sans-serif!important;' +
				'font-weight:900!important;' +
			'}';

		document.head.appendChild(style);
	}

	function buildControls(box, cards) {
		var oldWrapper = box.querySelector('.mv-filter-wrapper');
		if (oldWrapper) oldWrapper.style.display = 'none';

		var controls = document.createElement('div');
		controls.className = 'mv-cosmetic-controls';

		var search = document.createElement('input');
		search.className = 'mv-cosmetic-search';
		search.type = 'search';
		search.placeholder = 'Search items or credits...';
		controls.appendChild(search);

		var types = uniqueValues(cards, 'type').sort(function (a, b) {
			return typeSortValue(a) - typeSortValue(b);
		});

		var typeSelect = null;
		if (types.length > 1) {
			typeSelect = document.createElement('select');
			typeSelect.className = 'mv-cosmetic-type-filter mv-cosmetic-select';
			typeSelect.appendChild(makeOption('', 'All Categories'));

			types.forEach(function (type) {
				typeSelect.appendChild(makeOption(type, typeLabel(type)));
			});

			controls.appendChild(typeSelect);
		}

		var styles = uniqueValues(cards, 'style').sort(function (a, b) {
			return styleSortValue(a) - styleSortValue(b);
		});

		var styleSelect = null;
		if (styles.length > 1) {
			styleSelect = document.createElement('select');
			styleSelect.className = 'mv-cosmetic-style-filter mv-cosmetic-select';
			styleSelect.appendChild(makeOption('', 'All Styles'));

			styles.forEach(function (style) {
				styleSelect.appendChild(makeOption(style, styleLabel(style)));
			});

			controls.appendChild(styleSelect);
		}

		var sources = uniqueValues(cards, 'source').sort(function (a, b) {
			return sourceSortValue(a) - sourceSortValue(b);
		});

		var sourceSelect = null;
		if (sources.length > 1) {
			sourceSelect = document.createElement('select');
			sourceSelect.className = 'mv-cosmetic-source-filter mv-cosmetic-select';
			sourceSelect.appendChild(makeOption('', 'All Sources'));

			sources.forEach(function (source) {
				sourceSelect.appendChild(makeOption(source, sourceLabel(source)));
			});

			controls.appendChild(sourceSelect);
		}

		var creditSelect = document.createElement('select');
		creditSelect.className = 'mv-cosmetic-credit-filter mv-cosmetic-select';
		creditSelect.appendChild(makeOption('', 'All Credits'));

		var credits = {};
		cards.forEach(function (card) {
			var data = getCardData(card);
			splitCredits(data.creditPretty).forEach(function (credit) {
				var key = cleanText(credit);
				if (key && key !== 'unknown') credits[key] = credit;
			});
		});

		Object.keys(credits).sort(function (a, b) {
			return credits[a].localeCompare(credits[b]);
		}).forEach(function (key) {
			creditSelect.appendChild(makeOption(key, credits[key]));
		});

		controls.appendChild(creditSelect);

		var seasonSelect = document.createElement('select');
		seasonSelect.className = 'mv-cosmetic-season-filter mv-cosmetic-select';
		seasonSelect.appendChild(makeOption('', 'All Seasons'));

		var seasons = {};
		cards.forEach(function (card) {
			var data = getCardData(card);
			if (!data.season) return;

			data.season.split('/').forEach(function (season) {
				season = normalizeSeason(season);
				if (season) seasons[season] = 'Season ' + season;
			});
		});

		Object.keys(seasons).sort(function (a, b) {
			return seasonSortValue(a) - seasonSortValue(b);
		}).forEach(function (season) {
			seasonSelect.appendChild(makeOption(season, seasons[season]));
		});

		controls.appendChild(seasonSelect);

		var newStatuses = uniqueValues(cards, 'newStatus');
		var newSelect = null;

		if (newStatuses.length > 1) {
			newSelect = document.createElement('select');
			newSelect.className = 'mv-cosmetic-new-filter mv-cosmetic-select';
			newSelect.appendChild(makeOption('', 'All Statuses'));
			newSelect.appendChild(makeOption('new', 'New Items'));
			newSelect.appendChild(makeOption('not-new', 'Not New'));
			controls.appendChild(newSelect);
		}

		var sortSelect = document.createElement('select');
		sortSelect.className = 'mv-cosmetic-sort mv-cosmetic-select';
		sortSelect.appendChild(makeOption('default', 'Default Order'));
		sortSelect.appendChild(makeOption('name', 'Sort by Name'));
		sortSelect.appendChild(makeOption('credit', 'Sort by Credit'));

		if (types.length > 1) sortSelect.appendChild(makeOption('type', 'Sort by Category'));
		if (styles.length > 1) sortSelect.appendChild(makeOption('style', 'Sort by Style'));
		if (sources.length > 1) sortSelect.appendChild(makeOption('source', 'Sort by Source'));

		sortSelect.appendChild(makeOption('season', 'Sort by Season'));

		if (newStatuses.length > 1) sortSelect.appendChild(makeOption('new', 'Sort by New'));

		controls.appendChild(sortSelect);

		var reset = document.createElement('button');
		reset.type = 'button';
		reset.className = 'mv-cosmetic-reset';
		reset.textContent = 'Reset';
		controls.appendChild(reset);

		var count = document.createElement('span');
		count.className = 'mv-cosmetic-count';
		controls.appendChild(count);

		var oldControls = box.querySelector('.mv-cosmetic-controls');
		if (oldControls) oldControls.remove();

		var title = box.querySelector('.mv-filter-title');
		var content = box.querySelector('.mv-filter-content');

		if (title) {
			title.insertAdjacentElement('afterend', controls);
		} else if (content) {
			content.insertAdjacentElement('beforebegin', controls);
		} else {
			box.insertBefore(controls, box.firstChild);
		}

		return {
			search: search,
			type: typeSelect,
			style: styleSelect,
			source: sourceSelect,
			credit: creditSelect,
			season: seasonSelect,
			newStatus: newSelect,
			sort: sortSelect,
			reset: reset,
			count: count
		};
	}

	function sortCards(list, cards, controls) {
		var sort = controls.sort.value || 'default';

		cards.sort(function (a, b) {
			var dataA = getCardData(a);
			var dataB = getCardData(b);

			if (sort === 'default') {
				return Number(a.getAttribute('data-original-index') || 0) -
					Number(b.getAttribute('data-original-index') || 0);
			}

			if (sort === 'credit' && dataA.credit !== dataB.credit) {
				return (dataA.credit || 'zzzzzz').localeCompare(dataB.credit || 'zzzzzz');
			}

			if (sort === 'type') {
				var typeA = typeSortValue(dataA.type);
				var typeB = typeSortValue(dataB.type);
				if (typeA !== typeB) return typeA - typeB;
			}

			if (sort === 'style') {
				var styleA = styleSortValue(dataA.style);
				var styleB = styleSortValue(dataB.style);
				if (styleA !== styleB) return styleA - styleB;
			}

			if (sort === 'source') {
				var sourceA = sourceSortValue(dataA.source);
				var sourceB = sourceSortValue(dataB.source);
				if (sourceA !== sourceB) return sourceA - sourceB;
			}

			if (sort === 'season') {
				var seasonA = seasonSortValue(dataA.season);
				var seasonB = seasonSortValue(dataB.season);
				if (seasonA !== seasonB) return seasonA - seasonB;
			}

			if (sort === 'new') {
				var newA = newSortValue(dataA.newStatus);
				var newB = newSortValue(dataB.newStatus);
				if (newA !== newB) return newA - newB;
			}

			return dataA.name.localeCompare(dataB.name);
		});

		cards.forEach(function (card) {
			list.appendChild(card);
		});
	}

	function filterCards(box, cards, controls) {
		var searchValue = cleanText(controls.search.value);
		var typeValue = controls.type ? normalizeType(controls.type.value) : '';
		var styleValue = controls.style ? normalizeStyle(controls.style.value) : '';
		var sourceValue = controls.source ? normalizeSource(controls.source.value) : '';
		var creditValue = cleanText(controls.credit.value);
		var seasonValue = normalizeSeason(controls.season.value);
		var newValue = controls.newStatus ? cleanText(controls.newStatus.value) : '';

		var visibleCount = 0;

		cards.forEach(function (card) {
			var data = getCardData(card);
			var show = true;

			if (searchValue && data.searchText.indexOf(searchValue) === -1) show = false;
			if (typeValue && data.type !== typeValue) show = false;
			if (styleValue && !styleMatches(data.style, styleValue)) show = false;
			if (sourceValue && data.source !== sourceValue) show = false;
			if (creditValue && data.credit.indexOf(creditValue) === -1) show = false;

			if (seasonValue) {
				var cardSeasons = data.season ? data.season.split('/') : [];
				if (cardSeasons.indexOf(seasonValue) === -1) show = false;
			}

			if (newValue && data.newStatus !== newValue) show = false;

			if (show) {
				card.style.removeProperty('display');
				visibleCount++;
			} else {
				card.style.setProperty('display', 'none', 'important');
			}
		});

		controls.count.textContent = visibleCount + ' item' + (visibleCount === 1 ? '' : 's');

		var noResults = box.querySelector('.mv-cosmetic-no-results');

		if (!noResults) {
			noResults = document.createElement('div');
			noResults.className = 'mv-cosmetic-no-results';
			noResults.textContent = 'No matching items found.';

			var content = box.querySelector('.mv-filter-content');
			if (content) content.appendChild(noResults);
			else box.appendChild(noResults);
		}

		noResults.style.display = visibleCount === 0 ? 'block' : 'none';
	}

	function initList(list) {
	var box = list.closest('.mv-filter-box') || list.parentElement;
	if (!box) return;

	// Already wired up. start() runs again on a timer, and rebuilding the
	// controls would recreate every select at its default value and throw
	// away whatever the user has picked.
	if (list.getAttribute('data-mv-cosmetic-filter-ready') === 'true') {
		return;
	}

	var filterMode = cleanText(box.getAttribute('data-filter') || 'show');

	if (
		filterMode === 'none' ||
		filterMode === 'no' ||
		filterMode === 'hide' ||
		filterMode === 'off' ||
		filterMode === 'false'
	) {
		console.log('MonsterVerze cosmetic filter skipped because data-filter is', filterMode);
		return;
	}

	var cards = Array.prototype.slice.call(list.children).filter(function (child) {
		return child.classList && child.classList.contains('mv-item-card');
	});

	if (!cards.length) {
		console.log('MonsterVerze cosmetic filter found list but no cards.');
		return;
	}

	list.setAttribute('data-mv-cosmetic-filter-ready', 'true');

	cards.forEach(function (card, index) {
		card.setAttribute('data-original-index', index);
	});

	var controls = buildControls(box, cards);

		function update() {
			applyStyleView(list, controls);
			sortCards(list, cards, controls);
			filterCards(box, cards, controls);
		}

		controls.search.addEventListener('input', update);

		if (controls.type) controls.type.addEventListener('change', update);
		if (controls.style) controls.style.addEventListener('change', update);
		if (controls.source) controls.source.addEventListener('change', update);

		controls.credit.addEventListener('change', update);
		controls.season.addEventListener('change', update);

		if (controls.newStatus) controls.newStatus.addEventListener('change', update);

		controls.sort.addEventListener('change', update);

		controls.reset.addEventListener('click', function (event) {
			event.preventDefault();

			controls.search.value = '';
			if (controls.type) controls.type.value = '';
			if (controls.style) controls.style.value = '';
			if (controls.source) controls.source.value = '';
			controls.credit.value = '';
			controls.season.value = '';
			if (controls.newStatus) controls.newStatus.value = '';
			controls.sort.value = 'default';

			update();
		});

		update();

		console.log('MonsterVerze cosmetic controls created:', cards.length, 'cards');
	}

	function start() {
		addStyles();

		var lists = document.querySelectorAll('#cosmeticList, #cosmeticlist, .mv-cosmetic-list .mv-gallery-grid');

		console.log('MonsterVerze cosmetic lists found:', lists.length);

		lists.forEach(function (list) {
			try {
				initList(list);
			} catch (error) {
				console.error('MonsterVerze CosmeticFilter failed:', error);
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}

	window.setTimeout(start, 750);
	window.setTimeout(start, 2000);
}());