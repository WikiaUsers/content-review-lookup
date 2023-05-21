// 19:49, September 4, 2012 (UTC)
// <source lang="JavaScript">
 
// WRITTEN BY User:Rappy_4187
// If you use this on your wiki, you assume responsibility for
// ensuring compliance with Wikia’s ToU
 
// BEGIN CRIANDO TÍTULOS ADICIONAIS AO PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
  // Equipe Administrativa
 
    rights["Cris Mattos"]     = ["Diretor da Prisão"];
    rights["ApenasOutroCara"] = ["Guarda da Prisão"],
    rights["Vitwk1"]          = ["Guarda da Prisão"],
    rights["Fã Anônimo"]      = ["Guarda da Prisão"],
    rights["General9913"]     = ["Guarda da Prisão"];

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