/**
 * Name:        Content Filter script
 * Author:      Derugon
 * Description: Removes information from pages according to a filter, which can
 *              be enabled/disabled from the toolbar. See the gitlab page for
 *              more information.
 * Repository:  https://gitlab.com/Derugon/mediawiki-gadget-dlc-filter
 */

( function () {

/** @type {contentFilterConfig} */
var config = null;

/** @type {contentFilterUtil} */
var util = {
	loaded: false,
	selectedFilter: 0,
	getFilterMax: function () { return -1 },
	getFilter: function () { return -1 },
	applyFilter: function () {}
};
/** @type {contentFilter} */
var contentFilter = {
	version: '1.2',

	parserOutput: null,
	toc: null,
	items: [],

	api: null,
	uri: null,

	pageFilter: 0,
	selectedIndex: -1,
	selectedFilter: 0,

	postponed: [],

	init: function () {
		console.log( 'Content Filter v' + contentFilter.version );

		if ( !window.contentFilterUtil ) {
			util.getFilterMax = contentFilter.getFilterMax;
			util.getFilter    = contentFilter.getFilter;
			window.contentFilterUtil = util;
		} else if ( !window.contentFilterUtil.loaded ) {
			mw.log.error(
				'Content Filter: Another instance of the script is already ' +
				'running. Please wait for it to finish before running it again.'
			);
			return;
		}

		if ( !window.contentFilterConfig ) {
			mw.log.error(
				'Content Filter: The configuration object is undefined. ' +
				'Please define a contentFilterConfig object this script ' +
				'would have access to.'
			);
			return;
		}
		config = window.contentFilterConfig;

		if ( !contentFilter.isFilteringAvailable() ) {
			util.loaded = true;
			return;
		}

		var contentText = document.getElementById( 'mw-content-text' );
		contentFilter.parserOutput = contentText ?
			contentText.getElementsByClassName( 'mw-parser-output' )[ 0 ] :
			null;
		contentFilter.toc          = document.getElementById( 'toc' );
		contentFilter.api          = new mw.Api();
		contentFilter.uri          = new mw.Uri( document.location.href );
		contentFilter.pageFilter   = contentFilter.getPageFilter();

		contentFilter.generateFilterItems();
		contentFilter.insertFilterElement();

		if ( !contentFilter.updateSelectedIndex() ) {
			util.loaded = true;
			return;
		}

		contentFilter.selectedFilter = Math.pow( 2, contentFilter.selectedIndex );
		util.selectedFilter          = contentFilter.selectedFilter;
		util.applyFilter             = contentFilter.applyFilter;

		contentFilter.updateSelectedFilterItem();
		contentFilter.applyFilter( contentFilter.parserOutput );
		contentFilter.updateAnchorsFilter();

		util.loaded = true;
	},

	isFilteringAvailable: function () {
		if (
			config.filterEnableClass &&
			document.getElementsByClassName( config.filterEnableClass ).length
		) {
			return true;
		}
		var namespace = contentFilter.findClassStartingWith( document.body, 'ns-' );
		return config.filteredNamespaces.includes( +namespace );
	},

	getPageFilter: function () {
		if ( !config.contextFilterClass || !contentFilter.parserOutput ) {
			return contentFilter.getFilterMax();
		}
		var contextBoxes = contentFilter.parserOutput
			.getElementsByClassName( config.contextFilterClass );
		if (
			!contextBoxes.length ||
			contentFilter.getPreviousHeading( contextBoxes[ 0 ] )
		) {
			return contentFilter.getFilterMax();
		}
		if ( config.blockFilterClass ) {
			var blockElement = contextBoxes[ 0 ].getElementsByClassName(
				config.blockFilterClass
			)[ 0 ];
			if ( blockElement ) {
				return contentFilter.getFilter( blockElement );
			}
		}
		if ( config.wrapperFilterClass ) {
			var wrapperElement = contextBoxes[ 0 ].getElementsByClassName(
				config.wrapperFilterClass
			)[ 0 ];
			if ( wrapperElement ) {
				return contentFilter.getFilter( wrapperElement );
			}
		}
		if ( config.inlineFilterClass ) {
			var inlineElement = contextBoxes[ 0 ].getElementsByClassName(
				config.inlineFilterClass
			)[ 0 ];
			if ( inlineElement ) {
				return contentFilter.getFilter( inlineElement );
			}
		}
		return 0;
	},

	getPreviousHeading: function ( element ) {
		element = element.previousElementSibling;
		while ( element && !( element instanceof HTMLHeadingElement ) ) {
			element = element.previousElementSibling;
		}
		return element;
	},

	getFilterMax: function () {
		return Math.pow( 2, config.filters.length ) - 1;
	},

	getFilter: function ( element ) {
		var filterClass = contentFilter.findClassStartingWith(
			element,
			config.filterClassIntro
		);
		return filterClass ? +filterClass : 0;
	},

	findClassStartingWith: function ( element, intro ) {
		var classList = element.classList;
		for ( var i = 0; i < classList.length; ++i ) {
			if ( classList[ i ].startsWith( intro ) ) {
				return classList[ i ].substr( intro.length );
			}
		}
		return null;
	},

	generateFilterItems: function () {
		var itemBase = document.createElement( 'li' );
		itemBase.classList.add( 'content-filter-item' );
		itemBase.appendChild( document.createElement( 'a' ) );
		for (
			var i = 0, pow = 1;
			i < config.filters.length;
			++i, pow *= 2
		) {
			var item = itemBase.cloneNode( true );
			item.id = 'content-filter-item-' + i;
			contentFilter.items.push( item );
			if ( ( pow & contentFilter.pageFilter ) === 0 ) {
				item.classList.add( 'content-filter-item-deactivated' );
				continue;
			}
			item.title = config.filters[ i ];
			/** @type {{[k:string]:number}} */
			var obj = {};
			obj[ config.urlParam ] = i;
			contentFilter.uri.extend( obj );
			/** @type {HTMLAnchorElement} */
			( item.firstChild ).href = contentFilter.uri.toString();
		}
	},

	insertFilterElement: function () {
		var ul = document.createElement( 'ul' );
		ul.id = 'content-filter';
		for ( var i = 0; i < contentFilter.items.length; ++i ) {
			ul.appendChild( contentFilter.items[ i ] );
		}
		var info = config.filtersInfoId &&
			document.getElementById( config.filtersInfoId );
		if ( !info ) {
			var wrapper = document
				.getElementsByClassName( 'page-header__actions' )
				.item( 0 );
			wrapper.prepend( ul );
			return;
		}
		contentFilter.getMessage( 'info' ).then( function ( pageContent ) {
			info.append(
				pageContent || document.createTextNode(
					'Use one of the following filters to hide the wiki ' +
					'content unrelated to your game version:'
				),
				document.createElement( 'br' ),
				ul
			);
		} );
	},

	getMessage: function ( name ) {
		var messagePage          = config.messagesLocation + name,
			localizedMessagePage = messagePage + '/' +
				contentFilter.getPageLanguage();

		return contentFilter.pageExists( messagePage )
			.then( function ( pageExists ) {
				if ( !pageExists ) {
					return null;
				}
				return config.languageCodes.length &&
					contentFilter.pageExists( localizedMessagePage );
			} ).then( function ( pageExists ) {
				if ( pageExists === null ) {
					return null;
				}
				return contentFilter.getPageContent(
					pageExists ? localizedMessagePage : messagePage
				);
			} );
	},

	pageExists: function ( pageName ) {
		return contentFilter.api
			.get( { action: 'query', titles: pageName } )
			.then( function ( ret ) {
				return !ret.query.pages[ '-1' ];
			} );
	},

	getPageContent: function ( pageName ) {
		return contentFilter.api
			.parse( '{{' + pageName + '}}' )
			.then( function ( parserOutput ) {
				return contentFilter.stringToElements( parserOutput ).firstChild;
			} );
	},

	stringToElements: function ( str ) {
		var template = document.createElement( 'template' );
		template.innerHTML = str;
		return template.content.firstChild;
	},

	getPageLanguage: function () {
		var pageName = mw.config.get( 'wgPageName' ),
			lastPartIndex = pageName.lastIndexOf( '/' );
		if ( lastPartIndex === -1 ) {
			return 'en';
		}
		var lastPart = pageName.substr( lastPartIndex + 1 );
		if ( !config.languageCodes.includes( lastPart ) ) {
			return 'en';
		}
		return lastPart;
	},

	updateSelectedIndex: function () {
		if ( contentFilter.selectedIndex !== -1 ) {
			return true;
		}
		var urlParam = mw.util.getParamValue( config.urlParam );
		if ( !urlParam ) {
			return false;
		}
		contentFilter.selectedIndex = parseInt( urlParam, 10 );
		if (
			contentFilter.isIndex(
				contentFilter.selectedIndex,
				contentFilter.items
			)
		) {
			return true;
		}
		contentFilter.selectedIndex = -1;
		mw.log.error(
			'Content Filter: The selected numeric filter (' + urlParam + ') ' +
			'is unavailable, please use an integer x so 0 ≤ x ≤ ' +
			( contentFilter.items.length - 1 ) + '. No filtering will be ' +
			'performed.'
		);
		return false;
	},

	isIndex: function ( number, array ) {
		return !isNaN( number ) && number >= 0 && number < array.length;
	},

	applyFilter: function ( container ) {
		config.preprocess.call( contentFilter, container );
		if ( config.blockFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					config.blockFilterClass
				),
				contentFilter.processBlockFilter
			);
		}
		if ( config.wrapperFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					config.wrapperFilterClass
				),
				contentFilter.processWrapperFilter
			);
		}
		if ( config.inlineFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					config.inlineFilterClass
				),
				contentFilter.processInlineFilter
			);
		}
		while ( contentFilter.postponed.length ) {
			var todo = contentFilter.postponed;
			contentFilter.postponed = [];
			for ( var i = 0; i < todo.length; ++i ) {
				todo[ i ][ 0 ]( todo[ i ][ 1 ] );
			}
		}
		config.postprocess.call( contentFilter, container );
	},

	forEachLiveElement: function ( liveElementList, callback ) {
		var previousLength = liveElementList.length;
		for ( var i = 0; i < liveElementList.length; ) {
			callback( liveElementList[ i ] );
			if ( previousLength > liveElementList.length ) {
				previousLength = liveElementList.length;
			} else {
				++i;
			}
		}
	},

	processBlockFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			element.classList.remove(
				/** @type {string} */
				( config.blockFilterClass )
			);
		} else if ( !contentFilter.handleBlockFilter( element ) ) {
			element.classList.remove(
				/** @type {string} */
				( config.blockFilterClass )
			);
			mw.log.warn( 'unmatched block filter' );
		}
	},

	processWrapperFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			element.classList.remove(
				/** @type {string} */
				( config.wrapperFilterClass )
			);
		} else if ( !contentFilter.handleWrapperFilter( element ) ) {
			contentFilter.unwrap( element );
			mw.log.warn( 'unmatched wrapper filter' );
		}
	},

	processInlineFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			contentFilter.removeElementWithoutContext( element );
		} else if ( !contentFilter.handleInlineFilter( element ) ) {
			element.classList.remove(
				/** @type {string} */
				( config.inlineFilterClass )
			);
			mw.log.warn( 'unmatched inline filter' );
		}
	},

	removeElementWithoutContext: function ( element ) {
		var parent = element.parentElement;
		while (
			parent !== contentFilter.parserOutput &&
			!contentFilter.hasSibling( element ) &&
			parent.tagName !== 'TD'
		) {
			element = parent;
			parent  = parent.parentElement;
		}
		parent.removeChild( element );
	},

	handleBlockFilter: function ( element ) {
		if ( config.blockFilterCustomHandler.call( contentFilter, element ) ) {
			return true;
		}

		contentFilter.removeElement( element );
		return true;
	},

	handleWrapperFilter: function ( element ) {
		if ( config.wrapperFilterCustomHandler.call( contentFilter, element ) ) {
			return true;
		}

		contentFilter.removeElement( element );
		return true;
	},

	handleInlineFilter: function ( element ) {
		if ( config.inlineFilterCustomHandler.call( contentFilter, element ) ) {
			return true;
		}

		var parent = element.parentElement;

		if (
			config.contextFilterClass &&
			parent.classList.contains(
				config.contextFilterClass
			)
		) {
			var heading = contentFilter.getPreviousHeading( parent );
			contentFilter.removeElement( heading || parent );
			return true;
		}

		if (
			parent.tagName === 'LI' &&
			!contentFilter.hasPreviousSibling( element )
		) {
			contentFilter.removeElement( parent );
			return true;
		}

		contentFilter.removeGhostSiblings( element );
		if ( !contentFilter.getNextText( element ) ) {
			var nextElement = element.nextElementSibling;
			if ( !nextElement ) {
				contentFilter.removeElement( element.parentElement );
				return true;
			}
			if ( nextElement.tagName === 'BR' ) {
				contentFilter.removePreviousNodesUntilName( nextElement, 'BR' );
				nextElement.remove();
				return true;
			}
		}

		var previousElement = element.previousElementSibling,
			previousText    = contentFilter.getPreviousText( element );
		if (
			previousText ?
				!previousText.endsWith( '.' ) :
				previousElement && previousElement.tagName !== 'BR'
		) {
			return false;
		}

		/** @type {ChildNode} */
		var node        = element,
			nextNode    = node,
			textContent = '';
		do {
			textContent = node.textContent.trimEnd();
			nextNode    = node.nextSibling;
			node.remove();
			node = nextNode;
			if ( !node ) {
				if ( !previousElement && !previousText ) {
					contentFilter.removeElement( parent );
				}
				return true;
			}
			if ( node.nodeName === 'BR' ) {
				node.remove();
				return true;
			}
			if (
				textContent.endsWith( '.' ) &&
				node instanceof HTMLElement &&
				node.classList.contains(
					/** @type {string} */
					( config.inlineFilterClass )
				)
			) {
				return true;
			}
		} while ( true );
	},

	removeElement: function ( element ) {
		if ( element.classList.contains( 'gallerytext' ) ) {
			while ( element.classList.contains( 'gallerybox' ) ) {
				element = element.parentElement;
			}
		}
		contentFilter.removeGhostSiblings( element );
		switch ( element.tagName ) {
		case 'H2':
		case 'H3':
		case 'H4':
		case 'H5':
		case 'H6':
			contentFilter.removeHeadingElement( element );
			return;
		case 'LI':
			contentFilter.removeListItem( element );
			return;
		case 'TBODY':
			contentFilter.removeElement( element.parentElement );
			return;
		case 'TR':
			if ( !contentFilter.hasSibling( element ) ) {
				contentFilter.removeElement( element.parentElement );
			} else {
				element.remove();
			}
			return;
		case 'TH':
		case 'TD':
			contentFilter.removeTableCell( element );
			return;
		}
		contentFilter.removeDefaultElement( element );
	},

	removeHeadingElement: function ( element ) {
		var headingLevel = contentFilter.getHeadingLevel( element ),
			sibling      = element.nextElementSibling;
		while ( !contentFilter.isOutOfSection( sibling, headingLevel ) ) {
			var toRemove = sibling;
			sibling = sibling.nextElementSibling;
			toRemove.remove();
		}
		contentFilter.removeTocElement(
			element.getElementsByClassName( 'mw-headline' )[ 0 ].id
		);
	},

	removeListItem: function ( item ) {
		var list = item.parentElement;
		if ( list.childNodes.length > 1 ) {
			item.remove();
			return;
		}
		contentFilter.removeElement( list );
	},

	removeTableCell: function ( cell ) {
		var row    = cell.parentElement,
			tbody  = row.parentElement,
			table  = tbody.parentElement,
			column = 0;
		for (
			var sibling = cell.previousElementSibling;
			sibling;
			sibling = sibling.previousElementSibling
		) {
			++column;
		}

		if ( tbody.tagName === 'THEAD' && cell.tagName === 'TH' ) {
			// TODO: Fix with mw-collapsible & sortable.
			var isLastColumn = !cell.nextElementSibling;
			row.removeChild( cell );
			if ( !tbody.nextElementSibling ) {
				return;
			}
			var nextRow = tbody.nextElementSibling.firstElementChild;
			while ( nextRow ) {
				nextRow.removeChild( nextRow.children[ column ] );
				nextRow = nextRow.nextElementSibling;
			}
			if ( isLastColumn ) {
				table.classList.remove(
					'mw-collapsible',
					'mw-made-collapsible'
				);
				$( table ).makeCollapsible();
			}
		}

		var mainColumn = config.mainColumnClassIntro &&
			contentFilter.findClassStartingWith(
				table,
				config.mainColumnClassIntro
			) || 1;
		if ( +mainColumn === column + 1 ) {
			contentFilter.removeElement( row );
			return;
		}

		if (
			config.listTableClass &&
			table.classList.contains( config.listTableClass )
		) {
			row.removeChild( cell );
			return;
		}
		while ( cell.firstChild ) {
			cell.removeChild( cell.firstChild );
		}
	},

	removeDefaultElement: function ( element ) {
		if ( element.classList.contains( 'mw-headline' ) ) {
			contentFilter.removeElement( element.parentElement );
			return;
		}
		var parent  = element.parentElement,
			sibling = element.previousElementSibling;
		element.remove();
		contentFilter.ensureNonEmptySection( sibling );
		if ( !parent.childNodes.length ) {
			contentFilter.removeElement( parent );
		}
	},

	ensureNonEmptySection: function ( element ) {
		if ( !element ) {
			return;
		}
		while ( !( element instanceof HTMLHeadingElement ) ) {
			if (
				!config.inContentAddClass ||
				!element.classList.contains( config.inContentAddClass )
			) {
				return;
			}
			element = element.previousElementSibling;
		}
		if (
			!contentFilter.isOutOfSection(
				element.nextElementSibling,
				contentFilter.getHeadingLevel( element )
			)
		) {
			return;
		}
		var previousElement = element.previousElementSibling;
		contentFilter.removeTocElement(
			element.getElementsByClassName( 'mw-headline' )[ 0 ].id
		);
		element.parentNode.removeChild( element );
		contentFilter.ensureNonEmptySection( previousElement );
	},

	removeTocElement: function ( id ) {
		if ( !contentFilter.toc ) {
			return false;
		}
		var element = contentFilter.toc.querySelector( '[href="#' + id + '"]' );
		if ( !element ) {
			return false;
		}
		var parent     = element.parentElement,
			number     = element
				.getElementsByClassName( 'tocnumber' )[ 0 ].textContent,
			lastDotPos = number.lastIndexOf( '.', 1 ) + 1,
			lastNumber = +number.substring( lastDotPos ),
			nextParent = parent.nextElementSibling;
		while ( nextParent ) {
			var nextNumbers = nextParent
					.getElementsByClassName( 'tocnumber' );
			for ( var i = 0; i < nextNumbers.length; ++i ) {
				var textContent = nextNumbers[ i ].textContent;
				nextNumbers[ i ].textContent =
					textContent.substring( 0, lastDotPos ) + lastNumber +
					textContent.substring( number.length );
			}
			++lastNumber;
			nextParent = nextParent.nextElementSibling;
		}
		parent.parentNode.removeChild( parent );
		return true;
	},

	getHeadingLevel: function ( heading ) {
		return +heading.tagName.substr( 1 );
	},

	isOutOfSection: function ( element, headingLevel ) {
		return !element ||
		       element instanceof HTMLHeadingElement &&
		       headingLevel >= contentFilter.getHeadingLevel( element ) ||
		       config.contentEndClass &&
		       element.classList.contains( config.contentEndClass );
	},

	hasClass: function ( element, className ) {
		if ( !element ) {
			return false;
		}
		if ( element.classList.contains( className ) ) {
			return true;
		}
		var children = element.children;
		if ( !children.length ) {
			return false;
		}
		for ( var i = 0; i < children.length; ++i ) {
			if ( !contentFilter.hasClass( children[ i ], className ) ) {
				return false;
			}
		}
		return true;
	},

	hasSibling: function ( element ) {
		return contentFilter.hasPreviousSibling( element ) ||
		       contentFilter.hasNextSibling( element );
	},

	hasPreviousSibling: function ( element ) {
		var sibling = element.previousSibling;
		if ( !sibling ) {
			return false;
		}
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling = sibling.previousSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	hasNextSibling: function ( element ) {
		var sibling = element.nextSibling;
		if ( !sibling ) {
			return false;
		}
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling = sibling.nextSibling;
			if ( !sibling ) {
				return false;
			}
		}
		return true;
	},

	isGhostNode: function ( node ) {
		if ( !node ) {
			return false;
		}
		switch ( node.nodeType ) {
		case Node.COMMENT_NODE:
			return true;
		case Node.TEXT_NODE:
			return !node.textContent.trim();
		case Node.ELEMENT_NODE:
			/** @type {Element} */
			var element = ( node );
			return element.classList.contains( 'mw-collapsible-toggle' ) ||
			       config.skipClass &&
			       element.classList.contains( config.skipClass );
		}
		return false;
	},

	removeGhostSiblings: function ( node ) {
		var sibling = node.previousSibling;
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling.remove();
			sibling = node.previousSibling;
		}
		sibling = node.nextSibling;
		while ( contentFilter.isGhostNode( sibling ) ) {
			sibling.remove();
			sibling = node.nextSibling;
		}
	},

	removePreviousNodesUntilName: function ( node, nodeName, removeLast ) {
		var sibling = node.previousSibling;
		while ( sibling && ( sibling.nodeName !== nodeName ) ) {
			sibling.remove();
			sibling = node.previousSibling;
		}
		if ( removeLast ) {
			sibling.remove();
		}
	},

	removeNextNodesUntilName: function ( node, nodeName, removeLast ) {
		var sibling = node.nextSibling;
		while ( sibling && ( sibling.nodeName !== nodeName ) ) {
			sibling.remove();
			sibling = node.nextSibling;
		}
		if ( removeLast ) {
			sibling.remove();
		}
	},

	removePreviousNodeUntilText: function ( node, text, removeText ) {
		var sibling = node.previousSibling;
		while (
			sibling && (
				sibling.nodeType !== Node.TEXT_NODE ||
				sibling.textContent.indexOf( text ) === -1
			)
		) {
			sibling.remove();
			sibling = node.previousSibling;
		}
		if ( !sibling ) {
			return;
		}
		if ( !removeText ) {
			sibling.textContent = sibling.textContent.substr(
				0,
				sibling.textContent.lastIndexOf( text ) + text.length
			);
			return;
		}
		sibling.textContent = sibling.textContent
			.substr( 0, sibling.textContent.lastIndexOf( text ) )
			.trimEnd();
		if ( !sibling.textContent ) {
			sibling.remove();
		}
	},

	removeNextNodeUntilText: function ( node, text, removeText ) {
		var sibling = node.nextSibling;
		while (
			sibling && (
				sibling.nodeType !== Node.TEXT_NODE ||
				sibling.textContent.indexOf( text ) === -1
			)
		) {
			sibling.remove();
			sibling = node.nextSibling;
		}
		if ( !sibling ) {
			return;
		}
		if ( !removeText ) {
			sibling.textContent = sibling.textContent
				.substr( sibling.textContent.indexOf( text ) );
			return;
		}
		sibling.textContent = sibling.textContent
			.substr( sibling.textContent.indexOf( text ) + text.length )
			.trimStart();
		if ( !sibling.textContent ) {
			sibling.remove();
		}
	},

	getPreviousText: function ( element ) {
		var previousNode = element.previousSibling;
		return previousNode instanceof Text && previousNode.textContent ?
			previousNode.textContent.trim() :
			'';
	},

	getNextText: function ( element ) {
		var nextNode = element.nextSibling;
		return nextNode instanceof Text && nextNode.textContent ?
			nextNode.textContent.trim() :
			'';
	},

	unwrap: function ( element, target ) {
		if ( !target ) {
			target = element;
		}
		var parent = target.parentElement;
		if ( !parent ) {
			return;
		}
		var childNode = element.firstChild;
		if ( !childNode ) {
			element.remove();
			return;
		}
		var sibling = target.previousSibling;
		if (
			sibling &&
			childNode.nodeType === Node.TEXT_NODE &&
			sibling.nodeType === Node.TEXT_NODE
		) {
			sibling.textContent += childNode.textContent;
			childNode.remove();
		}
		childNode = element.lastChild;
		if ( !childNode ) {
			element.remove();
			return;
		}
		sibling = target.nextSibling;
		if (
			sibling &&
			childNode.nodeType === Node.TEXT_NODE &&
			sibling.nodeType === Node.TEXT_NODE
		) {
			sibling.textContent = childNode.textContent + sibling.textContent;
			childNode.remove();
		}
		childNode = element.firstChild;
		while ( childNode ) {
			parent.insertBefore( childNode, target );
			childNode = element.firstChild;
		}
		element.remove();
	},

	updateSelectedFilterItem: function () {
		delete contentFilter.uri.query[ config.urlParam ];
		var item = contentFilter.items[ contentFilter.selectedIndex ];
		item.classList.add( 'content-filter-item-active' );
		item.firstElementChild.setAttribute(
			'href',
			contentFilter.uri.toString()
		);
	},

	updateAnchorsFilter: function () {
		var anchors = document.getElementsByTagName( 'a' );
		for ( var i = 0; i < anchors.length; ++i ) {
			var anchor = anchors[ i ];
			if ( !anchor.href ) {
				continue;
			}
			if (
				anchor.parentElement.classList.contains( 'content-filter-item' )
			) {
				continue;
			}
			var uri = new mw.Uri( anchor.href );
			if ( uri.query[ config.urlParam ] ) {
				continue;
			}
			var match = uri.path.match(
				mw.RegExp
					.escape( mw.config.get( 'wgArticlePath' ) )
					.replace( '\\$1', '(.*)' )
			);
			if ( !match ) {
				continue;
			}
			var title = new mw.Title(
				mw.Uri.decode( match[ 1 ] ) ||
				mw.config.get( 'wgMainPageTitle' )
			);
			if (
				!config.filteredNamespaces.includes( title.getNamespaceId() ) &&
				!config.filteredSpecialTitles.includes( title.getPrefixedText() )
			) {
				continue;
			}
			/** @type {{[k:string]:number}} */
			var obj = {};
			obj[ config.urlParam ] = contentFilter.selectedIndex;
			uri.extend( obj );
			anchor.href = uri.toString();
		}
	}
};

$( contentFilter.init );
} )();