function scrollAnchor(id) {
  var scrollTo = $('#' + id).offset().top - 15;
  window.scrollTo(0, scrollTo);
  console.log(scrollTo);
}

$(document).ready(function() {
  if ($('body').find('> .modal-table').length !== 1) {
    $('table').each(function() {
      if (!$(this).hasClass('msgbox') && !$(this).hasClass('modal-table') && $(this).outerWidth() > window.innerWidth - 32) {
        var descText = '';

        $(this).hide();
        $(this).parent().attr('style', '');

        if ($(this).data('description')) {
          descText = $(this).data('description');
        }

        $(this).before('<button type="button" class="modal-button"><strong>View Table' + ($(this).data('description') ? ": " : "") + descText + '</strong></button>');
      }
    });
  }

  $('button.modal-button').click(function() {
    var tableContainer = $('<div>');
    var table = this.nextSibling.cloneNode(true);

    $(table).appendTo(tableContainer);

    table.classList.add('modal-table');
    $(table).attr('style', '');
    console.log(tableContainer.html());
  });
});

function scrollAnchor(t){var o=$("#"+t).offset().top-15;window.scrollTo(0,o),console.log(o)}$(document).ready(function(){1!==$("body").find("> .modal-table").length&&$("table").each(function(){if(!$(this).hasClass("msgbox")&&!$(this).hasClass("modal-table")&&$(this).outerWidth()>window.innerWidth-32){var t="";$(this).hide(),$(this).parent().attr("style",""),$(this).data("description")&&(t=$(this).data("description")),$(this).before('<button type="button" class="modal-button"><strong>View Table'+($(this).data("description")?": ":"")+t+"</strong></button>")}}),$("button.modal-button").click(function(){var t=$("<div>"),o=this.nextSibling.cloneNode(!0);$(o).appendTo(t),o.classList.add("modal-table"),$(o).attr("style",""),console.log(t.html())})});

mw.loader.load("https://ark.fandom.com/wiki/MediaWiki:Mobile.js?action=raw\u0026ctype=text/javascript");

importArticle({ type: "script", article: "MediaWiki:Gadget-site.js" });

/************************************
/* Main Page Mobile Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2018-Jun-7
// License: CC-BY 3.0

// This script, paired with .mobilecollapsible styles in MediaWiki:Mobile.css, supports making .fpbox collapsible in the mobile view using both the standard
// 2 or 3-column responsive front pages.

// Making an .fpbox collapsible in mobile view involves the following:
//   1. Adding "mobilecollapsible" as another class alongside "fpbox".
//   2. Making sure there is a heading identified by the "fpheading" class.
//      * Links inside headings can still work, but aren't recommended because they'll be easy to fat-finger while trying to collapse/expand the box.
//      * The script allows multiple headings and automatically ignores any with the "nomobile" or "notoggle" class.
//      * If there are still multiple headings after excluding those, only the first is turned into a collapsing toggle link.
//   3. Placing the area that should be hidden when collapsed inside a div or other block with the "fpbody" class.
//      * It's usually best for this to be everything in the box *except* the heading.
//   4. Optionally add "expanded" next to "mobilecollapsible" to leave the box expanded by default.

var fpmobilecollapse = fpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( '.fpbox.mobilecollapsible' ).each( function() {
            var heading = $( this ).children( '.fpheading' ).not( '.nomobile, .notoggle' );
            if ( heading.length > 0 && $( this ).children( '.fpbody' ).length > 0 ) {
                $( this ).addClass( 'mobilecollapsible' + index );
                heading.first().html( $( '<a class="togglecollapse" href="javascript:fpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( '.fpbox.mobilecollapsible' + index ).each( function() {
            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( this ).addClass( 'expanded' );
            } else {
                $( this ).removeClass( 'expanded' );
                $( this ).addClass( 'collapsed' );
            }
        } );
    }
}

window.fpmobilecollapse = fpmobilecollapse;

$( document ).ready( fpmobilecollapse.initialize );

/****************************************
/* End Main Page Mobile Collapse Script *
/****************************************/

// Tabbers are not available in the mobile skin, and scripts are blocked from being served to mobile user agents:
// mw.loader.load('/load.php?debug=false&lang=en&modules=ext.Tabber&*', 'text/javascript', false);
// As a workaround (as we're tabber-heavy and replacing them is not as easy as it seems), add a bold text block
// with a tab's title before each tab.
$(function() {
	$('.tabber .tabbertab').each(function () {
		$('<b style="display:block">').text($(this).attr('title')).insertBefore($(this));
	});
});

