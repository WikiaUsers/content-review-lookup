/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

/* Standard Edit Summaries */
importScript('MediaWiki:Common.js/standardeditsummaries.js');


// *************************************************************************************************************
// **************************** Experimental javascript countdown timer (Splarka) ******************************
// ******************************************** Version 0.0.2 **************************************************
// *************************************************************************************************************
// ******************* Code Source: Redwall Wiki - redwall.wikia.com/wiki/MediaWiki:Common.js ******************
// *************************************************************************************************************
// Embed with a span class="countdowntimer", eg:
// <span class="countdowntimer" style="display:none;">April 12 2008 00:00:01 AM EST</span>
// default replacement text can accompany, eg: <span class="notimer">*javascript required*</span>

function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = count=Math.floor((then.getTime()-now.getTime())/1000);

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }

  // catch negative dates
  if(diff<0) {
    diff = -diff;
    var left = 'ago since';
  } else {
    var left = 'until';
  }

  // calcuate the diff
  left = (diff%60) + ' seconds ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
  timers[i].firstChild.nodeValue = left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  tim[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  var untimers = getElementsByClassName(document, 'span', 'notimer');
  for(var i=0;i < untimers.length; i++) {
    untimers[i].style.display = 'none';    
  }
  timers = getElementsByClassName(document, 'span', 'countdowntimer');  //global
  tim = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i=0;i < timers.length; i++) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    timers[i].firstChild.nodeValue = '0 days 0 hours 0 minutes 0 seconds';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers)

// *************************************************************************************************************
// *************************** BEGINNING: [[Main Page]] tab-rename using javascript ****************************
// ** Modified version. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]] ** 
// *************************************************************************************************************
// **************** Code Source: Avatar Wiki - http://avatar.wikia.com/wiki/MediaWiki:Common.js ****************
// *************************************************************************************************************

function mainPageRenameNamespaceTab() {
	try {
		var Node = document.getElementById( 'ca-nstab-main' ).firstChild;
		if ( Node.textContent ) {      // Per DOM Level 3
			Node.textContent = 'NCIS: LA';
		} else if ( Node.innerText ) { // IE doesn't handle .textContent
			Node.innerText = 'NCIS: LA';
		} else {                       // Fallback
			Node.replaceChild( Node.firstChild, document.createTextNode( 'NCIS: LA' ) ); 
		}
	} catch(e) {
		// bailing out!
	}
}

if ( wgTitle == 'NCIS: Los Angeles Database' && ( wgNamespaceNumber == 0 || wgNamespaceNumber == 1 ) ) {
	addOnloadHook( mainPageRenameNamespaceTab );
} 
// *******************************************************************************************************
// *************************** END: [[Main Page]] tab-rename using javascript ****************************
// *******************************************************************************************************