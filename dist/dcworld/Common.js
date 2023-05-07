/**
 * Keep code in MediaWiki:Common.js to a minimum as it is unconditionally
 * loaded for all users on every wiki page. If possible create a gadget that is
 * enabled by default instead of adding it here (since gadgets are fully
 * optimized ResourceLoader modules with possibility to add dependencies etc.)
 *
 * Since Common.js isn't a gadget, there is no place to declare its
 * dependencies, so we have to lazy load them with mw.loader.using on demand and
 * then execute the rest in the callback. In most cases these dependencies will
 * be loaded (or loading) already and the callback will not be delayed. In case a
 * dependency hasn't arrived yet it'll make sure those are loaded before this.
 */
mw.loader.using( ['mediawiki.util', 'mediawiki.notify', 'jquery.client'], function () {
/* Begin of mw.loader.using callback */
 
/**
 * @source www.mediawiki.org/wiki/Snippets/Load_JS_and_CSS_by_URL
 * @rev 5
 */
// CSS
var extraCSS = mw.util.getParamValue( 'withCSS' );
if ( extraCSS ) {
	if ( extraCSS.match( /^MediaWiki:[^&<>=%#]*\.css$/ ) ) {
		importStylesheet( extraCSS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withCSS value' } );
	}
}
 
// JS
var extraJS = mw.util.getParamValue( 'withJS' );
if ( extraJS ) {
	if ( extraJS.match( /^MediaWiki:[^&<>=%#]*\.js$/ ) ) {
		importScript( extraJS );
	} else {
		mw.notify( 'Only pages from the MediaWiki namespace are allowed.', { title: 'Invalid withJS value' } );
	}
}
 
/**
 * Import more specific scripts if necessary
 */
if ( mw.config.get( 'wgAction' ) === 'edit' || mw.config.get( 'wgAction' ) === 'submit' || mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
    /* scripts specific to editing pages */
    importScript( 'MediaWiki:Common.js/edit.js' );
} else if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Watchlist' ) {
    /* watchlist scripts */
    importScript( 'MediaWiki:Common.js/watchlist.js' );
}
if ( mw.config.get( 'wgNamespaceNumber' ) === 6 ) {
    /* file description page scripts */
    importScript( 'MediaWiki:Common.js/file.js' );
}
 
/**
 * Load scripts specific to Internet Explorer
 */
if ( $.client.profile().name === 'msie' ) {
    importScript( 'MediaWiki:Common.js/IEFixes.js' );
}
 
/**
 * Fix for Windows XP Unicode font rendering
 */
if ( navigator.appVersion.search(/windows nt 5/i) !== -1 ) {
    mw.util.addCSS( '.IPA { font-family: "Lucida Sans Unicode", "Arial Unicode MS"; } ' + 
                '.Unicode { font-family: "Arial Unicode MS", "Lucida Sans Unicode"; } ' );
}
 
/**
 * Collapsible tables *********************************************************
 *
 * Description: Allows tables to be collapsed, showing only the header. See
 *              [[Wikipedia:NavFrame]].
 * Maintainers: [[User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
window.collapseTable = function ( tableIndex ) {
    var Button = document.getElementById( 'collapseButton' + tableIndex );
    var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
    var i;
 
    if ( Button.firstChild.data === collapseCaption ) {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
};
 
function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName( 'table' );
    var i;
 
    function handleButtonLink( index, e ) {
        window.collapseTable( index );
        e.preventDefault();
    }
 
    for ( i = 0; i < Tables.length; i++ ) {
        if ( $( Tables[i] ).hasClass( 'collapsible' ) ) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
            if ( !HeaderRow ) continue;
            var Header = HeaderRow.getElementsByTagName( 'th' )[0];
            if ( !Header ) continue;
 
            NavigationBoxes[ tableIndex ] = Tables[i];
            Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
            var Button     = document.createElement( 'span' );
            var ButtonLink = document.createElement( 'a' );
            var ButtonText = document.createTextNode( collapseCaption );
 
            Button.className = 'collapseButton';  /* Styles are declared in Common.css */
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
            ButtonLink.setAttribute( 'href', '#' );
            $( ButtonLink ).on( 'click', $.proxy( handleButtonLink, ButtonLink, tableIndex ) );
            ButtonLink.appendChild( ButtonText );
 
            Button.appendChild( document.createTextNode( '[' ) );
            Button.appendChild( ButtonLink );
            Button.appendChild( document.createTextNode( ']' ) );
 
            Header.insertBefore( Button, Header.firstChild );
            tableIndex++;
        }
    }
 
    for ( i = 0;  i < tableIndex; i++ ) {
        if ( $( NavigationBoxes[i] ).hasClass( 'collapsed' ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i] ).hasClass( 'autocollapse' ) ) ) {
            window.collapseTable( i );
        } 
        else if ( $( NavigationBoxes[i] ).hasClass ( 'innercollapse' ) ) {
            var element = NavigationBoxes[i];
            while ((element = element.parentNode)) {
                if ( $( element ).hasClass( 'outercollapse' ) ) {
                    window.collapseTable ( i );
                    break;
                }
            }
        }
    }
}
 
$( createCollapseButtons );
 
/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
$( createNavigationBarToggleButton );
 
/*
$( function() {
    sups = document.getElementsByTagName("sup");
    for (i=0; i<sups.length; i++) {
        note_id = sups[i].childNodes[0].href;
        if (note_id && (note_id.indexOf("#") != -1)) {
            note_id = document.getElementById(note_id.substr(note_id.ind exOf("#")+1));
            if (note_id) {
                if (document.all)
                {
                    sups[i].title = note_id.innerText;
                    sups[i].childNodes[0].title = note_id.innerText;
                }
                else
                {
                    sups[i].title = note_id.textContent;
                }
            }
        }
    }
});
*/
 
/* End of mw.loader.using callback */
} );
/* DO NOT ADD CODE BELOW THIS LINE */