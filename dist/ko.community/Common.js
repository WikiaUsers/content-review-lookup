/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/* 
 
Tools: [http://www.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js reload cache]
 
<pre><nowiki> */
 
if(skin != 'oasis') {
importScriptPage('MediaWiki:ShowHide2.js‎', 'community');
}
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110 ||wgNamespaceNumber === 114 ) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById('old-forum-warning') ) {
		return;
	}
 
if(skin == 'oasis') {
  $('#WikiaPageHeader .wikia-menu-button > a').html('보존된 문서').removeAttr('href');
  return;
 }
	if( !document.getElementById('ca-edit') ) {
		return;
	}
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = '보존된 문서';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}
 
//idea & coding: Marooned 2010-04-01
$(function(){
	if (wgPageName != 'User_blog:Sarah_Manley/Are_People_Really_Insane_Lately') return;
	var chicken = $('<img/>').attr('src', 'http://img19.yfrog.com/img19/6621/chickeng.gif').css({'position':'absolute', 'z-index':1000}).appendTo(document.body);
	var width = $.getViewportWidth();
	var offsetH = offsetV = 0;
	var animate = function() {
		offsetH+=5;
		offsetV+=2;
		chicken.css({'top':offsetV + 10 + 'px', 'left':width - offsetH + 'px'});
		if (width - offsetH < -88) {
			clearInterval(intervalId);
			chicken.remove();
			$('body').css('overflow-x', '');
		}
	};
	var intervalId = setInterval(animate, 50);
	$('body').css('overflow-x', 'hidden');
	chicken.show();
});
 
/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/
 
$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .article-comments-li:first .permalink').attr('href');
var then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
month--;
var month= monthnames[month];
var day = then.match(/\d{2}$/);
var then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
var old = Math.floor(old/(1000*60*60*24));
if (old > 30) {
$('#article-comm').attr('disabled','disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});


//twitter code
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$(document).ready(function() {
	setTimeout(function() {
		if ($('#WikiaRail section').length > 0) {
			$('#WikiaRail section.module:last').after('<section style="padding: 5px 10px; margin-bottom: 10px; border:1px solid #CCC;" class="module" id="twittermodule"><a class="twitter-timeline"  href="https://twitter.com/wikia_ko" data-chrome="transparent" data-widget-id="596242039697608704"  data-theme="light"  data-dnt="true  width="300"  height="250">@wikia_ko</a></section>');
		}
	}, 1000);
	setTimeout(function() {
		twttr.widgets.load();
	}, 2000);
});


 
//</nowiki></pre> <!-- last line -->