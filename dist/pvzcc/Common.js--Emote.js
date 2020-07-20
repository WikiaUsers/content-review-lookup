// Support for [[Template:Emote]] by Bobogoobo
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {'src':url, 'alt':emote}));
            }
        }
 
        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['25860'].revisions[0]['*'];
            // 25860 is the wgArticleId of MediaWiki:Emoticons
 
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
}