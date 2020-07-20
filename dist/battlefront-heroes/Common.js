/* Any JavaScript here will be loaded for all users on every page load. */
/*-----------------------------------------------------------/
/--Makes tables sortable-------------------------------------/
/------------------Activated on tables with class="sortable"-/
/--------Removes effect from columns with class="unsortable"-/
/-- http://finalfantasy.wikia.com/wiki/MediaWiki%3ACommon.js /
/-----------------------------------------------------------*/
function ts_makeSortable(table){
	var firstRow = createTHead().rows[0];
	if(!firstRow)
		return;
	for(var i=0;i<firstRow.cells.length;i++){
		var cell=firstRow.cells[i];
		if((" "+cell.className+" ").indexOf(" unsortable ")==-1){
			cell.innerHTML+=' '
					+'<a href="#" class="sortheader" '
					+'onclick="ts_resortTable(this);return false;">'
					+'<span class="sortarrow">'
					+'<img src="'
					+ts_image_path
					+ts_image_none
					+'" alt="↓"/></span></a>';
		}
	}
	if(ts_alternate_row_colors){
		ts_alternate(table);
	}
}