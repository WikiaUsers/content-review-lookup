// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  rights["ĄęśNonLatinQAautomationBot"] = ["Bot"],
  rights["Wikia Video Library"] = ["Wikia Staff","Bot"],
  rights["VSTF Bot"] = ["VSTF","Bot"],
  rights["Userpage Bot"] = ["Bot"],
  rights["URL"] = ["Bot"],
  rights["Underscore QA automation Bot"] = ["Bot"],
  rights["QATestsBot"] = ["Bot"],
  rights["QAautomationBot"] = ["Bot"],
  rights["Default"] = ["Bot"],
  rights["1QAautomationBotAutomationAutomationAutomation"] = ["Bot"],
  rights["CreateWiki script"] = ["Bot"],
  rights["WikiaBot"] = ["Wikia Staff","Bot"],
  rights["Wikia"] = ["Bot"],
  rights["SandorL"] = ["Admin","BeyondCP Staff"],
  rights["Vicyorus"] = ["Admin","BeyondCP Staff"],
  rights["Mikeymkwii"] = ["Admin","BeyondCP Staff"],
  rights["WikiaFrog"] = ["BeyondCP Staff"],
  rights["Arsenal55702"] = ["BeyondCP Staff"],
  rights["Sir Jjoeyxx"] = ["Chat moderator","Patroller","BeyondCP Staff"],
  rights["72.179.180.86"] = ["BeyondCP Staff"],
  rights["Llove Kuwait"] = ["Patroller"],

  rights["don't change this line"] = ["null"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('&nbsp;<span class="tag" style="margin-left: 5px">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>