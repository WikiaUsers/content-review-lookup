/*
mw.loader.using(['mediawiki.util', 'mediawiki.api', 'jquery'], function() {
    mw.hook('wikipage.editform').add(function($form) {
        $form.on('submit', function(e) {
            var bannedWords = [];
            var articleText = $('#wpTextbox1').val();
            var regex = new RegExp(bannedWords.join("|"), "i");

            if (regex.test(articleText)) {
                alert("Your edit contains banned words and cannot be saved.");
                e.preventDefault();
            }
        });
    });
});
*/
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:OppressionTitleFont.js',
        'MediaWiki:AuraDescription.js',
]
});