/* Any JavaScript here will be loaded for all users on every page load. */
 
/* AjaxRC */
window.ajaxPages = [
    "Special:WikiActivity",
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:Images"
];
 
//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
    tags: {
            'bot': {link: 'Special:ListUsers/bot'},
            'bureaucrat': {link: 'Special:ListUsers/bureaucrat'},
            'chatmoderator': {link: 'Special:ListUsers/chatmoderator'},
            'content-moderator': {link: 'Special:ListUsers/content-moderator'},
            'rollback': {link: 'Special:ListUsers/rollback'},
            'sysop': {link: 'Special:ListUsers/sysop'},
            'threadmoderator': {link: 'Special:ListUsers/threadmoderator'
    }
    },
};
 
 
/* to make ReportLog visible */
(function showLogs() {
var $reportLog = $('.ReportLog');
ug = mw.config.get('wgUserGroups');
if ( wgPageName==="Special:WikiActivity" && $reportLog.length === 0) setTimeout(showLogs, 250);
else if (ug.indexOf('bot') + ug.indexOf('chatmoderator') + ug.indexOf('imagecontrol') + ug.indexOf('rollback') + ug.indexOf('sysop') + ug.indexOf('patroller') + ug.indexOf('bureaucrat') > -7) $reportLog.css('display', 'block');
})();
};
 
UserTagsJS.modules.custom = {
    // 'username': ['tag'], (The last line doesn't need
    // a comma at the end but all the other do)
    'WillMystery': ['overall'],
    'Cutiesunflower': ['overall'],
    'ChumChum999': ['founder']
};

<nav class="pi-navigation pi-item-spacing pi-secondary-background pi-secondary-font"><div dir="ltr" class="mw-geshi mw-content-ltr pi-data-value"><div class="javascript source-javascript">importArticles<span class="br0">(</span><span class="br0">{</span><br />    type<span class="sy0">:</span> <span class="st0">'script'</span><span class="sy0">,</span><br />    articles<span class="sy0">:</span> <span class="br0">[</span><br /><span class="xtra ln-xtra">        <span class="st0">'u:dev:MediaWiki:WallGreeting.js'</span><span class="sy0">,</span><br /></span>    <span class="br0">]</span><br /><span class="br0">}</span><span class="br0">)</span><span class="sy0">;</span></div></div></nav><div class="pi-item pi-data pi-item-spacing pi-border-color"></div>