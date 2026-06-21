// Wrap inside a window load function to prevent race conditions
$(window).on('load', function () {
    mw.loader.using('mediawiki.config', function () {
        var namespaceId = mw.config.get('wgNamespaceNumber');
        var isTalkPage = mw.config.get('wgIsTalkPage');

        if (namespaceId !== 4 && !isTalkPage) {
            var $embedContainer = $('<div>', { 'class': 'discussions-embed' });
            $('#mw-content-text').append($embedContainer);
        }
    });
});


// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

mw.loader.using('ext.discuss.featured').then(function () {
  if (mw.config.get('wgNamespaceNumber') === 0) {
    const articleId = mw.config.get('wgArticleId');
    const $target = $('<div class="related-discussions-box"></div>');
    $('.mw-parser-output').append($target);
    window.DiscussionFeed = window.DiscussionFeed || [];
    window.DiscussionFeed.push({
      el: $target[0],
      articleId: articleId,
      limit: 3
    });
  }
});

// rubik font

(function() {
    var link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
})();