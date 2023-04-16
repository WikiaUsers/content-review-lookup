/*Creating Filterable Tables*/
$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad.wikia.com:MediaWiki:FilterTable.js"]
	});
});

/*Spoilers*/
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('SpoilerAlertPage');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

/*DataTable Fixed Header*/
$('#lands').DataTable( {
    fixedHeader: true
} );

/*Test*/
var table = $('#lands').DataTable();
 
table.columns().flatten().each( function ( colIdx ) {
    // Create the select list and search operation
    var select = $('<select />')
        .appendTo(
            table.column(colIdx).footer()
        )
        .on( 'change', function () {
            table
                .column( colIdx )
                .search( $(this).val() )
                .draw();
        } );
 
    // Get the search data for the first column and add to the select list
    table
        .column( colIdx )
        .cache( 'search' )
        .sort()
        .unique()
        .each( function ( d ) {
            select.append( $('<option value="'+d+'">'+d+'</option>') );
        } );
} );