// Load our other scripts conditionally
$(function() {
	
	[
		// Dev:Countdown
		[ '.countdown', [ 'u:dev:MediaWiki:Countdown/code.js' ] ],
		// Cooking calculator
		[ '#cookingCalc', [ 'MediaWiki:Cooking calculator.js' ] ],
		// Creature article scripts
		[ '.cloningcalc, .killxpcalc', [
			// Kill XP calculator
			'MediaWiki:Killxp.js',
			// Experimental cloning calculator
			'MediaWiki:CloningCalculator.js' 
		] ],
		// Common Data page fetch function if a spawn map or an interactive region map are present.
		// Separate request for cache efficiency (load once, not every time for a combination).
		[ '.data-map-container[data-spawn-data-page-name], .interactive-regionmap', [ 'MediaWiki:DataFetch.js' ] ],
		// Interactive region map
		[ '.interactive-regionmap', [ 'MediaWiki:RegionMaps.js' ] ],
		// Data map scripts
		[ '.data-map-container', [ 'MediaWiki:ResourceMaps.js', 'MediaWiki:SpawnMaps.js' ] ],
	].forEach(function (req) {
		if (document.querySelectorAll(req[0]).length > 0) {
			importArticles({ type: 'script', articles: req[1] })
		}
	});
	
});

/* Any JavaScript here will be loaded for all users on every page load. */

