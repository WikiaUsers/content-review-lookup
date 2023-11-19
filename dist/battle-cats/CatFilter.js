/**
 * Script for adding functionality to Filter feature by working with CatData.json.
 */

// maximum height for initial height of output div
var MAX_HEIGHT = 400;

var params = {
	action: 'query',
	prop: 'revisions',
	titles: 'Template:FilterIconInfo/CatData.json',
	rvprop: 'content',
	rvslots: 'main',
	formatversion: '2',
	format: 'json'
};

// read json file, initialize filter UI elements, event handling
mw.loader.using('mediawiki.api').then(function () {
	if (mw.config.get('wgPageName') != 'Cat_Filter') {
		return;
	}
	api = new mw.Api();
	api.get(params).done(function (data) {
		var content = data.query.pages[0].revisions[0].slots.main.content;
		var map = new Map(Object.entries(JSON.parse(content)));

		// initialize form elements, filter and clear once to pre-render images
		initForm();
		filtering(map);
		clear();
		// event handling
		$("#filter-submit-button").click(function () {
			filtering(map);
		});
		$("#filter-clear-button").click(clear);
	});
});

/**
 * show units with the specified filters
 * @param {Map} map Map for cat data, converted from json file
 * @return void
 */
function filtering(map) {
	// clear previous filtering
	$('#filter-result').empty();
	// get the selected traits
	var selectedTraits = [];
	$('input.trait[type=checkbox]').each(function () {
		if (this.checked) {
			selectedTraits.push($(this).val());
		}
	});
	// get the selected rarities
	var selectedRarities = [];
	$('input.rarity[type=checkbox]').each(function () {
		if (this.checked) {
			selectedRarities.push($(this).val());
		}
	});
	// get states of other filter setting toggles
	var andFiltering = $("#filter-toggle").is(':checked');
	var withTalents = $("#filter-toggle-talents").is(':checked');
	var withUltraTalents = $("#filter-toggle-ultratalents").is(':checked');
	// check each cat in json and include cats meeting specified conditions
	var catsToDisplay = [];
	map.forEach( function(cat, cro) {
		var catTraits = cat.traits;
		var catTalents = cat.talents ? cat.talents : [];
		var catUltraTalents = cat.ultratalents ? cat.ultratalents : [];
		if (withTalents) catTraits = catTraits.concat(catTalents);
		if (withUltraTalents) catTraits = catTraits.concat(catUltraTalents);
		if (andFiltering && isIncludedAnd(selectedRarities, selectedTraits, cat.rarity, catTraits)) {
			catsToDisplay.push(wrappingImage(cat.names, cat.images, cat.link));
		} else if (!andFiltering && isIncludedOr(selectedRarities, selectedTraits, cat.rarity, catTraits)) {
			catsToDisplay.push(wrappingImage(cat.names, cat.images, cat.link));
		}
	});
	// render filter result, differs based on if output is empty
	if (catsToDisplay.length == 0) {
		$('#filter-result').hide();
		$('#filter-no-results').show();
	} else {
		$('#filter-no-results').hide();
		$('#filter-result').show();
		var height = (Math.floor((catsToDisplay.length - 1) / (Math.floor($('#filter-result').width() / 70))) + 1) * 74;
		if (height > MAX_HEIGHT) height = MAX_HEIGHT;
		$('#filter-result').css('height', height);
		$('#filter-result').html(catsToDisplay.join(""));
	}
}

/**
 * deselect all checkboxes and hide output
 */
function clear() {
	$('input[type=checkbox]').not('#filter-toggle').each(function () {
		this.checked = false;
	});
	$('#filter-result').empty();
	$('#filter-result').hide();
	$('#filter-no-results').hide();
}

/**
 * output html for linked image given name, url of image, url of link
 * @param {Array[String]} name Name for image, one for each form
 * @param {Array[String]} imageUrl URL for image, one for each form
 * @param {String} link Link URL for image click
 * @returns {String} HTML for linked image
 */
function wrappingImage(names, imageUrls, link) {
	var result = "";
	var classes = ["image-normal", "image-evolved", "image-true", "image-ultra"];
	for (var i = 0; i <= 3; i++) {
		result += "<a href='" + link + "' title='" + names[i] + "' class='" + classes[i] + "' style='position: absolute; top: 0; left: 0; z-index: " + (i + 2) + ";'><img src='" + imageUrls[i] + "' width='70' height='70'></a>";
	}
	return "<div style='display: inline-block; position: relative; height: 70px; width: 70px; animation-play-state: inherit;'>" + result + '</div>';
}

