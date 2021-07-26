/**
 * Wiki-wise configuration of the content filter.
 */
window.contentFilterConfig = {

	/**
	 * The title displayed on top of the buttons.
	 */
	title: 'Filter content',

	/**
	 * The number of filtering layers (bits) used on pages.
	 */
	filterCount: 4, // max filter = 15 (1111)

	/**
	 * The list of available filters, each one being its numeric filter, its
	 * displayed title (it can be a simple string or an URL to an image) and
	 * a description of the corresponding filter.
	 * Use false instead of an object to deactivate a filter and keep URL
	 * compatibility.
	 * Use false as filter description to not show any description.
	 */
	filters: [
		{
			filter: 1, // 0001
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/2/25/Dlc_na_indicator.png/revision/latest',
			description: 'Hide content unavailable with Rebirth'
		},
		{
			filter: 2, // 0010
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/9/95/Dlc_a_indicator.png/revision/latest',
			description: 'Hide content unavailable with Afterbirth'
		},
		{
			filter: 4, // 0100
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/4/4c/Dlc_a†_indicator.png/revision/latest',
			description: 'Hide content unavailable with Afterbirth+'
		},
		{
			filter: 8, // 1000
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/f/f2/Dlc_r_indicator.png/revision/latest',
			description: 'Hide content unavailable with Repentance'
		}
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
	 * The list of filter types. Each filter type can be used on an element by
	 * adding its corresponding class to it, and is handled depending on its
	 * mode:
	 *  - an element with a "block" type is removed entirely if the selected
	 *    filter does not match the one of the element, and left in place
	 *    otherwise.
	 *  - an element with a "wrapper" type is unwrapped if the selected filter
	 *    does not match the one of the element (the element itself is removed,
	 *    its content is left in place), and left in place otherwise.
	 *  - an element with an "inline" type is removed if any filter is enabled.
	 *    Their associated content is then removed if the selected filter does
	 *    not match the one of the element, and left in place otherwise.
	 * The default removal rules for an element can be overriden with a custom
	 * handling function.
	 * It is also possible to "fix" a numeric filter to a type. For example, if
	 * the value filterClassIntro is 'filter-' and the following type is
	 * defined:
	 * 
	 *     {
	 *         class: 'simple-filter',
	 *         fixed: 2,
	 *         …
	 *     }
	 * 
	 * the use of the "filter-2" class would be optional, the two following
	 * cases would give the same result:
	 * 
	 *     <img class="simple-filter filter-2" />
	 *     <img class="simple-filter" />
	 * 
	 * Use false as fixed filter to use a numeric filter class instead of a
	 * fixed numeric filter.
	 */
	filterTypes: [
		{
			class: 'dlc',
			fixed: false,
			mode: 'inline',
			customHandler: function ( element ) {
				return handleItemDictionary.call( this, element ) ||
					   handleInnerList.call( this, element ) ||
					   handleNavListVertical.call( this, element );
			}
		}
	],

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
	var filter = this.getFilter( element );
	if ( filter === false ) {
		return false;
	}
	var sibling = innerList.previousSibling,
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
				childFilter &&
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

/** @type {(msg:string)=>void} */
var log = null;
/** @type {(msg:string)=>void} */
var warn = null;
/** @type {(msg:string)=>void} */
var error = null;

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
	version: '1.4',
	applyFilterLimit: 10,

	parserOutput: null,
	toc: null,
	items: [],

	api: null,
	currentUri: null,
	defaultUri: null,

	pageFilter: 0,
	selectedIndex: -1,
	selectedFilter: 0,

	postponed: [],

	init: function () {
		log   = console.log;
		warn  = mw.log.warn;
		error = mw.log.error;

		log( 'Content Filter v' + contentFilter.version );

		if ( window.contentFilterUtil && !window.contentFilterUtil.loaded ) {
			error(
				'Content Filter: Another instance of the script is already ' +
				'running. Please wait for it to finish before running it again.'
			);
			return;
		}

		config = Object.freeze( contentFilter.getConfig() );
		if ( !config ) {
			return;
		}

		util.getFilterMax = contentFilter.getFilterMax;
		util.getFilter    = contentFilter.getFilter;
		window.contentFilterUtil = util;

		if ( !contentFilter.isFilteringAvailable() ) {
			util.loaded = true;
			return;
		}

		var contentText = document.getElementById( 'mw-content-text' );
		contentFilter.parserOutput = contentText &&
			contentText.getElementsByClassName( 'mw-parser-output' )[ 0 ];
		contentFilter.toc          = document.getElementById( 'toc' );
		contentFilter.api          = new mw.Api();
		contentFilter.currentUri   = new mw.Uri( document.location.href );
		contentFilter.defaultUri   = new mw.Uri();
		contentFilter.pageFilter   = contentFilter.getPageFilter();

		contentFilter.generateFilterItems();
		contentFilter.insertFilterElement();

		if ( !contentFilter.updateSelectedIndex() ) {
			util.loaded = true;
			return;
		}

		contentFilter.selectedFilter = Math.pow(
			2, contentFilter.selectedIndex
		);
		util.selectedFilter = contentFilter.selectedFilter;
		util.applyFilter    = contentFilter.applyFilter;

		contentFilter.updateSelectedFilterItem();
		contentFilter.applyFilter( contentFilter.parserOutput );
		contentFilter.updateAnchorsFilter();

		util.loaded = true;
	},

	isInteger: function ( value, min, max ) {
		return typeof value === 'number' &&
			!isNaN( value ) &&
			( value | 0 ) === value &&
			( min === undefined || value >= min ) &&
			( max === undefined || value <= max );
	},

	getConfig: function () {
		var config     = window.contentFilterConfig,
			errorFound = false;
		if ( typeof config !== 'object' ) {
			error(
				'Content Filter: The configuration object is undefined. ' +
				'Please define a contentFilterConfig object this script ' +
				'would have access to.'
			);
			return null;
		}
		config = contentFilter.merge( config, {
			title: false,
			filters: [],
			filteredNamespaces: [],
			filteredSpecialTitles: [],
			filterEnableClass: false,
			languageCodes: [],
			messagesLocation: '',
			filtersInfoId: false,
			filterTypes: [],
			contextFilterClass: false,
			skipClass: false,
			contentEndClass: false,
			mainColumnClassIntro: false,
			listTableClass: false,
			inContentAddClass: false,
			preprocess: function () {},
			postprocess: function () {}
		} );

		// title
		if ( typeof config.title !== 'string' && config.title !== false ) {
			warn(
				'Content Filter: The "title" configuration parameter is ' +
				'neither a string or false.'
			);
			config.title = false;
		}
		// filterCount
		if ( !contentFilter.isInteger( config.filterCount, 1 ) ) {
			error(
				'Content Filter: The "filterCount" configuration parameter ' +
				'is not a natural number.'
			);
			return null;
		}
		// filters
		if ( !Array.isArray( config.filters ) ) {
			warn(
				'Content Filter: The "filters" configuration parameter is ' +
				'not an array.'
			);
			config.filters = [];
		}
		var filterMax = Math.pow( 2, config.filterCount ) - 1;
		for ( var i = config.filters.length - 1; i >= 0; --i ) {
			var filter = config.filters[ i ];
			if ( filter === false ) {
				continue;
			}
			if ( typeof filter !== 'object' ) {
				warn(
					'Content Filter: The index ' + i + ' of the "filters" ' +
					'configuration parameter is not an object.'
				);
				config.filters[ i ] = false;
				continue;
			}
			filter = contentFilter.merge( filter, {
				description: false
			} );
			if ( !contentFilter.isInteger( filter.filter, 0, filterMax ) ) {
				warn(
					'Content Filter: The "filter" parameter of the index ' + i +
					' of the "filters" configuration parameter is not a ' +
					'valid numeric filter.'
				);
				config.filters[ i ] = false;
				continue;
			}
			if ( typeof filter.title !== 'string' ) {
				warn(
					'Content Filter: The "title" parameter of the index ' + i +
					' of the "filters" configuration parameter is not a string.'
				);
				config.filters[ i ] = false;
				continue;
			}
			if (
				typeof filter.description !== 'string' &&
				filter.description !== false
			) {
				warn(
					'Content Filter: The "description" parameter of the ' +
					'index ' + i + ' of the "filters" configuration ' +
					'parameter is neither a string or false.'
				);
				filter.description = false;
				continue;
			}
			config.filters[ i ] = filter;
		}
		// filteredNamespaces
		if ( !Array.isArray( config.filteredNamespaces ) ) {
			warn(
				'Content Filter: The "filteredNamespaces" configuration ' +
				'parameter is not an array.'
			);
			config.filteredNamespaces = [];
		}
		for ( i = config.filteredNamespaces.length - 1; i >= 0; --i ) {
			var filteredNamespace = config.filteredNamespaces[ i ];
			if (
				typeof filteredNamespace !== 'number' ||
				!mw.config.get( 'wgFormattedNamespaces' )
					.hasOwnProperty( filteredNamespace )
			) {
				warn(
					'Content Filter: The index ' + i + ' of the ' +
					'"filteredNamespaces" configuration parameter is not a ' +
					'valid namespace number.'
				);
				config.filteredNamespaces.splice( i, 1 );
			}
		}
		// filteredSpecialTitles
		if ( !Array.isArray( config.filteredSpecialTitles ) ) {
			warn(
				'Content Filter: The "filteredSpecialTitles" configuration ' +
				'parameter is not an array.'
			);
			config.filteredSpecialTitles = [];
		}
		for ( i = config.filteredSpecialTitles.length - 1; i >= 0; --i ) {
			var filteredSpecialTitle = config.filteredSpecialTitles[ i ];
			if ( typeof filteredSpecialTitle !== 'string' ) {
				warn(
					'Content Filter: The index ' + i + ' of the ' +
					'"filteredSpecialTitles" configuration parameter is not ' +
					'a valid namespace number.'
				);
				config.filteredSpecialTitles.splice( i, 1 );
			}
		}
		// filterEnableClass
		if (
			typeof config.filterEnableClass !== 'string' &&
			config.filterEnableClass !== false
		) {
			warn(
				'Content Filter: The "filterEnableClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.filterEnableClass = false;
		}
		// languageCodes
		if ( !Array.isArray( config.languageCodes ) ) {
			warn(
				'Content Filter: The "languageCodes" configuration parameter ' +
				'is not an array.'
			);
			config.languageCodes = [];
		}
		for ( i = config.languageCodes.length - 1; i >= 0; --i ) {
			var languageCode = config.languageCodes[ i ];
			if ( typeof languageCode !== 'string' ) {
				warn(
					'Content Filter: The index ' + i + ' of the ' +
					'"languageCodes" configuration parameter is not a string.'
				);
				config.languageCodes.splice( i, 1 );
			}
		}
		// messagesLocation
		if ( typeof config.messagesLocation !== 'string' ) {
			error(
				'Content Filter: The "messagesLocation" configuration ' +
				'parameter is not a string.'
			);
			errorFound = true;
		}
		// urlParam
		if ( typeof config.urlParam !== 'string' ) {
			error(
				'Content Filter: The "urlParam" configuration parameter is ' +
				'not a string.'
			);
			errorFound = true;
		}
		// filtersInfoId
		if (
			typeof config.filtersInfoId !== 'string' &&
			config.filtersInfoId !== false
		) {
			warn(
				'Content Filter: The "filtersInfoId" configuration parameter ' +
				'is neither a string or false.'
			);
			config.filtersInfoId = false;
		}
		// filterClassIntro
		if ( typeof config.filterClassIntro !== 'string' ) {
			error(
				'Content Filter: The "filterClassIntro" configuration ' +
				'parameter is not a string.'
			);
			errorFound = true;
		}
		// filterTypes
		if ( !Array.isArray( config.filterTypes ) ) {
			warn(
				'Content Filter: The "filterTypes" configuration parameter ' +
				'is not an array.'
			);
			config.filterTypes = [];
		}
		for ( i = config.filterTypes.length - 1; i >= 0; --i ) {
			var filterType = config.filterTypes[ i ];
			if ( typeof filterType !== 'object' ) {
				warn(
					'Content Filter: The index ' + i + ' of the ' +
					'"filterTypes" configuration parameter is not an object.'
				);
				config.filterTypes.splice( i, 1 );
				continue;
			}
			filterType = contentFilter.merge( filterType, {
				class: undefined,
				fixed: false,
				mode: undefined,
				customHandler: false
			} );
			if ( typeof filterType.class !== 'string' ) {
				warn(
					'Content Filter: The "class" parameter of the index ' + i +
					' of the "filterTypes" configuration parameter is not a ' +
					'string.'
				);
				config.filterTypes.splice( i, 1 );
				continue;
			}
			if (
				!contentFilter.isInteger( filterType.fixed, 0, filterMax ) &&
				filterType.fixed !== false
			) {
				warn(
					'Content Filter: The "class" parameter of the index ' + i +
					' of the "filterTypes" configuration parameter is not a ' +
					'string.'
				);
				// using "filterType.fixed = false;" would output a lot of
				// warnings to the console and could interrupt element removals.
				config.filterTypes.splice( i, 1 );
				continue;
			}
			if (
				filterType.mode !== 'block' &&
				filterType.mode !== 'wrapper' &&
				filterType.mode !== 'inline'
			) {
				warn(
					'Content Filter: The "mode" parameter of the index ' + i +
					' of the "filterTypes" configuration parameter is not a ' +
					'valid filter type mode.'
				);
				config.filterTypes.splice( i, 1 );
				continue;
			}
			if (
				typeof filterType.customHandler !== 'function' &&
				filterType.customHandler !== false
			) {
				warn(
					'Content Filter: The "customHandler" parameter of the ' +
					'index ' + i + ' of the "filterTypes" configuration ' +
					'parameter is not a function.'
				);
				// using "filterType.customHandler = false;" could cause
				// unwanted removals and affect content readability.
				config.filterTypes.splice( i, 1 );
				continue;
			}
			config.filterTypes[ i ] = filterType;
		}
		// contextFilterClass
		if (
			typeof config.contextFilterClass !== 'string' &&
			config.contextFilterClass !== false
		) {
			warn(
				'Content Filter: The "contextFilterClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.contextFilterClass = false;
		}
		// skipClass
		if (
			typeof config.skipClass !== 'string' &&
			config.skipClass !== false
		) {
			warn(
				'Content Filter: The "skipClass" configuration parameter is ' +
				'neither a string or false.'
			);
			config.skipClass = false;
		}
		// contentEndClass
		if (
			typeof config.contentEndClass !== 'string' &&
			config.contentEndClass !== false
		) {
			warn(
				'Content Filter: The "contentEndClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.contentEndClass = false;
		}
		// mainColumnClassIntro
		if (
			typeof config.mainColumnClassIntro !== 'string' &&
			config.mainColumnClassIntro !== false
		) {
			warn(
				'Content Filter: The "mainColumnClassIntro" configuration ' +
				'parameter is neither a string or false.'
			);
			config.mainColumnClassIntro = false;
		}
		// listTableClass
		if (
			typeof config.listTableClass !== 'string' &&
			config.listTableClass !== false
		) {
			warn(
				'Content Filter: The "listTableClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.listTableClass = false;
		}
		// inContentAddClass
		if (
			typeof config.inContentAddClass !== 'string' &&
			config.inContentAddClass !== false
		) {
			warn(
				'Content Filter: The "inContentAddClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.inContentAddClass = false;
		}
		// preprocess
		if ( typeof config.preprocess !== 'function' ) {
			warn(
				'Content Filter: The "preprocess" configuration parameter ' +
				'is not a function.'
			);
			config.preprocess = function () {};
		}
		// postprocess
		if ( typeof config.postprocess !== 'function' ) {
			warn(
				'Content Filter: The "postprocess" configuration parameter ' +
				'is not a function.'
			);
			config.postprocess = function () {};
		}
		return errorFound ? null : config;
	},

	merge: function ( fst, snd ) {
		/** @type {any} */
		var obj = {};
		for ( var i in fst ) {
			if (
				i === '__proto__' ||
				i === 'constuctor' && typeof fst[ i ] === 'function'
			) {
				continue;
			}
			obj[ i ] = fst[ i ];
		}
		for ( var j in snd ) {
			if (
				j === '__proto__' ||
				j === 'constuctor' && typeof snd[ j ] === 'function' ||
				obj[ j ] !== undefined
			) {
				continue;
			}
			obj[ j ] = snd[ j ];
		}
		return obj;
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
		for ( var i = 0; i < contextBoxes.length; ++i ) {
			var contextBox = contextBoxes[ i ];
			if ( contentFilter.getPreviousHeading( contextBox ) ) {
				break;
			}
			for ( var j = 0; j < config.filterTypes.length; ++j ) {
				var filterType = config.filterTypes[ j ],
					filter     = contentFilter.getFilter( contextBox ),
					children   = contextBox.getElementsByClassName(
						filterType.class
					);
				if ( contextBox.classList.contains( filterType.class ) ) {
					if ( filterType.fixed !== false ) {
						return filterType.fixed;
					}
					if ( filter !== false ) {
						return filter;
					}
				}
				if ( filterType.fixed !== false ) {
					if ( children.length ) {
						return filterType.fixed;
					}
					continue;
				}
				for ( var k = 0; k < children.length; ++k ) {
					filter = contentFilter.getFilter( children[ k ] );
					if ( filter !== false ) {
						return filter;
					}
				}
			}
		}
		return contentFilter.getFilterMax();
	},

	getPreviousHeading: function ( element ) {
		element = element.previousElementSibling;
		while ( element && !( element instanceof HTMLHeadingElement ) ) {
			element = element.previousElementSibling;
		}
		return element;
	},

	getFilterMax: function () {
		return Math.pow( 2, config.filterCount ) - 1;
	},

	getFilter: function ( element ) {
		var filterClass = contentFilter.findClassStartingWith(
			element,
			config.filterClassIntro
		);
		if ( filterClass === null ) {
			return false;
		}
		var filter = +filterClass;
		return +filter < 0 ? false : +filter;
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
		var itemBase = document.createElement( 'li' ),
			aBase    = document.createElement( 'a' ),
			imgBase  = document.createElement( 'img' );
		itemBase.classList.add( 'content-filter-item' );
		imgBase.loading = 'eager';
		for ( var i = 0; i < config.filters.length; ++i ) {
			var filter = config.filters[ i ];
			if ( !filter ) {
				contentFilter.items.push( null );
				continue;
			}
			var item   = itemBase.cloneNode( true );
			/** @type {HTMLElement} */
			var target = item;
			item.id = 'content-filter-item-' + i;
			if ( filter.filter & contentFilter.pageFilter ) {
				if ( filter.description ) {
					item.title = filter.description;
				}
				/** @type {{[k:string]:number}} */
				var obj = {},
					a   = aBase.cloneNode( true );
				obj[ config.urlParam ] = i;
				contentFilter.currentUri.extend( obj );
				a.href = contentFilter.currentUri.toString();
				item.appendChild( a );
				target = a;
			} else {
				item.classList.add( 'content-filter-item-deactivated' );
			}
			if ( contentFilter.isUrl( filter.title ) ) {
				var img = imgBase.cloneNode( true );
				img.src = filter.title;
				target.appendChild( img );
			} else {
				target.textContent = filter.title;
			}
			contentFilter.items.push( item );
		}
	},

	/**
	 * Indicates whether a string is a valid URL.
	 * @param str The string to test.
	 * @returns True if the given string is a valid URL, false otherwise.
	 */
	isUrl: function ( str ) {
		try {
			var uri = new mw.Uri( str );
			return uri.toString() !== contentFilter.defaultUri.toString() &&
				   ( uri.protocol === 'http' || uri.protocol === 'https' );
		} catch ( _ ) {
			return false;
		}
	},

	insertFilterElement: function () {
		var ul = document.createElement( 'ul' );
		ul.id = 'content-filter';
		for ( var i = 0; i < contentFilter.items.length; ++i ) {
			if ( contentFilter.items[ i ] ) {
				ul.appendChild( contentFilter.items[ i ] );
			}
		}
		var info = config.filtersInfoId &&
			document.getElementById( config.filtersInfoId );
		if ( !info ) {
			if ( config.title ) {
				var title = document.createElement( 'div' );
				title.id          = 'content-filter-title';
				title.textContent = config.title;
				ul.appendChild( title );
			}
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
			!contentFilter.isIndex(
				contentFilter.selectedIndex,
				contentFilter.items
			)
		) {
			contentFilter.selectedIndex = -1;
			error(
				'Content Filter: The selected numeric filter (' + urlParam +
				') is unavailable, please use an integer x so 0 ≤ x ≤ ' +
				( contentFilter.items.length - 1 ) + '. No filtering will ' +
				'be performed.'
			);
			return false;
		}
		if ( !contentFilter.items[ contentFilter.selectedIndex ] ) {
			contentFilter.selectedIndex = -1;
			error(
				'Content Filter: The selected numeric filter (' + urlParam +
				') has been diabled. No filtering will be performed.'
			);
			return false;
		}
		return true;
	},

	isIndex: function ( number, array ) {
		return !isNaN( number ) && number >= 0 && number < array.length;
	},

	applyFilter: function ( container ) {
		config.preprocess.call( contentFilter, container );
		for ( var i = 0; i < config.filterTypes.length; ++i ) {
			var filterType = config.filterTypes[ i ],
				elements   = container.getElementsByClassName(
					filterType.class
				),
				oldLength  = elements.length,
				loopLimit  = 0;
			while ( elements.length ) {
				contentFilter.applyFilterType( filterType, elements[ 0 ] );
				if (
					elements.length >= oldLength &&
					++loopLimit >= contentFilter.applyFilterLimit
				) {
					error(
						'Content Filter: Too many element removals have been ' +
						'realized without reducing the number of elements.'
					);
					break;
				}
			}
		}
		while ( contentFilter.postponed.length ) {
			var todo = contentFilter.postponed;
			contentFilter.postponed = [];
			for ( i = 0; i < todo.length; ++i ) {
				todo[ i ][ 0 ].call( contentFilter, todo[ i ][ 1 ] );
			}
		}
		config.postprocess.call( contentFilter, container );
	},

	applyFilterType: function ( filterType, element ) {
		var filter = filterType.fixed;
		if ( filter === false ) {
			filter = contentFilter.getFilter( element );
			if ( filter === false ) {
				element.classList.remove( filterType.class );
				warn(
					'Content Filter: The element does not have any valid ' +
					'numeric filter class, but its filter type is not fixed.'
				);
				return;
			}
		}
		if ( ( filter & contentFilter.selectedFilter ) > 0 ) {
			switch ( filterType.mode ) {
			case 'block':
				element.classList.remove( filterType.class );
				return;
			case 'wrapper':
				contentFilter.unwrap( element );
				return;
			case 'inline':
				contentFilter.removeElementWithoutContext( element );
				return;
			}
		}
		if ( contentFilter.handleFilter( filterType, element ) ) {
			return;
		}
		element.classList.remove( filterType.class );
		warn(
			'Content Filter: Unmatched ' + filterType.mode + ' filter "' +
			filterType.class + '"'
		);
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

	handleFilter: function ( filterType, element ) {
		if (
			filterType.customHandler &&
			filterType.customHandler.call( contentFilter, element )
		) {
			return true;
		}

		switch ( filterType.mode ) {
		case 'block':
		case 'wrapper':
			contentFilter.removeElement( element );
			return true;
		}

		var parent = element;
		if ( config.contextFilterClass ) {
			while ( parent && parent !== contentFilter.parserOutput ) {
				if ( parent.classList.contains( config.contextFilterClass ) ) {
					var heading = contentFilter.getPreviousHeading( parent );
					contentFilter.removeElement( heading || parent );
					return true;
				}
				parent = parent.parentElement;
			}
		}

		parent = element.parentElement;
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
				contentFilter.hasFilter( node )
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
		if ( item.previousSibling || item.nextSibling ) {
			item.remove();
			return;
		}
		contentFilter.removeElement( item.parentElement );
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
		if ( !parent.hasChildNodes() ) {
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

	hasFilter: function ( element ) {
		for ( var i = 0; i < config.filterTypes.length; ++i ) {
			if (
				element.classList.contains( config.filterTypes[ i ].class ) &&
				(
					config.filterTypes[ i ].fixed !== false ||
					contentFilter.findClassStartingWith(
						element,
						config.filterClassIntro
					) 
				)
			) {
				return true;
			}
		}
		return false;
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
		delete contentFilter.currentUri.query[ config.urlParam ];
		var item = contentFilter.items[ contentFilter.selectedIndex ];
		if ( !item ) {
			return;
		}
		item.classList.add( 'content-filter-item-active' );
		item.firstElementChild.setAttribute(
			'href',
			contentFilter.currentUri.toString()
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