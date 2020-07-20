
// This tooltip code was modified from original version written by Pcj
 
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
	var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20) : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20) : 20);
	$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
	$t=$(this);
	$p=$t.parent();
	if ($p.hasClass("selflink")==false) {
		$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content", function () {
			if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
			$tfb.find(".tooltip-content").css("display","");
			displayTip(e);
		});
	}
}
 
function bindTT() {
	$t=$(this);
	$p=$t.parent();
	if ($p.hasClass("selflink") == false && !!$p.attr('title')) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
		$p.removeAttr('title');
		$t.removeAttr('title');
	}
}

function initTT(BC) {
	BC.find("span.ajaxttlink").each(bindTT);
}

function initAllTT() {
	$(".ajaxTTWrapper").each(function(i, obj){
		if ($(this).attr("data-loaded") == "false") {
		      $(this).attr("data-loaded", "true");
		      initTT($(this));
		}
	});
}

// check to see if it is active then do it
$(function() {
	if(skin=='oasis') { var BC = '#WikiaArticle'; }
	else { var BC = '#bodyContent'; }
 
	$(BC).mouseover(hideTip).append('<div id="tfb" class="htt"></div>');
	$tfb = $("#tfb");
	initTT($(BC));
});