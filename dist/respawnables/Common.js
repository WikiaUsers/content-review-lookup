/* InactiveUsers */
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = {months: 2}; 

importArticles({
    type: 'script',
    articles: [
        'u:dev:DisplayClock/code.js',
        'u:dev:QuickDelete/code.js',
        'u:dev:RevealAnonIP/code.js',
        'w:dev:WallGreetingButton/code.js',
        'u:dev:BackToThread/code.js',
        'u:dev:UserTags/code.js'
    ]
});


// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
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
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
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


//User Tags -------
/*Countdown Timer*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
/*Display list of admins by adding the id="admin-list" on a container"*/
importScriptPage('ListAdmins/code.js', 'dev');


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }

$( UserNameReplace );

/*Twitter Widget*/
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));

/*Wikia Module*/
$(window).load(function() {
    var newModule = '<div class="main"><wikiaforum/></div>';
    $('#WikiaRail').append(newModule);
});
//Forum Tags for Staff
jQuery(function($) {
    "use strict";
 
    // Tag users in the new forums
    // Orginal script (http://dev.wikia.com/wiki/MessageWallUserTags/code.js)
 
    var users = {
        // Tag all bureaucrats
        Jacky_50A: 'Bureaucrat',
        Darkangel12S: 'Bureaucrat',
        Dan67: 'Bureaucrat',
 
        // Administrators
        NoobxNoob: 'Admin',
        LordHazanator: 'Admin',
        Kumatora0203: 'Admin',
        Classified12: 'Admin',
        Aidanha: 'Admin',
        TheMCGamer: 'Admin',
        HazzaBuzz15: 'Admin',
        Bane64: 'Admin',
        Activerios: 'Admin',
        DivergenceKills: 'Admin',
        Agent_4T7: 'Admin',
        RebornDan: 'Admin',
        BlitzForever: 'Admin',
 
        // Moderators
        HulkSmashU: 'Moderator',
        Yarrrr: 'Moderator',
    };
 
    $.each(users, function(name, v) {
        $('<span class="ForumTags"></span>')
            .text('(' + v + ')')
            .insertAfter($('a.subtle[href$="Message_Wall:' + name.replace(/(["])/g, '\\$1') + '"]'));
    });
});