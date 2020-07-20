//Message wall usertags config
window.MessageWallUserTags = {
    tagColor: 'green',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'L0LAD': 'Founder'
    }
};

//lock old blogs config
window.LockOldBlogs = {
    expiryDays: 90,
    expiryMessage: "Personne n'a commenté ce billet de blog depuis <expiryDays> jours, il est donc considéré comme archivé.",
    nonexpiryCategory: "Never archived blogs"
};

//Usertags config
window.UserTagsJS = {
	modules: {},
	tags: {
sysop: { u: 'Leader des Blocards' },
rollback: { u: 'Coffreur' },
bureaucrat: { u: 'Assistant Directeur du WICKED' },
}
};
UserTagsJS.modules.isblocked = true;

UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'rollback', 'bureaucrat',];

UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true
};
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'],
};
UserTagsJS.modules.autoconfirmed = true;



// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'chatmoderator']
};
 
//lock forums config 
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "Ce forum n'a pas été commenté depuis <expiryDays> jours, il est donc considéré comme archivé.",
    forumName: "Forum Board" 
};

//ajax rc config
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
//script imports

window.importArticles( {
    type: 'script',
    articles: [
 
        'u:dev:DisableBotMessageWalls/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js',
       'u:dev:FixWantedFiles/code.js', 
        'w:dev:WallGreetingButton/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:BackToTopButton/code.js',
        "w:c:dev:LockForums/code.js",
        'u:dev:AjaxRC/code.js',
        'u:dev:Loadables/JQueryMobile.js',
        'u:dev:DisplayClock/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:VisualSpellCheck/code.js',
        'u:dev:MessageBlock/code.js',
    ]
} );


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

//Usertags config
window.UserTagsJS = {
	modules: {},
	tags: {
founder: { u:'Chancelier du WICKED' },
sysop: { u:'Leader des Blocards'},
rollback: { u:'Coffreur' },
bureaucrat: { u: 'Assistant Directeur du WICKED' },
}
};

UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true
};

// Countdown Timer
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
    var tpm = '-';
  } else {
    var tpm = ' Encore ';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' secondes, ';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes, ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' heures, ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' jours ' + left
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

/* Auto Refresh */
 
AjaxRCRefreshText = 'Auto-actualisation';  
AjaxRCRefreshHoverText = 'Actualise automatiquement la page';  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
nullEditDelay = 1000;