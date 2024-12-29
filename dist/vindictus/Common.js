$(document).ready(function() {
	$('.rolloverToggle').hover(
		function() {
			$('.rolloverItem', this).hide();
			$('.rolloverB', this).show();
		},
		function() {
			$('.rolloverItem', this).hide();
			$('.rolloverA', this).show();
		}
	);
});

$(document).ready(function() {
	$('.tabdiv > div').hide();
	$('.tabdiv').each(function() {
		$(this).find('> ul li:first').addClass('active');
		$(this).find('> div:first').show();
	});
 	$('.tabdiv > ul li').each(function() {
		var a = $(this).find('a:first');
		var target = a.attr('href');
		$(a).attr('href', ''); // Opera hates real hrefs
		$(this).click(function() {
			$(this).parent().find('> li').removeClass('active');
			$(this).parent().parent().find('> div').hide();
			$(this).addClass('active');
			$(target).show();
			return false;
		});
	});
});

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *			   http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
	if ( !Table || !Button ) {
		return false;
	}
 
	var Rows = Table.rows;
 
	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}
 
function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( 'table' );
 
	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
 
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if ( !HeaderRow ) {
				continue;
			}
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if ( !Header ) {
				continue;
			}
 
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
			var Button = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );
 
			Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );
 
			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );
 
			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}
 
	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		} else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
			var element = NavigationBoxes[i];
			while ( element = element.parentNode ) {
				if ( hasClass( element, 'outercollapse' ) ) {
					collapseTable( i );
					break;
				}
			}
		}
	}
}
 
$(document).ready( createCollapseButtons() );
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 

var hasClass = ( function() {
	var reCache = {};
	return function( element, className ) {
		return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
	};
})();

/*Script to load random backgrounds*/
/*Please do not change, you can also add another background image in the array so then will be displayed on the wiki*/
/*
function changeBackg() {

	var backgroundImg = [
		"https://vindictus.gamepedia.com/media/vindictus.gamepedia.com/3/3a/Bg2.png"
	];
 
	var index = backgroundImg[Math.floor(Math.random() * backgroundImg.length)];
	document.body.style.backgroundImage = "url('"+index+"')";
        document.body.style.backgroundColor = "#0e141d";
        document.body.style.color = "#9fa5a8";
        document.body.style.repeat = "no-repeat";
        document.body.style.position = "left top";
        document.body.style.backgroundAttachment = "fixed";
}

window.onload = changeBackg; //run onload website
*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassEdit/code.js',
    ]
});

console.log('hello world');