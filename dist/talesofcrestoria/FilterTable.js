/* 
Thanks to Sammylau's FilterTable.js for the basis of this script.
This script allows filterable large tables using buttons provided in a template outside of the table itself.
*/
function filterTable(){
	$(".filtertable").each(function(){
    var fTable = $(this).find("table.filterable");
		fTable.find("tbody tr").attr("condition", 0);
	});
}
function oFilter() {
	$(".oFilterOption img").click(function(){
    option = $(this).parent();
    col=option.attr("data-value");
    val=option.attr("title");
    if (option.is(".active")) {
      chg=-1;
      option.removeClass("active");
    }
    else {
      chg=1;
      option.addClass("active");
    }
		$(this).closest('.filtertable').find("table.filterable").find("tbody tr").each(function(){
			if ($(this).find("td:nth-child("+col+")").text().trim()==val){
				var cond=$(this).attr("condition");
				cond=Number(cond)+chg;
				$(this).attr("condition", cond);
				if (cond===0) $(this).show(500);
				else $(this).hide(500);
			}
		});
	});
}
function oFilterAll() {
    var numOfFilters = $(".oFilterOptions").find(".filterGroup").length;
    $(".oFilterAllOff img").click(function() {
        $(this).closest('.filtertable').find("table.filterable").find("tbody tr").each(function() {
            $(this).attr("condition", -numOfFilters);
            $(this).hide(250);
        });
        $(this).closest('.filtertable').find('.oFilterOption').each(function() {
            $(this).removeClass("active");
        });
    });
    $(".oFilterAllOn img").click(function() {
        $(this).closest('.filtertable').find("table.filterable").find("tbody tr").each(function() {
            $(this).attr("condition", 0);
            $(this).show(250);
        });
        $(this).closest('.filtertable').find('.oFilterOption').each(function() {
            $(this).addClass("active");
        });
    });
}
$.when('ready').then(function() {
    filterTable();
    oFilter();
    oFilterAll();
});