/* Any JavaScript here will be loaded for all users on every page load. */
/ 11:49, October 23, 2012 (UTC)
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons

   //Bot

    rights[]                 = ["Bot"],
   //Bureaucrat 

    rights["ShatterClub"]         = ["Bureaucrat"],
    rights["Alexsau1991"]                      = ["Inactive"],

   //Rollback and chat moderator

    rights[]                     = [],
    rights[]                   = [],
    rights[]               = [],
    rights[]                      = [],
    rights[]      = [],
    rights[]                 = [],
    rights[]               = [],

   //Rollback

    rights[]                = [],
    rights[]                  = [],
    rights[]                     = [],
    rights[]              = [],
    rights[]                = [],
    rights[]                     = [],
    rights[]                   = [],
    rights[]                    = [];

 
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
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS