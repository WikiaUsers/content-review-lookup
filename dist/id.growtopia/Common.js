	// ----- [ Tab View Remaster.JS - COPYRIGHTED BY NEKOPILLOW ] -----//
    // ----- [ For more information, please contact NEKOPILLOW or Librarian Bird‎] -----//	
	$(".gtw-tabview").on("click","a", function() {
		var $parent = $(this).parents(".gtw-tabview");
		var $href = $(this).attr("href");
		if(!/^\/wiki\//.test($href)) return true; // Only allow wiki interlink for security reason
		$parent.find("a").removeClass("active");
		$(this).addClass("active");
		$parent.next(".gtw-tabpage").remove();
		$.get($href, function(a) {
			$parent.next(".gtw-tabpage").remove();
			$("<div>",{class:"gtw-tabpage"}).insertAfter($parent).html($(a).find("#mw-content-text .mw-parser-output").html());
		});
	    return false;
	}).each(function(){
		var $default = $(this).attr("data-default");
		if($default != undefined) {
			$(this).find("a[href$="+$default+"]").click();
		}
	});