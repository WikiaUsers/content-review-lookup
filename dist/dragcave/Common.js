/* Any JavaScript here will be loaded for all users on every page load. */

//User Tags//
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		dcstaff: { u:'DC Staff Member', link:'Personnel_List' },
		dcspriter: { u:'DC Spriter', link:'Category:Dragon Spriter' },
		bureaucrat: { u:'Wiki Admin', link:'Dragon Cave Wiki:Administrators' },
		sysop: { u:'Wiki Admin', link:'Dragon Cave Wiki:Administrators' },
		bot: { u:'Bot', link:'Dragon Cave Wiki:Administrators' },
	}
};
// Add custom groups to several users
UserTagsJS.modules.custom = {
    'TJ09': ['dcstaff', 'dcspriter'],
    'Sunstar of Cybertron': ['dcstaff'],
	'Kilaicious': ['dcspriter'],
	'Lythiaren': ['dcspriter'],
	'Marrionetta': ['dcspriter'],
	'Skinst': ['dcspriter'],
	'Skinst-spriter': ['dcspriter'],
	'Earthgirl': ['dcspriter'],
	'JereduLevenin': ['dcspriter'],
	'JaziandCo': ['dcspriter'],
	'Komodo Gallant': ['dcspriter'],
	'Nakase': ['dcspriter'],
	'Angziety': ['dcspriter'],
	'TCAnimorph': ['dcspriter'],
	'Vicats': ['dcspriter'],
	'Pixellation': ['dcspriter'],
	'Birdzy': ['dcspriter'],
	'Corteo': ['dcspriter'],
	'DC Stromboli': ['dcspriter'],
	'Dispippy': ['dcspriter'],
	'LaughingDove': ['dcspriter'],
	'OdeenKitty': ['dcspriter'],
	'Shajana': ['dcspriter'],
	'Verridith': ['dcspriter'],
	'Bluesonic1': ['bureaucrat'],
	'BluesonicBot': ['bot'],
};

// Remove groups from several users
UserTagsJS.modules.userfilter = {
	'BluesonicBot': ['sysop'],
    'Bluesonic1': ['sysop'],
};

// other imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:ArchiveTool/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:DupImageList/code.js',
        'w:c:dev:UserTags/code.js',
    ]
});


// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy
 
 article = "";
 
 var tooltipsOn = true;
 
 var $tfb;
 
 var $ttfb;
 
 var $htt;
 
 var activeHoverLink = null;
 
 var tipCache = new Object;
 
 function hideTip() {
	$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
	activeHoverLink = null;
}
 
 function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility", "visible");
	moveTip(e);
}
 
 function moveTip(e) {
	$ct = $htt.not(":empty");
	var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
	var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
	$ct.css({
		position: "fixed",
		top: newTop + "px",
		left: newLeft + "px"
	});
}
 
 function showTip(e) {
	var $t = $(this);
	activeHoverLink = $t;
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.removeAttr("title");
		$p.removeAttr("title");
		var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
		if (tipCache[url] != null) {
			$tfb.html(tipCache[url]);
			displayTip(e);
			return;
		}
		$tfb.load(url, function() {
			if ($t != activeHoverLink)
				return;
			if ($tfb.html() == "")
				$tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
			$tfb.find(".tooltip-content").css("display", "");
			tipCache[url] = $tfb.html();
			displayTip(e);
		});
	}
}
 
 function hideTemplateTip() {
	$ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
 function showTemplateTip(e) {
	$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
	displayTip(e);
}
 
 function bindTT() {
	$t = $(this);
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
	}
}
 
 function ttMouseOver() {
	if (tooltipsOn && $.cookies.get("wiki-tiploader") != "no") {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
		$(article + " span.ajaxttlink").each(bindTT);
		$(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
	}
}
 
// check to see if it is active then do it
 $( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}
 
	ttMouseOver();
});
// END OF TOOLTIP CODE

// Ajax auto-refresh
var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles", "Special:Videos"];
var AjaxRCRefreshText = 'Auto-refresh';
// END of ajax auto-refresh

// PreloadTemplates
preloadTemplates_list = "Dragon_Cave_Wiki:PreloadTemplates_List";
preloadTemplates_subpage = "case-by-case";