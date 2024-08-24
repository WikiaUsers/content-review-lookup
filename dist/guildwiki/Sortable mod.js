/* 
== Information ==
/* </pre>
 * Table sorting script modified by Pan Sola
 *
 * Based on a script by Joost de Valk at http://www.joostdevalk.nl/code/sortable-table/.
 * Based on a script from http://www.kryogenix.org/code/browser/sorttable/.
 * Distributed under the MIT license: http://www.kryogenix.org/code/browser/licence.html .
 *       Original copyright (c) 1997-2006 Stuart Langridge, Joost de Valk.
 *
 * Modifications (compared to sorttable.js):
 * * Does not strip tags inside header cells
 * * Images are sorted (instead of ignored) by their "alt" field.
 * * Tries to detect data entries with numbers and units, and will sort by unit first
 *
 * Do NOT use this on tables with colspan or rowspan
 *
 * Current limitations: 
 * * Does not always properly handle exhaustion and assassin attack requirements properly.  
   * The issue may propagate to Upkeep and Sacrifice if they appear in the same table.
 * * Stable-sort not yet implemented.  Some optimization to the current code need to be
   * in place first for client-side performance reasons.
 *
 * To do: 
 * * Support tables with colspan and rowspan.
 * * Support for stable sort.
 * * Support for sortTypes specified in column header.
 */

/*

== Includes ==
Uses [[/abstractions]], [[/sort_types]] <pre>*/
document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:sortable_mod.js/abstractions&action=raw&ctype=text/javascript"></script>');
document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:sortable_mod.js/sort_types&action=raw&ctype=text/javascript"></script>');
/* </pre> 

== sorttable.js, modified ==
 * Overwrites the default functions in http://gw.gamewikis.org/skins/common/sorttable.js 
<pre> */
/* </pre>
=== Primary functions ===
<pre> */
var image_path = stylepath+"/common/images/";
var image_up = "sort_up.gif";
var image_down = "sort_down.gif";
var image_none = "sort_none.gif";
var europeandate = wgContentLanguage != "en"; // The non-American-inclined can change to "true"

var alternate_row_colors = true;

hookEvent( "load", sortables_init);

var CACHE_SORTS = true; // caching makes subsequent sorts faster, not caching uses less memory.
var TS_CACHE;
var SORT_COLUMN_INDEX;

