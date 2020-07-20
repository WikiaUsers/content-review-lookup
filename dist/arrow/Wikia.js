/**Original from Walking Dead Wiki**/
 
 function addMastheadTags() {
    var rights = {};
 
    // BEGIN List of Accounts Given Extra User Rights Icons
 
    rights["Playsonic2"]    = ["Spanish liaison"],
    rights["Szynka013"]    = ["Polish liaison"],
rights["Non-existent User"]  = ["Do not remove this line"];
 
    // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       for( var i=0, len=rights[user].length; i < len; i++) {
         // add new rights
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
           '</span>').appendTo('.masthead-info hgroup');
       }
    } 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});