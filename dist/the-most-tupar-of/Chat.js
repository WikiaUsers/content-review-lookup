importArticles( { 
    type: 'script', 
    articles: [ 
        'u:dev:GiveChatModPrompt/code.js', 
        'u:dev:ChatAnnouncements/code.js', 
        'u:dev:ChatOptions/code.js', 
        'u:shining-armor:MediaWiki:ChatTags/code.js', ]
    }
);
 
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
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #079600;background:#15ba12;width:150px!important}.ui-menu-item{background:#012200;border-bottom:2px solid #15ba12}.ui-menu-item a{font-family:Georgia;color:#ff00f0!important}');
    });
});