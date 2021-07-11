/**
 * Wiki-wise configuration of the content filter.
 */
var contentFilterConfig = {

	/**
	 * The list of available filters, each one being the description of the
	 * corresponding filter.
	 * @type {string[]}
	 */
	filters: [
		/* 0001 */ 'Hide content unavailable with Rebirth',
		/* 0010 */ 'Hide content unavailable with Afterbirth',
		/* 0100 */ 'Hide content unavailable with Afterbirth+',
		/* 1000 */ 'Hide content unavailable with Repentance'
	],

	/**
	 * The namespaces where the filtering should be available.
	 * @type {number[]}
	 */
	filteredNamespaces: [ 0, 2 ],

	/**
	 * The pages where the filtering should be available, if they are not from a
	 * namespace where the filtering is available.
	 * @type {string[]}
	 */
	filteredSpecialTitles: [
		'Special:Random'
	],

	/**
	 * If an element on a page has this class (directly on the page or
	 * transcluded), the filtering becomes available, even if the page is not
	 * from a namespace in filteredNamespaces or in filteredSpecialTitles.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	filterEnableClass: 'content-filter-enable',

	/**
	 * The language codes used on the wiki.
	 * @type {string[]}
	 */
	languageCodes: [ 'en', 'es', 'it', 'ja', 'ru', 'zh' ],

	/**
	 * Some translatable messages are used with the content filter. These can be
	 * customized by creating/editing their corresponding page:
	 * 
	 *     <messagesLocation><messageName>
	 * 
	 * (<messagesLocation> being the value of this parameter and <messageName>
	 *  the name of the message)
	 * 
	 * If language codes have been specified, the messages can be translated by
	 * creating/editing the corresponding page:
	 * 
	 *     <messagesLocation><messageName>/<languageCode>
	 * 
	 * (<languageCode> being the corresponcing language code: one of the values
	 *  in the previously defined languageCodes array)
	 * @type {string}
	 */
	messagesLocation: 'mediawiki:gadget-dlc-filter/',

	/**
	 * The name of the URL parameter used to store the selected filter.
	 * @type {string}
	 */
	urlParam: 'dlcfilter',

	/**
	 * If an element with this ID is on a page (directly on the page or
	 * transcluded), it will be filled with the "info" message (see the
	 * messagesLocation parameter) followed by the filter buttons. These will
	 * then not appear on the page header.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	filtersInfoId: 'content-filter-info',

	/**
	 * To indicate with which filters some content should be visible or hidden,
	 * the corresponding elements have to use a specific filtering class:
	 * 
	 *     <filterClassIntro><mask>
	 * 
	 * (<filterClassIntro> being the value of this parameter and <mask>
	 *  the bitmask of the filters the associated content should be available
	 *  with)
	 * 
	 * Each element also has to use a filtering type class (either
	 * blockFilterClass, wrapperFilterClass, or inlineFilterClass).
	 * 
	 * For instance, if the available filters were previously defined as:
	 * 
	 *     filters: [
	 *         'filter1',  // 01
	 *         'filter2'   // 10
	 *     ],
	 * 
	 * using "0" (00) as <mask> will hide the content while any of the filters
	 * are enabled, using "1" (01) as <mask> will hide the content while the
	 * second filter is enabled, using "2" (10) as <mask> will hide the content
	 * while the first filter is enabled, using "3" (11) as <mask> will have no
	 * effect (the content will be shown with any filter enabled). If the value
	 * of this parameter is 'filter-', then the following tags are valid uses:
	 * 
	 *     <span class="filter-2 …"> … </span>
	 *     <img class="filter-1 …" />
	 * 
	 * @type {string}
	 */
    filterClassIntro: 'dlc-',

	/**
	 * This class can be used on elements to indicate that they should be
	 * removed entirely if the selected filter does not match the element
	 * bitmask, and left in place otherwise.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	blockFilterClass: false,

	/**
	 * This class can be used on elements to indicate that they should be
	 * unwrapped if the selected filter does not match the element bitmask
	 * (the element itself is removed, its content is left in place), and left
	 * in place otherwise.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	wrapperFilterClass: false,

	/**
	 * This class can be used on elements to indicate that they should be
	 * removed if any filter is enabled. Their associated content is then
	 * removed if the selected filter does not match the element bitmask, and
	 * left in place otherwise.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	inlineFilterClass: 'dlc',

	/**
	 * If an element with a filter bitmask class is inside an element with this
	 * class, the corresponding bitmask is applied to the surrounding section.
	 * If the element is not in a section, then the bitmask is applied to the
	 * entire page: the filter buttons not matching the bitmask are disabled.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	contextFilterClass: 'context-box',

	/**
	 * This class can be used on elements to make them invisible to filtering:
	 * the script will go through them when trying to remove elements. For
	 * instance, the button used to collapse tables (.mw-collapsible-toggle) is
	 * skipped by default.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	skipClass: 'content-filter-skip',

	/**
	 * If a page has navigation bars or elements considered out of the page
	 * content at the bottom of the page, using this class on at least the first
	 * one will prevent these elements from being removed with a previous
	 * section (see contextFilterClass).
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	contentEndClass: 'content-filter-end',

	/**
	 * By default, a row is removed from a table if its first cell is removed.
	 * If the title cell of a table is not the first one, then a class with the
	 * following format can be used to indicate which cell should be considered
	 * the main one:
	 * 
	 *     <mainColumnClassIntro><index>
	 * 
	 * (<mainColumnClassIntro> being the value of this parameter and <index>
	 *  the index of the main cell, the first one being 1)
	 * 
	 * For instance, if the value of this parameter is 'main-column-', then the
	 * following classes can be used to respectively make the second and third
	 * columns the main ones:
	 * 
	 *     {| class="main-column-2"
	 *      ! Column 1
	 *      ! Main column 2
	 *      ! Column 3
	 *      …
	 *      |}
	 *     {| class="main-column-3"
	 *      ! Column 1
	 *      ! Column 2
	 *      ! Main column 3
	 *      …
	 *      |}
	 * 
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	mainColumnClassIntro: 'content-filter-main-column-',

	/**
	 * If a table has this class, its cells can be removed (instead of being
	 * only cleared), the following cells on the column will then be shifted.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	listTableClass: 'content-filter-list',

	/**
	 * This class works the same way as skipClass, except that the element will
	 * be put back on the page somewhere else if it has to be removed.
	 * Use false to disable this functionality.
	 * @type {string|false}
	 */
	inContentAddClass: false,

	/**
	 * Removes an element with a block filter, following custom rules.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	blockFilterCustomHandler: function ( element ) {
		return false;
	},

	/**
	 * Removes an element with a wrapper filter, following custom rules.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	wrapperFilterCustomHandler: function ( element ) {
		return false;
	},

	/**
	 * Removes an element with an inline filter and its related content,
	 * following custom rules.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	inlineFilterCustomHandler: function ( element ) {
		return handleItemDictionary( element ) ||
		       handleNavListVertical( element );
	},

	/**
	 * Does things before removing elements from a container.
	 * @param {Element} container The container to remove elements from.
	 */
	preprocess: function ( container ) {
		preprocessItemDictionaries( container );
	},

	/**
	 * Does things after removing elements from a container.
	 * @param {Element} container The container to remove elements from.
	 */
	postprocess: function ( container ) {
		postprocessItemDictionaries( container );
		postprocessCategoryNavs( container );
		postprocessListNavs( container );
	}
};



