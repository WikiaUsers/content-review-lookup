// 21:22, June 27, 2012 (UTC)
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
 
    rights["Monovia"]         = ["Founder"],
 
    // BUREAUCRATS
 
    rights["SaluteChicken"]      = ["Bureaucrat"],
    rights[""]           = [""],
    rights[""]          = [""],
    rights[""]      = [""],
 
    // ACTIVE ADMINISTRATORS
 
    rights[""]            = ["Administrator"],
 
    // TESTING ADMINISTRATORS
 
    rights["BlueDevil"]         = ["Testing Administrator"],
    rights["BobNewbie"]         = ["Testing Administrator","Councilor"],
    rights["DBBwiki"]           = ["Testing Administrator"],
    rights["Gracey91"]          = ["Testing Administrator"],
    rights["Head.Boy.Hog"]      = ["Testing Administrator"],
    rights["Kangaroopower"]     = ["Testing Administrator"],
    rights["The Purple Flower"] = ["Testing Administrator"],
    rights["Vibhijain"]         = ["Testing Administrator"],
 
    // VIPs
 
    rights["Rappy 4187"]        = ["VSTF","Consigliere","Advising Administrator","AST"],
 
    // ROLLBACK
 
      // rights["TheBen10Mazter"]    = ["Rollback"],
 
    // TEST ACCTS, BOTS, & AWB
 
    rights["SpikeTorontoAWB"]   = ["AWB Bot"],
    rights["SpikeTorontoTEST2"] = ["Bureaucrat Test Account"],
 
    // CHATMOD, COUNCIL, and/or AST only
 
    rights["Cook Me Plox"]      = ["Councilor","AST"],
    rights[""]              = ["Chat Moderator"],
    rights["Urbancowgurl777"]   = ["Councilor"],
 
    // PERMABANNED, GLOBAL BANS, ETC.
 
    rights[""]      = ["Permabanned"],
    rights["Eglinton"]          = ["Globally banned"],
    rights["Spidey665"]         = ["Globally disabled"],
    rights["TBloemink"]         = ["Globally disabled"],
    rights["TheBen10Mazter"]    = ["Globally disabled"];
 
// OTHER USER RIGHTS
 
    rights[""]      = ["Other"],
    rights[""]          = ["Creative Director"],
    rights[""]         = [""],
    rights["TBloemink"]         = ["Globally disabled"],
    rights["TheBen10Mazter"]    = ["Globally disabled"];
  // END List of Accounts Given Extra User Rights Icons
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgTitle == "Contributions") {
      var user = fbReturnToTitle.substring(fbReturnToTitle.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.group').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="group">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
 
});
 
// END CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS
 
// </source>