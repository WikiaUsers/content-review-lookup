/** Dynamic navigation bars ************************************************
 * Allows navigations templates to expand and collapse their content to save space
 * Documentation on Wikipedia at [[wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]]
 */

// set up the words in your language
var NavigationBarHide = '[hide]';
var NavigationBarShow = '[show]';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 1;

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//	indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar( indexNavigationBar ) {
	var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
	var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );

	if( !NavFrame || !NavToggle ) {
		return false;
	}

	// if shown now
	if( NavToggle.firstChild.data == NavigationBarHide ) {
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if( NavChild.className == 'NavPic' ) {
				NavChild.style.display = 'none';
			}
			if( NavChild.className == 'NavContent' ) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;

	// if hidden now
	} else if( NavToggle.firstChild.data == NavigationBarShow ) {
		for (
				var NavChild = NavFrame.firstChild;
				NavChild != null;
				NavChild = NavChild.nextSibling
			) {
			if( NavChild.className == 'NavPic' ) {
				NavChild.style.display = 'block';
			}
			if( NavChild.className == 'NavContent' ) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
	var indexNavigationBar = 0;
	// iterate over all < div >-elements
	for(
			var i = 0;
			NavFrame = document.getElementsByTagName( 'div' )[i];
			i++
		) {
		// if found a navigation bar
		if( NavFrame.className == 'NavFrame' ) {
			indexNavigationBar++;
			var NavToggle = document.createElement( 'a' );
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
			NavToggle.setAttribute( 'href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');' );

			var NavToggleText = document.createTextNode( NavigationBarHide );
			NavToggle.appendChild( NavToggleText );
			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
				if( NavFrame.childNodes[j].className == 'NavHead' ) {
					NavFrame.childNodes[j].appendChild( NavToggle );
				}
			}
			NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
		}
	}
	// if more Navigation Bars found than Default: hide all
	if( NavigationBarShowDefault < indexNavigationBar ) {
		for( var i = 1; i <= indexNavigationBar; i++ ) {
			toggleNavigationBar( i );
		}
	}

}

addOnloadHook( createNavigationBarToggleButton, false );


/** Sortable table fixes **************************************************
 * Fixes some problems the default sortable table script has.
 * Slightly modifies the ts_resortTable function found in wikibits.js
 */
function ts_resortTable( lnk ) {
	var span = lnk.getElementsByTagName( 'span' )[0];
	var td = lnk.parentNode;
	var tr = td.parentNode;
	var column = td.cellIndex;
	var table = tr.parentNode;

	while( table && !( table.tagName && table.tagName.toLowerCase() == 'table' ) ) {
		table = table.parentNode;
	}

	if( !table ) {
		return;
	}

	if( table.rows.length <= 1 ) {
		return;
	}

	if( ts_number_transform_table == null ) {
		ts_initTransformTable();
	}

	var rowStart = table.tHead && table.tHead.rows.length > 0 ? 0 : 1;
	var itm = '';
	for( var i = rowStart; i < table.rows.length; i++ ) {
		if( table.rows[i].cells.length > column ) {
			itm = ts_getInnerText( table.rows[i].cells[column] );
			itm = itm.replace(/^[\s\xa0]+/,"").replace(/[\s\xa0]+$/,"");
			if( itm != '' ) {
				break;
			}
		}
	}
	var sortfn = ts_sort_generic;
	var preprocessor = ts_toLowerCase;
	if( /^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/.test( itm ) ) {
		preprocessor = ts_dateToSortKey;
	} else if( /^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/.test( itm ) ) {
		preprocessor = ts_dateToSortKey;
	} else if( /^\d\d[\/.-]\d\d[\/.-]\d\d$/.test( itm ) ) {
		preprocessor = ts_dateToSortKey;
	} else if( /(^[\u00a3$\u20ac\u00a4\u00a5]|\u00a2$)/.test( itm ) ) {
		preprocessor = ts_currencyToSortKey;
	} else if( ts_number_regex.test( itm ) || /sm=n$/.test( itm ) ) {
		preprocessor = ts_parseFloat;
	}
	var reverse = span.getAttribute( 'sortdir' ) == 'down';
	var newRows = new Array;
	var staticRows = new Array;
	for( var j = rowStart; j < table.rows.length; j++ ) {
		var row = table.rows[j];
		if( ( ' ' + row.className + ' ' ).indexOf( ' unsortable ' ) < 0 ) {
			var keyText = ts_getInnerText( row.cells[column] );
			var oldIndex = reverse ? -j : j;
			var preprocessed = preprocessor( keyText );
			newRows[newRows.length] = new Array( row, preprocessed, oldIndex );
		} else {
			staticRows[staticRows.length] = new Array( row, false, j-rowStart );
		}
	}
	newRows.sort( sortfn );
	var arrowHTML;
	if( reverse ) {
		arrowHTML = "<img src=\"" + ts_image_path + ts_image_down + "\" alt=\"&darr;\"/>";
		newRows.reverse();
		span.setAttribute( 'sortdir', 'up' );
	} else {
		arrowHTML = "<img src=\"" + ts_image_path + ts_image_up + "\" alt=\"&uarr;\"/>";
		span.setAttribute( 'sortdir', 'down' );
	}
	for( var i = 0; i < staticRows.length; i++ ) {
		var row = staticRows[i];
		newRows.splice( row[2], 0, row );
	}
	for( var i = 0; i < newRows.length; i++ ) {
		if( ( ' ' + newRows[i][0].className + ' ' ).indexOf( ' sortbottom ' ) == -1 ) {
			table.tBodies[0].appendChild( newRows[i][0] )
		}
	}
	for( var i = 0; i < newRows.length; i++ ) {
		if( ( ' ' + newRows[i][0].className + ' ' ).indexOf( ' sortbottom ' ) != -1 ) {
			table.tBodies[0].appendChild( newRows[i][0] )
		}
	}
	var spans = getElementsByClassName( tr, 'span', 'sortarrow' );
	for( var i = 0; i < spans.length; i++ ) {
		spans[i].innerHTML = "<img src=\"" + ts_image_path + ts_image_none + "\" alt=\"&darr;\"/>";
	}
	span.innerHTML = arrowHTML;
	if( ts_alternate_row_colors ) {
		ts_alternate( table );
	}
}