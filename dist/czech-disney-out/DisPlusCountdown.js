/**
 * Disney Plus Countdown
 *
 * @version 1, based upon code found on CodePen
 * original author Yaphi Berhanu, with a healthy dollop
 * of help from User:Lucgreg
 */
 
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

/* Fire in correct order */ 
var clock = document.getElementById( 'clockdiv' );
if ( clock ) {
    initializeClock('clockdiv', 'August 29 2021 00:00:00 GMT-1100')
} else {
    mw.hook( 'AddRailModule.module' ).add( function( template ) {
        if ( template !== 'Template:RailModule' ) return;
        initializeClock('clockdiv', 'August 29 2021 00:00:00 GMT-1100')
    } )
}

require(["jquery"],
    function ($) {
  "use strict";
//Clickability
$('.clockdiv').on('click', function() {
    location.href = 'https://preview.disneyplus.com'    
    });
});