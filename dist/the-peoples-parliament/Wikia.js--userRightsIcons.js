// <source lang="JavaScript">
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
   // BUREAUCRATS
 
    rights["-Price-"]             = ["Awesome", "Mister Price Guy", "Price to meet you", "Lord of the tings", "Not sparta", "possessor of the green building", "the man with way too many userboxes", "the magic man", "Peter Petrelli", "Forever Infamous", "The price is right"],
    rights["Reedman211"]             = ["better than literally all of CWAC"],
    rights"Gashon Cansaker"]             = ["the great gashby", "gascan", "the great crashby", "the walking contradiction", "insert gash-related pun here"],
    rights["DylanTBest123"]             = ["THE KING"];
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