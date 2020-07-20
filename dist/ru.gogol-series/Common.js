 /* Автоматическая выдача плашек по числу правок участника */
!function( $ ) {
    if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
        var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, '')) || 0;
            title = '';
        if (editCount <= 50) {
            title = "Писарь";
        } else if (editCount > 50 && editCount <= 100) {
            title = "Стенографъ";
        } else if (editCount > 100 && editCount <= 200) {
            title = "Архиварiусъ";
        } else if (editCount > 200 && editCount <= 300) {
            title = "Экспедиторъ";
        } else if (editCount > 300 && editCount <= 400) {
            title = "Регистраторъ";
        } else if (editCount > 400 && editCount <= 500) {
            title = "Статсъ-Секретарь";
        } else if (editCount > 500 && editCount <= 700) {
            title = "Титулярный совѣтникъ";
        } else if (editCount > 700 && editCount <= 900) {
            title = "Коллежскiй Асcесоръ";
        } else if (editCount > 900 && editCount <= 1500) {
            title = "Церемоніймейстеръ";
        } else if (editCount > 1500 && editCount <= 2000) {
            title = "Коллежскiй Совѣтникъ";
        } else if (editCount > 2000 && editCount <= 3000) {
            title = "Статскiй Совѣтникъ";
        } else if (editCount > 3000 && editCount <= 5555) {
            title = "Тайный Совѣтникъ";
        } else {
            title = "Канцлѣръ";
        }
        $('<span />', {
            class: 'tag',
            text: title
        }).appendTo('.masthead-info hgroup');
    }
}( this.jQuery );
 
 // *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
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
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дней, ' + left;
    }
  }
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