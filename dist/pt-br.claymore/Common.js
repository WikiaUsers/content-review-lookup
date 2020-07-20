/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
// scripts de importação
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",      // IP de usuários anônimos
        "w:c:dev:ShowHide/code.js",          // Mostrar - Esconder
        "w:c:dev:View_Source/code.js",       // Ver código-fonte
        "w:c:dev:AjaxRC/code.js",            // AJAX Recent Changes
        "w:c:dev:DisplayClock/code.js",      // Relógio UTC
        "w:c:dev:PurgeButton/code.js",       // Botão de atualizar página
        "w:c:dev:SocialIcons/code.js",       // Ícones sociais
    ]
});

// AJAX Recent Changes
AjaxRCRefreshText = 'AJAX';
AjaxRCRefreshHoverText = 'Atualiza automaticamente a página a cada 60 segundos';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity"];

// Texto do botão de atualizar página
PurgeButtonText = 'Atualizar';

// Botões de ícones sociais
var SocialMediaButtonsNamespaces = [0];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light"
};

// <span class="insertusername"></span>
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) {return;}
    var n = document.getElementsByClassName('insertusername');
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);

// Botões de edição adicionais
/* Custom Edit buttons - http://en.wikipedia.org/wiki/User:MarkS/Extra_edit_buttons */
 if (mwCustomEditButtons) {
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Adicione o caractere ū",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Adicione o caractere ō",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
  }