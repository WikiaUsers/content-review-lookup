// 19:49, September 4, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CRIANDO TÍTULOS ADICIONAIS AO PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // Equipe Administrativa
 
    rights["Ark F. Scene"]             = ["Magistrado Ark"];
    rights["ClockWork217"]             = ["Magistrado ClockWork"];
    rights["Ichidaisy"]                = ["Grão-Mestre Ichidaisy", "Forumod", "Garoto-enredo"];
    rights["Fem Penta"]                = ["Grão-Mestre Fem", "Forumod", "Garoto-aparência"];
    rights["O Paradoxo"]               = ["Instrutor"];
    rights["The Black Soldier"]        = ["Esquadrão Alpha", "Garoto-enredo"];
    rights["Zé Luiz"]                  = ["Grão-Mestre", "Magistrado"];

 // END Lista de contas
 
  // BEGIN Script to Remove Old Rights Icons & Insert New
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // END Script to Remove Old Rights Icons & Insert New
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});