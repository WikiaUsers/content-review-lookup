/*<syntaxhighlight lang="javascript">*/
jQuery(document).ready( function() {
    // Show the loading info
    $("div .tunnglelivelist").append("<div class='tunngleloadingarea'>Loading Tunngle network data</div><div class='tunngletablearea' style='display: none'><table class='tunngle color2'><thead><tr><th>Network Name</th><th>Users</th></tr></thead><tbody></tbody></table></div>");	

  // Get live data via JSON API
  if ( $("div .tunnglelivelist").length > 0 ) { //only perform the AJAX request if there is a target div that needs it
    jQuery.getJSON("http://www.tunngle.net/api/api.php?output=json&mode=smallnetworkinfo&nocache="+new Date().getMilliseconds()+"&callback=?", function(data) {

	// Write the table(s)
	for (var i=0;i<data.Export.Network.length;i++) { 
	    if(data.Export.Network[i].NetworkName.match("Virtual Skipper")) { // edit this line to customize to YOUR GAME
		var oddeven = (oddeven ? 0 : 1); // CSS can style odd & even rows differently using the class names 'row1' & 'row0' respectively
		$('.tunngletablearea').find('tbody')
                    .append("<tr class='row" + oddeven + "'><td>"+data.Export.Network[i].NetworkName+"</td><td>"+data.Export.Network[i].UserCount+"</td></tr>");
	    }
	}

	// Show table, hide loading info
	$('.tunngleloadingarea').hide("slow");
	$('.tunngletablearea').show("slow");
    }) 
  }
});
/*</syntaxhighlight>*/