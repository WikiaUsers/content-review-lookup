/*链接新窗口

function externalLinks()
{
if (!document.getElementsByTagName) return;
var anchors = document.getElementsByTagName("a");
for (var i=0; i<anchors.length; i++)
{
var anchor = anchors[i];
if(anchor.getAttribute("href"))
anchor.target = "_blank";
}
}

window.onload = externalLinks;*/

importArticles({
type: "script",
articles: [
  "MediaWiki:Common.js/UserGroupMessages.js",
  "MediaWiki:Wikia.js/copyright.js",
  'w:dev:ReferencePopups/code.js',
  "w:c:dev:BackToTopArrow/code.js"
]
});

/*
Replaces {{USERNAME}} with the name of the user browsing the page.
Requires copying Template:USERNAME.
*/
function substUsername() {
$('.insertusername').html(wgUserName);
}
function substUsernameTOC() {
var toc = document.getElementById('toc');
var userpage = document.getElementById('pt-userpage');

if( !userpage || !toc )
return;

var username = userpage.firstChild.firstChild.nodeValue;
var elements = getElementsByClass('toctext', toc, 'span');

for( var i = 0; i < elements.length; i++ )
elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}

addOnloadHook(substUsername);
addOnloadHook(substUsernameTOC);

/* 防君子不防小人 */

/*var sysop = contains(wgUserGroups,"sysop");




if(wgAction !="edit" && !sysop){




document.oncontextmenu=new Function("event.returnValue=false;");//屏蔽右键




document.onselectstart=new Function("event.returnValue=false;");//屏蔽鼠标拖动




var divs = document.getElementsByTagName("div")




for(var i=0;i<divs.length;i++){




divs[i].setAttribute('unselectable','on');




}




}else{




var css = document.createElement("style");




css.type = "text/css";




css.innerHTML = "body.mediawiki { -moz-user-select: text !important;}";




document.getElementsByTagName("head")[0].appendChild(css);




}













function contains(a, obj) {




if (a == null){




 return false;




}




var i = a.length;




while (i--) {




 if (a[i] === obj) {




     return true;




 }




}




return false;




}




*/































/* Baidu */




var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");




document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F380f352265c672ca5580861f89c3d39e' type='text/javascript'%3E%3C/script%3E"));




/* end of baidu */













/*GOOGLE*/




var _gaq = _gaq || [];




_gaq.push(['_setAccount', 'UA-30332751-1']);




_gaq.push(['_trackPageview']);













(function() {




var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;




ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';




var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);




})();




/*end of Google*/













/* insert a meta. probably no effect, but let's try 




var meta;




if (document.createElement &&




(meta = document.createElement('meta'))) {













meta.name = "google-site-verification";




meta.content = "YD5jZsuk2Y1YEBSJOj-XkGdT7GYdUAIHPHZQB_M_ufI";













document.getElementsByTagName('head').item(0).appendChild(meta);




}*/






















/* open search result in new tab */




WikiaSearchApp.initSuggest = function () {




$.loadJQueryAutocomplete(function () {




  WikiaSearchApp.searchField.autocomplete({




      serviceUrl: wgServer + wgScript + "?action=ajax&rs=getLinkSuggest&format=json",




      onSelect: function (a, b) {




          WikiaSearchApp.track("suggest");




          WikiaSearchApp.trackInternal("search_start_suggest", {




              sterm: encodeURIComponent(a.replace(/ /g, "_")),




              rver: 0




          });




          window.open(wgArticlePath.replace(/\$1/, encodeURIComponent(a.replace(/ /g, "_"))));




      },




      appendTo: "#WikiaSearch",




      deferRequestBy: 250,




      maxHeight: 1000,




      selectedClass: "selected",




      width: "270px",




      skipBadQueries: true




  })




})




};













var wgArticleId=mw.config.get('wgArticleId');




document.getElementById("bdlikebutton").setAttribute('data','{\'url\':\'http://zh.pathofexile.wikia.com/index.php?curid='+wgArticleId+'\',\'wbuid\':2628248563}');




document.getElementById("bdlike_shell").src="http://bdimg.share.baidu.com/static/js/like_shell.js?t=" + new Date().getHours();