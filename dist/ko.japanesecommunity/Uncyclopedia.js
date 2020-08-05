/**
 * Some tips when editing this page...
 *
 ** Make sure that your code has been tested in the latest version of Firefox, Safari, AND Internet Explorer! (Nobody cares about older versions!)
 ** No compressed JS. Ever. Compressed JS is fucking annoying for cyborgs and sysops to edit or debug.
 ** Make sure that your code follows some coding conventions, preferrably MediaWiki's (see http://www.mediawiki.org/wiki/Manual:Coding_conventions)
 *
 * Your friendly neighborhood MediaWiki developer,
 * --Jack Phoenix, 26 July 2009
 * <jack@countervandalism.net>
 */ 
// Tools: [http://en.uncyclopedia.co/w/index.php?title=-&action=raw&smaxage=0&gen=js reload cache] 
// <pre><nowiki> 
  
  
/* Jack Phoenix told me to add this on my talkpage - DJ Mixerr */ 
window.wgMWSuggestTemplate = "http://en.uncyclopedia.co/w/api.php?action=opensearch\x26search={searchTerms}\x26namespace={namespaces}\x26suggest"; 
window.wgSearchNamespaces = [0]; 
  
/* Analytics - if you're going to fuck with this, TEST IT first */ 
var _gaq = _gaq || []; 
_gaq.push(['_setAccount', 'UA-23952241-1']); 
_gaq.push(['_trackPageview']); 
  
(function() { 
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; 
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 
 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); 
})(); 
  
/* Non-namespace logos */ 
//=================================================== 
// faux-namespace fixes 
// (including hack for browsers with NO CSS3 support [IE6, etc]) 
// - Bizzeebeever, 2011 (admins and sysop sif this breaks shit, you know who to ban) 
//=================================================== 
//add faux namespaces to {namespaces} as follows: 
// "namespaceName" : { tabText : "Tab text goes here", className : "Logo CSS class name" } 
//  //tabText: [optional] default is namespaceName 
//  //className [optional] will be given prefix "ns-". default is "ns-[namespaceName]" 
//make sure if you are adding more than one to use a comma after each line except the last. 
//<body> element for specified namespaces will be given the "ns-[className]" class. 
//create your new stylesheet selector + rule in MediaWiki:Common.css accordingly 
// i.e. "body.ns-why #p-logo > a { background-image:url( someimage.png ) };") 
  
YAHOO.util.Event.onContentReady( 'p-logo', function() { 
 var namespaces = { 
  $className : function( str ) { if ( str in this ) return " ns-" + ( this[ str ].className || str ).replace( /[\W]*/g, "" ).toLowerCase(); }, 
  $tabText : function ( str ) { if ( str in this ) return this[ str ].tabText || str }, 
//===add faux-namespaces below this line=== 
  "HowTo" : {}, 
  "Un-Bestiary" : { tabText : "Bestiary" }, 
  "UnBooks" : { tabText : "UnBook" }, 
  "Uncycloversity" : { tabText : "Resource" }, 
  "UnDebate" : { tabText : "Debate" }, 
  "Unquotable" : { tabText : "UnQuote" }, 
  "UnPoetia" : { tabText : "UnPoetia" }, 
  "UnReviews" : { tabText: "UnReview" }, 
  "UnScripts" : { tabText : "UnScript" }, 
  "Why?" : {} 
  } 
 var namespace = wgPageName.match( /^(Talk:)?[-\w\?]+/ )[ 0 ].replace( "Talk:", "" ); 
  //grab namespace, stripping off "Talk:" if this is a talk page 
 if ( !namespace ) return; 
  //if empty namespace, probably an error 
 if ( namespace in namespaces ) 
  //if a namespace hack is defined above... 
  { 
  try { 
   document.body.className += namespaces.$className( namespace ); 
    //apply custom style 
   document.getElementById( "ca-nstab-main" ).firstChild.innerHTML = namespaces.$tabText( namespace ); 
    //Change tab text 
   } 
  catch( e ) { return; } 
  } 
 } ) 
// end faux-namespace fixes 
  
/** Reskin parser ***********************************************************
 * Instructions:
 * 1) Add the page title and namespace exactly ("Name_space:Page_name") as new skin, use
 * UNDERSCORES *NOT* SPACES: ("Main_Page": "", should be first line). The next parameter
* is optionally an existing "MediaWiki:Skin/"-prefixed file (in which case you can skip
 * step 2).
 * 2) Create MediaWiki:Skin/Name_Space:Page_Name.css and place reskin CSS content there.
 */ 
