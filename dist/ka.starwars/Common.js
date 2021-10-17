// Top icons
$( function eraIconsFandomdesktop() {
    if ( $( '#title-eraicons' ).length ) {
    	if ( mw.config.get( 'skin' ) == 'fandomdesktop' ) {
    		$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
    	} else {
    	    $( '.page-header__contribution > div' ).first().prepend( $( '#title-eraicons' ).show() );
    	}
    }
} );

// Hotcat script for adding interlang links

mw.loader.load('https://starwars.fandom.com/load.php?mode=articles&articles=MediaWiki:HotCat.js&only=scripts');
importStylesheetPage('MediaWiki:HotCat.css', 'starwars');

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End of the {{USERNAME}} replacement */

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};

// ============================================================
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

function showEras(className) {
	if( skin == 'oasis' ) {
		return;
	}

	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv == null || titleDiv == undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite

/* EN title */
(function() {
    var $ent = document.querySelector('#enTitle'),
        $header = document.querySelector('.page-header__title-wrapper');
    if ($ent && $header && !mw.config.get('wgIsMainPage')) {
        $ent.style.display = 'block';
        $header.appendChild($ent);
    }
})();

/**
 * Collapsible tables
 */
function makeCollapsibleMwCollapsible( $content ) {
	var $tables = $content
		.find( 'table.collapsible:not(.mw-collapsible)' )
		.addClass( 'mw-collapsible' );

	$.each( $tables, function( index, table ) {
		if( $( table ).hasClass( 'collapsed') ) {
			$( table ).addClass( 'mw-collapsed' );
		}
	} );
	if( $tables.length > 0 ) {
		mw.loader.using( 'jquery.makeCollapsible' ).then( function() {
			$tables.makeCollapsible();
		} );
	}
}
mw.hook( 'wikipage.content' ).add( makeCollapsibleMwCollapsible );

// Copied from http://avatar.wikia.com/wiki/MediaWiki:Common.js/icons.js
$( function eraIconsOasis() {
    if ( $( '.wds-community-header' ).length ) {
        $( '#PageHeader' ).prepend(
            $( '#title-eraicons' ).attr( 'style', 'position: absolute; right: 0px;' )
        );
    } else {
    	$( '.WikiaPageHeader' ).append( $( '#title-eraicons' ) );
    	$( '#title-eraicons' ).css( { 'position' : 'absolute', 'right' : '0', 'bottom' : '-2em' } ).show();
    }
} );

/**
 * Show/hide for media timeline -- Grunny
 **/
$( function () {
	if( !$( '.timeline-toggles' ).length ) {
		return;
	}
	$( '.timeline-toggles' ).find( 'td > a' ).click( function () {
		var	hideBtnClass = $( this ).parent().attr( 'class' ),
			$hideContent = $( 'tr.' + hideBtnClass );
		if( !$hideContent.length ) {
			return;
		}
		$hideContent.toggle();
		if ( $( this ).text().indexOf( 'hide' ) >= 1 ) {
			$( this ).text( $( this ).text().replace( 'hide', 'show' ) );
		} else {
			$( this ).text( $( this ).text().replace( 'show', 'hide' ) );
		}
	} );
} );

/**
 * mw-collapsible support (for autocollapsing)
 */
function mwCollapsibleSetup( $collapsibleContent ) {
	var $element,
		$toggle,
		autoCollapseThreshold = 2;
	$.each( $collapsibleContent, function (index, element) {
		$element = $( element );
		if ( $element.hasClass( 'collapsible' ) ) {
			$element.find('tr:first > th:first').prepend( $element.find('tr:first > * > .mw-collapsible-toggle'));
		}
		if ( $collapsibleContent.length >= autoCollapseThreshold && $element.hasClass( 'autocollapse' ) ) {
			$element.data( 'mw-collapsible' ).collapse();
		} else if ( $element.hasClass( 'innercollapse' ) ) {
			if ( $element.parents( '.outercollapse' ).length > 0 ) {
				$element.data( 'mw-collapsible' ).collapse();
			}
		}

		$toggle = $element.find( '.mw-collapsible-toggle' );
		if ( $toggle.length ) {
			// Make the toggle inherit text color
			if( $toggle.parent()[0].style.color ) {
				$toggle.find( 'a' ).css( 'color', 'inherit' );
			}
		}
	} );
}

// Hidable buttons

function addHideButtons() {
	var hidables = getElementsByClass('hidable');
 
	for( var i = 0; i < hidables.length; i++ ) {
		var box = hidables[i];
		var button = getElementsByClass('hidable-button', box, 'span');
 
		if( button != null && button.length > 0 ) {
			button = button[0];
 
			button.onclick = toggleHidable;
			button.appendChild( document.createTextNode('[Hide]') );
 
			if( new ClassTester('start-hidden').isMatch(box) )
				button.onclick('bypass');
		}
	}
}
 
function toggleHidable(bypassStorage) {
	var parent = getParentByClass('hidable', this);
	var content = getElementsByClass('hidable-content', parent);
	var nowShown;
 
	if( content != null && content.length > 0 ) {
		content = content[0];
 
		if( content.style.display == 'none' ) {
			content.style.display = content.oldDisplayStyle;
			this.firstChild.nodeValue = '[Hide]';
			nowShown = true;
		} else {
			content.oldDisplayStyle = content.style.display;
			content.style.display = 'none';
			this.firstChild.nodeValue = '[Show]';
			nowShown = false;
		}
 
		if( window.storagePresent && ( typeof( bypassStorage ) == 'undefined' || bypassStorage != 'bypass' ) ) {
			var page = window.pageName.replace(/\W/g, '_');
			var items = getElementsByClass('hidable');
			var item = -1;
 
			for( var i = 0; i < items.length; i++ ) {
				if( items[i] == parent ) {
					item = i;
					break;
				}
			}
 
			if( item == -1 ) {
				return;
			}
 
			localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
		}
	}
}