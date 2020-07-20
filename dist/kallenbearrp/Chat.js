var chatTopic = '<a href="/wiki/Special:Chat?action=purge" title="Refresh the KallenbearRP Wiki Chat" style="position:relative;text-decoration:underline;color:#9400D3;text-shadow:0px 0px 2px black;">~ Welcome to KallenbearRP Chat ~</a><br /><a href="/wiki/Chat_Rules" target="_blank" title="KallenbearRP wiki chat rules" style="position:relative;text-decoration:underline;">Chat rules</a> • <a href="/wiki/Staff" title="KallenbearRP wiki list of Staff" target="_blank" style="position:relative;text-decoration:underline;">Staff</a> • <a href="/wiki/w:c:dev:ChatTags%23Usage" target="_blank" title="Dev wiki Chat Tags help" style="position:relative;text-decoration:underline;">Chat Tags</a> • <a href="/wiki/Disclaimer" title="KallenbearRP wiki Emoticons Disclaimer" target="_blank" style="position:relative;text-decoration:underline;">Disclaimer</a>';
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:80%;z-index:0;font-size: 13px;color:#9400D3;font-weight:bold;text-shadow:0px 0px 2px black;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});

// Chat Messages Counter On Tab
importScriptPage('ChatCount/code', 'korniux');
// http://korniux.wikia.com/wiki/ChatCount

// Chat Options Main Script Import
importArticles({
    type    : "script",
    articles: [
        "u:dev:ChatOptions/code.js",
        "u:dev:!mods/code.js"
    ]
});
// http://dev.wikia.com/wiki/ChatOptions
// http://dev.wikia.com/wiki/ChatHacks

// Add Speed Emoticons Button Script Import
importScriptPage('SpeedEmoticon/latest.js', 'korniux');
// http://korniux.wikia.com/wiki/SpeedEmoticon

// Chat Announcements Script Import
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
// http://dev.wikia.com/wiki/ChatAnnouncements

// Main Chat Tags Script Import
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
// http://dev.wikia.com/wiki/ChatTags

// Chat Tags Autocomplete Feature
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
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #000;background:#000;width:150px!important}.ui-menu-item{background:#3a3a3a;border-bottom:2px solid #000}.ui-menu-item a{font-family:monospace;color:#FFA500!important}');
    });
});
// http://shining-armor.wikia.com/wiki/User_blog:Shining-Armor/ChatTags_update_01062016