/**
 * Removes an element with an inline filter and its related content in a list
 * using items as a key.
 * @param {Element} element The element to remove.
 * @returns True if the removal has been handled by this function, false if
 *          it should be handled the default way.
 */
function handleItemDictionary( element ) {
	var parent = element.parentElement;
	if (
		parent.tagName !== 'SPAN' ||
		!parent.classList.contains( 'dlc-filter-dict-key' )
	) {
		return false;
	}
	var li      = parent.parentElement,
		keyType = getKeyType( element );
	switch ( keyType ) {
	case DictKeyType.UNIQUE:
	case DictKeyType.COMBINED:
		contentFilter.removeElement( li );
		return true;
	case DictKeyType.FIRST_ALTERNATIVE:
		while ( element.previousSibling ) {
			element.previousSibling.remove();
		}
		contentFilter.removeNextNodeUntilText( element, '/', true );
		element.remove();
		return true;
	case DictKeyType.ALTERNATIVE:
		contentFilter.removePreviousNodeUntilText( element, '/', true );
		contentFilter.removeNextNodeUntilText( element, '/' );
		element.remove();
		break;
	case DictKeyType.LAST_ALTERNATIVE:
		contentFilter.removePreviousNodeUntilText( element, '/', true );
		while ( element.nextSibling ) {
			element.nextSibling.remove();
		}
		element.remove();
		return true;
	}
	return false;
}

var DictKeyType = {
	UNIQUE: 0,
	COMBINED: 1,
	FIRST_ALTERNATIVE: 2,
	ALTERNATIVE: 3,
	LAST_ALTERNATIVE: 4
};

/**
 * Gets the type of key an element is part of.
 * @param {Element} element The element.
 * @returns {number} A key type from the DictKeyType enumeration.
 * @see DictKeyType
 */
function getKeyType( element ) {
	/** @type {ChildNode} */
	var node    = element,
		sibling = node.previousSibling;
	while (
		sibling && (
			sibling.nodeType !== Node.TEXT_NODE ||
			sibling.textContent.lastIndexOf( '/' ) === -1 &&
			sibling.textContent.lastIndexOf( '+' ) === -1
		)
	) {
		node.remove();
		node    = sibling;
		sibling = sibling.previousSibling;
	}
	var keyType = DictKeyType.UNIQUE;
	if ( sibling ) {
		var slashIndex = sibling.textContent.lastIndexOf( '/' ),
			plusIndex  = sibling.textContent.lastIndexOf( '+' );
		keyType = slashIndex === -1 || plusIndex > slashIndex ?
			DictKeyType.COMBINED :
			DictKeyType.LAST_ALTERNATIVE;
	}
	node    = element;
	sibling = node.nextSibling;
	while (
		sibling && (
			sibling.nodeType !== Node.TEXT_NODE ||
			sibling.textContent.indexOf( '/' ) === -1 &&
			sibling.textContent.indexOf( '+' ) === -1
		)
	) {
		node.remove();
		node    = sibling;
		sibling = sibling.nextSibling;
	}
	if ( sibling ) {
		var slashIndex = sibling.textContent.indexOf( '/' ),
			plusIndex  = sibling.textContent.indexOf( '+' );
		keyType = slashIndex === -1 || plusIndex !== -1 && plusIndex < slashIndex ?
			DictKeyType.COMBINED :
			DictKeyType.LAST_ALTERNATIVE;
	}
	return keyType;
}

