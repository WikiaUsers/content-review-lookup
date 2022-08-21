// Written by Pcj
// Updated by Uberfuzzy

;(function($, mw) {
	var $tfb,
		activeHoverLink = null,
		tipCache = {},
		msg;
	
	// hides the tooltip
	function hideTip() {
	    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
	    activeHoverLink = null;
	}
	
	// displays the tooltip
	function displayTip(e) {
	    $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	    moveTip(e);
	    $tfb.not(":empty").css("visibility", "visible");
	    moveTip(e);
	}
	
	// moves the tooltip
	function moveTip(e) {
	    var $ct = $tfb.not(":empty");
	    var newTop;
	    var newLeft;
	    if ((e.clientY - $ct.innerHeight()) > 46 )
	    	newTop = e.clientY - $ct.innerHeight();
	    else if ((e.clientY + $ct.innerHeight()) < ($(window).height() - 46)) //46px: height of sticky nav
	    	newTop = e.clientY;
	    else newTop = 50;
	    newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + 10) : 10);
	    $ct.css({
	        "position": "fixed",
	        "top": newTop + "px",
	        "left": newLeft + "px"
	    });
	}
	
	// AJAX tooltips
	function showTip(e) {
	    var $t = $(this);
	    activeHoverLink = $t;
	    var $parent = $t.parent();
	    if ($parent.hasClass("selflink") === false) {
	        $t.removeAttr("title");
	        $parent.removeAttr("title");
	        var url = mw.util.wikiScript('index') + "?title=" + $t.data("tt").replace(/ /g, "_").replace(/\+/g, "%2B").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
	        if (tipCache[url] !== undefined) {
	            $tfb.html(tipCache[url]);
	            displayTip(e);
	            return;
	        }
	        $tfb.load(url, function() {
	            if ($t != activeHoverLink) return;
	            if ($tfb.html() === "") $tfb.html('<div class="ajaxtt-error">' + msg('ajaxtt-error').escape() + '</div>');
	            $tfb.find(".tooltip-content").css("display", "");
	            tipCache[url] = $tfb.html();
	            displayTip(e);
	        });
	    }
	}
	
	function bindTT() {
	    var $t = $(this);
	    var $parent = $t.parent();
	    if ($parent.hasClass("selflink") === false) $t.data("tt", $parent.attr("title").replace(" " + msg('ajaxtt-page-doesnt-exist').plain(), "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
	}


	function init() {
		// adds Portable Infobox css module. snippet from User:HumanCanWinElves
		var $linkEl = $('head > link[rel="stylesheet"][href*="/load.php?"][href*="&modules="][href*="ext.fandom.PortableInfoboxFandomDesktop.css"]').first();
		if ($linkEl.length === 0) {
			$linkEl = $('head > link[rel="stylesheet"][href*="/load.php?"][href*="&modules="]').first();
			$linkEl.clone().attr('href', '/load.php?fandomdesktop=1&lang=en&modules=ext.fandom.PortableInfoboxFandomDesktop.css&only=styles&skin=fandomdesktop"').insertAfter($linkEl);
		}
	    $(".page-content").append('<div id="tfb" class="htt"></div>');
	    $tfb = $("#tfb");
	    $(".page-content .ajaxttlink").each(bindTT);
	}
	
	mw.hook('dev.i18n').add(function (i18n) {
		i18n.loadMessages('AjaxTooltips').done(function (i18no) {
			msg = i18no.msg;
			init();
		});
	});
	importArticles({
		type: 'script',
		articles: 'u:dev:MediaWiki:I18n-js/code.js'
	});
})(window.jQuery, window.mediaWiki);