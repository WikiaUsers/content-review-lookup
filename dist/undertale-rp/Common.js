/* ------- Please remember that JS is VERY EASY TO BREAK. Do NOT ------- */
/* -------     edit JS without letting Jaz know. Thank you!      ------- */

/* ----- General Stuff ----- */
/* Auto-Refresh */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* WikiaPage Digital Clock */
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (CST)';
/* --/-- General Stuff --/-- */

/* ----- Staff Stuff ----- */
/* Admin Dashboard: Javascript Shortcut */
var editURL;
$("#AdminDashboardGeneral .control-section.wiki .controls").prepend("<a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "'><div style='border: 1px solid #CCCCCC; width: 50px; height: 50px; border-radius: 7px; font-family: Arial; cursor: pointer; position: absolute; left: 430px; top: 58px;'><img src='https://vignette.wikia.nocookie.net/lllioliol/images/d/d0/JS.png/revision/latest?cb=20150727171949' width='36' height='22' style='position:absolute; top: 13px; left: 8px;'><p style='position:absolute; top: 50px; font-size: 11px;'><a href='" + (editURL || "/wiki/MediaWiki:Common.js?action=edit") + "' style='text-decoration:none;' onmouseover='text-decoration: underline;'>JavaScript</a></p></div></a>");

/* Custom Banner User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
        //Staff
        blu: {u:'Head of Command'},
        red: {u:'Wiki Coder'},
        vio: {u:'Administrator'},
        yel: {u:'Administrator'},
        cyn: {u:'Content Mod'},
        grn: {u:'Rollback'},
        //org: {u:''},
        bot: {u:'Bot'},
        //Non-Staff
        zac: {u:'Zacharie'},
        awe: {u: 'Awesome'},
        high: {u: 'Its High Noon'},
        bam: {u:'Bamhammer'},
	}
};

UserTagsJS.modules.custom = {
    'AetherBytes' : ['blu'],
    'TheSecondEdgeOfTheBlade' : ['red'],
    'Dr. Regina Phalange' : ['vio'],
    'Yossipossi' : ['yel'],
    'Geshtro' : ['grn'],
    'Slade The Demon' : ['cyn'],
    //'' : ['org'],
    'JazCode' : ['bot'],
    //Non-Staff
    'Daponyx' : ['bam'],
    'SquidFairy' : ['high'],
    'The Haze3456' : ['zac'],
    'Djracem' : ['awe'],
};

UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'moderator',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'newuser'
];

UserTagsJS.modules.metafilter = {
    bureaucrat: ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel', 'bot'],
    sysop: ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel', 'bot'],
    'content-moderator': ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel', 'bot'],
    threadmoderator: ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel', 'bot'],
    chatmoderator: ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel', 'bot'],
    rollback: ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel', 'bot'],
    bot: ['cyn', 'org', 'blu', 'vio', 'red', 'grn', 'yel'],
    newuser: ['chatmoderator', 'bannedfromchat']
};
/*  this one: ['is overridden', 'by these'] */

UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.isblocked = true;
UserTagsJS.modules.inactive = 30; // 30 days
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.userfilter = {
};

/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'GhostWhite',
    glow: true,
    glowSize: '22px',
    glowColor: 'GhostWhite',
    users: {
        'AetherBytes': 'Head of Command',
        'TheSecondEdgeOfTheBlade' : 'Wiki Coder',
        'Dr. Regina Phalange' : 'Administrator',
        'Yossipossi': 'Administrator',
        'Slade The Demon' : 'Content Mod',
        'Geshtro' : 'Rollback',
        'JazCode' : 'Bot',
    }
};
/* --/-- Staff Stuff --/-- */

importArticles({
type: "script", 
articles: [ "w:c:dev:MediaWiki:Countdown/code.js" ] 
});