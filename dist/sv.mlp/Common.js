// ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var autoCollapse = 2;
var collapseCaption = "dölj";
var expandCaption = "visa";
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
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
     if (NavToggle.firstChild.data.substring(0,NavigationBarHide.length) == NavigationBarHide) {
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
     NavToggle.firstChild.data = NavigationBarShow + ' ' + NavToggle.firstChild.data.substring(NavigationBarHide.length);
 
     // if hidden now
     } else if (NavToggle.firstChild.data.substring(0,NavigationBarShow.length) == NavigationBarShow) {
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
     NavToggle.firstChild.data = NavigationBarHide + ' ' +NavToggle.firstChild.data.substring(NavigationBarShow.length);
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
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
             for(var j=0;j < NavFrame.childNodes.length;j++) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
               // This is a hack particular to help.wikia for having the title clickable, meh
               if (hasClass(NavFrame.childNodes[j], "NavHeadToggle")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggleTitle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide + ' ' + NavFrame.childNodes[j].firstChild.nodeValue);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
                 NavFrame.childNodes[j].firstChild.nodeValue='';
               }
 
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(var i=1;i<=indexNavigationBar;i++) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars (experimental)
// ============================================================
// ============================================================


// *********
// IRC LOGIN
// *********

$(function() {
    if ($('#IRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=reddit-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});



// *********
// CVNIRC LOGIN
// *********

$(function() {
    if ($('#CVNIRClogin').length) {
        if (typeof wgUserName == 'undefined') {
            var nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            var nick = wgUserName.replace(/ /g, "_");
        }
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});

// ****************
// Duplicate images
// ****************
if (wgPageName == "My_Little_Pony_Friendship_is_Magic_Wiki:Duplicate_images"){
  importScriptPage('DupImageList/code.js', 'dev'); //please for the love of Celestia someone fix this darn thing (see talk page)
}

// ***************
// Chat appearance
// ***************
 
// Change chat description
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}

//**********************************
// Support for [[Template:USERNAME]]
//**********************************

$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});

// *** Custom user rights icons on userpages ***
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User_talk" || wgPageName.indexOf("Special:Contributions") != -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
}

// Auto-insert link from anchor on [[Help:Red links]]
// Please report anything that still doesn't work right, it may need more exceptions
$(document).ready(function(){
 var redlink = window.location.hash;
 if (wgPageName == 'Help:Red_links' && redlink != '') {
  redlink = redlink.slice(1);
  if (redlink.charAt(0) === ':') { redlink = redlink.substring(1); }
  if (redlink.substr(0, 5) !== 'File:') {
    redlink = redlink.replace(/\./g, '%');
  } else {
    var head = redlink.substring(0, redlink.lastIndexOf('.'));
    var tail = redlink.substring(redlink.lastIndexOf('.'));
    redlink = head.replace(/\./g, '%') + tail;
  }
  $("#insertredlink a").attr("href", "/wiki/" + decodeURIComponent(redlink) + "?action=history");
  $("#insertredlink a").css("font-weight", "bold");
 }
});

// Automatically uncheck "Leave a redirect behind" on files
if (wgPageName.indexOf("Special:MovePage/File:") != -1) {
 $('input#wpLeaveRedirect').removeAttr('checked');
}

// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
$(document).ready(function(){
  if ($(".toc-multicol #toc").size() != 0) {
    $(function(){
		var x, tdToAppend, listToAppend, showtext = 'show', hidetext = 'hide';
		$("#toc").css("width","100%");
		$("#toc ul").html("<table><tr><td>" + $("#toc ul").html() + "</td></tr></table>");
		var liList = $("#toc ul li").toArray();

		$('table#toc ul').remove();
		if (liList.length % 3 == 0) {
			x = 0;
		}else{
			x = 3 - (liList.length % 3);
		}
		var perCol = (liList.length + x) / 3;

		for (var colNum=0; colNum < 3; colNum++){
			listToAppend = "";
			for (var i=0+(colNum*perCol); i<(perCol*(colNum+1)); i++){
				if (typeof(liList[i]) == "undefined"){break;}
				tempElement = document.createElement("div");
				tempElement.appendChild(liList[i]);
				listToAppend += tempElement.innerHTML;
			}
			tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>'+listToAppend+'</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
		}

		$('#toc tbody').append('<tr>'+tdToAppend+'</tr>');
		$('#toc tbody tr:eq(0) td').attr("colspan", "3");
		var indentFactor = 10;
		$("head").append("<style>.toclevel-1{padding-left: "+(indentFactor*1)+"px !important}.toclevel-2{padding-left: "+(indentFactor*2)+"px !important}.toclevel-3{padding-left: "+(indentFactor*3)+"px !important}.toclevel-4{padding-left: "+(indentFactor*4)+"px !important}</style>");
		$("#togglelink").off("click").click(function(e){e.preventDefault(); $('#toc ul').slideToggle("fast");
			if ($(this).text() === showtext) { $(this).text(hidetext); } else { $(this).text(showtext); } });
		if (!$('#toc ul').is(':hidden') && $('#togglelink').text() === showtext) {
			$('#togglelink').text(hidetext);
		}
    });
  }
});


// Alert contributors that they are editing with their bot flag set
if (mediaWiki.config.get("wgAction") == "edit" && mediaWiki.config.get("wgUserGroups").indexOf("bot") != -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set.</div>')
}