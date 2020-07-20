/* Intent:
 *   Encapsulated script relevant to a specific article.
 *   Note: This article's code is based on the item searcher's code where
 *     filtering and paging is removed.
 */
( function ( a ) {
	a = {};
}( icePetsWikia.article = icePetsWikia.article === void 0 ? {} : icePetsWikia.article ) );

/* Intent:
 *   Centralized to minimize errors due to typos and easier change in the event
 *   of a name collision.
 */
( function ( a ) {
	a.label = 'ipw-label';
	a.vanish = 'ipw-vanish';
}( icePetsWikia.article.classes = icePetsWikia.article.classes === void 0 ? {} : icePetsWikia.article.classes ) );

/* Intent:
 *   Centralized to minimize errors due to typos and easier change in the event
 *   of a name collision.
 */
( function ( a ) {
	a.itemsDiv = 'ipw-itemsDiv';
	a.itemsTable = 'ipw-itemsTable';
	a.sortOrder = 'ipw-sortOrder';
	a.sortBy = 'ipw-sortBy';
}( icePetsWikia.article.ids = icePetsWikia.article.ids === void 0 ? {} : icePetsWikia.article.ids ) );

/* Intent:
 *   Group all routines used for initializing the article.
 */
( function ( a, b ) {
	var setBaseHTML;

	// Method used to start the initialization process.
	a.initialize = function ( container ) {
		if ( !setBaseHTML( container, b.data.itemData ) ) {
			window.alert( 'Error: Cannot initialize searcher.' );
			return;
		}
	};

	// Inserts the base HTML in the article.
	setBaseHTML = function ( container, itemData ) {
		var items;

		container = document.getElementById( container );
		if ( container && container.nodeName === 'DIV') {
			items = itemData.split( ';' );
			container.innerHTML = '<span class="' + a.classes.vanish + '">' +
				'<span class=\"' + a.classes.label + '\">Sort by:</span><select id=\"' + a.ids.sortBy + '\"><option>Id<\/option><option>Name<\/option><option>Category<\/option><option>Ice Point Value<\/option><option>Rarity<\/option><\/select>' +
				'<span class=\"' + a.classes.label + '\">Sort order:</span><select id=\"' + a.ids.sortOrder + '\"><option>Descending<\/option><option>Ascending<\/option><\/select>' +
				'</span><div id=\"' + a.ids.itemsDiv + '\"><\/div>';
			return true;
		}
		else {
			return false;
		}
	};
}( icePetsWikia.article = icePetsWikia.article === void 0 ? {} : icePetsWikia.article, icePetsWikia ) );

/* Intent:
 *   Group all routines used for performing an item search.
 */
