// <pre>
/*
UWAGA! Ten JavaScript działa dla wszystkich skórek. Należy zachować szczególną ostrożność wprowadzając tutaj zmiany!
/*
==== funkcja insertTagsTo_ ====
; Author: phpBB Team, WikiMedia, Maciej Jaros [[:pl:User:Nux]]
; Licence: [http://opensource.org/licenses/gpl-license.php GNU General Public License v2]
; Description: Apply tagOpen/tagClose to selection in given textarea/input, use sampleText instead of selection if there is none. Copied and adapted from phpBB
*/
// outputid = 'some_id_of_a_textarea_or_a_text_input'
function insertTagsTo_(tagOpen, tagClose, sampleText, outputid) {
	var txtarea = document.getElementById(outputid);
	if (!txtarea)
		return
	;

	// IE
	if (document.selection  && !is_gecko) {
		var theSelection = document.selection.createRange().text;
		if (!theSelection)
			theSelection=sampleText;
		txtarea.focus();
		if (theSelection.charAt(theSelection.length - 1) == " ") { // exclude ending space char, if any
			theSelection = theSelection.substring(0, theSelection.length - 1);
			document.selection.createRange().text = tagOpen + theSelection + tagClose + " ";
		} else {
			document.selection.createRange().text = tagOpen + theSelection + tagClose;
		}

	// Mozilla
	} else if(txtarea.selectionStart || txtarea.selectionStart == '0') {
		var replaced = false;
		var startPos = txtarea.selectionStart;
		var endPos = txtarea.selectionEnd;
		if (endPos-startPos)
			replaced = true;
		var scrollTop = txtarea.scrollTop;
		var myText = (txtarea.value).substring(startPos, endPos);
		if (!myText)
			myText=sampleText;
		if (myText.charAt(myText.length - 1) == " ") { // exclude ending space char, if any
			subst = tagOpen + myText.substring(0, (myText.length - 1)) + tagClose + " ";
		} else {
			subst = tagOpen + myText + tagClose;
		}
		txtarea.value = txtarea.value.substring(0, startPos) + subst +
			txtarea.value.substring(endPos, txtarea.value.length);
		txtarea.focus();
		//set new selection
		if (replaced) {
			var cPos = startPos+(tagOpen.length+myText.length+tagClose.length);
			txtarea.selectionStart = cPos;
			txtarea.selectionEnd = cPos;
		} else {
			txtarea.selectionStart = startPos+tagOpen.length;
			txtarea.selectionEnd = startPos+tagOpen.length+myText.length;
		}
		txtarea.scrollTop = scrollTop;
	}
	// reposition cursor if possible
	if (txtarea.createTextRange)
		txtarea.caretPos = document.selection.createRange().duplicate();
}

 /* Test if an element has a certain class **************************************
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

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *	       [[en:Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */

var autoCollapse = 2;
var collapseCaption = "ukryj";
var expandCaption = "pokaż";

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
    } else {
	for ( var i = 1; i < Rows.length; i++ ) {
	    Rows[i].style.display = Rows[0].style.display;
	}
	Button.firstChild.data = collapseCaption;
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
	    Button.style.width = "6em";

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

    for ( var i = 0;  i < tableIndex; i++ ) {
	if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
	    collapseTable( i );
	}
	else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
	    var element = NavigationBoxes[i];
	    while (element = element.parentNode) {
		if ( hasClass( element, "outercollapse" ) ) {
		    collapseTable ( i );
		    break;
		}
	    }
	}
    }
}

jQuery(document).ready( createCollapseButtons );


/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
	return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
	for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
	    if ( hasClass( NavChild, 'NavPic' ) ) {
		NavChild.style.display = 'none';
	    }
	    if ( hasClass( NavChild, 'NavContent') ) {
		NavChild.style.display = 'none';
	    }
	}
    NavToggle.firstChild.data = NavigationBarShow;

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
	for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
	    if (hasClass(NavChild, 'NavPic')) {
		NavChild.style.display = 'block';
	    }
	    if (hasClass(NavChild, 'NavContent')) {
		NavChild.style.display = 'block';
	    }
	}
	NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
	// if found a navigation bar
	if (hasClass(NavFrame, "NavFrame")) {

	    indexNavigationBar++;
	    var NavToggle = document.createElement("a");
	    NavToggle.className = 'NavToggle';
	    NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
	    NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

	    var isCollapsed = hasClass( NavFrame, "collapsed" );
	    /*
	     * Check if any children are already hidden.  This loop is here for backwards compatibility:
	     * the old way of making NavFrames start out collapsed was to manually add style="display:none"
	     * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
	     * the content visible without JavaScript support), the new recommended way is to add the class
	     * "collapsed" to the NavFrame itself, just like with collapsible tables.
	     */
	    for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
		if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
		    if ( NavChild.style.display == 'none' ) {
			isCollapsed = true;
		    }
		}
	    }
	    if (isCollapsed) {
		for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
		    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
			NavChild.style.display = 'none';
		    }
		}
	    }
	    var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
	    NavToggle.appendChild(NavToggleText);

	    // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
	    for(var j=0; j < NavFrame.childNodes.length; j++) {
		if (hasClass(NavFrame.childNodes[j], "NavHead")) {
		    NavFrame.childNodes[j].appendChild(NavToggle);
		}
	    }
	    NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
	}
    }
}

