/* Any JavaScript here will be loaded for all users on every page load. */

// **************************************************
// Broken World Seasons Converter ver. 2.2
// Adapted from:
//   Experimental javascript countdown timer (Splarka)
//   Version 0.0.3
//   http://community.wikia.com/wiki/Forum:How_do_I_add_a_countdown_clock_to_a_Wiki%3F
// **************************************************
//
// One Real Year is assumed to be 31556922 SI Seconds. This is based on the Solar Year, and divides nicely by 6.
// Solar-based calendars may be off until standard calendars have leap-moments
//
// In-wiki script usage example:
//    <span class="season" style="display:none;">
//    Only <span class="seasondate">January 01 2007 00:00:00 PST</span> until New years.
//    </span>
//    <span class="noseason">Javascript disabled.</span>

function updateSeasonTimer() {
  var timeOffset = 1481587200;         // Seconds added to account for starting time
  var yearOffset = 266;               // Years added to adjust year count
  var yearDivisor = 4838400;           // One in-game year in seconds
  // yearDivisor = 4854911 is the true solar year divisor
  var monthDivisor = yearDivisor / 12; // One in-game month in seconds
  var dayDivisor = monthDivisor / 28;  // One in-game day in seconds
 
  var newNow = new Date();  // Current date
  var nowMillis = newNow.getTime();
  var nowSeconds = Math.floor(nowMillis / 1000) // Current actual-time in real-time seconds
 
  // calculate the current seasonal date
  var adjustedTime = nowSeconds - timeOffset;
  var year = Math.floor(adjustedTime / yearDivisor) + yearOffset;
 
  var numberMonth = Math.floor(adjustedTime / monthDivisor) % 12;
  var month;
  var season;
  if (numberMonth === 0) {
      month = "Granite";
      season = "Spring";
  } else if (numberMonth == 1) {
      month = "Felsite";
      season = "Spring";
  } else if (numberMonth == 2) {
      month = "Slate";
      season = "Spring";
  } else if (numberMonth == 3) {
      month = "Hematite";
      season = "Summer";
  } else if (numberMonth == 4) {
      month = "Malachite";
      season = "Summer";
  } else if (numberMonth == 5) {
      month = "Galena";
      season = "Summer";
  } else if (numberMonth == 6) {
      month = "Limestone";
      season = "Autumn";
  } else if (numberMonth == 7) {
      month = "Sandstone";
      season = "Autumn";
  } else if (numberMonth == 8) {
      month = "Timber";
      season = "Autumn";
  } else if (numberMonth == 9) {
      month = "Moonstone";
      season = "Winter";
  } else if (numberMonth == 10) {
      month = "Opal";
      season = "Winter";
  } else {
      month = "Obsidian";
      season = "Winter";
  }
 
  var day = Math.floor(adjustedTime / dayDivisor) % 28;
  if (day === 0) day = 28;
  if (day == 1) day = day + "st";
  else if (day == 2) day = day + "nd";
  else if (day == 3) day = day + "rd";
  else if (day == 21) day = day + "st";
  else if (day == 22) day = day + "nd";
  else if (day == 23) day = day + "rd";
  else day = day + "th";
 
  return ' ' + day + ' ' + month + ', ' + season + ' ' + year;
}
 
function checkSeasonTimers() {
  //find all global 'timer' objects
  timers = getElementsByClassName(document, 'span', 'seasondate');  //global
  if(timers.length === 0) return;
 
  //hide 'noseason' and show 'season'
  var noSeasons = getElementsByClassName(document, 'span', 'noseason');
  for(var i in noSeasons) noSeasons[i].style.display = 'none';
  var seasons = getElementsByClassName(document, 'span', 'season');
  for(var k in seasons) seasons[i].style.display = 'inline';
 
  //run the season calculator
  for(var j in timers) {
    timers[j].innerHTML = updateSeasonTimer();
  }
}
 
$(checkSeasonTimers);


// **************************************************
//  - end -  Broken World Seasons Converter
// **************************************************

/* Old time calculator
class MinecraftGenerator:
    def seasons(self):
        '''This function determines the current date for the Minecraft server. For some reason.'''
        preCalc = int(time.time())
        baseCalc = (preCalc - 1481587200)
        Year = 5116 + (baseCalc-(baseCalc%4838400))/4838400
        
        baseMonth = ((baseCalc-(baseCalc%403200))/403200)%12
        if baseMonth == 0:
            Month = "Granite"
        elif baseMonth == 1:
            Month = "Felsite"
        elif baseMonth == 2:
            Month = "Slate"
        elif baseMonth == 3:
            Month = "Hematite"
        elif baseMonth == 4:
            Month = "Malachite"
        elif baseMonth == 5:
            Month = "Galena"
        elif baseMonth == 6:
            Month = "Limestone"
        elif baseMonth == 7:
            Month = "Sandstone"
        elif baseMonth == 8:
            Month = "Timber"
        elif baseMonth == 9:
            Month = "Moonstone"
        elif baseMonth == 10:
            Month = "Opal"
        else:
            Month = "Obsidian"
        
        baseSeason = ((baseCalc-(baseCalc%1209600))/1209600)%4
        if baseSeason == 0:
            Season = "Spring"
        elif baseSeason == 1:
            Season = "Summer"
        elif baseSeason == 2:
            Season = "Autumn"
        else:
            Season = "Winter"
        
        Day = ((baseCalc-(baseCalc%14400))/14400)%28
        if Day == 0:
            Day == 28
        else:
            Day == Day
                
        return ''.join(["It is day ", str(int(Day)), " of the month of ", str(Month), " in the year ", str(int(Year)), "\nThe season is ", str(Season)])
*/