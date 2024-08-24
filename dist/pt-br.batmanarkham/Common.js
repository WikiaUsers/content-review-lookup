/* Códigos JavaScript colocados aqui serão carregados por todos aqueles que acessarem alguma página desta wiki */
//// Créditos a Arkham City Wiki ////
// ============================================================
// Barras de Navegação Dinâmicas (experimantal)
// Este script é da Wikipedia. Para créditos ao autor(es), veja http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Teste se um elemento tem uma certa classe **************************************
 *
 * Descrição: Usa expressões regulares e cache para melhor performance.
 * Criadores: Usuário:Mike Dillon, Usuário:R. Koot, Usuário:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

 /** Tabelas *********************************************************
  *
  *  Descrição: Deixa as tabelas fechadas, mostrando apenas o cabeçalho. Veja
  *               [[Wikipedia:NavFrame]].
  *  Criadores: [[Usuário:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );

 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
  
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
  
  
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
  
     if (!NavFrame || !NavToggle) {
         return false;
     }
  
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
  
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
  
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
  
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
             
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
   
  } 
  addOnloadHook( createNavigationBarToggleButton );

// Code courtesy of pcj of WoWWiki.
// This is a modified version of the WoWWiki site version, in that it is designed for global.js use.

// Code adds a checkbox at the top of the Special:RecentChanges list, next to the header.
// Ticking it sets a cookie (should be individual to wikis) and starts updating the RC list.
// This occurs silently every 60 seconds without a full page reload occuring.

function setCookie(c_name,value,expiredays) {
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=")
if (c_start!=-1) { 
c_start=c_start + c_name.length+1 
c_end=document.cookie.indexOf(";",c_start)
if (c_end==-1) c_end=document.cookie.length
return unescape(document.cookie.substring(c_start,c_end))
} 
}
return ""
}

function getXmlHttpRequestObject() {
if (window.XMLHttpRequest) {
return new XMLHttpRequest(); //Não Internet Explorer
} else if(window.ActiveXObject) {
return new ActiveXObject("Microsoft.XMLHTTP"); //Internet Explorer
} else {
//fail silently
}
}
getRCDataRO = getXmlHttpRequestObject();
var cr = new RegExp("\r", "gm");
var lf = new RegExp("\n", "gm");
var endText = new RegExp('</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "mi");
var rcTimer;
var rcRefresh = 60000;
function preloadAJAXRC() {
s = 0;
ajaxRCCookie = getCookie("ajaxRC")=="on" ? true:false;
document.getElementsByTagName("h1")[s].innerHTML += '&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Enable auto-refreshing recent changes">AJAX:</span><input type="checkbox" id="ajaxRCtoggle" onClick="toggleRC();">';
document.getElementById("ajaxRCtoggle").checked = ajaxRCCookie;
if (getCookie("ajaxRC")=="on") loadRCData();
}

function toggleRC() {
if (document.getElementById("ajaxRCtoggle").checked == true) {
setCookie("ajaxRC", "on", 30);
loadRCData();
} else {
setCookie("ajaxRC", "off", 30);
clearTimeout(rcTimer);
}
}

function loadRCData() {
if (getRCDataRO.readyState == 4 || getRCDataRO.readyState == 0) {
if (location.href.indexOf("/wiki/")) {
rcURL = "http://" + location.hostname + "/wiki/Special:RecentChanges" + location.search;
} else {
rcURL = "http://" + location.hostname + "/Special:RecentChanges" + location.search;
}
getRCDataRO.open("GET", rcURL, true);
getRCDataRO.onreadystatechange = parseRCdata;
getRCDataRO.send(null);
}
}

function parseRCdata() {
if (getRCDataRO.readyState == 4) {
textFilter = new RegExp('<div id="bodyContent">.*?</div>[\t\s]*?<!-- end content -->[\t\s]*?<div class="visualClear">', "i");
rawRCdata = getRCDataRO.responseText.replace(cr, "").replace(lf, "");
filteredRCdata = textFilter.exec(rawRCdata);
updatedText = filteredRCdata[0].replace('<div id="bodyContent">', "").replace(endText, "");
document.getElementById("bodyContent").innerHTML = updatedText;
rcTimer = setTimeout("loadRCData();", rcRefresh);
}
}

if (wgPageName == "Special:RecentChanges") addOnloadHook(preloadAJAXRC);

// Créditos a Transformers Wiki http://transformers.wikia.com/ para esta função 
if ( skin == 'monobook' ) {
function loadsearchstuff() {
  // "If you're reading this, I'm sorry. Messy code lies ahead."

  if (document.implementation && document.implementation.createDocument)
       xmlDoc=document.implementation.createDocument("","",null);
  else 
       xmlDoc=new ActiveXObject("Microsoft.XMLDOM");

  xmlDoc.async=false;
  xmlDoc.load("/index.php?title=Template:Searchicons&action=raw");

  // Establishing the various fragments of the search box.
  var randindex = Math.floor(Math.random()*xmlDoc.getElementsByTagName("item").length);
  var searchicon = "<img src='" + xmlDoc.getElementsByTagName("url")[randindex].childNodes[0].nodeValue + "' style='margin-left: -15px; margin-top:-6px;' /></a>";
  var searchbox = document.getElementById('searchBody');

  // Throwing all the various fragments together.
  var searchfieldentry = document.getElementById('searchInput').value;
  searchbox.innerHTML = searchicon + searchbox.innerHTML;
  document.getElementById('searchInput').value = searchfieldentry;

  // Finally, removing the redundant "search" title at the top.
  searchbox.parentNode.removeChild(searchbox.parentNode.getElementsByTagName("h5")[0]);

  // Sets focus on the search bar ...
  // document.getElementById('searchInput').focus();
}

addOnloadHook(loadsearchstuff);
}

 /** Username replace function ([[template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originalmente por [[wikia:Usuário:Splarka|Splarka]]
  * Nova versão por [[Usuário:Spang|Spang]]
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);

/* Video Annotation */
$(function() {
   YouTubeRemote.init();
});
 
