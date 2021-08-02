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
var log;
/** @type {(msg:string)=>void} */
var warn;
/** @type {(msg:string)=>void} */
var error;

/** @type {contentFilterConfig} */
var config;

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
	version: '1.6',
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

		if ( !document.body.classList.contains( 'skin-fandomdesktop' ) ) {
			error(
				'Content Filter: This script only works with the ' +
				'FandomDesktop skin. To prevent issues with other skins, it ' +
				'will be disabled.'
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

		util.selectedFilter = contentFilter.selectedFilter;
		util.applyFilter    = contentFilter.applyFilter;

		contentFilter.updateSelectedFilterItem();
		contentFilter.applyFilter( contentFilter.parserOutput );
		contentFilter.updateAnchorsFilter();

		util.loaded = true;
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
			preprocess: false,
			postprocess: false,
			debug: false
		} );

		// title
		if ( !contentFilter.isOptionalString( config.title ) ) {
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
			if ( !contentFilter.isOptionalString( filter.description ) ) {
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
		if ( !contentFilter.isOptionalString( config.filterEnableClass ) ) {
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
		if ( !contentFilter.isOptionalString( config.filtersInfoId ) ) {
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
				!contentFilter.isOptionalFunction( filterType.customHandler )
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
		if ( !contentFilter.isOptionalString( config.contextFilterClass ) ) {
			warn(
				'Content Filter: The "contextFilterClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.contextFilterClass = false;
		}
		// skipClass
		if ( !contentFilter.isOptionalString( config.skipClass ) ) {
			warn(
				'Content Filter: The "skipClass" configuration parameter is ' +
				'neither a string or false.'
			);
			config.skipClass = false;
		}
		// contentEndClass
		if ( !contentFilter.isOptionalString( config.contentEndClass ) ) {
			warn(
				'Content Filter: The "contentEndClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.contentEndClass = false;
		}
		// mainColumnClassIntro
		if ( !contentFilter.isOptionalString( config.mainColumnClassIntro ) ) {
			warn(
				'Content Filter: The "mainColumnClassIntro" configuration ' +
				'parameter is neither a string or false.'
			);
			config.mainColumnClassIntro = false;
		}
		// listTableClass
		if ( !contentFilter.isOptionalString( config.listTableClass ) ) {
			warn(
				'Content Filter: The "listTableClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.listTableClass = false;
		}
		// inContentAddClass
		if ( !contentFilter.isOptionalString( config.inContentAddClass ) ) {
			warn(
				'Content Filter: The "inContentAddClass" configuration ' +
				'parameter is neither a string or false.'
			);
			config.inContentAddClass = false;
		}
		// preprocess
		if ( !contentFilter.isOptionalFunction( config.preprocess ) ) {
			warn(
				'Content Filter: The "preprocess" configuration parameter ' +
				'is neither a function or false.'
			);
			config.preprocess = false;
		}
		// postprocess
		if ( !contentFilter.isOptionalFunction( config.postprocess ) ) {
			warn(
				'Content Filter: The "postprocess" configuration parameter ' +
				'is neither a function or false.'
			);
			config.postprocess = false;
		}
		// debug
		if ( typeof config.debug !== 'number' && typeof config.debug !== 'boolean' ) {
			warn(
				'Content Filter: The "debug" configuration parameter ' +
				'is neither a number or boolean.'
			);
			config.debug = false;
		}
		return errorFound ? null : config;
	},

	isOptionalString: function ( value ) {
		return typeof value === 'string' || value === false;
	},

	isOptionalFunction: function ( value ) {
		return typeof value === 'function' || value === false;
	},

	isInteger: function ( value, min, max ) {
		return typeof value === 'number' &&
			!isNaN( value ) &&
			( value | 0 ) === value &&
			( min === undefined || value >= min ) &&
			( max === undefined || value <= max );
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
			config.debug !== false ||
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
			var item = itemBase.cloneNode( true ),
				a    = aBase.cloneNode( true );
			item.id = 'content-filter-item-' + i;
			if ( filter.filter & contentFilter.pageFilter ) {
				if ( filter.description ) {
					item.title = filter.description;
				}
				/** @type {{[k:string]:number}} */
				var obj = {};
				obj[ config.urlParam ] = i;
				contentFilter.currentUri.extend( obj );
				a.href = contentFilter.currentUri.toString();
			} else {
				item.classList.add( 'content-filter-item-deactivated' );
			}
			if ( contentFilter.isUrl( filter.title ) ) {
				var img = imgBase.cloneNode( true );
				img.src = filter.title;
				a.appendChild( img );
			} else {
				a.textContent = filter.title;
			}
			item.appendChild( a );
			contentFilter.items.push( item );
		}
	},

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
			var wrapper = document.getElementsByClassName( 'page-header__actions' )[ 0 ];
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
		var urlParam = typeof config.debug === 'number' ? '' + config.debug :
			mw.util.getParamValue( config.urlParam );
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
		var filter = config.filters[ contentFilter.selectedIndex ];
		if ( !filter ) {
			contentFilter.selectedIndex = -1;
			error(
				'Content Filter: The selected numeric filter (' + urlParam +
				') has been diabled. No filtering will be performed.'
			);
			return false;
		}
		contentFilter.selectedFilter = filter.filter;
		return true;
	},

	isIndex: function ( number, array ) {
		return !isNaN( number ) && number >= 0 && number < array.length;
	},

	applyFilter: function ( container ) {
		if ( config.preprocess ) {
			config.preprocess.call( contentFilter, container );
		}
		for ( var i = 0; i < config.filterTypes.length; ++i ) {
			var filterType = config.filterTypes[ i ],
				elements   = container.getElementsByClassName(
					filterType.class
				),
				oldLength  = elements.length,
				loopLimit  = 0,
				skip       = function ( /** @type {Element} */ element ) {
					element.classList.replace(
						filterType.class,
						'content-filter-element-skipped'
					);
					return true;
				};
			while ( elements.length ) {
				contentFilter.applyFilterType( filterType, elements[ 0 ], skip );
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
			elements = container.getElementsByClassName(
				'content-filter-element-skipped'
			);
			while ( elements.length ) {
				elements[ 0 ].classList.replace(
					'content-filter-element-skipped',
					filterType.class
				);
			}
		}
		while ( contentFilter.postponed.length ) {
			var todo = contentFilter.postponed;
			contentFilter.postponed = [];
			for ( i = 0; i < todo.length; ++i ) {
				todo[ i ][ 0 ].call( contentFilter, todo[ i ][ 1 ] );
			}
		}
		if ( config.postprocess ) {
			config.postprocess.call( contentFilter, container );
		}
	},

	applyFilterType: function ( filterType, element, skip ) {
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
		if ( contentFilter.handleFilter( filterType, element, skip ) ) {
			return;
		}
		skip( element );
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

	handleFilter: function ( filterType, element, skip ) {
		if (
			filterType.customHandler &&
			filterType.customHandler.call( contentFilter, element, skip )
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
			parent = contentFilter.findParentWithClass(
				element,
				config.contextFilterClass
			);
			if ( parent ) {
				var heading = contentFilter.getPreviousHeading( parent );
				contentFilter.removeElement( heading || parent );
				return true;
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

	findParentWithClass: function ( element, className ) {
		if ( !element ) {
			return null;
		}
		while ( element && element !== contentFilter.parserOutput ) {
			if ( element.classList.contains( className ) ) {
				return element;
			}
			element = element.parentElement;
		}
		return null;
	},

	hasClassOrChildren: function ( element, className ) {
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
			if (
				!contentFilter.hasClassOrChildren( children[ i ], className )
			) {
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
			return !node.textContent || !node.textContent.trim();
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
			if ( sibling instanceof HTMLBRElement ) {
				return;
			}
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
			if ( sibling instanceof HTMLBRElement ) {
				return;
			}
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