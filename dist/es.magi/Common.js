/*** Autorefrescar los cambios recientes en la wikiactividad ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/*** Añadir botón para editar el mensaje de bienvenida del muro ***/
 
importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

/*** Tag personalizado ***/

window.UserTagsJS = {
    modules: {
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'founder',
            'sysop',
            'rollback',
            'bot'
        ]
    }
};

UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
    };
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		reinasheba: { u:'Reina Sheba' }
	}
};
UserTagsJS.modules.custom = {
	'Shirokoneko': ['reinasheba']
};
UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: false
};
UserTagsJS.modules.nonuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
importArticles({
	type:'script',
	articles: [
		'u:dev:UserTags/code.js'
	]
});