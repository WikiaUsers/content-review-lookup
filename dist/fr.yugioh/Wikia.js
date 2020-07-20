$("body.ChatWindow .Chat .message img").attr("width","64px").attr("height","64px");

var items = document.querySelectorAll('.hlist li, .hlist dt, .hlist dd');
for (var i = items.length - 1; i >= 0; i--) {
	items[i].innerHTML = items[i].innerHTML.trim();
}

function pageInCategory(cat) {
    var cleaned = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g,' ');
    return mw.config.get('wgCategories').indexOf(cleaned) != -1;
}
if (pageInCategory('Episode')) {
    $(function(){
        $('#WikiaPage .WikiaPageContentWrapper').append('<div style="border: 1px dotted #888; font-size: 76%; margin: 0 10px 10px; padding: 5px; text-align: center;">Les droits des épisodes 120 à 155 appartiennent à Gulli®<br>Les droits de tous les autres épisodes appartiennent à CanalJ®.</div>');
    });
}

/* UserTags */
 window.UserTagsJS = { 
         modules: {}, 
         tags: {} 
}; 

window.PurgeButtonText = 'Actualiser';

/**
 * Collapsible tables
 *
 * Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
 *
 * @version 2.0.3 (2014-03-14)
 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
 * @author [[User:R. Koot]]
 * @author [[User:Krinkle]]
 */
 
var autoCollapse = 2;
var collapseCaption = '▲';
var expandCaption = '▼';
var tableIndex = 0;
 
function collapseTable( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
    var $row0 = $(Rows[0]);
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = $row0.css( 'display' );
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
function createClickHandler( tableIndex ) {
    return function ( e ) {
        e.preventDefault();
        collapseTable( tableIndex );
    };
}
 
function createCollapseButtons( $content ) {
    var NavigationBoxes = {};
    var $Tables = $content.find( 'table' );
    var i;
 
    $Tables.each( function( i, table ) {
        if ( $(table).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = table.getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) {
                return;
            }
            var Header = table.getElementsByTagName( 'th' )[0];
            if ( !Header ) {
                return;
            }
 
            NavigationBoxes[ tableIndex ] = table;
            table.setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
            // Styles are declared in [[MediaWiki:Common.css]]
            Button.className = 'collapseButton';
            
            Button.style.styleFloat = 'right';
            Button.style.cssFloat = 'right';
            Button.style.fontWeight = 'normal';
            Button.style.textAlign = 'right';
            Button.style.width = '6em';
            Button.style.paddingLeft = '-6.1em';
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', createClickHandler( tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( '' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    } );
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) ||
            ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) )
        ) {
            collapseTable( i );
        }
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createCollapseButtons );
/*** end copied from [[wikipedia:MediaWiki:Common.js]] ***/