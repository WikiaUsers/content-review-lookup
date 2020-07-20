/* Any JavaScript here will be loaded for all users on every page load. */

// install [[User:Cacycle/wikEdDiff]] enhanced diff view using ajax
document.write('<script type="text/javascript" src="'
+ 'http://en.wikipedia.org/w/index.php?title=User:Cacycle/wikEdDiff.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s"></script>')

/* Auto updating recent changes
 * See w:c:dev:AjaxRC for info & attribution 
 */

importScriptPage('AjaxRC/code.js', 'dev');

/** additional scripts (c) User:Poke, released under GFDL **/
if ( wgIsArticle || window.location.href.indexOf( 'action=submit' ) > -1 )
{
  addScript( 'MediaWiki:CollapsibleTables.js' );
  hookEvent( 'load', function()
  {
    new CollapsibleTables();
});

}
/**** function addScript.js
 * by Patrick Westerhoff [poke]
 */
function addScript ( pagename )
{
  var script  = document.createElement( 'script' );
  pagename    = encodeURI( pagename.replace( ' ', '_' ) );
  script.src  = '/index.php?title=' + pagename + '&action=raw&ctype=text/javascript';
  script.type = 'text/javascript';
  
  document.getElementsByTagName( 'head' )[0].appendChild( script );
}


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
    var tpm = ' ';
  } else {
    var tpm = ' ';
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

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

/* Adds "purge" option to page controls
 * See w:c:dev:PurgeButton for info & attribution 
 */

importScriptPage('PurgeButton/code.js', 'dev');

/* DisableArchiveEdit
 * See w:c:dev:DisableArchiveEdit
 */

var DisableArchiveEditConfig = { 
   textColor: '#000000',
};
importScriptPage('DisableArchiveEdit/code.js', 'dev');

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */
 
if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if( !document.getElementById('old-forum-warning') )
		return;
 
	if( skin == 'oasis' )
	{
		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href' );
		$('#WikiaPageHeader .wikia-button').html('Archived').removeAttr('href');
		return;
	}
 
	if( !document.getElementById('ca-edit') )
		return;
	var editLink = null;
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
	else
	{
		return;
	}
 
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = '#D9D9D9';
	editLink.innerHTML = 'Archived';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/** End of Archive edit tab disabling *
 */

/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/*** UserTags by Lunarity
 * UserTags is a script that can add, remove, modify and rearrange the tags on User pages
 * (The "Founder", "Admin", "Blocked", etc. tags that appear next to user's names in their masthead).
 * It allows you to add tags in addition to the Wikia default ones and to rearrange and remove them as desired.
 * You can also invent custom ones to award to users for whatever reason you deem appropriate. 
 */

// Core config
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { order: -5 },
		sysop: { order: -4 },
		rollback: { u:'Rollback', order: -3 },
		//patroller: { order: -2 },
		chatmoderator: { order: -1 },
		bot: { u:'Bot', order: -1 },
		hamster: { u:'Bartender', order: -4 },
		dev: { u:'Lionhead Dev', order: -1 },
		'inactive-bureaucrat': { u:'Former Bureaucrat', order: -4 },
		'sysop-bot': { u:'Bot (sysop)', order: -1 }
	}
};

// Modules
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.custom = {
	'Enodoc': ['bureaucrat'],
	'Enobot': ['bot'],
	'AidanBloodline': ['bureaucrat']
};
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove Sysop tag from B'crats
	bureaucrat: ['founder'], // Remove B'crat tag from Founder
	chatmoderator: ['sysop', 'bureaucrat', 'rollback'] // Remove Chatmod tag from Sysops, B'crats and Rollbacks
};
UserTagsJS.modules.implode = {
	'inactive-bureaucrat': ['bureaucrat', 'inactive'], // Combine Inactive Bureaucrats
	'sysop-bot': ['bot', 'sysop'] // Combine Admin Bots
};

// Script import
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*** Gamemaster highlighting by Fubuki and Penguin-Pal
 * Highlights comments made by blog creators on their own posts with a special background.
 * Customization found in Common.css
 */
(function() {
	if (mw.config.get("wgNamespaceNumber") === 500) {
		var creator = $('.author-details .post-author a').text();
		function addClass() {
			$('li[data-user="' + creator + '"] > blockquote').addClass('self-comm');
		}
		addClass();
		$("body").on("DOMNodeInserted", 'ul[id="article-comments-ul"]', function() {
			addClass();
		});
	}
})();