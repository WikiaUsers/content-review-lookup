// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
    var rights = {};
 
    /**********************************************************************/
    /******** BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS ********/
    /**********************************************************************/
 
  // FOUNDER
 
    rights["Ricky Spanish"]        = ["Xiaolin Grand Master"],
 
  // BUREAUCRATS
 
    rights["LevenThumps"]          = ["Xiaolin Master"],
    rights["Yuzura"]               = ["Xiaolin Master", "Council Member", "Wikia Star"],
 
  // ADMINISTRATORS
 
    rights["Antonismage"]          = ["Xiaolin Dragon"],
    rights["TrueThespian"]         = ["Xiaolin Dragon", "Council Member"],
 
  // PATROLLERS
 
    rights[" "]                    = ["Shoku Warrior"],
 
  // CHAT MODERATORS
 
    rights[" "]                    = ["Wudai Warrior"],
 
  // ROLLBACK
 
    rights["RockLepus145ES"]       = ["Xiaolin Apprentice"],
 
  // ATC COUNCIL
 
    rights["Abce2"]                = ["Council Member"],
 
  // BOTS
 
    rights["WikiaBot"]             = ["Wikia Bot"],
    rights["Wikia"]                = ["Wikia Bot"],
    rights["Yuzubot"]              = ["Bot"];
 
 
    /**********************************************************************/
    /********* END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS *********/
    /**********************************************************************/
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
// </source>
 
 
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
importScriptPage('InactiveUsers/code.js', 'dev');
importScriptPage('SpoilerAlert/code.js', 'dev');
importScript('MediaWiki:Wikia.js/editCount.js');
importScript('MediaWiki:Wikia.js/Sandbox.js');
 
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}

if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}

window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};

$('.drop-button').click(function() {
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active'); }
);