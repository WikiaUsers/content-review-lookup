/* Biblioteka Ossus */
var newElement = [
 '<section class="module">',
 '   <h1>Translation request</h1>',
 '   <p>I encourage all users who would like to make translations in their <a href="https:dev.wikia.com/wiki/Languages">languages</a> for scripts used across Fandom to visit <a href="https://dev.wikia.com/wiki/Category:Translated_scripts">this page</a> to find your language category.</p>',
 '   <div style="margin-top: -16px; padding: 0; width: 100%; background-color: transparent;">',
 '      <table style="text-align: center; margin: 0px auto; padding: 2px; font-size: 120%; background-color: rgba(250,250,250,.2);">',
 '         <tr style="line-height: 15px; text-align: center;">',
 '            <td>',
 '         <br clear="all"/>',
 '               <a style="float: left; margin-right: 20px;" href="http://www.ossus.pl" class="wikia-button">Biblioteka Ossus</a>',
 '            </td>',
 '         </tr>',
 '      </table>',
 '   </div>',
 '</section>'
 ].join('');
 
$('#WikiaRail').append(newElement);

// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
function showEnTitle()
{
  //check if the link exists
  var enTitleDiv = document.getElementById('enTitle');    
  if(enTitleDiv == null || enTitleDiv == undefined)
    return;
 
  //don't add it on the home page
  var isHomePage = document.getElementsByClassName('mainpage');
  if(isHomePage.length > 0)
    return;
 
  //check if the header exists
  var header = document.getElementById('WikiaPageHeader');  
  if(header == null || header == undefined)
    return;
 
  //clone the node and add it at the end of the header
  var cloneNode = enTitleDiv.cloneNode(true);
  header.appendChild(cloneNode);
  cloneNode.style.display = "block";
}
 
// add the original english title as a subtitle.
  showEnTitle();

/* Facebook 
$("body").append('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/ko_KO/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>');
$(document).ready(function(){
	$("<div id='FacebookWnd'></div>").css({
		background:'url(https://images.wikia.nocookie.net/bleach/pl/images/5/55/Facebook.png)',
		width:242,
		height:401,
		position:'fixed',
		top:150,
		right:-210,
		zIndex:300}).appendTo("body");
	$('<div class="fb-like-box" data-href="https://www.facebook.com/kostarwarswikiacom" data-width="185" data-height="361" data-show-faces="true" data-stream="false" data-header="false"></div>').css({marginTop:"10px", marginLeft:"47px"}).appendTo("#FacebookWnd");
	$("#FacebookWnd").click(function(){
		toggleFacebookWnd();
	});
});
 
function toggleFacebookWnd() {
	if (parseInt($("#FacebookWnd").css("right"))!==0) $("#FacebookWnd").animate({right:"0px"}, 700);
	else $("#FacebookWnd").animate({right:"-210px"}, 700);
} */