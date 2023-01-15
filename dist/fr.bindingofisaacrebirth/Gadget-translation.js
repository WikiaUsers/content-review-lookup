$.when(
	mw.loader.using( [ 'mediawiki.api', 'mediawiki.ForeignApi' ] ),
	$.ready
).then( function () {
	/**
	 * The translated revision ID of the target page.
	 * @type {string}
	 */
	var translatedRevision;
	/**
	 * The latest revision ID of the target page.
	 * @type {string}
	 */
	var lastRevision;
	/**
	 * The source page data.
	 * @type {{ pageid: string, title: string }}
	 */
	var sourcePage;
	/**
	 * The root URL of the source wiki.
	 */
	var sourceWikiRoot = 'https://bindingofisaacrebirth.fandom.com';
	/**
	 * The API to the target wiki.
	 */
	var targetApi = new mw.Api();
	/**
	 * The target page ID.
	 */
	var articleId = mw.config.get( 'wgArticleId' );

	return targetApi.get( {
		action: 'cargoquery',
		tables: 'maintenance',
		fields: 'revision',
		where: '_pageID=' + articleId,
		limit: 1
	} ).then( onCargoQueryFetch ).done( onDone );

	/**
	 * @param {{ cargoquery: { title: { revision: string } }[] }} data 
	 */
	function onCargoQueryFetch( data ) {
		var cargoquery = data.cargoquery;

		if ( !cargoquery.length ) {
			return;
		}

		translatedRevision = cargoquery[ 0 ].title.revision;
		return $.getJSON( sourceWikiRoot + '/api.php', {
			format: 'json',
			action: 'query',
			prop: 'revisions',
			revids: translatedRevision
		} ).then( onSourcePageFetch );
	}

	/**
	 * @param {{ query: { pages: { pageid: string, title: string }[] } }} data 
	 */
	function onSourcePageFetch( data ) {
		var pages = data.query.pages;

		for ( var i in pages ) {
			sourcePage = pages[ i ];
			break;
		}
		if ( !sourcePage ) {
			return;
		}

		return $.getJSON( sourceWikiRoot + '/api.php', {
			format: 'json',
			action: 'query',
			prop: 'revisions',
			pageids: sourcePage.pageid
		} ).then( onNewSourceRevisionsFetch );
	}

	/**
	 * @param {{ query: { pages: { revisions: { revid: string }[] }[] } }} data 
	 */
	function onNewSourceRevisionsFetch( data ) {
		var pages = data.query.pages;

		for ( var i in pages ) {
			lastRevision = pages[ i ].revisions[ 0 ].revid;
			break;
		}
	}

	function onDone() {
		if ( $( 'body.action-view' ).length ) {
			insertIcon();
		} else if ( $( 'body.action-edit' ).length ) {
			insertNotice();
		}
	}

	function insertIcon() {
		var $link;

		if ( !translatedRevision ) {
			return;
		} else if ( lastRevision == translatedRevision ) {
			$link = $blankLink()
				.attr( {
					href: sourceWikiRoot + '/index.php?curid=' + sourcePage.pageid,
					title: 'Traduction à jour'
				} )
				.html( '<div class="translation-icon translation-icon-uptodate"></div>' );
		} else {
			$link = $blankLink()
				.attr( {
					href: sourceWikiRoot + '/index.php?type=revision&diff=' + lastRevision +
						'&oldid=' + translatedRevision
				} )
				.html( '<div class="translation-icon translation-icon-toupdate"></div>' );
		}

		$link.appendTo( '#firstHeading' );
	}

	function insertNotice() {
		var $editnotice = $( '<div>' ).attr( {
			    id: 'translation-editnotice'
		    } ),
		    $link;

		if ( !translatedRevision ) {
			var pageTitleInput = new OO.ui.TextInputWidget( {
				id: 'translation-editnotice-search',
				placeholder: 'Page du wiki anglais',
				value: formatPageName( mw.config.get( 'wgPageName' ) )
			} );

			pageTitleInput.on( 'enter', translationSearch );
			$editnotice
				.addClass( 'translation-editnotice-unlinked' )
				.append(
					'Cette page n’est pas une traduction.<br>Pour la relier à une page anglaise, ' +
					'ajouter <code>{<nowiki/>{révision | <ID révision> }}</code> en bas de la ' +
					'page.<br><br>Entrer le nom d’une page du wiki anglais pour obtenir le texte ' +
					'correspondant à la dernière révision.'
				)
				.append( pageTitleInput.$element )
				.append(
					'<code>{{révision | <span id="translation-editnotice-revision"></span> }}</code>'
				);

			translationSearch();
		} else if ( lastRevision == translatedRevision ) {
			$link = $blankLink()
				.attr( 'href', sourceWikiRoot + '/index.php?curid=' + sourcePage.pageid )
				.html( sourcePage.title );
			$editnotice
				.addClass( 'translation-editnotice-uptodate' )
				.append(
					'<b>Cette page est à jour.</b><br>Elle est une traduction de la révision ' +
					'<code>' + lastRevision + '</code> de la page '
				)
				.append( $link )
				.append( '.' );
		} else {
			$link = $blankLink()
				.attr(
					'href',
					sourceWikiRoot + '/index.php?type=revision&diff=' + lastRevision +
						'&oldid=' + translatedRevision
				)
				.html( 'la mettant à jour' );
			$editnotice
				.addClass( 'translation-editnotice-toupdate' )
				.append( '<b>Cette page n’est pas à jour.</b><br>Vous pouvez aider en ' )
				.append( $link )
				.append(
					', puis en remplaçant <code>{{révision | ' + translatedRevision + ' }}' +
					'</code> par <code>{{révision | ' + lastRevision + ' }}</code> en bas ' +
					'de la page.'
				);
		}

		mw.hook( 've.activationComplete' ).add( function () {
			// .ve-fd-header may still not exist?
			(function insertNotice() {
				var $header = $( '.ve-fd-header' );
				if ( $header.length ) {
					$header.after( $editnotice );
				} else {
					setTimeout(1000, insertNotice);
				}
			})();
		} );
	}

	/**
	 * Formats a page name from the source wiki.
	 * @param {string} pageName The page name to format.
	 * @returns The formatted page name.
	 */
	function formatPageName( pageName ) {
		return pageName
			.replace( /_/g, ' ' )
			.replace( 'Aide:', 'Help:' )
			.replace( 'Catégorie:', 'Category:' )
			.replace( 'Modèle:', 'Template:' );
	}

	/**
	 * Updates the displayed revision ID according to the translation search input field value.
	 */
	function translationSearch() {
		var $searchInput = $( '#translation-editnotice-search input' ).first();

		$.getJSON( sourceWikiRoot + '/api.php', {
			format: 'json',
			action: 'query',
			prop: 'revisions',
			titles: $searchInput.val()
		} ).done( onTranslationSearchFetch );
	}

	/**
	 * @param {{ query: { pages: { [ key: string ]: { revisions: { revid: string }[] } } } }} data 
	 */
	function onTranslationSearchFetch( data ) {
		if ( !data.query ) {
			return;
		}

		var page  = '-1',
			pages = data.query.pages;
		for ( page in pages ) {
			break;
		}

		var $resultText = $( '#translation-editnotice-revision' );

		$resultText.empty();
		if ( page === '-1' ) {
			return;
		}

		var $searchInput = $( '#translation-editnotice-search input' ).first(),
			$revision    = $blankLink()
			.attr(
				'href',
				sourceWikiRoot + '/index.php?title=' + $searchInput.val() + '&action=edit'
			)
			.html( pages[ page ].revisions[ 0 ].revid );
		$resultText.append( $revision );
	}

	/**
	 * Creates a link to a new tab or window.
	 * @returns a JQuery object representing the link.
	 */
	function $blankLink() {
		return $( '<a>' ).attr( {
			target: '_blank',
			rel: 'noopener noreferrer'
		} );
	}
} );