/* Any JavaScript here will be loaded for all users on every page load. */


window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: {link:'Hello! Project Wiki:Administrators'},
                bureaucrat: {link:'Hello! Project Wiki:Administrators#Bureaucrats'}
        },
	oasisPlaceBefore: ''
};
//UserTagsJS.modules.metafilter = {
//	'autoconfirmed': ['autoconfirmed']]
//};
//UserTagsJS.modules.custom = {
//	'WonderBuono!': ['sysop', 'inactive'] // Not currently showing for her--I'm guessing it doesn't by default for bureaucrats, but they're not identical.
//};
//UserTagsJS.modules.prefLanguages = true;


    var Start = 0;
importArticles({
    type: "script",
    articles: [
           /* Added 2014-01-14 on request of Dark M clowN */
        "u:dev:BackToTopButton/code.js",
        "u:dev:ShowHide/code.js",
           /* 2014-01-14 end */
        "w:c:dev:UserTags/code.js",   //Added 2014-08-02 as part of UserTags
        "w:c:dev:ReferencePopups/code.js",  //Added 2014-08-06
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

function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-4 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 4 + "px" : parseInt(ticker.style.width) + 4 + "px";
} 
addOnloadHook(newsticker);
/* Ticker end*/