/* Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de la página. */
importArticles({
	type: 'script',
	articles: [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
		'w:c:clashofclans:MediaWiki:Common.js/ModeToggle.js',
		'w:c:clashofclans:MediaWiki:Common.js/GemCalculators.js',
		'MediaWiki:Common.js/HeroSkins.js',
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

//JS added by TheWikiaEditMachine that adds JS from his test wikia tht would also work here for the new home page.
importScriptPage('MediaWiki:Common.js','twem');

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
        inactive: { u: 'Inactivo', title: 'Este usuario es inactivo.' },
        imageeditor: {u: 'Editor de Imágenes' }
        spy: { u: 'Espía', title: 'Este usuario espía en la wiki.' }
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
        
        'DarkGames26': ['spy'],
    };

$(function() {