reskin = { 
 'Main_Page': '', 
 'Main_Page_test': 'Fullscreen.css', 
 'UnNews:Main_Page': 'UnNewsNew.css', 
 'UnNews:Main_Page_Beta': 'UnNewsNew.css', 
 'AAAAAAAAA!': 'Aaaa.css', 
 'Bad_title': 'Nocategories.css', 
 'Broken_Redirect': 'Nocategories.css',',
 'Misleading': 'Nocategories.css',
 'Namespace:Main_Page': '',
 'Nihilism': '',
 'Socratic_method': 'Nocategories.css',
 'Slime_Cube': '',
 'Time_Cubicle': 'Slime Cube.css',
 'Upside_Down': '',
 'User:Algorithm': 'Nocategories.css',
 'User:Bradaphraser/SupperBowl': '',
 'User:Codeine/Em:': 'Em:.css',
 'User:Mhaille/UnTube': 'UnTube.css',
 'User:Mhaille/Rufus': 'Rufus.css',
 'User:Zombiebaron/wip/Deeply_Undercovered': 'Fullscreen.css',
 'User:Zombiebaron/Uncyclopedia_Reskin_Committee/Defacebook': 'Defacebook.css',
 'Vd:': '',
 'Visual_puns': 'Nocategories.css',
 'Wikipedia': '',
 'Yahoo!': 'Fullscreen.css'
 // Make sure all lines in this list except the last one have a comma after!
}
 
var skinName;
 
if( reskin[wgPageName] != undefined && wgIsArticle == true ) {
 skinName = ( reskin[wgPageName].length > 0 ) ? reskin[wgPageName] : wgPageName + '.css';
 document.write('<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=MediaWiki:Skin/' + skinName + '&action=raw&ctype=text/css"; /*]]>*/</style>');
}
 
/* drop-downs for cactions tabs and whatnot */
importScript('User:Lyrithya/dropdown.js');
 
function noLogo() {
 if( document.getElementById( 'nologo' ) ) {
  document.getElementById( 'p-logo' ).style.display = 'none';
 }
}
YAHOO.util.Event.onContentReady('p-logo', noLogo);
 
function validateImageURL(textval) {
 var urlregex = new RegExp(
  "^(http|https)\://(images[0-9]|images)\.wikia.([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*\.(gif|GIF|jpg|JPG|jpeg|JPEG|png|PNG)$");
 return ( urlregex.test(textval) & (textval.length < 200) );
}
 
function logotipo() {
 if( document.getElementById( 'logotipo' ) ) {
  if ( document.getElementById( 'logotipo' ).firstChild.src != null ) {
    var logoURL = document.getElementById( 'logotipo' ).firstChild.src;
   if ( validateImageURL( logoURL ) ) {
    document.getElementById( 'p-logo' ).innerHTML= '<a style="background-image: url(' + logoURL + ')" href="/wiki/Main_Page" title="대문"/>';
   }
  } else {
   if ( document.getElementById( 'logotipo' ).firstChild.firstChild.src != null) {
    logoURL = document.getElementById( 'logotipo' ).firstChild.firstChild.src;
    if ( validateImageURL( logoURL ) ) {
     document.getElementById( 'p-logo' ).innerHTML= '<a style="background-image: url(' + logoURL + ')" href="/wiki/Main_Page" title="대문"/>';
    }
   }
  }
 }
}
YAHOO.util.Event.onContentReady('p-logo', logotipo);
 
// - addOnloadHook only fires after all content on the page has loaded, including images. Which is not very useful if you're trying to hide an image.//   It's especially bad if there's a large image(s) in the article. This YUI function will fire it as soon as the logo div is loaded. Which is better. 
  
/** Dismiss notice remover
 * (only removes if you have made a custom sitenotice designed to use its own close button)
 */ 
function removeSitenoticeDismiss() { 
 snh = document.getElementById( 'siteNoticehide' ); 
 if( !snh ) { 
  return; 
 } 
 snh = snh.parentNode; 
 snh.href = 'javascript:dismissNotice();'; 
 noticetr = document.getElementById( 'mw-dismissable-notice' ); 
 if( !noticetr ) { 
  snh.parentNode.removeChild( snh ); 
  return; 
 }
noticetr = noticetr.firstChild.firstChild; 
 noticetr.removeChild( noticetr.lastChild ); 
} 
YAHOO.util.Event.onContentReady('siteNoticehide', removeSitenoticeDismiss); 
  
/** Username replace function ([[template:USERNAME]]) *******************************
 * Inserts user name into <span class="insertusername"></span>
 * Originally by [[wikia:User:Splarka|Splarka]]
 * New version by [[User:Spang|Spang]]
 */ 
function UserNameReplace() { 
 if( typeof( disableUsernameReplace ) != 'undefined' && disableUsernameReplace || wgUserName == null ) { 
  return; 
 } 
 var n = YAHOO.util.Dom.getElementsByClassName( 'insertusername', 'span', document.getElementById( 'bodyContent' ) ); 
 for ( var x in n ) { 
  n[x].innerHTML = wgUserName; 
 } 
} 
addOnloadHook( UserNameReplace ); 
  
/** Title rewrite ********************************************************
 * Rewrites the page's title, used by [[틀:제목]]
 * By [[User:Sikon|Sikon]]
 */ 
