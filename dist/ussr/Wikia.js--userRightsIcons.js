// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, Aion Wiki
// EDITED BY USER:Halo4master
// Credit to Call of Duty wiki. 
 
$(function() {
 var rights = {};
 
 // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
   // BUREAUCRATS 
 
 rights["Halo4master"]                               = ["<span style=\" color:white;\">Bureaucrat</span>","<span style=\" color:Blue;\">Rainbow Dash</span>"],
 rights["Vidmas7er"]                                 = ["<span style=\" color:white;\">Bureaucrat</span>","<span style=\" color:Pink;\">Fluttershy</span>"],
 rights["Evodvi"]                                    = ["<span style=\" color:white;\">Bureaucrat</span>","<span style=\" color:Violet;\">Twilight Sparkle</span>"],
 rights["XXSpartan 135Xx"]                           = ["<span style=\" color:white;\">Bureaucrat</span>","<span style=\" color:DarkViolet;\">Rarity</span>"];
 rights["Лорд-Эдвард-Гром-брюки"]                    = ["<span style=\" color:Fuchsia;\">Pinky Pie</span>"];
 rights["Noob tub3r"]                                = ["<span style=\" color:white;\">Bureaucrat</span>","<span style=\" color:Coral;\">Applejack</span>"];

   //BOTS

 rights["AutoOp"]                                    = ["<span style=\" color:Red;\">Da Bot</span>"];
 
  rights["Pvt.Ed"]                                    = ["<span style=\" color:Maroon;\">Da Bot</span>"];

 // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
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
});
 
// </source>