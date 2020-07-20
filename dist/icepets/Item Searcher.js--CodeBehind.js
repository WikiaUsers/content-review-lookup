/* Intent:
 *   Encapsulated script relevant to a specific article.
 */
( function ( a ) {
	a = {};
}( icePetsWikia.article = icePetsWikia.article === void 0 ? {} : icePetsWikia.article ) );

/* Intent:
 *   Add properties for the data namespace to be used for this article.
 */
( function ( a ) {
	var extractDropDownListData, extractedValues,
		extract, transform;
	
	// Processes raw data into usable format for drop down lists.
	extractDropDownListData = function ( index ) {
		extract( index );
		transform( );
		return extractedValues;
	};
	
	// Extracts the distinct values of a column.
	extract = function ( index ) {
		var items, item, i, j, foundIndex;
			
		items = a.itemData.split( ';' );
		extractedValues = [];
		
		// -1 due to the trailing delimiter in the data
		for ( i = 0; i < items.length - 1; i++ )	{
			item = items[i].split( '|' );
			j =  0;
			foundIndex = -1;

			for ( j = 0; j < extractedValues.length && foundIndex === -1; j++ )	{
				if ( extractedValues[j] === item[index] ) {
					foundIndex = 0;
				}
			}
			if ( foundIndex === -1 ) {
				extractedValues.push( item[index] );
			}
		}
	};

	// Sorts the data in ascending order.
	transform = function ( ) {
		extractedValues = extractedValues.sort(
			function( a, b ) {
				a = a.toLowerCase( );
				b = b.toLowerCase( );
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			}
		);
	};
	
	// These new public properties get the data for the drop down lists.
	a.categories = extractDropDownListData( 2 );
	a.rarities = extractDropDownListData( 4 );
}( icePetsWikia.data = icePetsWikia.data === void 0 ? {} : icePetsWikia.data ) );

/* Intent:
 *   Centralized to minimize errors due to typos and easier change in the event
 *   of a name collision.
 */
( function ( a ) {
	a.label = 'ipw-label';
	a.navigationTable = 'ipw-navigationTable';
	a.itemName = 'ipw-itemName';
	a.itemCategory = 'ipw-itemCategory';
	a.itemRarity = 'ipw-itemRarity';
	a.itemValue = 'ipw-itemValue';
	a.invisible = 'ipw-invisible';
	a.pageCell = 'ipw-pageCell';
}( icePetsWikia.article.classes = icePetsWikia.article.classes === void 0 ? {} : icePetsWikia.article.classes ) );

/* Intent:
 *   Centralized to minimize errors due to typos and easier change in the event
 *   of a name collision.
 */
( function ( a ) {
	a.searchBox = 'ipw-searchTerm';
	a.categoryList = 'ipw-category';
	a.categoryDiv = 'ipw-categoryDiv';
	a.itemsDiv = 'ipw-itemsDiv';
	a.itemsTable = 'ipw-itemsTable';
	a.stats = 'ipw-stats';
	a.rarityList = 'ipw-rarity';
	a.rarityDiv = 'ipw-rarityDiv';
	a.sortOrder = 'ipw-sortOrder';
	a.sortBy = 'ipw-sortBy';
	a.pageSize = 'ipw-pageSize';
}( icePetsWikia.article.ids = icePetsWikia.article.ids === void 0 ? {} : icePetsWikia.article.ids ) );

/* Intent:
 *   Group all routines used for initializing the article.
 */
