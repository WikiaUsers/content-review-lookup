/* Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de la página. */

importArticles({
	type: 'script',
	articles: [
		'w:c:clashofclans:MediaWiki:Common.js/ModeToggle.js',
		]
});

(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript ' +
                    'in MediaWiki:Common.js. Please remove \'commonjs\' ' +
                    'from localStorage to re-enable site-wide JavaScript.');
        return;
    }
	
	/* Los artículos son enlaces interwiki para que otros wikis puedan utilizarlos. */
    importArticles({
        type: 'script',
        articles: [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
         'u:dev:UserTags/code.js',
        'MediaWiki:Common.js/Usernames.js',
        'MediaWiki:Common.js/GemCalculators.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:Common.js/BadgeGenerator.js',
        'MediaWiki:Common.js/Protection.js',
        'MediaWiki:Common.js/AvailableBuildings.js',
        'MediaWiki:Common.js/GoldPass.js',
        'MediaWiki:Common.js/HeroSkins.js',
        'MediaWiki:Common.js/Toggle.js'
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
				}
			}, 10);
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
            inactive: { u: 'Clasher Inactivo', title: 'Este usuario es inactivo.' },
            newuser: {u: 'Nuevo usuario' }
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

	$(function() {
	   	// Clash Royale, Brawl Stars and Clash Quest topic interwiki links
		var elements = '#ClashRoyaleLink, #BrawlStarsLink, #ClashQuestLink';
		if ($('.page-header__languages').length) {
			$(elements).prependTo(".page-header__languages").css({"display": "inline-block"});
		}else {
			$(elements).appendTo(".page-header__top").css({"display": "inline-block"});
		}
	});

    if (typeof(window.SpoilerAlert) === 'undefined') {
        window.SpoilerAlert = {
            question: 'Chief! This page contains sneak peeks. Are you sure you ' +
                      'want to enter?',
            yes: 'Yes, please',
            no: 'No, let it be a surprise',
            isSpoiler: function () {
                return (-1 !== wgCategories.indexOf('Spoiler') &&
                    Boolean($('.spoiler').length));
            }
        };
    }
    
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the ' +
                'following JavaScript files:\n   ' + articles.join('\n   '));

}(jQuery, mediaWiki, window.localStorage));