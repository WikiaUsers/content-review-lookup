/* Any JavaScript here will be loaded for all users on every page load. */
//PinnedActivity
window.pins = window.pins || {}
window.pins.pages = "Project:Pins";
importScriptPage('MediaWiki:PinnedActivity.js', 'bcow');

// Auto refresh
var ajaxPages         = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');

// UserTags
window.UserTagsJS = {
        modules: {},
        tags: {
                founder:             {u:'The Creator'},
                bot:                 {u:'Bot'},
                bureaucrat:          {u:'Bureaucrat'},
                sysop:               {u:'Administrator'},
                rollback:            {u:'Rollback'},
                chatmoderator:       {u:'Chat moderator'},
                threadmoderator:     {u:'Forum moderator'},
                critic:              {u:'Critic'},
                support:             {u:'Supporter'},
                systematicsafeguard: {u:'Systematic Safeguard'},
                test:                {u:'Test'}
        },
        oasisPlaceBefore: ''
};
UserTagsJS.modules.newuser = {
	days: 14,
	edits: 30,
};
UserTagsJS.modules.inactive   = 10;
UserTagsJS.modules.metafilter = {
        'bureaucrat':      ['founder', 'systematicsafeguard'],
        'sysop':           ['founder', 'rollback', 'chatmod', 'threadmod', 'systematicsafeguard'],
};
UserTagsJS.modules.mwGroups = ['founder', 'bot', 'support', 'critic', 'systematicsafeguard'];
//Adds custom usertags
UserTagsJS.modules.custom = {
        'CyberGuy23':            ['founder'],
        'Anonymoustyd':          ['bureaucrat'],
        'Logo12':                ['sysop'],
        'Mr.OAH':                ['chatmod'],
        'Doue':                  ['rollback'],
        'Kamarin':               ['chatmod','rollback'],
        'Derpinator9001':        ['rollback'],
        'Thaswordster':          ['critic','sysop','support'],
        'Love Robin':            ['systematicsafeguard'],
        'LoverofAllThingsCute':  ['threadmoderator', 'critic'],
        'Convicted Tomatophile': ['test']
};
// End of UserTags
// Replaces {{USERNAME}} with the name of the user browsing the page
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
// End of the {{USERNAME}} replacement
//Wall and forum tags
window.MessageWallUserTags = {
    tagColor:  '#FF0',
    glow:      true,
    glowSize:  '15px',
    glowColor: '#FF0',
    users: {
        'CyberGuy23':           'The creator',
        'Anonymoustyd':         'Head Administrator',
        'Meta07':               'Head Manager',
        'Logo12       ':        'Administrator',
        'Doue':                 'Enforcer',
        'Kamarin':              'Enforcer',
        'Derpinator9001':       'Enforcer',
        'Thaswordster':         'Administrator',
        'Love Robin':           'Systematic Safeguard',
        'LoverofAllThingsCute': 'Forum Manager',
    }
};

//Redirect button
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)

/* Spoiler code - hides pages in Category:Spoiler */
window.SpoilerAlert = {
    question: 'Spoiler alert! Would you like to proceed?',
    yes: 'Yes',
    no: 'Nah',
 isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    },
    back: true
};
importScriptPage('SpoilerAlert/code.js', 'dev');

// IMPORT
importArticles({
    type: 'script',
    articles: [
          "w:c:dev:TimedSlider/code.js",
          "w:c:dev:UserTags/code.js",
          "w:c:dev:AjaxRC/code.js",
          "w:c:dev:Verbatim/code.js",
          "w:c:dev:Countdown/code.js",
          "u:dev:DisplayClock/code.js",
          "u:dev:MessageWallUserTags/code.js",
          "u:dev:AjaxRedirect/code.js",
          "u:dev:BackToThread/code.js",
          "u:dev:DisableBotMessageWalls/code.js",
          "u:dev:DynamicImages/code.js",
          "u:dev:ExtendedNavigation/code.js",
          "u:dev:FloatingToc/code.js",
          "w:c:dev:FontAwesome/code.css",
          "u:dev:LuaError/code.js",
          "w:c:dev:PurgeBlogs/code.js",
          "w:c:dev:SpoilerAlert/code.js"
    ]
});


//poweruser checkbox at listusers, creds to 452
if (wgPageName=="Special:ListUsers") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span><span style="padding-bottom:5px;">Power Users</span></label></td>');

importScriptPage('WallGreetingButton/code.js', 'dev');
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
importScriptPage('User Rights Reasons Dropdown/code.js', 'dev');

/* Discord widget from dev wiki*/
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Discord server",
        id: "146798896759177217",
        theme: "dark"
    }
};