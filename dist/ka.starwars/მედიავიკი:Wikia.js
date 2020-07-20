/* EN title */
(function() {
    var $ent = $('#enTitle'),
        $header = $('.page-header__main');
    if ($ent.exists() && $header.exists() && !mw.config.get('wgIsMainPage')) {
        $header.append($ent.clone().css('display', 'block'));
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
 * Show/hide functions for media timeline
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
 * HotCat module
 */

mw.hook( 'wikipage.collapsibleContent' ).add( mwCollapsibleSetup );

importArticles({
    type: 'script',
    article: 'u:starwars:MediaWiki:HotCat.js',
}, {
    type: 'style',
    article: 'u:starwars:MediaWiki:HotCat.css'
});

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