// Discusions-Feed s.a. http://dev.wikia.com/wiki/DiscussionsFeed
importArticles({
    type: 'script',
    articles: [
        'u:dev:DiscussionsFeed.js',
    ]
});

// [[Vorlage:Hochladen]] in [[Spezial:Hochladen]] eingefügt.
function setSpecialUploadTemplate() {
  if (window.location.href == "http://www.jedipedia.de/wiki/index.php/Spezial:Hochladen") {
  var editbox = document.getElementById('wpUploadDescription');
  if(editbox.value == '') {
    editbox.value = "{"+"{Hochladen\n"
                 + "|Beschreibung=\n"
                 + "|Quelle=\n"
                 + "|Künstler=\n"
                 + "|Kategorien=\n"
                 + "}"+"}";
    }
  }
} 
addOnloadHook(setSpecialUploadTemplate);

/***** Konfiguriert von Benutzer SVG *****/
 
// Entferne auf [[Spezial:Hochladen]] „keine Vorauswahl“
 function remove_no_license_special_upload() {
   if (wgPageName != "Spezial:Hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }

 addOnloadHook(remove_no_license_special_upload);

// Entferne auf [[Spezial:Mehrere_Dateien_hochladen]] „keine Vorauswahl“
 function remove_no_license_special_multipleupload() {
   if (wgPageName != "Spezial:Mehrere_Dateien_hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }

 addOnloadHook(remove_no_license_special_multipleupload);



 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }


/*-------------------------------------------------------------------------------------*\
|| allgemeine Funktion für einen HTTP-Request, die in mehreren Skripten verwendet wird ||
\*-------------------------------------------------------------------------------------*/
function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Not Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}

//import script zum Auslagern grosser Scripte
function importScript(page) {
	// TODO: might want to introduce a utility function to match wfUrlencode() in PHP
	var uri = wgScript + '?title=' +
		encodeURIComponent(page.replace(/ /g,'_')).replace(/%2F/ig,'/').replace(/%3A/ig,':') +
		'&action=raw&ctype=text/javascript';
	return importScriptURI(uri);
}

var loadedScripts = {}; // included-scripts tracker
function importScriptURI(url) {
	if (loadedScripts[url]) {
		return null;
	}
	loadedScripts[url] = true;
	var s = document.createElement('script');
	s.setAttribute('src',url);
	s.setAttribute('type','text/javascript');
	document.getElementsByTagName('head')[0].appendChild(s);
	return s;
}

//----- ZU IMPORTIERENDE SCRIPTE -----//

//AJAX (automatische Aktualisierung der Letzten Änderungen)
if (wgUserGroups) {
  for (var i=0; i<wgUserGroups.length; i++) {
    if (wgUserGroups[i]=="user") {//Prüft, ob Benutzer angemeldet ist
      importScript('MediaWiki:Ajax.js');
      break;
    }
  }
}

//Prüfe, ob Benutzer Verschieberechte hat oder ein Administrator ist
//Wenn ja, wird HotCat geladen, ansonsten (neuer Benutzer, IP) nicht
if (wgUserGroups) {
	execute_hotcat=false;
	for (i=0; i<wgUserGroups.length; i++) {
		if (wgUserGroups[i]=="move" || wgUserGroups[i]=="sysop") {execute_hotcat=true;break;}
	}
	if(execute_hotcat==true) importScript('Benutzer:C-3PO/HotCat.js');
}

importScript('MediaWiki:Functions.js');
importScript('MediaWiki:Header.js');

if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) importScript('MediaWiki:Onlyifediting.js');

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */

 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();
 
 var autoCollapse = 2;
 var collapseCaption = "Einklappen";
 var expandCaption = "Ausklappen";
 
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

 /**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
$( createNavigationBarToggleButton );

//-------------------------------------------------------------------------------------

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
function replaceusername() {
  var spantags = document.getElementsByTagName("span");
  for (i=0; i<spantags.length; i++) {
    if (spantags[i].className=="insertusername") {
      if (wgUserName==null) {
        spantags[i].innerHTML="Jedi";
      } else {
        spantags[i].innerHTML=wgUserName;
      }
    }
  }
}
addOnloadHook(replaceusername);

//------ Link FA ------//

//------ Link FA ------//

var FA_enabled  = true;

function addfaicon() {
    // schnell weg, falls ausgeschaltet
    if (!FA_enabled) return;
    var pLang = document.getElementById("p-lang");
    if (!pLang) return;
    var lis = pLang.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        // only links with a corresponding FA/GA/CA templates are interesting
        if (document.getElementById("interwiki-" + li.firstChild.lang + "-fa")) {
            // additional class so the template can be hidden with CSS
            li.className += " FA";
            // change title (beschreibung bei maus-over)
            li.title = "Dieser Artikel wurde als exzellent bewertet.";
        } else if (document.getElementById("interwiki-" + li.firstChild.lang + "-ga")) {
            // additional class so the template can be hidden with CSS
            li.className += " GA";
            // change title (beschreibung bei maus-over)
            li.title = "Dieser Artikel wurde als lesenswert bewertet.";
        } else if (document.getElementById("interwiki-" + li.firstChild.lang + "-ca")) {
            // additional class so the template can be hidden with CSS
            li.className += " CA";
            // change title (beschreibung bei maus-over)
            li.title = 'Dieser Artikel wurde als "comprehensive" bewertet.';
        }
    }
}
addOnloadHook(addfaicon);

//-------------------------------------------------------------------------------------
/* Magisches Editintro. Kopiert aus MediaWiki:Common.js der Wookieepedia (Original von der en:Wikipedia), von Sikon für Monobook modifiziert */

function addEditIntro(name) {
	// Genereller Bearbeiten-Link
	var el = document.getElementById('ca-edit');

	if( typeof(el.href) == 'undefined' ) {
		el = el.getElementsByTagName('a')[0];
	}

	if (el)
		el.href += '&editintro=' + name;

	// Bearbeiten-Link für Abschnitte
	var spans = document.getElementsByTagName('span');
	for ( var i = 0; i < spans.length; i++ ) {
		el = null;

		if (spans[i].className == 'editsection') {
			el = spans[i].getElementsByTagName('a')[0];
			if (el)
				el.href += '&editintro=' + name;
		} else if (spans[i].className == 'editsection-upper') {
			el = spans[i].getElementsByTagName('a')[0];
			if (el)
				el.href += '&editintro=' + name;
		}
	}
}

if (wgNamespaceNumber == 0) {
	addOnloadHook(function(){
		var cats = document.getElementById('mw-normal-catlinks');
		if (!cats)
			return;
		cats = cats.getElementsByTagName('a');
		for (var i = 0; i < cats.length; i++) {
			if (cats[i].title == 'Kategorie:Exzellente Artikel') {
				addEditIntro('Vorlage:EXZIntro');
				break;
			} else if (cats[i].title == 'Kategorie:Lesenswerte Artikel') {
				addEditIntro('Vorlage:LWAIntro');
				break;
			} else if ( cats[i].title == 'Kategorie:UNDER CONSTRUCTION') {
				addEditIntro('Vorlage:UCIntro');
				break;
			}
		}
	});
}

/*---------------------------------------------------------------------------------*\
|| Automatische Spaltenänderung der Bildergalerien basierend auf der Browserbreite ||
\*---------------------------------------------------------------------------------*/
function updategallery() {
objects=document.getElementsByTagName("table");
for (i=0; i<objects.length; i++) {
	if (objects[i].className=="gallery") {
		innerobjects=objects[i].getElementsByTagName("td");//Aus jeder Tabelle die DIVs auslesen
		newtext="";
		for (j=0; j<innerobjects.length; j++) {
			newtext+=innerobjects[j].innerHTML;
		}
		newtable=document.createElement("table");
		newtable.className="gallery";
		objects[i].parentNode.insertBefore(newtable, objects[i].nextSibling);
		newtbody=document.createElement("tbody");newtr=document.createElement("tr");newtd=document.createElement("td");
		newtd.innerHTML=newtext;//DIVs zusammen in einer neuen Tabelle ergänzen
		newtbody.appendChild(newtr);newtr.appendChild(newtd);newtable.appendChild(newtbody);
		objects[i].parentNode.removeChild(objects[i]);//Tabelle entfernen
	}
}
}
addOnloadHook(updategallery);

/*JavaScript-Dialog beim Bild-Upload ausschalten*/
$('a.wikia-button.upphotos').click(function () {
   location.href = wgServer + '/wiki/Spezial:Hochladen'
});

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

//Tabber von [[w:c:de.thewalkingdeadtv:User:20M61|20M61]]
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Tabber.js'
    ]
});

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny, übernommen aus MediaWiki:Common.js der Wookieepedia
 
function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}
 
	if( $('#title-meta').length == 0 ) {
		return;
	}
 
	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}
// END JavaScript title rewrite
addOnloadHook(rewriteTitle);

/* YouTubePlayer */

importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js'
    ]
});



function RTEtoCodeMode(i){
  if (!i) { i=0; } else { i++; }
  if (i > 20) { return false; } // nach 10 Sec. aufhören nach dem Button zu suchen.
 
  if (HTMLAgument['action'] == 'edit'){ 
    var CKEObjekt = document.getElementById('cke_21');
    if (CKEObjekt) {
      CKEObjekt.click();
      return true;
    }
    else {
      setTimeout('RTEtoCodeMode('+i+')',200);
      return false;
    }
  }
  return true;
}
 
addOnloadHook(RTEtoCodeMode);

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});

//Auto-Aktualisierung
window.AjaxRCRefreshText = "Auto-Aktualisierung";
window.ajaxSpecialPages = ['Recentchanges', 'WikiActivity'];