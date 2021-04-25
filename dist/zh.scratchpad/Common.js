// 2012年10月7日 (日) 06:14 (UTC)
// <source lang="JavaScript">

/* 此处的JavaScript将载入于所有用户每一个页面。 */
/*
function include(lang,s) {
  document.write("<script type=\"text/javascript\" src=\"http://"+lang+".wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("ja","User:Tommy6/js/funp.js");
include("ja","User:Tommy6/js/hemidemi.js");
include("ja","User:Tommy6/js/udn.js");
include("ja","User:Tommy6/js/myshare.js");
include("ja","User:Tommy6/js/youpush.js");
include("ja","User:Tommy6/js/xianguo.js");
*/

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
 
	// We have a first row: assume it's the header, and make its contents clickable links
	for (var i = 0; i < firstRow.cells.length; i++) {
		var cell = firstRow.cells[i];
		if ((" "+cell.className+" ").indexOf(" unsortable ") == -1) {
			cell.innerHTML += ' <a href="#" class="sortheader" onclick="ts_resortTable(this);return false;"><span class="sortarrow"><img src="'+ ts_image_path + ts_image_none + '" alt="&darr;"/></span></a>';
		}
	}
	if (ts_alternate_row_colors) {
		ts_alternate(table);
	}
}

// FastDelete Buttons for Administrators
importScriptPage('MediaWiki:Common.js/fastDelete.js', 'admintools');
// END FastDelete Buttons for Administrators

// Extra Rollback Buttons for Administrators
importScriptPage('MediaWiki:Common.js/extraRollbacks.js', 'admintools');
// END Extra Rollback Buttons for Administrators

// </source>