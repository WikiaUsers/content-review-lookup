/* Credit to Once Upon a Time Wiki */
// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

   // BEAURECRATS 
    
    rights["Littlerat1"]    = ["The Queen of Arendelle","The Snow Queen" ];
  
   // ADMINISTRATORS 
    
    
    rights["PetLoverGirl"]    = ["The Princess of Arendelle","The Snow Princess"];
    rights["Mojojojo13579"] = ["The Head Freezie Princess"];
    rights[""] = [""];
  
   // CHAT MODERATORS

   rights[""] = [""];
   rights[""] = [""];
   rights[""] = [""];
    
   
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