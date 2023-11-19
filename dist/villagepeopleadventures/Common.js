/* make all external links open in a new tab */
$("body").click(function(e) {
	var a = e.target;
	if (a.nodeName.toLowerCase() == "a" && a.href.indexOf(location.origin + "/") != 0) {
		// user clicked an external link
		$(a).attr("target", "_blank");
	}
});