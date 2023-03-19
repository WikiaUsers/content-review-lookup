// 07:52, 12 de janeiro de 2013 (UTC)
// <source lang="JavaScript">
 
// ESCRITO POR Usuário: Rappy_4187 de wowwiki
// Se você usar isso em seu wiki, você assume a responsabilidade por
// ensuring compliance with Wikia’s ToU
 
// Começar a criar direitos de usuários adicionais ÍCONES PARA PROFILEMASTHEADS
 
function addMastheadTags() {
  var rights = {};
 
// Comece Lista de Contas Dado Direitos do Usuário extra ícones usando o seguinte formato
// rights["Nome de Usuário"] = ["Título 1","Título 2","Título 3","Título 4","etc ..."],
 
     // Fundador
 
rights["JM Pessanha"] = ["Wikia Helper", "Fundador","Burocrata","Administrador"],
 
     // Burocrata
 
     // Administrador
 
     // Administrador aprendiz
 
 
     // Ex-Team
 
rights["Daviinho"] = ["Ex-Team"],
rights["Priscila perl"] = ["Ex-Team"],
rights["KhanGOE"] = ["Ex-Team"],
 
     // Rollback só
 
 
 
     // Moderador só
 
 
 
     // Patrollers
 
 
 
     // Diverso
 
 
 
     // Bots Wikia
 
rights["WikiaBot"]       = ["Bot Wikia"], 
rights["Wikia"]          = ["Wikia Bot Usuário"];
 
// Lista Final dos Títulos de Direitos do Usuário
 
// Comece script para remover antigos ícones Direitos & Inserir Nova
 
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
 
  // Script final para remover antigos ícones Direitos & Inserir Nova
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// Terminar a criação direitos de usuários adicionais ÍCONES PARA PROFILEMASTHEADS
 
// </source>