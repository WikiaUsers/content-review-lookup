/* Any JavaScript here will be loaded for all users on every page load. */
/* Formatting function for row details - modify as you need */

function format ( d ) {
    // `d` is the original data object for the row
    return '<tr class="expand-child">' +
    '<td colspan="3">' + d.biography + '</td></tr>';
}
 
$(document).ready(function() {
	var table = $('#staff-roster').DataTable( {
		 paging: false,
		 order: [[2, 'asc']],
		 info: false,
		 columnDefs: [
		 	{"targets": [0], "className": "details-control", "data": null, "orderable": false, "defaultContent": ""},
		 	{"name": "username", "title": "Username", "targets": [1], "data": "username"},
		 	{"name": "team", "title": "Team", "targets": [2], "data": "team", "visible": false},
		 	{"name": "role", "title": "Role", "targets": [3], "data": "role" }
		 ],
		 rowGroup: { dataSrc: "team" },
		 fixedHeader: true,
        "ajax": "/wiki/MediaWiki:Staff.json?action=raw&ctype=text%2Fjson"
    } );
    
    $('#staff-roster tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
} );

$.fn.changeElementType = function(newType) {
    var newElements = [];

    $(this).each(function() {
        var attrs = {};

        $.each(this.attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        var newElement = $("<" + newType + "/>", attrs).append($(this).contents());

        $(this).replaceWith(newElement);

        newElements.push(newElement);
    });

    return $(newElements);
};
$("div.hypercard").changeElementType("figure");
$("div.card-gallery").changeElementType("section");
$(".card-gallery").before("<p>Click the item title to learn more.</p>");

$('.hypercard .pi-title').click(function(){
    $(this).closest('.hypercard').toggleClass('active');
});