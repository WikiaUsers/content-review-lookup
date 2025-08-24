/* Any JavaScript here will be loaded for all users on every page load. */
/* Filter taken from: https://blox-fruits.fandom.com/ru/wiki/MediaWiki:Common.js?oldid=28829 */

$(function () {

	$('#search').html(
		'<input id="searchInput" class="bfw-search" placeholder="Enter name…" style="width: 100%">'
	);

	$('#filter-type').html(
		'<select id="filterType" class="bfw-filter">' +
			'<option value="">All Types</option>' +
			'<option value="fruit-type-natural">Natural</option>' +
			'<option value="fruit-type-beast">Beast</option>' +
			'<option value="fruit-type-elemental">Elemental</option>' +
		'</select>'
	);

	$('#filter-rarity').html(
		'<select id="filterRarity" class="bfw-filter">' +
			'<option value="">All Rarities</option>' +
			'<option value="rarity-common">Common</option>' +
			'<option value="rarity-uncommon">Uncommon</option>' +
			'<option value="rarity-rare">Rare</option>' +
			'<option value="rarity-legendary">Legendary</option>' +
			'<option value="rarity-mythical">Mythical</option>' +
			'<option value="rarity-premium">Premium</option>' +
		'</select>'
	);
	
	$('#filter-effect').html(
		'<select id="filterEffect" class="bfw-filter">' +
			'<option value="">All Effects</option>' +
			'<option value="effect-damage-styles">🤜 Fighting Style Damage</option>' +
			'<option value="effect-damage-swords">⚔️ Sword Damage</option>' +
			'<option value="effect-damage-guns">🏹 Gun Damage</option>' +
			'<option value="effect-damage-fruits">🍈 Fruit Damage</option>' +
			'<option value="effect-damage">💠 Damage</option>' +
			'<option value="effect-damage-sea-events">🌊 Sea Event Damage</option>' +
			'<option value="effect-cooldown-reduce">💠🕛 Cooldown Reduction</option>' +
			'<option value="effect-cooldown-reduce-styles">🤜🕛 Fighting Style Cooldown</option>' +
			'<option value="effect-cooldown-reduce-swords">⚔️🕛 Sword Cooldown</option>' +
			'<option value="effect-cooldown-reduce-guns">🏹🕛 Gun Cooldown</option>' +
			'<option value="effect-cooldown-reduce-fruits">🍈🕛 Fruit Cooldown</option>' +
			'<option value="effect-hp">❤️ Health</option>' +
			'<option value="effect-hp-regen">🔜❤️ Health Regeneration</option>' +
			'<option value="effect-energy">⚡ Energy</option>' +
			'<option value="effect-energy-regen">🔜⚡ Energy Regeneration</option>' +
			'<option value="effect-meter-regen">🔜➖ Fruit Meter Regeneration</option>' +
			'<option value="effect-defense">🛡️ Defense</option>' +
			'<option value="effect-defense-styles">🛡️🤜 Defense vs Fighting Styles</option>' +
			'<option value="effect-defense-swords">🛡️⚔️ Defense vs Swords</option>' +
			'<option value="effect-defense-guns">🛡️🏹 Defense vs Guns</option>' +
			'<option value="effect-defense-fruits">🛡️🍈 Defense vs Fruits</option>' +
			'<option value="effect-defense-sea-events">🛡️🌊 Defense vs Sea Events</option>' +
			'<option value="effect-movement-speed">🦶 Movement Speed</option>' +
			'<option value="effect-dash-range">💨🔝 Dash Range</option>' +
			'<option value="effect-dash-speed">💨🔜 Dash Speed</option>' +
			'<option value="effect-cooldown-reduce-flash-step">🌪️🕛 Flash Step Cooldown</option>' +
			'<option value="effect-defense-water">🛡️💧 Water Defense</option>' +
			'<option value="effect-vampirism">🧛 Vampirism</option>' +
			'<option value="effect-instinct-dodge">👁🔟️ Instinct Dodges</option>' +
			'<option value="effect-instinct-range">👁🔝️ Instinct Range</option>' +
			'<option value="effect-air-jump">☁️ Extra Air Jump</option>' +
			'<option value="effect-sixth-area-vision">🪬 Vision</option>' +
			'<option value="effect-drop-chance-sea-events">✖️🌊 Sea Event Drop Chance</option>' +
			'<option value="effect-boost-exp">✖️💿 EXP Boost</option>' +
			'<option value="effect-boost-mastery">✖️📀 Mastery Boost</option>' +
		'</select>'
	);

	$('#filter-sea').html(
		'<select id="filterSea" class="bfw-filter">' +
			'<option value="">All Seas</option>' +
			'<option value="sea-first">First Sea</option>' +
			'<option value="sea-second">Second Sea</option>' +
			'<option value="sea-third">Third Sea</option>' +
		'</select>'
	);

	function filterItems () {
		const search = $('#searchInput').val().trim().toLowerCase();

		const filters = {
			type   : $('#filterType').val(),
			rarity : $('#filterRarity').val(),
			effect : $('#filterEffect').val(),
			sea    : $('#filterSea').val()
		};

		$('#itemList > div').each(function () {
			const $t = $(this);

			const textOk =
				!search ||
					($t.attr('id')||'').toLowerCase().startsWith(search) ||
					$t.text().toLowerCase().startsWith(search);

			const catsOk = Object.entries(filters).every(([attr, val]) => {
				if (!val) return true;
				const list = ($t.data(attr) || '')
                    .toString()
					.split(/\s+/);
				return list.includes(val);
			});

			$t.toggle(textOk && catsOk);
		});
	}

	$(document).on('input change', '#searchInput, #filterType, #filterRarity, #filterEffect, #filterSea', filterItems);
});