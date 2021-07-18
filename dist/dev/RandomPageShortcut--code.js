(function($, mw) {
    'use strict';

    if ( $('a[data-tracking="random-page"]').length ) return;
 
    mw.loader.using('mediawiki.util').then(function() {
        mw.hook('dev.fetch').add(function (fetch) {
            fetch('randompage').then(function(msg) {
                $('.wiki-tools').each(function(_, el) {
                    var $tool = $(el).find('[data-tracking="recent-changes"]');
                    $tool
                        .clone()
                        .attr({
                            href: mw.util.getUrl('Special:Random'),
                            title: msg,
                            'data-tracking': 'random-page'
                        }).insertAfter($tool)
                        .find('svg')
                        .html('<path d="M 9 6 c 1.705 0 3.009 1.3 3.009 3 s -1.304 3 -3.01 3 c -1.704 0 -3.008 -1.3 -3.008 -3 S 7.295 6 9 6 m 0 9 c 3.61 0 6.42 -3.1 7.624 -4.9 c 0.5 -0.7 0.5 -1.6 0 -2.3 C 15.42 6.1 12.61 3 9 3 C 5.389 3 2.58 6.1 1.376 7.9 c -0.501 0.7 -0.501 1.6 0 2.2 C 2.58 11.9 5.389 15 9 15"></path>');
                });
            });
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Fetch.js'
    });

})(window.jQuery, window.mediaWiki);