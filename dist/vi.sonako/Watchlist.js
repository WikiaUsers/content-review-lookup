/*
This script warns you when a page on your watchlist is edited.
It shows the person who edited what page, and hovering over gives the summary used.
 
Examples of the script:
Wikia skin:
https://i.imgur.com/1T10p.png
Monobook:
https://i.imgur.com/qgc0O.png
*/
var cgscriptloc = cgscriptloc?cgscriptloc:"#WikiHeader div.buttons";
var excludeuser = excludeuser?excludeuser:"Wikia";
var refresh = refresh?refresh:30000;
var isChat = wgCanonicalSpecialPageName=="Chat" && skin=="oasis"?true:false;
 
function watchlistupdate() {
$.getJSON('https://sonako.fandom.com/api.php?action=query&list=watchlist&wllimit=1&wldir=older&format=json&wlexcludeuser=' + excludeuser + '&wlprop=ids|user|title|comment', function(wlid) {
	$('#WatchlistNotify').html('<a id="WLNotifyLink" href="/wiki/Special:Watchlist#id=' + wlid.query.watchlist[0].revid + '" title="“' + wlid.query.watchlist[0].comment + '”"'+(isChat?' target="new"':'')+'>' + wlid.query.watchlist[0].user + ' changed ' + wlid.query.watchlist[0].title + '</a> <sup><a href="/wiki/' + wlid.query.watchlist[0].title + '"'+(isChat?' target="new"':'')+'>[1]</a> <a href="/wiki/' + wlid.query.watchlist[0].title + '?diff=' + wlid.query.watchlist[0].revid + '"'+(isChat?' target="new"':'')+'>[2]</a></sup>')
});
}
 
$(document).ready(function(){
if (isChat) {
	$('#ChatHeader h1.public.wordmark').prepend('<div id="WatchlistNotify" style="font-size:13px;height:13px;line-height:15px;float:right;clear:right;margin:1px 5px 6px 0;"></div>');
	$('head').append('<style type="text/css">#WatchlistNotify a:hover {text-decoration:underline;} sup {vertical-align:super;font-size:smaller;}</style>');
} else if (skin == "oasis") {
	$(cgscriptloc).prepend('<div style="margin-top: -30px; margin-left: -10px; margin-bottom: 5px;"><div id="WatchlistNotify" onLoad="watchlistupdate()"></div></div>');
	$('head').prepend('<style type="text/css">a#WLNotifyLink:visited {color:#77F !important;}</style>');
} else if (skin == "monobook") {
	$('#p-personal .pBody ul:first-child').prepend('<li id="WatchlistNotify" style="text-transform:none;color:#FF8C00"></li>');
	$('head').append('<style type="text/css">#p-personal li a#WLNotifyLink {color:#F00 !important;} #p-personal li a#WLNotifyLink:visited {color:#77F !important;}</style>');
}
watchlistupdate()
})
 
setInterval('watchlistupdate()', refresh);