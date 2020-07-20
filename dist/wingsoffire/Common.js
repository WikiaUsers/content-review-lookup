/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
	modules: {},
	tags: {
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		cofounder: { u: 'Co-Founder', order:0 }
        }
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];
UserTagsJS.modules.metafilter = {
	sysop: ['founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'threadmoderator'],
	rollback: ['contentmoderator', 'sysop'],
	threadmoderator: ['sysop'],
	contentmoderator: ['sysop']
};

UserTagsJS.modules.custom = {
	'.oOEclipseOo.': ['csshelper'],
	'16.505225cb': ['cofounder'],
	'Arya Elf': ['templatehelper'],
	'Artifice the Nightwing': ['csshelper'],
	'BarronTheSkyWing': ['csshelper', 'templatehelper'],
	'Blackout the NightWing': ['csshelper', 'jshelper'],
	'ChicoryTheRainWing': ['csshelper'],
	'Eastern Cloud': ['csshelper'],
	'Heliosanctus': ['csshelper', 'templatehelper', 'jshelper'],
	'Lapisdragon3': ['csshelper', 'templatehelper'],
	'MacabreDragons': ['csshelper'],
	'Mysterygirl000': ['cofounder'],
	'Platypus the SeaWing': ['templatehelper', 'csshelper'],
	'RyugaTheDragonEmporer': ['jshelper'],
	'Skyla the Skywing': ['templatehelper', 'csshelper'],
	'Whispering Death': ['csshelper', 'templatehelper'],
};

$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('.DiscordIntegratorModule').insertAfter('.ChatModule');
    });
});

// our config is stored in an array
window.lessOpts = window.lessOpts || [];

// each target page needs separate configuration
window.lessOpts.push( {
    // this is the page that has the compiled CSS
    target: 'MediaWiki:Wikia.css',
    // this is the page that lists the LESS files to compile
    source: 'MediaWiki:Custom-wikia.less',
    // these are the pages that you want to be able to update the target page from
    // note, you should not have more than one update button per page
    load: [
        'MediaWiki:Wikia.css',
        'MediaWiki:Custom-wikia.less'
    ],
    // this is the page that contains the comment header for the target page
    // all other comments are stripped during compilation
    header: 'MediaWiki:Css-header/wikia'
});

window.SpoilerAlert = {
  'class': "Spoiler", //add <span class="Spoiler"></span> to a page to spoiler it
};

// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
window.AjaxRCRefreshText = 'Auto-refresh';

// Dragon anon avatars
function changeSourceAll() {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        if (images[i].src.includes('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/')) {
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/30", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/04/Anonymous_NightWing_Wiki.png/revision/latest?cb=20190914235013");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/50", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/04/Anonymous_NightWing_Wiki.png/revision/latest?cb=20190914235013");
            images[i].src = images[i].src.replace("https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/150", "https://vignette.wikia.nocookie.net/wings-of-fire-experimental/images/0/04/Anonymous_NightWing_Wiki.png/revision/latest?cb=20190914235013");
        }
    }
}
changeSourceAll();
 
setInterval(function(){
    changeSourceAll();
}, 1000);