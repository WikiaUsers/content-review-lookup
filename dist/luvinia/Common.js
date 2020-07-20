/* Any JavaScript here will be loaded for all users on every page load. */
/* Show Hide my Broccoli */
if ($(".broccoli")[0]){
	//adds red markings to show/hide button
   	$('.broccoli').prev().addClass("broccolititle");
	
	//show hide function
	var i = 1;	
	$('.broccoli').each(function() {
		if ($(this).prev().attr("id") == undefined) {
			$(this).prev().attr('id', 'coli'+i);
			
			$("#coli"+i).click(function () {
			  $(this).next().slideToggle("500");
			});
			
			i++;
		}
	});
}