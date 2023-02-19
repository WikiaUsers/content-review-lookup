/* Any JavaScript here will be loaded for all users on every page load. */
 
/**********************************************************/
/* Tooltip: Display Infobox when hover mouse over an item */
/**********************************************************/
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
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
if(skin=='oasis') { var BC = '#WikiaArticle'; }
else { var BC = '#bodyContent'; }
 
$(BC).mouseover(hideTip); 
$(BC).append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$(BC + " span.ajaxttlink").each(bindTT);
});
 
 
/**********************************************/
/* Override Lightboxes and go directly to the */
/* image's page when clicking on an image     */
/**********************************************/
/*
function changeimagelinks() {
 
    if (window.skin == 'oasis') {
        var article = $('#WikiaArticle, .LatestPhotosModule, #article-comments');
    }
    else {
        var article = $('#bodyContent');
    }
 
    article.unbind('click.lightbox');
 
    var a = document.getElementsByTagName("a");
    for ( var t = 0; t < a.length; ++t ) {
        var a2 = a[t];
        var img = a2.getElementsByTagName("img");
        if ( img[0] != null ) {
            if ( a2.href.indexOf("images.wikia.com") != -1 ) {
                var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
                a2.setAttribute('href',link);
            }
        }
    }
}
 
addOnloadHook(changeimagelinks);
*/