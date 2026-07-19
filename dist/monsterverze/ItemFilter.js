/* MonsterVerze Item Live Filter
 * No jQuery.
 *
 * For Weapons and Mounts.
 *
 * Uses:
 *   #itemList   = weapons
 *   #mountList  = mounts
 *   .mv-filter-box
 *   .mv-item-card
 *
 * Card data expected:
 *   data-rarity
 *   data-season
 */

(function () {
	'use strict';

	console.log('MonsterVerze ItemFilter.js loaded');

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

	function normalizeRarity(value) {
		var rarity = cleanText(value);

		rarity = rarity.replace(/^rarity-/, '');

		if (rarity === 'mythical') {
			return 'mythic';
		}

		return rarity;
	}

	function rarityLabel(value) {
		value = normalizeRarity(value);

		if (value === 'common') return 'Common';
		if (value === 'uncommon') return 'Uncommon';
		if (value === 'rare') return 'Rare';
		if (value === 'epic') return 'Epic';
		if (value === 'legendary') return 'Legendary';
		if (value === 'mythic') return 'Mythic';

		return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
	}

	function normalizeSeason(value) {
		return cleanText(value)
			.replace(/season/g, '')
			.replace(/-/g, '')
			.replace(/[^0-9/ ]/g, '')
			.trim();
	}

	function getSeasonList(value) {
		var text = cleanText(value);

		text = text.replace(/season-/g, 'season ');
		text = text.replace(/season/g, '');
		text = text.replace(/[^0-9/ ]/g, ' ');

		var parts = [];

		text.split(/\s+/).forEach(function (part) {
			part.split('/').forEach(function (season) {
				season = normalizeSeason(season);

				if (season && parts.indexOf(season) === -1) {
					parts.push(season);
				}
			});
		});

		return parts;
	}

	function seasonLabel(value) {
		value = normalizeSeason(value);

		return value ? 'Season ' + value : '';
	}

	function raritySortValue(rarity) {
		var order = {
			common: 1,
			uncommon: 2,
			rare: 3,
			epic: 4,
			legendary: 5,
			mythic: 6
		};

		return order[normalizeRarity(rarity)] || 999;
	}

	function seasonSortValue(season) {
		var first = String(season || '').split('/')[0];
		var number = parseInt(first, 10);

		return isNaN(number) ? 999 : number;
	}

	function makeOption(value, label) {
		var option = document.createElement('option');
		option.value = value;
		option.textContent = label;
		return option;
	}

	function getCardName(card) {
		var text = '';

		var label = card.querySelector('.mv-card-text');

		if (label) {
			text = label.textContent || '';
		}

		if (!text) {
			text = card.getAttribute('data-name') || card.textContent || '';
		}

		return prettyText(text);
	}

	function getCardData(card) {
		var rarity = normalizeRarity(card.getAttribute('data-rarity') || '');
		var seasons = getSeasonList(card.getAttribute('data-season') || '');
		var name = getCardName(card);

		var searchText = [
			name,
			rarity,
			seasons.join(' '),
			card.textContent || ''
		].join(' ');

		return {
			name: cleanText(name),
			namePretty: prettyText(name),
			rarity: rarity,
			seasons: seasons,
			searchText: cleanText(searchText)
		};
	}

	function getAvailableRarities(cards) {
		var rarities = {};

		cards.forEach(function (card) {
			var data = getCardData(card);

			if (data.rarity) {
				rarities[data.rarity] = true;
			}
		});

		return Object.keys(rarities).sort(function (a, b) {
			return raritySortValue(a) - raritySortValue(b);
		});
	}

	function getAvailableSeasons(cards) {
		var seasons = {};

		cards.forEach(function (card) {
			var data = getCardData(card);

			data.seasons.forEach(function (season) {
				if (season) {
					seasons[season] = true;
				}
			});
		});

		return Object.keys(seasons).sort(function (a, b) {
			return seasonSortValue(a) - seasonSortValue(b);
		});
	}

	function addStyles() {
		if (document.getElementById('mv-item-filter-css')) {
			return;
		}

		var style = document.createElement('style');
		style.id = 'mv-item-filter-css';
		style.textContent =
			'.mv-itemfilter-controls{' +
				'display:flex!important;' +
				'flex-wrap:wrap!important;' +
				'gap:8px!important;' +
				'align-items:center!important;' +
				'justify-content:center!important;' +
				'padding:10px!important;' +
				'border-bottom:1px solid #ff00e6!important;' +
				'background:rgba(20,0,25,.92)!important;' +
			'}' +

			'.mv-itemfilter-search,.mv-itemfilter-select,.mv-itemfilter-reset{' +
				'min-height:32px!important;' +
				'border-radius:6px!important;' +
				'border:1px solid #ff00e6!important;' +
				'background:#2a0630!important;' +
				'color:#fff!important;' +
				'font-family:Urbanist,sans-serif!important;' +
				'font-weight:800!important;' +
				'box-shadow:0 0 6px rgba(255,0,230,.45)!important;' +
			'}' +

			'.mv-itemfilter-search{' +
				'width:min(320px,95%)!important;' +
				'padding:4px 10px!important;' +
			'}' +

			'.mv-itemfilter-select{' +
				'padding:4px 8px!important;' +
			'}' +

			'.mv-itemfilter-reset{' +
				'padding:4px 12px!important;' +
				'cursor:pointer!important;' +
				'background:#d600c8!important;' +
			'}' +

			'.mv-itemfilter-reset:hover{' +
				'filter:brightness(1.15)!important;' +
			'}' +

			'.mv-itemfilter-count{' +
				'font-family:Urbanist,sans-serif!important;' +
				'font-weight:900!important;' +
				'color:#fff!important;' +
				'text-shadow:1px 1px 0 #000!important;' +
				'padding:4px 8px!important;' +
			'}' +

			'.mv-itemfilter-no-results{' +
				'display:none;' +
				'margin:18px auto!important;' +
				'padding:12px!important;' +
				'text-align:center!important;' +
				'color:#fff!important;' +
				'font-family:Urbanist,sans-serif!important;' +
				'font-weight:900!important;' +
			'}';

		document.head.appendChild(style);
	}

	function buildControls(box, cards, listType) {
		var oldWrapper = box.querySelector('.mv-filter-wrapper');

		if (oldWrapper) {
			oldWrapper.style.display = 'none';
		}

		var controls = box.querySelector('.mv-itemfilter-controls');

		if (!controls) {
			controls = document.createElement('div');
			controls.className = 'mv-itemfilter-controls';

			var title = box.querySelector('.mv-filter-title');
			var content = box.querySelector('.mv-filter-content');

			if (title) {
				title.insertAdjacentElement('afterend', controls);
			} else if (content) {
				content.insertAdjacentElement('beforebegin', controls);
			} else {
				box.insertBefore(controls, box.firstChild);
			}
		}

		controls.innerHTML = '';

		var availableRarities = getAvailableRarities(cards);
		var availableSeasons = getAvailableSeasons(cards);
		var showRarityControl = availableRarities.length > 1;
		var showSeasonControl = availableSeasons.length > 1;

		var search = document.createElement('input');
		search.className = 'mv-itemfilter-search';
		search.type = 'search';
		search.placeholder = listType === 'mounts' ? 'Search mounts...' : 'Search weapons...';
		controls.appendChild(search);

		var raritySelect = null;

		if (showRarityControl) {
			raritySelect = document.createElement('select');
			raritySelect.className = 'mv-itemfilter-rarity mv-itemfilter-select';
			raritySelect.appendChild(makeOption('', 'All Rarities'));

			availableRarities.forEach(function (rarity) {
				raritySelect.appendChild(makeOption(rarity, rarityLabel(rarity)));
			});

			controls.appendChild(raritySelect);
		}

		var seasonSelect = null;

		if (showSeasonControl) {
			seasonSelect = document.createElement('select');
			seasonSelect.className = 'mv-itemfilter-season mv-itemfilter-select';
			seasonSelect.appendChild(makeOption('', 'All Seasons'));

			availableSeasons.forEach(function (season) {
				seasonSelect.appendChild(makeOption(season, seasonLabel(season)));
			});

			controls.appendChild(seasonSelect);
		}

		var sortSelect = document.createElement('select');
		sortSelect.className = 'mv-itemfilter-sort mv-itemfilter-select';
		sortSelect.appendChild(makeOption('default', 'Default Order'));
		sortSelect.appendChild(makeOption('name', 'Sort by Name'));

		if (showRarityControl) {
			sortSelect.appendChild(makeOption('rarity', 'Sort by Rarity'));
		}

		if (showSeasonControl) {
			sortSelect.appendChild(makeOption('season', 'Sort by Season'));
		}

		controls.appendChild(sortSelect);

		var reset = document.createElement('button');
		reset.className = 'mv-itemfilter-reset';
		reset.type = 'button';
		reset.textContent = 'Reset';
		controls.appendChild(reset);

		var count = document.createElement('span');
		count.className = 'mv-itemfilter-count';
		controls.appendChild(count);

		return {
			search: search,
			rarity: raritySelect,
			season: seasonSelect,
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

			if (sort === 'rarity') {
				var rarityA = raritySortValue(dataA.rarity);
				var rarityB = raritySortValue(dataB.rarity);

				if (rarityA !== rarityB) {
					return rarityA - rarityB;
				}
			}

			if (sort === 'season') {
				var seasonA = seasonSortValue(dataA.seasons[0] || '');
				var seasonB = seasonSortValue(dataB.seasons[0] || '');

				if (seasonA !== seasonB) {
					return seasonA - seasonB;
				}
			}

			return dataA.name.localeCompare(dataB.name);
		});

		cards.forEach(function (card) {
			list.appendChild(card);
		});
	}

	function filterCards(box, cards, controls) {
		var searchValue = cleanText(controls.search.value);
		var rarityValue = controls.rarity ? normalizeRarity(controls.rarity.value) : '';
		var seasonValue = controls.season ? normalizeSeason(controls.season.value) : '';

		var visibleCount = 0;

		cards.forEach(function (card) {
			var data = getCardData(card);
			var show = true;

			if (searchValue && data.searchText.indexOf(searchValue) === -1) {
				show = false;
			}

			if (rarityValue && data.rarity !== rarityValue) {
				show = false;
			}

			if (seasonValue && data.seasons.indexOf(seasonValue) === -1) {
				show = false;
			}

			if (show) {
				card.style.removeProperty('display');
			} else {
				card.style.setProperty('display', 'none', 'important');
			}

			if (show) {
				visibleCount++;
			}
		});

		controls.count.textContent = visibleCount + ' item' + (visibleCount === 1 ? '' : 's');

		var noResults = box.querySelector('.mv-itemfilter-no-results');

		if (!noResults) {
			noResults = document.createElement('div');
			noResults.className = 'mv-itemfilter-no-results';
			noResults.textContent = 'No matching items found.';

			var content = box.querySelector('.mv-filter-content');

			if (content) {
				content.appendChild(noResults);
			} else {
				box.appendChild(noResults);
			}
		}

		noResults.style.display = visibleCount === 0 ? 'block' : 'none';
	}

	function resetFilters(list, cards, controls, box) {
		controls.search.value = '';

		if (controls.rarity) {
			controls.rarity.value = '';
		}

		if (controls.season) {
			controls.season.value = '';
		}

		controls.sort.value = 'default';

		sortCards(list, cards, controls);
		filterCards(box, cards, controls);
	}

	function initList(list, listType) {
		if (list.getAttribute('data-mv-item-filter-ready') === 'true') {
			return;
		}

		var cards = Array.prototype.slice.call(list.querySelectorAll('.mv-item-card'));

		if (!cards.length) {
			return;
		}

		list.setAttribute('data-mv-item-filter-ready', 'true');

		var box = list.closest('.mv-filter-box') || list.parentElement;

		cards.forEach(function (card, index) {
			card.setAttribute('data-original-index', index);
		});

		var controls = buildControls(box, cards, listType);

		function update() {
			sortCards(list, cards, controls);
			filterCards(box, cards, controls);
		}

		controls.search.addEventListener('input', update);

		if (controls.rarity) {
			controls.rarity.addEventListener('change', update);
		}

		if (controls.season) {
			controls.season.addEventListener('change', update);
		}

		controls.sort.addEventListener('change', update);

		controls.reset.addEventListener('click', function (event) {
			event.preventDefault();
			resetFilters(list, cards, controls, box);
		});

		update();

		console.log('MonsterVerze item controls created:', listType, cards.length, 'cards');
	}

	function scan() {
		addStyles();

		var weaponList = document.querySelector('#itemList');
		var mountList = document.querySelector('#mountList');

		if (weaponList) {
			initList(weaponList, 'weapons');
		}

		if (mountList) {
			initList(mountList, 'mounts');
		}
	}

	function start() {
		scan();

		var attempts = 0;
		var retry = window.setInterval(function () {
			attempts += 1;
			scan();

			if (
				document.querySelector('.mv-itemfilter-controls') ||
				attempts >= 20
			) {
				window.clearInterval(retry);
			}
		}, 500);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
	} else {
		start();
	}
}());