importScriptPage('ShowHide/code.js', 'dev');

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

$(function() {
  $('.newcategory').addClass('new');
});

/* Adds "purge" option to page controls
 * See w:c:dev:PurgeButton for info & attribution 
 */

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

/* Disable comments for specified pages without disabling feature
 * by: [[User:The 888th Avatar|The 888th Avatar]], with additions by [[User:Hasdi|Hasdi]], based on code by [[User:Pecoes|Pecoes]]
 */

/* Korra */

function  isCategoryBlacklisted (blacklist) {
	for (var i = 0; i < wgCategories.length; i++)
		if (-1 < $.inArray(wgCategories[i], blacklist ))
			return true;
	return false;
}
 
$(function() {
	if (isCategoryBlacklisted(["Cast", "Characters"]) && wgTitle !== "Aang" && wgTitle !== "Katara" && wgTitle !== "Sokka" && wgTitle !== "Toph Beifong") {
		$('.WikiaArticleComments #article-comments').remove();
	}
});

$(function() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="15" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
});

/* Thank you to the Sam & Cat Wiki and Dev Wiki! */
importScriptPage('FloatingToc/code.js', 'dev');

importScriptPage('SpellCheckModule/code.js', 'dev');

// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 30,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		css: { u:'CSS', order: 101 },
		javascript: { u:'JavaScript', order: 102 }
	}
};

UserTagsJS.modules.custom = {
	'Mimi1239': ['bureaucrat'],
        'Berserker Eric': ['bureaucrat'],
        'Zannabanna': ['bureaucrat'], 
        'Flyna4eva': ['bureaucrat'],
        'Chase McFly': ['bureaucrat']

};

UserTagsJS.modules.userfilter = {

};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});