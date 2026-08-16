(function () {
	function init() {
		var buttons = document.querySelectorAll('.sword-rarity-btn');
		var search = document.getElementById('sword-search-input');
		var cards = document.querySelectorAll('.sword-card');
		if (!buttons.length || !cards.length) return;

		var activeRarity = 'All';

		function applyFilters() {
			var term = search ? search.value.trim().toLowerCase() : '';
			cards.forEach(function (card) {
				var rarity = card.getAttribute('data-rarity');
				var nameEl = card.querySelector('.sword-card-name');
				var name = nameEl ? nameEl.textContent.toLowerCase() : '';

				var rarityMatch = activeRarity === 'All' || rarity === activeRarity;
				var nameMatch = term === '' || name.indexOf(term) !== -1;

				card.classList.toggle('sword-hidden', !(rarityMatch && nameMatch));
			});
		}

		buttons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				buttons.forEach(function (b) { b.classList.remove('active'); });
				btn.classList.add('active');
				activeRarity = btn.getAttribute('data-rarity');
				applyFilters();
			});
		});

		if (search) {
			search.addEventListener('input', applyFilters);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

(function () {
	var rarities = [
		"All", "Common", "Rare", "Legendary", "Limited", "LimitedU", "Unique",
		"Monthly Leaderboard", "Clan War", "Top Spender", "Top Ranked",
		"LTM Leaderboard", "Exclusive Merch", "Codes", "Dev Sword", "Secret"
	];

	var descriptions = {
		"All": "Browse every sword skin available in Blade Ball.",
		"Common": "The easiest sword skins to get, with no unique VFX. Fill this in.",
		"Rare": "Harder to get than Common, with a cleaner look. Fill this in.",
		"Legendary": "Rare drops that glow with unique colors. Fill this in.",
		"Limited": "Time-limited swords no longer obtainable through normal means. Fill this in.",
		"LimitedU": "Fill this in.",
		"Unique": "Fill this in.",
		"Monthly Leaderboard": "Fill this in.",
		"Clan War": "Fill this in.",
		"Top Spender": "Fill this in.",
		"Top Ranked": "Fill this in.",
		"LTM Leaderboard": "Fill this in.",
		"Exclusive Merch": "Fill this in.",
		"Codes": "Fill this in.",
		"Dev Sword": "Fill this in.",
		"Secret": "Fill this in."
	};

	function init() {
		var container = document.getElementById('sword-filter-bar');
		var descBox = document.getElementById('sword-rarity-description');
		if (!container) return;
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

		var search = document.createElement('input');
		search.type = 'text';
		search.id = 'sword-search-input';
		search.placeholder = 'Search sword name...';

		container.appendChild(tabs);
		container.appendChild(search);

		if (descBox) descBox.textContent = descriptions['All'];

		var cards = document.querySelectorAll('.sword-card');
		var activeRarity = 'All';

		function applyFilters() {
			var term = search.value.trim().toLowerCase();
			cards.forEach(function (card) {
				var rarity = card.getAttribute('data-rarity');
				var nameEl = card.querySelector('.sword-card-name');
				var name = nameEl ? nameEl.textContent.toLowerCase() : '';
				var rarityMatch = activeRarity === 'All' || rarity === activeRarity;
				var nameMatch = term === '' || name.indexOf(term) !== -1;
				card.classList.toggle('sword-hidden', !(rarityMatch && nameMatch));
			});
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

		search.addEventListener('input', applyFilters);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();