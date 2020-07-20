// INACTIVE USER
InactiveUsers = { text: 'неактивний' }; 
importScriptPage('InactiveUsers/code.js', 'dev');

// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
$(function() {
    if($('#enTitle').length > 0 && !mw.config.get('wgIsMainPage')) {
        $('#enTitle').clone().prepend('(' + mw.html.element('a', { href: 'https://uk.wikipedia.org/wiki/Англійська_мова'}, 'англ.') + '&nbsp;«').append('»)').prependTo('#mw-content-text').css('display', 'block');
    }
});

/* Canonicity */
$('#PageHeader').append($('.eraicons').first());


/* Facebook */
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/uk_UA/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	$('<div class="fb-like-box" data-href="https://www.facebook.com/zorepedia" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});
 
function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
}