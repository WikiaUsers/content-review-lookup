/* Any JavaScript here will be loaded for all users on every page load. */
/*
 * Table sorting script  by Joost de Valk, check it out at http://www.joostdevalk.nl/code/sortable-table/.
 * Based on a script from http://www.kryogenix.org/code/browser/sorttable/.
 * Distributed under the MIT license: http://www.kryogenix.org/code/browser/licence.html .
 *
 * Copyright (c) 1997-2006 Stuart Langridge, Joost de Valk.
 *
 * @todo don't break on colspans/rowspans (bug 8028)
 * @todo language-specific digit grouping/decimals (bug 8063)
 * @todo support all accepted date formats (bug 8226)
 */

var ts_image_path = stylepath+"/common/images/";
var ts_image_up = "sort_up.gif";
var ts_image_down = "sort_down.gif";
var ts_image_none = "sort_none.gif";
var ts_europeandate = wgContentLanguage != "en"; // The non-American-inclined can change to "true"
var ts_alternate_row_colors = true;
var SORT_COLUMN_INDEX;

function sortables_init() {
	var idnum = 0;
	// Find all tables with class sortable and make them sortable
	var tables = getElementsByClassName(document, "table", "sorttable");//originally sortable
	for (var ti = 0; ti < tables.length ; ti++) {
		if (!tables[ti].id) {
			tables[ti].setAttribute('id','sortable_table_id_'+idnum);
			++idnum;
		}
		ts_makeSortable(tables[ti]);
	}
fixGallery();
}

