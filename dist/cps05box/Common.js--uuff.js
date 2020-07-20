$(document).ready(function() {
	$("body.page-Uuff .wiki-wof-list li dl").hide();
	$("body.page-Uuff .wiki-wof-list li > div").mousedown(function() {
		$(this).next().slideToggle(130);
	});
	$("body.page-Uuff .wiki-wof-features span:nth-child(1)").click(function() {
		$("body.page-Uuff .wiki-wof-list li dl").show(130);
	});
	$("body.page-Uuff .wiki-wof-features span:nth-child(2)").click(function() {
		$("body.page-Uuff .wiki-wof-list li dl").hide(130);
	});
	$("body.page-Uuff .wiki-wof-features span:nth-child(3)").click(function() {
		$("body.page-Uuff .wiki-wof-list li dl").slideToggle(130);
	});
});