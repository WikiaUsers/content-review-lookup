// 08:16, February 13, 2021 (UTC)

/* Any JavaScript here will be loaded for all users on every page load. */

window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};

window.ajaxRefresh = 60000;
window.ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Contributions',
    'Special:Log',
    'Special:Log/move',
    'Special:AbuseLog',
    'Special:NewFiles',
    'Special:NewPages',
    'Special:Watchlist',
    'Special:Statistics',
    'Special:ListFiles',
    'Category:Speedy_deletion_candidates',
    'Category:Speedy_move_candidates'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.LockForums = { 
    expiryDays: Infinity,
    warningDays: 90,
    warningMessage: "This thread has not been commented on for over <warningDays> days. There is no need to reply, unless it is part of the versus forum."};

window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { associated tag data },
        founder: {
            u: 'Founder',
            order: 1
        },
        bureaucrat: {
            u: 'Bureaucrat',
            order: 2
        },
        'former-bureaucrat': {
            u: 'Retired Bureaucrat',
            order: 3
        },
        sysop: {
            u: 'Administrator',
            order: 4
        },
        'former-sysop': {
            u: 'Retired Administrator',
            order: 5
        },
        'bot-global': {
            u: 'Global Bot',
            order: 7
        },
        bot: {
            u: 'Bot',
            order: 8
        },
        'content-moderator': {
            u: 'Content Moderator',
            order: 10
        },
        'former-content-moderator': {
            u: 'Retired Content Moderator',
            order: 11
        },
        threadmoderator: {
            u: 'Discussion Moderator',
            order: 13
        },
        'former-threadmoderator': {
            u: 'Retired Discussion Moderator',
            order: 14
        },
        chatmoderator: {
            u: 'Chat Moderator',
            order: 16
        },
        'former-chatmoderator': {
            u: 'Retired Chat Moderator',
            order: 17
        },
        rollback: {
            u: 'Rollback',
            order: 19
        },
        'former-rollback': {
            u: 'Former Rollback',
            order: 20
        },
        calc: {
            u: 'Calc Group',
            order: 22
        },
        'former-calc': {
            u: 'Retired Calc Group',
            order: 23
        },
        'js-helper': {
            u: 'JS Helper',
            order: 51
        },
        'css-helper': {
            u: 'CSS Helper',
            order: 52
        },
        'image-helper': {
            u: 'Image Helper',
            order: 53
        },
        'template-helper': {
            u: 'Templates Helper',
            order: 54
        },
        'human-resources': {
            u: 'Human Resources',
            order: 55
        },
        'former-human-resources': {
            u: 'Retired Human Resources',
            order: 56
        },        
        consultant: {
            u: 'Consultant',
            order: 100
        },
        'former-consultant': {
            u: 'Retired Consultant',
            order: 101
        },
        'former-image-helper': {
            u: 'Retired Image Helper',
            order: 102
        },

        bannedfromchat: {
            u: 'Banned from Chat',
            order: 500
        },
        inactive: {
            u: 'Inactive',
            order: 1 / 0
        }
    }
};
UserTagsJS.modules.inactive = {
    days: 30,
    // namespaces: [0, 'Talk', 'User', 'User talk', 'Forum'], // Only articles, talk pages, user pages, user talk pages or forums edits count, other Wikia namespace edits don't count
    zeroIsInactive: true // 0 edits = inactive
};
UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');
UserTagsJS.modules.autoconfirmed = true; // Switch on Autoconfirmed User check
UserTagsJS.modules.newuser = {
    computation: function(days, edits) {
        // If the expression is true then they will be marked as a new user
        // If the expression is false then they won't.
        // In this instance, newuser is removed as soon as the user gets 30
        // edits, OR as soon as they have been present for 10 days, whichever
        // happens first.
        return days < 10 && edits < 30;
    }
};
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'bot',
    'bot-global',
    'content-moderator',
    'threadmoderator', 
    'chatmoderator',
    'patroller',
    'rollback',
    'bannedfromchat'
];
UserTagsJS.modules.custom = {
    'Kavpeny': ['former-bureaucrat'],
    'DarkLK': ['former-bureaucrat', 'former-consultant'],
    'A6colute': ['former-sysop'],
    'KamiYasha': ['former-sysop'],
    'Spinosaurus75DinosaurFan': ['calc'],
    'Executor N0': ['calc'],
    'AidenBrooks999': ['former-calc', 'former-threadmoderator'],
    'Thebluedash': ['former-calc', 'former-threadmoderator'],
    'Antoniofer': ['former-calc'],
    'Amelia Lonelyheart': ['former-calc', 'former-human-resources', 'image-helper'],
    'The real cal howard': ['former-calc'],
    'ArbitraryNumbers': ['former-calc', 'former-threadmoderator'],
    'Golden Void': ['former-calc', 'former-threadmoderator'],
    'Liger686': ['former-calc', 'former-threadmoderator'],
    'Kepekley23': ['former-sysop', 'former-calc'],
    'TataHakai': ['former-calc'],
    'Zanybrainy2000': ['former-calc'],
    'RavenSupreme': ['former-calc'],
    'Therefir': ['calc'],
    'Mr. Bambu': ['calc'],
    'Peter "Quicksilver" Maximoff': ['image-helper'],
    'Galaxian Pyron': ['founder', 'former-bureaucrat'],
    'Polar-kun': ['former-bureaucrat'],
    'SeiryuShin': ['former-sysop'],
    'Rocks75': ['former-sysop'],
    'DontTalkDT': ['former-calc', 'consultant'],
    'Darkness552': ['former-sysop'],
    'Sheoth': ['former-sysop'],
    'SchutzenDunkelZiel1217': ['former-sysop'],
    'Gwynbleiddd': ['former-sysop', 'former-calc'],
    'LordAizenSama': ['former-sysop'],
    'KuuIchigo': ['former-sysop', 'former-calc'],
    'TheMightyRegulator': ['former-sysop'],
    'Alakabamm': ['former-sysop', 'former-calc'],
    'ThePerpetual': ['former-sysop', 'former-calc'],
    'CrossverseCrisis': ['former-sysop'],
    'Professor Voodoo': ['former-sysop'],
    'Dekoshu': ['former-content-moderator'],
    'The Living Tribunal1': ['former-content-moderator', 'former-calc'],
    'Basilisk1995': ['former-content-moderator'],
    'Colonel Krukov': ['former-chatmoderator', 'image-helper'],
    'Illuminati478': ['former-threadmoderator', 'former-calc'],
    'Unclechairman': ['former-threadmoderator'],
    'SwordSlayer99': ['former-threadmoderator'],
    'Faisal Shourov': ['former-threadmoderator'],
    'Austrian-Man-Meat': ['former-threadmoderator', 'former-calc'],
    'LordXcano': ['former-threadmoderator', 'former-calc'],
    'RadicalMrR': ['former-threadmoderator', 'former-calc'],
    'VenomElite': ['former-threadmoderator'],
    'Talonmask': ['former-chatmoderator'],
    'AkuAkuAkuma': ['former-chatmoderator'],
    'Byakuya "Senbonzakura" Kuchiki': ['former-chatmoderator'],
    'Rib78': ['former-calc'],
    'Gallavant': ['former-calc'],
    'DMUA': ['calc'],
    'Crimson Azoth': ['former-calc', 'former-threadmoderator'],
    'Ugarik': ['calc'],
    'AlexSoloVaAlFuturo': ['former-calc'],
    'Damage3245': ['calc'],
    'ClassicGameGuys': ['former-calc'],
    'Lina Shields': ['former-calc', 'former-sysop'],
    'Aparajita': ['former-calc'],
    'Grudgeman1706': ['former-threadmoderator'],
    'FanofRPGs': ['former-calc'],
    'Numbersguy': ['former-calc'],
    'ShieldsPlus': ['former-calc', 'former-sysop'],
    'Assaltwaffle': ['former-calc', 'former-sysop'],
    'ScarletFirefly': ['former-threadmoderator'],
    'Promestein': ['human-resources'],
    'Reppuzan': ['former-sysop', 'former-human-resources'],
    'Celestial Pegasus': ['human-resources'],
    'Kaltias': ['former-sysop', 'former-human-resources'],
    'SomebodyData': ['human-resources'],
    'Legion350': ['former-content-moderator'],
    'ALRF': ['former-chatmoderator', 'former-content-moderator'],
    'SleepyTBubble': ['former-chatmoderator', 'former-content-moderator'],
    'The Everlasting': ['former-sysop'],
    'Fllflourine': ['former-content-moderator', 'former-chatmoderator'],
    'Burning Full Fingers': ['former-content-moderator'],
    'Aeyu': ['former-threadmoderator'],
    'PaChi2': ['former-threadmoderator'],
    'Sandman31': ['former-threadmoderator'],
    'Sayo Yasuda': ['former-chatmoderator'],
    'Skalt711': ['image-helper'],
    'The Divine Phoenix': ['image-helper'],
    'Andytrenom': ['human-resources'],
    'Dargoo Faust': ['former-sysop', 'former-calc', 'former-human-resources'],
    'Wokistan': ['human-resources', 'calc'],
    'Matthew Schroeder': ['former-sysop'],
    'First Witch': ['former-chatmoderator'],
    'Azathoth the Abyssal Idiot': ['former-bureaucrat'],
    'WeeklyBattles': ['former-sysop'],
    'Sera EX': ['consultant'],
    'KGiffoni': ['calc'],
    'PrinceOfTheMorning': ['former-threadmoderator'],
    'TheRustyOne': ['calc'],
    'DemonGodMitchAubin': ['calc'],
    'Jasonsith': ['calc'],
    'The Calaca': ['former-threadmoderator'],
    'Dark649': ['former-sysop'],
    'Ricsi-viragosi': ['former-threadmoderator'],
    'Zaratthustra': ['image-helper'],
    'The Foolish Omniscient Guy': ['former-image-helper'],
    'ShiroyashaGinSan': ['former-threadmoderator'],
    'Crazylatin77': ['former-content-moderator'],
    'EvilMegaCookie': ['former-chatmoderator'],
    'TISSG7Redgrave': ['former-chatmoderator'],
    'RebubleUselet': ['former-chatmoderator'],
    'Crzer07': ['former-content-moderator'],
    'Ultima Reality': ['consultant'],
    'AKM sama': ['human-resources'],
    'Monarch Laciel': ['former-sysop'],
    'Super Saiyan God Julian': ['former-threadmoderator'],
    'Steven Pogi Paitao': ['former-content-moderator']
};

