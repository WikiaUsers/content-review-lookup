(function () {
	var rarities = [
		"Common", "Rare", "Legendary", "Limited", "LimitedU", "Unique",
		"Monthly Leaderboard", "Clan War", "Top Spender", "Top Ranked",
		"LTM Leaderboard", "Exclusive Merch", "Codes", "Dev Sword", "Secret", "All"
	];

	var types = [
		"All Types", "Backsword", "Bow", "Dual Wield", "Firearm",
		"Greatsword", "Parasol", "Pet", "Scythe", "Staff"
	];

	var descriptions = {
		"Common": "The easiest sword skins to get, with no unique VFX or SFX. They can be obtained via sword crate at an 89% chance rate, however a 0% chance to be obtained through premium sword crates. ",
		"Rare": "Fairly harder to get than common but easier to obtain than legendary. All rare swords can be obtained through sword skin crate for a 10% chance and 90% chance throughout premium sword crate.",
		"Legendary": "Used to be the rarest swords that can be obtained through the sword crate. It can only be obtained for a 1% chance And 10% throughout premium sword crate. All legendary swords glow different colors.",
		"Limited": "Designed with great attention to detail by the developers, making them some of the most visually appealing swords in the game. You can acquire them by using Robux or Trade Tokens.",
		"LimitedU": "Produced in limited numbers and are often quite expensive or difficult to obtain. They have a chance to come with unique accessories like Finishers or Mounts, and they are guaranteed to have special visual and sound effects.",
		"Unique": "Characterized by their distinct design quality. They often come from special events, but not every unique sword features special visual or sound effects.",
		"Monthly Leaderboard": "Rewards that are obtained by placing yourself in the Country Monthly Wins or Battlepass Leaderboard. Every player needs to stay on the leaderboard until the end of the month/season to be eligible.",
		"Clan War": "Special rewards given to clans that finish at the top of the leaderboard after a clan war. Chosen players will engage in battles with other clans, and every member of the winning clan will receive their rewards once the war is over.",
		"Top Spender": "obtained by reaching the top in the Daily Race before the refresh. These swords are very valuable since players are required to spend a huge amount of Robux in order to obtain them.",
		"Top Ranked": "Rewards that are obtained in the Ranked Game mode. Each season lasts around 30–40 days. Every player needs to stay on the leaderboard until the end of the season to be eligible.",
		"LTM Leaderboard": "Obtainable by placing yourself on the Top Leaderboard of any LTM Event. Due to the limited number of copies available, they are considered one of the rarest swords in the game. Players are given two weeks to place themselves on the leaderboard during each event.",
		"Exclusive Merch": "Produced in limited quantities and can be acquired by purchasing official Blade Ball Merch, which will provide a unique limited sword with each purchase.",
		"Codes": "Swords obtained by redeeming codes; the most recent available codes can be found on Blade Ball's Twitter page or the official Discord server. Codes usually last a few weeks before expiring.",
		"Dev Sword": "Many of these swords are not available or have yet to be released. Previously, some were available through the developers, but that's not the case anymore.",
		"Secret": "Obtained via sword crate at an 0.02% chance rate, however a 0.8% chance to be obtained through premium sword crates. They can also be obtained through various limited events. Awakened versions have an improved VFX look, while some other swords have a new SFX and VFX upon awakening.",
		"All": "Browse every sword skin available in Blade Ball, across all rarities."
	};

	var PAGE_SIZE = 100;
	var DEFAULT_RARITY = 'Common';

	var ALL_RARITIES_LIST = [
	"Common", "Rare", "Legendary", "Limited", "LimitedU", "Unique",
	"Monthly Leaderboard", "Clan War", "Top Spender", "Top Ranked",
	"LTM Leaderboard", "Exclusive Merch", "Codes", "Dev Sword", "Secret"
];

function fetchSingleRarityHtml(rarity) {
	var pageName = 'Sword Skins/' + rarity;
	var apiUrl = mw.util.wikiScript('api') +
		'?action=parse&page=' + encodeURIComponent(pageName) +
		'&format=json&formatversion=2&prop=text&origin=*';
	return fetch(apiUrl)
		.then(function (res) { return res.json(); })
		.then(function (data) {
			return data && data.parse && data.parse.text ? data.parse.text : '';
		})
		.catch(function (err) {
			console.error('fetchSingleRarityHtml failed for ' + rarity + ':', err);
			return '';
		});
}

function fetchRarityCards(rarity, callback) {
	if (rarity === 'All') {
		var requests = ALL_RARITIES_LIST.map(fetchSingleRarityHtml);
		Promise.all(requests).then(function (htmlPieces) {
			var parser = new DOMParser();
			var mergedList = document.createElement('div');
			mergedList.className = 'sword-list';

			htmlPieces.forEach(function (html) {
				if (!html) return;
				var doc = parser.parseFromString(html, 'text/html');
				var innerList = doc.querySelector('.sword-list');
				if (!innerList) return;
				Array.prototype.slice.call(innerList.children).forEach(function (card) {
					mergedList.appendChild(card);
				});
			});

			callback(mergedList.outerHTML);
		}).catch(function (err) {
			console.error('fetchRarityCards (All) failed:', err);
			callback(null);
		});
		return;
	}

	var pageName = 'Sword Skins/' + rarity;
	var apiUrl = mw.util.wikiScript('api') +
		'?action=parse&page=' + encodeURIComponent(pageName) +
		'&format=json&formatversion=2&prop=text&origin=*';
	fetch(apiUrl)
		.then(function (res) { return res.json(); })
		.then(function (data) {
			callback(data && data.parse && data.parse.text ? data.parse.text : null);
		})
		.catch(function (err) {
			console.error('fetchRarityCards failed:', err);
			callback(null);
		});
}

	var searchIndexCache = null;
	function fetchSearchIndex(callback) {
		if (searchIndexCache) { callback(searchIndexCache); return; }
		var apiUrl = mw.util.wikiScript('api') +
			'?action=parse&page=' + encodeURIComponent('Sword Skins/Index') +
			'&format=json&formatversion=2&prop=text&origin=*';
		fetch(apiUrl)
			.then(function (res) { return res.json(); })
			.then(function (data) {
				var text = data && data.parse && data.parse.text ? data.parse.text : '';
				var cleanText = text.replace(/<[^>]+>/g, '\n');
				var lines = cleanText.split('\n').map(function (l) { return l.trim(); }).filter(function (l) { return l.indexOf('|') !== -1; });
				searchIndexCache = lines.map(function (line) {
					var parts = line.split('|');
					return { name: parts[0], rarity: parts[1] };
				});
				console.log('Search index loaded:', searchIndexCache.length, 'entries');
				console.log(searchIndexCache.slice(0, 5));
				callback(searchIndexCache);
			})
			.catch(function (err) {
				console.error('fetchSearchIndex failed:', err);
				callback([]);
			});
	}

	function init() {
		var container = document.getElementById('sword-filter-bar');
		var descBox = document.getElementById('sword-rarity-description');
		var listContainer = document.getElementById('sword-list-container');
		if (!container || !listContainer) return;
		container.className = 'sword-filter-bar';

		var tabs = document.createElement('div');
		tabs.className = 'sword-rarity-tabs';
		var buttons = [];
		rarities.forEach(function (r) {
			var btn = document.createElement('button');
			btn.className = 'sword-rarity-btn' + (r === DEFAULT_RARITY ? ' active' : '');
			btn.setAttribute('data-rarity', r);
			btn.textContent = r;
			tabs.appendChild(btn);
			buttons.push(btn);
		});

		var searchRow = document.createElement('div');
		searchRow.className = 'sword-search-row';

		var search = document.createElement('input');
		search.type = 'text';
		search.id = 'sword-search-input';
		search.placeholder = 'Search sword name...';

		var typeSelect = document.createElement('select');
		typeSelect.id = 'sword-type-select';
		types.forEach(function (t) {
			var opt = document.createElement('option');
			opt.value = t;
			opt.textContent = t;
			typeSelect.appendChild(opt);
		});

		var sortOptions = ["Default", "Alphabetic", "Reverse Order"];
		var sortSelect = document.createElement('select');
		sortSelect.id = 'sword-sort-select';
		sortOptions.forEach(function (s) {
			var opt = document.createElement('option');
			opt.value = s;
			opt.textContent = s;
			sortSelect.appendChild(opt);
		});

		searchRow.appendChild(typeSelect);
		searchRow.appendChild(search);
		searchRow.appendChild(sortSelect);

		var searchResultsBox = document.createElement('div');
		searchResultsBox.id = 'sword-global-search-results';
		searchResultsBox.style.display = 'none';
		searchRow.appendChild(searchResultsBox);

		container.appendChild(tabs);
		container.appendChild(searchRow);
		if (descBox) descBox.textContent = descriptions[DEFAULT_RARITY] || '';

		var pagination = document.createElement('div');
		pagination.id = 'sword-pagination';
		var firstBtn = document.createElement('button');
		firstBtn.className = 'sword-page-btn';
		firstBtn.textContent = '\u00ab First';
		var prevBtn = document.createElement('button');
		prevBtn.className = 'sword-page-btn';
		prevBtn.textContent = '\u2039 Prev';
		var pageInfo = document.createElement('span');
		pageInfo.className = 'sword-page-info';
		var pageInput = document.createElement('input');
		pageInput.type = 'number';
		pageInput.min = '1';
		pageInput.className = 'sword-page-input';
		var pageOfLabel = document.createElement('span');
		pageOfLabel.className = 'sword-page-of';
		var nextBtn = document.createElement('button');
		nextBtn.className = 'sword-page-btn';
		nextBtn.textContent = 'Next \u203a';
		var lastBtn = document.createElement('button');
		lastBtn.className = 'sword-page-btn';
		lastBtn.textContent = 'Last \u00bb';

		pagination.appendChild(firstBtn);
		pagination.appendChild(prevBtn);
		pagination.appendChild(pageInfo);
		pagination.appendChild(pageInput);
		pagination.appendChild(pageOfLabel);
		pagination.appendChild(nextBtn);
		pagination.appendChild(lastBtn);
		listContainer.parentNode.insertBefore(pagination, listContainer.nextSibling);

		var activeRarity = DEFAULT_RARITY;
		var activeType = 'All Types';
		var activeSort = 'Default';
		var allCards = [];
		var filtered = [];
		var currentPage = 1;
		var list = null;

		function totalPages() {
			return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
		}

		function computeFiltered() {
			var term = search.value.trim().toLowerCase();
			filtered = [];
			allCards.forEach(function (card) {
				var nameEl = card.querySelector('.sword-card-name');
				var name = nameEl ? nameEl.textContent.toLowerCase() : '';
				var typesAttr = card.getAttribute('data-types') || '';
				var cardTypes = typesAttr.split(',');
				var typeMatch = activeType === 'All Types' || cardTypes.indexOf(activeType) !== -1;
				var nameMatch = term === '' || name.indexOf(term) !== -1;
				if (typeMatch && nameMatch) {
					filtered.push(card);
				}
			});

			if (activeSort === 'Alphabetic') {
				filtered.sort(function (a, b) {
					var an = a.querySelector('.sword-card-name').textContent.toLowerCase();
					var bn = b.querySelector('.sword-card-name').textContent.toLowerCase();
					return an < bn ? -1 : an > bn ? 1 : 0;
				});
			} else if (activeSort === 'Reverse Order') {
				filtered.reverse();
			}
		}

		function showPage(page) {
			if (!list) return;
			var tp = totalPages();
			currentPage = Math.min(Math.max(1, page), tp);

			allCards.forEach(function (card) { card.classList.add('sword-hidden'); });
			var start = (currentPage - 1) * PAGE_SIZE;
			var end = start + PAGE_SIZE;
			var pageCards = filtered.slice(start, end);
			pageCards.forEach(function (card) {
				list.appendChild(card);
				card.classList.remove('sword-hidden');
			});

			pageInfo.textContent = filtered.length === 0
				? 'No results'
				: (start + 1) + '\u2013' + Math.min(end, filtered.length) + ' of ' + filtered.length;
			pageInput.value = currentPage;
			pageOfLabel.textContent = 'of ' + tp;
			prevBtn.disabled = currentPage <= 1;
			nextBtn.disabled = currentPage >= tp;
			firstBtn.style.display = currentPage > 1 ? 'inline-block' : 'none';
			lastBtn.style.display = currentPage < tp ? 'inline-block' : 'none';
		}

		function applyFilters() {
			computeFiltered();
			showPage(1);
		}

		function loadRarity(rarity) {
			listContainer.innerHTML = '<div class="sword-list-loading">Loading swords...</div>';
			pagination.style.display = 'none';

			fetchRarityCards(rarity, function (html) {
				listContainer.innerHTML = html || '<div class="sword-list-loading">Failed to load.</div>';
				list = listContainer.querySelector('.sword-list');
				if (!list) return;

				allCards = Array.prototype.slice.call(list.querySelectorAll('.sword-card'));
				allCards.forEach(function (card) { card.classList.add('sword-hidden'); });

				pagination.style.display = 'flex';
				applyFilters();
			});
		}

		buttons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				buttons.forEach(function (b) { b.classList.remove('active'); });
				btn.classList.add('active');
				activeRarity = btn.getAttribute('data-rarity');
				if (descBox) descBox.textContent = descriptions[activeRarity] || '';
				loadRarity(activeRarity);
			});
		});
		typeSelect.addEventListener('change', function () {
			activeType = typeSelect.value;
			applyFilters();
		});
		sortSelect.addEventListener('change', function () {
			activeSort = sortSelect.value;
			applyFilters();
		});

		search.addEventListener('input', function () {
			var term = search.value.trim().toLowerCase();
			applyFilters();

			if (term.length < 2) {
				searchResultsBox.style.display = 'none';
				return;
			}
			fetchSearchIndex(function (index) {
				var matches = index.filter(function (item) {
					return item.name.toLowerCase().indexOf(term) !== -1;
				});
				if (matches.length === 0) {
					searchResultsBox.innerHTML = '<div class="sword-search-noresult">No swords found.</div>';
				} else {
					searchResultsBox.innerHTML = matches.slice(0, 20).map(function (item) {
						return '<div class="sword-search-result" data-rarity="' + item.rarity + '">' +
							item.name + ' <span class="sword-search-result-rarity">(' + item.rarity + ')</span></div>';
					}).join('');
				}
				searchResultsBox.style.display = 'block';
			});
		});

		searchResultsBox.addEventListener('click', function (e) {
			var resultEl = e.target.closest('.sword-search-result');
			if (!resultEl) return;
			var rarity = resultEl.getAttribute('data-rarity');
			var targetBtn = buttons.filter(function (b) { return b.getAttribute('data-rarity') === rarity; })[0];
			if (targetBtn) {
				targetBtn.click();
				searchResultsBox.style.display = 'none';
				search.value = '';
			}
		});

		firstBtn.addEventListener('click', function () {
			showPage(1);
			listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
		prevBtn.addEventListener('click', function () {
			showPage(currentPage - 1);
			listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
		nextBtn.addEventListener('click', function () {
			showPage(currentPage + 1);
			listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
		lastBtn.addEventListener('click', function () {
			showPage(totalPages());
			listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
		pageInput.addEventListener('keydown', function (e) {
			if (e.key === 'Enter') {
				showPage(parseInt(pageInput.value, 10) || 1);
				listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
		pageInput.addEventListener('blur', function () {
			showPage(parseInt(pageInput.value, 10) || 1);
		});

		loadRarity(DEFAULT_RARITY);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();