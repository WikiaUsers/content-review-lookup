/* Any JavaScript here will be loaded for all users on every page load. */

;(function($, mw) {
	'use strict';

	function filter(list, filter) {
		if (!filter.length) {
			return list;
		}

		return list.filter(function(x) {
			var entry = $(list[x]).get(0);        
			return filter.find(function(y) {
				var filterEntry = $(y).get(0);
	            if (filterEntry.dataset.key === "ability-filter") {
					var abilityFilterValues = entry.dataset.abilityFilter.replace(/\s/g, '').split(",") || "";
					var hasMatchingAbility = false;
					abilityFilterValues.forEach(function(value) {
						if (value.length && filterEntry.dataset.value.indexOf(value) >= 0)	 {
							hasMatchingAbility = true;
						}
					});
	                return hasMatchingAbility;
	            } else if (filterEntry.dataset.key === "availability") {
	            	var availabilityValues = entry.dataset.availability.replace(/\s/g, '').split(",") || "";
					var hasMatchingAvailability = false;
					availabilityValues.forEach(function(value) {
						if (filterEntry.dataset.value.replace(/\s/g, '').indexOf(value) >= 0)	 {
							hasMatchingAvailability = true;
						}
					});
	                return hasMatchingAvailability;
	            } else if (filterEntry.dataset.key === "maxlimitbreak") {
	            	var maxlimitbreakValues = entry.dataset.maxlimitbreak.replace(/\s/g, '').split(",") || "";
					var hasMatchingmaxlimitbreak = false;
					maxlimitbreakValues.forEach(function(value) {
						if (filterEntry.dataset.value.replace(/\s/g, '').indexOf(value) >= 0)	 {
							hasMatchingmaxlimitbreak = true;
						}
					});
	                return hasMatchingmaxlimitbreak;
	            }
	            
                return String(filterEntry.dataset.value).toLowerCase() === String(entry.dataset[filterEntry.dataset.key]).toLowerCase();
			});
		});
	}

	function updateFilters() {
		var filterTypes = [
			'ability-icon', 'affinity',
			'element', 'weapon', 'rarity', 'availability', 'class', 'group',
			'skill', 'coab', 'chaincoab', 'maxlimitbreak', 'sharedskill', 'cost'];
		var characterList = $('.grid-entry');

		characterList.each(function() {
			this.style.display = 'none';
		});

		var filteredList = characterList;
		filterTypes.forEach(function(type) {
			var filters =
				$('.filter-group-' + type + ' > .mw-ui-button.mw-ui-progressive').toArray();
			filteredList = filter(filteredList, filters);
		});
		filteredList.each(function() {
			this.style.display = '';
		});
	}

	mw.hook('wikipage.content').add(function($content) {
		var articles = [];

		if ($content.find('.modelViewerDgk')[0]) articles.push('MediaWiki:3DModel.js');
		if ($content.find('div[id^="modelViewer"]')[0]) articles.push('MediaWiki:3DModel.js');
		if ($content.find('#AdventurerPageStatsCalculator')[0]) articles.push('MediaWiki:AdventurerPageStatsCalculator.js');
		if ($content.find('#EnemyMapDropdown')[0]) articles.push('MediaWiki:EnemyMapDropdown.js');
		if ($content.find('#HealCalculator')[0]) articles.push('MediaWiki:HealCalculator.js');
		if ($content.find('#HelperUseCalculator')[0]) articles.push('MediaWiki:ManaCalculator.js');
		if ($content.find('.no-history-tabber')[0]) articles.push('MediaWiki:Tabber.js');
		if ($content.find('#UnitStatsCalculator')[0]) articles.push('MediaWiki:UnitStatsCalculator.js');

		if (articles.length) importArticles({type: "script", articles: articles});

		$content.find('.character-filters span.mw-ui-button').on('click', function(event) {
	        $(event.target).toggleClass('mw-ui-progressive');
	        updateFilters();
	    });
	    $content.find('.character-filters label').on('click', function(event) {
	        $(event.target).toggleClass('mw-ui-progressive');
	        updateFilters();
	    });
	    $content.find('#vestige-toggle').click(function() {
	        $(this).toggleClass('mw-ui-progressive');
	        $content.find('.base-vestige').toggle();
	        $content.find('.refined-vestige').toggle();
	    });
	    
	    $content.find(".event-dialogue > p").each(function() {
	        var wrapper = $('<div style="display: flex; align-items: flex-start;margin-top: 10px;margin-bottom: 10px;"></div>');
	        var text = $(this).text().trim();
	        var img = $(this).find("a:first-child");
	        var imgWrapper = $('<div style="padding-right: 10px"></div>');
	        var textWrapper = $('<div style="flex-grow: 1"></div>');
	
	        textWrapper.text(text);
	        imgWrapper.append(img);
	        wrapper.append(imgWrapper);
	        wrapper.append(textWrapper);
	
	        $(this).parent().append(wrapper);
	        $(this).remove();
	    });
	    
	    //start of font size toggle for story
	    
	    $content.find("#smallText").click(function() {
	    	$content.find(".event-dialogue").css("font-size", "0.875em");
	    });
	    
	    $content.find("#mediumText").click(function() {
	    	$content.find(".event-dialogue").css("font-size", "1.125em");
	    });
	    
	    $content.find("#largeText").click(function() {
	    	$content.find(".event-dialogue").css("font-size", "1.875em");
	    });
	});
})(window.jQuery, window.mediaWiki);