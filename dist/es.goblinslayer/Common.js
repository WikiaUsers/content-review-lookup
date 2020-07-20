/*Refrescar automaticamente la actividad */
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes", "Especial:WikiActivity"];
 
/* Añadir botones extra de edición */
if (mwCustomEditButtons) {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
        "speedTip": "Insertar infobox de personaje",
        "tagOpen": "{{Infobox de personaje",
        "tagClose": "\n|nombre    = \n|imagen    = \n|nombre en inglés  = \n|nombre en japonés = \n|edad      = \n|raza      = \n|género    = \n|profesión = \n|afiliación= \n|rango     = \n|familia   = \n|seiyū     = \n|debut     = \n}}",
        "sampleText": ""
    };
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Bot%C3%B3n_novela.png",
        "speedTip": "Insertar infobox de capítulo",
        "tagOpen": "{{Infobox de capítulo",
        "tagClose": "\n|imagen    = \n|número_de_páginas    = \n|fecha_de_publicación = \n|anime     = \n|anterior  = \n|siguiente = \n}}",
        "sampleText": ""
    };
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
        "speedTip": "Insertar imagebox",
        "tagOpen": "{{Imagebox",
        "tagClose": "\n|Descripción = \n|Fuente      = \n|Personaje   = \n|Licencia    = \n}}",
        "sampleText": ""
    };
}

/* Icono social, por: [[Madnessfan34537]] */
 
function SocialIcons() {
 
    var userArray = wgPageName.split(":");
 
    $('.WikiaRail').prepend('<div style="right:-1px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="https://twitter.com/goblinslayer_es"><img src="https://vignette.wikia.nocookie.net/goblinslayer/images/e/e2/Logo_de_twitter.png/revision/latest/scale-to-width-down/35?cb=20180426020225&path-prefix=es"></a></div></div></div>');
 
}
 
        if (mw.config.get("wgNamespaceNumber") != "user") {
		addOnloadHook(SocialIcons);
 
}

//Configuraciones para pagePreview (Gracias Sergio)
window.pPreview = {
    noimage: 'https://vignette.wikia.nocookie.net/goblinslayer/images/1/1a/Informaci%C3%B3n.png/revision/latest/scale-to-width-down/100?cb=20180221021129&path-prefix=es',
};

/* Eliminar los comentarios en las desambiguaciones, por BranDaniMB */
$(window).load(function() {
    if (mediaWiki.config.get('wgNamespaceNumber') === 0) {
        var Categories = mediaWiki.config.get('wgCategories');
 
        if (Categories.includes("Desambiguación")) {
            $('#article-comm').attr('disabled', 'disabled');
            $('#article-comm').attr('placeholder', 'Se han desactivado los comentarios para esta página.');
        }
    }
});