// *****************************************************
// * Javascript CountUp Timer for Days                 *
// * Version 1.0.0                                     *
// *                                                   *
// * Original script by Splarka                        *
// * Additional script by WieQuadrat                   *
// *****************************************************

function updateagedays(i) {
  var now = new Date();
  var then = timers[i].eventdate;
  var diff = Math.floor((then.getTime()-now.getTime())/1000);
 
  var userconfig = (window.CountdownConfig) ? window.CountdownConfig : {};
  var config = $.extend(true, {
    'en': {
      and: "and",
      day: "day",
      days: "days"
    },
    'fr': {
      and: "et",
      day: "jour",
      days: "jours"
    },
    'es': {
      and: "y",
      day: "día",
      days: "días"
    },
    'de': {
      and: "und",
      day: "Tag",
      days: "Tage"
    },
    'it': {
      and: "e",
      day: "giorno",
      days: "giorni"
    },
    'pl': {
      and: "i",
      day: "dni",
      days: "dni"
    },
    'hu': {
      and: "és",
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
 
  // catch bad date strings
  if(isNaN(diff)) { 
    timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
    return;
  }
  // catch Date Not Yet Passing Current Time
  if(diff>=0) { 
    timers[i].firstChild.nodeValue = '** Future Date Time**' ;
    return;
  }
 
  // determine plus/minus
  if(diff<0) {
    diff = -diff;
  }
 
  // calculate the diff in Days for Age 
  // seconds
  //left = (diff%60) + ' ' + msg(($(diff%60)[0] == 1) ? 'second' : 'seconds');
 
  // minutes
  diff = Math.floor(diff/60);
  //left = (diff%60) + ' ' + msg(($(diff%60)[0] == 1) ? 'minute' : 'minutes') + ', ' + msg('and') + ' ' + left;
 
  // hours
  diff = Math.floor(diff/60);
  //left = (diff%24) + ' ' + msg(($(diff%24)[0] == 1) ? 'hour' : 'hours') + ', ' + left; 
 
  // days
  diff = Math.floor(diff/24);
  //left = diff + ' ' + msg(($(diff)[0] == 1) ? 'day' : 'days') ;

  //this is a hardcoded for using 'd' as 'days', if possible use a paramater in the future
  left = diff + 'd' ;

  timers[i].firstChild.nodeValue = left;
 
  // a setInterval() is more efficient, but calling setTimeout()
  // makes errors break the script rather than infinitely recurse
  timeouts[i] = setTimeout('updateagedays(' + i + ')',1000);
}

function checkagedays() {
  // hide 'nocountup' and show 'countup'
  var nocountups = getElementsByClassName(document, 'span', 'nocountup');
  for(var i in nocountups) nocountups[i].style.display = 'none'
  var countups = getElementsByClassName(document, 'span', 'countup');
  for(var i in countups) countups[i].style.display = 'inline'
 
  // set up global objects timers and timeouts.
  timers = getElementsByClassName(document, 'span', 'countupdate');  //global
  timeouts = new Array(); // generic holder for the timeouts, global
  if(timers.length == 0) return;
  for(var i in timers) {
    timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
    updateagedays(i);  //start it up
  }
}
addOnloadHook(checkagedays);
// **************************************************
//  End of Code                                     *
// **************************************************

// ============================================================
// For Collapsible , tutorial in http://dev.wikia.com/wiki/ShowHide
importScriptPage('ShowHide/code.js', 'dev');


// ============================================================
// unmasks "A Wikia contributor" so that their actual IP address can be seen. 
// see = http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['user']
};
//importScriptPage('RevealAnonIP/code.js', 'dev'); //-> see import articles below

// ============================================================
// create a widget to lists all of the admins in the wiki. 
// see = http://dev.wikia.com/wiki/ListAdmins
importScriptPage('ListAdmins/code.js', 'dev');

// ============================================================
// Add back to Top Arrow in the Oasis Footer area.
// see = http://dev.wikia.com/wiki/BackToTopArrow
importScriptPage('BackToTopArrow/code.js', 'dev');

// ============================================================
// userRightIcons for new user status in the user profiles.
// See comments by DV Admin = http://community.wikia.com/wiki/User_blog_comment:Sactage/Technical_Update:_August_28,_2012/@comment-Essiw-20120829151348/@comment-Rappy_4187-20120829152002?permalink=422546#comm-422546
importScriptPage('MediaWiki:Common.js/userRightsIcons.js');

// ============================================================
// Create a snow, testing by seeing TC page in Wikia.js
// see discussion in http://community.wikia.com/wiki/Thread:472267
//importScriptPage('MediaWiki:Snow.js', 'c');
//importArticle({type:'script', article:'u:w:MediaWiki:Snow.js'});

// ============================================================
// Floating TOC . see http://dev.wikia.com/wiki/FloatingToc
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js',
        'w:c:dev:RevealAnonIP/code.js'
    ]
});