/**
 * Removes a DLC icon and its related content in a vertical list navigation.
 * @param {Element} dlcIcon The DLC icon.
 * @returns True if the DLC icon has been handled properly, false otherwise.
 */
function handleNavListVertical( dlcIcon ) {
	var cell = dlcIcon.parentElement;
	if ( cell.tagName !== 'TD' ) {
		return false;
	}
	var row   = cell.parentElement,
		table = row.parentElement.parentElement;
	if ( !table.classList.contains( 'nav-list-vertical' ) ) {
		return false;
	}
	var index = 0;
	for (
		var sibling = cell.previousElementSibling;
		sibling;
		sibling = sibling.previousElementSibling
	) {
		++index;
	}
	
	cell.remove();
	var nextRow = row.nextElementSibling;
	nextRow.children[ index ].remove();
	return true;
}

/**
 * 
 * @param {Element} container 
 */
function preprocessItemDictionaries( container ) {
	var headings = container.querySelectorAll( 'h2, h3, h4, h5, h6' );
	for ( var i = 0; i < headings.length; ++i ) {
		var headlines = headings[ i ]
			.getElementsByClassName( 'mw-headline' );
		if (
			headlines.length &&
			headlines[ 0 ].textContent.match( 'Synergies|Interactions' )
		) {
			var headingLevel = contentFilter.getHeadingLevel( headings[ i ] ),
				nextElement  = headings[ i ].nextElementSibling;
			while (
				!contentFilter.isOutOfSection( nextElement, headingLevel )
			) {
				if ( nextElement.tagName === 'UL' ) {
					preprocessItemDictionary( nextElement );
				}
				nextElement = nextElement.nextElementSibling;
			}
		}
	}
}

/**
 * 
 * @param {Element} ul 
 */
function preprocessItemDictionary( ul ) {
	ul.classList.add( 'dlc-filter-dict' );
	var lis = ul.children;
	for ( var i = 0; i < lis.length; ++i ) {
		var li = lis.item( i );
		if ( li.tagName !== 'LI' ) {
			continue;
		}
		var keySpan   = document.createElement( 'span' ),
			valueSpan = document.createElement( 'span' ),
			node      = li.firstChild;
		keySpan.classList.add( 'dlc-filter-dict-key' );
		valueSpan.classList.add( 'dlc-filter-dict-value' );
		while (
			node && (
				node.nodeType !== Node.TEXT_NODE ||
				node.textContent.indexOf( ':' ) === -1
			)
		) {
			keySpan.append( node );
			node = li.firstChild;
		}
		if ( !node ) {
			mw.log.error( 'key error' );
			continue;
		}
		var colonIndex = node.textContent.indexOf( ':' );
		keySpan.append(
			document.createTextNode( node.textContent.substr( 0, colonIndex ) )
		);
		valueSpan.append(
			document.createTextNode( node.textContent.substr( colonIndex + 1 ) )
		);
		var lastNode    = li.lastChild,
			lastElement = li.lastElementChild;
		if ( lastElement && lastElement.tagName === 'UL' ) {
			lastElement.classList.add( 'dlc-filter-dict-inner' );
			lastNode = lastElement.previousSibling;
		}
		while ( node && node !== lastNode ) {
			valueSpan.append( node );
			node = li.firstChild;
		}
		li.prepend( keySpan, document.createTextNode( ':' ), valueSpan );
	}
}

/**
 * 
 * @param {Element} container 
 */
function postprocessItemDictionaries( container ) {
	var uls = container.getElementsByClassName( 'dlc-filter-dict' );
	while ( uls.length ) {
		var li = uls.item( 0 ).firstElementChild;
		while ( li ) {
			var keys   = li.getElementsByClassName( 'dlc-filter-dict-key' ),
				values = li.getElementsByClassName( 'dlc-filter-dict-value' );
			contentFilter.unwrap( keys.item( 0 ) );
			if ( values.length ) {
				contentFilter.unwrap( values.item( 0 ) );
				continue;
			}
			var subdicts = li.getElementsByClassName( 'dlc-filter-dict-inner' );
			if ( !subdicts.length ) {
				continue;
			}
			var subdict = subdicts.item( 0 ),
				firstLi = subdict.getElementsByTagName( 'li' ).item( 0 );
			contentFilter.unwrap( firstLi, subdict );
			if ( !subdict.firstElementChild ) {
				subdict.remove();
			} else {
				subdict.classList.remove( 'dlc-filter-inner' );
			}
		}
		li = li.nextElementSibling;
		uls.item( 0 ).classList.remove( 'dlc-filter-dict' );
	}
}

/**
 * Remove empty "category" navs.
 * @param {Element} container 
 */
function postprocessCategoryNavs( container ) {
	var navs = container.getElementsByClassName( 'nav-category' );
	for ( var i = 0; i < navs.length; ++i ) {
		if ( navs[ i ].classList.contains( 'nav-list-vertical' ) ) {
			continue;
		}
		var row     = navs[ i ].children[ 1 ],
			nextRow = row.nextElementSibling;
		while ( nextRow ) {
			if ( nextRow.tagName === 'P' ) {
				row.remove();
			} else {
				nextRow = nextRow.nextElementSibling;
			}
			row     = nextRow;
			nextRow = nextRow.nextElementSibling;
		}
		row.remove();
	}
}

/**
 * Merge cells of list navs, the DLC icons being removed.
 * @param {Element} container 
 */
