/***** Actualizar los cambios recientes de la wikiactividad *****/
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
;

/*====================*/
/*** Tag personalizado ***/
/*====================*/
 
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
		Burócrata: { u:'Burócrata' }
	}
};
UserTagsJS.modules.custom = {
	'Arelys': ['Burócrata']
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
importArticles({
    type: "script",
    articles: [
        // ...
        'u:dev:MediaWiki:DiscordIntegrator/es/code.js'
        // ...
    ]
});