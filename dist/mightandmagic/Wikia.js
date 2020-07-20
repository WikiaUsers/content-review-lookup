// <source lang="JavaScript">
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
  // BUREAUCRATS
 
  rights["Energy X"]        = ["Bureaucrat"];

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  rights["Non-existent User"] = ["Do not remove this line"];
 
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
};
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
// </source>