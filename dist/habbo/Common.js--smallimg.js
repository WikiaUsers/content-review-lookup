// hides the tooltip
function hideTip2() {
	$("#tfb2").addClass("hidden").css("visibility", "hidden"); 
}
 
// displays the tooltip
function displayTip2(e) {
	$("#tfb2").removeClass("hidden");
	moveTip(e);
	$("#tfb2").css("visibility", "visible");
}
 
// moves the tooltip
function moveTip2(e) {
	var newTop2 = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($("#tfb2").not(".hidden").innerHeight() + 10) : 20);
	var newLeft2 = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($("#tfb2").not(".hidden").innerWidth() + 10) : 20);
	$("#tfb2").not(".hidden").css({
		"position": "fixed",
		"top": newTop2 + "px",
		"left": newLeft2 + "px"
	});
}
 
// check to see if it is active then do it
function ttMouseOver2() {
	$('body').mouseover(hideTip2);
	$('body').append('<div id="tfb2" style="z-index: 99999"><table class="infobox" style="border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px; -khtml-border-radius: 10px; -icab-border-radius: 10px; -o-border-radius: 10px;; width: 300px; text-align: center; font-size: 100%; border: 2px double #444; background: #FFDD33;"><tr><td>Click me to display the small or large image</td></tr></table></div>');
	$(".hoverbit").each(function() {
		$(this).mouseover(displayTip2).mouseout(hideTip2).mousemove(moveTip2);
	});
}
 
$(document).ready(function() {
    ttMouseOver2();
});

// Click on big image or small image
$("#furniClick, #smallImage").click(function() {
    $('#furniClick, #smallImage').toggle();
});