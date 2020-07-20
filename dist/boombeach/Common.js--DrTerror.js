function timeStamp_DrTerror_js() {
   return '2015.03.04 17:57 (UTC-8)';
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

   function updateTerrorWidget(tZoneOffset, cTerrorZone, w) {
      if (!w)
         w = $('#dr-terror-activity').get(0);

      if (!w)
         return;

      var sActivity      = $(w).find('span.activity').get(0);
      var sTimeRemaining = $(w).find('span.time-remaining').get(0);
      var dTerrorZoneSet = $(w).find('#dr-terror-activity-timezone').get(0);
      var now            = new Date();
    
      // Terror base: midnight GMT Wednesday (weekday === 3), ends in 24 hours, offset by tZoneOffset
      var startTerror = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + ((now.getUTCDay() > 3 ? 10 : 3) - now.getUTCDay()), 0, 0, 0, 0));
      startTerror.setHours(startTerror.getHours() + tZoneOffset);

      // If the new Terror event is more than 6 days away, subtract a week (we're still in the last one)
      // However, don't do it directly, as sometimes (i.e. DST) next week isn't exactly 7 days away.
      if ((startTerror - now) > 6 * 1000 * 60 * 60 * 24)
         startTerror = new Date(Date.UTC(startTerror.getUTCFullYear(), startTerror.getUTCMonth(), startTerror.getUTCDate() - 7, startTerror.getUTCHours(), 0, 0, 0));

      // Volcano base: midnight GMT Saturday (weekday == 6), ends in 24 hours, offset by tZoneOffset
      var startVolcano = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + ((now.getUTCDay() > 6 ? 10 : 6) - now.getUTCDay()), 0, 0, 0, 0));
      startVolcano.setHours(startVolcano.getHours() + tZoneOffset);

      // If the new Volcano event is more than 6 days away, subtract a week (we're still in the last one)
      // However, don't do it directly, as sometimes (i.e. DST) next week isn't exactly 7 days away.
      if ((startVolcano - now) > 6 * 1000 * 60 * 60 * 24)
         startVolcano = new Date(Date.UTC(startVolcano.getUTCFullYear(), startVolcano.getUTCMonth(), startVolcano.getUTCDate() - 7, startVolcano.getUTCHours(), 0, 0, 0));

      // Compute the end times
      var endTerror = new Date(startTerror.getTime());
      endTerror.setHours(endTerror.getHours() + 24);
      var endVolcano = new Date(startVolcano.getTime());
      endVolcano.setHours(endVolcano.getHours() + 24);

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
         w.className = event.toLowerCase();
         sActivity.innerHTML = 'At ' + event + ' Base!';
         sTimeRemaining.innerHTML = 'Time Remaining: ' + remaining;
      }
      else {
         w.className = '';
         sActivity.innerHTML = 'Inactive';
         sTimeRemaining.innerHTML = 'Next Event: ' + nextEvent;
      }

      dTerrorZoneSet.className = classTerrorZone;

      if (cTerrorZone === 'timezone-unset')
         dTerrorZoneSet.innerHTML = 'Terror Zone Not Set! &nbsp; &nbsp; Click Here to Set';
      else
         dTerrorZoneSet.innerHTML = 'Terror Zone: &nbsp; ' + abbreviations[terrorZoneOffset];
   }

   function selectTerrorZoneAjax() {
      var radioButtons = '';
      var keys = [];

      for (var k in offsets) {
         if (offsets.hasOwnProperty(k))
            keys.push(k);
      }

      keys.sort(function(a, b){return a-b});

      for (var i = 0; i < keys.length; i++) {
         k = keys[i];
         radioButtons += '<div><input type="radio" name="terrorzone" value="' + k + '"';

         if (classTerrorZone !== 'timezone-unset' && ('' + terrorZoneOffset) === k)
            radioButtons += ' checked="true"';

         radioButtons += '> ' + offsets['' + k] + '</input></div>';
      }

      var display1, display2, displayText = '';

      if (classTerrorZone === 'timezone-unset') {
         display1 = 'block';
         display2 = 'none';
      }
      else {
         display1    = 'none';
         display2    = 'block';
         displayText = offsets['' + terrorZoneOffset];
      }

      var content = '\
<div style="font-family: Montserrat; width: 485px; margin: 5px auto;">\
    <div style="font-size: 150%; font-weight: bold; text-align: center; height: 4em;">\
        <div style="display: ' + display1 + '; color: red;"><br/>Your current Terror Zone is not set!</div>\
        <div style="display: ' + display2 + '; font-size: 66%;">Your current Terror Zone is set to:\
            <br/> <span style="font-size: 150%; color: rgba(148,0,211,1); font-weight: bold;">' + displayText + '</span>\
        </div>\
    </div>\
    <div>Please choose from the following options:</div>\
    <div style="border: 1px solid rgba(148,0,211,1); padding: 1em; line-height: 2em; margin-top: 1em; font-size: 85%;">\
        ' + radioButtons + '\
    </div>\
</div>\
';

      if ($('#select-terror-zone').length === 0) {
         var ajaxform = '\
            <form method="" name="" class="WikiaForm"> \
               <div id="select-terror-zone" style="width: 495px; border: 3px solid black; word-wrap: break-word;"/> \
            </form>';

         $.showCustomModal('Select Terror Zone', ajaxform, {
            id: 'terror-page-viewer',
            width: 500,
            buttons: [
               {
                  message: 'Save',
                  handler: function() {
                     var frm      = $('#terror-page-viewer').find('form').get(0);
                     var selected = false;

                     for (var i = 0; i < frm.terrorzone.length; i ++) {
                        if (frm.terrorzone[i].checked) {
                           selected = true;
                           terrorZoneOffset = parseInt(frm.terrorzone[i].value);
                           classTerrorZone  = '';
                           break;
                        }
                     }
                    
                     if (selected) {
                        saveStorageValue('DrTerror', 'timezone-offset', '' + terrorZoneOffset);
                        updateTerrorWidget(terrorZoneOffset, classTerrorZone);
                        $('#terror-page-viewer').closeModal();
                     }
                     else
                        alert('Please select an option.');
                  }
               },
               {
                  message: 'Cancel',
                  handler: function() {
                     $('#terror-page-viewer').closeModal();
                  }
               }
            ]
         });

         $('#select-terror-zone').html(content);
      }
      else
         $('#select-terror-zone').html(content);
   }

   // Define offsets
   var offsets = {
      '-2': 'Japan, Korea, Australia, Vietnam, Thailand, Philippines, Malaysia, Indonesia',
      '-1': 'China',
       '0': 'United States, Canada, Brazil, Mexico',
       '1': 'United Kingdom, France, Germany, Russia, Italy',
       '2': 'Everywhere else'
   };

   var abbreviations = {
      '-2': 'JP, KR, AU, VN, TH, PH, MY, ID',
      '-1': 'CN',
       '0': 'US, CA, BR, MX',
       '1': 'GB, FR, DE, RU, IT',
       '2': 'Everywhere else'
   };

   // Get the time zone offset value, if it exists
   var terrorZoneOffset = retrieveStorageValue('DrTerror', 'timezone-offset');
   var classTerrorZone  = '';

   if (terrorZoneOffset === '') {
      // No time zone offset currently exists; default to 0 but notify user to set one
      terrorZoneOffset = 0;
      classTerrorZone  = 'timezone-unset';
   }
   else {
      // Convert to a number
      terrorZoneOffset = parseInt(terrorZoneOffset, 10);
      classTerrorZone  = 'timezone-set';

      // Save storage value to reset the expiration timer
      saveStorageValue('DrTerror', 'timezone-offset', '' + terrorZoneOffset);
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

   var divTerrorZoneSet = document.createElement('div');
   divTerrorZoneSet.id = 'dr-terror-activity-timezone';
   divTerrorZoneSet.title = 'Click here to set Terror Zone';
   divTerrorZoneSet.style.cursor = 'pointer';
   $(divTerrorZoneSet).disableSelection();
   widget.appendChild(divTerrorZoneSet);

   divTerrorZoneSet.onclick = function() {
      selectTerrorZoneAjax();
   };

   // Calculate which widget we should show
   updateTerrorWidget(terrorZoneOffset, classTerrorZone, widget);

   // Now find the appropriate spot in the rail to add the widget
   return divParent.insertBefore(widget, divBefore);
}

addOnloadHook(createDrTerrorWidget);