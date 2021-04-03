// Visible text used (placed here for translation purposes)
var text = {
	intervalAbbreviations: ['D', 'H', 'M'],
	remaining: 'REMAINING',
	nextEvent: {
		drt: 'Next Event: TROPICAL DR. T',
		volcano: 'Next Event: VOLCANO DR. T',
		gearheart: 'Next Event: WAR FACTORY',
		hammerman: 'Next Event: HAMMERMAN\'S FLEET',
		imitation: 'Next Event: IMITATION GAME'
	},
	activeEvent: {
		drt: 'TROPICAL DR. T ACTIVE',
		volcano: 'VOLCANO DR. T ACTIVE',
		gearheart: 'WAR FACTORY ACTIVE',
		hammerman: 'HAMMERMAN\'S FLEET ACTIVE',
		imitation: 'IMITATION GAME ACTIVE'
	},
	intel: {
		nextResetIn: 'NEXT INTEL RESET IN'
	},
	switchButton: {
		toIntel: 'Switch to Intel Countdown',
		toEvent: 'Switch to Event Countdown'
	}
};

// Images used
var img = {
	drt: 'https://vignette.wikia.nocookie.net/boombeach/images/0/03/Terrorc.png/revision/latest?cb=20150506231414',
	hammerman: 'https://vignette.wikia.nocookie.net/boombeach/images/c/c3/Hammerman.png/revision/latest?cb=20150213181715',
	gearheart: 'https://vignette.wikia.nocookie.net/boombeach/images/1/14/Colonel_Gearheart.png/revision/latest?cb=20150506115021',
	intel: 'https://vignette.wikia.nocookie.net/boombeach/images/0/05/Intel_75px.png/revision/latest?cb=20151230203622'
};


/* Create Event Widget */
function createCountdownWidget() {
  var utcCutOffHour = 8;

  function timeDiff(time1, time2) {
    // Time comes in milliseconds, but we just want the difference in days, hours,
    // and minutes.
    // And don't care which one is higher
    var diff = Math.floor(Math.abs(time1 - time2) / (1000 * 60));
    var divisors = [24 * 60, 60, 1];
    var abbrevs = text.intervalAbbreviations.slice();

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

	if (nextEvent in text.nextEvent) {
		divTextBottom.innerHTML = text.nextEvent[nextEvent];
	}
	
    var remaining = timeDiff(now, eventCycleEnd);

    if (remaining) {
      divTextMiddle.innerHTML = remaining + ' ' + text.remaining;
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
    // Image - Use a div to help
    var divImage = document.createElement('div');
    divImage.id = 'events-div-image';
    var imgImage = document.createElement('img');
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
    divChangeText.innerHTML = text.switchButton.toIntel;

    // Calculate which event information to show
    var eventDay = new Date();
    eventDay.setUTCHours(eventDay.getUTCHours() - utcCutOffHour);
    eventDay.setUTCSeconds(0);
    eventDay.setUTCMilliseconds(0);
    // Event cycle starts on Monday now; getUTCDay() returns day of week
    // from Sunday (as 0)
    var eventCycleType = eventDay.getUTCDay() - 1;
    if (eventCycleType < 0) {
        eventCycleType = 6;
    }

    // Determine image to use
    if (eventCycleType === 3) {
      imgImage.src = img.gearheart;
    }
    else if (eventCycleType === 0 || eventCycleType == 4) {
      imgImage.src = img.hammerman;
    }
    else {
      imgImage.src = img.drt;
    }
    if (eventCycleType === 3) {
      // Set class names
      widget.className = 'events-gearheart';
      widgetFront.className = 'events-gearheart';
      divImage.className = 'events-gearheart';
      imgImage.className = 'events-gearheart';
      // Event Name
      divTextTop.innerHTML = text.activeEvent.gearheart;
    } else if (eventCycleType === 0 || eventCycleType === 4) {
      // Set class names
      widget.className = 'events-hammerman';
      widgetFront.className = 'events-hammerman';
      divImage.className = 'events-hammerman';
      imgImage.className = 'events-hammerman';
      if (eventCycleType === 0) {
        // Event Name
        divTextTop.innerHTML = text.activeEvent.hammerman;
      } else {
        // Event Name
        divTextTop.innerHTML = text.activeEvent.imitation;
      }
    } else {
      // Set class names
      widget.className = 'events-terror';
      widgetFront.className = 'events-terror';
      divImage.className = 'events-terror';
      imgImage.className = 'events-terror';
      // Event Name
      if (eventCycleType === 1 || eventCycleType === 5) {
        divTextTop.innerHTML = text.activeEvent.drt;
      } else {
        divTextTop.innerHTML = text.activeEvent.volcano;
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
    var now = new Date();
    now.setUTCSeconds(0);
    now.setUTCMilliseconds(0);
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
    imgImage.id = 'intel-image';
    // Image default dimensions
    imgImage.width="75px";
    imgImage.height="75px";
    // Image url
    imgImage.src = img.intel;

    // Current Event
    var divTextTop = document.createElement('div');
    divTextTop.id = 'intel-text-top';
    divTextTop.innerHTML = text.intel.nextResetIn;
    // Time Left
    var divTextMiddle = document.createElement('div');
    divTextMiddle.id = 'intel-text-remaining';
    // Calculate remaining time
    var now = new Date();
    var resetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
                         now.getUTCDate(), 0, 0, 0, 0));
    // It resets midnight Sunday
    resetTime.setUTCDate( resetTime.getUTCDate() + (7 - resetTime.getUTCDay()) );
    divTextMiddle.innerHTML = timeDiff( now, resetTime );

    // Change countdown
    var divChangeBox = document.createElement('div');
    divChangeBox.id = 'countdown-switch-box';
    var divChangeText = document.createElement('div');
    divChangeText.id = 'countdown-switch-text';
    divChangeText.innerHTML = text.switchButton.toEvent;

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

window.onload = createCountdownWidget();