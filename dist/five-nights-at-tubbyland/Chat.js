/*
* Heyo! It's me, [[User:SketchNebula]]. As a new wiki coder and the old one being
* inactive, I was announced as the main one to take care of the code on this wiki now.
* This being said, I'd like to be informed before you edit or take code from this. Also,
* please do not reorganize this. I've put them all in a specific order so that I do not
* have to scavenger all through the JS to find a certain snippet of code.
* Grazie!
 
~ ~ ~ SketchNebula ~ ~ ~
*/
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
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #000;background:#000;width:150px!important}.ui-menu-item{background:#fff;border-bottom:2px solid #000}.ui-menu-item a{font-family:monospace;color:#000!important}');
    });
});