( function ( a, b ) {
	var setBaseHTML, loadDropDownList, attachEvents;

	// Method used to start the initialization process.
	a.initialize = function ( container ) {
		if ( !setBaseHTML( container ) ) {
			window.alert( 'Error: Cannot initialize searcher.' );
			return;
		}
		if ( !loadDropDownList( a.ids.categoryDiv, a.ids.categoryList, b.data.categories ) ||
			!loadDropDownList( a.ids.rarityDiv, a.ids.rarityList, b.data.rarities )
		) {
			return;
		}
		if ( !attachEvents( ) ) {
			return;
		}
	};

	// Inserts the base HTML in the article.
	setBaseHTML = function ( container ) {
		container = document.getElementById( container );
		if ( container && container.nodeName === 'DIV') {
			container.innerHTML = '<span class=\"' + a.classes.label + '\">Name:<\/span>' +
				'<input id=\"' + a.ids.searchBox + '\" type=\"text\" maxlength=\"41\"><\/input>' +
				'<span class=\"' + a.classes.label + '\">Category:<\/span>' +
				'<span id=\"' + a.ids.categoryDiv + '\"><\/span>' +
				'<span class=\"' + a.classes.label + '\">Rarity:<\/span>' +
				'<span id=\"' + a.ids.rarityDiv + '\"><\/span><br>' +
				'<span class=\"' + a.classes.label + '\">Sort by:</span><select id=\"' + a.ids.sortBy + '\"><option>Name<\/option><option>Rarity<\/option><option>Value<\/option><\/select>' +
				'<span class=\"' + a.classes.label + '\">Sort order:</span><select id=\"' + a.ids.sortOrder + '\"><option>Ascending<\/option><option>Descending<\/option><\/select>' +
				'<span class=\"' + a.classes.label + '\">Items per page:</span><select id=\"' + a.ids.pageSize + '\"><option>25<\/option><option>50<\/option><option>100<\/option><\/select>' +
				'<div id=\"' + a.ids.itemsDiv + '\"><\/div>';
			return true;
		}
		else {
			return false;
		}
	};
	
	// Inserts the data-dependent HTML in the article.
	loadDropDownList = function ( container, id, options ) {
		var i, dropDownList;
		container = document.getElementById( container );

		if ( container && container.nodeName === 'SPAN') {
			dropDownList = '';

			for ( i = 0; i < options.length; i++ ) {
				dropDownList += '<option>' + options[i] + '<\/option>';
			}
			container.innerHTML = '<select id=\"' + id + '\">' +
				'<option>ALL<\/option>' + dropDownList + '<\/select>';
			return true;
		} else {
			container.innerHTML = '<div>Cannot set data.<\/div>';
			return false;
		}
	};
	
	// Inserts the event handlers in the article.
	// This method of event injection is used for cross-browser compatibility
	// and the need is only for 1 event.
	attachEvents = function ( ) {
		var b = function ( ) {
			return a.search( 0 );
		};
		
		document.getElementById( a.ids.searchBox ).onkeyup = b;
		document.getElementById( a.ids.categoryList ).onchange = b;
		document.getElementById( a.ids.rarityList ).onchange = b;
		document.getElementById( a.ids.pageSize ).onchange = b;
		document.getElementById( a.ids.sortBy ).onchange = b;
		document.getElementById( a.ids.sortOrder ).onchange = b;
	};
}( icePetsWikia.article = icePetsWikia.article === void 0 ? {} : icePetsWikia.article, icePetsWikia ) );

/* Intent:
 *   Group all routines used for performing an item search.
 */