/* Fires when DOM is ready */
$( function() {

	// Helper function for copy to clipboard - selects text
	function selectElementText(element) {
		var range, selection;    
		if (document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();        
			range = document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
	// Copy to clipboard
	$('.copy-clipboard').each(function () {
		var $this = $(this);
		var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
		$this.append($button);
		$button.click(function () {
			var $content = $this.find('.copy-content');
			$content.children().remove();
			selectElementText($content[0]);
		
			try {
				if (!document.execCommand('copy'))
					throw 42;
				mw.notify('Successfully copied to Clipboard.');
			} catch (err) {
				mw.notify('Copy to Clipboard failed. Please do it yourself.', {type:'error'});
			}
		});
	});

	// Redirect to language version if url contains querystring iwredirect (for Dododex)
	var match = location.search.match(/iwredirect=([^;&]*)/);
	if (match && match[1]) {
		var $langlink = $('.interlanguage-link-target[hreflang="' + encodeURIComponent(match[1]) + '"]');
		if ($langlink && $langlink[0] && $langlink[0].href) {
			window.location.replace($langlink[0].href);
		}
	}

	// Load our other scripts conditionally
	[
		// Cooking calculator
		[ '#cookingCalc', [ 'MediaWiki:Cooking calculator.js' ] ],
		// Wild creature stats calculator
		[ '.wildstatscalc, #wildStatCalc', [ 'MediaWiki:WildCreatureStats.js' ] ],
		// Creature article scripts
		[ '.cloningcalc, .killxpcalc', [
			// Kill XP calculator
			'MediaWiki:Killxp.js',
			// Experimental cloning calculator
			'MediaWiki:CloningCalculator.js' 
		] ],
		// Common Data page fetch function if a spawn map or an interactive region map are present.
		// Separate request for cache efficiency (load once, not every time for a combination).
		[ '.data-map-container[data-spawn-data-page-name], .interactive-regionmap', [ 'MediaWiki:DataFetch.js' ] ],
		// Interactive region map
		[ '.interactive-regionmap', [ 'MediaWiki:RegionMaps.js' ] ],
		// Data map scripts
		[ '.data-map-container', [ 'MediaWiki:ResourceMaps.js', 'MediaWiki:SpawnMaps.js' ] ],
	].forEach(function (req) {
		if (document.querySelectorAll(req[0]).length > 0) {
			importArticles({ type: 'script', articles: req[1] })
		}
	});

	/**
	 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
	 *
	 * This is so people have a chance to look at the image and click on pages they want to view.
	 */
	$('#mw-content-text').on('mouseenter mouseleave', '.animated-container, .mcui', function (e) {
		$(this).find('.animated').toggleClass('animated-paused', e.type === 'mouseenter');
	});

});
/* End DOM ready */

/**
 * Grid Filtering
 *
 * Adds filter options to [[Template:Nav creatures/New]].
 * 
 * Javascript:          Karol "[[User:Nanaki]]" Dylewski 
 * License:             CC-BY-SA 3.0 
 *
 * ARK Compatibility:   [[User:3mptylord]].
*/
mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
	/* Config for gridFiltering */
	gridContainer = '#creature-grid';
	gridFilters = {
	'creature': 'search',
	'map': [ '- Content -',
		['The Island','The Island'],
		['The Center','The Center'],
		['Scorched Earth','Scorched Earth'],
		['Ragnarok','Ragnarok'],
		['Aberration','Aberration'],
		['Extinction','Extinction'],
		['Valguero','Valguero'],
		['Genesis: Part 1','Genesis: Part 1'],
		['Crystal Isles','Crystal Isles'],
		['Genesis: Part 2','Genesis: Part 2'],
		['Lost Island','Lost Island'],
		['Mobile','ARK: Survival Evolved Mobile'],
		['Unreleased','Unreleased'],
		['Removed','Removed'],
	],
	'group': [ '- Group -',
		['Alpha Creatures','Alpha Creatures'],
		['Amphibians','Amphibians'],
		['Birds','Birds'],
		['Bosses','Bosses'],
		['Dinosaurs','Dinosaurs'],
		['Enraged Creatures','Enraged Creatures'],
		['Event Creatures','Event Creatures'],
		['Fantasy Creatures','Fantasy Creatures'],
		['Fish','Fish'],
		['Invertebrates','Invertebrates'],
		['Mammals','Mammals'],
		['Mechanical Creatures','Mechanical Creatures'],
		['Reptiles','Reptiles'],
		['Synapsids','Synapsids'],
		['Tek Creatures','Tek Creatures'],
		['Titans','Titans'],
	],
	'habitat': [ '- Habitat -',
		['Arboreal','Arboreal (Trees)'],
		['Aerial','Aerial'],
		['Aquatic','Aquatic'],
		['Fossorial','Fossorial (Burrowing)'],
		['Terrestrial','Terrestrial'],
		['Subterranean','Subterranean'],
		['Boss','Bosses (Summoned)'],
	],
	'diet': [ '- Diet -',
		['Carnivore','Carnivores'],
		['Piscivore','Piscivores'],
		['Herbivore','Herbivores'],
		['Omnivore','Omnivores'],
		['Carrion-Feeder','Carrion Feeders'],
		['Coprophagic', 'Coprophagics'],
		['Sanguinivore', 'Sanguinivores'],
		['Flame Eater', 'Flame Eaters'],
		['Minerals', 'Minerals'],
		['Bottom Feeder', 'Bottom Feeders'],
		['Sweet Tooth', 'Sweet Tooths'],
	],
	};

	function gridFiltering() {
		if(typeof gridContainer === 'undefined' || !gridContainer) return
		var grid = $(gridContainer)
		if(!grid || !grid.length) return
		if(!gridFilteringSwitches()) return
 
		window.gridElements = []
		grid.find('.creature_icon').each(function() {
			var obj = {}
			var elem = $(this)
			obj['*'] = elem
			for(x in gridFilters) {
				obj[x] = elem.data(x).split(',')
				for(var y=0;y<obj[x].length;y++) {
					obj[x][y] = obj[x][y].replace(/^\s+|\s+$/g, '').toLowerCase()
				}
			}
			window.gridElements.push(obj)
		})
	}
 
	function gridFilteringSwitches() {
		var flag = false
		for(x in gridFilters) {
			var container = $('#grid-filter-'+x)
			if(!container.length) continue
			flag = true
 
			if(gridFilters[x] == 'search') {
				var field = $('<input type="text" placeholder="Search..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
				field.keyup(function() {
					gridFilteringApply()
					if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout)
					window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 30000)
				})
			} else if(gridFilters[x] instanceof Array) {
				var field = $('<select></select>').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'select')
				$('<option></option>').appendTo(field).attr('value', '').html(gridFilters[x][0])
				for(var y=1;y<gridFilters[x].length;y++) {
					$('<option></option>').appendTo(field).attr('value', gridFilters[x][y][0]).html(gridFilters[x][y][1])
				}
				field.val('')
 
				field.change(function() {
					gridFilteringApply()
					if(window.gridFiltersTimeout) window.clearTimeout(window.gridFiltersTimeout)
					window.gridFiltersTimeout = window.setTimeout(gridFilteringClear, 30000)
				})
			}
		}
		return flag
	}
	function gridFilteringClear() {
		for(x in gridFilters) {
			$('#grid-filter-'+x+'-field').val('')
		}
		gridFilteringApply()
	}
	function gridFilteringApply() {
		for(var x=0;x<gridElements.length;x++) {
			var elem = $(gridElements[x]['*'])
			var active = true
			for(y in gridFilters) {
				var field = $('#grid-filter-'+y+'-field')
 
				var value = field.val().toLowerCase()
				if(value == '') continue;
 
				var type = field.data('type')
				if(type == 'search') {
					var rx = new RegExp('^.*?(' + value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
					var flag = rx.test(gridElements[x][y].join(', '))
					if(!flag) active = false
				} else if(type == 'select') {
					if(gridElements[x][y].indexOf(value) == -1) active = false
				}
			}
			if(active) gridFilteringShow(elem)
			else gridFilteringHide(elem)
		}
	}
	function gridFilteringHide(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 0.1);
	}
	function gridFilteringShow(elem) {
		$(elem).stop(true);
		$(elem).fadeTo(200, 1);
	}
	$( gridFiltering )
});
/* End Grid Filtering */

/* Word Count */
function countWords() {
  var text = document.getElementById("article-text").innerText;
  var words = text.trim().split(/\s+/);
  var wordCount = words.length;
  document.getElementById("word-count").innerText = wordCount;
}