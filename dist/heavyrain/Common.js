/* Any JavaScript here will be loaded for all users on every page load. */

/** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by [[wikia:User:Splarka|Splarka]]
  * New version by [[User:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').each(function() {
        $(this).text(wgUserName);
    });
 }
 addOnloadHook(UserNameReplace);

function ts_makeSortable(table){
	var firstRow;
	if(table.rows&&table.rows.length>0){
		if(table.tHead&&table.tHead.rows.length>0){
			firstRow=table.tHead.rows[table.tHead.rows.length-1];
		}else{
			firstRow=table.rows[0];
		}
	}
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