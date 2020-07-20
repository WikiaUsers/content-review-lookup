//Made by Ofkorse
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css(
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	//Zawartość
	$('<div class="fb-like-box" data-href="https://www.facebook.com/pages/Simspedia/249853891795345?fref=ts" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		FACEBOOK_HOVER = true;
		toggleFacebookWnd();
	}).mouseleave(function(){
		FACEBOOK_HOVER = false;
		toggleFacebookWnd();
	});
});

var FACEBOOK_HOVER = false;
function toggleFacebookWnd() {
	setTimeout(function(){
		if (FACEBOOK_HOVER) $("#FacebookWnd").animate({right:"0px"}, 700);
		else $("#FacebookWnd").animate({right:"-210px"}, 700);
	}, 100);
}