// 14:39, November 25, 2011 (UTC)
// <source lang="JavaScript">
// CODE WRITTEN BY USER:RAPPY_4187

/* Importy zewnętrzne */
importArticles({
    type: "script",
    articles: [
        'w©dev:Countdown/code.js',
        'w©pl.tes:MediaWiki:Change.js',
        'u:dev:Message/code.js',
        'u:dev:User Rights Reasons Dropdown/code.js',
        'u:dev:DiscordIntegrator/code.js',
        'u:dev:MediaWiki:DiscordChat.js'
    ]
});
 
$(function() {
  var rights = {};
    rights["Tar-Súrion"] = ["Administrator"],
    rights["Pio387"] = ["Biurokrata"],
    rights["Amarthann"] = ["Moderator treści"] ["Moderator dyskusji"],
    rights["Manwe-wódz Celadrimów"] = ["Moderator treści"] ["Moderator dyskusji"],
	rights["Bladorthin12"] = ["Moderator treści"] ["Moderator dyskusji"]

  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

// Udostępniane na tej Wiki na licencji CC-BY-NC-SA za zgodą autora
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	//Zawartość
	$('<div class="fb-like-box" data-href="https://www.facebook.com/wikia.lotr" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});
 
function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
}