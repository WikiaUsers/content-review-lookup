// 16:49, March 27, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// This code is meant to *supplement* current rights groups for users'
// mastheads on the wiki. It is not intended to replace Wikia's versions thereof.
// If you choose to use this code on your wiki, you must use it in the same manner.
// For example, it is not permissable to replace "admin" with "beat cop".
// Doing so, may be a breach of Wikia's Terms of Use.
 
// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
$(function() {
  var rights = {};
 
  // BEGIN List of Accounts Given Extra User Rights Icons
 
    // FOUNDERS
 
    rights["Alaric Saltzman"]         = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS
 
    rights["Original Authority"]      = ["Bureaucrat","Administrator"],
    rights["Secretcirclemegafan"]           = ["Bureaucrat","Administrator"],
   
 
    // ACTIVE ADMINISTRATORS
 
    rights["Wyatt Matthew"]            = ["Active Administrator","Rangeblock Manager","BOT Manager"],
 
  
   
 
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>