// Actividad que se actualiza sola
AjaxRCRefreshText = 'Actividad automatizada';
AjaxRCRefreshHoverText = 'Con la casilla marcada esta p�gina se actualizar� autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity", "Especial:P�ginasNuevas", "Especial:Seguimiento"];
importScriptPage('AjaxRC/code.js', 'dev');
// Bot�n para regresar arriba
importScriptPage('BackToTopButton/code.js', 'dev');
// Script para cuenta regresiva
importScriptPage('Countdown/code.js', 'dev');
// Etiqueta para usuarios inactivos
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
// Referencias en globos
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});
// Mostrar IP de an�nimos para usuarios con ciertos permisos
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'helper', 'util', 'staff']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});
// Script para mostrar con etiquetas a los mejores editores
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});

/* Mensaje  */
var WikiaNotificationMessage = "Nomina y vota por tus favoritos <a href='Wiki Mitolog�a:Articulos Destacados(Nominaciones y Votos)'>en el VPD</a>.";
importScriptPage('WikiaNotification/code.js', 'dev');
importScriptPage('UserTags/code.js', 'dev');