/* Rangos personalizados de usuarios */

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat'];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = {
	days: 30,
	edits: 100,
	namespace: 0
};

/* Categorizar im�genes */

if(wgPageName == 'Especial:SubirArchivo' || wgPageName == 'Especial:SubirM�ltiplesArchivos') {
    $('#wpUploadDescription').val('[[Categor�a:Im�genes]]');
}

/* Scripts importados */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js'
    ]
});