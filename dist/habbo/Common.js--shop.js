// Coded by Cblair91
var scroller  = null;
var scrollbar = null;
 
if(document.getElementById("nav")) {
	window.onload = function () {
		scroller  = new jsScroller(document.getElementById("nav"),  140, 340);
		scrollbar = new jsScrollbar (document.getElementById("Scrollbar-Container"), scroller, true, scrollbarEvent);
		$('#text').load("/wiki/MediaWiki:Shop-Homepage?action=render");
	//updateScrollbar()
	}
}
 
function updateScrollbar() {
	var scrollbar = document.getElementById("Scrollbar-Container");
	var scrollbarhandle = document.getElementById("Scrollbar-Handle");
	if(scrollbar.style.height < 336) {
		scrollbarhandle.style.height = "306px";
		// Stop it from scrolling
	} else {
		// We get the percent height
		var scrollbarheight = scrollbarhandle.style.height;
		// Take away 30px for the buttons
		// And get it to scroll to correct height
		return;
	}
}
 
function scrollbarEvent (o, type) {
	//updateScrollbar();
	if(type == "mousedown") {
		if(o.className == "Scrollbar-Handle")
			o.style.background = "url(http://betadev.co.uk/shop/images/Scrollbar-down.png)";
	} else {
		if(o.className == "Scrollbar-Handle")
			o.style.background = "url(http://betadev.co.uk/shop/images/Scrollbar.png)";
	}
}
 
function showHideShop() {
	var shop = document.getElementById("shop");
	var scrollbar = document.getElementById("Scrollbar-Container");
	var scrollbarhandle = document.getElementById("Scrollbar-Handle");
	if(shop.style.visibility == "hidden") {
		shop.style.visibility = "visible";
		scrollbar.style.visibility = "visible";
		scrollbarhandle.style.visibility = "visible";
	} else {
		shop.style.visibility = "hidden";
		scrollbar.style.visibility = "hidden";
		scrollbarhandle.style.visibility = "hidden";
	}
}
 
$(document).ready(function() {
	$('.Scroller-Container li').click(function() {
		$(".Scroller-Container li").each(function() {
			$(this).removeClass("active");
			if($(this).attr('id') == 'sub-nav')
				$(this).css('display', 'none');
		});
		if($(this).attr('alt'))
			$('.' + $(this).attr('alt')).css('display', 'inherit');
		if($(this).attr('id') == 'sub-nav')
			$(this).css('display', 'inherit');
		$(this).addClass("active");
	});
	$('li span.shoplink').click(function() {
		$('#text').load("/wiki/"+$(this).attr('class').replace('shoplink ','').replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render", function () {
		if($('#text').html() == "")
			$('#text').html('NO CONTENT! ERROR!');
		});
		$('.habboGen').each(function() {
			habboclass = $(this).attr('id').split('-');
			thisHabbo = habboclass[0];
			// Fix for "=" in habbo name
			thisHabbo = thisHabbo.replace('.3D', '=');
			thisAction = habboclass[1];
			$(this).html('<img src="http://habbo.com/habbo-imaging/avatarimage?user=' + thisHabbo + '&action=' + thisAction + '&direction=35&head_direction=35&gesture=sml&size=l">');
		});
	});
});