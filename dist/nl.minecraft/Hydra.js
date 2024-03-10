/* Any JavaScript here will be loaded for users using the Hydra skin */

window.addEventListener("load", function() {
	$("li#ca-watch").find("a").css("width", "45px").css("margin-right", "-5px");
	$("li#ca-unwatch").find("a").css("width", "45px").css("margin-right", "-5px");
});

$("div#mw-head div#p-sharing input").hover(function() {
	$("div#mw-head div#p-sharing h3").css("background-position", "right bottom");
}, function() {
	$("div#mw-head div#p-sharing h3").css("background-position", "");
});

$("div#mw-head div#p-cactions input").hover(function() {
	$("div#mw-head div#p-cactions h3").css("background-position", "right bottom");
}, function() {
	$("div#mw-head div#p-cactions h3").css("background-position", "");
});