UserTagsJS.modules.metafilter = {
    // Remove inactive from all bureaucrats, sysops, bots, global bots, staff, wikia utility and vstf
    'inactive': [
        'sysop',
        'bureaucrat',
        'bot',
        'bot-global',
        'staff',
        'util',
        'vstf'
    ], 
    'sysop': ['bot', 'bot-global'], // Remove "Administrator" tag from bots and global bots
    'content-moderator': ['bureaucrat', 'sysop'], // Remove "Content Moderator" tag from bureaucrats and administrators
    'threadmoderator': ['bureaucrat', 'sysop'], // Remove "Discussions Moderator" tag from bureaucrats and administrators
    'chatmoderator': ['bureaucrat', 'sysop'], // Remove "Chat Moderator" tag from bureaucrats and administrators
    'rollback': ['bureaucrat', 'sysop'] // Remove "Rollback" tag from bureaucrats and administrators
};
// UserTagsJS.modules.stopblocked = true; //Enabled by default
//Manually turn off by changing true -> false

// Username script // 
(function () { 
if (wgUserName !== null) $('span.insertusername').text(wgUserName);
})();

// Bureaucrat promotion warning message //
!function() {
    if (wgCanonicalSpecialPageName !== 'Userrights') return;
    $('#mw-content-text').on('change', '#wpGroup-bureaucrat', function() {
    if ($('#wpGroup-bureaucrat').attr('checked') && !confirm('Do you truly want to appoint a bureaucrat?')) $('#wpGroup-bureaucrat').attr('checked', null);
    });
}();