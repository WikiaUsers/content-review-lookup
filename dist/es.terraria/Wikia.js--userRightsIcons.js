// 06:49, November 1, 2011 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    // FUNDADOR
 
  rights["TheVictor"]   = ["Fundador","Inactivo"],
 
    // BURÓCRATAS

  rights["Paconick"]       = ["Burócrata"],
  rights["Thefrigoman"]       = ["Burócrata"],
 
    // ADMINISTRADORES
 
  rights["Mr.SuicideSheep"]       = ["Administrador","Chat Manager"],
  rights["LordEnder"]       = ["Administrador"],
 
    // EDITORES DE MEDIA WIKI
 
  rights["Trufas"]       = ["Editor de MediaWiki"],
  rights["ElNinjaZidane"]       = ["Editor de MediaWiki"],
 
    // REVERSORES

  rights["****"]       = ["Reversor"],
 
    // MODERADORES

  rights["SMALF"]       = ["Moderador del Chat"],
 
    // TEST ACCTS, BOTS, & AWB
 
  rights["WikiaBot"]   = ["Bot Global"]; 
  rights["Wikia"]      = ["Bot Global"];
  rights["Dragon Rainbow"]       = ["Bot", "Volunteer Spam Task Force"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:4px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
// </source><ac_metadata title="oca"> </ac_metadata>