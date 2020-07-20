/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
// ************************************************ *****
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3 *
 // ************************************************ *****
 // Usage example:
 // <Span class="countdown" style="display:none;">
 // Only <span class="countdowndate">January січня 2007 00:00:00 PST</span> until New years.
 // </Span>
 // <Span class="nocountdown">Javascript disabled.</Span>
  
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
  
   // Catch bad date strings
   if(isNaN(diff)) {
     timers[i].firstChild.nodeValue = '**' + timers[i].eventdate + '**';
     return;
   }
  
   // Determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
  
   // Calculate the diff - Modified by Eladkse
  if ((diff% 60) == 1) {
    left = (diff% 60) + ' секунди';
  } else {
    left = (diff% 60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff> 0) {
    if ((diff% 60) == 1) {
      left = (diff% 60) + ' хвилина, і ' + left;
    } else {
      left = (diff% 60) + ' хвилин, і ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff> 0) {
    if ((diff% 24) == 1) {
      left = (diff% 24) + ' годину, ' + left;
    } else {
      left = (diff% 24) + ' годин, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff> 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' днів, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
  
   // A setInterval() is more efficient, but calling setTimeout()
   // Makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
 }
  
 function checktimers() {
   //Hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
  
   //Set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate'); //Global
   timeouts = new Array(); // Generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i); //Start it up
   }
 }
 addOnloadHook(checktimers);
  
 // ************************************************ **
 // - End - Experimental javascript countdown timer
 // ************************************************ **