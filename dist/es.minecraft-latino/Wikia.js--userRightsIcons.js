// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FUNDADOR
 
  rights["Connor Layton"]   = ["Fundador"],
 
    // BURÓCRATAS
 
  rights["****"]       = ["Burócrata"],
  rights["****"]       = ["Burócrata"],
 
    // ADMINISTRADORES
 
  rights["Duke Alexeror"]       = ["Editor de Css"],
  rights["****"]       = ["Administrador"],

    // REVERSORES
 
  rights["****"]       = ["Reversor"],
  rights["****"]       = ["Reversor"],
 
    // MODERADORES
  rights["Rocalia"]       = ["Moderador del Chat"],
  rights["****"]       = ["Moderador del Chat"],
  rights["****"]       = ["Moderador del Chat", "Reversor"],
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]   = ["Bot Global"]; 
  rights["Wikia"]      = ["Bot Global"];
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
 
// </source><ac_metadata title="oca"> </ac_metadata>