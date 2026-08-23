(function () {
	var rarities = [
		"All", "Common", "Rare", "Legendary", "Limited", "LimitedU", "Unique",
		"Monthly Leaderboard", "Clan War", "Top Spender", "Top Ranked",
		"LTM Leaderboard", "Exclusive Merch", "Codes", "Dev Sword", "Secret"
	];

	var types = [
		"All Types", "Backsword", "Bow", "Dual Wield", "Firearm",
		"Greatsword", "Parasol", "Pet", "Scythe", "Staff"
	];

	var descriptions = {
		"All": "Every sword skin available in Blade Ball.",
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
		"Secret": "Obtained via sword crate at an 0.02% chance rate, however a 0.8% chance to be obtained through premium sword crates. They can also be obtained through various limited events. Awakened versions have an improved VFX look, while some other swords have a new SFX and VFX upon awakening."
	};

	var BATCH_SIZE = 60;

	function init() {
		var container = document.getElementById('sword-filter-bar');
		var descBox = document.getElementById('sword-rarity-description');
		var list = document.querySelector('.sword-list');
		if (!container || !list) return;
		container.className = 'sword-filter-bar';

		var tabs = document.createElement('div');
		tabs.className = 'sword-rarity-tabs';
		var buttons = [];
		rarities.forEach(function (r) {
			var btn = document.createElement('button');
			btn.className = 'sword-rarity-btn' + (r === 'All' ? ' active' : '');
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

		searchRow.appendChild(typeSelect);
		searchRow.appendChild(search);

		container.appendChild(tabs);
		container.appendChild(searchRow);
		if (descBox) descBox.textContent = descriptions['All'];

		var sentinel = document.createElement('div');
		sentinel.id = 'sword-scroll-sentinel';
		list.parentNode.insertBefore(sentinel, list.nextSibling);

		var allCards = Array.prototype.slice.call(document.querySelectorAll('.sword-card'));
		allCards.forEach(function (card) { card.classList.add('sword-hidden'); });

		var activeRarity = 'All';
		var activeType = 'All Types';
		var filtered = [];
		var visibleCount = 0;

		function computeFiltered() {
			var term = search.value.trim().toLowerCase();
			filtered = [];
			allCards.forEach(function (card) {
				var rarity = card.getAttribute('data-rarity');
				var nameEl = card.querySelector('.sword-card-name');
				var name = nameEl ? nameEl.textContent.toLowerCase() : '';
                var typesAttr = card.getAttribute('data-types') || '';
                var cardTypes = typesAttr.split(',');
                var typeMatch = activeType === 'All Types' || cardTypes.indexOf(activeType) !== -1;
				var rarityMatch = activeRarity === 'All' || rarity === activeRarity;
				var nameMatch = term === '' || name.indexOf(term) !== -1;

				if (rarityMatch && typeMatch && nameMatch) {
					filtered.push(card);
				} else {
					card.classList.add('sword-hidden');
				}
			});
		}

		function loadMore() {
			var next = filtered.slice(visibleCount, visibleCount + BATCH_SIZE);
			next.forEach(function (card) { card.classList.remove('sword-hidden'); });
			visibleCount += next.length;
		}

		function applyFilters() {
			allCards.forEach(function (card) { card.classList.add('sword-hidden'); });
			computeFiltered();
			visibleCount = 0;
			loadMore();
		}

		buttons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				buttons.forEach(function (b) { b.classList.remove('active'); });
				btn.classList.add('active');
				activeRarity = btn.getAttribute('data-rarity');
				if (descBox) descBox.textContent = descriptions[activeRarity] || '';
				applyFilters();
			});
		});
		typeSelect.addEventListener('change', function () {
			activeType = typeSelect.value;
			applyFilters();
		});
		search.addEventListener('input', applyFilters);

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting && visibleCount < filtered.length) {
					loadMore();
				}
			});
		}, { rootMargin: '400px' });
		observer.observe(sentinel);

		applyFilters();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();