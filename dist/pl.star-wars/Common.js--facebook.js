//Made by Ofkorse
$("body").append('&lt;div id="fb-root"&gt;&lt;/div&gt;&lt;script&gt;(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));&lt;/script&gt;');
$(document).ready(function(){
	$("&lt;div id='FacebookWnd'&gt;&lt;/div&gt;").css({
		background:'url(https://images.wikia.nocookie.net/gwiezdnewojnyjedi/pl/images/a/a2/Facebook3.png)',
		width:350,
		height:401,
		position:'fixed',
		top:150,
		right:-320,
		zIndex:300}).appendTo("body");
	//Zawartość
	$('&lt;div class="fb-like-box" data-href="http://www.facebook.com/pages/JediWiki/488179387900252" data-width="253" data-height="361" data-show-faces="false" data-stream="true" colorscheme="light" data-header="false"&gt;&lt;/div&gt;').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
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
		if (FACEBOOK_HOVER) $("#FacebookWnd").animate({right:"-40px"}, 700);
		else $("#FacebookWnd").animate({right:"-320px"}, 700);
	}, 100);
}