/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 * 
 *  Modified to use 'mw-collapsible-table' CSS and to use 'data-name' to link multiple tables
 *  by Spottra, May 2014.
 */

var autoCollapse    = 2;
var collapseCaption = 'hide';
var expandCaption   = 'show';
 
function collapseTable(tableIndex, force) {
    var behavior = 0;

    if (force === 'expand')
        behavior = 1;
    else if (force === 'collapse')
        behavior = -1;

    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table  = document.getElementById('collapsibleTable' + tableIndex);
 
    if (!Table || !Button)
        return false;
 
    var collapsetext = $(Table).attr('data-collapsetext');
    collapsetext     = (collapsetext ? collapsetext : collapseCaption);
    var expandtext   = $(Table).attr('data-expandtext');
    expandtext       = (expandtext ? expandtext : expandCaption);

    var Rows = Table.rows;
 
    if (Button.firstChild.data === collapsetext || behavior === -1) {
        for (var i = 1; i < Rows.length; i ++)
            Rows[i].style.display = 'none';

        Button.firstChild.data = expandtext;
        force = 'collapse';
    }
    else {
        for (var i = 1; i < Rows.length; i ++)
            Rows[i].style.display = Rows[0].style.display;

        Button.firstChild.data = collapsetext;
        force = 'expand';
    }

    // If we've been forced, stop right here
    if (arguments.length > 1)
        return false;

    // If this table has a data-name, find other tables with the same name and expand/collapse them too
    if (Table.getAttribute('data-name').length < 1)
        return false;

    var Tables = document.getElementsByTagName('table');

    for (var i = 0; i < Tables.length; i ++) {
        // Make sure to ignore this table (we've already handled it)
        if (Tables[i].hasClassName('collapsible') &&
            Tables[i].id !== 'collapsibleTable' + tableIndex &&
            Tables[i].getAttribute('data-name') === Table.getAttribute('data-name'))
            collapseTable(Tables[i].id.substr(16), force);
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName( 'table' );
 
    for ( var i = 0; i < Tables.length; i++ ) {
        if ( hasClass( Tables[i], 'collapsible' ) ) {
            /* only add button and increment count if there is a header
               row to work with */
            var HeaderRow = Tables[i].getElementsByTagName('tr')[0];

            if (!HeaderRow)
                continue;

            var Header = HeaderRow.getElementsByTagName( 'th' )[0];

            if (!Header)
                continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);
 
            var collapsetext = $(Tables[i]).attr('data-collapsetext');
            var Button       = document.createElement('span');
            var ButtonLink   = document.createElement('a');
            var ButtonText   = document.createTextNode((collapsetext ? collapsetext : collapseCaption));
 
            // Styles are declared in [[MediaWiki:Common.css]]
            Button.className = 'collapseButton mw-collapsible-toggle';
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
            ButtonLink.setAttribute('href',
                "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild(document.createTextNode('['));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode(']'));
 
            HeaderRow.lastChild.insertBefore(Button, HeaderRow.lastChild.childNodes[0]);
            tableIndex ++;
        }
    }
 
    for (var i = 0; i < tableIndex; i ++) {
        if (hasClass(NavigationBoxes[i], 'collapsed') ||
            (tableIndex >= autoCollapse &&
            hasClass(NavigationBoxes[i], 'autocollapse')))
            collapseTable(i);
        else if (hasClass(NavigationBoxes[i], 'innercollapse')) {
            var element = NavigationBoxes[i];

            while (element = element.parentNode) {
                if (hasClass(element, 'outercollapse')) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}
 
addOnloadHook(createCollapseButtons);