function addMastheadTags() {
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags
    var rights = {};
    rights["wiki nonny"] = ["Sysop"];
 
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
        $('' + rights[user][i] +
          '').appendTo('.masthead-info hgroup');
      }
    }
}
  // END Script to Remove Old Rights Icons & Insert New
 
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});