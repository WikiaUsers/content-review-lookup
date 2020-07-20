// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

   // BUREAUCRATS
 
    rights["M1870"]         = ["Bureaucrat","Head Oncer","Spoilers Team"],
    rights["Utter solitude"]   = ["Bureaucrat","Head Oncer","Transcript Team"];

   // ADMINS

    rights["Applegirl"]        = ["Head Oncer","Princess"];
    rights["Gusey1397"]        + ["Head Oncer","UK Expert"];

   // FEATURED USER
 
   // TRANSCRIPT TEAM
 
    rights["Chameleon Arch"]   = ["Transcript Team"];
    rights["Thodgins46"]       = ["Transcript Team"];

   // IMAGES TEAM
   
    rights["VanillaWinter"]    = ["Images Team"];
 
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
 
// </source>