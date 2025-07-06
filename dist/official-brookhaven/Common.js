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