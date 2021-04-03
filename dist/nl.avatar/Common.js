/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/********************************************/
/* Icons  by: [[:en:User:The 888th Avatar]] */
/********************************************/
 
$(function() {
	if (skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.2em'});
	}
});

/****************/
/* DISPLAYTITLE */
/***************
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');
*/

/****************/
/*  Namespace   */
/****************/
$(function () {
   var newTitle = $("#title-meta").html();
   if (!newTitle) return;
   var edits = $("#user_masthead_since").text();
   $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
   $(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
  });

/************************/
/* Sneeuw - van central */
/* importScriptPage('MediaWiki:Snow.js'); */
/************************/

/****************/
/* Iets anders  */
/****************/
var DOCHEAD = document.getElementsByTagName('HEAD')[0];

function createElement(tag,children,props){
var element = document.createElement(tag);
if (!(children instanceof Array)) children=[children];
for(var i=0;i<children.length;i++){
var child=children[i];
if (typeof child=='string') child=document.createTextNode(child);
if (child) element.appendChild(child);
}
if (typeof props=='object') {
for(var k in props){
switch (k) {
case 'styles':
var styles=props.styles;
for (var s in styles) element.style[s]=styles[s];
break;
case 'events':
var events=props.events;
for (var e in events) addHandler(element,e,events[e]);
break;
case 'class':
element.className=props[k];
break;
default:
element.setAttribute(k,props[k]);
}
}
}
return element;
}

function getParamValue(paramName) {
var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
var h = document.location.href;
var m=cmdRe.exec(h);
if (m) {
try {
return decodeURIComponent(m[1]);
} catch (someError) {}
}
return null;
}

// &withJS= URL parameter
// Allow to try custom scripts on the MediaWiki namespace without
// editing [[Special:Mypage/myskin.js]]
// from Wikipedia

{
var extraJS = getParamValue("withJS");
if (extraJS)
if (extraJS.match("^MediaWiki:[^&<>=%]*\.js$"))
importScript(extraJS);
else
alert(extraJS + " javascript not allowed to be loaded.");
}

/***************************************
/* Vervangt {{USERNAME}} met de naam van de gebruiker die de pagina bezoekt.  
/***************************************
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}