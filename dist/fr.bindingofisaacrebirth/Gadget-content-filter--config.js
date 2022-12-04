/**
 * The Binding of Isaac: Rebirth wiki configuration of the content filter.
 */
window.contentFilterConfig = {

	/**
	 * The title displayed on top of the buttons.
	 */
	title: 'Filtre de DLC',

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
			description: 'Cacher le contenu indisponible avec Rebirth'
		},
		{
			filter: 2, // 0010
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/9/95/Dlc_a_indicator.png/revision/latest',
			description: 'Cacher le contenu indisponible avec Afterbirth'
		},
		{
			filter: 4, // 0100
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/4/4c/Dlc_a†_indicator.png/revision/latest',
			description: 'Cacher le contenu indisponible avec Afterbirth+'
		},
		{
			filter: 8, // 1000
			title: 'https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/f/f2/Dlc_r_indicator.png/revision/latest',
			description: 'Cacher le contenu indisponible avec Repentance'
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
	messagesLocation: 'mediawiki:gadget-content-filter/',

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
	var keyType = getKeyType( element );
	switch ( keyType ) {
	case DictKeyType.UNIQUE:
	case DictKeyType.COMBINED:
		this.removeElement( parent.parentElement );
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
		return true;
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
	var sibling = element.previousSibling;
	while (
		sibling && (
			sibling.nodeType !== Node.TEXT_NODE ||
			sibling.textContent.lastIndexOf( '/' ) === -1 &&
			sibling.textContent.lastIndexOf( '+' ) === -1
		)
	) {
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
	sibling = element.nextSibling;
	while (
		sibling && (
			sibling.nodeType !== Node.TEXT_NODE ||
			sibling.textContent.indexOf( '/' ) === -1 &&
			sibling.textContent.indexOf( '+' ) === -1
		)
	) {
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
		var li    = lis[ i ],
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
		this.unwrap( lis[ 0 ], innerList );
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
		var li = lis[ i ];
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
			var li = uls[ 0 ].firstElementChild;
			li;
			li = li.nextElementSibling
		) {
			var keys   = li.getElementsByClassName( 'dlc-filter-dict-key' ),
				values = li.getElementsByClassName( 'dlc-filter-dict-value' );
			this.unwrap( keys[ 0 ] );
			if ( values.length ) {
				this.unwrap( values[ 0 ] );
				continue;
			}
			var subdicts = li.getElementsByClassName( 'dlc-filter-dict-inner' );
			if ( !subdicts.length ) {
				continue;
			}
			var subdict = subdicts[ 0 ],
				firstLi = subdict.getElementsByTagName( 'li' )[ 0 ];
			this.unwrap( firstLi, subdict );
			if ( !subdict.firstElementChild ) {
				subdict.remove();
			} else {
				subdict.classList.remove( 'dlc-filter-inner' );
			}
		}
		uls[ 0 ].classList.remove( 'dlc-filter-dict' );
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