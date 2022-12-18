/* Any JavaScript here will be loaded for all users on every page load. */
/** Collapsible tables *********************************************************
*
* From English Wikipedia, 2008-09-15
*
*  Description: Allows tables to be collapsed, showing only the header. See
*               [[Wikipedia:NavFrame]].
*  Maintainers: [[User:R. Koot]]
*/
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
	var Button = document.getElementById( "collapseButton" + tableIndex );
	var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = "none";
		}
		Button.firstChild.data = expandCaption;
 
		$('.mapsCollapseButton', Table).hide();
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			if ( hasClass( Rows[i], "maprow" ) ) {
				// Skip showing for this row if the maps are in collapsed state
				if ($(Table).data('maps-collapsed')) {
					continue;
				}
			}
 
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
 
		$('.mapsCollapseButton', Table).show();
	}
}
 
function createCollapseButtons()
{
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( "table" );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], "collapsible" ) ) {
 
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
			if (!HeaderRow) continue;
			var Header = HeaderRow.getElementsByTagName( "th" )[0];
			if (!Header) continue;
 
			NavigationBoxes[ tableIndex ] = Tables[i];
			Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
			var Button     = document.createElement( "span" );
			var ButtonLink = document.createElement( "a" );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = "collapseButton";  //Styles are declared in Common.css
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
			ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( "[" ) );
				Button.appendChild( ButtonLink );
				Button.appendChild( document.createTextNode( "]" ) );
 
				Header.insertBefore( Button, Header.childNodes[0] );
				tableIndex++;
		}
	}
 
	// Create [+maps] buttons after setting up the table collapse buttons,
	// but before initial collapseTable calls
	toggleMapListSetup();
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
			collapseTable( i );
		}
	}
}
/** Test if an element has a certain class **************************************
*
* Description: Uses regular expressions and caching for better performance.
* Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
*/
 
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();
 
/**
* Countdown
*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

/* Cross table row/column highlights */
$('.crosstable td').hover(function() {
	var crcolumn = parseInt($(this).index()) + 1;
	var crcolumnp = crcolumn + 1;
	var crcolumnm = crcolumn - 1;
	var crrow = parseInt($(this).parent().index()) + 1;
	var crrowp = crrow + 1;
	var crrowm = crrow - 1;
	$(this).closest('table').find('tr:not(:nth-child(' + crrow + '))').find('td:nth-child(' + crcolumnp + ')').addClass('crosstable-highlighted-column-right');
	$(this).closest('table').find('tr:not(:nth-child(' + crrow + '))').find('td:nth-child(' + crcolumnm + ')').addClass('crosstable-highlighted-column-left');
	$(this).closest('table').find('tr:nth-child(' + crrowp + ')').find('td:not(:nth-child(' + crcolumn + '))').addClass('crosstable-highlighted-row-lower');
	$(this).closest('table').find('tr:nth-child(' + crrowm + ')').find('td:not(:nth-child(' + crcolumn + '))').addClass('crosstable-highlighted-row-upper');
	$(this).closest('table').find('tr:not(:nth-child(' + crrow + '))').find('td:not(:nth-child(' + crcolumn + '))').addClass('crosstable-muted');
},
function() {
	var crcolumn = parseInt($(this).index()) + 1;
	var crcolumnp = crcolumn + 1;
	var crcolumnm = crcolumn - 1;
	var crrow = parseInt($(this).parent().index()) + 1;
	var crrowp = crrow + 1;
	var crrowm = crrow - 1;
	$(this).closest('table').find('td:nth-child(' + crcolumnp + ')').removeClass('crosstable-highlighted-column-right');
	$(this).closest('table').find('td:nth-child(' + crcolumnm + ')').removeClass('crosstable-highlighted-column-left');
	$(this).closest('table').find('tr:nth-child(' + crrowp + ')').find('td').removeClass('crosstable-highlighted-row-lower');
	$(this).closest('table').find('tr:nth-child(' + crrowm + ')').find('td').removeClass('crosstable-highlighted-row-upper');
	$(this).closest('table').find('tr:not(:nth-child(' + crrow + '))').find('td:not(:nth-child(' + crcolumn + '))').removeClass('crosstable-muted');
});
;$('.crosstable').find('tr:not(:last-child)').children('th').hover(function() {
	var crrow = parseInt($(this).parent().index()) + 1;
	var crrowp = crrow + 1;
	var crrowm = crrow - 1;
	$(this).closest('table').find('tr:nth-child(' + crrowp + ')').find('td').addClass('crosstable-highlighted-row-lower');
	$(this).closest('table').find('tr:nth-child(' + crrowm + ')').find('td').addClass('crosstable-highlighted-row-upper');
	$(this).closest('table').find('tr:not(:nth-child(' + crrow + '))').find('td').addClass('crosstable-muted');
}, 
function() {
	var crrow = parseInt($(this).parent().index()) + 1;
	var crrowp = crrow + 1;
	var crrowm = crrow - 1;
	$(this).closest('table').find('tr:nth-child(' + crrowp + ')').find('td').removeClass('crosstable-highlighted-row-lower');
	$(this).closest('table').find('tr:nth-child(' + crrowm + ')').find('td').removeClass('crosstable-highlighted-row-upper');
	$(this).closest('table').find('tr:not(:nth-child(' + crrow + '))').find('td').removeClass('crosstable-muted');
});
 
