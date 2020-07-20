function timeStamp_Test_js() {
  return "2014.03.02 15:39 (UTC-8)";
}

function activateSpottraProfileButtons() {
   if (wgPageName !== 'User:Spottra')
      return;

   // Add time and date buttons
   var elemClock = document.createElement('nav');
   elemClock.id = 'clock-button';
   elemClock.innerHTML = 'Clock';
   elemClock.className = 'wikia-menu-button';

   var elemCalendar = document.createElement('nav');
   elemCalendar.id = 'calendar-button';
   elemCalendar.innerHTML = 'Calendar';
   elemCalendar.className = 'wikia-menu-button';

   var main = document.getElementById('WikiaMainContentContainer');
   var btn = $('#WikiaMainContentContainer .wikia-menu-button').get(0);

   btn.parentNode.insertBefore(elemClock, btn);
   btn.parentNode.insertBefore(elemCalendar, btn);

   // Create calendar element
   var now   = new Date();
   var year  = now.getFullYear();
   var month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][now.getMonth()];
   var day   = (now.getDate() < 10 ? '0' : '') + now.getDate();

   var divCalendar = document.createElement('div');
   divCalendar.id = 'calendar-container';

   var span = document.createElement('span');
   span.id = 'calendar-day';
   span.innerHTML = day;
   divCalendar.appendChild(span);

   span = document.createElement('span');
   span.id = 'calendar-year';
   span.innerHTML = year;
   divCalendar.appendChild(span);

   span = document.createElement('span');
   span.id = 'calendar-month';
   span.innerHTML = month;
   divCalendar.appendChild(span);

   main.appendChild(divCalendar);

   // Create clock element
   var divClock = document.createElement('div');
   divClock.id = 'clock-wrapper';

   var divClockBase = document.createElement('div');
   divClockBase.className = 'analog-clock';
   divClock.appendChild(divClockBase);

   var divClockHighlight = document.createElement('div');
   divClockHighlight.className = 'clock-highlight';
   divClockBase.appendChild(divClockHighlight);

   var divClockFace = document.createElement('div');
   divClockFace.className = 'clock-face';
   divClockHighlight.appendChild(divClockFace);

   for (var i = 1; i <= 60; i ++) {
      var div = document.createElement('div');
      div.id = _numConvert(i);
      div.className = ((i % 5) ? 'minutes' : 'fiveminutes');
      divClockFace.appendChild(div);
   }

   for (i = 1; i <= 12; i ++) {
      var div = document.createElement('div');
      div.id = 'number' + _numConvert(i);
      div.className = 'numbers';
      div.innerHTML = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][i - 1];
      divClockFace.appendChild(div);
   }

   var div = document.createElement('div');
   div.id = 'hourhand';
   divClockFace.appendChild(div);

   var div = document.createElement('div');
   div.id = 'minhand';
   divClockFace.appendChild(div);

   var div = document.createElement('div');
   div.id = 'sechand';
   divClockFace.appendChild(div);

   var div = document.createElement('div');
   div.id = 'center-point';
   divClockFace.appendChild(div);

   main.appendChild(divClock);

   // Set up mouse hold events
   $('#calendar-button').on('mousedown', function mouseDownCalendar(e) {
      $(divCalendar).addClass('visible');
   });

   $('#clock-button').on('mousedown', function mouseDownClock(e) {
      $(divClock).addClass('visible');
   });

   $(document).mouseup(function mouseUpGlobal(e) {
      $(divCalendar).removeClass('visible');
      $(divClock).removeClass('visible');
   });

   // Set up carousel
   var left  = document.getElementById('carousel-button-left');
   var right = document.getElementById('carousel-button-right');

   if (left === null || right === null)
      return;

   left.setAttribute('data-increment', -1);
   right.setAttribute('data-increment', 1);

   var carousel      = document.getElementById('profile-carousel');
   var panelCount    = carousel.children.length;
   var transformProp = Modernizr.prefixed('transform');
   var theta         = 0;

   var onNavButtonClick = function(event) {
      // console.log('MediaWiki:Common.js/Test.js: onNavButtonClick');
      var increment = parseInt(event.target.getAttribute('data-increment'));
      theta += (360 / panelCount) * increment * -1;
      carousel.style[transformProp] = 'translateZ(-288px) rotateY(' + theta + 'deg)';
   };

   // left.addEventListener('click', onNavButtonClick, false);
   // right.addEventListener('click', onNavButtonClick, false);

   left.onclick = onNavButtonClick;
   right.onclick = onNavButtonClick;

   var onCarouselClick = function(event) {
      console.log('MediaWiki:Common.js/Test.js: onCarouselClick');
      var popupId = event.target.getAttribute('data-popup');

      if (popupId === null) {
         popupId = event.target.parentNode.getAttribute('data-popup');

         if (popupId === null)
            return;
      }

      var popup = document.getElementById(popupId);

      if (popup === null)
         return;

      $(popup).removeClass('hidden');

      var fade = document.getElementById('profile-fade');

      if (fade !== null)
         $(fade).removeClass('hidden');
   };

   for (var i = 0; i < panelCount; i ++) {
      var child = carousel.children[i];

      // child.addEventListener('click', onCarouselClick, false);
      child.onclick = onCarouselClick;

      for (var j = 0; j < child.children.length; j ++)
         child.children[j].addEventListener('click', onCarouselClick, false);
   }

   var onPopupClick = function(event) {
      console.log('MediaWiki:Common.js/Test.js: onPopupClick');
      var popups = document.getElementsByClassName('white-content');

      for (var i = 0; i < popups.length; i ++)
         $(popups[i]).addClass('hidden');

      var fade = document.getElementById('profile-fade');

      if (fade !== null)
         $(fade).addClass('hidden');
   };

   var popups = document.getElementsByClassName('white-content');

   for (var i = 0; i < popups.length; i ++)
      // popups[i].addEventListener('click', onPopupClick, false);
      popups[i].onclick = onPopupClick;

   var fade = document.getElementById('profile-fade');

   if (fade !== null)
      // fade.addEventListener('click', onPopupClick, false);
      fade.onclick = onPopupClick;

   function _numConvert(n) {
      if (n < 1 || n > 59)
         return 'sixty';
      else if (n === 10)
         return 'ten';
      else if (n === 11)
         return 'eleven';
      else if (n === 12)
         return 'twelve';
      else if (n === 13)
         return 'thirteen';
      else if (n === 15)
         return 'fifteen';
      else if (n === 18)
         return 'eighteen';

      var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
      var tens = ['%s', '%steen', 'twenty%s', 'thirty%s', 'forty%s', 'fifty%s'];

      var one = ones[n % 10];
      var ten = tens[Math.floor(n / 10)];

      return ten.replace('%s', one);
   }
}

addOnloadHook(activateSpottraProfileButtons);