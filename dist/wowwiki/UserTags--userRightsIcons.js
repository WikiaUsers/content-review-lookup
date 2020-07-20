// **** REPLACED BY MediaWiki:UserTags/code.js  Please use the new page. See MediaWiki:UserTags page. ****

// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
// Caveats: Does not work on Special:Contributions/username
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // STAFF
  rights["Kirkburn"]       = ["Staff","Bureaucrat Emeritus","Administrator"],
  rights["Raylan13"]       = ["Staff","Bureaucrat","Sleepless"],

    // FOUNDERS
 
  rights["WoWWiki-Rustak"] = ["Founder","Bureaucrat Emeritus","Administrator"],
 
    // BUREAUCRATS
 
  rights["Fandyllic"]      = ["Bureaucrat","Administrator","Crazy Person","Expert","Templates"],
  // rights[""]            = ["Bureaucrat","Administrator"],
 
    // BUREAUCRATS EMERITUS
 
  rights["WoWWiki-Sancus"] = ["Bureaucrat Emeritus","Administrator"],
 
    // ADMINISTRATORS
 
  rights["Bubsy87"]        = ["Administrator"],
  rights["Celess22"]       = ["Administrator", "Expert", "Javascript"], 
  rights["Macrophager"]    = ["Administrator", "Expert", "Mounts"],
  rights["Pecoes"]         = ["Administrator", "Expert", "CSS"],
  rights["Servian"]        = ["Administrator","Wannabe Fixer of Worlds"],
  rights["Tankingmage"]    = ["Administrator", "Expert", "Warcraft lore"],

    // ADMINISTRATORS EMERITUS
 
  rights["AlexanderYoshi"] = ["Administrator Emeritus"],

    // MODERATORS

  // rights[""]    = ["Moderator"],

    // PATROLLERS

  rights["Alex Weaver110352"] = ["Patroller"], 
  rights["ByzantiosAE"]       = ["Patroller"], 
  rights["Frejya"]            = ["Patroller"], 
  rights["Icyveins"]          = ["Patroller", "Expert", "External linker"],
  rights["Jonrae"]            = ["Patroller"],
  rights["Corgi"]             = ["Patroller"],
  rights["Scout1534"]         = ["Patroller"], 
  rights["Sasyn"]             = ["Patroller"], 
  rights["Sitb"]              = ["Patroller", "Expert", "Guild achiever"], 
  rights["THE GMoD"]          = ["Patroller"], 
  rights["TheKaldorei"]       = ["Patroller"], 
  rights["WoWRper"]           = ["Patroller"],
  rights["Xideta"]            = ["Patroller"],
  rights["Zmario"]            = ["Patroller"],

    // ROLLBACK

  // rights[""]    = ["Rollback"], 
 
     // EXPERTS

//rights["Celess22"]    = ["Expert", "Javascript"], 
//rights["Fandyllic"]   = ["Expert", "Templates"], 
//rights["Icyveins"]    = ["Expert", "External links"], 
//rights["Macrophager"] = ["Expert", "Mounts and Riding"], 
//rights["Pecoes"]      = ["Expert", "CSS"],
  rights["RBoy"]        = ["Expert", "Battle pets"], 
//rights["Tankingmage"] = ["Expert", "Warcraft lore"], 
  rights["Vilnisr"]     = ["Expert", "Pollster"], 
//rights["Sitb"]        = ["Patroller", "Expert", "Guild achiever"], 
  rights["PIESOFTHENORTH"] = ["Expert", "RTS"],

     // MISCELLANEOUS
 
  // rights[""]       = ["Misc","Stuff"],

   // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]       = ["Wikia Bot"], 
  rights["Wikia"]          = ["Wikia User Bot"];
 

  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // remove old rights
    $('.UserProfileMasthead .masthead-info span.tag').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
      $('<span class="tag">' + rights[wgTitle][i] +
        '</span>').appendTo('.masthead-info hgroup');
    }
  }
});
 
// </source>