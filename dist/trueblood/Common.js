/* Any JavaScript here will be loaded for all users on every page load. */

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=108680329176001&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}

$(fBox);

/* Code for cycling through Template:FeaturedExternalBlogs */
function cycleToNextItem(clickedEl){
    var list = $(clickedEl).parents('div.cycleMe').find('ul');
    var items = $(list).children();
    var numItems = items.length;
    var currIndex = -1;
    items.each(function(i, el){
        if($(el).is(':visible')){
            currIndex = i;
        }
    });
    var nextIndex = (currIndex + 1) % numItems;
    $(items.get(currIndex)).fadeOut('slow', function(){
        $(items.get(nextIndex)).fadeIn();
    });
}
$(function(){
    $('div.cycleMe small a').unbind('click').click(function(ev){
        cycleToNextItem(this);
        ev.preventDefault();
    });
});

/* track incontent share fb button */
$(function(){
    $("#incontent_share").click(function(){
        WET.byStr("articleAction/incontent_share/" + wgPageName);
    });
});


$(function(){
	if( $('#control_form_edit').length ) {
		$('#control_edit').remove();
	}
});

/* Adds icons to page header bottom border */
 
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaArticle').prepend($('#top-page-icons'));
	}
});

/* End icons */

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
    var tpm = ' ';
  } else {
    var tpm = ' ';
  }

  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left;
  timers[i].firstChild.nodeValue = tpm + left;

  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}

function checktimers() {
  //hide 'nocountdown' and show 'countdown'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none';
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline';

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