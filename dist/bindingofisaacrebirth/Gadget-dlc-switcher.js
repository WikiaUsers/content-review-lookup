// <nowiki>
var dlcSwitcher = {
	/**
	 * The article content container, containing the parser output.
	 * @type {HTMLDivElement}
	 */
	contentText: null,
	/**
	 * The parser output.
	 * @type {HTMLDivElement}
	 */
	parserOutput: null,
	/**
	 * The table of contents from the parser output.
	 * @type {JQuery}
	 */
	$toc: null,
	/**
	 * The DLC switcher form items.
	 * @type {HTMLLIElement[]}
	 */
	items: [],

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
	ornamentBlockElements: '.dlc-switcher-skip',
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
	specialArticleTitles: 'Binding_of_Isaac:_Rebirth_Wiki|Special:Random',

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
				.addClass( 'dlc-switcher-item-list' );
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
		console.log( 'DLC Switcher v0.13.2' );

		if (
			!document.body.classList.contains( 'skin-hydradark' ) ||
			!document.body.classList.contains( 'ns-0' ) &&
			!document.body.classList.contains( 'page-User_Derugon_Sandbox_DLC_switcher' )
		) {
			return;
		}

		dlcSwitcher.contentText  = document.getElementById( 'mw-content-text' );
		dlcSwitcher.parserOutput = dlcSwitcher.contentText
			.getElementsByClassName( 'mw-parser-output' )[ 0 ];

		dlcSwitcher.generateDlcSwitcherItems();
		dlcSwitcher.setPageFilter();
		dlcSwitcher.insertDlcSwitcherElement();

		if ( !dlcSwitcher.updateSelectedIndex() ) {
			return;
		}
		dlcUtil.selectedFilter = Math.pow( 2, dlcSwitcher.selectedIndex );

		// Sets the DLC icon removal function according to the previously
		// retrieved global article DLC.
		dlcUtil.update = function ( elem ) {
			var $elem = $( elem );
			var processors = Object.entries( dlcSwitcher.preProcessors );
			for ( var i = 0; i < processors.length; ++i ) {
				$elem.find( processors[ i ][ 0 ] ).each( processors[ i ][ 1 ] );
			}
			var dlcIcons = elem.querySelectorAll( 'img.dlc' );
			for ( i = dlcIcons.length - 1; i >= 0; --i ) {
				dlcSwitcher.removeDlcImg( dlcIcons[ i ] );
			}
			//$elem.find( 'img.dlc' ).each( dlcSwitcher.removeDlcImg ); TODO
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

		dlcSwitcher.updateSelectedDlcSwitcherItem();
		dlcUtil.update( dlcSwitcher.parserOutput );
		dlcSwitcher.updateAnchorsDlcFilter();
	},

	/**
	 * Generates the DLC switcher form items.
	 */
	generateDlcSwitcherItems: function () {
		var item = document.createElement( 'li' );
		item.id = 'dlc-switcher-item-0';
		item.title = 'Hide content unavailable with Rebirth';
		item.classList.add( 'dlc-switcher-item' );
		dlcSwitcher.items.push( item );
		item = document.createElement( 'li' );
		item.id = 'dlc-switcher-item-1';
		item.title = 'Hide content unavailable with Afterbirth';
		item.classList.add( 'dlc-switcher-item' );
		dlcSwitcher.items.push( item );
		item = document.createElement( 'li' );
		item.id = 'dlc-switcher-item-2';
		item.title = 'Hide content unavailable with Afterbirth+';
		item.classList.add( 'dlc-switcher-item' );
		dlcSwitcher.items.push( item );
		item = document.createElement( 'li' );
		item.id = 'dlc-switcher-item-3';
		item.title = 'Hide content unavailable with Repentance';
		item.classList.add( 'dlc-switcher-item' );
		dlcSwitcher.items.push( item );
	},

	/**
	 * Checks if the entire page is limited to some versions then sets the page
	 * global DLC filter accordingly.
	 */
	setPageFilter: function () {
		dlcSwitcher.pageFilter = Math.pow( 2, dlcSwitcher.items.length ) - 1;
		var contextBoxes = dlcSwitcher.parserOutput
			.getElementsByClassName( 'context-box' );
		if (
			!contextBoxes.length ||
			dlcSwitcher.getPreviousHeading( contextBoxes[ 0 ] )
		) {
			return;
		}
		dlcSwitcher.pageFilter = dlcUtil.getDlcFilter(
			contextBoxes[ 0 ].getElementsByClassName( 'dlc' )[ 0 ]
		);
	},

	/**
	 * Gets the last heading element used before an element.
	 * @param {Element} elem The element.
	 * @returns {HTMLHeadingElement} The previous heading element if there is
	 *                               one, null otherwise.
	 */
	getPreviousHeading: function ( elem ) {
		elem = elem.previousElementSibling;
		while (
			elem &&
			!dlcSwitcher.higherHeaders.hasOwnProperty( elem.tagName )
		) {
			elem = elem.previousElementSibling;
		}
		return elem;
	},

	/**
	 * Generates the DLC switcher form and puts it on the page.
	 */
	insertDlcSwitcherElement: function () {
		dlcSwitcher.items.forEach( dlcSwitcher.initItem );
		var ul = document.createElement( 'ul' );
		ul.id = 'dlc-switcher';
		for ( var i in dlcSwitcher.items ) {
			ul.appendChild( dlcSwitcher.items[ i ] );
		}
		var body = document.querySelector( 'body' );
		if ( !body.classList.contains( 'rootpage-Binding_of_Isaac_Rebirth_Wiki' ) ) {
			document.getElementById( 'firstHeading' ).appendChild( ul );
			return;
		}
		ul.classList.add( 'dlc-switcher-block' );

		var pageLanguage = dlcSwitcher.util.getPageLanguage();
		var noticePage = 'mediawiki:gadget-dlc-switcher/mf-welcome/' + pageLanguage;
		if ( !mw.Title.exists( noticePage ) ) {
			noticePage = 'mediawiki:gadget-dlc-switcher/mf-welcome/en';
		}

		dlcSwitcher.util.getPageContent( noticePage, function ( pageContent ) {
			document.getElementById( 'mf-welcome' ).append(
				pageContent,
				document.createElement( 'br' ),
				ul
			);
		} );
	},

	/**
	 * Adds a link to a DLC switcher item or deactivates it if it does not match
	 * the page DLC filter.
	 * @param {HTMLLIElement} item  
	 * @param {number}        index 
	 */
	initItem: function ( item, index ) {
		if ( ( Math.pow( 2, index ) & dlcSwitcher.pageFilter ) === 0 ) {
			item.classList.add( 'dlc-switcher-item-deactivated' );
			item.removeAttribute( 'title' );
			return;
		}
		dlcSwitcher.url.searchParams.set( 'dlcfilter', index.toString() );
		var a = document.createElement( 'a' );
		a.href = dlcSwitcher.url.href;
		item.appendChild( a );
	},

	/**
	 * Updates the index of the currently selected DLC switcher form item from
	 * the URL parameters.
	 * @returns True if a valid DLC filter should be applied, false otherwise.
	 */
	updateSelectedIndex: function () {
		if ( dlcSwitcher.selectedIndex !== -1 ) {
			return true;
		}
		var urlParam = mw.util.getParamValue( 'dlcfilter' );
		if ( !urlParam ) {
			return false;
		}
		dlcSwitcher.selectedIndex = parseInt( urlParam, 10 );
		if (
			dlcSwitcher.util.isIndex(
				dlcSwitcher.selectedIndex,
				dlcSwitcher.items
			)
		) {
			return true;
		}
		dlcSwitcher.selectedIndex = -1;
		return false;
	},

	/**
	 * Removes a DLC icon and its related content if the DLC filter does not
	 * match the image one.
	 * @param {HTMLImageElement} icon The DLC icon.
	 */
	removeDlcImg: function ( icon ) {
		if ( ( dlcUtil.getDlcFilter( icon ) & dlcUtil.selectedFilter ) > 0 ) {
			dlcSwitcher.removeElement( icon );
		} else if (
			!dlcSwitcher.handleContextBox( icon ) &&
			!dlcSwitcher.handleItemList( icon ) &&
			!dlcSwitcher.handleList( icon ) &&
			!dlcSwitcher.handleText( $( icon ) )
		) {
			mw.log.warn( 'unmatched dlc' );
		}
	},

	/**
	 * Removes an element and its empty parents.
	 * @param {HTMLElement} elem The element to remove.
	 */
	removeElement: function ( elem ) {
		var parent = elem.parentElement;
		while (
			parent &&
			parent !== dlcSwitcher.parserOutput &&
			!dlcSwitcher.hasSibling( elem ) &&
			parent.tagName !== 'TD'
		) {
			elem   = parent;
			parent = parent.parentElement;
		}
		elem.remove();
	},

	/**
	 * Indicates whether an element has a sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {HTMLElement} elem The element.
	 * @returns True if the element has no sibling other than a comment or an
	 *          "invisible" string.
	 */
	hasSibling: function ( elem ) {
		return dlcSwitcher.hasPreviousSibling( elem ) ||
		       dlcSwitcher.hasNextSibling( elem );
	},

	/**
	 * Indicates whether an element has a previous sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {HTMLElement} elem The element.
	 * @returns True if the element has a previous sibling other than a comment
	 *          or an "invisible" string.
	 */
	hasPreviousSibling: function ( elem ) {
		var sibling = elem.previousSibling;
		if ( !sibling ) {
			return false;
		}
		while (
			sibling.nodeType === Node.COMMENT_NODE ||
			sibling.nodeType === Node.TEXT_NODE &&
			sibling.textContent.trim() === ''
		) {
			sibling = sibling.previousSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Indicates whether an element has a next sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {HTMLElement} elem The element.
	 * @returns True if the element has a next sibling other than a comment or
	 *          an "invisible" string.
	 */
	hasNextSibling: function ( elem ) {
		var sibling = elem.nextSibling;
		if ( !sibling ) {
			return false;
		}
		while (
			sibling.nodeType === Node.COMMENT_NODE ||
			sibling.nodeType === Node.TEXT_NODE &&
			sibling.textContent.trim() === ''
		) {
			sibling = sibling.nextSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	/**
	 * Removes a DLC context box and its related content in a DLC context box.
	 * @param {HTMLElement} dlcIcon The DLC icon.
	 * @returns True if the DLC icon has been handled properly, false otherwise.
	 */
	handleContextBox: function ( dlcIcon ) {
		var contextBox = dlcIcon.parentElement;
		if ( !contextBox.classList.contains( 'context-box' ) ) {
			return false;
		}
		var header = dlcSwitcher.getPreviousHeading( contextBox );
		dlcSwitcher.recRemoveElement( $( header || contextBox ) );
		return true;
	},

	/**
	 * Removes a DLC icon and its related content in a list using items as a key.
	 * @param {HTMLElement} dlcIcon The DLC icon.
	 * @returns True if the DLC icon has been handled properly, false otherwise.
	 */
	handleItemList: function ( dlcIcon ) {
		var li = dlcIcon.parentElement;
		if (
			li.tagName !== 'LI' ||
			!li.classList.contains( 'dlc-switcher-item-list' )
		) {
			return false;
		}
		/** @type {ChildNode} */
		var elem = dlcIcon;
		var next = elem.nextSibling;
		var $ul  = $( dlcIcon ).nextAll( 'ul' );
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
					dlcSwitcher.recRemoveElement( $( li ) );
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
			return false; // Is this even possible? (TODO: yep, using "+")
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
	 * Removes a DLC icon and its related content in a list.
	 * @param {HTMLElement} dlcIcon The DLC icon.
	 * @returns True if the DLC icon has been handled properly, false otherwise.
	 */
	handleList: function ( dlcIcon ) {
		var li = dlcIcon.parentElement;
		if (
			li.tagName !== 'LI' ||
			dlcSwitcher.hasPreviousSibling( dlcIcon )
		) {
			return false;
		}
		dlcSwitcher.recRemoveElement( $( li ) );
		return true;
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
			dlcSwitcher.$toc = $( dlcSwitcher.parserOutput ).find( '#toc' );
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
	 * Updates the selected DLC switcher form item.
	 */
	updateSelectedDlcSwitcherItem: function () {
		dlcSwitcher.url.searchParams.delete( 'dlcfilter' );
		var item = dlcSwitcher.items[ dlcSwitcher.selectedIndex ];
		item.classList.add( 'dlc-switcher-item-active' );
		item.firstElementChild.setAttribute( 'href', dlcSwitcher.url.href );
	},

	/**
	 * Adds a corresponding "dlcfilter" URL parameter to anchors where none is
	 * used.
	 */
	updateAnchorsDlcFilter: function () {
		var anchors = document.getElementsByTagName( 'a' );
		for ( var i in anchors ) {
			var anchor = anchors[ i ];
			if ( !anchor.href ) {
				continue;
			}
			var parentClassList = anchor.parentElement.classList;
			if (
				parentClassList.contains( 'mw-editsection' ) ||
				parentClassList.contains( 'dlc-switcher-item' )
			) {
				continue;
			}
			var url = new URL( anchor.href );
			if (
				!url.pathname.match(
					'^/wiki/(?:[^:/]+(?:/.*)?|' +
					dlcSwitcher.specialArticleTitles + ')$'
				) ||
				url.searchParams.has( 'dlcfilter' )
			) {
				continue;
			}
			url.searchParams.append( 'dlcfilter',
				dlcSwitcher.selectedIndex.toString()
			);
			anchor.href = url.href;
		}
	},

	util: {
		/**
		 * The language codes used on the wiki.
		 */
		languageCodes: [ 'en', 'es', 'it', 'ja', 'ru', 'zh' ],

		/**
		 * Gets the language used on the page.
		 * @returns The language code used on the page.
		 */
		getPageLanguage: function () {
			var pageName = mw.config.get( 'wgPageName' );
			var lastPartIndex = pageName.lastIndexOf( '/' );
			if ( lastPartIndex === -1 ) {
				return 'en';
			}
			var lastPart = pageName.substr( lastPartIndex + 1 );
			if ( !dlcSwitcher.util.languageCodes.includes( lastPart ) ) {
				return 'en';
			}
			return lastPart;
		},

		/**
		 * Gets the HTML content of a page.
		 * @param {string}              pageName The name of the page.
		 * @param {(e:ChildNode)=>void} callback The function to call when the
		 *                                       page content has been retrieved.
		 */
		getPageContent: function ( pageName, callback ) {
			new mw.Api()
				.parse( '{{' + pageName + '}}' )
				.then( function ( parserOutput ) {
					var template = document.createElement( 'template' );
					template.innerHTML = parserOutput;
					return template.content.firstChild.firstChild;
				} )
				.then( callback );
		},

		/**
		 * Indicates if a number is a valid index of an array.
		 * @param {number} number The number.
		 * @param {any[]}  array  The array.
		 * @returns True if "array[ number ]" exists, false otherwise.
		 */
		isIndex: function ( number, array ) {
			return !isNaN( number ) && number >= 0 && number < array.length;
		}
	}
};

$( dlcSwitcher.init );
// </nowiki>