/* Any JavaScript here will be loaded for all users on every page load. */

/*<pre><nowiki>*/

//collapsible tables
importScriptPage('ShowHide2/code.js', 'dev');

//new collapsible NavFrames -- Modified from Wikipedia
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
var DivHideTxt = '[hide]';
var DivShowTxt = '[show]';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleDiv(indexNavigationBar){
    var NavToggle = document.getElementById("DivToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("DivFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == DivHideTxt) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'DivContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = DivShowTxt;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == DivShowTxt) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'DivContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = DivHideTxt;
    }
}
 
// adds show/hide-button to navigation bars
function createDivToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "DivFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'DivToggle';
            NavToggle.setAttribute('id', 'DivToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleDiv(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
 
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'DivContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
 
 
            var NavToggleText = document.createTextNode(isCollapsed ? DivShowTxt : DivHideTxt);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "DivHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'DivFrame' + indexNavigationBar);
        }
    }
}
 
$( createDivToggleButton );
//End new collapsible NameFrames


function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}

/* </pre> */

/*<pre>*/

/**
 * Easy Copy Input
 * Author: Dantman
 */

function initCPinput() {
	$('span.cpinput').each(function() {
		$('<input class=cpinput title="right-click and choose Copy" readonly="readonly" />' )
			.val($(this).html())
			.click(cpInputOnClick).focus(cpInputOnFocus).blur(cpInputOnBlur)
			.insertBefore(this);
		$(this).remove();
	});
}
addOnloadHook(initCPinput);

function cpInputOnClick() {
	this.focus();
}
function cpInputOnFocus() {
	this.select();
	this.style.backgroundColor = '#0000FF';
}
function cpInputOnBlur() {
	this.style.backgroundColor = '#FFFFFF';
}

// </nowiki></pre>

if (mwCustomEditButtons) {

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/70/Button_disambig.png?1",
     "speedTip": "mark as disambiguation page",
     "tagOpen": "\{\{disambig\}\}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
}

/*Disable the unused and non-standard layout dialogue*/
WikiaEnableNewCreatepage = false;