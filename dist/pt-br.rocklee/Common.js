/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Any JavaScript here will be loaded for all users on every page load. */
/* Auto Refresh */
AjaxRCRefreshText = 'Recarregamento automático';
AjaxRCRefreshHoverText = 'A página recarrega-se automaticamente';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity", "Especial:Páginas_vigiadas", "Especial:Registro", "Especial:Arquivos_novos", "Especial:Lista_de_arquivos", "Especial:Páginas_novas", "Especial:Contribuições"];
importScriptPage('AjaxRC/code.js', 'dev');
 

/* Etiqueta personalizada para usuários */
function addMastheadTags() {
  var rights = {};
 
rights["Fwy"] = ["Kage"],
rights["BlackZetsu"] = ["Ex-Kage"],
rights["BlazeX1"] = ["Kage"],
rights["Syaoran Uchiha"] = ["Ex-Kage"],
rights["Jefther Gabriel"] = ["Kage"];
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// Importar conteúdo
importArticles({
    type: "script",
    articles: [
        "w:c:dev:ReferencePopups/code.js",      // Referências da Wikipédia
        "w:c:dev:ReferencePopups/custom.js",    // Popups
        "w:c:dev:ExternalImageLoader/code.js",  // Imagem Externa
        "w:c:dev:DisplayTimer/code.js",         // Cronômetro
        "w:c:dev:RevealAnonIP/code.js",         // IP de usuários anônimos
        "w:c:dev:ShowHide/code.js",             // Botão de Mostrar - Esconder
        "w:c:dev:View_Source/code.js",          // Ver Código-Fonte (botão)
        "w:c:dev:WallGreetingButton/code.js",   // Editar Saudação no Mural de Mensagens
        "w:c:dev:AjaxRC/code.js",               // Atualizar Mudanças Recentes
        "w:dev:SocialIcons/code.js",            // Ícones de Redes Sociais
    ]
});
 
/* Personalização de Botões */
 if (mwCustomEditButtons) {
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Adicionar o caractere ū",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Adicionar o caractere ō",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/naruto/images/7/79/Button_reflink.png",
     "speedTip": "Adicionar as Referências",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "''Rock Lee'' capítulo 0, página 0"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://i.imgur.com/cVYSv4Z.png",
     "speedTip": "Adicionar o Esboço",
     "tagOpen": "{{Esboço}}",
     "tagClose": "",
     "sampleText": ""};
  }

/* Substitui {{Nome de Usuário}} com o nome do usuário que visitar a página. Requer a cópia: Predefinição:NOMEDOUSUÁRIO. */  
 
function UserNameReplace() { if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return; $("span.insertusername").html(wgUserName); } addOnloadHook(UserNameReplace);