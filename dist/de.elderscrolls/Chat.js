// Chat Options, SpeedEmoticons, Announcements, Tags Main Script Import
importArticles({
type : "script",
articles: [
"u:dev:ChatOptions/code.js",
"u:dev:!mods/code.js",
"u:dev:MediaWiki:ChatAnnouncements/code.js",
"u:dev:MediaWiki:ChatTags/code.js",
"w:c:shining-armor:MediaWiki:ChatTags/code.js"
]
});
// http://dev.wikia.com/wiki/ChatOptions
// http://dev.wikia.com/wiki/ChatHacks
// http://dev.wikia.com/wiki/ChatAnnouncements
// http://dev.wikia.com/wiki/ChatTags

// Chat Tags Autocomplete Feature
mw.loader.using('jquery.ui.autocomplete', function() {
    $(function() {
        var availableTags = [
            '[b][/b]',
            '[c=""][/c]',
            '[code][/code]',
            '[font=""][/font]',
            '[i][/i]',
            '[small][/small]',
            '[s][/s]',
            '[sub][/sub]',
            '[sup][/sup]',
            '[u][/u]',
        ];
 
        $('textarea[name=message]').autocomplete({
            source: availableTags,
            position: { my: "left bottom", at: "left top", collision: "none" }
        });
 
        mw.util.addCSS('.ui-autocomplete{border:1px solid #000;background:#000;width:150px!important}.ui-menu-item{background:#262626;border-bottom:2px solid #000}.ui-menu-item a{font-family:monospace;color:#848484!important}');
    });
});

/*source: http://korniux.wikia.com/wiki/SpeedEmoticon/latest.js?action=raw&ctype=text/javascript*/
importStylesheetURI('http://de.elderscrolls.wikia.com/wiki/Benutzer:Trollocool/emoticon.css?action=raw&ctype=text/css');
 
$('.Write').append('<div id="SpeedEmoticon"><img src="https://vignette.wikia.nocookie.net/elderscrolls2/images/a/ae/Emoticons_Daedrisch.png/revision/latest?cb=20170521162345&path-prefix=de" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
    });
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
    $('#poplist img')    .click(function(){
        var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
            messg = $('.message textarea').val();
        $('.message textarea').val(messg + txt + ' ').focus();
    });
    $('#poplist div').attr('style', '');
    console.log('SpeedEmoticon v1.7')
});