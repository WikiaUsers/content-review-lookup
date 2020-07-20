// BEGIN CREATING ADDITIONAL USER RIGHTS ICONS FOR PROFILEMASTHEADS

$(function() {
  var rights = {};

  // BEGIN List of Accounts Given Extra User Rights Icons

    // FOUNDERS

    rights["Desboy96"]     = ["Council Member","Shinn Elbion"],

    // ACTIVE ADMINISTRATORS

    rights["Gallantmon Golden Mode"]     = ["Administrator","Dark Paladin","Time Lord"],

    // CHATMOD, COUNCIL, and/or AST only

    rights["Manaphy12342"]               = ["Ambassador"],
    rights["Urbancowgurl777"]            = ["Council"],

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

// Adds copyright notice to siderail in Oasis 
importScript('MediaWiki:Wikia.js/copyright.js'); 
// END Adds copyright notice to siderail in Oasis