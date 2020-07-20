/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

// Disable the button to add images to existing galleries
$(function(){
	$('#bodyContent').find('div.wikia-gallery-add').children('a').unbind('click').click(function(){return false;});
});

//BEGIN IRC CODE
///HERE IS THE IRC REPLACER. made by Green Reaper & ShadowTale
function onloadhookcustom() {
  var replace = document.getElementById("IRCReplace");
  if (null != replace) {
    var getvalue = replace.getAttribute("class");
    var nick = (wgUserName == null) ? ('RSW-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=wikia-runescape&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="1000" height="400" style="border:0;"></iframe>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
//END IRC CODE


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
    }
}



addOnloadHook( createCollapseButtons );



// ==================================================================
// Testing of Cell highlighting to make some sort of "check box"
// ==================================================================
$(document).ready(function() {
	var checkCookieLen = 20;
	var checkCookie = getCookie('checkBoxes').split('');

	function cellHighlight(el, val) {
		var cssText = '';
		if (val == '2') {
			cssText = 'background-color: #CCC !important';
		} else if (val == '1') {
			cssText = 'background-color: #CFC !important';
		}
		$(el).children('td').css('cssText', cssText);
	}

	function save() {
		setCookie('checkBoxes', checkCookie.join(''), 60 * 60 * 24 * 7);
	}

	if (wgPageName == 'Check_Boxes_testing') {
		while (checkCookie.length < checkCookieLen) {
			checkCookie.push('0');
		}

		$('#checkBoxes tr').each(function(i) {
			cellHighlight(this, checkCookie[i]);

			$(this).mouseover(function() {
				cellHighlight(this, 2);
			}).mouseout(function() {
				cellHighlight(this, checkCookie[i]);
			}).click(function() {
				checkCookie[i] = 1 - checkCookie[i];
				cellHighlight(this, checkCookie[i]);
				save();
			});
		});

		$('#checkBoxes').append(
			$('<tr />').append(
				$('<th />').attr('colspan', '1').append(
					$('<input />').attr('type', 'button').val('Reset marked locations').click(function() {
						$('#checkBoxes tr').each(function(i) {
							checkCookie[i] = '0';
							cellHighlight(this, checkCookie[i]);
						});
						save();
					})
				)
			)
		);
	}
});

/* </pre> */

$(document).ready(function() {
	var pengCookieLen = 20;
	var pengCookie = getCookie('pengLocations').split('');
 
	function rowHighlight(el, val) {
		var cssText = '';
		if (val == '2') {
			cssText = 'background-color: #CCC !important';
		} else if (val == '1') {
			cssText = 'background-color: #CFC !important';
		}
		$(el).children('td').css('cssText', cssText);
	}
 
	function save() {
		setCookie('pengLocations', pengCookie.join(''), 60 * 60 * 24 * 7);
	}
 
	if (wgPageName == 'Distractions_and_Diversions_Locations') {
		while (pengCookie.length < pengCookieLen) {
			pengCookie.push('0');
		}
 
		$('#penglocations tr').each(function(i) {
			rowHighlight(this, pengCookie[i]);
 
			$(this).mouseover(function() {
				rowHighlight(this, 2);
			}).mouseout(function() {
				rowHighlight(this, pengCookie[i]);
			}).click(function() {
				pengCookie[i] = 1 - pengCookie[i];
				rowHighlight(this, pengCookie[i]);
				save();
			});
		});
 
		$('#penglocations').append(
			$('<tr />').append(
				$('<th />').attr('colspan', '7').append(
					$('<input />').attr('type', 'button').val('Reset marked locations').click(function() {
						$('#penglocations tr').each(function(i) {
							pengCookie[i] = '0';
							rowHighlight(this, pengCookie[i]);
						});
						save();
					})
				)
			)
		);
	}
});

/* </pre> */