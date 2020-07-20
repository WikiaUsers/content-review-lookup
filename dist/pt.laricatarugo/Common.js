var viewMode = getCookie("view-mode");
if(viewMode == "desktop"){
    viewport.setAttribute('content', 'width=1024');
}else if (viewMode == "mobile"){
    viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no');
}




/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/thefakegees/images/0/0d/Button_Weegee.png",
		"speedTip": "Weegify!",
		"tagOpen": "<fool> ",
		"tagClose": " </fool>",
		"sampleText": "Weegee Text"
	};
// <source lang="JavaScript">
 
// Adapted by Rappy 4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 
    // BUREAUCRAT
  rights["Tarugos"]			= ["AJUDANTE DA WIKI"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>


 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});
 
// createElement is taken from Chinese Wikipedia
// List of authors can be found at http://zh.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
function createElement(tag,children,props){
	var element = document.createElement(tag);
	if(!(children instanceof Array)){children=[children];}
	for(var i=0;i<children.length;i++){
		var child=children[i];
		if(typeof child=='string'){child=document.createTextNode(child);}
		if(child){element.appendChild(child);}
	}
	if(typeof props=='object'){
		for(var k in props){
			switch(k){
			case 'styles':
				var styles=props.styles;
				for(var s in styles){element.style[s]=styles[s];}
				break;
			case 'events':
				var events=props.events;
				for(var e in events){ addHandler(element,e,events[e]); }
				break;
			case 'class':
				element.className=props[k];break;
			default:
				element.setAttribute(k,props[k]);
			}
		}
	}
	return element;
}
 
 
 
var STRINGTAGTEXT; // yeah, this is a global variable.  Bite me.
 
function createStringTags(){
    var stringTags
    try{  // Some of the newer browsers support getElementsByClassName natively
        stringTags= document.getElementsByClassName('stringTags'); // find all tab definitions in the article
    } catch (el) { // and some don't
        return 0;
    }
    if (stringTags.length == 0) return 0;
 
    STRINGTAGTEXT = new Array(stringTags.length);
    for (var i=0; i < stringTags.length; i++){
        var curTag = stringTags[i];
        if (curTag.textContent) {
            STRINGTAGTEXT[i] = curTag.textContent;
        } else {
            STRINGTAGTEXT[i] = curTag.innerText;
        }
        newLink = createElement('A', 
                                curTag.title,
                                {'href':'javascript:insertStringTags(' + i + ');'}
                               );
        while (curTag.childNodes[0]) {
            curTag.removeChild(curTag.childNodes[0]);
        }
        curTag.appendChild(newLink);
    }
}
 
addOnloadHook(createStringTags);
 
function insertStringTags(idx){
    insertTags(STRINGTAGTEXT[idx], '', '');
}
 
 
 
FixExternalLinks = function() {
var blip_elements = getElementsByClassName(document.getElementById('bodyContent'),'a','external');
 for(var i = 0; i < blip_elements.length; i++){
 blip_elements[i].target = '_blank';
 }
}
 
jQuery(document).ready(FixExternalLinks);
 
 
/*
////////////////////////////////////////////////////////
// Facebook box on every page
////////////////////////////////////////////////////////
*/
 
$('#WikiaRail section.module:last').after('<section class="module" id="facebookmodule"><h1>Facebook</h1><iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=113171325391031&amp;connections=10" align="top" frameborder="0" width="270" height="250" scrolling="no" /></section>');
 
/*
////////////////////////////////////////////////////////
// END Facebook box on every page
////////////////////////////////////////////////////////
*/