/* Toggle groups (see Template:Toggle group start) */
var toggleShowCaption = 'show all', toggleHideCaption = 'hide all';
$('.toggle-group').each( function(index) {
	var toggleDefaultState = $(this).is('.toggle-state-hide') ? 'Hide' : 'Show',
	    $button = $('<span>')
		.html('[')
		.append($('<a>').addClass('toggle-button').text(window['toggle' + toggleDefaultState + 'Caption']).data('toggle-group-index', index).attr('href', 'javascript:'))
		.append(']');
	$(this).prepend($button);
	$(this).attr('id', 'toggle-group-' + index);
});
$('.toggle-button').click( function() {
	var toggleAction = $(this).text();
	$('#toggle-group-' + $(this).data('toggle-group-index')).find('.collapseButton a').each( function() {
		if (($(this).text() == collapseCaption && toggleAction == toggleHideCaption) || ($(this).text() == expandCaption && toggleAction == toggleShowCaption)) {
			$(this)[0].click();
		}
	});
	$(this).text($(this).text() == toggleShowCaption ? toggleHideCaption : toggleShowCaption);
});
 
/* collapse new prize pool tables */
$(document).ready(function () {
	if ($('table.prizepooltable').length) {
		$('table.prizepooltable').each(function (index) {
			$(this).addClass('collapsed');
			var cutafter;
			if (($(this).attr('data-cutafter')) && ($(this).data('cutafter') == '')) {
				cutafter = 5;
			} else {
				cutafter = parseInt($(this).data('cutafter')) +  1;
			}
			$(this).data('definedcutafter', cutafter + 2);
			if ($(this).find('tr').length > cutafter) {
				$(this).find('tr:nth-child('+cutafter+')').after('<tr><td colspan="'+$(this).find('tr:first-child th').length+'"><small class="prizepooltableshow">Click "show" to display placements '+cutafter+' to '+ ($(this).find('tr').length - 1) +'</small><small class="prizepooltablehide">Click "hide" to hide placements '+cutafter+' to '+ ($(this).find('tr').length - 1) +'</small><span class="prizepooltablecollapsebutton">[<span class="prizepooltableshow">show</span><span class="prizepooltablehide">hide</span>]</span></td></tr>');
				$(this).closest('table.prizepooltable').find('tr:nth-child(n+'+ $(this).closest('table.prizepooltable').data('definedcutafter') +')').css('display', 'none');
			}
		});
		$('.prizepooltablecollapsebutton').click(function() {
			$(this).closest('table.prizepooltable').toggleClass('collapsed');
			$(this).closest('table.prizepooltable').find('tr:nth-child(n+'+ $(this).closest('table.prizepooltable').data('definedcutafter') +')').toggle();
		});
	}
});
 
/* Bracket Popups by Anomek */
 
