// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["Dratini17"]         = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS
 
  rights["HeroGaming"]      = ["Bureaucrat","Administrator","Video Content Manager"],
 
    // ADMINISTRATORS
 
  rights["The Pathogen"]            = ["Administrator"],
  rights["Mathmagician"]            = ["Administrator","Bureaucrat"],
  rights["Dzylon"]            = ["Administrator"],
  rights["Gracey91"]            = ["Administrator","Abuse Filter Manager"],
  rights["Leet-Pete"]            = ["Administrator"],
  rights["Port5"]            = ["Administrator"],
  rights["Zenofire"]            = ["Administrator"],
  rights["Kiruwagaka"]            = ["Administrator"],
 
    // ROLLBACK
 
  rights["Shadow Wolf TJC"]    = ["Rollback"],
  rights["Blanzer"]    = ["Rollback","Chatmod"],
  rights["Dak47922"]    = ["Rollback"]
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]   = ["Wikia Bot"]; 
  rights["Wikia"]   = ["Wikia Bot"];
  rights["Gracey91s bot"]   = ["Bot"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="group">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>