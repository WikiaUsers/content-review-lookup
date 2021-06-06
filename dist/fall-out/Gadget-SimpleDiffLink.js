(function(window, $, mw) {
    if (window.SimpleDiffLinkLoaded) return;
    window.SimpleDiffLinkLoaded = true;

	$(function() {
	    var conf = mw.config.get(["skin"]);
	    if (conf.skin !== "oasis" && conf.skin !== "fandomdesktop") return;
	
	    var originalUrl = new URL(window.location.href);
	    var queryParams = new URLSearchParams(originalUrl.search);
	    if (!queryParams.has("oldid") || !queryParams.has("diff")) return;
	
	    var wikiPath = originalUrl.pathname.substr(0, originalUrl.pathname.lastIndexOf("/"));
	    var wikiUrl = originalUrl.protocol + "//" + originalUrl.hostname + wikiPath + "/";
	
	    var oldId = queryParams.get("oldid");
	    var newId = queryParams.get("diff");
	    var diffUrl = wikiUrl + "Special:Diff/" + oldId + "/" + newId;
	
	    var buttonDiv = $("#mw-diff-ntitle1 strong");
	    if (!buttonDiv.length) throw "[SimpleDiffLink] Could not find div to put URL button in.";
	
	    buttonDiv.append(
	    	" " +  // Whitespace in between buttons
	        "<span class='mw-rev-head-action'>" +
	            "(" +
	            "<a href='#' onclick='window.prompt(undefined, \"" + diffUrl + "\");'>" +
	                "URL" +
	            "</a>" +
	            ")" +
	        "</span>"
	    );
	});
}(this, jQuery, mediaWiki));