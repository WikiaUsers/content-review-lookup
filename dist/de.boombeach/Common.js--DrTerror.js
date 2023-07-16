function timeStamp_DrTerror_js() {
   return '2014.06.04 17:03 (UTC-7)';
}
 
function createDrTerrorWidget() {
   function timeDiff(time1, time2) {
      // Time comes in milliseconds, but we just want the difference in days, hours and minutes,
      // and don't care which one is higher
      var diff     = Math.floor(Math.abs(time1 - time2) / (1000 * 60));
      var divisors = [24 * 60,  60,   1];
      var abbrevs  = [    'd', 'h', 'm'];
 
      for (i = 0; i < divisors.length; i ++) {
         var remainder = diff - Math.floor(diff / divisors[i]) * divisors[i];
 
         if (diff > remainder || i === divisors.length - 1)
            abbrevs[i] = ((diff - remainder) / divisors[i]) + abbrevs[i];
         else
            abbrevs[i] = '';
 
         diff = remainder;
      }
 
      while (abbrevs.length > 1 && !abbrevs[0])
         abbrevs.shift();
 
      return abbrevs.join(' ');
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
      // If not, add it after the search box, as long as it's in the right rail
      var divRail  = document.getElementById('WikiaRail');
      var divAfter = null;
 
      if (divRail !== null)
         divAfter = divRail.getElementsByClassName('WikiaSearch')[0];
 
      if (typeof divAfter !== 'undefined' && divAfter !== null) {
         divParent = divAfter.parentNode;
         divBefore = divAfter.nextSibling;
      }
      else if (divRail !== null) {
         // If we didn't find a search box in the right rail, but we at least found
         // a right rail, add it to the top.
         divParent = divRail;
         divBefore = divRail.firstChild;
      }
   }
 
   if (divParent === null)
      return;
 
   var widget = document.createElement('div');
   widget.id = 'dr-terror-activity';
 
   var divImage = document.createElement('div');
   divImage.id = 'dr-terror-image';
   widget.appendChild(divImage);
 
   var divActivity = document.createElement('div');
   divActivity.id = 'dr-terror-activity-text';
   divActivity.innerHTML = 'Dr. Terror';
   widget.appendChild(divActivity);
 
   var br = document.createElement('br');
   divActivity.appendChild(br);
 
   var spanActivity = document.createElement('span');
   spanActivity.className = 'activity';
   divActivity.appendChild(spanActivity);
 
   var br = document.createElement('br');
   divActivity.appendChild(br);
 
   var spanTimeRemaining = document.createElement('span');
   spanTimeRemaining.className = 'time-remaining';
   divActivity.appendChild(spanTimeRemaining);
 
   // Calculate which widget we should show
   var now = new Date();
 
   // Terror base: midnight GMT Wednesday (weekday === 3), ends in 24 hours
   var startTerror = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + ((now.getUTCDay() > 3 ? 10 : 3) - now.getUTCDay()), 0, 0, 0, 0));
   var endTerror = new Date(Date.UTC(startTerror.getUTCFullYear(), startTerror.getUTCMonth(), startTerror.getUTCDate() + 1, 0, 0, 0, 0));
 
   // Volcano base: midnight GMT Saturday (weekday == 6), ends in 24 hours
   var startVolcano = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + ((now.getUTCDay() > 6 ? 10 : 6) - now.getUTCDay()), 0, 0, 0, 0));
   var endVolcano = new Date(Date.UTC(startVolcano.getUTCFullYear(), startVolcano.getUTCMonth(), startVolcano.getUTCDate() + 1, 0, 0, 0, 0));
 
   // The next (or current) event is the one with the earliest time
   var event     = (startVolcano < startTerror ? 'Volcano' : 'Terror');
   var remaining = '';
   var nextEvent = '';
 
   if (now > startTerror)
      // Terror base is currently happening
      remaining = timeDiff(endTerror, now);
   else if (now > startVolcano)
      // Volcano base is currently happening
      remaining = timeDiff(endVolcano, now);
   else if (event === 'Terror')
      // No event, but Terror base is next
      nextEvent = timeDiff(startTerror, now);
   else
      // No event, but Volcano base is next
      nextEvent = timeDiff(startVolcano, now);
 
   if (remaining) {
      widget.className = event.toLowerCase();
      spanActivity.innerHTML = 'In der ' + event + ' Basis!';
      spanTimeRemaining.innerHTML = 'Dauer: ' + remaining;
   }
   else {
      spanActivity.innerHTML = 'Inactive';
      spanTimeRemaining.innerHTML = 'Next Event: ' + nextEvent;
   }

   return divParent.insertBefore(widget, divBefore);
}
 
addOnloadHook(createDrTerrorWidget);