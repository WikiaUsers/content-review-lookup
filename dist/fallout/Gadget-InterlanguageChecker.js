(function(window, $, mw) {
    if (window.InterlanguageCheckerLoaded) return;
    window.InterlanguageCheckerLoaded = true;

	$(function() {
	    var conf = mw.config.get(["skin", "wgPageName", "wgServer", "wgScriptPath"]);
	    var apiUrl = conf.wgServer + conf.wgScriptPath + "/api.php";
	    var ilcUrl =
	        "https://fwdekker.com/tools/interlanguage-checker/?" +
	            "&api=" + encodeURIComponent(apiUrl) +
	            "&article=" + encodeURIComponent(conf.wgPageName);

	    if (conf.skin === "oasis") {
		    var menuItems = $(".page-header__contribution-buttons .wds-dropdown .wds-list");
		    if (!menuItems.length) throw "[InterlanguageChecker] Could not find dropdown menu.";

		    menuItems.append(
		        "<li>" +
		            "<a id='ca-interlanguage-checker' href='" + ilcUrl.replace(/'/g, "&#39;") + "' class='new'>" +
		                "Check IW" +
		            "</a>" +
		        "</li>"
		    );
	    } else if (conf.skin === "fandomdesktop") {
	    	var menuItems = $(".page-header__actions .wds-dropdown__content .wds-list");
	    	if (!menuItems.length) throw "[InterlanguageChecker] Could not find dropdown menu.";

		    menuItems.append(
		        "<li>" +
		            "<a id='ca-ve-interlanguage-checker' href='" + ilcUrl.replace(/'/g, "&#39;") + "' data-tracking-label='ca-ve-edit-dropdown' accesskey='i'>" +
		                "Check IW" +
		            "</a>" +
		        "</li>"
		    );
	    }
	});
}(this, jQuery, mediaWiki));