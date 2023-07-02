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
        'MediaWiki:Numeral.js', // Defines num.format('<fmt>')
        'MediaWiki:Usernames.js',
        'MediaWiki:GemCalculators.js',
        'MediaWiki:Experience.js',
        'MediaWiki:ModeToggle.js',
        'MediaWiki:BadgeGenerator.js',
        'MediaWiki:Protection.js',
        'MediaWiki:AvailableBuildings.js',
        'MediaWiki:GoldPass.js',
        'MediaWiki:HeroSkins.js',
        'MediaWiki:Toggle.js',
        'MediaWiki:WikiNotification.js',
        'MediaWiki:ClanHouseGenerator.js',
        'MediaWiki:HeroSkins2.js',
    	]
    });
	
    // Customize tags on user profiles
    window.UserTagsJS = {
        modules: {},
        tags: {
            heroicuser:  { u: 'Most Heroic Contributor' },
            imageeditor: { u: 'Image Editor' },
            sysop: { u: 'Administrator' },
        	threadmoderator: { u: 'Discussions Moderator' },
            retiredstaff: { u: 'Retired Staff', title: 'This former staff member is inactive.' },
            inactive: { u: 'Retired Clasher', title: 'This user is inactive.' }
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
        'FaceBound': ['imageeditor', 'retiredstaff'],
        
        'Tonkaty': ['retiredstaff'],
        'GorillaMan': ['retiredstaff'],
        'Spottra': ['retiredstaff'],
        'Badw0lf007': ['retiredstaff'],
        'BlazedDragon': ['retiredstaff'],
        'Dahimi': ['retiredstaff'],
        'DarkDracolth': ['retiredstaff'],
        'ElementalChaos': ['retiredstaff'],
        'Eurus Allen': ['retiredstaff'],
        'Infinity323': ['retiredstaff'],
        'Japster': ['retiredstaff'],
        'Jeager117': ['retiredstaff'],
        'Kk9199': ['retiredstaff'],
        'Lugia101101': ['retiredstaff'],
        'Misso5': ['retiredstaff'],
        'Misssupersal': ['retiredstaff'],
        'Moseezator': ['retiredstaff'],
        'Reverb frost': ['retiredstaff'],
        'O8el1x': ['retiredstaff'],
        'Spirits of nature': ['retiredstaff'],
        'Stan890': ['retiredstaff'],
        'SynergyShade3624': ['retiredstaff'],
        'Tparry': ['retiredstaff'],
        'Utkar22': ['retiredstaff'],
		'WitchHealer': ['retiredstaff'],
		'Zazme Yakuza': ['retiredstaff'],
        'Zegaloft12': ['retiredstaff'],
        '2442cc': ['retiredstaff'],
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