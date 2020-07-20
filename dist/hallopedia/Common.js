importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});

function addTwitterButton() {
   $('#twitter-button').append('<a href="http://twitter.com/ChakorChanning" class="twitter-follow-button" data-show-count="true" data-show-screen-name="false">Follow @ChakorChanning on Twitter</a><script src="https://platform.twitter.com/widgets.js" type="text/javascript"></script>');
}
$(addTwitterButton);