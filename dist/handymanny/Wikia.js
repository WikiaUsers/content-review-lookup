importScriptPage('RelatedDiscussionsModule/code.js', 'dev'); 


function addMastheadTags() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    rights["Hilbert.Herringgull"] = ["Bureaucrat", "Earl of Sodor"];
    rights["Grabbergirl"] = ["Bur�crata", "Alcalde Rosa"];
    rights["Gamekirby"] = ["Bur�crata"];
    rights["Gman581996"] = ["Bur�crata", "Presidente de Sheetrock Hills"];
 
 
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