/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
// 
 
  function liveClock() {
  	var link = wgServer + wgScriptPath + '/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge';
  	if (skin == 'monobook') {
  		$('#p-personal .pBody ul').append('<li id="utcdate"><a href="'+link+'"></a></li>');
  	} else if (skin == 'oasis') {
  		$('#WikiaPage #WikiHeader div.buttons').prepend('<div id="utcdate"><a href="'+link+'"></a></div>');
  	}
  	$('#utcdate').css({fontSize: 'larger', fontWeight: 'bolder', textTransform: 'none'});
 
  	showTime();        
  }
  addOnloadHook(liveClock);
 
  function showTime() {
  	var now = new Date();
  	var hh = now.getUTCHours();
  	var mm = now.getUTCMinutes();
  	var ss = now.getUTCSeconds();
  	var dd = now.getUTCDate();
  	var months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  	    month  = months[now.getUTCMonth()];
  	var year   = now.getUTCFullYear();
  	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss ) + ', ' + ( dd < 10 ? '0' + dd : dd ) + ' ' + month + ' ' + year + ' (UTC)';
  	$('#utcdate a').text(time);
 
  	window.setTimeout(showTime, 1000);
  }
 
  //
importScriptPage('ListAdmins/code.js', 'dev');
if ( document.getElementById('TitleItalic') ) {
$('.firstHeading').css('font-style','italic');
}
//************************************************
// Archive Old Blog Posts
//************************************************
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t bump this blog!"
};