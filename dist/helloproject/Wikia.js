/* http://community.wikia.com/wiki/Thread:570969#2
** Should disable breadcrumb links in what are considered subpages.
** By [[User:Bobogoobo]] */
$(function() {
    var $h2 = $('.WikiaPageHeader h2'), ismain = (mw.config.get('wgNamespaceNumber') === 0);
    if (ismain && $h2.children('a').length > 1) {
        $h2.html($h2[0].innerHTML.substring($h2[0].innerHTML.indexOf('|') + 1));
    } else if (ismain && $h2.text().indexOf('<') === 0) {
        $h2.remove();
    }
});

importArticles({
    type: "script",
    articles: [
        "u:ja.helloproject:MediaWiki:DisplayClockJST/code.js"  //Added 2016-04-22
    ]
});

//Spanish Facebook thing start
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.3";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//Spanish Facebook thing end

/* Ticker */
var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
	if (document.getElementById) {
		if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    		ticker = document.getElementById('ticker'); 
    		ticker.style.display = 'block';
    		tickerdiv = document.getElementById('tickerdiv');
    		tickertxt = document.getElementById('tickertxt').offsetWidth; 
    		tickerdiv.style.left = parseInt(ticker.style.width) + 4 + 'px';
    		lefttime=setInterval("newstickergo()",20);
		}
	}
}

$(function newstickergo() {
	tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-4 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 4 + "px" : parseInt(ticker.style.width) + 4 + "px";
});