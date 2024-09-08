/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* Custom Edit buttons - http://en.wikipedia.org/wiki/User:MarkS/Extra_edit_buttons */
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
     "speedTip": "Adicionar referência",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "To LOVE-Ru Mangá: Capítulo 0, Página 0"};
  }

/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* End of the {{Visitor}} replacement */


// Desmarcar caixa "Deixar redirecionamento" em arquivos //
 if (wgPageName.indexOf("Especial:Mover_página/Arquivo:") != -1) {
  $('input[name=wpLeaveRedirect]').attr('checked', false);
 }