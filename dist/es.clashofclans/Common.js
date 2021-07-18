if (wgPageName === 'Wiki_Clash_of_Clans_en_Español') {
  importScriptPage('MediaWiki:Portada.js');
}
QuickCommentsreason = 'Añadir comentarios basura';
QuickCommentsdeletereason = 'spam';
QuickCommentsduration = '3 days';


importArticles({
	type: 'script',
	articles: [
		'u:dev:ExtendedNavigation/code.js',
		'u:dev:QuickComments/code.js',
		'w:c:clashofclans:MediaWiki:Common.js/ModeToggle.js',
		'MediaWiki:Common.js/Usernames.js',
	    'u:dev:UserTags/code.js',
	    'u:dev:MediaWiki:AddBlockUserTag/code.js',
		]
});

/* Tomado de la wiki inglesa (con permiso de ellos/Taken from the English wiki (with their permission). */
 
(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript ' +
                    'in MediaWiki:Common.js. Please remove \'commonjs\' ' +
                    'from localStorage to re-enable site-wide JavaScript.');
        return;
    }
	
	/* Articles are interwiki links so that other wikis can use them. */
    importArticles({
        type: 'script',
        articles: [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
        'w:c:spottra:MediaWiki:Common.js/AjaxGallery.js',
        'MediaWiki:Common.js/GoldPass.js',
        'u:dev:Countdown/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:UserTags/code.js',
        'MediaWiki:Common.js/RGBColor.js',
        'MediaWiki:Common.js/Usernames.js',
        'MediaWiki:Common.js/Sliders.js',
        'MediaWiki:Common.js/GemCalculators.js',
        'MediaWiki:Common.js/Experience.js',
        'MediaWiki:Common.js/Tabber2.js',
        'MediaWiki:Common.js/ImageHover.js',
        'MediaWiki:Common.js/CumulativeCosts.js',
        'MediaWiki:Common.js/ModeToggle.js',
        'MediaWiki:Common.js/PageVerify.js',
        'MediaWiki:Common.js/GorillaMan.js',
        'MediaWiki:Common.js/Lugia.js',
        'MediaWiki:Common.js/BadgeGenerator.js',
        'MediaWiki:Common.js/Protection.js',
        'MediaWiki:Common.js/AvailableBuildings.js',
        'MediaWiki:Common.js/HeroSkins.js',
        'MediaWiki:Common.js/Toggle.js'
    	]
    });
	
	/*Remove Edit Wall Greeting button unless it's your own or if you're staff*/
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
        	threadmoderator: { u: 'Moderador de discusiones' },
        	'content-moderator': { u:'Moderador de contenido'},
        	rollback : { u:'Reversores'},
            inactive: { u: 'Inactivo', title: 'Este usuario es inactivo.' },
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


$(document).ready(function() {

    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");

    // Clash Royale and Brawl Stars topic interwiki links
	$("#ClashRoyaleLink, #BrawlStarsLink").prependTo(".page-header__languages, .page-header__contribution > div:first-child").css({"display": "inline-block"});
});