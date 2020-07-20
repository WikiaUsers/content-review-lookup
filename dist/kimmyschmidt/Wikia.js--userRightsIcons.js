// <source lang="JavaScript">
 
// BEGIN
 
function addMastheadTags() {
  var rights = {};
 
  // BEGIN tags
 
   // STAFF

    rights["SuzieJT"]   = ["Founder","Head Admin","Evil Queen"];

  // END tags
 
  // BEGIN Script to Insert New tags
 
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
 
  // END of Script
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// END
 
// </source>