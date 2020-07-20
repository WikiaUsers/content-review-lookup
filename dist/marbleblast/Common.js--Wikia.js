/* Any JavaScript here will be loaded for all users on every page load. */
 function mainPageRenameNamespaceTab() {
     try {
         var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
         if ( Node.textContent ) {      // Per DOM Level 3
             Node.textContent = 'Main Page';
         } else if ( Node.innerText ) { // IE doesn't handle .textContent
             Node.innerText = 'Main Page';
         } else {                       // Fallback
             Node.replaceChild( Node.firstChild, document.createTextNode( 'Main Page' ) ); 
         }
     } catch(e) {
         // bailing out!
     }
 }

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
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

/* New Buttons */

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/70/Button_disambig.png",
		"speedTip": "Click for disambiguation pages",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "disambig"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Click to strike out text",
		"tagOpen": "<strike>",
		"tagClose": "</strike>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png",
		"speedTip": "Makes text higher (be wary; it makes it small)",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://community.wikia.com/wiki/File:Button_sub_letter.png",
		"speedTip": "Makes text lower (be wary; it makes it small)",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": "Insert text here"

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Makes text lower (be wary; it makes it small)",
		"tagOpen": "#REDIRECT:[[",
		"tagClose": "]]",
		"sampleText": "Insert text here"
	};


/* Display title */
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');

/* Replace with username */
$(document).ready(function () {if (wgUserName) {$(".insertusername").html(wgUserName)} });

/* Manual of Style link */
$("ul.tools li:first-child").after('<li><a style="color:white" href="/wiki/Project:Standards">Please view the Rules before editing</a></li>');

/* Clock */
var refreshDate;function addDate(){var a=((new Date()).toUTCString()).replace("GMT","(UTC)");$("#showdate").empty().append('<span style="font-weight: bold; text-transform: none;"><a style="color:white;" title="Purge the server cache and update the contents of this page." href="'+wgArticlePath.replace("$1",wgPageName.replace(/ /g,"_"))+'?action=purge">'+a.substring(5)+"</a></span>");window.clearTimeout(refreshDate);refreshDate=window.setTimeout(addDate,1000)}$(document).ready(function(){if(skin=="oasis"){$('<li id="displayTimer"><span id="showdate"></span></li>').appendTo("#GlobalNavigation")}else{$("#p-personal ul").prepend('<li><span id="showdate"></span></li>')}addDate();refreshDate=window.setTimeout(addDate,1000);$("#displayTimer").css({"font-size":"12px"})});

/* AJAX */
ajaxPages=["Special:RecentChanges","Special:WikiActivity","Special:NewPages"];var indicator="https://images.wikia.nocookie.net/legolegendsofchimaonline/images/6/65/Interface_Ajax-indicator.gif";if(!window.ajaxPages){ajaxPages=new Array("Special:NewPages")}if(!window.ajaxCallAgain){ajaxCallAgain=[]}var ajaxTimer;var ajaxRefresh=0;var refreshText="AJAX";if(typeof AjaxRCRefreshText=="string"){refreshText=AjaxRCRefreshText}var refreshHover="Enable auto-refreshing page loads";if(typeof AjaxRCRefreshHoverText=="string"){refreshHover=AjaxRCRefreshHoverText}var doRefresh=true;function setCookie(b,c,a){var d=new Date();d.setDate(d.getDate()+a);document.cookie=b+"="+escape(c)+((a==null)?"":";expires="+d.toGMTString())}function getCookie(a){if(document.cookie.length>0){c_start=document.cookie.indexOf(a+"=");if(c_start!=-1){c_start=c_start+a.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length}return unescape(document.cookie.substring(c_start,c_end))}}return""}function preloadAJAXRL(){ajaxRLCookie=(getCookie("ajaxload-"+wgPageName)=="on")?true:false;appTo=($("#WikiaPageHeader").length)?$("#WikiaPageHeader"):$(".firstHeading");appTo.append('&nbsp;<span style="font-size: xx-small; line-height: 100%;" id="ajaxRefresh"><span style="border-bottom: 1px dotted; cursor: help;" id="ajaxToggleText" title="'+refreshHover+'">'+refreshText+':</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="'+indicator+'" style="vertical-align: baseline; margin-top: 5px;" border="0" alt="Refreshing page" /></span></span>');$("#ajaxLoadProgress").ajaxSend(function(b,c,a){if(location.href==a.url){$(this).show()}}).ajaxComplete(function(b,c,a){if(location.href==a.url){$(this).hide();for(i in ajaxCallAgain){ajaxCallAgain[i]()}}});$("#ajaxToggle").click(toggleAjaxReload);$("#ajaxToggle").attr("checked",ajaxRLCookie);if(getCookie("ajaxload-"+wgPageName)=="on"){loadPageData()}}function toggleAjaxReload(){if($("#ajaxToggle").attr("checked")=="checked"){setCookie("ajaxload-"+wgPageName,"on",30);doRefresh=true;loadPageData()}else{setCookie("ajaxload-"+wgPageName,"off",30);doRefresh=false;clearTimeout(ajaxTimer)}}function loadPageData(){var a=($("#WikiaArticle").length)?"#WikiaArticle":"#bodyContent";$(a).load(location.href+" "+a+" > *",function(b){if(doRefresh){ajaxTimer=setTimeout("loadPageData();",ajaxRefresh)}})}$(function(){for(x in ajaxPages){if(wgPageName==ajaxPages[x]&&$("#ajaxToggle").length==0){preloadAJAXRL()}}});