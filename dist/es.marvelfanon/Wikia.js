// UserTags personalizadas

UserTagsJS.modules.inactive = 60; //Usuarios inactivos

UserTagsJS.modules.userfilter = {
	'Botizard': ['inactive'], // Bot nunca inactivo
};

//

UserTagsJS.modules.custom = {
	'ZaikoAF': ['eventos'],
	'Botizard': ['bot']
};

// Refrescar Actividad reciente

window.AjaxRCRefreshText = 'Auto-ref';
window.AjaxRCRefreshHoverText = 'Refrescar la actividad automáticamente.';
window.ajaxPages = ["Especial:WikiActivity","Especial:CambiosRecientes","Especial:Imágenes","Especial:Vídeos"];

// Guardar artículos mientras con CTRL+S

importScriptPage('SaveKey/code.js', 'dev');

//Deshabilitar mensajes para bots

importArticles({
    type: 'script',
    articles: [
        'u:dev:DisableBotMessageWalls/code.js'
    ]
});

window.ChatStatus = {
	statuses: {
		ausente: "Asuente",
		editando: "Editando",
		leyendo: "Leyendo"
	},
	debug: false
};

// Floating TOC

importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

// Módulo de rail en la parte superior

window.AddRailModule = [{prepend: true}];

/* // Nuevo módulo del rail

$(function(){
    $('<section class="module RailModule"></section>')
    .appendTo('#WikiaRail')
    .load('/index.php?title=Plantilla:Modulo1&action=render');
}); */