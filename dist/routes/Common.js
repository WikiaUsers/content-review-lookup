// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.2
// **************************************************
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
    var left = 'depuis';
  } else {
    var left = 'avant';
  }

  // calcuate the diff
  left = (diff%60) + ' secondes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' heures ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' jours ' + left
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
    timers[i].firstChild.nodeValue = '0 jours 0 heures 0 minutes 0 secondes';
    timers[i].style.display = 'inline';
    updatetimer(i);  //start it up
  }
}
addOnloadHook(checktimers)

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* ############################################################################# */
/* ### TICKER                                                                ### */
/* ### --------------------------------------------------------------------  ### */
/* ### Description: Displays a ticker, as in [[Template:Ticker]]             ### */
/* ### Credit:      unknown                                                  ### */
/* ###              User:FDekker                                             ### */
/* ############################################################################# */
$(function() {
    $(".ticker").each(function(_, ticker) {
        var step = 10;  // How many pixels to move text each tick
        var tickerSpeed = 200;
        
        ticker = $(ticker);
        
        if (ticker.attr('data-speed') !== undefined)
            tickerSpeed = parseInt(ticker.attr('data-speed'));
            
        if (ticker.attr('data-step') !== undefined)
            step = parseInt(ticker.attr('data-step'));
            
        ticker.css("display", "block");

        var wrapper = $(".tickerWrapper", ticker);
        wrapper.css("left", (step + ticker.width()) + "px");

        var text = $(".tickerText", ticker);
        var textWidth = text.outerWidth();

        setInterval(function() {
            var offset =
                (wrapper.position().left > -(textWidth + step))
                    ? (wrapper.position().left - step) + "px"  // Move left
                    : (ticker.width() + step) + "px";  // Reset
            wrapper.css("left", offset);
        }, tickerSpeed);
    });
});