jQuery(document).ready( createNavigationBarToggleButton );

/**
 * Skrypt dla Szablon:Galeria
 */
function toggleImage (group, remindex, shwindex) {
	jQuery("#ImageGroupsGr" + group + "Im" + remindex).hide();
	jQuery("#ImageGroupsGr" + group + "Im" + shwindex).show();
}
function ImageGroup() {
	jQuery('div.ImageGroup').each(function(i, group) {
		var unitnode = jQuery('div.ImageGroupUnits', group).get(0);
		if (unitnode == undefined) {
			return 1;
		}
		var units = jQuery(unitnode).children('.center');
		var count = units.get().length;
		if (count <= 1) {
			return 1;
		}
		units.each(function(j, currentimage) {
			jQuery(currentimage).attr('id', "ImageGroupsGr" + i + "Im" + j);
			var leftlink = jQuery('<a href="#"/>');
			if (j != 0) {
				leftlink.text('◀').click(function() {
					toggleImage(i, j, j - 1); return false;
				});
			}
			var rightlink = jQuery('<a href="#"/>');
			if (j != count - 1) {
				rightlink.text('▶').click(function() {
					toggleImage(i, j, j + 1); return false;
				});
			}
			jQuery('<div/>').css({ 'font-size' : '110%', 'font-weight' : 'bold' })
				.append(leftlink)
				.append('<tt>(' + (j + 1) + '/' + count +  ')</tt>')
				.append(rightlink)
				.prependTo(jQuery(currentimage));
			if (j != 0) {
				jQuery(currentimage).hide().addClass('noprint');
			}
		});
	});
}
jQuery(document).ready(ImageGroup);

mw.loader.using( "mediawiki.util", function() {
	if ( mw.config.get( 'wgUserName' ) == null ) {
		mw.util.addCSS( '.anon_hide_block{display:none}' );

		// Skrypt dla anonimowych użytkowników umożliwiający odznaczenie wiadomości jako przeczytanych (na daną sesję).
		if ( mw.config.get( 'wgNamespaceNumber' ) === 3 ) {
			jQuery( document ).ready( function() {
				re = new RegExp( 'title=[^:&]+:[0-9.]+\&diff=cur' );
				if ( re.test( location.search ) ) {
					jQuery.cookie( 'read_memail_go_away', '1', {
						path: '/'
					} );
				}
			} );
		}

		if ( jQuery.cookie( 'read_memail_go_away' ) == '1' ) {
			mw.util.addCSS( '.usermessage {display:none;}' );
		}

	} else {
		mw.util.addCSS( '.nonanon_hide_block{display:none}' );
	}
} );

/////////////////////////////////////////
/////       Skrypty zewnętrzne     //////
/////////////////////////////////////////

/** Parametr &withJS= *******
 * Spróbuj załadować dodatkowy skrypt z przestrzeni MediaWiki
 * bez potrzeby edytowania [[Special:Mypage/monobook.js]]
 *
 * Maintainer: commons: [[User:Platonides]], plwiki: [[User:Saper]]
 */

mw.loader.using( "mediawiki.util", function() {
	var extraJS = mw.util.getParamValue( "withJS" );
	if ( extraJS ) {
		if ( extraJS.match( "^MediaWiki:[^&<>=%]*\.js$" ) ) {
			importScript( extraJS );
		} else {
			alert( "Plik " + extraJS + " nie powinien byc ladowany." );
		}
	}
});

//
// Array.indexOf() dla kompatybilności różnych skryptów z IE
// (skrypt z Mozilli)
if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++)
		{
			if (from in this && this[from] === elt)
				return from;
		}
		return -1;
	};
}
//
// Ustawienie wysokości "Usunięcie" pustego elementu contentSub
//
jQuery(document).ready(function()
{
	var el=document.getElementById('mw-revisiontag');
	if (el && el.className.indexOf('flaggedrevs_short')!=-1)
	{
		if (el.parentNode.id=='contentSub') el.parentNode.style.height='17px';
	}
});

