importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Parallax.js'
    ]
});
/*** Auto refrescado de la wiki actividad ***/
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
/* Pruebas */
function prueba() {
    document.getElementById("prueba").style.backgroundColor= "#FFF";
}