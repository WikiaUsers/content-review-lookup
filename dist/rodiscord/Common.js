/* Content originally from roblox.fandom.com/wiki/Module:MediaWiki:Common.js */
/* Any JavaScript here will be loaded for all users on every page load. */

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

var toggleMapListSetup = function() {
	var btn = $('a[id^="collapseButton"]');

	btn.each(function() {
		var table = $(this).closest('table');
		var m = $('.maprow', table);

		if (m.length) {
			m.hide(); // Collapse maps by default

			var span = $('<span>', {
				class: 'mapsCollapseButton',
				css: {
					'font-weight': 'normal',
					'float': 'right',
					'margin-right': '7px',
					'cursor': 'pointer'
				}
			});

			table.data('maps-collapsed', true);

			var toggleMaps = function() {
				table.find('.maprow').toggle();
				table.data('maps-collapsed', !table.data('maps-collapsed'));

				$(this).text(function(i, txt) {
					return txt.replace(/\+|−/, function(a) {
						return a === '+' ? '−' : '+';
					});
				});
			}

			var a = $('<a>+maps</a>').click(toggleMaps);

			span.append('[', a, ']');
			$(this).parent().after(span);

			if (table.hasClass('uncollapsed-maps')) {
				a.trigger('click');
			}
		}
	});
};

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

			Button.style.styleFloat = "right";
			Button.style.cssFloat = "right";
			Button.style.fontWeight = "normal";
			Button.style.textAlign = "right";
			// Button.style.width = "6em";

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

$( createCollapseButtons );