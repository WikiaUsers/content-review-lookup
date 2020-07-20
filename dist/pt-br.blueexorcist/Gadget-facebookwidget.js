//Made by Ofkorse
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/aonoexorcist/pt-br/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	//Zawartość
	$('<div style='position:fixed;bottom:0;right:0;padding:0;z-index:9002'>
<fb:like-box href="https://www.facebook.com/aonoexorcistwiki" width="292" height="387" show_faces="true" colorscheme="dark" stream="true" show_border="true" header="false"></fb:like-box></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});

function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
}