/* Any JavaScript here will be loaded for all users on every page load. */

/**
 * Countdown
 *
 * @version 2.1
 *
 * @author Pecoes <https://c.wikia.com/wiki/User:Pecoes>
 * @author Asaba <https://dev.wikia.com/wiki/User:Asaba>
 *
 * Version 1 authors:
 * - Splarka <https://c.wikia.com/wiki/User:Splarka>
 * - Eladkse <https://c.wikia.com/wiki/User:Eladkse>
 *
 * documentation and examples at:
 * <https://dev.wikia.com/wiki/Countdown>
 */
 
/*jshint jquery:true, browser:true, devel:true, camelcase:true, curly:false, undef:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true, strict:true, trailing:false */
/*global mediaWiki:true*/
 
;(function (module, mw, $, undefined) {
 
	'use strict';
 
	var translations = $.extend(true, {
		// English (English)
		en: {
			and: 'and',
			second: 'second',
			seconds: 'seconds',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days'
		}
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4;
 
	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'second' : 'seconds'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'minute' : 'minutes'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(diff  + result);
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
		}
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else {
				result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
			}
		}
		countdowns[i].node.text(result);
	}
 
	function end(i) {
		var c = countdowns[i].node.parent();
		switch (c.attr('data-end')) {
		case 'remove':
			c.remove();
			return true;
		case 'stop':
			output(i, 0);
			return true;
		case 'toggle':
			var toggle = c.attr('data-toggle');
			if (toggle && toggle == 'next') {
				c.next().css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			if (toggle && $(toggle).length) {
				$(toggle).css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			break;
		case 'callback':
			var callback = c.attr('data-callback');
			if (callback && $.isFunction(module[callback])) {
				output(i, 0);
				module[callback].call(c);
				return true;
			}
			break;
		}
		countdowns[i].countup = true;
		output(i, 0);
		return false;
	}
 
	function update () {
		var now = Date.now();
		var countdownsToRemove = [];
		$.each(countdowns.slice(0), function (i, countdown) {
			var diff = Math.floor((countdown.date - now) / 1000);
			if (diff <= 0 && !countdown.countup) {
				if (end(i)) countdownsToRemove.push(i);
			} else {
				output(i, Math.abs(diff));
			}
		});
		var x;
		while((x = countdownsToRemove.pop()) !== undefined) {
			countdowns.splice(x, 1);
		}
		if (countdowns.length) {
			window.setTimeout(function () {
				update();
			}, 1000);
		}
	}
 
	function getOptions (node) {
		/*jshint bitwise:false*/
		var text = node.parent().attr('data-options'),
			opts = 0;
		if (text) {
			if (/no-leading-zeros/.test(text)) {
				opts |= NO_LEADING_ZEROS;
			}
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
		}
		return opts;
	}
 
	function init() {
		var countdown = $('.countdown:not(.handled)');
		if (!countdown.length) return;
		$('.nocountdown').css('display', 'none');
		countdown
		.css('display', 'inline')
		.find('.countdowndate')
		.each(function () {
			var $this = $(this),
				date = (new Date($this.text())).valueOf();
			if (isNaN(date)) {
				$this.text('BAD DATE');
				return;
			}
			countdowns.push({
				node: $this,
				opts: getOptions($this),
				date: date,
			});
		});
		countdown.addClass('handled');
		if (countdowns.length) {
			update();
		}
	}
 
	mw.hook('wikipage.content').add(init);
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));

// End Countdown

;(function(mw, $) {
	
	function filter(list, filter) {
		if (!filter.length) {
			return list;
		}

		return list.filter(function(x) {
			var entry = $(list[x]).get(0);        
			return filter.find(function(y) {
				var filterEntry = $(y).get(0);
	            if (filterEntry.dataset.key === "ability-filter") {
					var abilityFilterValues = entry.dataset.abilityFilter.replace(/\s/g, '').split(",") || [];
					var hasMatchingAbility = false;
					abilityFilterValues.forEach(function(value) {
						if (value.length && filterEntry.dataset.value.indexOf(value) >= 0)	 {
							hasMatchingAbility = true;
						}
					});
	                return hasMatchingAbility;
	            } else if (filterEntry.dataset.key === "availability") {
	            	var availabilityValues = entry.dataset.availability.replace(/\s/g, '').split(",") || [];
					var hasMatchingAvailability = false;
					availabilityValues.forEach(function(value) {
						if (filterEntry.dataset.value.replace(/\s/g, '').indexOf(value) >= 0)	 {
							hasMatchingAvailability = true;
						}
					});
	                return hasMatchingAvailability;
	            } else if (filterEntry.dataset.key === "maxlimitbreak") {
	            	var maxlimitbreakValues = entry.dataset.maxlimitbreak.replace(/\s/g, '').split(",") || [];
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

$(document).ready(function() {
    $('.character-filters label').on('click', function(event) {
        $(event.target).toggleClass('mw-ui-progressive');
        updateFilters();
    });
    $('#vestige-toggle').click(function(event) {
        $(this).toggleClass('mw-ui-progressive');
        $('.base-vestige').toggle();
        $('.refined-vestige').toggle();
    });
    
    $(".event-dialogue > p").each(function() {
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
    
    $("#smallText").click(function() {
    	$(".event-dialogue").css("font-size", "0.875em");
    });
    
    $("#mediumText").click(function() {
    	$(".event-dialogue").css("font-size", "1.125em");
    });
    
    $("#largeText").click(function() {
    	$(".event-dialogue").css("font-size", "1.875em");
    });
    
    //end of font size toggle for story
    
    //OOUI-based tabber
	mw.hook( "wikipage.content" ).add( function ($content) {
		var $tabberElements = $content.find( ".no-history-tabber" );
		if ($tabberElements.length > 0) { //Only load the modules and run the Javascript if there is a fehwiki-tabber in the page.
			mw.loader.using("oojs-ui-widgets").then(function() {
				var TABBER_HEADER_CLASS = "no-history-tab-header";
				var TABBER_HEADER_CLASS_SELECTOR = "."+TABBER_HEADER_CLASS;
				var CSS_END_REGEX = /;\s*$/;
	
				var uniqueNumber = 0;
				var INDEX_LAYOUT_OPTIONS = {
					expanded: false,
					autoFocus: false
				};
	
				$tabberElements.each( function(_, ele) {
					var tabPanelLayouts = [];
					var $rootTabberElement;
					var indexLayout = new OO.ui.IndexLayout(INDEX_LAYOUT_OPTIONS);
					$( ele ).children( TABBER_HEADER_CLASS_SELECTOR ).each( function (_, tabHeaderEle) {
						var contents = [];
	
						$( tabHeaderEle ).nextUntil( TABBER_HEADER_CLASS_SELECTOR ).each( function(_, node) {
							contents.push(node);
						} );
	
						tabPanelLayouts.push(new OO.ui.TabPanelLayout(tabHeaderEle.textContent + uniqueNumber++, {
							expanded: false,
							label: new OO.ui.HtmlSnippet(tabHeaderEle.innerHTML),
							content: contents
						}));
					} );
                    indexLayout.addTabPanels(tabPanelLayouts);
					if ($(ele).attr("data-tab-default") !== undefined) {
					    const activeTabIdx = parseInt($(ele).attr("data-tab-default")) - 1;
					    if (!isNaN(activeTabIdx) && activeTabIdx >= 0 && activeTabIdx < tabPanelLayouts.length) {
					        indexLayout.setTabPanel(tabPanelLayouts[activeTabIdx].name);
					    }
					}
					$rootTabberElement = (new OO.ui.PanelLayout( {
							expanded: false,
							content: [ indexLayout ]
						})).$element;
						
					//If it has one, adds the inline style the fehwiki-tabber div element has to the new tabber element
					$rootTabberElement.attr( "style", function(_, attr) {
						var s = $( ele ).attr( "style" );
						return attr ? s + (CSS_END_REGEX.test(attr) ? "" : ";") + attr : s;
					} );
	
					$( ele ).replaceWith( $rootTabberElement );
				});
			});
		}
	} );
	//End tabber
    
});

})(mediaWiki, jQuery);