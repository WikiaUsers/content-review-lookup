#######
MULTI UPLOAD
#######
/* Multi Upload */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload.js',
    ]

<!--
#######
DUDAMOBILE MOBILE SITE APP
#######
/* DudaMobile Mobile Site App */
importArticles({
    type: 'script',
    articles: [
        'DM_redirect.js',
    ]
--/>

#######
BACK TO TOP BUTTON
#######
/* Back To Top Button */
/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;

#######
NEWS TICKER
#######
/* News Ticker */
var ticker;
var tickertxt;
var tickerdiv;

function newsticker(){
    if (document.getElementById){
    if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv')&&(document.getElementById('tickertxt'))){
     ticker = document.getElementById('ticker');
     ticker.style.display = 'block';
     tickerdiv = document.getElementById('tickerdiv');
     tickertxt = document.getElementById('tickertxt').offsetWidth;
     tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
     lefttime=setInterval("newstickergo()"),200);
    }
    }
}

function newstickergo(){
 tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt)) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
}
addOnloadHook(newsticker);