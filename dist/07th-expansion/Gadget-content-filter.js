//testing content filter. Edited from https://bindingofisaacrebirth.fandom.com/wiki/MediaWiki:Gadget-content-filter.js
var dlcSwitcher = {
	/**
	 * The article content container, containing the parser output.
	 * @type {JQuery}
	 */
	$contentText: null,
	/**
	 * The parser output.
	 * @type {JQuery}
	 */
	$parserOutput: null,
	/**
	 * The table of contents from the parser output.
	 * @type {JQuery}
	 */
	$toc: null,
	/**
	 * The DLC switcher form items.
	 * @type {JQuery}
	 */
	$items: null,

	/**
	 * The current URL.
	 * Used to set links to the current page with a DLC filter on or off.
	 */
	url: new URL( document.location.href ),

	/**
	 * Gives the list of higher level headers of a specific header.
	 * @type {{ [ k: string ]: string }}
	 */
	higherHeaders: {
		H1: 'h1',
		H2: 'h1, h2',
		H3: 'h1, h2, h3',
		H4: 'h1, h2, h3, h4',
		H5: 'h1, h2, h3, h4, h5',
		H6: 'h1, h2, h3, h4, h5, h6'
	},

	/**
	 * The HTML block elements that should be skipped when an adjacent element
	 * is removed.
	 */
	ghostBlockElements: '#incontent_player',
	/**
	 * The HTML block elements that should also be removed when an adjacent
	 * element is removed.
	 */
	ornamentBlockElements: '.content-filter-skip',
	/**
	 * The HTML inline elements that should also be removed when an adjacent
	 * element is removed.
	 */
	ornamentInlineElements: '.plat, .mw-collapsible-toggle',
	/**
	 * The HTML tables where table cells can be removed when empty instead of
	 * being cleared.
	 */
	listTables: '.nav-header',
	/**
	 * The HTML tables where the first column is not the one deciding if the
	 * entire row should be removed.
	 */
	tablesMainColumn: [
		'*',
		'.bug'
	],
	/**
	 * The HTML elements that remove one of their parents if they need to be
	 * removed.
	 */
	tupleElements: {
		'.gallerytext': '.gallerybox'
	},
	/**
	 * The HTML elements independent from the above section.
	 */
	sectionBreakers: '.nav-start',
	/**
	 * The HTML <a> elements which redirect to articles from the main namespace.
	 */
	//specialArticleTitles: 'Binding_of_Isaac:_Rebirth_Wiki|Special:Random',

	/**
	 * The page global DLC filter.
	 */
	pageFilter: 0,
	/**
	 * The index of the currently selected DLC switcher form item.
	 */
	selectedIndex: -1,

	/**
	 * 
	 * @type {{ [ k: string ]: (this: HTMLElement) => void }}
	 */
	preProcessors: {
		':header': /** @this HTMLElement */ function () {
			var $this = $( this );
			if (
				!$this
					.children( '.mw-headline' )
					.text()
					.match( 'Synergies|Interactions' )
			) {
				return;
			}
			$this
				.nextUntil(
					dlcSwitcher.higherHeaders[ $this.prop( 'nodeName' ) ]
				)
				.filter( 'ul' )
				.children( 'li' )
				.addClass( 'content-filter-item-list' );
		}
	},
	/**
	 * 
	 * @type {{ [ k: string ]: (this: HTMLElement) => void }}
	 */
	postProcessors: {
		'.nav-category:not( .nav-list-vertical )': /** @this HTMLElement */
		function () {
			var $row = $( this ).children().first().next(), $next = $row.next();
			while ( $next.length ) {
				if ( $next.prop( 'nodeName' ) === 'P' ) {
					$row.remove();
				} else {
					$next = $next.next();
				}
				$row  = $next;
				$next = $next.next();
			}
			$row.remove();
		},
		'.nav-list-vertical': /** @this HTMLElement */ function () {
			var $nav    = $( this );
			var $row    = $nav.find( 'tr:last-of-type' );
			var content = '';
			$row.children().each( function () {
				content += this.innerHTML.trim();
				this.remove();
			} );
			if ( !content ) {
				$nav.remove();
				return;
			}
			$row.append( '<td>' + content + '</td>' ).prev().remove();
		}
	},

	/**
	 * @type {[($elem: JQuery) => void, JQuery][]}
	 */
	postponed: [],

	/**
	 * Initializes the gadget on a page.
	 */
	init: function () {
		console.log( 'DLC Switcher v0.12.1' );

		// Only use the gadget on articles (and test user page).
		if (
			!$( 'body.mediawiki' ).hasClass( 'ns-0' ) &&
			!$( 'body.mediawiki' ).hasClass( 'page-User_Derugon_Sandbox_DLC_switcher' )
		) {
			return;
		}

		// Initializes some JQuery elements.
		dlcSwitcher.$contentText = $( '#mw-content-text' );
		dlcSwitcher.$parserOutput = dlcSwitcher.$contentText
			.find( '.mw-parser-output' );
		dlcSwitcher.$items = $(
			'<li class="content-filter-item" id="content-filter-item-0" title="Hide content unavailable with Rebirth"></li>' +
			'<li class="content-filter-item" id="content-filter-item-1" title="Hide content unavailable with Afterbirth"></li>' +
			'<li class="content-filter-item" id="content-filter-item-2" title="Hide content unavailable with Afterbirth+"></li>' +
			'<li class="content-filter-item" id="content-filter-item-3" title="Hide content unavailable with Repentance"></li>'
		);

		// Checks if the entire page is limited to some versions.
		dlcSwitcher.pageFilter = Math.pow( 2, dlcSwitcher.$items.length ) - 1;
		var $contextBox = dlcSwitcher.$parserOutput.find( '.context-box' ).first();
		if ( $contextBox.length && !$contextBox.prevAll( ':header' ).length ) {
			dlcSwitcher.pageFilter = dlcUtil.getDlcFilter(
				$contextBox.children( 'img.dlc' ).get( 0 )
			);
		}

		// Generates the DLC switcher form and puts it on the page.
		dlcSwitcher.$items.each( dlcSwitcher.initItem );
		var $ul = $( '<ul id="content-filter">' ).append( dlcSwitcher.$items );
		if ( $( 'body.rootpage-Binding_of_Isaac_Rebirth_Wiki' ).length ) {
			$( '#mf-welcome' )
				.append(
					'<p>Use one of the following filters to hide the wiki ' +
					'content unrelated to your game version:</p><br>'
				)
				.after( $ul.addClass( 'content-filter-block' ) );
		} else {
			$ul.appendTo( '#firstHeading' );
		}

		// Updates the selected DLC filter from the URL parameters.
		if ( dlcSwitcher.selectedIndex === -1 ) {
			var urlParam = mw.util.getParamValue( 'dlcfilter' );
			if ( !urlParam ) {
				return;
			}
			dlcSwitcher.selectedIndex = parseInt( urlParam, 10 );
			if (
				isNaN( dlcSwitcher.selectedIndex ) ||
				dlcSwitcher.selectedIndex < 0 ||
				dlcSwitcher.selectedIndex >= dlcSwitcher.$items.length
			) {
				return;
			}
		}
		dlcUtil.selectedFilter = Math.pow( 2, dlcSwitcher.selectedIndex );

		// Sets the DLC icon removal function according to the previously
		// retrieved global article DLC.
		dlcUtil.update = function ( $elem ) {
			var processors = Object.entries( dlcSwitcher.preProcessors );
			for ( var i = 0; i < processors.length; ++i ) {
				$elem.find( processors[ i ][ 0 ] ).each( processors[ i ][ 1 ] );
			}
			$elem.find( 'img.dlc' ).each( dlcSwitcher.removeDlcImg );
			while ( dlcSwitcher.postponed.length ) {
				var todo = dlcSwitcher.postponed;
				dlcSwitcher.postponed = [];
				for ( i = 0; i < todo.length; ++i ) {
					todo[ i ][ 0 ]( todo[ i ][ 1 ] );
				}
			}
			processors = Object.entries( dlcSwitcher.postProcessors );
			for ( i = 0; i < processors.length; ++i ) {
				$elem.find( processors[ i ][ 0 ] ).each( processors[ i ][ 1 ] );
			}
		};

		// Updates the selected DLC switcher form item.
		dlcSwitcher.url.searchParams.delete( 'dlcfilter' );
		$( dlcSwitcher.$items.get( dlcSwitcher.selectedIndex ) )
			.addClass( 'content-filter-item-active' )
			.children()
			.attr( 'href', dlcSwitcher.url.href );

		// Modifies the page content to remove any information not from the
		// selected version.
		dlcUtil.update( dlcSwitcher.$parserOutput );

		// Adds a corresponding "dlcfilter" URL parameter to links where none
		// is used.
		$( ":not( .mw-editsection, .content-filter-item ) > a[ href ^= '/wiki/' ]" )
			.prop( 'href', dlcSwitcher.updateHrefDlcFilter );
	},

	/**
	 * Adds a link to a DLC switcher item or deactivates it if it does not match
	 * the page DLC filter.
	 * @this HTMLElement
	 * @param {number} index 
	 */
	initItem: function ( index ) {
		var $this = $( this );
		if ( ( Math.pow( 2, index ) & dlcSwitcher.pageFilter ) === 0 ) {
			$this
				.addClass( 'content-filter-item-deactivated' )
				.removeAttr( 'title' );
			return;
		}
		dlcSwitcher.url.searchParams.set( 'dlcfilter', index.toString() );
		$this.append( '<a href="' + dlcSwitcher.url.href + '"></a>' );
	},

	/**
	 * Removes a DLC icon and its related content if the DLC filter does not
	 * match the image one.
	 * @this {HTMLImageElement}
	 */
	removeDlcImg: function () {
		var $this     = $( this );
		var imgFilter = dlcUtil.getDlcFilter( this );
		var $parent   = $this.parent();

		// Removes DLC icon if filters match.
		if ( ( imgFilter & dlcUtil.selectedFilter ) > 0 ) {
			do {
				$this.remove();
				$this   = $parent;
				$parent = $parent.parent();
			} while ( $this.length && $this.html().trim() === '' && !$this.is( 'td' ) );
			return;
		}

		// Handles context boxes.
		if ( $parent.hasClass( 'context-box' ) ) {
			var $header = $parent.prevAll( ':header' ).first();
			if ( $header.length ) {
				dlcSwitcher.recRemoveElement( $header );
				return;
			}
			dlcSwitcher.recRemoveElement( $parent );
			return;
		}

		// Handles list items.
		if ( $parent.is( 'li' ) ) {
			if ( $parent.hasClass( 'content-filter-item-list' ) && dlcSwitcher.handleItemList( $this ) ) {
				return;
			}
			if ( !$this.get( 0 ).previousSibling ) {
				dlcSwitcher.recRemoveElement( $parent );
				return;
			}
		}

		// Handles generic block/inline cases.
		if ( dlcSwitcher.handleText( $this ) ) {
			return;
		}

		mw.log.warn( 'unmatched dlc' );
	},

	/**
	 * Removes a DLC icon and its related content in an HTML list element using
	 * items as a key.
	 * @param {JQuery} $elem The JQuery DLC icon element.
	 * @returns True if the DLC icon has been handled properly, false otherwise.
	 */
	handleItemList: function ( $elem ) {
		/** @type {ChildNode} */
		var elem = $elem.get( 0 );
		var next = elem.nextSibling;
		var $li  = $elem.parent();
		var $ul  = $elem.nextAll( 'ul' );
		if ( !$ul.length ) {
			while (
				next.nodeType !== Node.TEXT_NODE ||
				!next.textContent.match( '\\s*[:/]' )
			) {
				elem.remove();
				elem = next;
				next = next.nextSibling;
			}
			if ( next.textContent.match( '^[^/]*:' ) ) {
				var prev = elem.previousSibling;
				if ( !prev ) {
					dlcSwitcher.recRemoveElement( $li );
					return true;
				}
				prev.textContent = prev.textContent
					.substring( 0, prev.textContent.lastIndexOf( '/' ) )
					.trim();
				elem.remove();
				return true;
			}
			next.textContent = next.textContent
				.substr( next.textContent.indexOf( '/' ) + 1 )
				.trim();
			elem.remove();
			return true;
		}
		var prev = elem.previousSibling;
		if (
			!prev ||
			prev.nodeType !== Node.TEXT_NODE ||
			prev.textContent.trim()
		) {
			return false; // Is this even possible?
		}
		elem.remove();
		while (
			next.nodeType !== Node.TEXT_NODE ||
			!next.textContent.includes( ':' )
		) {
			next = next.nextSibling;
		}
		next.textContent = next.textContent
			.substr( 0, next.textContent.indexOf( ':' ) + 1 ) + ' ';
		next = next.nextSibling
		while ( next.nodeName !== 'UL' ) {
			elem = next;
			next = next.nextSibling;
			elem.remove();
		}
		dlcSwitcher.postponed.push( [ dlcSwitcher.prependFirstListItem, $ul ] );
		return true;
	},

	/**
	 * Prepends the first item of a list element to the list element itself.
	 * @param {JQuery} $ul The JQuery list element.
	 */
	prependFirstListItem: function ( $ul ) {
		var $li = $ul.children( ':first-of-type' );
		$ul.before( $li.html() );
		dlcSwitcher.recRemoveElement( $li );
	},

	/**
	 * Removes a DLC icon and its related content in an HTML list element using
	 * items as a key.
	 * @param {JQuery} $elem The JQuery DLC icon element.
	 * @returns True if the DLC icon has been handled properly, false otherwise.
	 */
	handleText: function ( $elem ) {
		if ( dlcSwitcher.getNextText( $elem ) === '' ) {
			// TODO: Rework this part, and maybe remove it as it seems to follow
			// some unintuitive rules.
			var $parent = $elem.parent();
			var $next   = $elem.next();
			while ( $next.is( dlcSwitcher.ornamentInlineElements ) ) {
				$next = $next.next();
			}
			if ( !$next.length ) {
				dlcSwitcher.recRemoveElement( $parent );
				return true;
			}
			if ( $next.is( 'br' ) ) {
				dlcSwitcher.removePrevNodeUntil( $next.get( 0 ), 'BR' );
				return true;
			}
		}

		var prevText = dlcSwitcher.getPreviousText( $elem );
		var $parent  = $elem.parent();
		var $prev    = $elem.prev();
		while ( $prev.is( dlcSwitcher.ornamentInlineElements ) ) {
			$elem = $prev;
			$prev = $prev.prev();
		}
		if (
			prevText && !prevText.endsWith( '.' ) ||
			!prevText && $prev.length && !$prev.is( 'br' )
		) {
			return false;
		}
		/** @type {ChildNode} */
		var elem = $elem.get( 0 ),
			next = elem,
			text = '';
		do {
			text = elem.textContent.trimEnd();
			next = elem.nextSibling;
			elem.remove();
			elem = next;
			if ( !elem ) {
				if ( !$prev.length && !prevText ) {
					dlcSwitcher.recRemoveElement( $parent );
				}
				return true;
			}
			if ( elem.nodeName === 'BR' ) {
				elem.remove();
				return true;
			}
			if ( text.endsWith( '.' ) && elem instanceof HTMLElement && elem.classList.contains( 'dlc' ) ) {
				return true;
			}
		} while ( true );
	},

	/**
	 * Recursively removes an element: also removes its containers and previous
	 * headers if they are empty after the element being removed.
	 * @param {JQuery} $elem The JQuery element to remove.
	 */
	recRemoveElement: function ( $elem ) {
		var $parent = $elem.parent(),
			pair    = Object.entries( dlcSwitcher.tupleElements )
				.find( dlcSwitcher.isElementFirst, $parent );
		if ( pair ) {
			dlcSwitcher.recRemoveElement( $parent.parents( pair[ 1 ] ).first() );
			return;
		}

		// Removes the ornament elements around.
		var $temp = $elem.prev();
		while ( dlcSwitcher.recIs( $temp, dlcSwitcher.ornamentBlockElements ) ) {
			$temp.remove();
			$temp = $elem.prev();
		}
		$temp = $elem.next();
		while ( dlcSwitcher.recIs( $temp, dlcSwitcher.ornamentBlockElements ) ) {
			$temp.remove();
			$temp = $elem.next();
		}

		if ( $elem.is( 'th, td' ) ) {
			dlcSwitcher.removeTableCell( $elem );
		}

		if ( $elem.hasClass( 'mw-headline' ) ) {
			// Removes a section title:
			//   …<h2>……</h2>…
			//    |---------|
			dlcSwitcher.recRemoveElement( $parent );
			return;
		}

		if ( $elem.is( ':header' ) ) {
			// Removes a section:
			//   …<h2>……</h2>……<h2>…
			//    |-----------|
			$temp = $elem;
			$elem = $elem.next();
			$elem.nextUntil(
				dlcSwitcher.higherHeaders[ $temp.prop( 'nodeName' ) ] + ', ' +
				dlcSwitcher.sectionBreakers
			).remove();
		}

		var $next = $elem.next();

		$elem.remove();
		dlcSwitcher.checkHeader( $next );
		if ( $parent.length && $parent.html().trim() === '' ) {
			dlcSwitcher.recRemoveElement( $parent );
		}
	},

	/**
	 * Indicates if the element on which this function has been called is
	 * matched by the selector in the first element of a pair.
	 * @this {JQuery}
	 * @param {string[]} pair The pair, the first element being a selector.
	 */
	isElementFirst: function ( pair ) {
		return this.is( pair[ 0 ] );
	},

	/**
	 * Checks a set of elements against a selector. If it fails, recursively
	 * checks ALL children elements against the selector, making sure they all
	 * match.
	 * @param {JQuery} $elem 
	 * @param {string} selector The selector.
	 */
	recIs: function ( $elem, selector ) {
		if ( !$elem.length ) {
			return false;
		}
		if ( $elem.is( selector ) ) {
			return true;
		}
		var $inner = $elem.children();
		while ( $inner.length ) {
			if ( $elem.children( selector ).length === $inner.length ) {
				return true;
			}
			$elem  = $inner;
			$inner = $inner.children();
		}
		return false;
	},

	/**
	 * Handles the remoal of a table cell, from clearing it to removing the
	 * entire table depending to the situation.
	 * @param {JQuery} $cell The JQuery <th/td> element.
	 */
	removeTableCell: function ( $cell ) {
		var $row      = $cell.parent(),
			$siblings = $row.children(),
			$tbody    = $row.parent(),
			$table    = $tbody.parent(),
			index     = $siblings.index( $cell );

		if ( $table.hasClass( 'nav-list-vertical' ) ) {
			$cell.remove();
			$row
				.nextAll()
				.children( ':nth-of-type( ' + ( index + 1 ) + ' )' )
				.remove();
			return;
		}

		if ( $tbody.is( 'thead' ) && $cell.is( 'th' ) ) {
			// TODO: fix with mw-collapsible & sortable
			var hasNext = $cell.next().length;
			$cell.remove();
			$tbody
				.nextAll()
				.children()
				.nextAll()
				.addBack()
				.children( ':nth-of-type( ' + ( index + 1 ) + ' )' )
				.remove();
			if ( !hasNext ) {
				$table
					.removeClass( 'mw-collapsible mw-made-collapsible' )
					.makeCollapsible();
			}
			return;
		}

		if ( $table.is( dlcSwitcher.tablesMainColumn[ index ] ) ) {
			if ( $tbody.children().length === 1 ) {
				dlcSwitcher.recRemoveElement( $table );
				return;
			}
			$row.remove();
		} else if ( $tbody.parent( dlcSwitcher.listTables ).length ) {
			$cell.remove();
		} else {
			$cell.empty();
		}
	},

	/**
	 * Removes the previous header of an element if the section would be empty
	 * after removing the said element. Also updates the table of contents.
	 * @param {JQuery} $elem The JQuery element.
	 */
	checkHeader: function ( $elem ) {
		var $header = $elem.prev();

		// Stops if the previous element is not a header.
		while ( !$header.is( ':header' ) ) {
			if ( !$header.is( dlcSwitcher.ghostBlockElements ) ) {
				return;
			}
			$header = $header.prev();
		};

		// Stops if the next element is not a header.
		while ( !$elem.is( ':header, ' + dlcSwitcher.sectionBreakers ) ) {
			if ( !$elem.is( dlcSwitcher.ghostBlockElements ) ) {
				return;
			}
			$elem = $elem.next();
		}

		// Stops if the next header has a lower level.
		if (
			!$elem.is( ':header' ) &&
			$header.prop( 'nodeName' )
				.localeCompare( $elem.prop( 'nodeName' ) ) === -1
		) {
			return;
		}

		// Removes the table of contents item, then updates the number of the
		// following items.
		if ( !dlcSwitcher.$toc ) {
			dlcSwitcher.$toc = dlcSwitcher.$parserOutput.find( '#toc' );
		}
		if ( dlcSwitcher.$toc.length ) {
			var $tocElement   = dlcSwitcher.$toc.find(
					'[href="#' + $header.find( '.mw-headline' ).prop( 'id' ) + '"]'
				),
				$tocParent    = $tocElement.parent(),
				tocNumber     = $tocElement.children( '.tocnumber' ).text(),
				lastDotPos    = tocNumber.lastIndexOf( '.', 1 ) + 1,
				lastTocNumber = +tocNumber.substring( lastDotPos );
			$tocParent.nextAll().each( function () {
				$( this ).find( '.tocnumber' ).text( function ( _, text ) {
					return text.substring( 0, lastDotPos ) + lastTocNumber +
						text.substring( tocNumber.length );
				} );
				++lastTocNumber;
			} );
			$tocParent.remove();
		}
		$header.remove();
		dlcSwitcher.checkHeader( $elem );
	},

	/**
	 * Removes a HTML node and its previous ones if they do not have the given
	 * name.
	 * @param {ChildNode} elem     The HTML node to remove.
	 * @param {string}    nodeName The node name to find to stop removing HTML
	 *                             nodes.
	 */
	removePrevNodeUntil: function ( elem, nodeName ) {
		var previous = elem;
		do {
			previous = elem.previousSibling;
			elem.remove();
			elem = previous;
		} while ( elem && elem.nodeName !== nodeName );
	},

	/**
	 * Removes a HTML node and its following ones if they do not have the given
	 * name.
	 * @param {ChildNode} elem     The HTML node to remove.
	 * @param {string}    nodeName The node name to find to stop removing HTML
	 *                             nodes.
	 */
	removeNextNodeUntil: function ( elem, nodeName ) {
		var next = elem;
		do {
			next = elem.nextSibling;
			elem.remove();
			elem = next;
		} while ( elem && elem.nodeName !== nodeName );
	},

	/**
	 * Gets the text from the text node after a DOM element.
	 * @param {JQuery} $elem The HTML element.
	 */
	getNextText: function ( $elem ) {
		var rawTextElem = $elem.get( 0 ).nextSibling;
		return rawTextElem instanceof Text && rawTextElem.textContent ?
			rawTextElem.textContent.trim() :
			'';
	},

	/**
	 * Gets the text from the text node before a DOM element.
	 * @param {JQuery} $elem The HTML element.
	 */
	getPreviousText: function ( $elem ) {
		var rawTextElem = $elem.get( 0 ).previousSibling;
		return rawTextElem instanceof Text && rawTextElem.textContent ?
			rawTextElem.textContent.trim() :
			'';
	},

	/**
	 * Updates the "dlcfilter" URL parameter of a link.
	 * @param {number} _ 
	 * @param {string} href The link href value.
	 * @returns The new link href value.
	 */
	updateHrefDlcFilter: function ( _, href ) {
		var url = new URL( href );
		//url.pathname.substr( 6 ).match( '^/wiki/[^:/]+(/.*)$' )
		if (
			url.pathname.match( '^/wiki/(?:[^:/]+(?:/.*)?|' +
				dlcSwitcher.specialArticleTitles + ')$' ) &&
			!url.searchParams.has( 'dlcfilter' )
		) {
			url.searchParams.append( 'dlcfilter',
				dlcSwitcher.selectedIndex.toString()
			);
		}
		return url.href;
	}
};

$( dlcSwitcher.init );