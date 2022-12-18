$(function() {
    function emotify($this) {
        var emote = $this.text();
        var url = emotes.match(
            new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' +
                emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
                ')', 'i'));
        if (url) {
            url = url[1];
            $this.html($('<img />', {
                'src': url,
                'alt': emote
            }));
        }
    }

    var emotes = '';
    $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' +
        '&rvprop=content&format=json',
        function(data) {
            emotes = data.query.pages['2153'].revisions[0]['*'];
            // 2153 is the wgArticleId of MediaWiki:Emoticons

            $('.emote-template').each(function() {
                emotify($(this));
            });
        });

    $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
        if ($('.emote-template').length === $('.emote-template img').length) {
            return;
        }

        $('#WikiaArticleFooter .emote-template').each(function() {
            if (!($(this).children('img').length)) {
                emotify($(this));
            }
        });
    });
});

// Credit to Bobogoobo

window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity/activity",
    "Special:WikiActivity"
];
window.ajaxRefresh = 30000;

var AjaxRCRefreshText = 'A̶J̶A̶X̶   FRANCIS';

importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');