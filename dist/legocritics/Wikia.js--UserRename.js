// <source lang="JavaScript">
// This code is meant to *supplement* current rights groups for users'
// mastheads on the wiki. It is not intended to replace Wikia's versions thereof.
// If you choose to use this code on your wiki, you must use it in the same manner.
// For example, it is not permissable to replace "admin" with "beat cop".
// Doing so, may be a breach of Wikia's Terms of Use.

// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

$(function() {
  var rights = {};

  // BEGIN List of Accounts Given Extra User Rights Icons

    // BUREAUCRATS

    rights["Bob Bricks"]        = ["President","Council","Brick Critics Staff"],
    rights["Prisinorzero"]      = ["Executive Vice President","Brick Critics Staff"],
    rights["Br1ck animat0r"]    = ["Brick Critics Staff","Vice President",],
    rights["Clone gunner commander jedi"]      = ["Brick Critics Staff","Vice President"],

    // ADMINISTRATORS, COUNCIL

    rights["CreeperS"]          = ["Brick Critics Staff","Council"],
    rights["Darth henry"]       = ["Brick Critics Staff","Council"],
    rights["SKP4472"]           = ["Brick Critics Staff","Council"],
    rights["Czechmate"]         = ["Brick Critics Staff"],

    // TEST ACCTS, BOTS, & AWB

    rights["Lego Critics Bot"]   = ["Brick Critics Staff","Offical Brick critics Bot"],
    rights["SpikeTorontoTEST2"] = ["Bureaucrat Test Account"],

    // CHATMOD, COUNCIL, and/or AST only

    rights["717dif"]      = ["Brick Critics Staff"],
    rights["Legofan100"]  = ["Brick Critics Staff"],
    rights["Jeyo"]        = ["Brick Critics Staff"], 


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