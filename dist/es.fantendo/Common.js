/* Rangos personalizados de usuarios */

window.UserTagsJS = {
	modules: {},
	tags: {
	    bureaucrat: { u: 'Burócrata', order: 1 },
		rollbackers: { m: 'Reversor', f: 'Reversora', u: 'Reversor', order: 2 },
		templatecreator: { m: 'Creador de plantillas', f: 'Creadora de plantillas', u: 'Creador de plantillas', order: 3 },
		csseditor: { m: 'Editor CSS', f: 'Editora CSS', u: 'Editor CSS', order: 4 }
	}
};

UserTagsJS.modules.custom = {
	'Jaxsome': ['templatecreator'],
	'Mario Historia': ['templatecreator', 'csseditor']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

UserTagsJS.modules.inactive = 30; // 30 días

UserTagsJS.modules.autoconfirmed = true; // Switch on

/* Actualizar páginas automáticamente */

window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:Seguimiento",
    "Especial:Registro",
    "Especial:Contribuciones"
];
window.AjaxRCRefreshText = 'Actualizar automáticamente';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/new-fantendo/images/4/47/Trifuerza_-_Insignia_moderador_del_chat.png/revision/latest?cb=20150710191439&path-prefix=es';
window.ajaxRefresh = 20000;

/* Rail WAM */

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* Recargar chat */

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatReload/code.js'
    ]
});

/* Categorizar imágenes */

if(wgPageName == 'Especial:SubirArchivo' || wgPageName == 'Especial:SubirMúltiplesArchivos') {
    $('#wpUploadDescription').val('[[Categoría:Imágenes]]');
}