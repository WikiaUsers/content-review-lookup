/* child "row" formatting */
function format(r) {
	var mvpTheme = r.find(".emblem-mvp").html();
	if(mvpTheme.length > 0){
		mvpTheme = "<dt>MVP Theme</dt><dd>"+mvpTheme+"</dd>";
	} else {
		mvpTheme = "";
	}
	return "<dl>"+
		"<dt>Description</dt><dd>"+r.find(".emblem-desc").html()+"</dd>"+
		"<dt>How to Unlock</dt><dd>"+r.find(".emblem-unlock").html()+"</dd>"+
		mvpTheme+
	"</dl>";
}

$(function(){
	// only load on Acepedia:Sandbox and Ace_Combat_Infinity/Emblems
	if(/^(1822|48136)$/.test(mw.config.get("wgArticleId"))){
		
		// run a check to see if DataTables has loaded
		const dTCheck = setInterval(function(){
			if($(".datatable-emblems-aceinf.datatable-loaded").length){
				// end the check
				clearInterval(dTCheck);
				
				// grab the table API
				var table = $(".datatable-emblems-aceinf").DataTable();
				
				// apply the event handler for clicking a row
				$(".datatable-emblems-aceinf.datatable-loaded tbody").on("click", "td.details-control", function(){
					// select the row that was clicked
					var tr = $(this).closest("tr"); // for the icon
					var row = table.row(tr); // for the API
					
					if (row.child.isShown()){
						row.child.hide();
						tr.removeClass("shown");
					} else {
						row.child(format(tr)).show();
						tr.addClass("shown");
					}
				});
			}
    	}, 250);
	}
});