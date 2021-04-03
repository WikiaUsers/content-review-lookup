/* Any JavaScript here will be loaded for all users on every page load. */

// Cookie set/get functions from W3C
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name+ "=" +escape(value) +
  ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
 
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) { 
      c_start = c_start + c_name.length + 1; 
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    } 
  }
  return "";
}
 
// hasClass()
 // Description: Uses regular expressions and caching for better performance.
 // Maintainers: w:User:Mike Dillon, w:User:R. Koot, w:User:SG
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
      return (reCache[className]
        ? reCache[className]
        : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 /*
==Dynamic Navigation==
 */
 // Makes some dynamic nav boxes auto-close. See [[user:Bawolff/onebox-select.js]] & [[Template:Dynamic navigation noncentered]]
 // *Tested in MSIE 6, Opera 9.01, and firefox (1.5.0.11 and 2.0.0.something(I think its a 2 at the end)
 // *Adapted from the dynamic nav box script which is from somewhere on wikipedia
 
 // set up the words in your language
 var NavigationBarHide = '[ - ]';
 var NavigationBarShow = '[ + ]';
 var ONCE_NavigationBarHide = '[ ↑ ]';
 var ONCE_NavigationBarShow = '[ ↓ ]';
 
 // set up max count of Navigation Bars on page, if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1;
 var ONCE_NavigationBarShowDefault = 1;
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function ONCE_toggleNavigationBar(ONCE_indexNavigationBar)
 {
   var ONCE_NavToggle = document.getElementById("NavToggleOnce" + ONCE_indexNavigationBar);
   var ONCE_NavFrame = document.getElementById("NavFrameOnce" + ONCE_indexNavigationBar);
 
   if (!ONCE_NavFrame || !ONCE_NavToggle) {
     return false;
   }
 
   // if shown now
   if (ONCE_NavToggle.firstChild.data == ONCE_NavigationBarHide) {
     for (var ONCE_NavChild = ONCE_NavFrame.firstChild; ONCE_NavChild != null; ONCE_NavChild = ONCE_NavChild.nextSibling) {
       if (hasClass(ONCE_NavChild, 'NavPic') || hasClass(ONCE_NavChild, 'NavContent')) {
         ONCE_NavChild.style.display = 'none';
       }
     }
     ONCE_NavToggle.firstChild.data = ONCE_NavigationBarShow;
 
   // if hidden now
   } else if (ONCE_NavToggle.firstChild.data == ONCE_NavigationBarShow) {
     //Start hiding all open boxes. things with f is loops to close everything
     for (f = 1; f < 50; f++)  { //prevent indef loop
       var ONCE_f_NavToggle = document.getElementById("NavToggleOnce" + f);
       var ONCE_f_NavFrame = document.getElementById("NavFrameOnce" + f);
 
       if (!ONCE_f_NavFrame || !ONCE_f_NavToggle) {
         break;
       }
       for (var ONCE_f_NavChild = ONCE_f_NavFrame.firstChild; ONCE_f_NavChild != null; ONCE_f_NavChild = ONCE_f_NavChild.nextSibling) {
         if (hasClass(ONCE_f_NavChild, 'NavPic') || hasClass(ONCE_f_NavChild, 'NavContent')) {
           ONCE_f_NavChild.style.display = 'none';
         }
       }
       ONCE_f_NavToggle.firstChild.data = ONCE_NavigationBarShow; 
     }
 
     // open selected one
     for (var ONCE_NavChild = ONCE_NavFrame.firstChild; ONCE_NavChild != null; ONCE_NavChild = ONCE_NavChild.nextSibling) {
       if (hasClass(ONCE_NavChild, 'NavPic') || hasClass(ONCE_NavChild, 'NavContent')) {
         ONCE_NavChild.style.display = 'block';
       }
     }
     ONCE_NavToggle.firstChild.data = ONCE_NavigationBarHide;
   }
 }
 
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
 
   if (NavToggle.firstChild.data == NavigationBarHide) {
     // if shown now
     for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
        if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
          NavChild.style.display = 'none';
        }
      }
      NavToggle.firstChild.data = NavigationBarShow;
   } else if (NavToggle.firstChild.data == NavigationBarShow) {
     // if hidden now
     for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
       if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
         NavChild.style.display = 'block';
       }
     }
     NavToggle.firstChild.data = NavigationBarHide;
   }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
   var indexNavigationBar = 0, ONCE_indexNavigationBar = 0;
   var NavFrames = document.getElementsByTagName("div");
 
   // iterate over all < div >-elements
   for (var i=0; NavFrame = NavFrames[i]; i++) {
     // if found a once navigation bar
     if (hasClass(NavFrame, 'NavFrame') && hasClass(NavFrame, 'NavOnce')) {
       ONCE_indexNavigationBar++;
       var ONCE_NavToggle = document.createElement("a");
       ONCE_NavToggle.className = 'NavToggle';
       ONCE_NavToggle.setAttribute('id', 'NavToggleOnce' + ONCE_indexNavigationBar);
       ONCE_NavToggle.setAttribute('href', 'javascript:ONCE_toggleNavigationBar(' + ONCE_indexNavigationBar + ');');
 
       var ONCE_NavToggleText = document.createTextNode(ONCE_NavigationBarHide);
       ONCE_NavToggle.appendChild(ONCE_NavToggleText);
       // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
       for (var j=0; j < NavFrame.childNodes.length; j++) {
         if (hasClass(NavFrame.childNodes[j], "NavHead")) {
           NavFrame.childNodes[j].appendChild(ONCE_NavToggle);
         }
       }
       NavFrame.setAttribute('id', 'NavFrameOnce' + ONCE_indexNavigationBar);
     } else if (hasClass(NavFrame, "NavFrame")) {
       // if found a navigation bar
       indexNavigationBar++;
       var NavToggle = document.createElement("a");
       NavToggle.className = 'NavToggle';
       NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
       NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
       var NavToggleText = document.createTextNode(NavigationBarHide);
       NavToggle.appendChild(NavToggleText);
       // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
       for (var j=0; j < NavFrame.childNodes.length; j++) {
         if (hasClass(NavFrame.childNodes[j], "NavHead")) {
           NavFrame.childNodes[j].appendChild(NavToggle);
         }
       }
       NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
     }
   }
 
   // if more Navigation Bars found than Default: hide all
   if (NavigationBarShowDefault < indexNavigationBar) {
     for (var i=1; i<=indexNavigationBar; i++) {
       toggleNavigationBar(i);
     }
   }
   if (ONCE_NavigationBarShowDefault < ONCE_indexNavigationBar) {
     for (var i=1; i<=ONCE_indexNavigationBar; i++) {
        ONCE_toggleNavigationBar(i);
     }
   }
 }
 
$(createNavigationBarToggleButton);