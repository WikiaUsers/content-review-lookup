/**
 *  [Импорты]
 *
 *  Всё здесь: MediaWiki:ImportJS
 */

/**
 *  [Содержание]
 *
 *  1. Навигационная таблица
 *  2. Очистка кэша
 *  3. Исправление для счётчика страниц сверху
 */

/* 1. НАВИГАЦИОННАЯ ТАБЛИЦА ----------------------- */

	/**
	 * Collapsible tables; reimplemented with mw-collapsible
	 * Styling is also in place to avoid FOUC
	 *
	 * Allows tables to be collapsed, showing only the header. See [[Help:Collapsing]].
	 * @version 3.0.0 (2018-05-20)
	 * @source https://www.mediawiki.org/wiki/MediaWiki:Gadget-collapsibleTables.js
	 * @deprecated Since MediaWiki 1.20: Use class="mw-collapsible" instead which
	 * is supported in MediaWiki core. Shimmable since MediaWiki 1.32
	 *
	 * @param {jQuery} $content
	 */
	function makeCollapsibleMwCollapsible( $content ) {
		var $tables = $content
			.find( 'table.collapsible:not(.mw-collapsible)' )
			.addClass( 'mw-collapsible' );

		$.each( $tables, function ( index, table ) {
			// mw.log.warn( 'This page is using the deprecated class collapsible. Please replace it with mw-collapsible.');
			if ( $( table ).hasClass( 'collapsed' ) ) {
				$( table ).addClass( 'mw-collapsed' );
				// mw.log.warn( 'This page is using the deprecated class collapsed. Please replace it with mw-collapsed.');
			}
		} );
		if ( $tables.length > 0 ) {
			mw.loader.using( 'jquery.makeCollapsible' ).then( function () {
				$tables.makeCollapsible();
			} );
		}
	}
	mw.hook( 'wikipage.content' ).add( makeCollapsibleMwCollapsible );

	/**
	 * Add support to mw-collapsible for autocollapse, innercollapse and outercollapse
	 */
	function mwCollapsibleSetup( $collapsibleContent ) {
		var $element,
			$toggle,
			autoCollapseThreshold = 2;
		$.each( $collapsibleContent, function ( index, element ) {
			$element = $( element );
			if ( $element.hasClass( 'collapsible' ) ) {
				$element.find( 'tr:first > th:first' ).prepend( $element.find( 'tr:first > * > .mw-collapsible-toggle' ) );
			}
			if ( $collapsibleContent.length >= autoCollapseThreshold && $element.hasClass( 'autocollapse' ) ) {
				$element.data( 'mw-collapsible' ).collapse();
			} else if ( $element.hasClass( 'innercollapse' ) ) {
				if ( $element.parents( '.outercollapse' ).length > 0 ) {
					$element.data( 'mw-collapsible' ).collapse();
				}
			}
			// because of colored backgrounds, style the link in the text color
			// to ensure accessible contrast
			$toggle = $element.find( '.mw-collapsible-toggle' );
			if ( $toggle.length ) {
				// Make the toggle inherit text color
				if ( $toggle.parent()[ 0 ].style.color ) {
					$toggle.find( 'a' ).css( 'color', 'inherit' );
				}
			}
		} );
	}

	mw.hook( 'wikipage.collapsibleContent' ).add( mwCollapsibleSetup );

	/**
	 * Dynamic Navigation Bars (experimental)
	 *
	 * Description: See [[Wikipedia:NavFrame]].
	 */

	var collapseCaption = 'скрыть';
	var expandCaption = 'показать';

	// Set up the words in your language
	var navigationBarHide = '[' + collapseCaption + ']';
	var navigationBarShow = '[' + expandCaption + ']';

	/**
	 * Shows and hides content and picture (if available) of navigation bars.
	 *
	 * @param {number} indexNavigationBar The index of navigation bar to be toggled
	 * @param {jQuery.Event} event Event object
	 * @return {boolean}
	 */
	function toggleNavigationBar( indexNavigationBar, event ) {
		var navToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
		var navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
		var navChild;

		if ( !navFrame || !navToggle ) {
			return false;
		}

		// If shown now
		if ( navToggle.firstChild.data === navigationBarHide ) {
			for ( navChild = navFrame.firstChild; navChild !== null; navChild = navChild.nextSibling ) {
				if ( $( navChild ).hasClass( 'NavContent' ) ) {
					navChild.style.display = 'none';
				}
			}
			navToggle.firstChild.data = navigationBarShow;

		// If hidden now
		} else if ( navToggle.firstChild.data === navigationBarShow ) {
			for ( navChild = navFrame.firstChild; navChild !== null; navChild = navChild.nextSibling ) {
				if ( $( navChild ).hasClass( 'NavContent' ) ) {
					navChild.style.display = 'block';
				}
			}
			navToggle.firstChild.data = navigationBarHide;
		}

		event.preventDefault();
	}

	/**
	 * Adds show/hide-button to navigation bars.
	 *
	 * @param {jQuery} $content
	 */
	function createNavigationBarToggleButton( $content ) {
		var j, navChild, navToggle, navToggleText, isCollapsed,
			indexNavigationBar = 0;
		// Iterate over all < div >-elements
		var $divs = $content.find( 'div.NavFrame:not(.mw-collapsible)' );
		$divs.each( function ( i, navFrame ) {
			indexNavigationBar++;
			navToggle = document.createElement( 'a' );
			navToggle.className = 'NavToggle';
			navToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
			navToggle.setAttribute( 'href', '#' );
			$( navToggle ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );

			isCollapsed = $( navFrame ).hasClass( 'collapsed' );
			/**
			 * Check if any children are already hidden.  This loop is here for backwards compatibility:
			 * the old way of making NavFrames start out collapsed was to manually add style="display:none"
			 * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
			 * the content visible without JavaScript support), the new recommended way is to add the class
			 * "collapsed" to the NavFrame itself, just like with collapsible tables.
			 */
			for ( navChild = navFrame.firstChild; navChild !== null && !isCollapsed; navChild = navChild.nextSibling ) {
				if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
					if ( navChild.style.display === 'none' ) {
						isCollapsed = true;
					}
				}
			}
			if ( isCollapsed ) {
				for ( navChild = navFrame.firstChild; navChild !== null; navChild = navChild.nextSibling ) {
					if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
						navChild.style.display = 'none';
					}
				}
			}
			navToggleText = document.createTextNode( isCollapsed ? navigationBarShow : navigationBarHide );
			navToggle.appendChild( navToggleText );

			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for ( j = 0; j < navFrame.childNodes.length; j++ ) {
				if ( $( navFrame.childNodes[ j ] ).hasClass( 'NavHead' ) ) {
					navToggle.style.color = navFrame.childNodes[ j ].style.color;
					navFrame.childNodes[ j ].appendChild( navToggle );
				}
			}
			navFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
		} );
	}

	mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );

