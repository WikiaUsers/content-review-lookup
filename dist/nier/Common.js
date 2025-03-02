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

importScriptPage('AjaxRC/code.js', 'dev');

/* Modifying redirect button from WikiEditor's source mode to automatically include the category */
$('#wpTextbox1').on('wikiEditor-toolbar-buildSection-advanced', function(event, section) {
    // The exact paths are available in jquery.wikiEditor.toolbar.config.js file of the extension
    section.groups.insert.tools.redirect.action.options.pre = '#REDIRECT [[';
    section.groups.insert.tools.redirect.action.options.post = ']]\n\n[[Category:Redirect Pages]]';
});