function fixGallery() {
    var maxD=120;
    var spans=document.evaluate('//span[@class="wikia-gallery-item"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0;i<spans.snapshotLength;i++) {
        var s = spans.snapshotItem(i);
        var d1 = s.firstChild;
        if (d1) {
            var d2 = d1.firstChild;
            if (d2) {
                var a = d2.firstChild;
                if (a) {
                    var curH = a.style.height.replace(/[^0-9]*/g,'');
                    var curW = a.style.width.replace(/[^0-9]*/g,'');
                    if (curH && curW) {
                        var ratio = curH/curW;
                        if(curW >= maxD && ratio <= 1){
                            curW = maxD;
                        } else if(curH >= maxD) {
                            curW = Math.floor(maxD / ratio);
                        }
                        s.style.width = maxD+'px';
                        d1.style.height = maxD+'px';
                        d2.style.height = maxD+'px';
                        d2.style.width = maxD+'px';
                        d2.style.top = '';
                        if (a.style.backgroundImage.match(/\/[0-9]*px-/i))
                            a.style.backgroundImage = a.style.backgroundImage.replace(/\/[0-9]*px-/i,'/'+curW+'px-');
                        else {
                            a.style.backgroundImage = a.style.backgroundImage.replace(/\"?\)$/,'/'+curW+'px-'+a.style.backgroundImage.match(/\/([^\/]*\"?\)$)/i)[1]);
                            if (!a.style.backgroundImage.match(/\/thumb\//)) {
                                a.style.backgroundImage = a.style.backgroundImage.replace('/images/','/images/thumb/');
                            }
                        }
                        a.style.height = maxD+'px';
                        a.style.width = maxD+'px';
                        var capt = d1.nextSibling;
                        if (capt) {
                            capt.style.width = maxD+'px';
                        }
                    }
                }
            }
        }
    }
}

function ts_makeSortable(table) {
	var firstRow;
	if (table.rows && table.rows.length > 0) {
		if (table.tHead && table.tHead.rows.length > 0) {
			firstRow = table.tHead.rows[table.tHead.rows.length-1];
		} else {
			firstRow = table.rows[0];
		}
	}
	if (!firstRow) return;
        var colloffset=0;
	// We have a first row: assume it's the header, and make its contents clickable links
	for (var i = 0; i < firstRow.cells.length; i++) {
		var cell = firstRow.cells[i];
                var cns =  (cell.className) ? cell.className.split(' ') : new Array();
                var forceNumeric = 0;
                var unsortable = false;
                for (var j=0;j<cns.length;j++) {
                    if (cns[j] == 'unsortable')
                        unsortable = true;
                    if (cns[j] == 'numeric')
                        forcenumeric = 1;
                    if (cns[j].indexOf('colloffset')==0) {
                        colloffset += parseInt(cns[j].substr(10));
                    }
                }
		if (!unsortable) {
			cell.innerHTML += '  <a href="#" class="sortheader" onclick="ts_resortTable(this,'+forceNumeric+','+colloffset+');return false;"><span class="sortarrow"><img src="https://images.wikia.nocookie.net/witcher/images/e/e8/Sort_none.gif" alt="↓"/></span></a>';
		}
	}
	if (ts_alternate_row_colors) {
		ts_alternate(table);
	}
}

function ts_getInnerText(el) {
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	// Not needed but it is faster
	var str = "";

	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}

function ts_resortTable(lnk,forceNumeric,colloffset) {
	// get the span
	var span = lnk.getElementsByTagName('span')[0];

	var td = lnk.parentNode;
	var tr = td.parentNode;
	var column = td.cellIndex;

	var table = tr.parentNode;
	while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
		table = table.parentNode;
	if (!table) return;

	// Work out a type for the column
	if (table.rows.length <= 1) return;

	// Skip the first row if that's where the headings are
	var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);

	var itm = "";
	for (var i = rowStart; i < table.rows.length; i++) {
		if (table.rows[i].cells.length > column+colloffset) {
			itm = ts_getInnerText(table.rows[i].cells[column+colloffset]);
			itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
			if (itm != "") break;
		}
	}

	sortfn = ts_sort_caseinsensitive;
	if (itm.match(/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/.-]\d\d[\/.-]\d\d$/))
		sortfn = ts_sort_date;
	if (itm.match(/^[\u00a3$\u20ac]/)) // pound dollar euro
		sortfn = ts_sort_currency;
	if (itm.match(/^[\d.,]+\%?$/))
		sortfn = ts_sort_numeric;
	
    if (forceNumeric==1)
        sortfn = ts_sort_numeric;

    var reverse = (span.getAttribute("sortdir") == 'down');
	var newRows = new Array();
	for (var j = rowStart; j < table.rows.length; j++) {
		var row = table.rows[j];
		var keyText = ts_getInnerText(row.cells[column+colloffset]);
		var oldIndex = (reverse ? -j : j);
		newRows[newRows.length] = new Array(row, keyText, oldIndex);
	}

	newRows.sort(sortfn);

	var arrowHTML;
	if (reverse) {
			arrowHTML = '<img src="https://images.wikia.nocookie.net/witcher/images/7/7a/Sort_down.gif" alt="↓"/>';
			newRows.reverse();
			span.setAttribute('sortdir','up');
	} else {
			arrowHTML = '<img src="https://images.wikia.nocookie.net/witcher/images/5/5b/Sort_up.gif" alt="↑"/>';
			span.setAttribute('sortdir','down');
	}

	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
	// don't do sortbottom rows
	for (var i = 0; i < newRows.length; i++) {
		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") == -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}
	// do sortbottom rows only
	for (var i = 0; i < newRows.length; i++) {
		if ((" "+newRows[i][0].className+" ").indexOf(" sortbottom ") != -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}

	// Delete any other arrows there may be showing
	var spans = getElementsByClassName(tr, "span", "sortarrow");
	for (var i = 0; i < spans.length; i++) {
		spans[i].innerHTML = '<img src="https://images.wikia.nocookie.net/witcher/images/e/e8/Sort_none.gif" alt="↓"/>';
	}
	span.innerHTML = arrowHTML;

	ts_alternate(table);		
}

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "jan": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "apr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "aug": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dec": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

function ts_parseFloat(num) {
	if (!num) return 0;
	num = parseFloat(num.replace(/,/, ""));
	return (isNaN(num) ? 0 : num);
}

function ts_sort_date(a,b) {
	var aa = ts_dateToSortKey(a[1]);
	var bb = ts_dateToSortKey(b[1]);
	return (aa < bb ? -1 : aa > bb ? 1 : a[2] - b[2]);
}

function ts_sort_currency(a,b) {
	var aa = ts_parseFloat(a[1].replace(/[^0-9.]/g,''));
	var bb = ts_parseFloat(b[1].replace(/[^0-9.]/g,''));
	return (aa != bb ? aa - bb : a[2] - b[2]);
}

function ts_sort_numeric(a,b) {
	var aa = ts_parseFloat(a[1]);
	var bb = ts_parseFloat(b[1]);
	return (aa != bb ? aa - bb : a[2] - b[2]);
}

function ts_sort_caseinsensitive(a,b) {
	var aa = a[1].toLowerCase();
	var bb = b[1].toLowerCase();
	return (aa < bb ? -1 : aa > bb ? 1 : a[2] - b[2]);
}

function ts_sort_default(a,b) {
	return (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : a[2] - b[2]);
}

function ts_alternate(table) {
	// Take object table and get all it's tbodies.
	var tableBodies = table.getElementsByTagName("tbody");
	// Loop through these tbodies
	for (var i = 0; i < tableBodies.length; i++) {
		// Take the tbody, and get all it's rows
                // check whether this table is sortable -- not all inner tables are
                var tableP = tableBodies[i].parentNode;
                while(tableP && tableP.tagName!='TABLE')
                    tableP = tableP.parentNode;                
                if (tableP && tableP.getAttribute('class') && tableP.getAttribute('class').indexOf('sorttable')<0)
                   continue;
//		var tableRows = tableBodies[i].getElementsByTagName("tr");
		var tableRows = tableBodies[i].rows;
		// Loop through these rows
		// Start at 1 because we want to leave the heading row untouched
                if (tableRows.length > 0 && (!tableRows[0].className || tableRows[0].className.indexOf('sortheader')<0))
                        tableRows[0].className = tableRows[0].className + " sortheader";
		for (var j = 1; j < tableRows.length; j++) {
			// Check if j is even, and apply classes for both possible results
			var oldClasses = tableRows[j].className.split(" ");
			var newClassName = "";
                        var nocolour=false;
                        var tableD = tableRows[j].getElementsByTagName('DIV');
                        // look for any first inner divs that have the nocolour class
                        for (var k=0;k<tableD.length;k++) {
                            if (tableD[k].getAttribute('class') && tableD[k].getAttribute('class').indexOf('nocolour')>=0) {
                               nocolour=true;
                               break;
                            }
                        }
                        if (nocolour)
                           continue; // leave this row alone
			for (var k = 0; k < oldClasses.length; k++) {
				if (oldClasses[k] != "" && oldClasses[k] != "even" && oldClasses[k] != "odd") {
                                        if (oldClasses[k]=='nocolour') nocolour=true;
					newClassName += oldClasses[k] + " ";
                                }
			}
 		        tableRows[j].className = newClassName + (j % 2 == 0 ? "even" : "odd");
		}
	}
}

/*
 * End of table sorting code
 */