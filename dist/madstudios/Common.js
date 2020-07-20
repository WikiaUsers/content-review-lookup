/* Any JavaScript here will be loaded for all users on every page load. */

// ==============================
// Config scripts, list what each is used for.
// Most any config must go above the import statements.
// Unless stated otherwise.
// ==============================

// RevealAnonIP

window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};

// DynamicImages Config
DynamicImages = {
	gifImages: true,
        gifGalleryImages: false,
};

// Auto-refresh
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

//Auto Message Blocked
var MessageBlock = {
  title : 'Blocked.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : true
};

// ==============================


// ==============================
// Reveal Anon Users
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
        'u:dev:ListAdmins/code.js'
    ]
});

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

// ===========================================
// Message Wall Tags (Part 1)
// ===========================================
window.MessageWallUserTags = {
    tagColor: 'Green',
    glow: true,
    glowSize: '15px',
    glowColor: '#008000 ',
    users: {
        'beybladerfin': 'Bureaucrat',
    }
};
 
// ================================================================
// Username tags additions/filters (Working as intended)
// Don't mess with order without telling NightmareIris first, this
// breaks very easy.
// ================================================================

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Admin, Bureaucrat, Wikia Coder, #TheColdNeverBotheredMeAnyways, Too Werid To Live, To Rare To Die, #LetitGo'},
                newuser: { u:'Trainee'},
                coder: { u:'Wiki Coder'},
                waifu: {u:'Wiki Waifu'},
                magicalgirl: {u:'That One Guy With No Head'},
                founder: {u:'Head of Command'},
                horse: {u:'Horse-in-Command'},
                furby: {u:'Wiki Furry'},
                retired: {u:'Retired Founder'},
                supervisor: {u:'Supervisor'},
                harry: {u:'That one guy with no head'},
                patd: {u:'Too Weird To Live, To Rare To Die'},
                letitgo: {u:'#Let It Go'}
	}
};

UserTagsJS.modules.custom = {
	'beybladerfin': ['coder', 'bureaucrat', 'magicalgirl', 'patd', 'letitgo'], // Add Coder, Bureaucrat, Magicalgirl, Patd, and Letitgo
	'Psychobilly2422': ['coder', 'founder'], // Add Coder and Founder
        'Headless Harry': ['magicalgirl', 'bureaucrat'], // Adds Madoka Magica
        'Centaura': ['horse'],
        'Constable Huxley the Horse': ['horse'],
        'The Name Is Nick': ['furby'],
        'Vernanonix': ['retired'],
        'MaintenanceRequired': ['coder']
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'newuser'];
UserTagsJS.modules.metafilter = { sysop: ['bureaucrat', 'founder'], chatmoderator: ['sysop', 'bureaucrat', 'rollback'], rollback: ['sysop'], newuser: ['chatmoderator', 'bannedfromchat'], }
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = {
	days: 3, // Must have been on the Wiki for 3 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

UserTagsJS.modules.userfilter = {
	'beybladerfin': ['bureaucrat'], // Remove Bureaucrat from NightmareIris
	'Vernanonix': ['founder', 'bureaucrat'], // Remove the founder group
        'Headless Harry': ['bureaucrat'], //Remove Bureaucrat
};

// ===================
// Icons (Part 2)
// ===================
// Message wall icons
// By [[User:AnimatedCartoons]]
setInterval(function () {
    "use strict";
    $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/null/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/beybladerfin/g)) {
            $(this).addClass('waifu');
        }
        if ($user.match(/Homura-chan/g)) {
            $(this).addClass('magicalgirl');
        }
        if ($user.match(/Psychobilly2422/g)) {
            $(this).addClass('coder');
        }
        if ($user.match(/Pet The Lizards|Pableeceeo/g)) {
            $(this).addClass('chat-mod');
        }
        if ($user.match(/LeilaReed|Constable Huxley the Horse|Project Predacon|TheCatastrophe/g)) {
            $(this).addClass('rollback');
        }
        if ($user.match(/Centaura|RTUchiha|MaintenanceRequired/g)) {
            $(this).addClass('admin');
        }
        if ($user.match(/The Name Is Nick/g)) {
            $(this).addClass('bucketman');
        }
        if ($user.match(/Centaura/g)) {
            $(this).addClass('cent');
        }
        if ($user.match(/RageVG/g)) {
            $(this).addClass('rage');
        }
    });
}, 1);
 
// MessageWallUserTags config
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',  //Tag color – The color of the tag's text
    glow: true,           //Glow effect toggle – Value of 'true' turns on the glow effect, 'false' turns it off
    glowSize: '20px',     //Glow size – The default radius of the text-shadow glow effect
    glowColor: 'Indigo', //Glow color
    users: {
        'beybladerfin': 'Supervisor',
        'Headless Harry': 'Second-in-Command',
        'Psychobilly2422': 'Head of Command',
        'RTUchiha': 'Admin',
        'Centaura': 'Second-in-Command',
        'Pet_The_Lizards': 'Chat Mod',
        'The_Name_Is_Nick': 'Admin',
        'LeilaReed': 'Rollbacker',
        'MaintenanceRequired': 'Admin',
        'Pableeceeo': 'Chat Mod',
        'Constable_Huxley_the_Horse': 'Rollbacker',
        'RageVG': 'Chat Mod',
        'Project_Predacon': 'Rollbacker',
        'TheCatastrophe': 'Rollbacker',

    }
};


//===================================================================