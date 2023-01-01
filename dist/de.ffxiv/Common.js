/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
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
    var tpm = '';
  } else {
    var tpm = '';
  }

  // calcuate the diff
  var left = (diff%60) + ' Sekunden';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' Minuten ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' Stunden ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' Tage ' + left
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

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
//


// --------------------------------------------------
//  <TT> Nachrichten Ticker 2.1, by Yuuki, angepasste Version
// --------------------------------------------------

var ticker;
var tickertxt;
var tickerdiv;

function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",150);
  }
  }
}

function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook(newsticker);

// --------------------------------------------------
//             Ende des <TT> Nachrichten Ticker2.0
// --------------------------------------------------
   
/***** Konfiguriert von Benutzer SVG *****/
 
// Entferne beim Hochladen die Lizenz „keine Vorauswahl“
 function remove_no_license() {
   if (wgPageName != "Spezial:Hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
 addOnloadHook(remove_no_license);

// Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }



/** Username replace function ([[Template:USERNAME]]) ******************************* 
	  * Inserts user name into <span class="insertusername"></span> 
	  * Originally by User:Splarka 
	  * New version by User:Spang 
	  */ 
	 
	 function UserNameReplace() { 
	    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; 
	    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent')); 
	    for ( var x in n ) { 
	       n[x].innerHTML = wgUserName; 
	    } 
	 } 
	 addOnloadHook(UserNameReplace);



/* Navigationsleiste. "Einklappen" und "Ausklappen" */

// set up the words in your language
var NavigationBarHide = 'Einklappen';
var NavigationBarShow = 'Ausklappen';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
if (typeof NavigationBarShowDefault == 'undefined' ) {
    var NavigationBarShowDefault = 1;
}
 
// adds show/hide-button to navigation bars
addOnloadHook(function() {
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
			   if (NavChild.className == 'NavPic') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className == 'NavContent') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className == 'NavToggle') {
				   NavChild.firstChild.data = NavigationBarShow;
			   }
		   }
 
	   // if hidden now
	   } else if (NavToggle.firstChild.data == NavigationBarShow) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild != null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className == 'NavPic') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className == 'NavContent') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className == 'NavToggle') {
				   NavChild.firstChild.data = NavigationBarHide;
			   }
		   }
	   }
	}
 
	function toggleNavigationBarFunction(indexNavigationBar) {
		return function() {
			toggleNavigationBar(indexNavigationBar);
			return false;
		};
	}
	// iterate over all NavFrames
	var NavFrames = getElementsByClassName((document.getElementById("content") || document.getElementById("mw_content")), "div", "NavFrame");
	for (var i=0;  i<NavFrames.length; i++) {
		var NavFrame = NavFrames[i];
		var NavToggle = document.createElement("a");
		NavToggle.className = 'NavToggle';
		NavToggle.setAttribute('id', 'NavToggle' + i);
		NavToggle.setAttribute('href', '#');
		NavToggle.onclick = toggleNavigationBarFunction(i);
 
		var NavToggleText = document.createTextNode(NavigationBarHide);
		NavToggle.appendChild(NavToggleText);
 
		// add NavToggle-Button as first div-element
		// in < div class="NavFrame" >
		NavFrame.insertBefore(NavToggle, NavFrame.firstChild);
		NavFrame.setAttribute('id', 'NavFrame' + i);
	}
	// if more Navigation Bars found and not template namespace than Default: hide all
	if (NavigationBarShowDefault < NavFrames.length && wgNamespaceNumber != 10) {
		for(var i=0; i<NavFrames.length; i++) {
			toggleNavigationBar(i);
		}
	}
 
});