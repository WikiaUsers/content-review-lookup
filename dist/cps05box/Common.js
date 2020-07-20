importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/iwi.js",
		"MediaWiki:Common.js/jukebox.js",
		"MediaWiki:Common.js/swfxml.js",
		"MediaWiki:Common.js/uuff.js",
		"MediaWiki:Common.js/card.js",
		"u:dev:Verbatim/code.js"
	]
});
console.info("Hello%cWorld!", "margin-left: 3px; padding-left: 19px; padding-bottom: 8px; background: url('https://images.wikia.nocookie.net/dev/images/thumb/8/8a/PPL.svg/16px-PPL.svg.png') no-repeat; line-height: 25px;");


console.log("pake");



$(function() {
	var a = "";
	$(window).keydown(function(e) {
		if (!(document.activeElement.nodeName.toLowerCase() == "input" && document.activeElement.type.toLowerCase() == "password")) {
			a += "," + e.keyCode;
			checkKeys(e);
		}
	});
	function checkKeys(e) {
		if (a.search(/38\,38\,40\,40\,37\,39\,37\,39\,66\,65\,87$/) > -1) {
			e.preventDefault();
			alert("W is for Walrus!");
		} 
	}
});

console.info("lenny was here \u2534\u252c\u2534\u2524( \u0361\u00b0 \u035c\u0296\u251c\u252c\u2534\u252c");