YouTubeRemote = {
   init: function() {
      //YouTube videos
      YouTubeRemote.videos = $("#WikiaArticle").find("embed[src*=youtube]");
 
      //Find remote controls
      $(".YouTubeRemote").click(function() {
         //Parameters
         var time = $(this).attr("title"); 
         //var video = $(this).attr("data-video");
 
         //Default variables
         seconds = 0;
         var videoIndex = 0;
 
         //Playlist handling
         var playlistArray = time.split("/");
         var playlist = parseInt(playlistArray[1]) + 1;
 
         //Time handling
         timeArray = time.split(":");
         var trimmed = timeArray[0].replace(/\/[0-9]+/,"");
 
         if (trimmed !== "") {
            timeArrayTrimmed = timeArray[1].replace(/\/[0-9]+/,"");
            timeArray[1] = timeArrayTrimmed;
            timeMultiplier = Array(3600,60,1);
            while(timeArray.length > 0) {
	       seconds += timeArray.pop() * timeMultiplier.pop();
            }
         }
         //Video identification
         if (video) {
            videoIndex = parseInt(video) - 1;
         }
 
         //Stop videos
         YouTubeRemote.pause();
 
         //Control video
         var video = YouTubeRemote.videos.get(videoIndex);
	 if (playlist) { 
	    video.playVideoAt(playlist);
         } 
         if (trimmed !== "") {
            setTimeout("YouTubeRemote.seekToDelay()",500);
         }
         video.playVideo();
      });
   },
   pause: function() {
      YouTubeRemote.videos.each(function() {
         $(this).get(0).pauseVideo();
      });
   },
   seekToDelay: function() {
      YouTubeRemote.videos.each(function() {
         $(this).get(0).seekTo(seconds);
      });
   }
};
/* End Video Annotation */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');

/* Fim da personalização */