/* Mensaje a la comunidad*/
/*
var WikiaNotificationMessage = "<a href='/wiki/Hilo:72664'>¡Haz el examen cronometrado y obten medallas!</a>";
var WikiaNotificationexpiry = 3;
*/
/*** Auto refrescado de la wiki actividad{{w:c:five-nights-at-treasure-island}} ***/
window.AjaxRCRefreshText = 'Actualización Automática';
window.AjaxRCRefreshHoverText = 'Actualiza automáticamente la página';
window.AjaxRefresh = 10000;
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Watchlist",
    "Especial:Log",
    "Especial:Contribuciones"
];

// Chat Reload - CONFIGURACIÓN.
window.chatReloadTime = 60000;

// Ultima edición - CONFIGURACIÓN.

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

// Revelar ID de usuarios anónimos.
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
// Botones adicionales para la página de edición (w:c:five-nights-at-treasure-island)
// *****************************************************
/*
if (typeof(mwCustomEditButtons) != 'undefined') {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
        "speedTip": "Código fuente",
        "tagOpen": "<code><nowiki>",
        "tagClose": "</" + "nowiki></code>",
        "sampleText": "Código fuente"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
        "speedTip": "Proponer que este artículo sea borrado",
        "tagOpen": "{{Borrar|",
        "tagClose": "}}",
        "sampleText": "Razón para que el artículo sea borrado."
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