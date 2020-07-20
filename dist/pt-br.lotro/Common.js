// <pre>
/* Any JavaScript here will be loaded for all users on every page load. */

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
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

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * @deprecated:  Use $(element).hasClass() instead.
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();


/** Alternating table rows 
 *
 */

/* alternating colors for table rows. */
function setAlternateRows(tbl, parseClass) {
    rows = tbl.getElementsByTagName("tr");
    for (k = 1; k < rows.length; k++) {
        rows[k].className = (k % 2 == 0 ? "even" : "odd");
    }
    return;
}
/* To add a "pallet" for a table, simply modify the CASE argument and add the name
   of the CSS class that you want colors for. */
function alternateRows() {
    tbls = document.getElementsByTagName("table");
    for (i = 0; i < tbls.length; i++) {
        tbl = tbls[i];
        parseClasses = tbl.className.split(" ");
        for (j = 0; j < parseClasses.length; j++) {
            parseClass = parseClasses[j];
            switch( parseClass ) {
                case "altRows":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsMed":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsMed2":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsSmall":
                    setAlternateRows( tbl, parseClass );
                    break;
                case "altRowsMP":
                    setAlternateRows( tbl, parseClass );
                    break;
                default:
                    break;
            }
        }
    }
}


/* This code is executed on a pages after loading has finished */
$(function() {
	createCollapseButtons();
	alternateRows();
});


// old tooltips
importScript('User:Eleazaros/tooltip.js');

// next-gen tooltips: main script
importScript('MediaWiki:Lord of the tooltips.js');
// next-gen tooltips: external communication
importScript('MediaWiki:Postmessage.js');

// Changetier script
importScript('User:Sethladan/Changetier.js');