function postprocessListNavs( container ) {
	var navs = container.getElementsByClassName( 'nav-list-vertical' );
	for ( var i = 0; i < navs.length; ++i ) {
		var row       = navs[ i ].lastElementChild.lastElementChild;
		var cells     = row.children;
		var firstCell = cells[ 0 ];
		var lastChild = firstCell.lastChild;
		while ( !( lastChild instanceof HTMLElement ) ) {
			lastChild.remove();
			lastChild = firstCell.lastChild;
		}
		while ( cells.length > 1 ) {
			var nodes = cells[ 1 ].children;
			for ( var j = 0; j < nodes.length; ++j ) {
				firstCell.append( nodes[ j ] );
			}
			cells[ 1 ].remove();
		}
		if ( !firstCell.children.length ) {
			navs[ i ].remove();
			break;
		}
		row.previousElementSibling.remove();
	}
}



/**
 * Removes information from pages according to a filter, which can be
 * enable/disabled from the toolbar.
 */
var contentFilter = {
	/**
	 * The version number of the content filter.
	 */
	version: '1.0',

	/**
	 * The parser output.
	 * @type {Element}
	 */
	parserOutput: null,
	/**
	 * The table of contents from the parser output.
	 * @type {Element}
	 */
	toc: null,
	/**
	 * The filter form items.
	 * @type {HTMLLIElement[]}
	 */
	items: [],

	/**
	 * A MediaWiki API to the current wiki.
	 * @type {mw.Api}
	 */
	api: null,
	/**
	 * The current URI.
	 * Used to set links to the current page with a filter on or off.
	 * @type {mw.Uri}
	 */
	uri: null,

	/**
	 * The page global filter.
	 */
	pageFilter: 0,
	/**
	 * The index of the currently selected filter form item.
	 */
	selectedIndex: -1,
	/**
	 * The currently selected filter.
	 */
	selectedFilter: 0,

	/**
	 * @type {[(element:Element)=>void,Element][]}
	 */
	postponed: [],

	/**
	 * Initializes the content filter on a page.
	 */
	init: function () {
		console.log( 'Content Filter v' + contentFilter.version );

		if ( !( 'contentFilterConfig' in window ) ) {
			mw.log.error(
				'Content Filter: The configuration object is undefined. ' +
				'Please define a contentFilterConfig object this script ' +
				'would have access to.'
			);
		}
		var isUtilDefined = 'contentFilterUtil' in window;

		if ( isUtilDefined ) {
			contentFilterUtil.selectedFilter = 0;
			contentFilterUtil.getFilter = contentFilter.getFilter;
			contentFilterUtil.applyFilter = function () {};
		}

		if ( !contentFilter.isFilteringAvailable() ) {
			if ( isUtilDefined ) {
				contentFilterUtil.loaded = true;
			}
			return;
		}

		contentFilter.parserOutput = document
			.getElementById( 'mw-content-text' )
			.getElementsByClassName( 'mw-parser-output' )[ 0 ];
		contentFilter.toc          = document.getElementById( 'toc' );
		contentFilter.api          = new mw.Api();
		contentFilter.uri          = new mw.Uri( document.location.href );
		contentFilter.pageFilter   = contentFilter.getPageFilter();

		contentFilter.generateFilterItems();
		contentFilter.insertFilterElement();

		if ( !contentFilter.updateSelectedIndex() ) {
			if ( isUtilDefined ) {
				contentFilterUtil.loaded = true;
			}
			return;
		}

		contentFilter.selectedFilter = Math.pow( 2, contentFilter.selectedIndex );
		if ( isUtilDefined ) {
			contentFilterUtil.selectedFilter = contentFilter.selectedFilter;
			contentFilterUtil.applyFilter = contentFilter.applyFilter;
		}

		contentFilter.updateSelectedFilterItem();
		contentFilter.applyFilter( contentFilter.parserOutput );
		contentFilter.updateAnchorsFilter();

		if ( isUtilDefined ) {
			contentFilterUtil.loaded = true;
		}
	},

	/**
	 * Indicates whether the filters can be used on the current page.
	 * @returns True if the filters can be used, false otherwise.
	 */
	isFilteringAvailable: function () {
		if (
			contentFilterConfig.filterEnableClass &&
			document.getElementsByClassName(
				contentFilterConfig.filterEnableClass
			).length
		) {
			return true;
		}
		var namespace = contentFilter.findClassStartingWith( document.body, 'ns-' );
		return contentFilterConfig.filteredNamespaces.includes( +namespace );
	},

	/**
	 * Checks if the entire page is limited to some versions then sets the page
	 * global filter accordingly.
	 */
	getPageFilter: function () {
		if (
			!contentFilterConfig.contextFilterClass ||
			!contentFilter.parserOutput
		) {
			return Math.pow( 2, contentFilterConfig.filters.length ) - 1;
		}
		var contextBoxes = contentFilter.parserOutput
			.getElementsByClassName( contentFilterConfig.contextFilterClass );
		if (
			!contextBoxes.length ||
			contentFilter.getPreviousHeading( contextBoxes[ 0 ] )
		) {
			return Math.pow( 2, contentFilterConfig.filters.length ) - 1;
		}
		if ( contentFilterConfig.blockFilterClass ) {
			var blockElement = contextBoxes[ 0 ].getElementsByClassName(
				contentFilterConfig.blockFilterClass
			)[ 0 ];
			if ( blockElement ) {
				return contentFilter.getFilter( blockElement );
			}
		}
		if ( contentFilterConfig.wrapperFilterClass ) {
			var wrapperElement = contextBoxes[ 0 ].getElementsByClassName(
				contentFilterConfig.wrapperFilterClass
			)[ 0 ];
			if ( wrapperElement ) {
				return contentFilter.getFilter( wrapperElement );
			}
		}
		if ( contentFilterConfig.inlineFilterClass ) {
			var inlineElement = contextBoxes[ 0 ].getElementsByClassName(
				contentFilterConfig.inlineFilterClass
			)[ 0 ];
			if ( inlineElement ) {
				return contentFilter.getFilter( inlineElement );
			}
		}
		return 0;
	},

	/**
	 * Gets the last heading element used before an element.
	 * @param {Element} element The element.
	 * @returns The previous heading element if there is one, null otherwise.
	 */
	getPreviousHeading: function ( element ) {
		element = element.previousElementSibling;
		while ( element && !( element instanceof HTMLHeadingElement ) ) {
			element = element.previousElementSibling;
		}
		return element;
	},

	/**
	 * Gets the numeric filter of an element.
	 * @param {Element} element The element.
	 * @returns The numeric filter of the given element, 0 otherwise.
	 */
	getFilter: function ( element ) {
		var filterClass = contentFilter.findClassStartingWith(
			element,
			contentFilterConfig.filterClassIntro
		);
		return filterClass ? +filterClass : 0;
	},

	/**
	 * Gets the first class of an element beginning with a specific string.
	 * @param {Element} element The element.
	 * @param {string}  intro   The beginning of the class name.
	 * @returns The first corresponding class name, null otherwise.
	 */
	findClassStartingWith: function ( element, intro ) {
		var classList = element.classList;
		for ( var i = 0; i < classList.length; ++i ) {
			if ( classList[ i ].startsWith( intro ) ) {
				return classList[ i ].substr( intro.length );
			}
		}
		return null;
	},

	/**
	 * Generates the filter form items.
	 */
	generateFilterItems: function () {
		for (
			var i = 0, pow = 1;
			i < contentFilterConfig.filters.length;
			++i, pow *= 2
		) {
			var item = document.createElement( 'li' );
			item.id = 'content-filter-item-' + i;
			item.classList.add( 'content-filter-item' );
			contentFilter.items.push( item );
			if ( ( pow & contentFilter.pageFilter ) === 0 ) {
				item.classList.add( 'content-filter-item-deactivated' );
				continue;
			}
			item.title = contentFilterConfig.filters[ i ];
			var obj = {};
			obj[ contentFilterConfig.urlParam ] = i;
			contentFilter.uri.extend( obj );
			var a = document.createElement( 'a' );
			a.href = contentFilter.uri.toString();
			item.appendChild( a );
		}
	},

	/**
	 * Generates the filter form and puts it on the page.
	 */
	insertFilterElement: function () {
		var ul = document.createElement( 'ul' );
		ul.id = 'content-filter';
		for ( var i = 0; i < contentFilter.items.length; ++i ) {
			ul.appendChild( contentFilter.items[ i ] );
		}
		var info = contentFilterConfig.filtersInfoId &&
			document.getElementById( contentFilterConfig.filtersInfoId );
		if ( !info ) {
			var wrapper = document
				.getElementsByClassName( 'page-header__actions' )
				.item( 0 );
			wrapper.prepend( ul );
			return;
		}
		contentFilter.getMessage( 'info', function ( pageContent ) {
			info.appendChild( pageContent || document.createTextNode(
				'Use one of the following filters to hide the wiki ' +
				'content unrelated to your game version:'
			) );
			info.appendChild( document.createElement( 'br' ) );
			info.appendChild( ul );
		} );
	},

	/**
	 * Gets the value of a localized message.
	 * @param {string}              name     The message name.
	 * @param {(e:ChildNode)=>void} callback The function to call when the
	 *                                       message has been retrieved.
	 */
	getMessage: function ( name, callback ) {
		var messagePage          = contentFilterConfig.messagesLocation + name,
			localizedMessagePage = messagePage + '/' +
				contentFilter.getPageLanguage();

		contentFilter.pageExists( messagePage ).then( messagePageExists );

		function messagePageExists( /** @type {boolean} */ pageExists ) {
			if ( !pageExists ) {
				callback( null );
				return;
			}
			if ( !contentFilterConfig.languageCodes.length ) {
				contentFilter.getPageContent( messagePage ).then( callback );
				return;
			}
			contentFilter
				.pageExists( localizedMessagePage )
				.then( localizedMessagePageExists );
		}

		function localizedMessagePageExists( /** @type {boolean} */ pageExists ) {
			if ( !pageExists ) {
				contentFilter.getPageContent( messagePage ).then( callback );
				return;
			}
			contentFilter.getPageContent( localizedMessagePage ).then( callback );
		}
	},

	/**
	 * Indicates whether a page exists.
	 * @param {string} pageName The name of the page.
	 * @returns The boolean promise.
	 */
	pageExists: function ( pageName ) {
		return contentFilter.api
			.get( { action: 'query', titles: pageName } )
			.then( function ( ret ) {
				return !ret.query.pages[ '-1' ];
			} );
	},

	/**
	 * Gets the HTML content of a page.
	 * @param {string} pageName The name of the page.
	 * @returns The HTML content promise.
	 */
	getPageContent: function ( pageName ) {
		return contentFilter.api
			.parse( '{{' + pageName + '}}' )
			.then( function ( parserOutput ) {
				return contentFilter.stringToElements( parserOutput ).firstChild;
			} );
	},

	/**
	 * Generates DOM elements from a string.
	 * @param {string} str The DOM string.
	 * @returns The generated DOM elements.
	 */
	stringToElements: function ( str ) {
		var template = document.createElement( 'template' );
		template.innerHTML = str;
		return template.content.firstChild;
	},

	/**
	 * Gets the language used on the page.
	 * @returns The language code used on the page.
	 */
	getPageLanguage: function () {
		var pageName = mw.config.get( 'wgPageName' ),
			lastPartIndex = pageName.lastIndexOf( '/' );
		if ( lastPartIndex === -1 ) {
			return 'en';
		}
		var lastPart = pageName.substr( lastPartIndex + 1 );
		if ( !contentFilterConfig.languageCodes.includes( lastPart ) ) {
			return 'en';
		}
		return lastPart;
	},

	/**
	 * Updates the index of the currently selected filter form item from the URL
	 * parameters.
	 * @returns True if a valid filter should be applied, false otherwise.
	 */
	updateSelectedIndex: function () {
		if ( contentFilter.selectedIndex !== -1 ) {
			return true;
		}
		var urlParam = mw.util.getParamValue( contentFilterConfig.urlParam );
		if ( !urlParam ) {
			return false;
		}
		contentFilter.selectedIndex = parseInt( urlParam, 10 );
		if ( contentFilter.isIndex( contentFilter.selectedIndex, contentFilter.items ) ) {
			return true;
		}
		contentFilter.selectedIndex = -1;
		return false;
	},

	/**
	 * Indicates if a number is a valid index of an array.
	 * @param {number} number The number.
	 * @param {any[]}  array  The array.
	 * @returns True if "array[ number ]" exists, false otherwise.
	 */
	isIndex: function ( number, array ) {
		return !isNaN( number ) && number >= 0 && number < array.length;
	},

	/**
	 * Removes elements with a filter from a container.
	 * @param {Element} container The container to remove elements from.
	 */
	applyFilter: function ( container ) {
		contentFilterConfig.preprocess( container );
		if ( contentFilterConfig.blockFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					contentFilterConfig.blockFilterClass
				),
				contentFilter.processBlockFilter
			);
		}
		if ( contentFilterConfig.wrapperFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					contentFilterConfig.wrapperFilterClass
				),
				contentFilter.processWrapperFilter
			);
		}
		if ( contentFilterConfig.inlineFilterClass ) {
			contentFilter.forEachLiveElement(
				container.getElementsByClassName(
					contentFilterConfig.inlineFilterClass
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
		contentFilterConfig.postprocess( container );
	},

	/**
	 * Performs the specified action for each element of a live list.
	 * @template E The element type.
	 * @param {HTMLCollectionOf<E>} liveElementList The live element list.
	 * @param {(element:E)=>void}   callback        A function called for each
	 *                                              element.
	 */
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

	/**
	 * Removes an element with a block filter if its filter does not match the
	 * selected one.
	 * @param {Element} element The element.
	 */
	processBlockFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			element.classList.remove(
				// @ts-ignore
				contentFilterConfig.blockFilterClass
			);
		} else if ( !contentFilter.handleBlockFilter( element ) ) {
			element.classList.remove(
				// @ts-ignore
				contentFilterConfig.blockFilterClass
			);
			mw.log.warn( 'unmatched block filter' );
		}
	},

	/**
	 * Removes an element with a block filter if its filter does not match the
	 * selected one.
	 * @param {Element} element The element.
	 */
	processWrapperFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			element.classList.remove(
				// @ts-ignore
				contentFilterConfig.wrapperFilterClass
			);
		} else if ( !contentFilter.handleBlockFilter( element ) ) {
			contentFilter.unwrap( element );
			mw.log.warn( 'unmatched wrapper filter' );
		}
	},

	/**
	 * Removes an element, leaving its content in place.
	 * @param {Element}   element  The element to remove.
	 * @param {ChildNode} [target] The node which should be directly after the
	 *                             initial element contents, defaults to the
	 *                             initial element.
	 */
	unwrap: function ( element, target ) {
		if ( !target ) {
			target = element;
		}
		var parent = target.parentElement;
		if ( !parent ) {
			return;
		}
		parent.removeChild( element );
		var childNode = element.firstChild;
		if ( !childNode ) {
			return;
		}
		var sibling = target.previousSibling;
		if (
			childNode.nodeType === Node.TEXT_NODE &&
			sibling.nodeType === Node.TEXT_NODE
		) {
			sibling.textContent += childNode.textContent;
			childNode.remove();
		}
		childNode = element.lastChild;
		if ( !childNode ) {
			return;
		}
		if (
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
	},

	/**
	 * Removes an element with an inline filter. Also removes its related
	 * content if the element filter does not match the selected one.
	 * @param {Element} element The element.
	 */
	processInlineFilter: function ( element ) {
		var elementFilter = contentFilter.getFilter( element );
		if ( ( elementFilter & contentFilter.selectedFilter ) > 0 ) {
			contentFilter.removeElementWithoutContext( element );
		} else if ( !contentFilter.handleInlineFilter( element ) ) {
			element.classList.remove(
				// @ts-ignore
				contentFilterConfig.inlineFilterClass
			);
			mw.log.warn( 'unmatched inline filter' );
		}
	},

	/**
	 * Removes an element and its empty parents.
	 * @param {Element} element The element to remove.
	 */
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

	/**
	 * Indicates whether an element has a sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {Element} element The element.
	 * @returns True if the element has no sibling other than a comment or an
	 *          "invisible" string.
	 */
	hasSibling: function ( element ) {
		return contentFilter.hasPreviousSibling( element ) ||
		       contentFilter.hasNextSibling( element );
	},

	/**
	 * Indicates whether an element has a previous sibling. Ignores comments and
	 * "invisible" strings.
	 * @param {Element} element The element.
	 * @returns True if the element has a previous sibling other than a comment
	 *          or an "invisible" string.
	 */
	hasPreviousSibling: function ( element ) {
		var sibling = element.previousSibling;
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
	 * @param {Element} element The element.
	 * @returns True if the element has a next sibling other than a comment or
	 *          an "invisible" string.
	 */
	hasNextSibling: function ( element ) {
		var sibling = element.nextSibling;
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
	 * Removes an element with a block filter.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled properly, false otherwise.
	 */
	handleBlockFilter: function ( element ) {
		if (
			contentFilterConfig.blockFilterCustomHandler &&
			contentFilterConfig.blockFilterCustomHandler( element )
		) {
			return true;
		}

		contentFilter.removeElement( element );
		return true;
	},

	/**
	 * Removes an element with a wrapper filter.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled properly, false otherwise.
	 */
	handleWrapperFilter: function ( element ) {
		if (
			contentFilterConfig.wrapperFilterCustomHandler &&
			contentFilterConfig.wrapperFilterCustomHandler( element )
		) {
			return true;
		}

		contentFilter.removeElement( element );
		return true;
	},

	/**
	 * Removes an element with an inline filter and its related content.
	 * @param {Element} element The element to remove.
	 * @returns True if the removal has been handled properly, false otherwise.
	 */
	handleInlineFilter: function ( element ) {
		if (
			contentFilterConfig.inlineFilterCustomHandler &&
			contentFilterConfig.inlineFilterCustomHandler( element )
		) {
			return true;
		}

		var parent = element.parentElement;

		if (
			contentFilterConfig.contextFilterClass &&
			parent.classList.contains(
				contentFilterConfig.contextFilterClass
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

		if ( contentFilter.getNextText( element ) === '' ) {
			// TODO: Rework this part, and maybe remove it as it follows some
			// unintuitive rules.
			var nextElement = element.nextElementSibling;
			while (
				nextElement && (
					contentFilterConfig.skipClass &&
					nextElement.classList.contains(
						contentFilterConfig.skipClass
					) ||
					nextElement.classList.contains( 'mw-collapsible-toggle' )
				)
			) {
				nextElement = nextElement.nextElementSibling;
			}
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
		while (
			previousElement && (
				contentFilterConfig.skipClass &&
				previousElement.classList.contains(
					contentFilterConfig.skipClass
				) ||
				previousElement.classList.contains( 'mw-collapsible-toggle' )
			)
		) {
			element         = previousElement;
			previousElement = previousElement.previousElementSibling;
		}
		if (
			previousText && !previousText.endsWith( '.' ) ||
			!previousText && previousElement && previousElement.tagName !== 'BR'
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
			parent.removeChild( node );
			node = nextNode;
			if ( !node ) {
				if ( !previousElement && !previousText ) {
					contentFilter.removeElement( parent );
				}
				return true;
			}
			if ( node.nodeName === 'BR' ) {
				parent.removeChild( node );
				return true;
			}
			if (
				textContent.endsWith( '.' ) &&
				node instanceof HTMLElement &&
				node.classList.contains(
					// @ts-ignore
					contentFilterConfig.inlineFilterClass
				)
			) {
				return true;
			}
		} while ( true );
	},

	/**
	 * Removes an element. Also removes its containers and previous headings if
	 * they are empty after the element being removed.
	 * @param {Element} element The element to remove.
	 */
	removeElement: function ( element ) {
		if ( element.classList.contains( 'gallerytext' ) ) {
			while ( element.classList.contains( 'gallerybox' ) ) {
				element = element.parentElement;
			}
		}
		var parent  = element.parentElement;
		while (
			contentFilterConfig.skipClass &&
			contentFilter.hasClass(
				element.previousElementSibling,
				contentFilterConfig.skipClass
			)
		) {
			element.previousElementSibling.remove();
		}
		while (
			contentFilterConfig.skipClass &&
			contentFilter.hasClass(
				element.nextElementSibling,
				contentFilterConfig.skipClass
			)
		) {
			element.nextElementSibling.remove();
		}
		if ( element.tagName === 'TH' || element.tagName === 'TD' ) {
			contentFilter.removeTableCell( element );
			return;
		}
		if ( element.classList.contains( 'mw-headline' ) ) {
			contentFilter.removeElement( parent );
			return;
		}
		if ( element instanceof HTMLHeadingElement ) {
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
		}
		sibling = element.previousElementSibling;
		element.remove();
		contentFilter.ensureNonEmptySection( sibling );
		if ( !parent.childNodes.length ) {
			contentFilter.removeElement( parent );
		}
	},

	/**
	 * Indicates whether an element or all its children have a class.
	 * @param {Element} element   The element.
	 * @param {string}  className The class name.
	 * @returns {boolean} True if the element or all its children have the
	 *                    given class, false otherwise.
	 */
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

	/**
	 * Handles the removal of a table cell, from clearing it to removing the
	 * entire table depending to the situation.
	 * @param {Element} cell The <th/td> element.
	 */
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
			// TODO: fix with mw-collapsible & sortable
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

		var mainColumn = contentFilterConfig.mainColumnClassIntro &&
			contentFilter.findClassStartingWith(
				table,
				contentFilterConfig.mainColumnClassIntro
			) || 1;
		if ( +mainColumn === column + 1 ) {
			if ( tbody.children.length === 1 ) {
				contentFilter.removeElement( table );
				return;
			}
			tbody.removeChild( row );
			return;
		}

		if (
			contentFilterConfig.listTableClass &&
			table.classList.contains( contentFilterConfig.listTableClass )
		) {
			row.removeChild( cell );
			return;
		}
		while ( cell.firstChild ) {
			cell.removeChild( cell.firstChild );
		}
	},

	/**
	 * Recursively removes an element if it is a heading and its associated
	 * section is empty. Also updates the table of contents.
	 * @param {Element} element The element.
	 */
	ensureNonEmptySection: function ( element ) {
		if ( !element ) {
			return;
		}
		while ( !( element instanceof HTMLHeadingElement ) ) {
			if (
				!contentFilterConfig.inContentAddClass ||
				!element.classList.contains(
					contentFilterConfig.inContentAddClass
				)
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

	/**
	 * Removes a row (associated to a removed heading element) from the
	 * table of contents, then updates the numbering of the following rows.
	 * @param {string} id The ID of the removed heading element.
	 * @returns True if a row has been removed from the table of contents, false
	 *          if the table of contents has not been defined or if there is no
	 *          associated row.
	 */
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

	/**
	 * Gets the level of a heading element.
	 * @param {Element} heading The heading element.
	 * @returns The level of the heading element.
	 */
	getHeadingLevel: function ( heading ) {
		return +heading.tagName.substr( 1 );
	},

	/**
	 * Indicates whether an element would be the first below a section defined
	 * with a previous heading element.
	 * @param {Element} element      The element.
	 * @param {number}  headingLevel The level of the last heading element.
	 * @returns True if the element is missing, defines a new section with a
	 * 	        higher or same level, or is the end of the page content.
	 */
	isOutOfSection: function ( element, headingLevel ) {
		return !element ||
		       element instanceof HTMLHeadingElement &&
		       headingLevel >= contentFilter.getHeadingLevel( element ) ||
		       contentFilterConfig.contentEndClass &&
		       element.classList.contains(
			       contentFilterConfig.contentEndClass
		       );
	},

	/**
	 * Removes nodes before a node while they do not have the given node name.
	 * @param {ChildNode} node         The node.
	 * @param {string}    nodeName     The node name.
	 * @param {boolean}   [removeLast] If the last node (with the given name)
	 *                                 should also be removed.
	 */
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

	/**
	 * Removes nodes after a node while they do not have the given node name.
	 * @param {ChildNode} node         The node.
	 * @param {string}    nodeName     The node name.
	 * @param {boolean}   [removeLast] If the last node (with the given name)
	 *                                 should also be removed.
	 */
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

	/**
	 * Removes nodes before a node while they do not contain the given text.
	 * @param {ChildNode} node         The node.
	 * @param {string}    text 	       The searched text.
	 * @param {boolean}   [removeText] If the searched text should also be
	 *                                 removed from the last node.
	 */
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
		if ( sibling.textContent === '' ) {
			sibling.remove();
		}
	},
	
	/**
	 * Removes nodes after a node while they do not contain the given text.
	 * @param {ChildNode} node         The node.
	 * @param {string}    text 	       The searched text.
	 * @param {boolean}   [removeText] If the searched text should also be
	 *                                 removed from the last node.
	 */
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
		if ( sibling.textContent === '' ) {
			sibling.remove();
		}
	},

	/**
	 * Gets the text from the text node before a DOM element.
	 * @param {Element} element The element.
	 */
	getPreviousText: function ( element ) {
		var previousNode = element.previousSibling;
		return previousNode instanceof Text && previousNode.textContent ?
			previousNode.textContent.trim() :
			'';
	},

	/**
	 * Gets the text from the text node after a DOM element.
	 * @param {Element} element The element.
	 */
	getNextText: function ( element ) {
		var nextNode = element.nextSibling;
		return nextNode instanceof Text && nextNode.textContent ?
			nextNode.textContent.trim() :
			'';
	},

	/**
	 * Updates the selected filter form item.
	 */
	updateSelectedFilterItem: function () {
		delete contentFilter.uri.query[ contentFilterConfig.urlParam ];
		var item = contentFilter.items[ contentFilter.selectedIndex ];
		item.classList.add( 'content-filter-item-active' );
		item.firstElementChild.setAttribute(
			'href',
			contentFilter.uri.toString()
		);
	},

	/**
	 * Adds a corresponding filter URL parameter to anchors where none is
	 * used.
	 */
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
			if ( uri.query[ contentFilterConfig.urlParam ] ) {
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
				!contentFilterConfig.filteredNamespaces.includes(
					title.getNamespaceId()
				) &&
				!contentFilterConfig.filteredSpecialTitles.includes(
					title.getPrefixedText()
				)
			) {
				continue;
			}
			var obj = {};
			obj[ contentFilterConfig.urlParam ] = contentFilter.selectedIndex;
			uri.extend( obj );
			anchor.href = uri.toString();
		}
	}
};

$( contentFilter.init );