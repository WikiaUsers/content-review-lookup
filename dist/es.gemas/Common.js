/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

//InactiveUser
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 3 };
 
// refresh
window.ajaxPages = ["Special:RecentChanges", "Special:Watchlist", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* [[Plantilla:Nombreusuario]] */
$(function UserNameReplace() {
  if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) { return; }
  $('span.InsertUserName').text(wgUserName);
});

/*botones edicion extra*/ 
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Botón_plantilla.png",
        "speedTip": "Plantillas",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Plantilla"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
        "speedTip": "Texto Tachado",
        "tagOpen": "<s>",
        "tagClose": "</s>",
        "sampleText": "Texto a tachar"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
        "speedTip": "Subrayar",
        "tagOpen": "<u>",
        "tagClose": "</u>",
        "sampleText": "Texto a Subrayar"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20081020113954/central/images/5/56/Button_big.png",
        "speedTip": "texto Grande",
        "tagOpen": "<big>",
        "tagClose": "</big>",
        "sampleText": "Texto Grande"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/fairytail/es/images/8/89/Letra_Peque%C3%B1a.png",
        "speedTip": "Texto Pequeño",
        "tagOpen": "<small>",
        "tagClose": "</small>",
        "sampleText": "Texto Pequeño"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
        "speedTip": "Centrar",
        "tagOpen": "<center>",
        "tagClose": "</center>",
        "sampleText": "Centrar Texto"
    };
}