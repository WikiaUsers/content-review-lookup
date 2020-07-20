wikiname = $('#god-table').data('wiki');
var mythologien = [];
$('#god-table thead tr th').each(function(key, val) {
	mythologien.push($(val).attr('id'));
});
colgroup = $('<colgroup />');
for(col in mythologien) {
	colgroup.append(
		$('<col>').attr('id',mythologien[col])
	);
}
//console.log(colgroup)
$('#god-table table').prepend(colgroup);
col = $('#god-table table colgroup col#' + wikiname).index();
//console.log(wikiname, col);

//Coloration
$('#god-table tr th:nth-child(' + (col + 1) + '), #god-table tr td:nth-child(' + (col + 1) + ')').css('background-color','grey');

//Reorder
$('#god-table tr th:nth-child(' + (col + 1) + ')').each(function(key, val) {
	//console.log(col, val, $(val).parent().index());
	$(val).parent().prepend(val);
});
$('#god-table tr td:nth-child(' + (col + 1) + ')').each(function(key, val) {
	//console.log(col, val);
	$(val).parent().prepend(val);
});
/*td = $('#god-table tr td:nth-child(' + col + ')');
$('#god-table tr td:nth-child(' + col + 1 + ')').before(td);*/