/**
 * determines if a cat should be included in AND filtering
 * @param {Array[String]} rarities Selected rarities from filter
 * @param {Array[String]} traits Selected targets and abilities from filter
 * @param {String} catRarity Rarity of the cat
 * @param {Array[String]} catTraits The targets and abilities of the cat
 * @return {boolean} Whether the cat is included in the filter
 */
function isIncludedAnd(rarities, traits, catRarity, catTraits) {
	if (traits.length == 0 && rarities.length == 0) return true;
	if (!rarities.includes(catRarity) && rarities.length > 0) return false;
	if (traits.length == 0) return true;
	for (var i in traits) {
		if (!catTraits.includes(traits[i])) return false;
	}
	return true;
}

/**
 * determines if a cat should be included in OR filtering
 * @param {Array[String]} rarities Selected rarities from filter
 * @param {Array[String]} traits Selected targets and abilities from filter
 * @param {String} catRarity Rarity of the cat
 * @param {Array[String]} catTraits The targets and abilities of the cat
 * @return {boolean} Whether the cat is included in the filter
 */
function isIncludedOr(rarities, traits, catRarity, catTraits) {
	if (traits.length == 0 && rarities.length == 0) return true;
	if (!rarities.includes(catRarity) && rarities.length > 0) return false;
	if (traits.length == 0) return true;
	for (var i in traits) {
		if (catTraits.includes(traits[i])) return true;
	}
	return false;
}

/**
 * render all UI elements necessary for the filter form
 * @return void
 */
function initForm() {
	// arrays with checkbox data
	var rarityArr = ["nn", "ex", "rr", "sr", "ur", "lr"];
	var attackArr = ["single", "area", "long", "omni"];
	var targetArr = ["red", "floating", "black", "metal", "angel", "alien", "zombie", "aku", "relic", "traitless"];
	var traitSpecificArr = ["weaken", "freeze", "slow", "attacks-only", "strong", "resistant", "insanely-tough", "massive-damage", "insane-damage", "knockback", "warp", "curse", "dodge"];
	var neutralArr = ["strengthen", "survive", "base-destroyer", "critical", "zombie-killer", "soulstrike", "barrier-breaker", "shield-piercing", "savage-blow", "extra-money", "metal-ability", "mini-wave", "wave", "mini-surge", "surge", "wave-shield", "counter-surge", "colossus-slayer", "behemoth-slayer",
		"immune-weaken", "immune-freeze", "immune-slow", "immune-knockback", "immune-waves", "immune-surge", "immune-warp", "immune-curse", "immune-toxic"];
	var collabArr = ["witch-killer", "eva-angel-killer"];
	var talentArr = ["resist-weaken", "resist-freeze", "resist-slow", "resist-knockback", "resist-wave", "resist-warp", "resist-curse", "resist-surge", "resist-toxic", "defense-up", "attack-up", "move-speed-up", "improved-knockback", "cost-down", "recover-speed-up", "attack-freq-up"];

	// rarities
	rarityArr.forEach(function(item) {
		$('#filter-rarity-' + item).append('<input type="checkbox" class="rarity" value="' + item + '">');
	});
	// attack types
	attackArr.forEach(function(item) {
		$('#filter-attack-' + item).prepend('<input type="checkbox" class="trait" value="' + item + '">');
	});
	// targets
	targetArr.forEach(function(item) {
		$('#filter-target-' + item).prepend('<input type="checkbox" class="trait" value="' + item + '">');
	});
	// trait specific
	traitSpecificArr.forEach(function(item) {
		$('#filter-trait-' + item).prepend('<input type="checkbox" class="trait" value="' + item + '">');
	});
	// neutral + immunities
	neutralArr.forEach(function(item) {
		$('#filter-neutral-' + item).prepend('<input type="checkbox" class="trait" value="' + item + '">');
	});
	// collabs
	collabArr.forEach(function(item) {
		$('#filter-collab-' + item).prepend('<input type="checkbox" class="trait" value="' + item + '">');
	});
	// talents
	talentArr.forEach(function(item) {
		$('#filter-talent-' + item).prepend('<input type="checkbox" class="trait" value="' + item + '">');
	});
	// AND/OR toggle
	$('#filter-toggle-andor').append('<label class="switch"><input type="checkbox" id="filter-toggle"><span class="toggle"><span class="on">AND</span><span class="off">OR</span></span></label>');
	// talent toggle
	$('#filter-toggle-talent').prepend('<input type="checkbox" id="filter-toggle-talents">');
	$('#filter-toggle-ultratalent').prepend('<input type="checkbox" id="filter-toggle-ultratalents">');
	// clear button
	$('#filter-clear-button').append('<input type="button" id="filter-clear" value="Clear">');
	// submit button
	$('#filter-submit-button').append('<input type="button" id="filter-submit" value="Search">');
}