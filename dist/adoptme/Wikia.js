// This is used from https://dev.wikia.com/wiki/UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
            leadadmin: { u: 'LEAD ADMINISTRATOR', link:'Wiki_Administration_and_Moderation_Team', order: -1/0 },
            bureaucrat: { u: 'BUREAUCRAT', link:'Wiki_Administration_and_Moderation_Team', order: 1 },
            contlead: { u: 'CONTENT MOD LEAD', link:'Wiki_Administration_and_Moderation_Team', order: 2 },
            disclead: { u: 'DISCUSSION MOD LEAD', link:'Wiki_Administration_and_Moderation_Team', order: 3 },
            leadadvisor: { u: 'LEAD ADVISOR', link:'Wiki_Administration_and_Moderation_Team', order: 4 },
            eventcord: { u: 'WIKI EVENT COORDINATOR', link:'Wiki_Administration_and_Moderation_Team', order: 5 },
            sysop: { u: 'ADMINISTRATOR', link:'Wiki_Administration_and_Moderation_Team', order: 6 },
            moderator: {u: 'GENERAL MODERATOR', link:'Wiki_Administration_and_Moderation_Team', order: 7 },
            'content-moderator': {u: 'CONTENT MODERATOR', link:'Wiki_Administration_and_Moderation_Team', order: 8 },
            threadmoderator: {u: 'DISCUSSIONS MODERATOR', link:'Wiki_Administration_and_Moderation_Team', order: 9 },
            event: {u: 'EVENT COMMITTEE MEMBER', link:'Wiki_Event_Team', order: 10 },
            expert: {u: 'EXPERT', link:'Wiki_Experts', order: 11 },
            dstaff: {u: 'DREAMCRAFT STAFF', order: 12 },
            retired: {u: 'FORMER WIKI STAFF', order: 13 },
            newuser: { u: 'NEW EDITOR', order: 14 }
	}
};

UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.userfilter = {   // used to exempt tags for specific people
	'Zeumus': ['founder'],
	'Vastmine1029': ['sysop']
};

UserTagsJS.modules.custom = {
    //Lead Admin
    'Vastmine1029':['leadadmin'],
    //Former Staff
    'Jeff816': ['retired'],
    'UltChowsk': ['retired'],
    'JJForge': ['retired'],
    'Indigoober': ['retired'],
    'Yeehawmburger': ['retired'],
    'Totally not Ashlynn': ['retired'],
    'MxdameKuyongx':['retired'],
    'Raz Mail': ['retired'],
    //DreamCraft Staff
    'Zeumus': ['dstaff','retired'],
    'NewFissy': ['dstaff'],
    'Horse1628': ['retired'],
    'Httpz': ['retired','dstaff'],
    //Staff In-Training
    'Sopho303': ['event'],
    //Leads
    'JoudyGoGamer': ['eventcord'],
    'Shadowlordgamer1': ['contlead','event'],
    'CaptainMystical': ['disclead','event'],
    //Adopt Me! Expert
    'JungkookIsMyEuphoria': ['expert'],
    'AligrlA': ['expert'],
    'Avocadomans': ['expert'],
    'RobloxFan2beamng': ['expert'],
    'EmperorGarmadon': ['expert'],
    'Dreamesquee': ['expert'],
    //Event Committee Member
    'CxffeeCat': ['event'],
    'KCGameing001': ['event'],
    'UnderwaterFox170': ['event'],
    'PumpkinHope': ['event']
};

UserTagsJS.modules.newuser = { //autoconfirmed
	days: 4, // Must have been on the Wiki for 4 days
	edits: 0, // And have at least 0 edits to remove the tag
	namespace: [0, 'Talk', 'User talk', 'Forum'] // Edits must be made to articles to count
};

UserTagsJS.modules.implode = {
    'moderator': ['content-moderator','threadmoderator'],
    'expert': ['rollback']
};

UserTagsJS.modules.metafilter = {
    'inactive': ['bureaucrat','sysop','moderator'],
    'bureaucrat': ['bureaucrat']
};

var MessageBlock = {
    title : 'Block Notice',
    message : 'You have been blocked for <u><b>$2</b></u> for the following reason:<br/><center><p style="border:1px solid black; padding:5px"><i>"$1"</i></p><b>Please read the [[Rules and Guidelines]] to understand the expectations in the Adopt Me! Wikia community.</b></center><br/><b><u>Appeal/Dispute</u></b><br/><u>If you would like to appeal or dispute,</u> please reply to this message with the following:<br/>1. Describe why you were blocked.<br/>2. Why should your block be ended early?', //$1 = reason, $2 = duration
    autocheck : true
};

window.MessageWallUserTags = {
    tagColor: 'Salmon',
    txtSize: '10px',
    glow: false,
    glowSize: '0px',
    glowColor: '',
    users: {
        //Admins
        'Vastmine1029': 'Lead Administrator • Wiki Staff',
        'CaptainMystical': 'Administrator • Wiki Staff',
        'Shadowlordgamer1': 'Administrator • Wiki Staff',
        'JoudyGoGamer': 'Administrator • Wiki Staff',
        'PumpkinHope': 'Administrator • Wiki Staff',
        //General Moderators
        'AligrlA': 'General Moderator • Wiki Staff',
        'IiDiscoveri': 'General Moderator • Wiki Staff',
        'Sopho303': 'General Moderator • Wiki Staff',
        'Mythienne': 'General Moderator • Wiki Staff',
        //Content Moderators
        'ThunderJimmy': 'Content Moderator • Wiki Staff',
        //Discussion Moderators
        'UnderwaterFox17': 'Discussion Moderator • Wiki Staff',
        'ER!CISAWESOME': 'Discussion Moderator • Wiki Staff',
        'Fiercetigs': 'Discussion Moderator • Wiki Staff',
        'JungkookIsMyEuphoria': 'Discussion Moderator • Wiki Staff',
        'Th3Y3ll0wL3m0n': 'Discussion Moderator • Wiki Staff',
        //Experts
        'Avocadomans': 'Expert • Wiki Staff',
        'RobloxFan2beamng': 'Expert • Wiki Staff',
        'EmperorGarmadon': 'Expert • Wiki Staff',
        'Dreamesquee': 'Expert • Wiki Staff',
        //Event Committee Members
        'CxffeeCat':'Event Committee Member • Wiki Staff',
        'KCGameing001':'Event Committee Member • Wiki Staff',
        //Wiki Manager
        'Tephra':'Wiki Manager • Fandom Staff'
    }
};