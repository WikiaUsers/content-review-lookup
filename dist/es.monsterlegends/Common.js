/* Mensaje a la comunidad*/
/*
var WikiaNotificationMessage = "<a href='/wiki/Hilo:72664'>�Haz el examen cronometrado y obten medallas!</a>";
var WikiaNotificationexpiry = 3;
*/
/*** Auto refrescado de la wiki actividad{{w:c:five-nights-at-treasure-island}} ***/
window.AjaxRCRefreshText = 'Actualizaci�n Autom�tica';
window.AjaxRCRefreshHoverText = 'Actualiza autom�ticamente la p�gina';
window.AjaxRefresh = 10000;
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Watchlist",
    "Especial:Log",
    "Especial:Contribuciones"
];

// Chat Reload - CONFIGURACI�N.
window.chatReloadTime = 60000;

// Ultima edici�n - CONFIGURACI�N.

window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    lang: 'es',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};

// Revelar ID de usuarios an�nimos.
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 $(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 });
 
/* End of the {{USERNAME}} replacement */


// *****************************************************
// Botones adicionales para la p�gina de edici�n (w:c:five-nights-at-treasure-island)
// *****************************************************
/*
if (typeof(mwCustomEditButtons) != 'undefined') {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
        "speedTip": "C�digo fuente",
        "tagOpen": "<code><nowiki>",
        "tagClose": "</" + "nowiki></code>",
        "sampleText": "C�digo fuente"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
        "speedTip": "Proponer que este art�culo sea borrado",
        "tagOpen": "{{Borrar|",
        "tagClose": "}}",
        "sampleText": "Raz�n para que el art�culo sea borrado."
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
        "speedTip": "Plantillas",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Plantilla"
    };
}
*/