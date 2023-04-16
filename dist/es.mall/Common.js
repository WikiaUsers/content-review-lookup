/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/**
 * TableSorter for MediaWiki
 *
 * Written 2011 Leo Koppelkamm
 * Based on tablesorter.com plugin, written (c) 2007 Christian Bach.
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @depends on mw.config (wgDigitTransformTable, wgMonthNames, wgMonthNamesShort,
 * wgDefaultDateFormat, wgContentLanguage)
 */
/**
 *
 * @description Create a sortable table with multi-column sorting capabilitys
 *
 * @example $( 'table' ).tablesorter();
 * @desc Create a simple tablesorter interface.
 *
 * @option String cssHeader ( optional ) A string of the class name to be appended
 *         to sortable tr elements in the thead of the table. Default value:
 *         "header"
 *
 * @option String cssAsc ( optional ) A string of the class name to be appended to
 *         sortable tr elements in the thead on a ascending sort. Default value:
 *         "headerSortUp"
 *
 * @option String cssDesc ( optional ) A string of the class name to be appended
 *         to sortable tr elements in the thead on a descending sort. Default
 *         value: "headerSortDown"
 *
 * @option String sortInitialOrder ( optional ) A string of the inital sorting
 *         order can be asc or desc. Default value: "asc"
 *
 * @option String sortMultisortKey ( optional ) A string of the multi-column sort
 *         key. Default value: "shiftKey"
 *
 * @option Boolean sortLocaleCompare ( optional ) Boolean flag indicating whatever
 *         to use String.localeCampare method or not. Set to false.
 *
 * @option Boolean cancelSelection ( optional ) Boolean flag indicating if
 *         tablesorter should cancel selection of the table headers text.
 *         Default value: true
 *
 * @option Boolean debug ( optional ) Boolean flag indicating if tablesorter
 *         should display debuging information usefull for development.
 *
 * @type jQuery
 *
 * @name tablesorter
 *
 * @cat Plugins/Tablesorter
 *
 * @author Christian Bach/christian.bach@polyester.se
 */

