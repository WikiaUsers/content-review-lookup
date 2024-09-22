mw.loader.using(['mediawiki.util', 'mediawiki.api', 'jquery'], function() {
    mw.hook('wikipage.editform').add(function($form) {
        $form.on('submit', function(e) {
            var bannedWords = ["word1", "word2", "word3"];
            var articleText = $('#wpTextbox1').val();
            var regex = new RegExp(bannedWords.join("|"), "i");

            if (regex.test(articleText)) {
                alert("Your edit contains banned words and cannot be saved.");
                e.preventDefault();
            }
        });
    });
});