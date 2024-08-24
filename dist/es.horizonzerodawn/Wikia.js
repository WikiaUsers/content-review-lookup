importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Parallax.js'
    ]
});
/*** Auto refrescado de la wiki actividad ***/
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
/* Pruebas */
function prueba() {
    document.getElementById("prueba").style.backgroundColor= "#FFF";
}