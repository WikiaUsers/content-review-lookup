// Added by Dak47922
// <source lang="JavaScript">
 
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
 
  rights["Dak47922"]                   = ["Administrator","Coder","Councilor"],
  rights["Dblcut3"]                    = ["Bureaucrat"],
  rights["Oscar1444"]                  = ["Bureaucrat"],
  rights["Rainbowunicornsniper"]       = ["Co-Owner","Bureaucrat"],
  rights["KoiKage"]                    = ["Moderator"],
  rights["Jellysnake"]                 = ["Moderator"],
  rights["Mariobros31"]                = ["Moderator"],
  rights["Sillyputty"]                 = ["Bureaucrat","Chat Monitor","Coder"],
  rights["Epic_Steve_Miner"]           = ["Chat Monitor"],
  rights["Bnm786"]                     = ["Administrator","Coder"],
  rights["Macx13"]                     = ["Chat Monitor"],
  rights["Zachie150"]                  = ["Chat Monitor","Forums Monitor"],
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]   = ["Wikia Bot"]; 
  rights["Wikia"]      = ["Wikia Bot"];
  rights["****"]       = ["Bot"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
// </source>