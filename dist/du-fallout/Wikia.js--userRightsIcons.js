// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187, WOW Wiki
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // BUREAUCRATS
 
  rights["Agent c"]            = ["Bureaucrat", "Councilor", "Wikia Star"],
  rights["Jspoelstra"]         = ["Bureaucrat", "Check User", "Councilor"],
  rights["Kingclyde"]          = ["Bureaucrat", "Check User"],

    // ADMINS

  rights["Paladin117"]              = ["Admin", "Apprentice 2013"],
  rights["TwoBearsHigh-Fiving"]     = ["Admin", "Councilor", "Wikia Star"],
  rights["Tocinoman"]               = ["Admin", "Featured Wikian"],

    // INACTIVE ADMINS

  rights["Ausir"]                   = ["Inactive Admin"],
  rights["Limmiegirl"]              = ["Inactive Admin"],
    // MODERATORS

  rights["Chris the Saiyan"]          = ["Moderator"],
  rights["For NCR"]                   = ["Moderator"],
  rights["The Old World Relics"]      = ["Moderator"],
  rights["ToCxHawK"]                  = ["Moderator"],

    // INACTIVE MODERATORS
 
    // PATROLLERS

  rights["Digital Utopia"]            = ["Patroller"],
  rights["Eden2012"]                  = ["Patroller"],
  rights["FFIX"]                      = ["Patroller"],
  rights["Great Mara"]                = ["Patroller"],
  rights["Kastera1000"]               = ["Patroller"],
  rights["Leea"]                      = ["Patroller"],
  rights["OfficialLolGuy"]            = ["Patroller"],
  rights["Peace'n Hugs"]              = ["Patroller"],
  rights["Tribal Wisdom"]             = ["Patroller"],

    // INACTIVE PATROLLERS

  rights["Charcoal121"]               = ["Inactive Patroller"],
  rights["CommanderNuka"]             = ["Inactive Patroller"],
  rights["Stars and Stripes Forever"] = ["Inactive Patroller"],

    // INACTIVE CHAT MODERATORS

  rights["Mishaxhi"]               = ["Inactive Chat Moderator"],
  rights["Miss.Nicolle"]           = ["Inactive Chat Moderator"],
  rights["Victor the Securitron"]  = ["Inactive Chat Moderator"],

   // PAST APPRENTICE WINNERS
  
  rights["Crimson Frankie"]           = ["Apprentice 2012"];

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