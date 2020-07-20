/* Any JavaScript here will be loaded for all users on every page load. */

/* Tunngle live list - demo only  - use Gadget please */
jQuery(document).ready( function() {
    // Show the loading info
    $("div .tunnglelivedemo").append("<div class='tunngleloadingdemo'>Loading Tunngle network data</div><div class='tunngletabledemo' style='display: none'><table class='tunngledemo color2'><thead><tr><th>Network Name</th><th>Users</th></tr></thead><tbody></tbody></table></div>");	
 
  // Get live data via JSON API
  if ( $("div .tunnglelivedemo").length > 0 ) { //only perform the AJAX request if there is a target div that needs it
    jQuery.getJSON("http://www.tunngle.net/api/api.php?output=json&mode=smallnetworkinfo&nocache="+new Date().getMilliseconds()+"&callback=?", function(data) {
 
	// Write the table(s)
	for (var i=0;i<data.Export.Network.length;i++) { 
	    if(data.Export.Network[i].NetworkName.match("Virtual Skipper")) {
		var oddeven = (oddeven ? 0 : 1); // CSS can style odd & even rows differently using the class names 'row1' & 'row0' respectively
		$('.tunngletabledemo').find('tbody')
                    .append("<tr class='row" + oddeven + "'><td>"+data.Export.Network[i].NetworkName+"</td><td>"+data.Export.Network[i].UserCount+"</td></tr>");
	    }
	}
 
	// Show table, hide loading info
	$('.tunngleloadingdemo').hide("slow");
	$('.tunngletabledemo').show("slow");
    })
  } 
});