/* 2. ОЧИСТКА КЭША -------------------------------- */
	/**
	 * Чтобы ссылки на очистку кэша не требовали подтверждения (они должны быть помещены в тег с классом
	 * purgelink и именем страницы в атрибуте data-pagename, например как в шаблоне {{очистить кэш}})
	 *//*
	$( '.purgelink a' ).click( function ( e ) {
		mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).done( function () {
			var pageName = $( this ).parent( '.purgelink' ).data( 'pagename' ) || mw.config.get( 'wgPageName' );
			new mw.Api().post( {
				action: 'purge',
				titles: pageName
			} ).then( function () {
				var url = mw.util.getUrl( pageName );
				if ( e.ctrlKey ) {
					if ( !window.open( url ) ) {
						location.assign( url );
					}
				} else {
					location.assign( url );
				}
			}, function () {
				mw.notify( 'Не удалось очистить кэш.', { type: 'error' } );
			} );
			e.preventDefault();
		} );
	} );
}, $( '#footer' ), mw.hook( 'wikipage.content' ).add );*/

/* 3. ИСПРАВЛЕНИЕ ДЛЯ СЧЁТЧИКА СТРАНИЦ СВЕРХУ ----- */

$(function() {
    // plural for mw:community-header-pages @user:fngplg, 2018
    mw.loader.using(['mediawiki.language']).done(function() {
        $('.wds-community-header__counter-label').text(
            mw.language.convertPlural(
                $('.wds-community-header__counter-value').text(),
                ['страница', 'страницы', 'страниц']
            )
        );
    });
});