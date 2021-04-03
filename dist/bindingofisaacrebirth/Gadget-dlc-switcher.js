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
	 * 
	 */
	textBreakers: [ ',', '.', 'and', 'or' ],
	/**
	 * The HTML block elements that should be skipped when an adjacent element
	 * is removed.
	 */
	ghostBlockElements: '#incontent_player',
	/**
	 * The HTML block elements that should also be removed when an adjacent
	 * element is removed.
	 */
	ornamentBlockElements: '.dlc-switcher-skip',
	/**
	 * The HTML inline elements that should also be removed when an adjacent
	 * element is removed.
	 */
	ornamentInlineElements: '.plat',
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
			if ( !$this.children( '.mw-headline' ).text().match( 'Synergies|Interactions' ) ) {
				return;
			}
			$this
				.nextUntil( dlcSwitcher.higherHeaders[ $this.prop( 'nodeName' ) ] )
				.filter( 'ul' )
				.children( 'li' )
				.addClass( 'dlc-switcher-item-list' );
		}
	},
	/**
	 * 
	 * @type {{ [ k: string ]: (this: HTMLElement) => void }}
	 */
	postProcessors: {
		'.nav-category:not( .nav-list-vertical )': /** @this HTMLElement */ function () {
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
	 * 
	 */
	init: function () {
		console.log( 'DLC Switcher v0.10' );

		if ( !$( 'body.mediawiki' ).hasClass( 'ns-0' ) && !$( 'body.mediawiki' ).hasClass( 'page-User_Derugon_Sandbox_DLC_switcher' ) ) {
			return;
		}

		dlcSwitcher.$contentText = $( '#mw-content-text' );
		dlcSwitcher.$parserOutput = dlcSwitcher.$contentText
			.find( '.mw-parser-output' );
		dlcSwitcher.$items = $(
			'<li class="dlc-switcher-item" id="dlc-switcher-item-0" title="Hide content unavailable with Rebirth"></li>' +
			'<li class="dlc-switcher-item" id="dlc-switcher-item-1" title="Hide content unavailable with Afterbirth"></li>' +
			'<li class="dlc-switcher-item" id="dlc-switcher-item-2" title="Hide content unavailable with Afterbirth+"></li>' +
			'<li class="dlc-switcher-item" id="dlc-switcher-item-3" title="Hide content unavailable with Repentance"></li>'
		);

		var $contextBox = dlcSwitcher.$parserOutput.find( '.context-box' ).first();

		dlcSwitcher.pageFilter = Math.pow( 2, dlcSwitcher.$items.length ) - 1;
		if ( $contextBox.length && !$contextBox.prevAll( ':header' ).length ) {
			dlcSwitcher.pageFilter = dlcUtil.getDlcFilter(
				$contextBox.children( 'img.dlc' ).get( 0 )
			);
		}

		dlcSwitcher.$items.each( dlcSwitcher.initItem );

		var $ul = $( '<ul id="dlc-switcher">' ).append( dlcSwitcher.$items );
		if ( $( 'body.rootpage-Binding_of_Isaac_Rebirth_Wiki' ).length ) {
			$( '#mf-welcome' )
				.append( '<p>Use one of the following filters to hide the wiki content unrelated to your game version:</p><br>' )
				.after( $ul.addClass( 'dlc-switcher-block' ) );
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
			.addClass( 'dlc-switcher-item-active' )
			.children()
			.attr( 'href', dlcSwitcher.url.href );

		// Modifies the page content to remove any information not from the
		// selected version.
		dlcUtil.update( dlcSwitcher.$parserOutput );

		// Adds a corresponding "dlcfilter" URL parameter to links where none
		// is used.
		// TODO: Prevent replacement of external links.
		// TODO: Also edit internal interface links.
		dlcSwitcher.$parserOutput
			.find( ':not( .mw-editsection, .dlc-switcher-item ) > a[ href ]' )
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
				.addClass( 'dlc-switcher-item-deactivated' )
				.removeAttr( 'title' );
			return;
		}
		dlcSwitcher.url.searchParams.set( 'dlcfilter', index.toString() );
		$this.append( '<a href="' + dlcSwitcher.url.href + '"></a>' );
	},

	/**
	 * Removes a DLC image and its related content if the DLC filter does not
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

		if ( $parent.hasClass( 'context-box' ) ) {
			var $header = $parent.prevAll( ':header' ).first();

			if ( $header.length ) {
				// Removes a section:
				//   …<h2>……</h2>……<@ class="context-box">{{dlc}}</@>……<h2>…
				//    |-----------------------------------------------|
				dlcSwitcher.recRemoveElement( $header );
				return;
			}

			// Removes a DLC context box:
			//   …<@ class="context-box">{{dlc}}</@>…
			//    |--------------------------------|
			dlcSwitcher.recRemoveElement( $parent );
			return;
		}

		if ( dlcSwitcher.getNextText( $this ) === '' ) {
			var $next = $this.next();
			while ( $next.is( dlcSwitcher.ornamentInlineElements ) ) {
				$next = $next.next();
			}

			if ( !$next.length ) {
				// Removes a container:
				//   …<@>……{{dlc}}</@>…
				//    |--------------|
				dlcSwitcher.recRemoveElement( $parent );
				return;
			}

			if ( $next.is( 'br' ) ) {
				// Removes a line:
				//   …<br>……{{dlc}}<br>…
				//    |-----------|
				dlcSwitcher.removePrevNodeUntil( $next.get( 0 ), 'BR' );
				return;
			}
		}

		if ( $parent.is( 'li' ) ) {
			if ( $parent.hasClass( 'dlc-switcher-item-list' ) ) {
				dlcSwitcher.processItemList( $this );
				return;
			}

			var $ul = $this.nextAll( 'ul' );
			if ( $ul.length && !$this.get( 0 ).previousSibling ) {
				dlcSwitcher.removeNextNodeUntil( $this.get( 0 ), 'UL' );
				dlcSwitcher.postponed.push( [ dlcSwitcher.prependFirstListItem, $ul ] );
				return;
			}
		}

		if ( dlcSwitcher.getPreviousText( $this ) === '' ) {
			var $prev = $this.prev();
			while ( $prev.is( dlcSwitcher.ornamentInlineElements ) ) {
				$prev = $prev.prev();
			}

			if ( !$prev.length ) {
				// Removes a container:
				//   …<@>{{dlc}}……</@>…
				//    |--------------|
				dlcSwitcher.recRemoveElement( $parent );
				return;
			}

			if ( $prev.is( 'br' ) ) {
				// Removes a line:
				//   …<br>{{dlc}}……<br>…
				//    |-----------|
				dlcSwitcher.removeNextNodeUntil( $prev.get( 0 ), 'BR' );
				return;
			}

			// TODO: Use this.removeNextNodeUntil( ..., '#text' )
		}

		mw.log.warn( 'unmatched dlc' );
	},

	/**
	 * 
	 * @param {JQuery} $elem 
	 */
	processItemList: function ( $elem ) {
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
					return;
				}
				prev.textContent = prev.textContent
					.substring( 0, prev.textContent.lastIndexOf( '/' ) )
					.trim();
				elem.remove();
				return;
			}
			next.textContent = next.textContent
				.substr( next.textContent.indexOf( '/' ) + 1 )
				.trim();
			elem.remove();
			return;
		}
		var prev = elem.previousSibling;
		if (
			!prev ||
			prev.nodeType !== Node.TEXT_NODE ||
			next.textContent.trim()
		) {
			// TODO? Is this even possible?
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
	},

	/**
	 * 
	 * @param {JQuery} $ul 
	 */
	prependFirstListItem: function ( $ul ) {
		var $li = $ul.children( ':first-of-type' );
		$ul.before( $li.html() );
		dlcSwitcher.recRemoveElement( $li );
	},

	/**
	 * Recursively removes an element: also removes its containers and previous
	 * headers if they are empty after the element being removed.
	 * @param {JQuery} $elem The element to remove.
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

		if ( $elem.is( 'td' ) ) {
			var $siblings = $parent.children(),
				$tbody    = $parent.parent(),
				$table    = $tbody.parent(),
				index     = $siblings.index( $elem );

			if ( $table.is( '.nav-list-vertical' ) ) {
				// Removes a table column.
				$elem.remove();
				$parent
					.nextAll()
					.children( ':nth-of-type( ' + ( index + 1 ) + ' )' )
					.remove();
				return;
			}

			if ( $table.is( dlcSwitcher.tablesMainColumn[ index ] ) ) {
				if ( $tbody.children().length === 1 ) {
					// Removes a table:
					//   …<table>……<tbody><tr>……<td>……</td>……</tr></tbody>……</table>…
					//    |--------------------------------------------------------|
					dlcSwitcher.recRemoveElement( $table );
					return;
				}

				// Removes a table row:
				//   …<tr>……<td>……</td>……</tr>…
				//    |----------------------|
				$parent.remove();
				return;
			}

			if ( $tbody.parent( dlcSwitcher.listTables ).length ) {
				// Removes a table cell:
				//   …<td>……</td>…
				//    |---------|
				$elem.remove();
				return;
			}

			// Clears a table cell:
			//   …<td>………</td>…
			//        |-|
			$elem.empty();
			return;
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
				dlcSwitcher.higherHeaders[ $temp.prop( 'nodeName' ) ]
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
	 * 
	 * @this {JQuery}
	 * @param {string[]} pair
	 */
	isElementFirst: function ( pair ) {
		return this.is( pair[ 0 ] );
	},

	/**
	 * Checks a set of elements against a selector. If it fails, recursively
	 * checks ALL children elements against the selector, making sure they all
	 * match.
	 * @param {JQuery} $elem 
	 * @param {string} selector 
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
		while ( !$elem.is( ':header' ) ) {
			if ( !$elem.is( dlcSwitcher.ghostBlockElements ) ) {
				return;
			}
			$elem = $elem.next();
		}

		// Stops if the next header has a lower level.
		if (
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
		if ( !dlcSwitcher.$toc.length ) {
			return;
		}
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
		if ( !url.searchParams.has( 'dlcfilter' ) ) {
			url.searchParams.append( 'dlcfilter',
				dlcSwitcher.selectedIndex.toString()
			);
		}
		return url.href;
	}
};

$( dlcSwitcher.init );