jQuery(document).ready(function()
{
	var fn = getElementsByClassName(document, 'table', 'navbox');
	if (fn.length) fn[0].className+=' firstNavbox';
})

/*
 * Description: Redirects from User:UserName/skin.js or .css to the user's actual skin page
 * Maintainer: Nux
 */
if (mw.config.get('wgNamespaceNumber') == 2 && mw.config.get('wgArticleId') == 0 && mw.config.get('wgAction') == "view"	// Nonexistent User:... page in view mode
	&& mw.config.get('wgUserName')    // Logged in User
	&& mw.config.get('wgTitle').indexOf(mw.config.get('wgUserName')+"/skin.")===0
	&& mw.config.get('wgTitle').search(/\/skin.(js|css)/)>0
	)
{
	window.location.href = window.location.href.replace(/\/skin.(css|js)/i, '/' + skin + '.$1');
}


// Kod pozwalający na skonstruowanie niesortującej się kolumny z liczbą porządkową w sortowalnych tabelkach.
// Odpowiednia komórka nagłówkowa sortowalnej tabelki (class="sortable") musi być oznaczona
// jako niesortowalna i zawierająca liczby porządkowe (class="unsortable ordinal").
// Dyskusja w kawiarence: [[Wikipedia:Kawiarenka/Kwestie techniczne#Poprawa tabeli w Miasta w Polsce (statystyki)]]
// Zgłoszenie na Bugzilli: [https://bugzilla.wikimedia.org/show_bug.cgi?id=40618]
$('table.sortable th.unsortable.ordinal').each(function(i, th) {
	var $th = $(th), $table = $th.closest('table');
	$table.on('sortEnd.tablesorter', function() {
		$table.find('tr td:nth-child('+ (th.column+1) +')').each(function(j, td) {
			$(td).text( (j+1) );
		});
	})
});

// Sortowanie tekstów w tabelach (class="sortable") uwzględniające polskie diakrytyki.
// Nie jest to rozwiązanie "poprawne", ale de facto działa.
mw.config.set('tableSorterCollation', {
	'ą':'azz', 'Ą':'AZZ', 
	'ć':'czz', 'Ć':'CZZ', 
	'ę':'ezz', 'Ę':'EZZ', 
	'ł':'lzz', 'Ł':'LZZ', 
	'ń':'nzz', 'Ń':'NZZ', 
	'ó':'ozz', 'Ó':'OZZ', 
	'ś':'szz', 'Ś':'SZZ', 
	'ź':'zzz', 'Ź':'ZZZ', 
	'ż':'zzzz', 'Ż':'ZZZZ'
});

// Kod dla [[Szablon:Preferencja]].
// Wyświetla checkbox zmieniający ustawienia użytkownika; więcej informacji w opisie szablonu.
$(document).ready(function(){
	mw.loader.using(['mediawiki.api', 'jquery.spinner'], function(){
		var api = new mw.Api();

		$('.plwiki-preference-toggle').each(function(){
			var cleanUp = function(){
				$toggler.prop('checked', prefEnabled);
				$spinner.replaceWith($toggler);
				$toggler.on('change', clickHandler); // silly jQuery removing my events
			};

			var errorHandler = function(){
				alert('Coś poszło nie tak. Spróbuj ponownie lub zgłoś problem. Ustawienia wciąż możesz zmienić w Preferencjach.');
				cleanUp();
			};

			var clickHandler = function(){
				var newValue = prefEnabled ? '' : '1';
				$toggler.replaceWith($spinner);

				api.get({
					action: 'tokens', type: 'options'
				}).done(function(json){
					api.post({
						action: 'options',
						optionname: prefName,
						optionvalue: newValue,
						token: json.tokens.optionstoken
					}).done(function(json){
						if(json.options === 'success' && !json.warnings){
							prefEnabled = !prefEnabled;
							cleanUp();
						} else {
							errorHandler();
						}
					}).fail(errorHandler);
				}).fail(errorHandler);
			};

			var $el = $(this);
			var prefName = $el.data('preference');
			var prefEnabled = !!mw.user.options.get(prefName, false);

			var $toggler = $('<input type=checkbox>').prop('checked', prefEnabled);
			var $spinner = $.createSpinner();
			$el.prepend( $toggler, ' ' );
			$el.wrap('<label>');

			$toggler.on('change', clickHandler);
		});
	});
});