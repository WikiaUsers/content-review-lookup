/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});
 
// Nombreusuario
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

// Etiqueta Inactivo
window.InactiveUsers = {
    text: 'Waiver'
};

// AutoRefreshing RecentChanges and WikiActivity
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Comunidad"
];

/* Añadir botones extra de edición */
if (mwCustomEditButtons) {

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://images4.wikia.nocookie.net/__cb7/lmb/es/images/6/60/Boton_Beisbolista.png",
        "speedTip": "Infobox Beisbolista",
        "tagOpen": "{{Infobox Jugador de Béisbol\n|Nombre = \n|imagen        = \n",

        "tagClose": "\n|nombrecompleto    = \n|apodo     = \n|fecha nacimiento = \n|lugar nacimiento  = \n|país        = \n|nacionalidad  = \n|nac_deportiva    = \n|fecha fallecimiento    = \n|lugar fallecimiento        = \n|inicio    = \n|equipo_debut    = \n|retiro    = \n|equipo_retiro    = \n|posición    = \n|otras posiciones    = \n|equipover    = \n|equipoinv    = \n|número    = \n|ligaver    = \n|ligainv    = \n|Descripcion    = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "http://images2.wikia.nocookie.net/__cb7/liga-mx/es/images/3/3b/Boton_Equipo.png",
        "speedTip": "Infobox Equipo Béisbol",
        "tagOpen": "{{Infobox Equipo de Béisbol\n|Nombre = \n|imagen        = \n|tema = ",
        "tagClose": "\n|nombrecompleto    = \n|nombreanterior    = \n|apodo     = \n|mascota = \n|fundacion = \n|desaparicion        = \n|propietario  = \n|presidente    = \n|manager  = \n|estadio     = \n|ubicacion    = \n|capacidad        = \n|inauguración        = \n|liga           = \n|zona       = \n|posición           = \n|sucursal    = \n|website    = \n|tv    = \n|titulos_equipo    = \n|uniformes    = \n|himno = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/f/fd/Boton_Estadio.png",
        "speedTip": "Infobox Estadio",
        "tagOpen": "{{Infobox Estadio de Béisbol\n|Nombre = \n|imagen        = \n",

        "tagClose": "\n|nombre completo    = \n|nombre anterior     = \n|localización = \n|propietario = \n|superficie = \n|dimensiones = \n|capacidad = \n|costo = \n|inicio = \n|término = \n|apertura = \n|remodelació= \n|ampliación= \n|reconstrucción= \n|cierre = \n|demolición = \n|arquitecto = \n|equipo local = \n|equipos anteriores = \n|acontecimientos = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/5/5c/Boton_Trofeo.jpg",
        "speedTip": "Infobox Temporada",
        "tagOpen": "{{Infobox Temporada\n|Nombre = \n|imagen        = \n|tema = ",
        "tagClose": "\n|liga = \n|país = \n|fechainicio = \n|fechacierre = \n|edición = \n|juegoestrellas = \n|campeón = \n|subcampeón = \n|participantes = \n|campeónhr = \n|campeónpit = \n|campeónbat = \n|campeónsal = \n|novato = \n|anterior = \n|siguiente = \n}}",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/wmx7/images/e/ec/BotonMT.jpg/revision/latest?cb=20161022192432&path-prefix=es",
        "speedTip": "Multiplataforma (Solo en Articulos Multiplaforma)",
        "tagOpen": "== Imágenes ==",
        "tagClose": "[[Categoría:Multiplataforma]]",
        "sampleText": "\n<gallery>\n</gallery>\n== Vídeos ==\n<gallery>\n</gallery>\n"
    };
}

/* WDS Notification */
 
if (!$.storage.get('noti')) {
    new BannerNotification('Querido lector, lamentablemente el proyecto ha quedado parado debido a falta de editores frecuentes, usted puede ayudarnos colaborando y agregando información sobre todo el béisbol mexicano, revise la <a href=https://lmb.fandom.com/es/wiki/Wikia_LMB:Guía_de_Edición>guía de edición si usted es editor novato.</a>', 'warn').onClose(function () {
        $.storage.set('noti', true);
    }).show();
}

if (!$.storage.get('noti2')) {
    new BannerNotification('Bienvenido a Wiki LMB, una enciclopedia en Fandom sobre todo el Béisbol Mexicano, sientese libre de editar y colaborar.', 'warn').onClose(function () {
        $.storage.set('noti2', true);
    }).show();
}