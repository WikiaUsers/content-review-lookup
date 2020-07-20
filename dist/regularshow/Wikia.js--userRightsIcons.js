// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons

   // BUREAUCRATS

    rights["Utter solitude"]           = ["Wikia Star","Park Boss"];

   // ADMINS

    rights["NotShemp"]                 = ["Park Worker"];
    rights["JoPo"]                 = ["Park Worker"];
    
   // BOT

    rights["Bot of Solitude"]          = ["Bot","Skynet"];

   // ROLLBACKS

    rights["New Heathera"]             = ["Park Temp","Wolf"],
    rights["The bright cube"]          = ["Park Temp", "Park Intern"],

   // CHATMODS

    rights["Saizou1607"]               = ["Park Intern","Marvelous"],
    rights["AngryGodzillaPie"]         = ["Park Intern","Brother of utter","Friendly Neighborhood City-Smashing Dinosaur"];
 
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