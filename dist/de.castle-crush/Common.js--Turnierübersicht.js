/* Extend date to figure DST */
Date.prototype.stdTimezoneOffset = function() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
 
Date.prototype.dst = function() {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
 
/* Create Event Widget */
function createCountdownWidget() {
 
  function timeDiff(time1, time2) {
    // Time comes in milliseconds, but we just want the difference in days, hours,
    // and minutes.
    // And don't care which one is higher
    var diff = Math.floor(Math.abs(time1 - time2) / (1000 * 60));
    var divisors = [24 * 60, 60, 1];
    var abbrevs = ['d', 'h', 'm'];
 
    for (i = 0; i < divisors.length; i++) {
      var remainder = diff - Math.floor( diff / divisors[i]) * divisors[i];
      if (diff > remainder || i === divisors.length - 1) {
        abbrevs[i] = ((diff - remainder) / divisors[i]) + abbrevs[i];
      }
      else {
        abbrevs[i] = '';
      }
      diff = remainder;
    }
 
    while (abbrevs.length > 1 && !abbrevs[0]) {
      abbrevs.shift();
    }
    return abbrevs.join(' ');
  }
 
  function updateEventsWidget(w, now) {
    if (!w) {
      w = $('#dr-terror-activity').get(0);
    }
    if (!w) {
      return;
    }
    var divTextMiddle = $(w).find('div#events-text-middle').get(0);
    var divTextBottom = $(w).find('div#events-text-bottom').get(0);
 
    // The start time is always the same day regardless
    // It's either the start of the Nächstes Event or start of current event.
    var eventCycleStart = new Date(now.getFullYear(), now.getMonth(),
                                   now.getDate(), 13, 0, 0, 0);
 
    if (now.getHours() < 13 || now.getHours() == 12) {
      // Ends current day
      var eventCycleEnd = new Date(now.getFullYear(), now.getMonth(),
                                   now.getDate(), 13, 0, 0, 0);
    }
    else {
      // Ends next day
      var eventCycleEnd = new Date(now.getFullYear(), now.getMonth(),
                                   now.getDate() + 3, 13, 0, 0, 0);
    }
 
    // Adjust for daylights savings time
    eventCycleStart.setHours( eventCycleStart.getHours() - now.dst());
    eventCycleEnd.setHours( eventCycleEnd.getHours() - now.dst());
 
    
    var remaining = '';
    var tilNextEvent = '';
 
    if (now.getHours() >= 13 || now.getHours() < 13) {
      // Event currently happening
      remaining = timeDiff(now,eventCycleEnd);
    } else {
      // No event currently happening
      tilNextEvent = timeDiff(now,eventCycleStart);
    }
 
    function turniercountdown() {
  var spantags = document.getElementsByTagName("span");
  for (i=0; i<spantags.length; i++) {
    if (spantags[i].className=="turniertimer") {
        spantags[i].innerHTML = remaining;
    }
  }
}
addOnloadHook(turniercountdown);

}
  
  function createEventsWidget() {
    var widget = document.getElementById("intel-box-back");
    if (widget !== null) {
      widget.parentNode.removeChild(widget);
    }
    widget = document.createElement("div");
    widget.id = 'events-box-back';
    // Front of box
    var widgetFront = document.createElement('div');
    widgetFront.id = 'events-box-front';
    // Image - Use an div to help
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
    // Actual image - couldn't get content to work on my computer
    imgImage.id = 'events-image';
    // Image default dimensions
    imgImage.width="90px";
    imgImage.height="50px";
 
    // Current Event
    var divTextTop = document.createElement('div');
    divTextTop.id = 'events-text-top';
    // Time Left
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'events-text-middle';
    // Nächstes Event
    var divTextBottom = document.createElement('div');
    divTextBottom.id = 'events-text-bottom';
    // Change countdown
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    
    // Calculate which event information to show
    var now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    
    // Register onclick event
    divChangeBox.addEventListener("click", createCountdownWidget);
 
    // Append some children
    widget.appendChild(widgetFront);
    widgetFront.appendChild(divImage);
    widgetFront.appendChild(divTextTop);
    widgetFront.appendChild(divTextMiddle);
    widgetFront.appendChild(divTextBottom);
    widgetFront.appendChild(divChangeBox);
    divImage.appendChild(imgImage);
    divChangeBox.appendChild(divChangeText);
 
    // Calculate which widget we should show
    updateEventsWidget(widget, now);
    // Return the created widget
    return widget;
  }
 
  // Intel Countdown
  function createIntelWidget() {
    // Calculate remaining time
    var now = new Date();
    var resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
                         now.getUTCDate(), 0, 0, 0, 0));
    // It resets midnight Sunday
    resetTime.setDate( resetTime.getDate() + (7 - resetTime.getUTCDay()) );
    divTextMiddle.innerHTML = timeDiff( now, resetTime );
 
    // Register onclick event
    divChangeBox.addEventListener("click", createCountdownWidget);
 
    // Append some children
    widget.appendChild(widgetFront);
    widgetFront.appendChild(divImage);
    widgetFront.appendChild(divTextTop);
    widgetFront.appendChild(divTextMiddle);
    widgetFront.appendChild(divChangeBox);
    divImage.appendChild(imgImage);
    divChangeBox.appendChild(divChangeText);
 
    // Return the created widget
    return widget;
  }
 
  // Determines the current widget
  function getCurrentWidget() {
    if (document.getElementById('events-box-back') !== null) {
      return 'events';
    }
    else {
      return 'intel';
    }
  }
 
  var widget = null;
  // Display the widget opposite the current one.
  // Due to how getCurrentWidget is setup, the events widget is always
  // the first one to be shown.
  if (getCurrentWidget() === 'events') {
    // Create the widget
    widget = createIntelWidget();
  }
  else {
    widget = createEventsWidget();
  }
 
}

/* Doesn't work when not on wikia */
addOnloadHook(createCountdownWidget);