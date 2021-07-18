/**
 * Wiki-wise configuration of the content filter.
 */
window.contentFilterConfig = {

	/**
	 * The title displayed on top of the buttons.
	 */
	title: 'Filter content',

	/**
	 * The list of available filters, each one being the description of the
	 * corresponding filter.
	 */
	filters: [
		/* 0001 */ 'Hide content unavailable with Rebirth',
		/* 0010 */ 'Hide content unavailable with Afterbirth',
		/* 0100 */ 'Hide content unavailable with Afterbirth+',
		/* 1000 */ 'Hide content unavailable with Repentance'
	],

	/**
	 * The namespaces where the filtering should be available.
	 */
	filteredNamespaces: [ 0, 2 ],

	/**
	 * The pages where the filtering should be available, if they are not from a
	 * namespace where the filtering is available.
	 */
	filteredSpecialTitles: [
		'Special:Random'
	],

	/**
	 * If an element on a page has this class (directly on the page or
	 * transcluded), the filtering becomes available, even if the page is not
	 * from a namespace in filteredNamespaces or in filteredSpecialTitles.
	 * Use false to disable this functionality.
	 */
	filterEnableClass: 'content-filter-enable',

	/**
	 * The language codes used on the wiki.
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
	 */
	messagesLocation: 'mediawiki:gadget-dlc-filter/',

	/**
	 * The name of the URL parameter used to store the selected filter.
	 */
	urlParam: 'dlcfilter',

	/**
	 * If an element with this ID is on a page (directly on the page or
	 * transcluded), it will be filled with the "info" message (see the
	 * messagesLocation parameter) followed by the filter buttons. These will
	 * then not appear on the page header.
	 * Use false to disable this functionality.
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
	 */
    filterClassIntro: 'dlc-',

	/**
	 * This class can be used on elements to indicate that they should be
	 * removed entirely if the selected filter does not match the element
	 * bitmask, and left in place otherwise.
	 * Use false to disable this functionality.
	 */
	blockFilterClass: false,

	/**
	 * This class can be used on elements to indicate that they should be
	 * unwrapped if the selected filter does not match the element bitmask
	 * (the element itself is removed, its content is left in place), and left
	 * in place otherwise.
	 * Use false to disable this functionality.
	 */
	wrapperFilterClass: false,

	/**
	 * This class can be used on elements to indicate that they should be
	 * removed if any filter is enabled. Their associated content is then
	 * removed if the selected filter does not match the element bitmask, and
	 * left in place otherwise.
	 * Use false to disable this functionality.
	 */
	inlineFilterClass: 'dlc',

	/**
	 * If an element with a filter bitmask class is inside an element with this
	 * class, the corresponding bitmask is applied to the surrounding section.
	 * If the element is not in a section, then the bitmask is applied to the
	 * entire page: the filter buttons not matching the bitmask are disabled.
	 * Use false to disable this functionality.
	 */
	contextFilterClass: 'context-box',

	/**
	 * This class can be used on elements to make them invisible to filtering:
	 * the script will go through them when trying to remove elements. For
	 * instance, the button used to collapse tables (.mw-collapsible-toggle) is
	 * skipped by default.
	 * Use false to disable this functionality.
	 */
	skipClass: 'content-filter-skip',

	/**
	 * If a page has navigation bars or elements considered out of the page
	 * content at the bottom of the page, using this class on at least the first
	 * one will prevent these elements from being removed with a previous
	 * section (see contextFilterClass).
	 * Use false to disable this functionality.
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
	 */
	mainColumnClassIntro: 'content-filter-main-column-',

	/**
	 * If a table has this class, its cells can be removed (instead of being
	 * only cleared), the following cells on the column will then be shifted.
	 * Use false to disable this functionality.
	 */
	listTableClass: 'content-filter-list',

	/**
	 * This class works the same way as skipClass, except that the element will
	 * be put back on the page somewhere else if it has to be removed.
	 * Use false to disable this functionality.
	 */
	inContentAddClass: false,

	/**
	 * Removes an element with a block filter, following custom rules.
	 * @param element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	blockFilterCustomHandler: function ( element ) {
		return false;
	},

	/**
	 * Removes an element with a wrapper filter, following custom rules.
	 * @param element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	wrapperFilterCustomHandler: function ( element ) {
		return false;
	},

	/**
	 * Removes an element with an inline filter and its related content,
	 * following custom rules.
	 * @param element The element to remove.
	 * @returns True if the removal has been handled by this function, false if
	 *          it should be handled the default way.
	 */
	inlineFilterCustomHandler: function ( element ) {
		return handleItemDictionary.call( this, element ) ||
		       handleInnerList.call( this, element ) ||
		       handleNavListVertical.call( this, element );
	},

	/**
	 * Does things before removing elements from a container.
	 * @param container The container to remove elements from.
	 */
	preprocess: function ( container ) {
		preprocessItemDictionaries.call( this, container );
	},

	/**
	 * Does things after removing elements from a container.
	 * @param container The container to remove elements from.
	 */
	postprocess: function ( container ) {
		postprocessItemDictionaries.call( this, container );
		postprocessCategoryNavs.call( this, container );
		postprocessListNavs.call( this, container );
	}
};