/* </pre>
==== sortables_init() ====
<pre> */
function sortables_init() {
	var idnum = 0;
	// Find all tables with class sortable and make them sortable
	var tbls = getElementsByClassName(document, 'table', 'sortable');
	for (ti=0;ti<tbls.length;ti++) {
		thisTbl = tbls[ti];
		if (!thisTbl.id) {
			thisTbl.setAttribute('id','sortable_table_id_'+idnum);
		}
		ts_makeSortable(thisTbl);
		thisTbl.setAttribute('sortable_id', idnum);
		++idnum;
	}
	TS_CACHE = new Array(idnum);
}
/* </pre>

==== ts_makeSortable(table) ====
<pre> */
function ts_makeSortable(table) {
	var firstRow;

	/* Putting buttons on the first row, detect if a header row exists or not */
	if (table.rows && table.rows.length > 0) {
		if (table.tHead && table.tHead.rows.length > 0) {
			firstRow = table.tHead.rows[table.tHead.rows.length-1];
		} else {
			var firstRow = table.rows[0];
		}
	}
	if (!firstRow) return;

	// We have a first row: assume it's the header, and make its contents clickable links
	for (var i=0;i<firstRow.cells.length;i++) {
		var curCell = firstRow.cells[i];

		if ((' '+curCell.className+' ').indexOf(' unsortable ') == -1) {
			var newLnk = document.createElement('A');
			newLnk.className = 'sortheader';
			newLnk.setAttribute('href', '#');
			newLnk.setAttribute('onClick', 'javascript:ts_resortTable(this);return false;');

			var sortArrow = document.createElement('IMG');
			sortArrow.className = 'sortarrow';
			arrowNone(sortArrow);

			newLnk.appendChild(sortArrow);
			curCell.appendChild(document.createTextNode(' '));
			curCell.appendChild(newLnk);

//			curCell.innerHTML += '&nbsp;&nbsp;<a href="#" class="sortheader" onclick="ts_resortTable(this);return false;"><span class="sortarrow"><img src="'+ ts_image_path + ts_image_none + '" alt="&darr;"/></span></a>';

		}
	}
	if (alternate_row_colors) {
		alternate(table);
	}
}
/* </pre>

==== arrowManipulations ====
<pre>*/
function arrowNone(arrow){
	arrow.setAttribute('src', image_path + image_none);
	arrow.setAttribute('alt', '&darr;');
}
var arrowDir = new Array(2);
arrowDir[0] = function (arrow){
	arrow.setAttribute('src', image_path + image_down);
	arrow.setAttribute('alt', '&darr;');
}
arrowDir[1] = function (arrow){
	arrow.setAttribute('src', image_path + image_up);
	arrow.setAttribute('alt', '&uarr;');
}
/* </pre>

==== ts_resortTable(lnk) ====
<pre> */
function ts_resortTable(lnk) {
	var th = lnk.parentNode;
	SORT_COLUMN_INDEX = th.cellIndex;
	var tr = th.parentNode;

	/* a loop just in case the table isn't the row's immediate parent */
	var table = tr.parentNode;
	while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
		table = table.parentNode;
	if (!table) return;

	// Work out a type for the column
	if (table.rows.length <= 1) return;

	var tableSortCacheIdx = table.getAttribute('sortable_id')
	sTR = TS_CACHE[tableSortCacheIdx];  // sortingTableRecord
	if (!sTR) {
		sTR = sortTableInit(table, tableSortCacheIdx);
	}

	var normalRowRecords = sTR_getNRR(sTR);
	var bottomRowRecords = sTR_getBRR(sTR);

	var sortFn = sTR_getSFn(sTR);
	if (!sortFn ){
		sortFn = sortColInit(th, table, sTR);
	}

	var sortDir = sTR_getDir(sTR);

	normalRowRecords.sort(sortFn[sortDir]);
	bottomRowRecords.sort(sortFn[sortDir]);

	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
	rr_appendRecordsToTable(normalRowRecords, table);
	rr_appendRecordsToTable(bottomRowRecords, table);

	// Delete any other arrows there may be showing
	var allArrs = getElementsByClassName(tr, 'img', 'sortarrow');
	for (var i = 0; i < allArrs.length; i++) {
		arrowNone(allArrs[i]);
	}

	arrowDir[sortDir](lnk.getElementsByTagName('IMG')[0]);
	sTR_changeDir(sTR);

	alternate(table);	
	printDebug();
}
/* </pre>

==== sortTableInit(table, tableSortCacheIdx) ====
<pre> */
function sortTableInit(table, tableSortCacheIdx){
	// Skip the first row if that's where the headings are
	var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);

	var normalRowsRecords = new Array();
	var bottomRowsRecords = new Array();
	var numCols = table.rows[0].cells.length;
	for (var j = rowStart; j < table.rows.length; j++) {
		var row = table.rows[j];
		if ((" "+row.className+" ").indexOf(" sortbottom ") == -1){
			normalRowsRecords.push(rr_cons(row, numCols, j));
		} else {
			bottomRowsRecords.push(rr_cons(row, numCols, j));
		}
	}
	sortingTableRecord = sTR_cons(rowStart, normalRowsRecords, bottomRowsRecords, numCols);
	if (CACHE_SORTS){
		TS_CACHE[tableSortCacheIdx] =  sortingTableRecord ;
	}
	return sortingTableRecord;
}
/* </pre>

==== sortColInit(th, table, sTR) ====
<pre> */
function sortColInit(th, table, sTR){
	var sortType = getSortType(th, table);

	parseKeyText(sTR_getNRR(sTR), sortType_getKeyFn(sortType) );
	parseKeyText(sTR_getBRR(sTR), sortType_getKeyFn(sortType) );

	return sTR_setSFn(sTR, sortType_getSorter(sortType) );
}
/* </pre>

==== getSortType(th, table) ====
<pre> */
function getSortType(th, table){
	var axii = th.axis.split(',');
	for (var i=0; i < axii.length; i++){
		for (var j=0; j < manualSortTypes.length; j++){
			if (axii[i] == sortType_getName(manualSortTypes[j])) return manualSortTypes[j];
		}
	} // Implicit else

	var itm = '';
	for( var i = 1; itm.match(/^([\s]|\n|\&nbsp;|<!--[^-]+-->)*$/) 
	  && i < table.tBodies[0].rows.length ; i++) {
		var itm = ts_getInnerText(table.tBodies[0].rows[i].cells[SORT_COLUMN_INDEX]);
		itm = trim(itm);
		itm = itm.replace(/¼/, '.25').replace(/½/, '.5').replace(/¾/, '.75');
	}

	for (var j=0; j < autoDetectSortTypes.length; j++){
		if (sortType_getGuessFn(autoDetectSortTypes[j])(itm)){
			return autoDetectSortTypes[j];
		}
	}

	return sortType_case_insensitive;
}
/* </pre>

==== parseKeyText(rows, keyFn) ====
<pre>*/
function parseKeyText(rowRecords, keyFn){
	for( var i = 0; i < rowRecords.length ; i++) {
		var curRowRecord = rowRecords[i];
		var itm = rr_getCellAbbr(curRowRecord);
		if (!itm){
			itm = rr_getCellText(curRowRecord);
			itm = trim(itm).replace(/¼/, '.25').replace(/½/, '.50').replace(/¾/, '.75');
			if (!itm) itm=''
		}
		rr_setSortKey(curRowRecord, keyFn(itm));
	}
}
/* </pre>

==== updateLinkedArrow(lnk, sortDir) ====
<pre>*/
/*
function updateLinkedArrow(lnk, sortDir){
	var ARROW = lnk.getElementsByTagName('IMG')[0];
	if (!ARROW) return;
	debug('there is an arrow');

	if (ARROW.getAttribute("sortdir") == 'down') {
		arrowDn(ARROW);
		newRows.reverse();
		ARROW.setAttribute('sortdir','up');
	} else {
		arrowUp(ARROW);
		ARROW.setAttribute('sortdir','down');
	} 
}
*/
/* </pre>

==== getParent(el, pTagName) ====
<pre> */
function getParent(el, pTagName) {
	if (el == null) {
		return null;
	} else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {	// Gecko bug, supposed to be uppercase
		return el;
	} else {
		return getParent(el.parentNode, pTagName);
	}
}
/* </pre>



=== "Library" functions ===
<pre> */
/* </pre>

==== ts_getInnerText(el) ====
<pre> */
function ts_getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				if (cs[i].nodeName == 'IMG'){
					str += cs[i].alt;
				} else {
					str += ts_getInnerText(cs[i]);
				}
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}
/* </pre>

==== addEvent(elm, evType, fn, useCapture) ====
<pre> */
function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,	NS6 and Mozilla
// By Scott Andrew
{
	if (elm.addEventListener){
		elm.addEventListener(evType, fn, useCapture);
		return true;
	} else if (elm.attachEvent){
		var r = elm.attachEvent("on"+evType, fn);
		return r;
	} else {
		alert("Handler could not be removed");
	}
} 
/* </pre>
==== replace(s, t, u) ====
<pre> */
function replace(s, t, u) {
	/*
	**  Replace a token in a string
	**    s  string to be processed
	**    t  token to be found and removed
	**    u  token to be inserted
	**  returns new String
	*/
	i = s.indexOf(t);
	r = "";
	if (i == -1) return s;
	r += s.substring(0,i) + u;
	if ( i + t.length < s.length) {
		r += replace(s.substring(i + t.length, s.length), t, u);
	}
	return r;
}
/* </pre>
==== trim(s) ====
<pre> */
function trim(s) {
//debug('Trimming "' + s + '"');
//printDebug();
	return s.replace(/^([ \t]|\n|\&nbsp;|<!--[^-]+-->)*/, "").replace(/([ \t]|\n|\&nbsp;|<!--[^-]+-->)*$/, "");
}
/* </pre>

==== alternate(table) ====
<pre> */
function alternate(table) {
	// Take object table and get all it's tbodies.
	var tableBodies = table.getElementsByTagName("tbody");
	// Loop through these tbodies
	for (var i = 0; i < tableBodies.length; i++) {
		// Take the tbody, and get all it's rows
		var tableRows = tableBodies[i].getElementsByTagName("tr");
		// Loop through these rows
		// Start at 1 because we want to leave the heading row untouched
		for (var j = 0; j < tableRows.length; j++) {
			// Check if j is even, and apply classes for both possible results
			if ( (j % 2) == 0  ) {
				if ( !(tableRows[j].className.indexOf('odd') == -1) ) {
					tableRows[j].className = replace(tableRows[j].className, 'odd', 'even');
				} else {
					if ( tableRows[j].className.indexOf('even') == -1 ) {
						tableRows[j].className += " even";
					}
				}
			} else {
				if ( !(tableRows[j].className.indexOf('even') == -1) ) {
					tableRows[j].className = replace(tableRows[j].className, 'even', 'odd');
				} else {
					if ( tableRows[j].className.indexOf('odd') == -1 ) {
						tableRows[j].className += " odd";
					}
				}
			} 
		}
	}
}

/* </pre>

== Shaker sort ==
 * <pre>
 */
function shaker_sort(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    // thanks to Joseph Nahmias
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }  
/* </pre>





== Pan Sola's utilities ==
<pre> */
/* </pre>
=== cons, car, and cdr ===
<pre> */
function cons(a,b){
    return [a,b];
}
function car(c){
    return c[0];
}
function cdr(c){
    return c[1];
}
/* </pre>

== debug(message) ==
<pre> */
function debug(message){ 
	if (!DEBUGMODE) return;
	qDebugMsgLn(message);
}

function printDebug(){
	if (!DEBUGMODE) return;
	printDebugMsg();
}

/* </pre>
 */