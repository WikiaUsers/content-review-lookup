/* Auto-refrescar WikiActividad */

var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxRefresh = 20000;


function UserNameReplace() { 
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return; 
    $("span.insertusername").text(wgUserName); 
} 
addOnloadHook(UserNameReplace);
    
// $('.avatar').on('click', function () {playSound('https://vignette.wikia.nocookie.net/fnaf-sister-location/images/1/1d/Exotic_Butters.ogg')})

/* LinkPreview (Agradecimientos a King Mememes por explicar el proceso) */
window.pPreview = {
	noimage: 'https://vignette.wikia.nocookie.net/freddy-fazbears-pizza/images/4/4f/FNaF_AR_-_Identidad_no_confirmada_%28Icono_-_Mapa%29.png/revision/latest?cb=20200515170737&path-prefix=es',
	RegExp: {
		ilinks: [/catego.*?:.*?/gim] // Ignorar categorías
	}
}

/* Para que los ProfileTags funcionen correctamente */
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

importArticles({
    type: "script",
    articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:MediaWiki:DiscordIntegrator/code.js',
        'u:dev:DisableBotMessageWalls/code.js',
        'u:dev:MediaWiki:WHAM/code.2.js',
        'u:dev:YoutubePlayer/code.js',
    ]
});