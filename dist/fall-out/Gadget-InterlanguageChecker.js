(function(window, $, mw) {
    if (window.InterlanguageCheckerLoaded) return;
    window.InterlanguageCheckerLoaded = true;

	$(function() {
	    var conf = mw.config.get(["skin", "wgPageName", "wgServer", "wgScriptPath"]);
	    if (conf.skin !== "oasis") return;
	
	    var menuItems = $(".page-header__contribution-buttons .wds-dropdown .wds-list");
	    if (!menuItems.length) throw "[InterlanguageChecker] Could not find dropdown menu.";
	
	    var apiUrl = conf.wgServer + conf.wgScriptPath + "/api.php";
	    var ilcUrl =
	        "https://fwdekker.com/tools/interlanguage-checker/?" +
	            "&api=" + encodeURIComponent(apiUrl) +
	            "&article=" + encodeURIComponent(conf.wgPageName);
	    
	    menuItems.append(
	        "<li>" +
	            "<a id='ca-talk' href='" + ilcUrl.replace(/'/g, "&#39;") + "' class='new'>" +
	                "Check IW" +
	            "</a>" +
	        "</li>"
	    );
	});
}(this, jQuery, mediaWiki));