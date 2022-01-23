// START OF TOOLTIP CODE
// Written by Pcj
// Updated by Uberfuzzy
 
//Tooltip Code
var tooltipsOn = true;
var $tfb;
var activeHoverLink = null;
var tipCache = {};

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
    $ct = $tfb.not(":empty");
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
    $t = $(this);
    activeHoverLink = $t;
    $parent = $t.parent();
    if ($parent.hasClass("selflink") === false) {
        $t.removeAttr("title");
        $parent.removeAttr("title");
        var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\+/g, "%2B").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
        if (tipCache[url] !== undefined) {
            $tfb.html(tipCache[url]);
            displayTip(e);
            return;
        }
        $tfb.load(url, function() {
            if ($t != activeHoverLink) return;
            if ($tfb.html() === "") $tfb.html('<div class="ajaxtt-error"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
            $tfb.find(".tooltip-content").css("display", "");
            tipCache[url] = $tfb.html();
            displayTip(e);
        });
    }
}

function bindTT() {
    $t = $(this);
    $parent = $t.parent();
    if ($parent.hasClass("selflink") === false) $t.data("tt", $parent.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
    if (tooltipsOn) {
    	// adds Portable Infobox css module. snippet from User:HumanCanWinElves
    	var $linkEl = $('head > link[rel="stylesheet"][href*="/load.php?"][href*="&modules="][href*="ext.fandom.PortableInfoboxFandomDesktop.css"]').first();
		if ($linkEl.length === 0) {
			$linkEl = $('head > link[rel="stylesheet"][href*="/load.php?"][href*="&modules="]').first();
			$linkEl.clone().attr('href', '/load.php?fandomdesktop=1&lang=en&modules=ext.fandom.PortableInfoboxFandomDesktop.css&only=styles&skin=fandomdesktop"').insertAfter($linkEl);
		}
        $(".page-content").append('<div id="tfb" class="htt"></div>');
        $tfb = $("#tfb");
        $(".page-content span.ajaxttlink").each(bindTT);
    }
});
// END OF TOOLTIP CODE