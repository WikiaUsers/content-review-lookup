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

    rights["Callum6939"]        = ["Beyblade Fanon Board Member","Head of Events"],
    rights["Jeff G."]           = ["Bureaucrat","Administrator"],
    rights["Jempcorp"]          = ["Bureaucrat","Administrator"],
    rights["SpikeToronto"]      = ["Bureaucrat","Administrator","Council","AST"],

    // ACTIVE ADMINISTRATORS

    rights["Gandora,"]         = ["Beyblade Fanon Board Member","Head of Registration, Stats, Referee Divion, WikiSkin"],
    // TESTING ADMINISTRATORS

    rights["BlueDevil"]         = ["Testing Administrator"],
    rights["BobNewbie"]         = ["Testing Administrator","Council"],
    rights["Gracey91"]          = ["Testing Administrator"],
    rights["Head.Boy.Hog"]      = ["Testing Administrator","Council"],
    rights["Kangaroopower"]     = ["Testing Administrator"],
    rights["PlasmaTime"]        = ["Testing Administrator","New Page Patroller"]
    rights["Vibhijain"]         = ["Testing Administrator"],

    // VIPs

    rights["Rappy 4187"]        = ["Consigliere","Advising Administrator","AST"],

    // ROLLBACK

      // rights["TheBen10Mazter"]    = ["Rollback"],

    // TEST ACCTS, BOTS, & AWB

    rights["SpikeTorontoAWB"]   = ["AWB Bot"],
    rights["SpikeTorontoTEST2"] = ["Bureaucrat Test Account"],

    // CHATMOD, COUNCIL, and/or AST only

    rights["Manaphy12342"]      = ["Ambassador"],
    rights["Urbancowgurl777"]   = ["Council"],

    // PERMABANNED, GLOBAL BANS, ETC.

    rights["Farrell99999"]      = ["Permabanned"],
    rights["Eglinton"]          = ["Globally banned"],
    rights["Spidey665"]         = ["Globally disabled"],
    rights["TheBen10Mazter"]    = ["Globally disabled"];

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