var bracketGame;
$.fn.justtext = function() {
	return $(this).clone().children().remove('div').end().text().trim();
};
$(document).ready(function() {
	$('.bracket-game').each( function() {
		if ($(this).find('.bracket-game-details').length > 0) {
			var margin = $(this).find(':first-child').height() - 6;
			$(this).prepend('<div class="icon" style="margin-top:' + margin + 'px;"></div>');
			$(this).find('.bracket-team-top, .bracket-team-bottom').each(function() {
				$(this).css('cursor', 'pointer');
				$(this).attr('title', 'Click for further information');
			});
		}
	});
	$('tr.match-row').each( function() {
		if ($(this).find('.bracket-game-details').length > 0) {
			$(this).find('td:eq(2)').prepend('<div style="position:relative"><div class="match-row-icon"></div></div>');
		}
		$(this).attr('title', 'Click for further information');
	});
 
	$('html').click(function () {
		if (bracketGame != null) {
			bracketGame.find('.bracket-game-details').toggle();
			bracketGame = null;
		}
	});
 
	$('.bracket-team-top, .bracket-team-bottom, .bracket-game .icon').click(
	function (event) {
		var bracket = $(this).closest('.bracket'),
			detailsHeight, detailsWidth, spaceOnTheRight;
		if (bracketGame != null) {
			bracketGame.children('.bracket-game-details').toggle();
			if (bracketGame[0] === $(this).closest('.bracket-game')[0]) {
				bracketGame = null;
				return;
			}
		}
		bracketGame = $(this).closest('.bracket-game');
		detailsHeight= bracketGame.children('.bracket-game-details').height();
		detailsWidth = bracketGame.children('.bracket-game-details').width();
 
		bracketGame.children('.bracket-game-details').css('margin-top', -detailsHeight / 2);
		spaceOnTheRight = Math.max($(window).width(), bracket.offset().left + bracket.outerWidth()) - (bracketGame.offset().left + bracketGame.outerWidth());
		if (spaceOnTheRight < detailsWidth && bracketGame.offset().left > detailsWidth) {
			bracketGame.children('.bracket-game-details').css('margin-left', -detailsWidth - 1);
		} else {
			bracketGame.children('.bracket-game-details').css('margin-left', bracketGame.width());
		}
		bracketGame.children('.bracket-game-details').toggle();
		event.stopPropagation();
	});
	$('tr.match-row').click(function (event) {
		if (bracketGame != null) {
			bracketGame.find('.bracket-game-details').toggle();
			if (bracketGame[0] === $(this)[0]) {
				bracketGame = null;
				return;
			}
		}
		bracketGame = $(this);
		var height = bracketGame.find('.bracket-game-details').height();
		bracketGame.find('.bracket-game-details').css('margin-top', 3);
		bracketGame.find('.bracket-game-details').toggle();
		event.stopPropagation();
	});
 
	$('.bracket-game-details').click(function (event) {
		event.stopPropagation();
	});
});
 
/* Highlighting by FO-nTTaX */
 
