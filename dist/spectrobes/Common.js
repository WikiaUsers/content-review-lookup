/* Any JavaScript here will be loaded for all users on every page load. */
var $tfb;

// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}

// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}

// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")===false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() === "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}

function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") === false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}

// check to see if it is active then do it
$(function() {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
});

// Sketchfab 3D model plugin, refer to Thread 19076 on CC
mw.hook('wikipage.content').add(function ($content) {
    if (!$content.find('.sfab').length) return;
    var defaults = {
            width: "100%",
            height: 480,
            frameborder: 0,
            allow: '"autoplay; fullscreen; vr"'
        },
        src = 'https://sketchfab.com/models/(src)/embed';
    $content.find('.sfab').each(function () {
        var $el, $this = $(this), data = this.dataset;
        if (!data || !data.id) return;
        $el = $('<iframe>', {
            src: src.replace('(src)', data.id),
            width: data.width || defaults.width,
            height: data.height || defaults.height,
            frameborder: data.frameborder || defaults.frameborder,
            allow: data.allow || defaults.allow
        });
        $this.append($el);
    });
});

// Google Poly
mw.hook('wikipage.content').add(function ($content) {
    if (!$content.find('.gpoly').length) return;
    var defaults = {
            width: "100%",
            height: 480,
            frameborder: 0,
        },
        src = 'https://poly.google.com/view/(src)/embed';
    $content.find('.gpoly').each(function () {
        var $el, $this = $(this), data = this.dataset;
        if (!data || !data.id) return;
        $el = $('<iframe>', {
            src: src.replace('(src)', data.id),
            width: data.width || defaults.width,
            height: data.height || defaults.height,
            frameborder: data.frameborder || defaults.frameborder,
        });
        $this.append($el);
    });
});