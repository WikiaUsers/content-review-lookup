/* from https://wow.gamepedia.com/MediaWiki:Common.js */

var article = "#bodyContent";

var Tooltips = {hideClasses:[], cache:{}, activeHover: false, enabled: true, activeVersion: ''};
var $tfb, $ttfb, $htt;

function hideTip() {
	$tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
	$tfb.children().remove();
	if ($(this).data('ahl-id') == Tooltips.activeHover) Tooltips.activeHover = null;
}
function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility","visible");
	moveTip(e);
}
function moveTip(e) {
	var $ct = $htt.not(":empty");
	var eh = $ct.innerHeight() + 20, wh = $(window).height();
	var newTop = e.clientY + ((e.clientY > (wh/2)) ? -eh : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
	newTop = Math.max(105, Math.min(wh - eh, newTop));
	$ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTipFromCacheEntry(e, url, tag) {
	var h = Tooltips.cache[url + " " + tag];
	if (!h) {
		h = Tooltips.cache[url].find(tag);
		if (h.length) Tooltips.cache[url + " " + tag] = h;
	}
	if (!h.length) {
		$tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
	} else {
		h.css("display", "").addClass("tooltip-content");
		$tfb.html(h);
	}
	displayTip(e);
}
function showTip(e) {
	if (!Tooltips.enabled) return;
	var $t = $(this), ks = Tooltips.hideClasses, $p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		for (var j = 0; j < ks.length; j++) {
			if ($t.hasClass(ks[j])) return;
		}
		var tooltipIdentifier = "div.tooltip-content", tooltipTag = $t.attr("class").match(/taggedttlink(-[^\s]+)/);
		if ($t.hasClass("versionsttlink")) tooltipIdentifier += Tooltips.activeVersion;
		else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
		var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'div[class*="tooltip-content"]';
		var tipId = url + " " + tooltipIdentifier;
		Tooltips.activeHover = tipId;
		$t.data('ahl-id', tipId);
		if (Tooltips.cache[url] != null) return showTipFromCacheEntry(e, url, tooltipIdentifier);
		$('<div style="display: none"/>').load(url, function(text) {
			if (!text) return; // Occurs when navigating away from the page cancels the XHR
			Tooltips.cache[url] = $(this);
			if (tipId != Tooltips.activeHover) return;
			showTipFromCacheEntry(e, url, tooltipIdentifier);
		});
	}
}

Tooltips.toggleTooltipClassDisplay = function(className, setTo) {
	var ci = this.hideClasses.indexOf(className);
	if (setTo === undefined) setTo = ci < 0;
	if (ci < 0 && setTo === false) {
		this.hideClasses.push(className);
	} else if (ci >= 0 && setTo === true) {
		this.hideClasses.splice(ci, 1);
	}
};
Tooltips.setActivePageVersion = function(versionName) {
	this.activeVersion = versionName;
};

// quick tooltips
function hideTemplateTip() {
	$ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
function showTemplateTip(e) {
	$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
	displayTip(e);
}

function bindTT() {
	var $t=$(this), $p=$t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).on("mouseenter",showTip).on("mouseleave",hideTip).mousemove(moveTip);
		if ($p.hasClass("new")) {
			els = '<sup><span class="plainlinks">';
			for (x=0;x<2;x++) els += eLink(x,$t.data("tt").replace("Quest:",""));
			$p.after(els+'</span></sup>');
		} else {
			$t.removeAttr("title");
			$p.removeAttr("title");
		}
	}
}
function tooltipsInit(root) {
	if ($tfb == null) {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
	}
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
	root.find("span.ajaxttlink").each(bindTT);
	root.find("span.tttemplatelink").on("mouseenter",showTemplateTip).on("mouseleave",hideTemplateTip).mousemove(moveTip).children("a").removeAttr("title");
}

$(function() {
	tooltipsInit($(article));
});