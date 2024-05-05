// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
   // TRIAL ADMINISTRATOR
    rights["TheRedDot"]  = ["Trial Administrator"];
    
  // ADMINISTRATOR
    rights["BloomRocks!"] = ["Administrator", "CSS Queen", "JS Princess", "Template Queen"];
  
 // FORMERS
    rights["Queen Luna"] = ["Former Administrator", "Former CSS Princess", "Inactive", "Account Disabled"];
    rights["ScarlethX"] = ["Former Rollback", "Former Chat Queen"];

  // CHAT MODS
    rights["Chocolate-lady112"] = ["Chat Queen", "Inactive"];
 
 // ROLLBACKS
    rights["DaniellaTheDirisShipper"] = ["Rollback"];
 
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
 
// END CREATING ADDITIONAL USER RIGHTS ICONS
 
// </source>