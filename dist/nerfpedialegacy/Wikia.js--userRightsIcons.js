// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FOUNDERS
 
  rights["Example"] = ["Founder","Bureaucrat","Administrator"],
 
    // BUREAUCRATS
 
  rights["NStrikeAgent335"]  = ["CSS Master","Head Admin","Template Master"],
 
    // ADMINISTRATORS
 
  rights["GameGear360"]         = ["Former Head Admin"],
 
    // OTHER
 
  rights["NERF NINJA666"]          = ["Forum Moderator"],
  rights["Agent Starbird"]          = ["Head Patroller","Featured User for the Month"],
  rights["SlamFiringLegend"]     = ["Head Patroller"],

    // CHATMODS
 
  rights["Example"]          = ["Chatmod"],
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]        = ["Wikia Bot"]; 
  rights["Wikia"]           = ["Wikia Bot"];
  rights["Example Bot"]     = ["Bot"];

  // OTHER
  rights["SnipingHawk"]     = ["Graphic Designer"];
  rights["Chikus11"]      = ["Permabanned"];
  rights["Fagstick1"]     = ["Permabanned"];
  rights["JetCell"]     = ["Nerf Wiki Head Admin"];
  rights["Jethell"]     = ["Permabanned"];

 
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