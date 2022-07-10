/* Javascript inkluderet her vil være aktivt for alle brugere. */

 /* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: [[Wikipedia:User:Mike Dillon]], [[Wikipedia:User:R. Koot]], [[Wikipedia:User:SG]]
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();

// 2nd part is the Scrip for Wikitables
/* <pre style="height: 45em"><nowiki> */


 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:Wikipedia:NavFrame]].
  *  Maintainers: [[Wikipedia:User:R. Koot]]
  */
/*importScriptPage('ShowHide/code.js', 'dev');*/


 
 var autoCollapse = 2;
 var collapseCaption = "skjul";
 var expandCaption = "vis";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );


//Hjemmelavede knapper specielt til Spademanns

 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/1/11/Button_category.png",
     "speedTip": "Kategori",
     "tagOpen": "[[Kategori:",
     "tagClose": "]]",
     "sampleText": "Indsæt en kategori"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/1/13/Button_enter.png",
     "speedTip": "Linieskift",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/e/ea/Button_easy_cite.png",
     "speedTip": "Citat",
     "tagOpen": "\{\{citat|",
     "tagClose": "|En eller anden|et eller andet\}\}",
     "sampleText": "Indsæt din citattekst her"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/c/c4/Button_ref.png",
     "speedTip": "Fodnote",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "Indsæt fodnote her"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/b/bf/WP-icon.png",
     "speedTip": "Wikipedia",
     "tagOpen": "\{\{wikipedia|",
     "tagClose": "\}\}",
     "sampleText": "Navnet på linkartikel"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/8/8e/Button_stub.png",
     "speedTip": "Under konstruktion",
     "tagOpen": "\{\{Under konstruktion\}\}",
     "tagClose": "",
     "sampleText": ""}; 

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/da.uncyclopedia/images/4/49/Button_talk.png",
     "speedTip": "Egen signatur",
     "tagOpen": "[[Bruger:CooperDK|CooperDK]] ([[Brugerdiskussion:CooperDK|diskussion]])",
     "tagClose": "",
     "sampleText": ""};
}

/** Dynamic navigation bars ************************************************
 * Allows navigations templates to expand and collapse their content to save space
 * Documentation on Wikipedia at [[wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]]
 */

// set up the words in your language
var NavigationBarHide = '[skjul]';
var NavigationBarShow = '[vis]';

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


/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById( 'ca-edit' ) || !document.getElementById( 'old-forum-warning' ) ) {
		return;
	}
	editLink = document.getElementById( 'ca-edit' ).firstChild;
	editLink.removeAttribute( 'href', 0 );
	editLink.style.color = 'gray';
	editLink.innerHTML = 'No Editing';
}
addOnloadHook( disableOldForumEdit );

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