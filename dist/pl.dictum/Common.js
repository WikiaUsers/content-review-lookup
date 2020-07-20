/* dodanie linków "skok do góry strony" przy każdym haśle */
addOnloadHook(function() {
 try {
	if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
        if (wgPageName.indexOf("Ukraiński")<0) return;
        if (!wgIsArticle) return;
	var spans= document.getElementsByTagName("span");
	for (var s = 0; s < spans.length; ++s) {
		var span = spans[s];
		if (span.className == "mw-headline") {
                        var jump_to_top = document.createElement("span");
                        jump_to_top.innerHTML = "<a href='#alfabet'>↑</a>";
			span.parentNode.appendChild(document.createTextNode(" "));
			span.parentNode.appendChild(jump_to_top);
		}
	}
 } catch (e) { /* błąd */ }
});

/* dynamiczne pogrubienie selflinków z uwzględnieniem bieżącej sekcji */

function getTextValue(arr) {
 try {
	var txt = "";
	for (var i = 0; i < arr.length; ++i) {
		var tag = arr[i];
		if(tag.nodeType == 3 ) { txt = txt + tag.nodeValue; }
		else { txt = txt + getTextValue(tag.childNodes); }
	}
	return txt;
 } catch (e) { /* błąd */ }
}

addOnloadHook(function() {
 try {
	current = "";
	if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
        if (wgPageName.indexOf("Ukraiński")<0) return;
        if (!wgIsArticle) return;
	var tags = document.getElementsByClassName('WikiaArticle');
	if (tags.length!=1) return;
	tags = tags[0].childNodes;
	for (var t = 0; t < tags.length; ++t) {
		var tag = tags[t];
		if (tag.tagName == "H2") {
			var mws = tag.childNodes;
			for (var mw = 0; mw < mws.length; ++mw) {
				if (mws[mw].className=='mw-headline') {
					current = getTextValue(mws[mw].childNodes).trim();
				}
			}
		} else if (tag.tagName == "DL") {
			var spans = tag.getElementsByTagName('span');
			for (var s = 0; s < spans.length; ++s) {
				var span = spans[s];
				if (span.title == current) {
					span.style.fontWeight = "bold";
				}
			}
		}
	}
 } catch (e) { /* błąd */ }
});




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
  *               [[en:Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
var autoCollapse = 1;
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
 
addOnloadHook( createCollapseButtons );