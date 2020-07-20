// <source lang="JavaScript">
// WRITTEN BY [[User:Rappy_4187]]
 
$(function() {
  var rights = {};
 
  //Founder
 
  //Bots

  //Chat moderators

  //Rollbacks (moderator; because additional features are given to rollbacks on this wiki)
  rights["Dynaboom"] = ["Moderator"],
 
  //Patrollers
 
  //Administrators
 
  //Bureaucrats
 
  //Interface editors
 
  rights["do not edit this line"] = [];
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  } else if (typeof rights[wgTitle.substr(14)] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle.substr(14)].length; i < len; i++) {
      // add new rights
      $('<span class="tag">' + rights[wgTitle.substr(14)][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>