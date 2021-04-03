// This makes external links with the 'plainlinks' class behave like internal links. 
$(function() {
	$(".plainlinks a").attr("class", null)
	$(".plainlinks a").attr("rel", null);
	$(".plainlinks a").attr("target", null);
	$(".plainlinks a").each(function() {
		$(this).attr("title", $(this).text())
	});
});