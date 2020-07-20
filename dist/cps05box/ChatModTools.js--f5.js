// <syntaxhighlight lang="javascript">
$(window).keydown(function(e) {
	if (e.keyCode == 116) {
		e.preventDefault();
		var a = open(location.pathname, "wikichat" + new Date().getTime(), mw.config.get("wgWikiaChatWindowFeatures"));
		a.onload = function() {
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = "/load.php?debug=false&lang=en&mode=articles&skin=oasis&missingCallback=importArticleMissing&articles=u%3Adev%3AChatModTools%2Fcode.js%7Cu%3Adev%3AChatModTools%2Ff5.js&only=scripts&cb=" + new Date().getTime();
			this.document.head.appendChild(s);
			this.opener.close();
		}
	}
});
// </syntaxhighlight>