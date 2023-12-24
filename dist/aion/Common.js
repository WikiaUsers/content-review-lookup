/*** Page flip view used in [[Template:Book]]
	 Courtesy of pcj - used with permission   ***/
function pageLeft() {
    if ($("#book .text:visible").prevAll("#book .text").length !== 0) {
        thisPage = $("#book .text:visible").prevAll("#book .text").length;
        $("#book .text").eq(thisPage).hide();
        $("#book .text").eq(thisPage - 1).show();
        $(".buttonright").css("opacity", "1.0").css("filter", "alpha(opacity=10)");
        newThisPage = $("#book .text:visible").prevAll("#book .text").length + 1;
        $("#book .page").text("- " + newThisPage + "/" + $("#book .text").length + " -");
        if ($("#book .text:visible").prevAll("#book .text").length === 0) $(".buttonleft").css("opacity", "0.3").css("filter", "alpha(opacity=03)");
    }
}

function pageRight() {
    if ($("#book .text:visible").nextAll("#book .text").length !== 0) {
        thisPage = $("#book .text:visible").prevAll("#book .text").length;
        $("#book .text").eq(thisPage).hide();
        $("#book .text").eq(thisPage + 1).show();
        $(".buttonleft").css("opacity", "1.0").css("filter", "alpha(opacity=10)");
        newThisPage = $("#book .text:visible").prevAll("#book .text").length + 1;
        $("#book .page").text("- " + newThisPage + "/" + $("#book .text").length + " -");
        if ($("#book .text:visible").nextAll("#book .text").length === 0) $(".buttonright").css("opacity", "0.3").css("filter", "alpha(opacity=03)");
    }
}

$(function() {
    if ($("#book").length) {
        $(".buttonleft").click(pageLeft);
        $(".buttonright").click(pageRight);
        if ($("#book .text:visible").nextAll("#book .text").length !== 0) $(".buttonright").css("opacity", "1.0").css("filter", "alpha(opacity=10)");
    }
});

/*** Tooltip Code ***/
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
    var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($ct.innerHeight() + 20) : 20);
    var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($ct.innerWidth() + 20) : 20);
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
            if ($tfb.html() === "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
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
        $("#content").append('<div id="tfb" class="htt"></div>');
        $tfb = $("#tfb");
        $("#content span.ajaxttlink").each(bindTT);
    }
});