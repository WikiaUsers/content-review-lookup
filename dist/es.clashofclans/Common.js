/* Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de la página. */
importArticles({
	type: 'script',
	articles: [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
        'u:dev:UserTags/code.js',
		'w:c:clashofclans:MediaWiki:ModeToggle.js',
		'w:c:clashofclans:MediaWiki:GemCalculators.js',
		'w:c:clashofclans:MediaWiki:Common.js/HeroSkins.js',
        'MediaWiki:Common.js/Usernames.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:BadgeGenerator.js',
        'MediaWiki:Protection.js',
        'MediaWiki:Common.js/AvailableBuildings.js',
        'MediaWiki:Common.js/GoldPass.js',
        'MediaWiki:Common.js/Toggle.js',
        'MediaWiki:Custom-TZclock.js'
		]
});
/*Eliminar el botón de Editar Saludo en el Muro a menos que sea el suyo propio o si es personal*/
$(function() {
	var config = mw.config.get([
	'wgCanonicalNamespace',
	'wgUserName',
	'wgTitle',
	'wgUserGroups'
	]);
	if (config.wgCanonicalNamespace == "Message_Wall" && config.wgTitle != config.wgUserName && !config.wgUserGroups.includes("sysop", "bureaucrat", "content-moderator", "threadmoderator", "rollback")) {
	var interval = setInterval(function() {
	if ($('.MessageWallButtons').length) {
		clearInterval(interval);
		$(this).remove();
		} }, 10);
    }
});

// Customize tags on user profiles
window.UserTagsJS = {
    modules: {},
    tags: {
        sysop: { u: 'Administrador' },
        bureaucrat: { u: 'Burócrata'},
     	threadmoderator: { u: 'Mod. de discusiones' },
    	'content-moderator': { u:'Mod. de contenido'},
    	rollback : { u:'Reversor'},
    	retiredstaff: { u: 'Personal Retirado', title: 'Este antiguo miembro del personal está inactivo.' },
        inactive: { u: 'Clasher Inactivo', title: 'Este usuario es inactivo.' },
        imageeditor: {u: 'Editor de Imágenes' }
    }
};
    
UserTagsJS.modules.inactive      = 30;
UserTagsJS.modules.newuser       = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'content-moderator',
    'threadmoderator',
    'rollback',
    'bot',
    'bot-global',
    'blocked', 
    'checkuser',
    'council',
    'helper',
    'staff',
    'vanguard',
	'soap',
];
    
    UserTagsJS.modules.metafilter = {
        sysop:           ['bureaucrat'],
        'content-moderator': ['bureaucrat', 'sysop'],
        threadmoderator: ['bureaucrat', 'sysop'],
        rollback:        ['bureaucrat', 'sysop', 'content-moderator', 'threadmoderator'],
        inactive:        ['retiredstaff']
    };
    
    UserTagsJS.modules.custom = {
        'KeiCol': ['imageeditor'],
        
        'GorillaMan': ['retiredstaff'],
        'Spottra': ['retiredstaff'],
        'SynergyShade3624': ['retiredstaff'],
        'Darkfox17': ['retiredstaff'],
        'Dahimi': ['retiredstaff'],
        'Tono555': ['retiredstaff'],
        'Aventurero 1': ['retiredstaff'],
        'Pintor Kagamine': ['retiredstaff'],
        'Lugia101101': ['retiredstaff'],
        'TheDarkCannon': ['retiredstaff'],
        'AltandeseCreator': ['retiredstaff'],
    };

$(function() {
   	// Clash Royale, Brawl Stars and Clash Quest topic interwiki links
	var elements = '#ClashRoyaleLink, #BrawlStarsLink, #ClashQuestLink';
	if ($('.page-header__languages').length) {
		$(elements).prependTo(".page-header__languages").css({"display": "inline-block"});
	}else {
		$(elements).appendTo(".page-header__top").css({"display": "inline-block"});
	}
});