( function( $ ) {

	/* Local scope */

	var	ts,
		parsers = [];

	/* Parser utility functions */

	function getParserById( name ) {
		var len = parsers.length;
		for ( var i = 0; i < len; i++ ) {
			if ( parsers[i].id.toLowerCase() === name.toLowerCase() ) {
				return parsers[i];
			}
		}
		return false;
	}

	function getElementText( node ) {
		var $node = $( node ),
			data = $node.attr( 'data-sort-value' );
		if ( data !== undefined ) {
			return data;
		} else {
			return $node.text();
		}
	}

	function getTextFromRowAndCellIndex( rows, rowIndex, cellIndex ) {
		if ( rows[rowIndex] && rows[rowIndex].cells[cellIndex] ) {
			return $.trim( getElementText( rows[rowIndex].cells[cellIndex] ) );
		} else {
			return '';
		}
	}

	function detectParserForColumn( table, rows, cellIndex ) {
		var	l = parsers.length,
			nodeValue,
			// Start with 1 because 0 is the fallback parser
			i = 1,
			rowIndex = 0,
			concurrent = 0,
			needed = ( rows.length > 4 ) ? 5 : rows.length;

		while( i < l ) {
			nodeValue = getTextFromRowAndCellIndex( rows, rowIndex, cellIndex );
			if ( nodeValue !== '') {
				if ( parsers[i].is( nodeValue, table ) ) {
					concurrent++;
					rowIndex++;
					if ( concurrent >= needed ) {
						// Confirmed the parser for multiple cells, let's return it
						return parsers[i];
					}
				} else {
					// Check next parser, reset rows
					i++;
					rowIndex = 0;
					concurrent = 0;
				}
			} else {
				// Empty cell
				rowIndex++;
				if ( rowIndex > rows.length ) {
					rowIndex = 0;
					i++;
				}
			}
		}

		// 0 is always the generic parser (text)
		return parsers[0];
	}

	function buildParserCache( table, $headers ) {
		var	rows = table.tBodies[0].rows,
			sortType,
			parsers = [];

		if ( rows[0] ) {

			var	cells = rows[0].cells,
				len = cells.length,
				i, parser;

			for ( i = 0; i < len; i++ ) {
				parser = false;
				sortType = $headers.eq( i ).data( 'sort-type' );
				if ( sortType !== undefined ) {
					parser = getParserById( sortType );
				}

				if ( parser === false ) {
					parser = detectParserForColumn( table, rows, i );
				}

				parsers.push( parser );
			}
		}
		return parsers;
	}

	/* Other utility functions */

	function buildCache( table ) {
		var	totalRows = ( table.tBodies[0] && table.tBodies[0].rows.length ) || 0,
			totalCells = ( table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length ) || 0,
			parsers = table.config.parsers,
			cache = {
				row: [],
				normalized: []
			};

		for ( var i = 0; i < totalRows; ++i ) {

			// Add the table data to main data array
			var	$row = $( table.tBodies[0].rows[i] ),
				cols = [];

			// if this is a child row, add it to the last row's children and
			// continue to the next row
			if ( $row.hasClass( table.config.cssChildRow ) ) {
				cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add( $row );
				// go to the next for loop
				continue;
			}

			cache.row.push( $row );

			for ( var j = 0; j < totalCells; ++j ) {
				cols.push( parsers[j].format( getElementText( $row[0].cells[j] ), table, $row[0].cells[j] ) );
			}

			cols.push( cache.normalized.length ); // add position for rowCache
			cache.normalized.push( cols );
			cols = null;
		}

		return cache;
	}

	function appendToTable( table, cache ) {
		var	row = cache.row,
			normalized = cache.normalized,
			totalRows = normalized.length,
			checkCell = ( normalized[0].length - 1 ),
			fragment = document.createDocumentFragment();

		for ( var i = 0; i < totalRows; i++ ) {
			var pos = normalized[i][checkCell];

			var l = row[pos].length;

			for ( var j = 0; j < l; j++ ) {
				fragment.appendChild( row[pos][j] );
			}

		}
		table.tBodies[0].appendChild( fragment );
	}
	
	/**
	 * Find all header rows in a thead-less table and put them in a <thead> tag.
	 * This only treats a row as a header row if it contains only <th>s (no <td>s)
	 * and if it is preceded entirely by header rows. The algorithm stops when
	 * it encounters the first non-header row.
	 * 
	 * After this, it will look at all rows at the bottom for footer rows
	 * And place these in a tfoot using similar rules.
	 * @param $table jQuery object for a <table>
	 */ 
	function emulateTHeadAndFoot( $table ) {
		var $rows = $table.find( '> tbody > tr' );
		if( !$table.get(0).tHead ) {
			var $thead = $( '<thead>' );
			$rows.each( function() {
				if ( $(this).children( 'td' ).length > 0 ) {
					// This row contains a <td>, so it's not a header row
					// Stop here
					return false;
				}
				$thead.append( this );
			} );
			$table.prepend( $thead );
		}
		if( !$table.get(0).tFoot ) {
			var $tfoot = $( '<tfoot>' );
			var len = $rows.length;
			for ( var i = len-1; i >= 0; i-- ) {
				if( $( $rows[i] ).children( 'td' ).length > 0 ){
					break;
				}
				$tfoot.prepend( $( $rows[i] ));
			} 
			$table.append( $tfoot );
		}
	}

	function buildHeaders( table, msg ) {
		var	maxSeen = 0,
			longest,
			realCellIndex = 0,
			$tableHeaders = $( 'thead:eq(0) tr', table );
		if ( $tableHeaders.length > 1 ) {
			$tableHeaders.each(function() {
				if ( this.cells.length > maxSeen ) {
					maxSeen = this.cells.length;
					longest = this;
				}
			});
			$tableHeaders = $( longest );
		}
		$tableHeaders = $tableHeaders.children( 'th' ).each( function( index ) {
			this.column = realCellIndex;

			var colspan = this.colspan;
			colspan = colspan ? parseInt( colspan, 10 ) : 1;
			realCellIndex += colspan;

			this.order = 0;
			this.count = 0;

			if ( $( this ).is( '.unsortable' ) ) {
				this.sortDisabled = true;
			}

			if ( !this.sortDisabled ) {
				var $th = $( this ).addClass( table.config.cssHeader ).attr( 'title', msg[1] );
			}

			// add cell to headerList
			table.config.headerList[index] = this;
		} );

		return $tableHeaders;

	}

	function isValueInArray( v, a ) {
		var l = a.length;
		for ( var i = 0; i < l; i++ ) {
			if ( a[i][0] == v ) {
				return true;
			}
		}
		return false;
	}

	function setHeadersCss( table, $headers, list, css, msg ) {
		// Remove all header information
		$headers.removeClass( css[0] ).removeClass( css[1] );

		var h = [];
		$headers.each( function( offset ) {
			if ( !this.sortDisabled ) {
				h[this.column] = $( this );
			}
		} );

		var l = list.length;
		for ( var i = 0; i < l; i++ ) {
			h[ list[i][0] ].addClass( css[ list[i][1] ] ).attr( 'title', msg[ list[i][1] ] );
		}
	}

	function sortText( a, b ) {
		return ( (a < b) ? false : ((a > b) ? true : 0) );
	}

	function sortTextDesc( a, b ) {
		return ( (b < a) ? false : ((b > a) ? true : 0) );
	}

	function checkSorting( array1, array2, sortList ) {
		var col, fn, ret;
		for ( var i = 0, len = sortList.length; i < len; i++ ) {
			col = sortList[i][0];
			fn = ( sortList[i][1] ) ? sortTextDesc : sortText;
			ret = fn.call( this, array1[col], array2[col] );
			if ( ret !== 0 ) {
				return ret;
			}
		}
		return ret;
	}

	// Merge sort algorithm
	// Based on http://en.literateprograms.org/Merge_sort_(JavaScript)
	function mergeSortHelper( array, begin, beginRight, end, sortList ) {
		for ( ; begin < beginRight; ++begin ) {
			if ( checkSorting( array[begin], array[beginRight], sortList ) ) {
				var v = array[begin];
				array[begin] = array[beginRight];
				var begin2 = beginRight;
				while ( begin2 + 1 < end && checkSorting( v, array[begin2 + 1], sortList ) ) {
					var tmp = array[begin2];
					array[begin2] = array[begin2 + 1];
					array[begin2 + 1] = tmp;
					++begin2;
				}
				array[begin2] = v;
			}
		}
	}

	function mergeSort(array, begin, end, sortList) {
		var size = end - begin;
		if ( size < 2 ) {
			return;
		}

		var beginRight = begin + Math.floor(size / 2);

		mergeSort( array, begin, beginRight, sortList );
		mergeSort( array, beginRight, end, sortList );
		mergeSortHelper( array, begin, beginRight, end, sortList );
	}

	function multisort( table, sortList, cache ) {
		var i = sortList.length;
		mergeSort( cache.normalized, 0, cache.normalized.length, sortList );

		return cache;
	}

	function buildTransformTable() {
		var digits = '0123456789,.'.split( '' );
		var separatorTransformTable = mw.config.get( 'wgSeparatorTransformTable' );
		var digitTransformTable = mw.config.get( 'wgDigitTransformTable' );
		if ( separatorTransformTable === null || ( separatorTransformTable[0] === '' && digitTransformTable[2] === '' ) ) {
			ts.transformTable = false;
		} else {
			ts.transformTable = {};

			// Unpack the transform table
			var ascii = separatorTransformTable[0].split( "\t" ).concat( digitTransformTable[0].split( "\t" ) );
			var localised = separatorTransformTable[1].split( "\t" ).concat( digitTransformTable[1].split( "\t" ) );

			// Construct regex for number identification
			for ( var i = 0; i < ascii.length; i++ ) {
				ts.transformTable[localised[i]] = ascii[i];
				digits.push( $.escapeRE( localised[i] ) );
			}
		}
		var digitClass = '[' + digits.join( '', digits ) + ']';

		// We allow a trailing percent sign, which we just strip. This works fine
		// if percents and regular numbers aren't being mixed.
		ts.numberRegex = new RegExp("^(" + "[-+\u2212]?[0-9][0-9,]*(\\.[0-9,]*)?(E[-+\u2212]?[0-9][0-9,]*)?" + // Fortran-style scientific
		"|" + "[-+\u2212]?" + digitClass + "+[\\s\\xa0]*%?" + // Generic localised
		")$", "i");
	}

	function buildDateTable() {
		var regex = [];
		ts.monthNames = [
			[],
			[]
		];

		for ( var i = 1; i < 13; i++ ) {
			ts.monthNames[0][i] = mw.config.get( 'wgMonthNames' )[i].toLowerCase();
			ts.monthNames[1][i] = mw.config.get( 'wgMonthNamesShort' )[i].toLowerCase().replace( '.', '' );
			regex.push( $.escapeRE( ts.monthNames[0][i] ) );
			regex.push( $.escapeRE( ts.monthNames[1][i] ) );
		}

		// Build piped string
		regex = regex.join( '|' );

		// Build RegEx
		// Any date formated with . , ' - or /
		ts.dateRegex[0] = new RegExp( /^\s*\d{1,2}[\,\.\-\/'\s]{1,2}\d{1,2}[\,\.\-\/'\s]{1,2}\d{2,4}\s*?/i);

		// Written Month name, dmy
		ts.dateRegex[1] = new RegExp( '^\\s*\\d{1,2}[\\,\\.\\-\\/\'\\s]*(' + regex + ')' + '[\\,\\.\\-\\/\'\\s]*\\d{2,4}\\s*$', 'i' );

		// Written Month name, mdy
		ts.dateRegex[2] = new RegExp( '^\\s*(' + regex + ')' + '[\\,\\.\\-\\/\'\\s]*\\d{1,2}[\\,\\.\\-\\/\'\\s]*\\d{2,4}\\s*$', 'i' );

	}

	function explodeRowspans( $table ) {
		// Split multi row cells into multiple cells with the same content
		$table.find( '> tbody > tr > [rowspan]' ).each(function() {
			var rowSpan = this.rowSpan;
			this.rowSpan = 1;
			var cell = $( this );
			var next = cell.parent().nextAll();
			for ( var i = 0; i < rowSpan - 1; i++ ) {
				var td = next.eq( i ).children( 'td' );
				if ( !td.length ) {
					next.eq( i ).append( cell.clone() );
				} else if ( this.cellIndex === 0 ) {
					td.eq( this.cellIndex ).before( cell.clone() );
				} else {
					td.eq( this.cellIndex - 1 ).after( cell.clone() );
				}
			}
		});
	}

	function buildCollationTable() {
		ts.collationTable = mw.config.get( 'tableSorterCollation' );
		ts.collationRegex = null;
		if ( ts.collationTable ) {
			var keys = [];

			// Build array of key names
			for ( var key in ts.collationTable ) {
				if ( ts.collationTable.hasOwnProperty(key) ) { //to be safe
					keys.push(key);
				}
			}
			if (keys.length) {
				ts.collationRegex = new RegExp( '[' + keys.join( '' ) + ']', 'ig' );
			}
		}
	}

	function cacheRegexs() {
		if ( ts.rgx ) {
			return;
		}
		ts.rgx = {
			IPAddress: [
				new RegExp( /^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/)
			],
			currency: [
				new RegExp( /^[Â£$â‚¬?.]/),
				new RegExp( /[Â£$â‚¬]/g)
			],
			url: [
				new RegExp( /^(https?|ftp|file):\/\/$/),
				new RegExp( /(https?|ftp|file):\/\//)
			],
			isoDate: [
				new RegExp( /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/)
			],
			usLongDate: [
				new RegExp( /^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/)
			],
			time: [
				new RegExp( /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/)
			]
		};
	}

	/* Public scope */

	$.tablesorter = {

			defaultOptions: {
				cssHeader: 'headerSort',
				cssAsc: 'headerSortUp',
				cssDesc: 'headerSortDown',
				cssChildRow: 'expand-child',
				sortInitialOrder: 'asc',
				sortMultiSortKey: 'shiftKey',
				sortLocaleCompare: false,
				parsers: {},
				widgets: [],
				headers: {},
				cancelSelection: true,
				sortList: [],
				headerList: [],
				selectorHeaders: 'thead tr:eq(0) th',
				debug: false
			},

			dateRegex: [],
			monthNames: [],

			/**
			 * @param $tables {jQuery}
			 * @param settings {Object} (optional)
			 */
			construct: function( $tables, settings ) {
				return $tables.each( function( i, table ) {
					// Declare and cache.
					var	$document, $headers, cache, config, sortOrder,
						$table = $( table ),
						shiftDown = 0,
						firstTime = true;

					// Quit if no tbody
					if ( !table.tBodies ) {
						return;
					}
					if ( !table.tHead ) {
						// No thead found. Look for rows with <th>s and
						// move them into a <thead> tag or a <tfoot> tag
						emulateTHeadAndFoot( $table );
						
						// Still no thead? Then quit
						if ( !table.tHead ) {
							return;
						}
					}
					$table.addClass( "jquery-tablesorter" );

					// New config object.
					table.config = {};

					// Merge and extend.
					config = $.extend( table.config, $.tablesorter.defaultOptions, settings );

					// Save the settings where they read
					$.data( table, 'tablesorter', config );

					// Get the CSS class names, could be done else where.
					var sortCSS = [ config.cssDesc, config.cssAsc ];
					var sortMsg = [ mw.msg( 'sort-descending' ), mw.msg( 'sort-ascending' ) ];

					// Build headers
					$headers = buildHeaders( table, sortMsg );

					// Grab and process locale settings
					buildTransformTable();
					buildDateTable();
					buildCollationTable();

					// Precaching regexps can bring 10 fold
					// performance improvements in some browsers.
					cacheRegexs();

					// Apply event handling to headers
					// this is too big, perhaps break it out?
					$headers.click( function( e ) {
						if ( e.target.nodeName.toLowerCase() == 'a' ) {
							// The user clicked on a link inside a table header
							// Do nothing and let the default link click action continue
							return true;
						}

						if ( firstTime ) {
							firstTime = false;
							
							// Legacy fix of .sortbottoms
							// Wrap them inside inside a tfoot (because that's what they actually want to be) &
							// and put the <tfoot> at the end of the <table>
							var $sortbottoms = $table.find( '> tbody > tr.sortbottom' );
							if ( $sortbottoms.length ) {
								var $tfoot = $table.children( 'tfoot' );
								if ( $tfoot.length ) {
									$tfoot.eq(0).prepend( $sortbottoms );
								} else {
									$table.append( $( '<tfoot>' ).append( $sortbottoms ) )
								}
							}
							
							explodeRowspans( $table );
							// try to auto detect column type, and store in tables config
							table.config.parsers = buildParserCache( table, $headers );
							// build the cache for the tbody cells
							cache = buildCache( table );
						}
						var totalRows = ( $table[0].tBodies[0] && $table[0].tBodies[0].rows.length ) || 0;
						if ( !table.sortDisabled && totalRows > 0 ) {

							// Cache jQuery object
							var $cell = $( this );

							// Get current column index
							var i = this.column;

							// Get current column sort order
							this.order = this.count % 2;
							this.count++;

							// User only wants to sort on one column
							if ( !e[config.sortMultiSortKey] ) {
								// Flush the sort list
								config.sortList = [];
								// Add column to sort list
								config.sortList.push( [i, this.order] );

							// Multi column sorting
							} else {
								// The user has clicked on an already sorted column.
								if ( isValueInArray( i, config.sortList ) ) {
									// Reverse the sorting direction for all tables.
									for ( var j = 0; j < config.sortList.length; j++ ) {
										var s = config.sortList[j],
											o = config.headerList[s[0]];
										if ( s[0] == i ) {
											o.count = s[1];
											o.count++;
											s[1] = o.count % 2;
										}
									}
								} else {
									// Add column to sort list array
									config.sortList.push( [i, this.order] );
								}
							}

							// Set CSS for headers
							setHeadersCss( $table[0], $headers, config.sortList, sortCSS, sortMsg );
							appendToTable(
								$table[0], multisort( $table[0], config.sortList, cache )
							);

							// Stop normal event by returning false
							return false;
						}

					// Cancel selection
					} ).mousedown( function() {
						if ( config.cancelSelection ) {
							this.onselectstart = function() {
								return false;
							};
							return false;
						}
					} );
				} );
			},

			addParser: function( parser ) {
				var	l = parsers.length,
					a = true;
				for ( var i = 0; i < l; i++ ) {
					if ( parsers[i].id.toLowerCase() == parser.id.toLowerCase() ) {
						a = false;
					}
				}
				if ( a ) {
					parsers.push( parser );
				}
			},

			formatDigit: function( s ) {
				if ( ts.transformTable !== false ) {
					var	out = '',
						c;
					for ( var p = 0; p < s.length; p++ ) {
						c = s.charAt(p);
						if ( c in ts.transformTable ) {
							out += ts.transformTable[c];
						} else {
							out += c;
						}
					}
					s = out;
				}
				var i = parseFloat( s.replace( /[, ]/g, '' ).replace( "\u2212", '-' ) );
				return ( isNaN(i)) ? 0 : i;
			},

			formatFloat: function( s ) {
				var i = parseFloat(s);
				return ( isNaN(i)) ? 0 : i;
			},

			formatInt: function( s ) {
				var i = parseInt( s, 10 );
				return ( isNaN(i)) ? 0 : i;
			},

			clearTableBody: function( table ) {
				if ( $.browser.msie ) {
					var empty = function( el ) {
						while ( el.firstChild ) {
							el.removeChild( el.firstChild );
						}
					};
					empty( table.tBodies[0] );
				} else {
					table.tBodies[0].innerHTML = '';
				}
			}
		};

	// Shortcut
	ts = $.tablesorter;

	// Register as jQuery prototype method
	$.fn.tablesorter = function( settings ) {
		return ts.construct( this, settings );
	};

	// Add default parsers
	ts.addParser( {
		id: 'text',
		is: function( s ) {
			return true;
		},
		format: function( s ) {
			s = $.trim( s.toLowerCase() );
			if ( ts.collationRegex ) {
				var tsc = ts.collationTable;
				s = s.replace( ts.collationRegex, function( match ) {
					var r = tsc[match] ? tsc[match] : tsc[match.toUpperCase()];
					return r.toLowerCase();
				} );
			}
			return s;
		},
		type: 'text'
	} );

	ts.addParser( {
		id: 'IPAddress',
		is: function( s ) {
			return ts.rgx.IPAddress[0].test(s);
		},
		format: function( s ) {
			var	a = s.split( '.' ),
				r = '',
				l = a.length;
			for ( var i = 0; i < l; i++ ) {
				var item = a[i];
				if ( item.length == 1 ) {
					r += '00' + item;
				} else if ( item.length == 2 ) {
					r += '0' + item;
				} else {
					r += item;
				}
			}
			return $.tablesorter.formatFloat(r);
		},
		type: 'numeric'
	} );

	ts.addParser( {
		id: 'currency',
		is: function( s ) {
			return ts.rgx.currency[0].test(s);
		},
		format: function( s ) {
			return $.tablesorter.formatDigit( s.replace( ts.rgx.currency[1], '' ) );
		},
		type: 'numeric'
	} );

	ts.addParser( {
		id: 'url',
		is: function( s ) {
			return ts.rgx.url[0].test(s);
		},
		format: function( s ) {
			return $.trim( s.replace( ts.rgx.url[1], '' ) );
		},
		type: 'text'
	} );

	ts.addParser( {
		id: 'isoDate',
		is: function( s ) {
			return ts.rgx.isoDate[0].test(s);
		},
		format: function( s ) {
			return $.tablesorter.formatFloat((s !== '') ? new Date(s.replace(
			new RegExp( /-/g), '/')).getTime() : '0' );
		},
		type: 'numeric'
	} );

	ts.addParser( {
		id: 'usLongDate',
		is: function( s ) {
			return ts.rgx.usLongDate[0].test(s);
		},
		format: function( s ) {
			return $.tablesorter.formatFloat( new Date(s).getTime() );
		},
		type: 'numeric'
	} );

	ts.addParser( {
		id: 'date',
		is: function( s ) {
			return ( ts.dateRegex[0].test(s) || ts.dateRegex[1].test(s) || ts.dateRegex[2].test(s ));
		},
		format: function( s, table ) {
			s = $.trim( s.toLowerCase() );

			for ( var i = 1, j = 0; i < 13 && j < 2; i++ ) {
				s = s.replace( ts.monthNames[j][i], i );
				if ( i == 12 ) {
					j++;
					i = 0;
				}
			}

			s = s.replace( /[\-\.\,' ]/g, '/' );

			// Replace double slashes
			s = s.replace( /\/\//g, '/' );
			s = s.replace( /\/\//g, '/' );
			s = s.split( '/' );

			// Pad Month and Day
			if ( s[0] && s[0].length == 1 ) {
				s[0] = '0' + s[0];
			}
			if ( s[1] && s[1].length == 1 ) {
				s[1] = '0' + s[1];
			}
			var y;

			if ( !s[2] ) {
				// Fix yearless dates
				s[2] = 2000;
			} else if ( ( y = parseInt( s[2], 10) ) < 100 ) {
				// Guestimate years without centuries
				if ( y < 30 ) {
					s[2] = 2000 + y;
				} else {
					s[2] = 1900 + y;
				}
			}
			// Resort array depending on preferences
			if ( mw.config.get( 'wgDefaultDateFormat' ) == 'mdy' || mw.config.get( 'wgContentLanguage' ) == 'en' ) {
				s.push( s.shift() );
				s.push( s.shift() );
			} else if ( mw.config.get( 'wgDefaultDateFormat' ) == 'dmy' ) {
				var d = s.shift();
				s.push( s.shift() );
				s.push(d);
			}
			return parseInt( s.join( '' ), 10 );
		},
		type: 'numeric'
	} );

	ts.addParser( {
		id: 'time',
		is: function( s ) {
			return ts.rgx.time[0].test(s);
		},
		format: function( s ) {
			return $.tablesorter.formatFloat( new Date( '2000/01/01 ' + s ).getTime() );
		},
		type: 'numeric'
	} );

	ts.addParser( {
		id: 'number',
		is: function( s, table ) {
			return $.tablesorter.numberRegex.test( $.trim( s ));
		},
		format: function( s ) {
			return $.tablesorter.formatDigit(s);
		},
		type: 'numeric'
	} );

} )( jQuery );

/*<syntaxhighlight lang="javascript">*/
*/
/*
 * Copyright © 2009, Daniel Friesen
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the script nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
( function( $ ) {
 
	// CONFIG
	var config = window.ShowHideConfig = $.extend( true, {
		autoCollapse: 2,
		userLang: true,
		brackets: '[]',
		linkBefore: false,
		// Bulgarian
		bg: {
			show: "Покажи",
			hide: "Скрий",
			showAll: "Покажи всички",
			hideAll: "Скрий всички"
		},
		// German
		de: {
			show: "anzeigen",
			hide: "verbergen",
			showAll: "alle anzeigen",
			hideAll: "alle verbergen"
		},
		// English
		en: {
			show: "show",
			hide: "hide",
			showAll: "show all",
			hideAll: "hide all"
		},
		// Spanish
		es: {
			show: "Mostrar",
			hide: "Ocultar",
			showAll: "Mostrar todo",
			hideAll: "Ocultar todo"
		},
		// French
		fr: {
			show: "afficher",
			hide: "masquer",
			showAll: "tout afficher",
			hideAll: "tout masquer"
		},
		// Hungarian
		hu: {
			show: "kibontás",
			hide: "elrejtés",
			showAll: "összes kibontása",
			hideAll: "összes elrejtése"
		},
		// Italian
		it: {
			show: "Mostra",
			hide: "Nascondi",
			showAll: "Mostra tutti",
			hideAll: "Nascondi tutti"
		},
		// Japanese
		ja: {
			show: "表示",
			hide: "非表示",
			showAll: "すべて表示",
			hideAll: "すべて非表示"
		},
		// Korean
		ko: {
			show: "보이기",
			hide: "숨기기",
			showAll: "모두 보이기",
			hideAll: "모두 숨기기"
		},
		// Dutch
		nl: {
			show: "tonen",
			hide: "verbergen",
			showAll: "alles tonen",
			hideAll: "alles verbergen"
		},
		// Polish
		pl: {
			show: "Pokaż",
			hide: "Ukryj",
			showAll: "Pokaż wszystko",
			hideAll: "Ukryj wszystko"
		},
		// Portuguese
		pt: {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Brazilian Portuguese
		'pt-br': {
			show: "Mostrar",
			hide: "Esconder",
			showAll: "Expandir Todos",
			hideAll: "Esconder Todos"
		},
		// Russian
		ru: {
			show: "Открыть",
			hide: "Скрыть",
			showAll: "Открыть все",
			hideAll: "Скрыть все"
		},
		// Chinese
		zh: {
			show: "显示",
			hide: "隐藏",
			showAll: "全部显示",
			hideAll: "全部隐藏"
		}
		// Make a post on the talkpage if you have i18n updates
	}, window.ShowHideConfig || {} );
 
	// i18n function
	function msg( name ) {
		if ( config.userLang && wgUserLanguage in config && name in config[wgUserLanguage] ) {
			return config[wgUserLanguage][name];
		}
		if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
			return config[wgContentLanguage][name];
		}
		return config.en[name];
	}
 
	// common
	$.fn.onLink = function( fn ) {
		return this.bind( 'click keypress', function(e) {
			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) ) {
				fn.call(this, e);
			}
		} );
	};
 
	/** Collapsible tables using jQuery
	 *
	 *  Description: Allows tables to be collapsed, showing only the header.
	 */
	function collapseTable( node, state ) {
		var	$table = $( node ),
			$button = $table.find( 'tr:first > th:last .collapseLink' );
 
		if ( !$table.length || !$button.length ) {
			return false;
		}
 
		if ( typeof state === 'boolean' ) {
			$table.toggleClass( 'collapsed', !state );
		} else {
			$table.toggleClass( 'collapsed' );
		}
		var hidden = $table.hasClass( 'collapsed' );
		$table.find( '> * > tr' ).not( ':first, .nocollapse' )[hidden?"hide":"show"]();
		$button.text( msg( hidden ? "show" : "hide" ) );
		return true;
	}
 
	function createCollapseButtons() {
		var NavigationBoxes = [];
		$( 'table.collapsible' ).each( function () {
			NavigationBoxes.push(this);
			var	$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).css({ cursor: "pointer" }).onLink( function( e ) { collapseTable( $(this).closest('table') ); } ),
				$button = $( "<span class=collapseButton />" ).css( {
				"float": "right",
				textAlign: "right",
				fontWeight: "normal",
				width: "6em",
				marginLeft: "-100%"
			} );
			$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
 
			var $header = $( this ).find( 'tr:first > th:last' ).prepend($button);
		} );
 
		// if more Navigation Bars found than Default: hide all
		if ( $( NavigationBoxes ).filter( '.autocollapse' ).length >= config.autoCollapse ) {
			$( NavigationBoxes ).filter( '.autocollapse' ).each( function () { collapseTable( this, false ); } );
		}
		$( NavigationBoxes ).filter( '.collapsed' ).each( function () { collapseTable( this, false ); } );
	}
 
	$( createCollapseButtons );
 
	/** Dynamic Navigation Bars with jQuery
	 *
	 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
	 */
 
	// shows and hides content and picture (if available) of navigation bars
	function toggleNavigationBar( node ) {
		var	$navFrame = $( node ),
			$navToggle = $navFrame.find( '.NavHead:first .collapseLink' );
 
		if ( !$navFrame.length || !$navToggle.length ) {
			return false;
		}
 
		$navFrame.toggleClass( 'NavVisible' );
		$navFrame.find( '.NavPic, .NavContent' ).not( $navFrame.find( '.NavFrame .NavPic' ) ).not( $navFrame.find( '.NavFrame .NavContent' ) ).slideToggle();
		$navToggle.text( msg( $navFrame.hasClass( 'NavVisible' ) ? "hide" : "show" ) );
		return true;
	}
 
	// adds show/hide-button to navigation bars
	function createNavigationBarToggleButton() {
		var NavFrames = $( '.NavFrame' ).addClass( 'NavVisible' ).each( function () {
			var	$navHead = $( this ).find( '.NavHead:first' ),
				$buttonLink = $( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hide" ) ).onLink( function ( e ) { toggleNavigationBar( $( this ).closest( '.NavFrame' ) ); } ),
				$button = $( '<span class="NavToggle collapseButton" />' );
			$navHead.filter( 'legend' ).append( ' - ' );
			if ( config.brackets ) {
				$button.append( document.createTextNode(config.brackets.substr(0, config.brackets.length/2)), $buttonLink, config.brackets.substr(config.brackets.length/2) );
			} else {
				$button.append( $buttonLink );
			}
			$navHead[config.linkBefore?"prepend":"append"]($button);
		} );
		// if more Navigation Bars found than Default: hide all
		if ( NavFrames.length >= config.autoCollapse ) {
			NavFrames.not( '.noautocollapse' ).each( function () { toggleNavigationBar(this); } );
		} else {
			NavFrames.filter( '.collapsed' ).each( function () { toggleNavigationBar(this); } );
		}
		return true;
	}
 
	$( createNavigationBarToggleButton );
 
	$( function () {
		$( '.NavGlobal' ).each( function () {
			$( '<span class=NavGlobalShow />' ).append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "showAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( !$( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
			$( this ).append( ' ' );
			$('<span class=NavGlobalHide />').append(
				document.createTextNode( '[' ),
				$( '<span tabIndex=0 class=collapseLink />' ).text( msg( "hideAll" ) ).onLink( function ( e ) {
					$( '.NavFrame' ).each( function () { if ( $( this ).hasClass( 'NavVisible' ) ) toggleNavigationBar(this); } );
				} ),
				']'
			).appendTo( this );
		} );
	} );
 
} )( jQuery );
/*
/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, regexp:false, strict:true, trailing:true, maxcomplexity:10 */
/*global mediaWiki:true*/
 
(function (module, mw, $) {
 
    'use strict';
 
    if (module.loadSource) return;
 
    var translations = {
        en: {
            viewSource: 'View source',
            viewArticle: 'View article'
        },
        de: {
            viewSource: 'Quelltext Ansicht',
            viewArticle: 'Artikel Ansicht'
        },
        hu: {
            viewSource: 'Forráskód megtekintése',
            viewArticle: 'Szócikk megtekintése'
        },
        pl: {
            viewSource: 'Tekst źródłowy',
            viewArticle: 'Pokaż artykuł'
        },
        es: {
            viewSource: 'Ver código fuente',
            viewArticle: 'Ver artículo'
        },
        ca: {
            viewSource: 'Veure codi font',
            viewArticle: 'Veure l\'article'
        }
    },
 
    parserFunctions = {
        '#expr': 'Help:Extension:ParserFunctions#.23expr',
        '#if': 'Help:Extension:ParserFunctions#.23if',
        '#ifeq': 'Help:Extension:ParserFunctions#.23ifeq',
        '#iferror': 'Help:Extension:ParserFunctions#.23iferror',
        '#ifexpr': 'Help:Extension:ParserFunctions#.23ifexpr',
        '#ifexist': 'Help:Extension:ParserFunctions#.23ifexist',
        '#rel2abs': 'Help:Extension:ParserFunctions#.23rel2abs',
        '#switch': 'Help:Extension:ParserFunctions#.23switch',
        '#time': 'Help:Extension:ParserFunctions#.23time',
        '#timel': 'Help:Extension:ParserFunctions#.23timel',
        '#titleparts': 'Help:Extension:ParserFunctions#.23titleparts',
        'subst': 'Help:Substitution',
        'safesubst': 'Help:Substitution',
        '#len': 'Extension:StringFunctions#.23len:',
        '#pos': 'Extension:StringFunctions#.23pos:',
        '#rpos': 'Extension:StringFunctions#.23rpos:',
        '#sub': 'Extension:StringFunctions#.23sub:',
        '#pad': 'Extension:StringFunctions#.23pad:',
        '#replace': 'Extension:StringFunctions#.23replace:',
        '#explode': 'Extension:StringFunctions#.23explode:',
        '#urlencode': 'Extension:StringFunctions#.23urlencode:_and_.23urldecode:',
        '#urldecode': 'Extension:StringFunctions#.23urlencode:_and_.23urldecode:',
 
        //  ->http://www.mediawiki.org/wiki/Help:Magic_words#Miscellaneous
        '#tag': 'Help:Magic_words#Miscellaneous'
    },
 
    parserTags = {
        'activityfeed': 'http://community.wikia.com/wiki/Help:Wiki_Activity',
        'aoaudio': 'http://community.wikia.com/wiki/Help:Video',
        'aovideo': 'http://community.wikia.com/wiki/Help:Video',
        'bloglist': 'http://community.wikia.com/wiki/Help:Blog_article/Bloglist',
        'categorytree': 'http://www.mediawiki.org/wiki/Categorytree',
        'charinsert': 'http://www.mediawiki.org/wiki/Extension:CharInsert',
        'choose': 'http://www.mediawiki.org/wiki/Extension:RandomSelection',
        'createbox': 'http://www.mediawiki.org/wiki/Extension:CreateBox',
        'gallery': 'http://www.mediawiki.org/wiki/Gallery#Rendering_a_gallery_of_images',
        'ggtube': 'http://community.wikia.com/wiki/Help:Video',
        'googlespreadsheet': 'http://www.mediawiki.org/wiki/Extension:GoogleDocs4MW',
        'gtrailer': 'http://community.wikia.com/wiki/Help:Video',
        'gvideo': 'http://community.wikia.com/wiki/Help:Video',
        'hiero': 'http://www.mediawiki.org/wiki/Hiero',
        'imagemap': 'http://www.mediawiki.org/wiki/Imagemap',
        'includeonly': 'http://www.mediawiki.org/wiki/Templates',
        'inputbox': 'http://www.mediawiki.org/wiki/Inputbox',
        'mainpage-endcolumn': 'http://community.wikia.com/wiki/Help:Main_page_column_tags',
        'mainpage-leftcolumn-start': 'http://community.wikia.com/wiki/Help:Main_page_column_tags',
        'mainpage-rightcolumn-start': 'http://community.wikia.com/wiki/Help:Main_page_column_tags',
        'math': 'http://www.mediawiki.org/wiki/Math',
        'nicovideo': 'http://community.wikia.com/wiki/Help:Video',
        'noinclude': 'http://www.mediawiki.org/wiki/Templates',
        'nowiki': 'http://meta.wikimedia.org/wiki/Help:Wikitext_examples#Just_show_what_I_typed',
        'onlyinclude': 'http://www.mediawiki.org/wiki/Templates',
        'poem': 'http://www.mediawiki.org/wiki/Extension:Poem',
        'poll': 'http://www.mediawiki.org/wiki/Extension:AJAXPoll',
        'pre': 'http://meta.wikimedia.org/wiki/Help:Wikitext_examples#Just_show_what_I_typed',
        'randomimage': 'http://www.mediawiki.org/wiki/Extension:RandomImage',
        'ref': 'http://www.mediawiki.org/wiki/Ref',
        'references': 'http://www.mediawiki.org/wiki/Ref',
        'rss': 'http://community.wikia.com/wiki/Help:Feeds',
        'section': 'http://www.mediawiki.org/wiki/Extension:Labeled_Section_Transclusion',
        'source': 'http://www.mediawiki.org/wiki/Extension:SyntaxHighlight_GeSHi',
        'syntaxhighlight': 'http://www.mediawiki.org/wiki/Extension:SyntaxHighlight_GeSHi',
        'tabber': 'http://community.wikia.com/wiki/Help:Tabber',
        'tabview': 'community.wikia.com/wiki/Help:Tab_view',
        'tangler': 'http://community.wikia.com/wiki/Help:Video',
        'timeline': 'http://www.mediawiki.org/wiki/Extension:Timeline',
        'verbatim': 'http://community.wikia.com/wiki/Help:Verbatim_tags',
        'videogallery': 'http://community.wikia.com/wiki/Help:Video',
        'wegame': 'http://community.wikia.com/wiki/Help:Video',
        'youtube': 'http://community.wikia.com/wiki/Help:Video'
    },
 
    i18n = translations[
        mw.config.get('wgContentLanguage')
    ] || translations.en,
 
    $content, $list, $source, $a, $toc, headers = [];
 
    function addButton () {
        $a = $('<li>' +
            '<a id="view-source">' +
                i18n.viewSource +
            '</a>' +
        '</li>')
        .appendTo($list)
        .find('a')
        .data('source', false)
        .click(function () {
            $a.closest('.wikia-menu-button')
            .removeClass('active');
            module[$a.data('source') ? 'hideSource' : 'loadSource']();
        });
    }
 
    function addCSS () {
        $(document.head || 'head')
        .append('<style type="text/css">' +
        '#source-code, #source-toc {' +
            'font-family: "Courier New",Courier,monospace;' +
            'background: white;' +
            'color: black;' +
            'padding: 10px;' +
        '}' +
        '#source-code {' +
            'font-size: 13px;' +
            'white-space: pre-wrap;' +
        '}' +
        '#source-toc {' +
            'font-size: 12px;' +
            'overflow-x: auto;' +
            'white-space: nowrap;' +
        '}' +
        '#source-code a, #source-code a:link, #source-code a:visited, ' +
        '#source-toc a, #source-toc a:link, #source-toc a:visited {' +
            'color: black;' +
            'text-decoration: none;' +
        '}' +
        '#source-code a, #source-code a:link, #source-code a:visited {' +
            'border-bottom: 1px dotted #bbb;' +
        '}' +
        '#source-code a:hover, #source-toc a:hover {' +
            'color: darkblue;' +
            'border-bottom: 1px solid darkblue;' +
            'text-decoration: none;' +
        '}' +
        '</style>');
    }
 
    function joinHrefParts (parts) {
        for (var i = 0; i < parts.length; i++) {
            parts[i] = encodeURIComponent(parts[i]);
        }
        return parts.join(':').replace(/ /g, '_');
    }
 
    function createHref (link) {
 
        var parts, hash = '';
 
        if (link.indexOf('#') !== -1) {
            parts = link.split(/\#/);
            link = parts.shift();
            if (!link.length) link = mw.config.get('wgPageName');
            hash = '#' + parts.pop();
        }
 
        if (link[0] === '/') link = mw.config.get('wgPageName') + link;
 
        var interwikiMap = {w:'http://community.wikia.com/wiki/$1',community:'http://community.wikia.com/wiki/$1',bugzilla:'https://bugzilla.wikimedia.org/show_bug.cgi?id=$1',commons:'http://commons.wikimedia.org/wiki/$1',creativecommons:'http://creativecommons.org/licenses/$1',creativecommonswiki:'http://wiki.creativecommons.org/$1',dictionary:'http://www.dict.org/bin/Dict?Database=*&Form=Dict1&Strategy=*&Query=$1',dict:'http://www.dict.org/bin/Dict?Database=*&Form=Dict1&Strategy=*&Query=$1',docbook:'http://wiki.docbook.org/topic/$1',download:'http://download.wikimedia.org/$1',dbdump:'http://download.wikimedia.org/$1/latest/',dreamhost:'http://wiki.dreamhost.com/index.php/$1',finalfantasy:'http://finalfantasy.wikia.com/wiki/$1',flickruser:'http://www.flickr.com/people/$1',flickrphoto:'http://www.flickr.com/photo.gne?id=$1',foundation:'http://wikimediafoundation.org/wiki/$1',gerrit:'https://gerrit.wikimedia.org/r/$1',git:'https://gerrit.wikimedia.org/r/gitweb?p=mediawiki/$1;a=log;h=refs/heads/master',google:'http://www.google.com/search?q=$1',googledefine:'http://www.google.com/search?q=define:$1',googlegroups:'http://groups.google.com/groups?q=$1',guildwiki:'http://guildwars.wikia.com/wiki/$1',gutenberg:'http://www.gutenberg.org/etext/$1',gutenbergwiki:'http://www.gutenberg.org/wiki/$1',h2wiki:'http://halowiki.net/p/$1',imdbname:'http://www.imdb.com/name/nm$1/',imdbtitle:'http://www.imdb.com/title/tt$1/',imdbcompany:'http://www.imdb.com/company/co$1/',imdbcharacter:'http://www.imdb.com/character/ch$1/',incubator:'http://incubator.wikimedia.org/wiki/$1',infosecpedia:'http://infosecpedia.org/wiki/$1',irc:'irc://irc.freenode.net/$1',ircrc:'irc://irc.wikimedia.org/$1',rcirc:'irc://irc.wikimedia.org/$1','iso639-3':'http://www.sil.org/iso639-3/documentation.asp?id=$1',issn:'http://www.worldcat.org/issn/$1',javanet:'http://wiki.java.net/bin/view/Main/$1',javapedia:'http://wiki.java.net/bin/view/Javapedia/$1',lostpedia:'http://lostpedia.wikia.com/wiki/$1',mail:'https://lists.wikimedia.org/mailman/listinfo/$1',mailarchive:'http://lists.wikimedia.org/pipermail/$1',mariowiki:'http://www.mariowiki.com/$1',marveldatabase:'http://www.marveldatabase.com/wiki/index.php/$1',mediawikiwiki:'http://www.mediawiki.org/wiki/$1',mediazilla:'https://bugzilla.wikimedia.org/$1',memoryalpha:'http://memory-alpha.org/wiki/$1',metawiki:'http://sunir.org/apps/meta.pl?$1',metawikipedia:'http://meta.wikimedia.org/wiki/$1',mozcom:'http://mozilla.wikia.com/wiki/$1',mozillawiki:'https://wiki.mozilla.org/$1',mozillazinekb:'http://kb.mozillazine.org/$1',musicbrainz:'http://musicbrainz.org/doc/$1',mw:'http://www.mediawiki.org/wiki/$1',mwod:'http://www.merriam-webster.com/cgi-bin/dictionary?book=Dictionary&va=$1',mwot:'http://www.merriam-webster.com/cgi-bin/thesaurus?book=Thesaurus&va=$1',nost:'http://nostalgia.wikipedia.org/wiki/$1',nostalgia:'http://nostalgia.wikipedia.org/wiki/$1',openfacts:'http://openfacts.berlios.de/index-en.phtml?title=$1',openlibrary:'http://openlibrary.org/$1',openstreetmap:'http://wiki.openstreetmap.org/wiki/$1',openwetware:'http://openwetware.org/wiki/$1',openwiki:'http://openwiki.com/?$1',osmwiki:'http://wiki.openstreetmap.org/wiki/$1',otrs:'https://ticket.wikimedia.org/otrs/index.pl?Action=AgentTicketZoom&TicketID=$1',otrswiki:'http://otrs-wiki.wikimedia.org/wiki/$1',perlnet:'http://perl.net.au/wiki/$1',phpwiki:'http://phpwiki.sourceforge.net/phpwiki/index.php?$1',pyrev:'http://www.mediawiki.org/wiki/Special:Code/pywikipedia/$1',pythoninfo:'http://www.python.org/cgi-bin/moinmoin/$1',pythonwiki:'http://www.pythonwiki.de/$1',pywiki:'http://c2.com/cgi/wiki?$1',rev:'http://www.mediawiki.org/wiki/Special:Code/MediaWiki/$1',revo:'http://purl.org/NET/voko/revo/art/$1.html',rfc:'http://tools.ietf.org/html/rfc$1',robowiki:'http://robowiki.net/?$1',reuterswiki:'http://glossary.reuters.com/index.php/$1',slashdot:'http://slashdot.org/article.pl?sid=$1',sourceforge:'http://sourceforge.net/$1',species:'http://species.wikimedia.org/wiki/$1',strategy:'http://strategy.wikimedia.org/wiki/$1',strategywiki:'http://strategywiki.org/wiki/$1',sulutil:'http://toolserver.org/~quentinv57/sulinfo/$1',svn:'http://svn.wikimedia.org/viewvc/mediawiki/$1?view=log',svgwiki:'http://wiki.svg.org/index.php/$1',technorati:'http://www.technorati.com/search/$1',tenwiki:'http://ten.wikipedia.org/wiki/$1',testwiki:'http://test.wikipedia.org/wiki/$1',ticket:'https://ticket.wikimedia.org/otrs/index.pl?Action=AgentTicketZoom&TicketNumber=$1',tools:'http://toolserver.org/$1',tswiki:'https://wiki.toolserver.org/view/$1',translatewiki:'http://translatewiki.net/wiki/$1',tvtropes:'http://www.tvtropes.org/pmwiki/pmwiki.php/Main/$1',unreal:'http://wiki.beyondunreal.com/wiki/$1',urbandict:'http://www.urbandictionary.com/define.php?term=$1',usemod:'http://www.usemod.com/cgi-bin/wiki.pl?$1',usability:'http://usability.wikimedia.org/wiki/$1',webisodes:'http://www.webisodes.org/$1',wg:'http://wg.en.wikipedia.org/wiki/$1',wiki:'http://c2.com/cgi/wiki?$1',wikia:'http://www.wikia.com/wiki/c:$1',wikiasite:'http://www.wikia.com/wiki/c:$1',wikibooks:'http://en.wikibooks.org/wiki/$1',wikichat:'http://www.wikichat.org/$1',wikicities:'http://www.wikia.com/wiki/$1',wikicity:'http://www.wikia.com/wiki/c:$1',wikihow:'http://www.wikihow.com/$1',wikiindex:'http://wikiindex.org/$1',wikimedia:'http://wikimediafoundation.org/wiki/$1',wikinews:'http://en.wikinews.org/wiki/$1',wikipedia:'http://en.wikipedia.org/wiki/$1',wikipediawikipedia:'http://en.wikipedia.org/wiki/Wikipedia:$1',wikiquote:'http://en.wikiquote.org/wiki/$1',wikischool:'http://www.wikischool.de/wiki/$1',wikisource:'http://en.wikisource.org/wiki/$1',wikispecies:'http://species.wikimedia.org/wiki/$1',wikispot:'http://wikispot.org/?action=gotowikipage&v=$1',wikitech:'http://wikitech.wikimedia.org/view/$1',wikiversity:'http://en.wikiversity.org/wiki/$1',betawikiversity:'http://beta.wikiversity.org/wiki/$1',wiktionary:'http://en.wiktionary.org/wiki/$1',wmar:'http://www.wikimedia.org.ar/wiki/$1',wmau:'http://wikimedia.org.au/wiki/$1',wmbd:'http://bd.wikimedia.org/wiki/$1',wmbe:'http://be.wikimedia.org/wiki/$1',wmbr:'http://br.wikimedia.org/wiki/$1',wmca:'http://wikimedia.ca/wiki/$1',wmch:'http://www.wikimedia.ch/$1',wmcz:'http://meta.wikimedia.org/wiki/Wikimedia_Czech_Republic/$1',wmdc:'http://wikimediadc.org/wiki/$1',securewikidc:'https://secure.wikidc.org/$1',wmde:'http://wikimedia.de/wiki/$1',wmfi:'http://fi.wikimedia.org/wiki/$1',wmfr:'http://wikimedia.fr/$1',wmhk:'http://wikimedia.hk/index.php/$1',wmhu:'http://wiki.media.hu/wiki/$1',wmid:'http://www.wikimedia.or.id/wiki/$1',wmil:'http://www.wikimedia.org.il/$1',wmin:'http://wiki.wikimedia.in/$1',wmit:'http://wiki.wikimedia.it/wiki/$1',wmmx:'http://mx.wikimedia.org/wiki/$1',wmnl:'http://nl.wikimedia.org/wiki/$1',wmnyc:'http://nyc.wikimedia.org/wiki/$1',wmno:'http://no.wikimedia.org/wiki/$1',wmpl:'http://pl.wikimedia.org/wiki/$1',wmrs:'http://rs.wikimedia.org/wiki/$1',wmru:'http://ru.wikimedia.org/wiki/$1',wmse:'http://se.wikimedia.org/wiki/$1',wmtw:'http://wikimedia.tw/wiki/index.php5/$1',wmua:'http://ua.wikimedia.org/wiki/$1',wmuk:'http://uk.wikimedia.org/wiki/$1',wmf:'http://wikimediafoundation.org/wiki/$1',wmfblog:'http://blog.wikimedia.org/$1',wookieepedia:'http://starwars.wikia.com/wiki/$1',wowwiki:'http://www.wowwiki.com/$1'};
 
        parts = link.split(/\:/);
 
        if ( parts.length > 2 && parts[0] === 'w' && parts[1] === 'c') {
            parts = parts.slice(2);
            return 'http://' + parts.shift() + '.wikia.com/wiki/' + joinHrefParts(parts) + hash;
        } else if (parts.length > 1 && interwikiMap[parts[0].toLowerCase()]) {
            return interwikiMap[parts.shift().toLowerCase()].replace(/\$1/, joinHrefParts(parts) + hash);
        }
        return '/wiki/' + joinHrefParts(parts) + hash;
    }
 
    function replaceTag (all, delim, tag) {
        if (!parserTags[tag]) return '&lt;' + tag;
        return delim + '<a href="' + parserTags[tag] + '">' + tag + '</a>';
    }
 
    function replaceHeaders (m) {
        headers.push(m);
        return '<a name="h' + (headers.length-1) + '"></a>' + m;
    }
 
    function replaceWikiLink (all, link, title) {
        return '[[<a href="' + createHref(link) + '">' + link + '</a>'+ title + ']]';
    }
 
    function replaceTemplates (all, delim, name) {
        var href, m = name.match(/^(\#?)(\w+)(\:.*)/),
            fn = m && parserFunctions[m[1] + m[2]];
        if (fn) {
            return delim + m[1] + '<a href="http://www.mediawiki.org/wiki/' + fn + '">' + m[2] + '</a>' + m[3];
        }
        m = name.match(/^(\s*)(.+)(\s*)$/);
        if (m[2][0] === ':') {
            href = m[2].substring(1);
        } else if (m[2].substring(0, 3) === 'w::') {
            href = 'w:' + m[2].substring(3);
        } else {
            href = 'Template:' + m[2];
        }
        return delim + m[1] + '<a href="' + createHref(href) + '">' + m[2] + '</a>' + m[3];
    }
 
    function replaceRegularLinks (all, link, title) {
        return '[<a href="' + link + '">' + link + '</a>'+ title + ']';
    }
 
    function createPseudoToc () {
        if (headers.length && $source.height() > $(window).height()) {
            var toc = '<ul>';
            for (var i = 0; i < headers.length; i++) {
                toc += '<li><a href="#h' + i + '">' + headers[i] + '</a></li>';
            }
            toc += '</ul>';
            $toc = $('<section id="source-toc" class="module">' + toc + '</section>')
            .insertBefore($('#WikiaRail').find('.module').first());
        }
    }
 
    module.loadSource = function () {
        $a.text(i18n.viewArticle)
        .data('source', true);
        if ($source) {
            $source.css('display', 'block');
            $content.css('display', 'none');
            if ($toc) $toc.css('display', 'block');
        } else {
            $.get('/wiki/' + mw.config.get('wgPageName') + '?action=raw&maxage=0&smaxage=0')
            .done(function (wikitext) {
                $source = $('<div id="source-code">' +
                    wikitext
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;' )
                    .replace(/>/g, '&gt;' )
                    .replace(/(&lt;\/?)([\w\:\-]+)/g, replaceTag)
                    .replace(/^((=+)[^\[\]\{\}]+?\2)/gm, replaceHeaders)
                    .replace(/\[{2}([^\[\]\{\}\|]+)(\|[^\]]+)?\]{2}/g, replaceWikiLink)
                    .replace(/\[(https?:\/\/[^ \]]+)([^\]]*)\]/g, replaceRegularLinks)
                    .replace(/((?:^|[^\{])\{\{)([^\{\|\}]+)/g, replaceTemplates)
                    .replace(/\r\n|\r|\n/g, '<br />') +
                '</div>')
                .insertBefore($content.css('display', 'none'));
 
                createPseudoToc();
            });
        }
    };
 
    module.hideSource = function () {
        if (!$source) return;
        $a.text(i18n.viewSource)
        .data('source', false);
        $source.css('display', 'none');
        $content.css('display', 'block');
        if ($toc) $toc.css('display', 'none');
    };
 
    if (mw.config.get('wgAction') === 'view') {
        $(function () {
            $content = $('#mw-content-text');
            $list = $('#WikiaMainContent').find('nav.wikia-menu-button').first().find('ul');
            if ($content.length && $list.length) {
                addButton();
                addCSS();
                if ($.getUrlVar('view') === 'source') {
                    module.loadSource();
                }
            }
        });
    }
 
}((window.dev = window.dev || {}).viewSource = window.dev.viewSource || {}, mediaWiki, jQuery));
 
//