function rewriteTitle() { 
 if( typeof( SKIP_TITLE_REWRITE ) != 'undefined' && SKIP_TITLE_REWRITE ) { 
  return; 
 } 
  
 var titleDiv = document.getElementById( 'title-meta' ); 
  
 if( titleDiv == null || titleDiv == undefined ) { 
  return; 
 } 
  
 var cloneNode = titleDiv.cloneNode( true ); 
 var firstHeading = document.getElementById( 'firstHeading' ); 
 var node = firstHeading.childNodes[0]; 
  
 // new, then old! 
 firstHeading.replaceChild( cloneNode, node ); 
 cloneNode.style.display = 'inline'; 
 if ( titleDiv.childNodes[0].nodeValue.toLowerCase() == wgPageName.replace( /_/g, ' ' ).toLowerCase() ) { 
  document.title = titleDiv.childNodes[0].nodeValue; 
 } 
  
 var titleAlign = document.getElementById( 'title-align' ); 
 firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue; 
} 
  
// You can use addOnloadHook (MW native function, defined in wikibits.js) or 
// jQuery( document ).ready( rewriteTitle ); (jQuery implementation) if you're 
// copying this code over to another wiki 
YAHOO.util.Event.onDOMReady( rewriteTitle ); 
  
/** Dynamic navigation bars ************************************************
 * Allows navigations templates to expand and collapse their content to save space
 * Documentation on Wikipedia at [[wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]]
 */ 
  
// set up the words in your language 
var NavigationBarHide = '[숨기기]'; 
var NavigationBarShow = '[보이기]'; 
  
// set up max count of Navigation Bars on page, 
// if there are more, all will be hidden 
// NavigationBarShowDefault = 0; // all bars will be hidden 
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden 
var NavigationBarShowDefault = 1; 
  
// shows and hides content and picture (if available) of navigation bars 
// Parameters: 
// indexNavigationBar: the index of navigation bar to be toggled 
function toggleNavigationBar( indexNavigationBar ) { 
 var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar ); 
 var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar ); 
  
 if( !NavFrame || !NavToggle ) { 
  return false; 
 } 
  
 // if shown now 
 if( NavToggle.firstChild.data == NavigationBarHide ) { 
  for ( 
    var NavChild = NavFrame.firstChild; 
    NavChild != null; 
    NavChild = NavChild.nextSibling 
   ) { 
   if( NavChild.className == 'NavPic' ) { 
    NavChild.style.display = 'none'; 
   } 
   if( NavChild.className == 'NavContent' ) { 
    NavChild.style.display = 'none'; 
   } 
  } 
  NavToggle.firstChild.data = NavigationBarShow; 
  
 // if hidden now 
 } else if( NavToggle.firstChild.data == NavigationBarShow ) { 
  for ( 
    var NavChild = NavFrame.firstChild; 
    NavChild != null; 
    NavChild = NavChild.nextSibling 
   ) { 
   if( NavChild.className == 'NavPic' ) { 
    NavChild.style.display = 'block'; 
   } 
   if( NavChild.className == 'NavContent' ) { 
    NavChild.style.display = 'block'; 
   } 
  } 
  NavToggle.firstChild.data = NavigationBarHide; 
 } 
} 
  
// adds show/hide-button to navigation bars 
function createNavigationBarToggleButton() { 
 var indexNavigationBar = 0; 
 // iterate over all < div >-elements 
 for( 
   var i = 0; 
   NavFrame = document.getElementsByTagName( 'div' )[i]; 
   i++ 
  ) { 
  // if found a navigation bar 
  if( NavFrame.className == 'NavFrame' ) { 
   indexNavigationBar++; 
   var NavToggle = document.createElement( 'a' ); 
   NavToggle.className = 'NavToggle'; 
   NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar ); 
   NavToggle.setAttribute( 'href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');' ); 
  
   var NavToggleText = document.createTextNode( NavigationBarHide ); 
   NavToggle.appendChild( NavToggleText ); 
   // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
   for( var j = 0; j < NavFrame.childNodes.length; j++ ) { 
    if( NavFrame.childNodes[j].className == 'NavHead' ) { 
     NavFrame.childNodes[j].appendChild( NavToggle ); 
    } 
   } 
   NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar ); 
  } 
 } 
 // if more Navigation Bars found than Default: hide all 
 if( NavigationBarShowDefault < indexNavigationBar ) { 
  for( var i = 1; i <= indexNavigationBar; i++ ) { 
   toggleNavigationBar( i ); 
  } 
 } 
  
} 
  
addOnloadHook( createNavigationBarToggleButton, false ); 
  
  
/** Another collapsible whatnits implementation - for the sidebar mostly, but can be used with whatever
    I'd write some documentation or something, but I can't be arsed. -Lyrithya
 
********************************************* star */ 
  
jQuery( document ).ready( function() { 
 $( '.collapsed > *' ).next().css( 'display', 'none' ); 
 $( '.expanded > *' ).click( function() { 
  $( this ).next().toggle(); 
  $( this ).parent().toggleClass( 'expanded' ); 
  $( this ).parent().toggleClass( 'collapsed' ); 
 }); 
 $( '.collapsed > *' ).click( function() { 
  $( this ).next().toggle(); 
  $( this ).parent().toggleClass( 'collapsed' ); 
  $( this ).parent().toggleClass( 'expanded' ); 
 }); 
}); 
  
/*
 * Trivial plugin for hiding the portals in the sidebar panel
 * Written by Silent Penguin
 */ 
(function( $ ){