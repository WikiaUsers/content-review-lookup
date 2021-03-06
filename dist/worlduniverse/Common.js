/** Dynamic navigation bars ************************************************
 * Allows navigations templates to expand and collapse their content to save space
 * Documentation on Wikipedia at [[wikipedia:Wikipedia:NavFrame|Wikipedia:NavFrame]]
 */

// set up the words in your language
var NavigationBarHide = '[hide]';
var NavigationBarShow = '[show]';

// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
var NavigationBarShowDefault = 1;

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//	indexNavigationBar: the index of navigation bar to be toggled
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

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 */
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
		return;
	}
	if( !document.getElementById( 'ca-edit' ) || !document.getElementById( 'old-forum-warning' ) ) {
		return;
	}
	editLink = document.getElementById( 'ca-edit' ).firstChild;
	editLink.removeAttribute( 'href', 0 );
	editLink.style.color = 'gray';
	editLink.innerHTML = 'No Editing';
}
addOnloadHook( disableOldForumEdit );

/** Forum talkpages - adds talkpage tab back if present.
 * Blame <name missing>
 */
function forumTalkTab() {
	if( document.getElementById( 'talkforum' ) ) {
		document.getElementById( 'talkforum' ).style.display = 'none';
		document.getElementById( 'ca-talk' ).style.display = 'block !important';
	}
}
addOnloadHook( forumTalkTab );

/** Add section tab disabling *************************************
 * Disables the add section tab on any page you like, mainly useful for your userpage
 * (depending on how you have your userpage setup)
 * In order to use it, simply include any HTML element with an ID of disableAddSection such as <div id="disableAddSection"></div>
 * By [[User:Olipro|Olipro]]
 */
function disableAddSection() {
	if( !( addsect = document.getElementById( 'ca-addsection' ) ) || !document.getElementById( 'disableAddSection' ) ) {
		return;
	}
	addsect.parentNode.removeChild( addsect );
}
addOnloadHook( disableAddSection );
function countdown(dateEnd) {
  var timer, days, hours, minutes, seconds;
 
  dateEnd = new Date(dateEnd);
  dateEnd = dateEnd.getTime();
 
  if ( isNaN(dateEnd) ) {
    return;
  }
 
  timer = setInterval(calculate, 1000);
 
  function calculate() {
    var dateStart = new Date();
    var dateStart = new Date(dateStart.getUTCFullYear(),
                             dateStart.getUTCMonth(),
                             dateStart.getUTCDate(),
                             dateStart.getUTCHours(),
                             dateStart.getUTCMinutes(),
                             dateStart.getUTCSeconds());
    var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
 
    if ( timeRemaining >= 0 ) {
      days    = parseInt(timeRemaining / 86400);
      timeRemaining   = (timeRemaining % 86400);
      hours   = parseInt(timeRemaining / 3600);
      timeRemaining   = (timeRemaining % 3600);
      minutes = parseInt(timeRemaining / 60);
      timeRemaining   = (timeRemaining % 60);
      seconds = parseInt(timeRemaining);
 
      document.getElementById("days").innerHTML    = parseInt(days, 10);
      document.getElementById("hours").innerHTML   = ("0" + hours).slice(-2);
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      return;
    }
  }
 
  function display(days, hours, minutes, seconds) {}
}
 
 
 
countdown('06/30/2023 03:00:00 AM');