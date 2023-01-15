// Please use the Dev script
;(function($, mw, Mustache) {
   // Loads or checks for DiscussionsRC
   if (window.discRC) {
      return;
   }
   importArticles({
      type: 'script',
      articles: [
         'u:dev:MediaWiki:DiscussionsRC.js',
      ]
   });
})(jQuery, mediaWiki, Mustache);