/**
 * Removes an element with an inline filter and its related content in a list
 * using items as a key.
 * @this {contentFilter}
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
		this.removeElement( li );
		return true;
	case DictKeyType.FIRST_ALTERNATIVE:
		while ( element.previousSibling ) {
			element.previousSibling.remove();
		}
		this.removeNextNodeUntilText( element, '/', true );
		element.remove();
		return true;
	case DictKeyType.ALTERNATIVE:
		this.removePreviousNodeUntilText( element, '/', true );
		this.removeNextNodeUntilText( element, '/' );
		element.remove();
		break;
	case DictKeyType.LAST_ALTERNATIVE:
		this.removePreviousNodeUntilText( element, '/', true );
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
	var slashIndex = -1,
		plusIndex  = -1,
		keyType    = DictKeyType.UNIQUE;
	if ( sibling ) {
		slashIndex = sibling.textContent.lastIndexOf( '/' );
		plusIndex  = sibling.textContent.lastIndexOf( '+' );
		keyType    = slashIndex === -1 ||
			plusIndex > slashIndex ?
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
		slashIndex = sibling.textContent.indexOf( '/' );
		plusIndex  = sibling.textContent.indexOf( '+' );
		keyType    = slashIndex === -1 ||
			plusIndex !== -1 && plusIndex < slashIndex ?
				DictKeyType.COMBINED :
				DictKeyType.LAST_ALTERNATIVE;
	}
	return keyType;
}

/**
 * 
 * @this {contentFilter}
 * @param {Element} element The element to remove.
 * @returns True if the removal has been handled by this function, false if
 *          it should be handled the default way.
 */
function handleInnerList( element ) {
	if ( this.hasPreviousSibling( element ) ) {
		return false;
	}
	var parent = element.parentElement;
	if ( parent.tagName !== 'LI' || parent.childNodes.length === 1 ) {
		return false;
	}
	var innerList = parent.lastElementChild;
	if ( !innerList || innerList.tagName !== 'UL' ) {
		return false;
	}
	var filter  = this.getFilter( element ),
		sibling = innerList.previousSibling,
		lis     = innerList.children;
	while ( sibling ) {
		sibling.remove();
		sibling = innerList.previousSibling;
	}
	var upperBound = this.getFilterMax() + 1;
	for ( var i = 0; i < lis.length; ) {
		var li    = lis.item( i ),
			child = li.firstChild;
		while ( this.isGhostNode( child ) ) {
			child = child.nextSibling;
		}
		if ( child instanceof Element ) {
			var childFilter = this.getFilter( child );
			if (
				childFilter > 0 &&
				!haveSimilarBits( upperBound, filter, childFilter )
			) {
				++i;
				continue;
			}
		}
		li.remove();
	}
	if ( lis.length ) {
		this.unwrap( lis.item( 0 ), innerList );
	} else {
		this.removeElement( parent );
	}
	return true;
}

/**
 * Indicates whether two filters have at least one same bit as 1.
 * @param {number} upperBound The higher bit a filter can use.
 * @param {number} fst        The first filter.
 * @param {number} snd        The second filter.
 * @returns True if the two filters are not complementary, false otherwise.
 */
function haveSimilarBits( upperBound, fst, snd ) {
	for ( var i = upperBound; i > 0; i /= 2 ) {
		if ( fst >= i ) {
			if ( snd >= i ) {
				return true;
			}
			fst -= i;
		} else if ( snd >= i ) {
			snd -= i;
		}
	}
	return false;
}

/**
 * Removes a DLC icon and its related content in a vertical list navigation.
 * @this {contentFilter}
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
 * @this {contentFilter}
 * @param {Element} container 
 */
