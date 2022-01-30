/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

/* Rangos personalizados de usuarios */

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = {
	days: 30,
	edits: 100,
	namespace: 0
};

/* Categorizar imágenes */

if(wgPageName == 'Especial:SubirArchivo' || wgPageName == 'Especial:SubirMúltiplesArchivos') {
    $('#wpUploadDescription').val('[[Categoría:Imágenes]]');
}

/* Scripts importados */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js'
    ]
});

/* Plantilla:USERNAME */
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}