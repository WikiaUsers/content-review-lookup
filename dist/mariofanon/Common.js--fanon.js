/* Tabber */
 
addOnloadHook(mainpageTabs)
function mainpageTabs() {
  if(!document.getElementById('tabbyHead') || !document.getElementById('tabbyBoxes')) return
  var box = document.getElementById('tabbyBoxes')
  tabbyBoxen = getElementsByClassName(document, 'div', 'tabbyBox');  //global
  tabbyLinks = document.getElementById('tabbyHead').getElementsByTagName('a')
  showbox(0);
 
  if(tabbyLinks.length < tabbyBoxen.length) {
    var len = tabbyLinks.length;
  } else {
    var len = tabbyBoxen.length;
  }
 
  for(var i=0;i<len;i++) {
    tabbyLinks[i].href = 'javascript:showbox("' + i + '");'
    tabbyLinks[i].title = 'click to display'
  }
 
}
 
function showbox(num) {
  for(var i=0;i<tabbyBoxen.length;i++) {
    if(i==num) {
      tabbyBoxen[i].style.display = 'block';
    } else {
      tabbyBoxen[i].style.display = 'none';
    }
  }
  for(var i=0;i<tabbyLinks.length;i++) {
    if(i==num) {
      tabbyLinks[i].className = 'selected';
    } else {
      tabbyLinks[i].className = '';
    }
  }
}
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = tpm + left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  //set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers);
 
// --------------------------------------------------------
// ShowHide
// http://dev.wikia.com/wiki/ShowHide
// --------------------------------------------------------
 
importScriptPage( 'ShowHide/code.js', 'dev' );
 
// --------------------------------------------------------
// Dynamic Navigation Bars (experimental)
// Description: See [[Wikipedia:NavFrame]].
// --------------------------------------------------------
 
// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar) {
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
                if( hasClass(NavChild, 'NavPic') ) {
                        NavChild.style.display = 'block';
                }
                if( hasClass(NavChild, 'NavContent') ) {
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
        var divs = document.getElementsByTagName("div");
        for(
                var i=0; 
                NavFrame = divs[i]; 
                i++
                ) {
        // if found a navigation bar
        if( hasClass(NavFrame, "NavFrame") ) {
 
                indexNavigationBar++;
                var NavToggle = document.createElement("a");
                NavToggle.className = 'NavToggle';
                NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
                var NavToggleText = document.createTextNode(NavigationBarHide);
                for (
                        var NavChild = NavFrame.firstChild;
                        NavChild != null;
                        NavChild = NavChild.nextSibling
                        ) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        if (NavChild.style.display == 'none') {
                                NavToggleText = document.createTextNode(NavigationBarShow);
                                break;
                        }
                }
        }
 
                NavToggle.appendChild(NavToggleText);
                // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
                for(
                        var j=0;
                        j < NavFrame.childNodes.length;
                        j++
                        ) {
                        if( hasClass(NavFrame.childNodes[j], "NavHead") ) {
                                NavFrame.childNodes[j].appendChild(NavToggle);
                        }
                }
                NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
                }
        }
}
 
addOnloadHook( createNavigationBarToggleButton );
 
 
// --------------------------------------------------------
// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance.
// Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
// --------------------------------------------------------
 
var hasClass = (function () {
        var reCache = {};
        return function (element, className) {
                return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
        };
})();
 
// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************