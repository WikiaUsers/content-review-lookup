/**
 * 20:05, July 8, 2015 (UTC)
 * http://naruto.wikia.com/wiki/MediaWiki:Chat.js
 * This is the IRC chat JavaScript file for the Wiki. 
 */

//Chat Notifications

var sfNotifications = {};
sfNotifications.options = {
    caseInsensitive: true,
    pings: [mw.config.get("wgUserName")],
};

if (($.inArray("sysop",wgUserGroups) + $.inArray("chatmoderator",wgUserGroups)) > -2) {
    sfNotifications.options.pings.push("!mod");
}

importArticles({
    type    : "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        "u:dev:ChatNotifications/code.js",
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});

mw.loader.using('jquery.ui.autocomplete', function() {
    $(function() {
        var availableTags = [
            '[b][/b]',
            '[bg=""][/bg]',
            '[big][/big]',
            '[c=""][/c]',
            '[code][/code]',
            '[font=""][/font]',
            '[i][/i]',
            '[img=""]',
            '[small][/small]',
            '[s][/s]',
            '[sub][/sub]',
            '[sup][/sup]',
            '[u][/u]',
            '[yt=""]'
        ];
 
        $('textarea[name=message]').autocomplete({
            source: availableTags,
            position: { my: "left bottom", at: "left top", collision: "none" }
        });
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #000;background:#000;width:150px!important}.ui-menu-item{background:#fff;border-bottom:2px solid #000}.ui-menu-item a{font-family:monospace;color:#000!important}');
    });
});