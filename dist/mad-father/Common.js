/* Any JavaScript here will be loaded for all users on every page load. */
/*Keep in mind, this stuff breaks easily. Please message Taz if something is no longer working!*/

/*Clock*/
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
 
 /*Tags and shiz*/
importArticles({ 
    type: "script",
    articles: [
        'u:dev:DisplayClock/code.js',
	'w:c:dev:UserTags/code.js',
	'MediaWiki:Common.js/minx.js'
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Admin'},
                coder: { u:'Wiki Coder'},
                head: { u:'Head Of Command'},
                two: { u:'Second In Command'},
                satan: { u:'The True Devil'},
	}
};
 
UserTagsJS.modules.custom = {
	'Taz Da Wolfe': ['coder'],
        'Wikiausername66789': ['satan'],
        'ポッミーチャン': ['head']
        
};
 
 /*Filtering tags and shiz*/
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'moderator', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat', 'newuser'] };
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
    'LoverlySue': ['founder', 'bureaucrat'],
    'Taz Da Wolf': ['bureaucrat'],
    'ポッミーチャン': ['bureaucrat'],
};

/*Don't touch dis stuff, dis shit annoying!*/

window.MessageWallUserTags = {
    tagColor: '#0D0D65',
    glow: true,
    glowSize: '22px',
    glowColor: '#FF7F0F',
    users: {
        'Taz Da Wolf': 'Coder',
        'Wikiausername66789': 'Head Of Command',
    }
};

// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================
 
$(document).ready( function () {
   if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
   $('span.insertusername').each(function() {
       $(this).text(wgUserName);
   });
});
 
// ================================================================
// END - Username replace function ([[Template:USERNAME]])
// ================================================================


/*The diff code*/

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});

/*Something...*/

var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};

importScriptPage('ExternalImageLoader/code.js', 'dev');