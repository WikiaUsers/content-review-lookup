/* Any JavaScript here will be loaded for all users on every page load. */
 
(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem('commonjs')) {
        console.log('You have chosen to disable site-wide JavaScript ' +
                    'in MediaWiki:Common.js. Please remove \'commonjs\' ' +
                    'from localStorage to re-enable site-wide JavaScript.');
        return;
    }
	
	//Back to top JS import style setting
	window.BackToTopModern = true;
	
	/* Articles are interwiki links so that other wikis can use them. */
    importArticles({
        type: 'script',
        articles: [
        'u:dev:UserTags/code.js',
		"u:dev:MediaWiki:BackToTopButton/code.js",
		'MediaWiki:AttackStrategies.js',
        'MediaWiki:AvailableBuildings.js',
        'MediaWiki:BadgeGenerator.js',
        'MediaWiki:ChestLootTable.js',
        'MediaWiki:ClanHouseGenerator.js',
        'MediaWiki:Experience.js',
        'MediaWiki:GemCalculators.js',
        'MediaWiki:GoldPass.js',
        'MediaWiki:Group-sysop.js',
        'MediaWiki:HeroSkins.js',
        'MediaWiki:ModeToggle.js',
        'MediaWiki:Numeral.js', // Defines num.format('<fmt>')
        'MediaWiki:Protection.js',
		'MediaWiki:Requests.js',
        'MediaWiki:Toggle.js',
        'MediaWiki:Usernames.js',
        'MediaWiki:WikiNotification.js'
    	]
    });
	
    // Customize tags on user profiles
    window.UserTagsJS = {
        modules: {},
        tags: {
        	inactive: { u: 'Неактивный пользователь', title: 'Данный пользователь давно не редактировал на Wiki' },
        	retiredstaff: { u: 'Бывший администратор', title: 'Данный пользователь является бывшим администратором' },
        	rollback: { u: 'Хелпер', title: 'Отряд анти-вандализм' },
        	threadmoderator: { u: 'Младший модератор', title: 'Модератор сообщества' },
            'content-moderator': { u: 'Модератор', title: 'Модератор контента' },
            moderator: { u: 'Младший администратор', title: 'Администратор контента и сообщества' },
            sysop: { u: 'Администратор', title: 'Администрация Wiki' },
            bureaucrat: { u: 'Главный администратор', title: 'Главная администрация Wiki' }
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
    
    //Discussions + Content Mod = Moderator
    UserTagsJS.modules.implode = {
		'moderator': ['threadmoderator', 'content-moderator'],
    };
    
    UserTagsJS.modules.custom = {
        'Simon Pikalov': ['retiredstaff'],
        'Kofirs2634': ['retiredstaff'],
        'FaceBound': ['retiredstaff']
    };
    
	$(function() {
	   // Change Random Page button to only go to pages in the mainspace
	   $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/wiki/Special:Random/main");
	   
		// Clash Royale, Brawl Stars and Clash Quest topic interwiki links
		var elements = '#ClashRoyaleLink, #BrawlStarsLink, #ClashQuestLink';
		if ($('.page-header__languages').length) {
			$(elements).prependTo(".page-header__languages").css({"display": "inline-block"});
		}else {
			$(elements).appendTo(".page-header__top").css({"display": "inline-block"});
		}
	});
	
	//Upscale res and icon description images
	$(function () {
		if ($('.res').length || $('.icon-descriptions-template').length) {
			upscaleimages();
			if ($('.lazyload').length) {
				var interval = setInterval(function () {
					upscaleimages();
					if (!$('.icon-descriptions-template img, img.res').hasClass('lazyload')) {
			        	clearInterval(interval);
					}
				}, 100 );
			}
		}
	});
	function upscaleimages() {
		$('.icon-descriptions-template img, img.res').each(function () {
			$(this).attr('src', $(this).attr('src').split('/revision/')[0]);
		});
	}
	
	/*Random selection function- randomly selects child of class. Use:
	<div class="random-selection">
	<div>Random option 1</div><div>Random option 2</div><div>Random option 3</div>
	</div>
	*/
	$('.random-selection').each(function () {
		var number = $(this).children().length;
		var random = Math.floor(Math.random() * (number) + 1);
		$(this).children('*:nth-child(' + random + ')').addClass('active');
	});

    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the ' +
                'following JavaScript files:\n   ' + articles.join('\n   '));

}(jQuery, mediaWiki, window.localStorage));

//Lock old comments time limit
window.lockOldComments.limit = 100;