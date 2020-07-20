/* Source: http://www.dustindiaz.com/getelementsbyclass/ getElementsByClass,
 * which complements getElementById and getElementsByTagName, returns an array
 * of all subelements of ''node'' that are tagged with a specific CSS class
 * (''searchClass'') and are of the tag name ''tag''. If tag is null, it
 * searches for any suitable elements regardless of the tag name.  Example:
 * getElementsByClass('infobox', document.getElementById('content'), 'div')
 * selects the same elements as the CSS declaration #content div.infobox
 */
function getElementsByClass(searchClass, node, tag) {
   var classElements = new Array();
   
   if(node == null) node = document;
   
   if(tag == null) tag = '*';
   
   var els = node.getElementsByTagName(tag);
   var elsLen = els.length;
   var tester = new ClassTester(searchClass);
   
   for(i = 0, j = 0; i < elsLen; i++) {
       if(tester.isMatch(els[i])) {
           classElements[j] = els[i];
           j++;
       }
   }
   return classElements;
}
function ClassTester(className) {
   this.regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
}
ClassTester.prototype.isMatch = function(element) {
   return this.regex.test(element.className);
}
// end getElementsByClass

function addAlternatingRowColors()
{
    var tables = getElementsByClass('zebra', document.getElementById('content'));

    if(tables.length == 0)
        return;

    for(var k = 0; k < tables.length; k++) {
        var table = tables[k];
        var rows = table.getElementsByTagName('tr');
        var changeColor = false;

        for(var i = 0; i < rows.length; i++)
        {
            if(rows[i].className.indexOf('noalt') != -1)
               continue;
            if(rows[i].className.indexOf('stopalt') != -1)
                break;

            var ths = rows[i].getElementsByTagName('th');

            if(ths.length > 0)
            {
                rows[i].className = "odd";
                changeColor = true;
            }

            if(changeColor)
                rows[i].className = "odd";
            else
                rows[i].className = "even";

            changeColor = !changeColor;
        }
    }
}
addOnloadHook(addAlternatingRowColors);

// Also, make the "sortable" tables striped. This overrides wikibits.js
var ts_alternate_row_colors = true;

// Hit me baby, one more time!

if ( !Array.prototype.indexOf )
{
    Array.prototype.indexOf = function( elt /*, from*/ )
    {
        var len = this.length;
        var from = Number( arguments[1] ) || 0;
        from = from < 0 ? Math.ceil( from ) : Math.floor( from );

        if ( from < 0 )
            from += len;

        for ( ; from < len; from++ )
        {
            if ( from in this && this[from] === elt )

            return from;
        }

        return -1;
    };
}


// Collapsible tables

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
			if( !HeaderRow ) continue;
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if( !Header ) continue;

			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button     = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );

			Button.className = 'collapseButton'; // Styles are declared in MediaWiki:Common.css

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
		}
	}
}

addOnloadHook( createCollapseButtons );

var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();