$.when(
	mw.loader.using( [ 'mediawiki.api', 'mediawiki.ForeignApi' ] ),
	$.ready
).then( function () {
	/** @type {JQuery} */
	var $searchInput;
	/** @type {JQuery} */
	var $resultText;
	/** @type {string} */
	var translatedRevision;
	/** @type {string} */
	var lastRevision;
	/** @type {{ pageid: string, title: string }} */
	var sourcePage;
	var sourceWikiRoot = 'https://bindingofisaacrebirth.fandom.com',
		targetApi      = new mw.Api();

	targetApi.get( {
		action: 'cargoquery',
		tables: 'maintenance',
		fields: 'revision',
		where: '_pageID=' + mw.config.get( 'wgArticleId' ),
		limit: 1
	} ).done( onCargoQueryFetch );

	/**
	 * @param {{ cargoquery: { title: { revision: string } }[] }} data 
	 */
	function onCargoQueryFetch( data ) {
		var cargoquery = data.cargoquery;

		if ( cargoquery.length ) {
			translatedRevision = cargoquery[ 0 ].title.revision;
			$.getJSON( sourceWikiRoot + '/api.php', {
				format: 'json',
				action: 'query',
				prop: 'revisions',
				revids: translatedRevision
			} ).done( onSourcePageFetch );
			return;
		}

		var $editnotice = $( 'body.action-edit #translation-editnotice' );
		if ( !$editnotice.length ) {
			return;
		}

		var sourcePageTitle = mw.config.get( 'wgPageName' )
				.replace( /_/g, ' ' )
				.replace( 'Aide:', 'Help:' )
				.replace( 'Catégorie:', 'Category:' )
				.replace( 'Modèle:', 'Template:' ),
			pageTitleInput = new OO.ui.TextInputWidget( {
				id: 'translation-editnotice-search',
				placeholder: 'Page du wiki anglais',
				value: sourcePageTitle
			} );

		pageTitleInput.on( 'enter', translationSearch );
		$editnotice.append(
			'<br><br>Entrer le nom d’une page du wiki anglais pour obtenir le texte ' +
			'correspondant à la dernière révision.'
		);
		$editnotice.append( pageTitleInput.$element );
		$editnotice.append(
			'<code>{{révision | <span id="translation-editnotice-revision"></span> }}</code>'
		);

		$searchInput = pageTitleInput.$element.children( 'input' ).first();
		$resultText = $editnotice.find( '#translation-editnotice-revision' );

		translationSearch();
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

		$.getJSON( sourceWikiRoot + '/api.php', {
			format: 'json',
			action: 'query',
			prop: 'revisions',
			pageids: sourcePage.pageid
		} ).done( onNewSourceRevisionsFetch );
	}

	/**
	 * @param {{ query: { pages: { revisions: { revid: string }[] }[] } }} data 
	 */
	function onNewSourceRevisionsFetch( data ) {
		var pages = data.query.pages,
			$link = $blankLink();

		for ( var i in pages ) {
			lastRevision = pages[ i ].revisions[ 0 ].revid;
			break;
		}

		if ( $( 'body.action-view' ).length ) {
			if ( lastRevision == translatedRevision ) {
				$link
					.attr( {
						href: sourceWikiRoot + '/index.php?curid=' + sourcePage.pageid,
						title: 'Traduction à jour'
					} )
					.html( '<div class="translation-icon translation-icon-uptodate"></div>' );
			} else {
				$link
					.attr( {
						href: sourceWikiRoot + '/index.php?type=revision&diff=' + lastRevision +
							'&oldid=' + translatedRevision
					} )
					.html( '<div class="translation-icon translation-icon-toupdate"></div>' );
			}

			$link.prependTo( '#firstHeading' );
		} else if ( $( 'body.action-edit' ).length ) {
			var $editnotice = $( '#translation-editnotice' ).empty().append( $link );

			if ( lastRevision == translatedRevision ) {
				$link
					.attr( 'href', sourceWikiRoot + '/index.php?curid=' + sourcePage.pageid )
					.html( sourcePage.title );
				$editnotice
					.css( 'background', 'green' )
					.prepend(
						'<b>Cette page est à jour.</b><br>Elle est une traduction de la révision ' +
						'<code>' + lastRevision + '</code> de la page '
					)
					.append( '.' );
			} else {
				$link
					.attr(
						'href',
						sourceWikiRoot + '/index.php?type=revision&diff=' + lastRevision +
							'&oldid=' + translatedRevision
					)
					.html( 'la mettant à jour' );
				$editnotice
					.css( 'background', 'darkred' )
					.prepend( '<b>Cette page n’est pas à jour.</b><br>Vous pouvez aider en ' )
					.append(
						', puis en remplaçant <code>{{révision | ' + translatedRevision + ' }}' +
						'</code> par <code>{{révision | ' + lastRevision + ' }}</code> en bas ' +
						'de la page.'
					);
			}
		}
	}

	function translationSearch() {
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
		var page  = '-1',
			pages = data.query.pages;
		for ( page in pages ) {
			break;
		}

		$resultText.empty();
		if ( page === '-1' ) {
			return;
		}

		var $revision = $blankLink()
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