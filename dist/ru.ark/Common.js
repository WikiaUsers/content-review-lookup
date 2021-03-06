/* Any JavaScript here will be loaded for all users on every page load. */

( function() {
'use strict';

// copy to clipboard
$(function() { // wait for content load (DOMContentLoaded)
  $('.copy-clipboard').each(function () {
    var $this = $(this);
    var $button = $('<button title="Копировать в Буфер">&#xf0ea;</button>');
    $this.append($button);
    $button.click(function () {
      var $content = $this.find('.copy-content');
      $content.children().remove();
      selectElementText($content[0]);
  
      try {
        if (!document.execCommand('copy'))
          throw 42;
        mw.notify('Успешно скопировано в буфер обмена.');
      } catch (err) {
        mw.notify('Ошибка копирования в буфер обмена. Пожалуйста, сделайте это самостоятельно.', {type:'error'});
      }
    });
  });
});

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

// load js for calculating wild creature level stats
if(document.getElementById('wildStatCalc')){
    mw.loader.load('/index.php?title=MediaWiki:WildCreatureStats.js&action=raw&ctype=text/javascript','text/javascript',false);
}

// redirect to language version if url contains querystring iwredirect (for Dododex)
$(function() {
  var match = location.search.match(/iwredirect=([^;&]*)/);
  if (match && match[1]) {
    var $langlink = $('.interlanguage-link-target[hreflang="' + encodeURIComponent(match[1]) + '"]');
    if ($langlink && $langlink[0] && $langlink[0].href) {
      window.location.replace($langlink[0].href);
    }
  }
});

/* Fires when DOM is ready */
$( function() {


/**
 * Pause animations on mouseover of a designated container (.animated-container and .mcui)
 *
 * This is so people have a chance to look at the image and click on pages they want to view.
 */
$( '#mw-content-text' ).on( 'mouseenter mouseleave', '.animated-container, .mcui', function( e ) {
	$( this ).find( '.animated' ).toggleClass( 'animated-paused', e.type === 'mouseenter' );
} );


} );
/* End DOM ready */

}() );

/* for Module:layerMap to toggle visibility of the layers */
$(".layerMapToggleButton").click(function(){
  var id = $(this).attr('data-forid');
  $('#' + id).toggle();
});



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
	'map': [ '- Карта -',
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
		['Mobile','ARK: Survival Evolved Mobile'],
		['Missing','Пропущенные'],
		['Unreleased','Невыпущенные'],
	],
	'group': [ '- Группа -',
		['Alpha Predators','Альфа-Хищники'],
		['Amphibians','Земноводные'],
		['Birds','Птицы'],
		['Bosses','Боссы'],
		['Dinosaurs','Динозавры'],
		['Enraged Creatures','Разъярённые Существа'],
		['Event Creatures','Существа Событий'],
		['Fantasy','Фантастические'],
		['Fish','Рыбы'],
		['Invertebrates','Беспозвоночные'],
		['Mammals','Млекопитающие'],
		['Mechanical','Механические'],
		['Reptiles','Рептилии'],
		['Synapsids','Синапсиды'],
		['Tek Creatures','Тек Существа'],
		['Titans','Титаны'],
	],
	'habitat': [ '- Место обитания -',
		['Arboreal','Древесные (Деревья)'],
		['Aerial','Летуны'],
		['Aquatic','Водные'],
		['Fossorial','Роющие (Норные)'],
		['Terrestrial','Земные'],
		['Subterranean','Пещерные'],
		['Boss','Боссы (Вызванные)'],
	],
	'diet': [ '- Питание -',
		['Carnivore','Хищники'],
		['Piscivore','Рыбоядные'],
		['Herbivore','Травоядные'],
		['Omnivore','Всеядные'],
		['Carrion-Feeder','Падальщики '],
		['Coprophagic', 'Копрофаги'],
  		['Sanguinivore', 'Вампиры'],
		['Flame Eater', 'Пожиратели Огня'],
		['Minerals', 'Минералы'],
		['Bottom Feeder', 'Поедающие Дно'],
		['Sweet Tooth', 'Sweet Tooths'],
	],
  };
/* End of mw.loader.using callback */
});
 
( function( $ ) {
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
				var field = $('<input type="text" placeholder="Поиск..." />').appendTo(container).attr('id', container.attr('id')+'-field').data('type', 'search')
 
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
} )( jQuery );

/* End Grid Filtering */