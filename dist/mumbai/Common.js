/* Any JavaScript here will be loaded for all users on every page load. */
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

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************
/**
  * Function to easily embed SWF files
  * Place the following where you want to embed some file:
  * <div class="flash-wrapper">http://path/to/your/file</div>
  * Flash files from untrusted sources can be dangerous. Use caution.
*/

(function(){
	var flashobjects, i, url, embed;	
	
	// Enumerate over the files that need to be embedded
	flashobjects = document.getElementsByClassName( "flash-wrapper" ) || [];
	
	for ( i = 0; i < flashobjects.length; i++ ) {	
		url = flashobjects[i].textContent;
		
		if ( url.indexOf( "http" ) !== 0 ) {
			// If it's not a valid http(s) URL, continue, and log the error
			console.log( "Lightning: Skipped the" + ( i + 1 ) +
				"th Flash video - " + url + " is not a well-formed HTTP(S) URL" );
			continue;
			
		} else {
			// Otherwise, embed
			flashobjects[i].textContent = "";
			embed = document.createElement( "embed" );
			embed.src = url;
			embed.type = "application/x-shockwave-flash";
			flashobjects[i].appendChild( embed );
		}
	}
}());