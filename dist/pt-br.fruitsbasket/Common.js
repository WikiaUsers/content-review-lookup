/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js",
        "w:c:dev:ShowHide/code.js",
        "w:dev:View_Source/code.js",
        "u:dev:SocialIcons/code.js",
        "u:dev:AjaxRC/code.js",
        "u:dev:PurgeButton/code.js",
    ]
});
 
AjaxRCRefreshText = 'Atualização das mudanças na Wiki Fruits Basket';
AjaxRCRefreshHoverText = 'Atualiza as mudanças na wiki, sem a necessidade de recarregar toda a página';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity"];
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	wikiTwitterAccount: "default"
};
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) {return;}
    var n = document.getElementsByClassName('insertusername');
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
     "speedTip": "Categoria",
     "tagOpen": "[[Categoria:",
     "tagClose": "]]",
     "sampleText": "Nome da categoria"};
  }
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
     "speedTip": "Redirecionar",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insira o texto"};
  }
 
function addMastheadTags() {
  var rights = {};
rights["ZetaBaka"] = ["Burocrata"],
rights["WikiaBot"]       = ["Bot Wikia"], 
rights["Wikia"]          = ["Wikia Bot Usuário"];
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