// 19:49, September 4, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Paperluigi ttyd"]     = ["Bureaucrat"],
    rights["Consulting Detectic"] = ["Bureaucrat"],
    rights["Jess0312"]            = ["Admin"],
    rights["OmniWill"]            = ["Admin"],
    rights["Superjokertv"]        = ["Admin"];
 
     // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});


/* Adds Purge Button to the Edit dropdown bar */
importScriptPage('PurgeButton/code.js', 'dev');
PurgeButtonText = 'Purge';
ajaxPages = ["Special:WikiActivity","Special:Log"];

/* Adds Auto-refresh checkbox to WikiActivity and Logs */
importScriptPage('AjaxRC/code.js', 'dev');

/* Changes An anonymous contributor to the IP address */ 
importScriptPage('RevealAnonIP/code.js', 'dev');

/* Adds a Edit intro option to the edit dropdown bar */
/* Intro is defined as anything before the first heading */
importScriptPage('EditIntroButton/code.js', 'dev');
 
/* Makes inactive users */

InactiveUsers = { 
	months: 2
};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Adds button to edit Message Wall Greetings */

function EditGreeting() {
	if (wgCanonicalNamespace == 'Message_Wall' && wgAction != 'history') {
		if (wgTitle == wgUserName) {
			$('.WikiaMainContent').prepend('<div class="UserProfileActionButton"><a accesskey="e" href="/wiki/Message_Wall_Greeting:'+ wgUserName +'?action=edit" class="wikia-button" data-id="edit" id="talkArchiveEditButton" style="padding-left: 5px; padding-right: 8px;"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Edit greeting	</a></div>');
		}
	}
}
addOnloadHook(EditGreeting);