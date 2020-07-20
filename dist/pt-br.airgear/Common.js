/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:View_Source/code.js',
        'u:dev:InputUsername/code.js'
    ]
});
 
AjaxRCRefreshText = 'Auto-atualização';
AjaxRCRefreshHoverText = 'A auto-atualização ocorre a cada 60 segundos';
ajaxPages = ["Especial:Mudanças_recentes","Especial:WikiActivity"];

 if (mwCustomEditButtons) {
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
     "speedTip": "Adicione texto sobrescrito",
     "tagOpen": "<sup>",
     "tagClose": "</sup>",
     "sampleText": "Texto em sobrescrito"};
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
     "speedTip": "Adicione texto subscrito",
     "tagOpen": "<sub>",
     "tagClose": "</sub>",
     "sampleText": "Texto em subscrito"};
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
     "speedTip": "Adicione texto sublinhado",
     "tagOpen": "<u>",
     "tagClose": "</u>",
     "sampleText": "Texto sublinhado"};
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Adicione texto riscado",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Texto riscado"};
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Crie um redirecionamento",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
  }