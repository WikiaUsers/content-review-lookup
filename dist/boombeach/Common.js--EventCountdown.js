function timeStamp_DrTerror_js() {
  /* Updated again for the new event cycle */
  /* Note: The terror offsets are no longer used,
   * but are kept as parameters, so the code isn't
   * broken. */
  return '2016.11.03 19:38 (UTC-5)';
}


/* Create Event Widget */
function createCountdownWidget() {

  function timeDiff(time1, time2) {
    // Time comes in milliseconds, but we just want the difference in days, hours,
    // and minutes.
    // And don't care which one is higher
    var diff = Math.floor(Math.abs(time1 - time2) / (1000 * 60));
    var divisors = [24 * 60, 60, 1];
    var abbrevs = ['D', 'H', 'M'];

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

  function updateEventsWidget(w, now, eventCycleType) {
    if (!w) {
      w = $('#dr-terror-activity').get(0);
    }
    if (!w) {
      return;
    }
    var divTextMiddle = $(w).find('div#events-text-middle').get(0);
    var divTextBottom = $(w).find('div#events-text-bottom').get(0);

    
    // Determine time of the end of today's event
    var utcCutOffHour = 8;
    var todayCutOff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), utcCutOffHour, 0, 0, 0));
    var tomorrowCutOff = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, utcCutOffHour, 0, 0, 0));
    var eventCycleEnd = todayCutOff.getTime() < now.getTime() ? tomorrowCutOff : todayCutOff;


    // Next and current event determination
    var nextEvent = '';
    var event = '';
    
    if (eventCycleType === 0) {
      event = 'hammerman';
      nextEvent = 'drt';
    }
    else if (eventCycleType === 1) {
      event = 'drt';
      nextEvent = 'volcano';
    }
    else if (eventCycleType === 2) {
      event = 'volcano';
      nextEvent = 'gearheart';
    }
    else if (eventCycleType === 3) {
      event = 'gearheart';
      nextEvent = 'imitation';
    }
    else if (eventCycleType === 4) {
      event = 'imitation';
      nextEvent = 'drt';
    }
    else if (eventCycleType === 5) {
      event = 'drt';
      nextEvent = 'volcano';
    }
    else if (eventCycleType === 6) {
      event = 'volcano';
      nextEvent = 'hammerman';
    }

    var remaining = timeDiff(now, eventCycleEnd);
    var tilNextEvent = '';
    
    if (nextEvent === 'gearheart') {
    divTextBottom.innerHTML = 'Next Event: WAR FACTORY';
    }
    else if (nextEvent === 'hammerman') {
    divTextBottom.innerHTML = 'Next Event: HAMMERMAN\'S FLEET';
    }
    else if (nextEvent === 'drt') {
    divTextBottom.innerHTML = 'Next Event: TROPICAL DR. T';
    }
    else if (nextEvent === 'volcano') {
    divTextBottom.innerHTML = 'Next Event: VOLCANO DR. T';
    }
    else if (nextEvent === 'imitation') {
    divTextBottom.innerHTML = 'Next Event: IMITATION GAME';
    }

    if (remaining) {
      divTextMiddle.innerHTML = remaining + ' REMAINING';
    }
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
    // Next Event
    var divTextBottom = document.createElement('div');
    divTextBottom.id = 'events-text-bottom';
    // Change countdown
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = 'Switch to Intel Countdown';

    // Calculate which event information to show
    var now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    // Event cycle starts on Monday now; getUTCDay() returns day of week
    // from Sunday (as 0)
    var eventCycleType = now.getUTCDay() - 1;
    if (eventCycleType < 0) {
        eventCycleType = 6;
    }

    // Determine image to use
    if (eventCycleType === 3) {
      imgImage.src = "https://vignette.wikia.nocookie.net/boombeach/images/1/14/Colonel_Gearheart.png/revision/latest?cb=20150506115021";
    }
    else if (eventCycleType === 0 || eventCycleType == 4) {
      imgImage.src = "https://vignette.wikia.nocookie.net/boombeach/images/c/c3/Hammerman.png/revision/latest?cb=20150213181715";
    }
    else {
      imgImage.src = "https://vignette.wikia.nocookie.net/boombeach/images/0/03/Terrorc.png/revision/latest?cb=20150506231414";
    }
    if (eventCycleType === 3) {
      // Set class names
      widget.className = 'events-gearheart';
      widgetFront.className = 'events-gearheart';
      divImage.className = 'events-gearheart';
      imgImage.className = 'events-gearheart';
      // Event Name
      divTextTop.innerHTML = 'WAR FACTORY ACTIVE';
    } else if (eventCycleType === 0 || eventCycleType === 4) {
      // Set class names
      widget.className = 'events-hammerman';
      widgetFront.className = 'events-hammerman';
      divImage.className = 'events-hammerman';
      imgImage.className = 'events-hammerman';
      if (eventCycleType === 0) {
        // Event Name
        divTextTop.innerHTML = 'HAMMERMAN\'S FLEET ACTIVE';
      } else {
        // Event Name
        divTextTop.innerHTML = 'IMITATION GAME ACTIVE';
      }
    } else {
      // Set class names
      widget.className = 'events-terror';
      widgetFront.className = 'events-terror';
      divImage.className = 'events-terror';
      imgImage.className = 'events-terror';
      // Event Name
      if (eventCycleType === 1 || eventCycleType === 5) {
        divTextTop.innerHTML = 'TROPICAL DR. T ACTIVE';
      } else {
        divTextTop.innerHTML = 'VOLCANO DR. T ACTIVE';
      }
    }

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
    updateEventsWidget(widget, now, eventCycleType);
    // Return the created widget
    return widget;
  }

  // Intel Countdown
  function createIntelWidget() {
    var widget = document.getElementById('events-box-back');
    if (widget !== null) {
      widget.parentNode.removeChild( widget );
    }
    widget = document.createElement('div');
    widget.id = 'intel-box-back';
    // Front of box
    var widgetFront = document.createElement('div');
    widgetFront.id = 'intel-box-front';
    // Image - Use a div to help
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
    // Actual image - couldn't get content to work on my computer
    imgImage.id = 'intel-image';
    // Image default dimensions
    imgImage.width="75px";
    imgImage.height="75px";
    // Image url
    imgImage.src = 'https://vignette.wikia.nocookie.net/boombeach/images/0/05/Intel_75px.png/revision/latest?cb=20151230203622';

    // Current Event
    var divTextTop = document.createElement('div');
    divTextTop.id = 'intel-text-top';
    divTextTop.innerHTML = 'NEXT INTEL RESET IN';
    // Time Left
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'intel-text-remaining';
    // Calculate remaining time
    var now = new Date();
    var resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
                         now.getUTCDate(), 0, 0, 0, 0));
    // It resets midnight Sunday
    resetTime.setDate( resetTime.getUTCDate() + (7 - resetTime.getUTCDay()) );
    divTextMiddle.innerHTML = timeDiff( now, resetTime );

    // Change countdown
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = 'Switch to Event Countdown';

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

  // Add the widget after the main page ad, if it exists
  var divParent = null;
  var divBefore = null;
  var divAd = document.getElementById('HOME_TOP_RIGHT_BOXAD');

  if (divAd !== null) {
    divParent = divAd.parentNode;
    divBefore = divAd.nextSibling;
  }
  if (divParent === null) {
    // If not, add it after the search box, as long as its int the right rail
    var divRail = document.getElementById('WikiaRail');
    var divAfter = null;

    if (divRail !== null) {
      divAfter = divRail.getElementsByClassName('WikiaSearch')[0];
    }

    if (typeof divAfter !== 'undefined' && divAfter !== null) {
      divParent = divAfter.parentNode;
      divBefore = divAfter.nextSibling;
    }
    else if (divRail !== null) {
      // If we didn't find a search box in the right rail, we atleast found
      // a right rail, add it to the top
      divParent = divRail;
      divBefore = divRail.firstChild;
    }
  }

  if (divParent === null) {
    return;
  }

  // Now find the appropriate spot in the rail to add the widget
  return divParent.insertBefore(widget, divBefore);
}

/* Doesn't work when not on Fandom */
addOnloadHook(createCountdownWidget);

//window.onload = createCountdownWidget();