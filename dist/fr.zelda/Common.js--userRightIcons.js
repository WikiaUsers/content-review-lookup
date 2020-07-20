/* Any JavaScript here will be loaded for all users on every page load. */
 
// Written by User:Jr Mime
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons

   //BOT
 
    rights["Wikia"]                 = ["Robot"],
    rights["ZeldaBot"]              = ["Robot"],

   //BUREAUCRAT 
    
    rights["Maxime_Corbin"]         = ["Grand Sage"],
    rights["Bezed"]                 = ["Grand sage"],
    rights["Korao"]                 = ["Grand sage"],
    rights["Mad_Scrub"]                 = ["Grand sage"],

   //ADMIN

     rights["Fire-Luigi"]              = ["Sage"],
     rights["NemesisRoss"]                  = ["Sage"],
     rights["The-Luigi"]                  = ["Sage"],

   //ROLLBACK

     rights["DracoTM"]              = ["Garde"],
     rights["Kazimo"]               = ["Garde"],
     rights["Oscar_Baudry"]               = ["Garde"],
     rights["Tommy16101998"]               = ["Garde"],

   //INACTIFS
    rights["Korao"]                 = ["Inactif"],
    rights["NemesisRoss"]                 = ["Inactif"],
    rights["Kazimo"]                 = ["Inactif"],
    rights["Oscar_Baudry"]                 = ["Inactif"],

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