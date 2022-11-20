/* Any JavaScript here will be loaded for all users on every page load. */

$(function(){
	importArticles({
		type: "script",
		articles: ["u:pad:MediaWiki:FilterTable.js"]
	});
});

$('.datatable').DataTable({
  "fnDrawCallback": function() {

    $table = $(this);

    // only apply this to specific tables
    if ($table.closest(".datatable-multi-row").length) {

      // for each row in the table body...
      $table.find("tbody>tr").each(function() {
        var $tr = $(this);

        // get the "extra row" content from the <script> tag.
        // note, this could be any DOM object in the row.
        var extra_row = $tr.find(".extra-row-content").html();

        // in case draw() fires multiple times, 
        // we only want to add new rows once.
        if (!$tr.next().hasClass('dt-added')) {
          $tr.after(extra_row);
          $tr.find("td").each(function() {

            // for each cell in the top row,
            // set the "rowspan" according to the data value.
            var $td = $(this);
            var rowspan = parseInt($td.data("datatable-multi-row-rowspan"), 10);
            if (rowspan) {
              $td.attr('rowspan', rowspan);
            }
          });
        }

      });

    } // end if the table has the proper class
  } // end fnDrawCallback()
});