var highlightingsearch = [];
var highlightingstandardicon = ['Dotalogo_std.png'];
$(document).ready(function() {
 
	$('tr.match-row').hover(function () {
		$(this).addClass('bracket-hover');
		if ($(this).closest('tr.match-row').find('.bracket-game-details').length) {
			$(this).css('cursor', 'pointer');
		}
	}, function () {
		$(this).removeClass('bracket-hover');
	});
 
	if($('.bind-highlighting').length > 0) {
		var highlightingbinds = [];
		$('.bind-highlighting').each(function () {
			var to = $(this).children('.bind-highlighting-to');
			var from = $(this).children('.bind-highlighting-from');
 
			var icto = $(to).find('.team-template-image img');
			if (icto.length == 1) {
				var icsrcto = icto.attr('src').split('/');
				icsrcto = icsrcto[icsrcto.length - 1];
				icsrcto = icsrcto.replace("-icon", "_std");
				if (icsrcto.indexOf('-') != -1) {
					icsrcto = icsrcto.split('-');
					icsrcto = icsrcto[icsrcto.length - 1];
				}
				if (highlightingstandardicon.indexOf(icsrcto) != -1) {
					icsrcto = $(to).justtext();
				}
			} else {
				var icsrcto = $(to).justtext();
			}
			var icfrom = $(from).find('.team-template-image img');
			if (icfrom.length == 1) {
				var icsrcfrom = icfrom.attr('src').split('/');
				icsrcfrom = icsrcfrom[icsrcfrom.length - 1];
				icsrcfrom = icsrcfrom.replace("-icon", "_std");
				if (icsrcfrom.indexOf('-') != -1) {
					icsrcfrom = icsrcfrom.split('-');
					icsrcfrom = icsrcfrom[icsrcto.length - 1];
				}
				if (highlightingstandardicon.indexOf(icsrcfrom) != -1) {
					icsrcfrom = $(from).justtext();
				}
			} else {
				var icsrcfrom = $(from).justtext();
			}
			highlightingbinds[icsrcfrom] = icsrcto;
		});
	}
	$('.bracket-team-top, .bracket-team-bottom, .bracket-team-middle, .bracket-player-top, .bracket-player-bottom, .bracket-player-middle, .matchlistslot, .grouptableslot').each(function() {
		var ic = $(this).find('.team-template-image img');
		if (ic.length == 1) {
			var icsrc = ic.attr('src').split('/');
			icsrc = icsrc[icsrc.length - 1];
			icsrc = icsrc.replace("-icon", "_std");
			if (icsrc.indexOf('-') != -1) {
				icsrc = icsrc.split('-');
				icsrc = icsrc[icsrc.length - 1];
			}
			if (highlightingstandardicon.indexOf(icsrc) != -1) {
				icsrc = $(this).justtext();
			}
			if ((typeof highlightingbinds !== 'undefined') && (icsrc in highlightingbinds)) {
				icsrc = highlightingbinds[icsrc];
			}
			if (!Array.isArray(highlightingsearch[icsrc])) {
				highlightingsearch[icsrc] = [];
			}
			highlightingsearch[icsrc].push(this);
			$(this).data('highlightingkey', icsrc);
		} else {
			var icsrc = $(this).justtext();
			if ((typeof highlightingbinds !== 'undefined') && (icsrc in highlightingbinds)) {
				icsrc = highlightingbinds[icsrc];
			}
			if (!Array.isArray(highlightingsearch[icsrc])) {
				highlightingsearch[icsrc] = [];
			}
			highlightingsearch[icsrc].push(this);
			$(this).data('highlightingkey', icsrc);
 
			/* Starcraft specific start */
			if ((!$(this).hasClass('grouptableslot')) && (!$(this).hasClass('matchlistslot'))) {
				$(this).data('background-color', $(this).css('background-color'));
				switch ($(this).data('background-color')) {
					case 'rgb(242, 184, 184)':
						$(this).data('background-color-hover', 'rgb(250,217,217)'); //Zerg
						break;
					case 'rgb(184, 242, 184)':
						$(this).data('background-color-hover', 'rgb(217,250,217)'); //Protoss
						break;
					case 'rgb(184, 184, 242)':
						$(this).data('background-color-hover', 'rgb(217,217,250)'); //Terran
						break;
					default:
						$(this).data('background-color-hover', 'rgb(250,250,250)'); //normal
						break;
				}
			}
			/* Starcraft specific end */
		}
	});
	$('.bracket-team-top, .bracket-team-bottom, .bracket-team-middle, .bracket-player-top, .bracket-player-bottom, .bracket-player-middle, .matchlistslot, .grouptableslot').hover(function() {
		var icsrc = $(this).data('highlightingkey');
		if (typeof icsrc !== 'undefined') {
			var filter = ['BYE', 'TBD', 'TBA', '', 'LOGO_FILLER_STD.PNG'];
			if (filter.indexOf(icsrc.toUpperCase()) == -1) {
				$.each(highlightingsearch[icsrc], function() {
					$(this).addClass('bracket-hover');
					/* Starcraft specific start */
					if (typeof $(this).data('background-color-hover') !== 'undefined') {
						$(this).css('background-color', $(this).data('background-color-hover'));
					}
					/* Starcraft specific end */
				});
			}
		}
	}, function() {
		var icsrc = $(this).data('highlightingkey');
		if (typeof icsrc !== 'undefined') {
			$.each(highlightingsearch[icsrc], function() {
				$(this).removeClass('bracket-hover');
				/* Starcraft specific start */
				if (typeof $(this).data('background-color-hover') !== 'undefined') {
					$(this).css('background-color', $(this).data('background-color'));
				}
				/* Starcraft specific end */
			});
		}
	});
 
});
 
/* "Select all" by Chapatiyaq */
$(document).ready( function() {
	$( 'pre.selectall' ).each( function() {
		var $wrapper, $relative;
 
		$wrapper = $( '<div class="selectall-wrapper"></div>' ).insertBefore( $(this) );
		$(this).detach().appendTo( $wrapper );
 
		$(this).before( $( '<a class="selectall-button" href="javascript:;">Select all</a>' ) );
 
		$relative = $( '<div class="selectall-relative"></div>' ).insertBefore( $(this) );
		$(this).detach().appendTo( $relative );
	});
 
	$( 'div.selectall-wrapper' ).on( 'blur', 'textarea.selectall-duplicate', function() {
		$(this).remove();
	});
 
	$( 'a.selectall-button' ).on( 'click', function() {
		var $wrapper = $(this).closest( 'div.selectall-wrapper' ),
			$pre = $wrapper.find( 'pre.selectall' );
 
		$( '<textarea>' )
			.attr( 'readonly', true )
			.addClass( 'selectall-duplicate' )
			.text( $pre.text() )
			.appendTo( $wrapper.find( 'div.selectall-relative' ) )
			.css( {
				'padding': $pre.css( 'padding' ),
				'line-height': $pre.css( 'line-height' ),
				'font-family': $pre.css( 'font-family' ),
				'font-size': $pre.css( 'font-size' )
			})
			.focus().select();
	});
});