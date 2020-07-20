/*
This scripts warns you when a page in one of the categories you are watching is edited.
If one page is in 2 or more of your watched categories, the script will report the page in the category that is listed last. For example:
  var cg = ["Speedy move candidates","Speedy deletion candidates"];  will make "Speedy deletion candidates" show by default if both are empty.

It shows the person who edited what page, and hovering over gives the summary used.
To install this, put the following on your personal js file:
 
var cg = ['category 1', 'category 2'];
importScript('User:Joeytje50/categories.js');

Examples of the script:
Wikia skin:
http://i.imgur.com/BI3Lc.png
Monobook:
http://i.imgur.com/qgc0O.png

If the script breaks at any time, feel free to leave me a message on my talk page.
*/
var cg;
var wiki = wiki?wiki:wgServer;
if (typeof cgwatch1 != 'undefined' && typeof cg != 'object') cg = [cgwatch1];
var refresh = refresh?refresh:30000;
var isChat = wgCanonicalSpecialPageName=="Chat" && skin=="oasis"?true:false;
var ts = '', ttl = '';
for (i=0;cg[i];i++) {
	var cgamount = i+1
	if (i>0) {
		ts += ','
		ttl += ','
	}
}
ts = ts.split(',');
ttl = ttl.split(',');

function callCGAPI(cat, i) {
if (cg[i]) {
	$.ajax({
		url: wiki + '/api.php',
		data:{
			'action':'query',
			'list':'categorymembers',
			'cmtitle':'Category:'+cat,
			'cmprop':'ids|title|timestamp',
			'cmlimit':'1',
			'smsort':'timestamp',
			'cmdir':'desc',
			'format':'json'
		},
		success: function(response) {
 			ts[i] = response.query.categorymembers[0].timestamp;
			ttl[i] = response.query.categorymembers[0].title;
			var n = 0;
			for (i=0;cg[i];i++) {
				var n = n+(cg[i]?1:0);
			}
			if (n==cgamount) finished()
		}
	});
}
}

function finished() {
	var n = 0;
	for (i=0;ts[i];i++) {
		if (ts[i].localeCompare(ts[n])>=0) {
			n = i;
		}
	}
	$('#CategoryNotify>span').html('Latest edit to <a style="text-decoration:underline;position:relative;z-index:10;" href="'+wiki+'/wiki/Category:' + cg[n] + '"'+(isChat?' target="_blank"':'')+'>' + cg[n] + '</a> was to <a style="text-decoration:underline;position:relative;z-index:10;" href="'+wiki+'/wiki/' + ttl[n] + '"'+(isChat?' target="_blank"':'')+'>' + ttl[n]+ '</a>');
}

function callAllAPIs() {
	for (i=0;cg[i];i++) {
		callCGAPI(cg[i], i);
	}
}

$(document).ready(function(){
if (isChat) {
	$('#ChatHeader h1.public.wordmark').prepend('<div id="CategoryNotify" style="color:#3A3A3A;font-size:13px;height:13px;line-height:15px;float:right;clear:right;margin:1px 5px 6px 0;"><span></span></div>');
	$('.chattopic').css('left','250px')
	$('.chattopic').css('text-align','left')
} else if (skin == "oasis") {
	$('head').append('<style type="text/css">#GlobalNavigation {display:none !important;} .WikiaLogo+li+li {padding:0 5px;} #CategoryNotify a {color:#FFF !important;}</style>');
	$('#WikiaHeader nav ul').append('<li id="CategoryNotify" style="border-left:none;font-size:15px;"><span></span></li>');
} else if (skin == "monobook") {
	$('#p-cactions .pBody').append('<div id="CategoryNotify" style="color:#4682B4;float:right;margin-right:5px;position:relative;bottom:14px;"><span></span></div>');
}
callAllAPIs();
})
 
setInterval('callAllAPIs()', refresh)