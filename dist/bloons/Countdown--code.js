// *****************************************************
// * Javascript Countdown Timer                        *
// * Version 1.6.0                                     *
// *                                                   *
// * Original script by Splarka                        *
// * Additional script by Eladkse                      *
// * Multi-language support script by Dantman          *
// *****************************************************
//
// Usage Example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2013 00:00:00 GMT</span> until the new year...
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
//  <span class="nomorecountdown">Countdown finished.</span>
//
// Output Example:
//  Only 25 days, 6 hours, 42 minutes and 23 seconds until the new year...
//
 
function updatetimer(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  var userconfig = (window.CountdownConfig) ? window.CountdownConfig : {};
  var config = $.extend(true, {
    'en': {
      and: "and",
      second: "second",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days"
    },
    'fr': {
      and: "et",
      second: "seconde",
      seconds: "secondes",
      minute: "minute",
      minutes: "minutes",
      hour: "heure",
      hours: "heures",
      day: "jour",
      days: "jours"
    },
    'es': {
      and: "y",
      second: "segundo",
      seconds: "segundos",
      minute: "minuto",
      minutes: "minutos",
      hour: "hora",
      hours: "horas",
      day: "día",
      days: "días"
    },
    'de': {
      and: "und",
      second: "Sekunde",
      seconds: "Sekunden",
      minute: "Minute",
      minutes: "Minuten",
      hour: "Stunde",
      hours: "Stunden",
      day: "Tag",
      days: "Tage"
    },
    'it': {
      and: "e",
      second: "secondo",
      seconds: "secondi",
      minute: "minuto",
      minutes: "minuti",
      hour: "ora",
      hours: "ore",
      day: "giorno",
      days: "giorni"
    },
    'pl': {
      and: "i",
      second: "sekund(y)",
      seconds: "sekund(y)",
      minute: "minut(y)",
      minutes: "minut(y)",
      hour: "godzin(y)",
      hours: "godzin(y)",
      day: "dni",
      days: "dni"
    },
    'hu': {
      and: "és",
      second: "másodperc",
      seconds: "másodpercek",
      minute: "perc",
      minutes: "percek",
      hour: "óra",
      hours: "órák",
      day: "nap",
      days: "napok"
    }
  }, userconfig);
 
  // define language
  function msg(name) {
    if ( wgContentLanguage in config && name in config[wgContentLanguage] ) {
      return config[wgContentLanguage][name];
    }
    return config.en[name];
  }
 
  // stop the script when the even date is reached and display the notification
  if (then<now) {
 var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'none'
  var nomorecountdowns = getElementsByClassName(document, 'span', 'nomorecountdown');
  for(var i in nomorecountdowns) nomorecountdowns[i].style.display = 'inline'
  return;
  }

  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
  

 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
  }
 
  // calculate the diff
  // seconds
  left = (diff%60) + ' ' + msg(($(diff%60)[0] == 1) ? 'second' : 'seconds');
 
  // minutes
  diff = Math.floor(diff/60);
  left = (diff%60) + ' ' + msg(($(diff%60)[0] == 1) ? 'minute' : 'minutes') + ', ' + msg('and') + ' ' + left;
 
  // hours
  diff = Math.floor(diff/60);
  left = (diff%24) + ' ' + msg(($(diff%24)[0] == 1) ? 'hour' : 'hours') + ', ' + left;
 
  // days
  diff = Math.floor(diff/24);
  left = diff + ' ' + msg(($(diff)[0] == 1) ? 'day' : 'days') + ', ' + left;
 
  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
}
 
function checktimers() {
  // hide 'nocountdown' and 'nomorecountdown' and show 'countdown'
  var nomorecountdowns = getElementsByClassName(document, 'span', 'nomorecountdown');
  for(var i in nomorecountdowns) nomorecountdowns[i].style.display = 'none'
  var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
  for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
  var countdowns = getElementsByClassName(document, 'span', 'countdown');
  for(var i in countdowns) countdowns[i].style.display = 'inline'
 
  // set up global objects timers and timeouts.
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
//  End of Code                                     *
// **************************************************
//