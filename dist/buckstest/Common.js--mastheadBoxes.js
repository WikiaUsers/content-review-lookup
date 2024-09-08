// <source lang="JavaScript">
 
// Adapted by Rappy 4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // AWB
  rights["Ajrbot"]			= ["AWB"],
  rights["Bot50"]			= ["AWB"],
  rights["Cåmdroid"]			= ["AWB"],
  rights["CookBot"]			= ["AWB"],
  rights["Hedonism Bot"]		= ["AWB"],
  rights["HofBot"]			= ["AWB"],
  rights["LordDarkPhantom Bot"]		= ["AWB"],
  rights["M2602Bot"]			= ["AWB"],
  rights["Manybot"]			= ["AWB"],
  rights["MuudyBot"]			= ["AWB"],
  rights["NexBot"]			= ["AWB"],
  rights["NezBot"]			= ["AWB"],
  rights["Nucleobot"]			= ["AWB"],
  rights["Parsonsda Bot"]		= ["AWB"],
  rights["PurpleElephantBot"]		= ["AWB"],
  rights["Real Not Bot"]		= ["AWB"],
  rights["RyanBot"]			= ["AWB"],
  rights["SaraBot"]			= ["AWB"],
  rights["SavBot"]			= ["AWB"],
  rights["Sentrabot"]			= ["AWB"],
  rights["StelerBot"]			= ["AWB"],
    // BOT
  rights["AmauriceBot"]			= ["BOT"],
  rights["AzBot"]			= ["BOT"],
  rights["BrainBot"]			= ["BOT"],
  rights["BurnettBot"]			= ["BOT"],
  rights["Evilbot"]			= ["BOT"],
  rights["FluffyBunnyBot"]		= ["BOT"],
  rights["HairyBot"]			= ["BOT"],
  rights["SmackBot"]			= ["BOT"],
  rights["PNGOptimisationBot"]		= ["BOT"],
  rights["RSChatBot"]			= ["BOT"],
  rights["QBot"]			= ["BOT"],
  rights["TLULbot"]			= ["BOT"],
  rights["TyBot"]			= ["BOT"],
  rights["RSW image renamer"]		= ["BOT"],
    // BUREAUCRAT
  rights["Azaz129"]			= ["BUREAUCRAT"],
  rights["Calebchiam"]			= ["BUREAUCRAT"],
  rights["Dtm142"]			= ["BUREAUCRAT"],
  rights["Eucarya"]			= ["BUREAUCRAT"],
  rights["Hyenaste"]			= ["BUREAUCRAT"],
  rights["Karlis"]			= ["BUREAUCRAT"],
  rights["Laser Dragon"]		= ["BUREAUCRAT"],
  rights["Merovingian"]			= ["BUREAUCRAT"],
  rights["Oddlyoko"]			= ["BUREAUCRAT"],
  rights["Sacre Fi"]			= ["BUREAUCRAT"],
  rights["Skill"]			= ["BUREAUCRAT"],
  rights["Vimescarrot"]			= ["BUREAUCRAT"],
  rights["Whiplash"]			= ["BUREAUCRAT"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>