function preprocessItemDictionaries( container ) {
	var headings   = container.querySelectorAll( 'h2, h3, h4, h5, h6' ),
		preprocess = preprocessItemDictionary.bind( this );
	for ( var i = 0; i < headings.length; ++i ) {
		var headlines = headings[ i ]
			.getElementsByClassName( 'mw-headline' );
		if (
			headlines.length &&
			headlines[ 0 ].textContent.match( 'Synergies|Interactions' )
		) {
			var headingLevel = this.getHeadingLevel( headings[ i ] ),
				nextElement  = headings[ i ].nextElementSibling;
			while ( !this.isOutOfSection( nextElement, headingLevel ) ) {
				if ( nextElement.tagName === 'UL' ) {
					preprocess( nextElement );
				}
				nextElement = nextElement.nextElementSibling;
			}
		}
	}
}

/**
 * 
 * @this {contentFilter}
 * @param {Element} ul 
 */
function preprocessItemDictionary( ul ) {
	var lis           = ul.children,
		keySpanBase   = document.createElement( 'span' ),
		valueSpanBase = document.createElement( 'span' );
	ul.classList.add( 'dlc-filter-dict' );
	keySpanBase.classList.add( 'dlc-filter-dict-key' );
	valueSpanBase.classList.add( 'dlc-filter-dict-value' );
	for ( var i = 0; i < lis.length; ++i ) {
		var li = lis.item( i );
		if ( li.tagName !== 'LI' ) {
			continue;
		}
		var keySpan   = keySpanBase.cloneNode( true ),
			valueSpan = valueSpanBase.cloneNode( true ),
			node      = li.firstChild;
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
		node.textContent = node.textContent.substr( colonIndex + 1 );
		var lastNode    = li.lastChild,
			lastElement = li.lastElementChild;
		if ( lastElement && lastElement.tagName === 'UL' ) {
			lastElement.classList.add( 'dlc-filter-dict-inner' );
			lastNode = lastElement.previousSibling;
		}
		while ( node ) {
			valueSpan.append( node );
			if ( node === lastNode ) {
				break;
			}
			node = li.firstChild;
		}
		li.prepend( keySpan, document.createTextNode( ':' ), valueSpan );
	}
}

/**
 * 
 * @this {contentFilter}
 * @param {Element} container 
 */
function postprocessItemDictionaries( container ) {
	var uls = container.getElementsByClassName( 'dlc-filter-dict' );
	while ( uls.length ) {
		for (
			var li = uls.item( 0 ).firstElementChild;
			li;
			li = li.nextElementSibling
		) {
			var keys   = li.getElementsByClassName( 'dlc-filter-dict-key' ),
				values = li.getElementsByClassName( 'dlc-filter-dict-value' );
			this.unwrap( keys.item( 0 ) );
			if ( values.length ) {
				this.unwrap( values.item( 0 ) );
				continue;
			}
			var subdicts = li.getElementsByClassName( 'dlc-filter-dict-inner' );
			if ( !subdicts.length ) {
				continue;
			}
			var subdict = subdicts.item( 0 ),
				firstLi = subdict.getElementsByTagName( 'li' ).item( 0 );
			this.unwrap( firstLi, subdict );
			if ( !subdict.firstElementChild ) {
				subdict.remove();
			} else {
				subdict.classList.remove( 'dlc-filter-inner' );
			}
		}
		uls.item( 0 ).classList.remove( 'dlc-filter-dict' );
	}
}

/**
 * Remove empty "category" navs.
 * @this {contentFilter}
 * @param {Element} container 
 */
function postprocessCategoryNavs( container ) {
	var navs = container.getElementsByClassName( 'nav-category' );
	for ( var i = 0; i < navs.length; ++i ) {
		if ( navs[ i ].classList.contains( 'nav-list-vertical' ) ) {
			continue;
		}
		var row = navs[ i ].children[ 1 ];
		if ( !row ) {
			this.removeElement( navs[ i ] );
		}
		var nextRow = row.nextElementSibling;
		while ( nextRow ) {
			if ( nextRow.tagName === 'P' ) {
				row.remove();
			} else {
				nextRow = nextRow.nextElementSibling;
				if ( !nextRow ) {
					break;
				}
			}
			row     = nextRow;
			nextRow = nextRow.nextElementSibling;
		}
		row.remove();
	}
}

/**
 * Merge cells of list navs, the DLC icons being removed.
 * @this {contentFilter}
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

/*importArticle( {
    type: 'script',
    article: 'u:bindingofisaacrebirth:MediaWiki:Gadget-content-filter/code.js'
} );*/

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
		if ( config.title ) {
			var title = document.createElement( 'div' );
			title.id        = 'content-filter-title';
			title.innerHTML = config.title;
			ul.appendChild( title );
		}
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