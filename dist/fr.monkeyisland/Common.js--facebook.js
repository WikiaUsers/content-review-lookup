/* Le Javascript suivant n'est pas de moi, mais d'un wiki anglophone. */

//Made by Ofkorse
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/__cb20140421163234/monkeyisland/fr/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	//Zawartość
	$('<div class="fb-like-box" data-href="http://www.facebook.com/pages/Wiki-Monkey-Island/261644937304397" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
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