( function ( a, b ) {
	var extract, transform, load, items, ItemObject,
		getItemTable, filter, sort;

	// Custom object to make sorting easier.
	ItemObject = function ( name, url, category, rarity, value, id ) {
		this.name = name;
		this.url = url;
		this.category = category;
		this.rarity = rarity;
		this.value = value;
		this.id = id;
	};

	// Processes an item search.
	a.search = function ( selectedSortBy ) {
		extract( );
		transform( selectedSortBy );
		load( );
	};

	// Extracts the data into a friendly format to work with.
	extract = function ( ) {
		items = b.data.itemData.split( ';' );
	};

	// Transforms the data based on the user's inputs.	
	transform = function ( selectedSortBy ) {
		filter( ); // No filtering done in this article.
		sort( selectedSortBy );
	};

	// Loads the search results into the article.
	load = function ( ) {
		document.getElementById( a.ids.itemsDiv ).innerHTML = '<br>' + getItemTable( );
	};

	// Generates the search results table.	
	getItemTable = function ( ) {
		var rows, i;

		rows = '';

		for( i = 0; i < items.length ; i++ ) {
			rows += '<tr>' +
				'<td><img src=\"' + items[i].url + '\"><\/td>' +
				'<td>' + items[i].id + '<\/td>' +
				'<td>' + items[i].name + '<\/td>' +
				'<td>' + items[i].category + '<\/td>' +
				'<td>' + items[i].value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '<\/td>' +
				'<td>' + items[i].rarity + '<\/td>' +
				'<\/tr>' ;
		}
		return ('<div>Sortable All Items Database (click on a header to sort)</div><hr>' +
			'<table class=\"tablesorter\"><thead>' +
			'<th class=\"header\"><\/th>' +
			'<th class=\"header\" onclick=\"icePetsWikia.article.search(\'Id\');\">Id<\/th>' +
			'<th class=\"header\" onclick=\"icePetsWikia.article.search(\'Name\');\">Name<\/th>' +
			'<th class=\"header\" onclick=\"icePetsWikia.article.search(\'Category\');\">Category<\/th>' +
			'<th class=\"header\" onclick=\"icePetsWikia.article.search(\'Ice Point Value\');\">Ice Point Value<\/th>' +
			'<th class=\"header\" onclick=\"icePetsWikia.article.search(\'Rarity\');\">Rarity<\/th>' +
			'<\/thead><tbody>' + rows +
			'<\/tbody><\/table>'
		);
	};

	// Filters the data based on the user's input. No filtering done in this article.
	filter = function ( ) {
		var i, url, item, transformedItems;

		transformedItems = [];

		for ( i = 0; i < items.length - 1; i++ ) {
			item = items[i].split('|') ;
			url = 'http://www.icepets.com/images/items/' + item[0] + '.png';
			if ( item[3].length !== 0 )	{
				url = 'http://icepets.wikia.com/wiki/Special:Filepath/' + item[3];
			}
			transformedItems.push( new ItemObject( item[1], url, item[2], item[4], item[5], item[0] ) );
		}
		items = transformedItems;
	};

	// Sorts the data based on the user's input.  Added new sorting options.
	sort = function ( selectedSortBy ) {
		var sortBy, sortOrder, sortBy2, sortOrder2,
			idSort, nameSort, categorySort, raritySort, valueSort,
			i, temp;

		sortBy = document.getElementById( a.ids.sortBy );
		sortOrder = document.getElementById( a.ids.sortOrder );

		sortBy = sortBy.options[ sortBy.selectedIndex ].text;
		sortOrder = sortOrder.options[ sortOrder.selectedIndex ].text;

		sortBy2 = document.getElementById( a.ids.sortBy );
		sortOrder2 = document.getElementById( a.ids.sortOrder );

		// Modified sorting logic from original search code.
		// This is the new logic:
		// If the user selected a 'sortBy' that is different than the current 'sortBy'
		//   it will sort by the user's selected 'sortBy' and use the current sort order.
		// If the user selected a 'sortBy' that is the current 'sortBy'
		//   it will sort by the user's selected 'sortBy' and use the opposite sort order.
		if ( sortBy !== selectedSortBy ) {
			sortBy = selectedSortBy;
			for( i = 0; i < sortBy2.options.length; i++ ) {
				if(sortBy2.options[i].innerHTML === sortBy) {
					sortBy2.selectedIndex = i;
					break;
				}
			}
		} else {
			if ( sortOrder === 'Ascending' ) {
				sortOrder = 'Descending';
			} else {
				sortOrder = 'Ascending';
			}
			for( i = 0; i < sortOrder2.options.length; i++ ) {
				if(sortOrder2.options[i].innerHTML === sortOrder) {
					sortOrder2.selectedIndex = i;
					break;
				}
			}
		}
		
		if ( sortOrder === 'Ascending' ) {
			sortOrder = 1;
		} else {
			sortOrder = -1;
		}
		idSort = function( a, b ) {
			var itemA, itemB;

			itemA = parseInt(a.id);
			itemB = parseInt(b.id);

			if ( sortOrder === 1 ) {
				return itemA-itemB;
			} else {
				return itemB-itemA;
			}
		};

		categorySort = function( a, b ) {
			var itemA, itemB;

			itemA = a.category.toLowerCase();
			itemB = b.category.toLowerCase();
		
			if ( itemA < itemB ) {
				return sortOrder * -1;
			}
			if ( itemA > itemB ) {
				return sortOrder;
			}
			return 0;
		};
		
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

		if ( sortBy === 'Id' ) {
			items = items.sort( idSort );
		}
		if ( sortBy === 'Name' ) {
			items = items.sort( nameSort );
		}
		if ( sortBy === 'Category' ) {
			items = items.sort( categorySort );
		}
		if ( sortBy === 'Rarity' ) {
			temp = sortOrder;
			sortOrder = 1;
			items = items.sort( nameSort );
			sortOrder = temp;
			items = items.sort( raritySort );
		}
		if ( sortBy === 'Ice Point Value' ) {
			temp = sortOrder;
			sortOrder = 1;
			items = items.sort( nameSort );
			sortOrder = temp;
			items = items.sort( valueSort );
		}
	};
}( icePetsWikia.article = icePetsWikia.article === void 0 ? {} : icePetsWikia.article, icePetsWikia ) );

document.getElementById('list').innerHTML = '' +
'<button onclick=\"icePetsWikia.article.initialize(\'list\');icePetsWikia.article.search(\'Id\');\">Click to View<\/button>';