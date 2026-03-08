/* Adds a snowing effect to the background of light mode pages. */
mw.loader.using(['mediawiki.util', 'ext.fandom.ContentReview.legacyLoaders.js'], function() {
  if (mw.user.options.get('gadget-SnowStorm')) {
    if (document.body.classList.contains('theme-fandomdesktop-light')) {
      importArticles({
        type: 'script',
        articles: ['u:dev:MediaWiki:SnowStorm.js']
      });
    }
  }
});