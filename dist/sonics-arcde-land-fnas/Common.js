/* Any JavaScript here will be loaded for all users on every page load. */ 
/* Maintainers: [[User:SnkEydKrisice]] [[User:Vyris]] */
//Last Edited Config
window.lastEdited = {
    avatar: false
};
 
// ==============================
importArticles({
    type: "script",
    articles: [
        'w:c:dev:RevealAnonIP/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:UserTags/code.js',
        'u:dev:DynamicImages/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:DisplayClock/code.js',
        'w:c:dev:AjaxRC/code.js',
        'u:dev:MessageBlock/code.js',
        'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:LockOldBlogs/code.js',
        'u:dev:LockForums/code.js',
        'MediaWiki:Common.js/plok.js', // (Club Penguin Wiki has crazy stuff)
        'u:dev:CleanWantedFiles/code.js'
    ]
});


// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,
};
 

 
// ================================================================
// BEGIN - Username replace function ([[Template:USERNAME]])
// * Description: Inserts user name into <span class="insertusername"></span>
// * Maintainers: [[User:Splarka]] (original), [[User:Spang]] (current)
// ================================================================

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

// RevealAnonIP
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};


var MessageBlock = {
  title : 'Blocked.',
  message : 'You are currently blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat'},
                founder: { u:'Head-Of-Command'},
                sysop: { u:'Admin'},
                chatmoderator: { u:'Chat Mod'},
                rollback: { u:'Rollback'},
                threadmoderator: { u:'Moderator'},
                snk: { u:'Luigifan'},
                coder:  { u:'Wiki Coder'},
                ultim: { u: 'Sonic.exe'},
                tyler: { u: 'Scissorman'},
                breaker: { u:'Springtrap'},
                mangle: { u:'Mangled'},
                fnaf: { u: 'Developer'},
                vy: { u: 'Shadow'}
	}
};
UserTagsJS.modules.custom = {
                'SnkEydKrisice': ['snk', 'bureaucrat', 'coder'],
                'HugeClockTowerFan': ['coder', 'bureaucrat', 'tyler'],
                'UltimateSonicGame123': ['founder', 'ultim', 'fnaf'],
                'Mangledmeddlingmetal': ['mangle'],
                'Golden Hybrid, Animatronic Breaker': ['breaker'],
                'Vyris': ['coder', 'vy'],
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], 
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
// ===================
// Icons (Part 2)
// ===================
// Message wall icons
// By [[User:AnimatedCartoons]]
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/NULLUSERNAME/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/SnkEydKrisice/g)) {
            $(this).addClass('snk');
        }
        if ($user.match(/HugeClockTowerFan|Vyris|Mangledmeddlingmetal/g)) {
            $(this).addClass('admin');
        }
        if ($user.match(/UltimateSonicGame123/g)) {
            $(this).addClass('admin');
        }
    });
}, 1);

window.MessageWallUserTags = {
    tagColor: '#0D0D65',
    glow: true,
    glowSize: '22px',
    glowColor: '#FF7F0F',
    users: {
        'UltimateSonicGame123': 'Founder',
        'SnkEydKrisice': 'Second-in-command',
        'Vyris': 'Admin',
        'HugeClockTowerFan': 'Bureaucrat',
        'Mangledmeddlingmetal': 'Admin',
        'Golden Hybrid, Animatronic Breaker': 'Admin',
    }
};

window.MessageWallUserTags = {
    tagColor: '#0D0D65',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '22px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: '#FF7F0F', //Glow color
    users: {
        'SnkEydKrisice': '2nd-in-Command',
        'UltimateSonicGame123': 'Founder',
        'Mangledmeddlingmetal': 'Admin',
        'Golden_Hybrid,_Animatronic_Breaker': 'Admin',
        'Vyris': 'Admin',
        'HugeClockTowerFan': 'Bureaucrat',
    }
};