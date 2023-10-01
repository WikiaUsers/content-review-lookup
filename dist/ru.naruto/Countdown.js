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
    switch(diff%60%10){
      case 1:
        left = (diff%60) + ' секунда';
        break;
      case 2:
      case 3:
      case 4:
        left = (diff%60) + ' секунды';
        break;
      default:
        left = (diff%60) + ' секунд';
    }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    switch(diff%60%10){
      case 1:
        left = (diff%60) + ' минута, и ' + left;
        break;
      case 2:
      case 3:
      case 4:
        left = (diff%60) + ' минуты, и ' + left;
        break;
      default:
        left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    switch(diff%24%10){
      case 1:
        left = (diff%24) + ' час, ' + left;
        break;
      case 2:
      case 3:
      case 4:
        left = (diff%24) + ' часa, ' + left;
        break;
      default:
        left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    switch(diff%10){
      case 1:
        left = diff + ' день, ' + left;
        break;
      case 2:
      case 3:
      case 4:
        left = diff + ' дня, ' + left;
        break;
      default:
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