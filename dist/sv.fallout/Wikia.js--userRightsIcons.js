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
  rights["The Gunny"]          = ["Bureaucrat", "Check User"],

    // ADMINS

  rights["TwoBearsHigh-Fiving"]     = ["Admin", "Councilor", "Wikia Star"],

    // INACTIVE ADMINS

  rights["Ausir"]                   = ["Inactive Admin"],
  rights["Limmiegirl"]              = ["Inactive Admin"],
  rights["Porter21"]                = ["Inactive Admin"],
  rights["TrailerParkApe"]          = ["Inactive Admin"],

    // MODERATORS

  rights["A Follower"]                = ["Moderator"],
  rights["JASPER42"]                  = ["Moderator"],
  rights["The Old World Relics"]      = ["Moderator"],
  rights["Richie9999"]                = ["Moderator"],
  rights["ToCxHawK"]                  = ["Moderator"],

    // INACTIVE MODERATORS
 
    // PATROLLERS

  rights["69.l25"]                    = ["Patroller"],
  rights["CommanderNuka"]             = ["Patroller"],
  rights["Eden2012"]                  = ["Patroller"],
  rights["FFIX"]                      = ["Patroller"],
  rights["Great Mara"]                = ["Patroller"],
  rights["OfficialLolGuy"]            = ["Patroller"],
  rights["Paladin117"]                = ["Patroller", "Apprentice 2013"],
  rights["Peace'n Hugs"]              = ["Patroller"],
  rights["The-Gunslinger"]            = ["Patroller"],
  rights["Tribal Wisdom"]             = ["Patroller"],
  rights["Ug-Qualtoth"]               = ["Patroller"],

    // INACTIVE PATROLLERS

  rights["Charcoal121"]               = ["Inactive Patroller"],
  rights["Crimson Frankie"]           = ["Inactive Patroller", "Apprentice 2012"],
  rights["For NCR"]                   = ["Inactive Patroller"],
  rights["Stars and Stripes Forever"] = ["Inactive Patroller"],

    // INACTIVE CHAT MODERATORS

  rights["Miss.Nicolle"]           = ["Inactive Chat Moderator"],
  rights["The Nemesisx"]           = ["Inactive Chat Moderator"];

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