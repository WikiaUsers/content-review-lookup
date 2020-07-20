// 23:06, March 14, 2012 (UTC)
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
 
 
 
    // ACTIVE ADMINISTRATORS
 
    rights["When the World Comes Down"]            = ["Hokage"],
 
    rights["Saile aipas"]            = ["Mizukage"],
 
    rights["Juan uchiha senju"]            = ["Raikage"],
 
 
    // TEST ACCTS, BOTS, & AWB
 
    rights["proximamente"]   = ["AWB Bot"],
    rights["proximamente"] = ["Bureaucrat Test Account"],
 
    // CHATMOD, COUNCIL, and/or AST only
 
    rights["proximamente"]      = ["Councillor","AST"],
    rights["proximamente"]              = ["Chat Moderator","Councillor","AST"],
    rights["proximamente"]   = ["Councillor"],
 
    // PERMABANNED, GLOBAL BANS, ETC.
 
    rights["proximamente"]      = ["Permabanned"],
    rights["proximamente"]          = ["Globally banned"],
    rights["proximamente"]         = ["Globally disabled"],
    rights["proximamente"]         = ["Globally disabled"],
    rights["proximamente"]    = ["Globally disabled"];
 
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