( function ( a, b ) {
	var extract, transform, load, items, ItemObject,
		getItemTable, getItemNavigation,
		filter, sort;

	// Custom object to make sorting easier.
	ItemObject = function ( name, url, category, rarity, value ) {
		this.name = name;
		this.url = url;
		this.category = category;
		this.rarity = rarity;
		this.value = value;
	};
	
	// Processes an item search.
	a.search = function ( startValue ) {
		var before;
		before = new Date().getTime();

		extract( );
		transform( );
		load( startValue, before );
	};
	
	// Extracts the data into a friendly format to work with.
	extract = function ( ) {
		items = b.data.itemData.split( ';' );
	};
	
	// Transforms the data based on the user's inputs.
	transform = function ( ) {
		filter( );
		sort( );
	};

	// Loads the search results into the article.
	load = function ( start, before ) {
		var navigation, pageSize, after, stats, category, searchTerm, rarity;

        category = document.getElementById( a.ids.categoryList );
        rarity = document.getElementById( a.ids.rarityList );

		searchTerm = document.getElementById( a.ids.searchBox ).value;
		category = category.options[ category.selectedIndex ].text;
		rarity = rarity.options[ rarity.selectedIndex ].text;
		
		if ( searchTerm.length === 0 ) {
			document.getElementById( a.ids.itemsDiv ).innerHTML = '';
			return;
		}
		if ( items.length === 0 ) {
			document.getElementById( a.ids.itemsDiv ).innerHTML = '' +
				'<p>No results found for "' + searchTerm.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') +
				'" in category "' + category + '" with rarity ' + rarity + '.<\/p>';
			return;
		}

        pageSize = document.getElementById( a.ids.pageSize );
		pageSize = pageSize.options[ pageSize.selectedIndex ].text;
		pageSize = parseInt( pageSize );
		if ( items.length > pageSize ) {
			navigation = getItemNavigation( start, pageSize );
		} else {
			navigation = '';
		}
		after = new Date().getTime();
		
		stats = '<div id=\"' + a.ids.stats + '\">' + items.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' records (' + (after - before) / 1000 + ' seconds)<\/div>';
		document.getElementById( a.ids.itemsDiv ).innerHTML = '' +
			'<br>' + stats +
			'<br>' + navigation +
			'<br>' + getItemTable( start, pageSize ) +
			'<br>' + navigation;
	};
	
	// Generates the search results table.
	getItemTable = function ( start, pageSize ) {
		var numberOfColumns,
			rows, cells,
			itemCounter, columnCounter,
			i;

		numberOfColumns = 5;
		rows = '';
		cells = '';
		itemCounter = 0;
		columnCounter = 0;
		
		if ( items.length < numberOfColumns ) {
			numberOfColumns = items.length;
		}
		
		for( i = 0; i < items.length; i++ ) {
			if ( itemCounter >= start &&
				itemCounter < ( pageSize + start )
			) {
				cells += '<td>' +
					'<div><img src=\"' + items[i].url + '\" alt=\"' + items[i].name + '\">' + '<\/div>' +
					'<div class=\"' + a.classes.itemName + '\">' + items[i].name + '<\/div>' +
					'<div class=\"' + a.classes.itemCategory + '\">(' + items[i].category + ')<\/div>' +
					'<div class=\"' + a.classes.itemRarity + '\">Rarity: ' + items[i].rarity + '<\/div>' +
					'<div class=\"' + a.classes.itemValue + '\">' + items[i].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' iP<\/div>' +
					'<\/td>';
				columnCounter++;
				
				if ( columnCounter === numberOfColumns ) {
					rows += '<tr>' + cells + '<\/tr>' +
						'<tr><td colspan=\"' + numberOfColumns + '\"><hr><\/td><\/tr>';

					cells = '';
					columnCounter = 0;
				}
			}
			itemCounter++;
			if ( itemCounter >= ( pageSize + start ) ) {
				break;
			}
		}
		if ( columnCounter !== 0 ) {
			rows += '<tr>' + cells + '<td colspan=\"' + ( numberOfColumns - columnCounter ) + '\"><\/td><\/tr>';
		}
		return ( '<table id=\"' + a.ids.itemsTable + '\"><tbody>' +	rows +	'<\/tbody><\/table>' );
	};

	// Generates the search results navigation links.
	getItemNavigation = function ( start, pageSize ) {
		var previous, previousLinks, previousButton, previousCount,
			next, nextLinks, nextButton, nextCount,
			navLinksArray, navLinks,
			i;

		// Note: previousButton and nextButton are not actually buttons
		//   but will be links.  They are named this way to minimize confusion
		//   with the variables previousLinks and nextLinks.
		previous = start;
		previousLinks  = '';
		previousButton = '';
		previousCount = 0;
		while( previous > 0 && previousCount < 5) {
			previousCount = previousCount + 1;
			previousLinks = ( previous - pageSize ) + '|' + previousLinks ;
			if (previousButton === '') {
				previousButton = previous - pageSize;
			}
			previous = previous - pageSize;
		}
		
		next = start;
		nextLinks  = '';
		nextButton = '';
		nextCount  = previousCount + 1;
		while( next < ( items.length - pageSize )  && nextCount < 10 ) {
			nextCount = nextCount + 1;
			nextLinks = nextLinks + (next + pageSize) + '|' ;
			if (nextButton === '') {
				nextButton = next + pageSize;
			}
			next = next + pageSize;
		}
		if ( nextLinks.length !== 0 )
		{
			nextLinks = nextLinks.substr(0,nextLinks.length-1);
			nextLinks = '|' + nextLinks;
		}
		
		navLinksArray = previousLinks + start + nextLinks;
		navLinksArray = navLinksArray.split('|');

		navLinks = '';
		for( i = 0; i < navLinksArray.length; i++ ) {
			if (parseInt(navLinksArray[i]) !== start) {
				navLinks = navLinks + '<td class=\"' + a.classes.pageCell + '\"><a href=\"#\" onclick=\"icePetsWikia.article.search(' + navLinksArray[i] + ');return false;\">' + ((navLinksArray[i] / pageSize) + 1) + '<\/a><\/td>';
			} else {
				navLinks = navLinks + '<td>' + ((navLinksArray[i] / pageSize) + 1) + '<\/td>' ;
			}
		}
		
		if (previousButton !== '') {
			previousButton = '<a href=\"#\" onclick=\"icePetsWikia.article.search(' + previousButton + ');return false;\">Previous<\/a>';
		} else {
			previousButton = '<span class=\"' + a.classes.invisible + '\">Previous<\/span>';
		}
		previousButton = '<td>' + previousButton + '<\/td>';

		if (nextButton !== '') {
			nextButton = '<a href=\"#\" onclick=\"icePetsWikia.article.search(' + nextButton + ');return false;\">Next<\/a>';
		} else {
			nextButton = '<span class=\"' + a.classes.invisible + '\">Next<\/span>';
		}
		nextButton = '<td>' + nextButton + '<\/td>';

		return ( '<table class=\"' + a.classes.navigationTable + '\"><tbody><tr>' +
			previousButton + navLinks + nextButton + '<\/tr><\/tbody><\/table>'
		);
	};

	// Filters the data based on the user's input.
	filter = function ( ) {
		var i, url, item, transformedItems, searchTerm, category, rarity, trim;
		
		trim = function ( string ) {
			return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
		};
		
		transformedItems = [];
        category = document.getElementById( a.ids.categoryList );
		rarity = document.getElementById( a.ids.rarityList );

		searchTerm = document.getElementById( a.ids.searchBox ).value;
		category = category.options[ category.selectedIndex ].text;
		rarity = rarity.options[ rarity.selectedIndex ].text;

		for ( i = 0; i < items.length - 1; i++ ) {
			item = items[i].split('|') ;
			url = 'http://www.icepets.com/images/items/' + item[0] + '.png';
			if ( item[3].length !== 0 )	{
				url = 'http://icepets.wikia.com/wiki/Special:Filepath/' + item[3];
			}
			if (
					(
						(
							( searchTerm.length !== 0 ) &&
							( trim( searchTerm ).length === 0 )
						) ||
						( item[1].length !== item[1].toLowerCase().replace( trim( searchTerm.toLowerCase( ) ), '' ).length )
					) &&
					( item[2] === category || category === 'ALL' ) &&
					( item[4] === rarity || rarity === 'ALL' )
			) {
				transformedItems.push( new ItemObject( item[1], url, item[2], item[4], item[5] ) );
			}
		}
		items = transformedItems;
	};

	// Sorts the data based on the user's input.
	sort = function ( ) {
		var sortBy, sortOrder,
			nameSort, raritySort, valueSort,
			temp;

		sortBy = document.getElementById( a.ids.sortBy );
		sortOrder = document.getElementById( a.ids.sortOrder );

		sortBy = sortBy.options[ sortBy.selectedIndex ].text;
		sortOrder = sortOrder.options[ sortOrder.selectedIndex ].text;

		if ( sortOrder === 'Ascending' ) {
			sortOrder = 1;
		} else {
			sortOrder = -1;
		}

		nameSort = function( a, b ) {
			var itemA, itemB;

			itemA = a.name.toLowerCase();
			itemB = b.name.toLowerCase();
		
			if ( itemA < itemB ) {
				return sortOrder * -1;
			}
			if ( itemA > itemB ) {
				return sortOrder;
			}
			return 0;
		};
		
		raritySort = function( a, b ) {
			var itemA, itemB;

			itemA = parseInt(a.rarity);
			itemB = parseInt(b.rarity);

			if ( sortOrder === 1 ) {
				return itemA-itemB;
			} else {
				return itemB-itemA;
			}
		};

		valueSort = function( a, b ) {
			var itemA, itemB;

			itemA = parseInt(a.value);
			itemB = parseInt(b.value);

			if ( sortOrder === 1 ) {
				return itemA-itemB;
			} else {
				return itemB-itemA;
			}
		};

		if ( sortBy === 'Name' ) {
			items = items.sort( nameSort );
		}
		if ( sortBy === 'Rarity' ) {
			temp = sortOrder;
			sortOrder = 1;
			items = items.sort( nameSort );
			sortOrder = temp;
			items = items.sort( raritySort );
		}
		if ( sortBy === 'Value' ) {
			temp = sortOrder;
			sortOrder = 1;
			items = items.sort( nameSort );
			sortOrder = temp;
			items = items.sort( valueSort );
		}
	};
}( icePetsWikia.article = icePetsWikia.article === void 0 ? {} : icePetsWikia.article, icePetsWikia ) );

document.getElementById('searcher').innerHTML = '' +
'<button onclick=\"icePetsWikia.article.initialize(\'searcher\');\">Click to Start<\/button>';