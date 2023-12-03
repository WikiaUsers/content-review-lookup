/**
 * MakeCommentsHeadersGreatAgain
 *
 * Brings back custom comment box headers
 * @author Dorumin
 */

mw.loader.using('mediawiki.api').then(function() {
    var wg = mw.config.get([
        'wgArticleId',
        'wgPageName',
        'wgNamespaceNumber',
        'wgIsMainPage'
    ]);

    var $comments = $('#articleComments');
    
    // Don't display on main page and non-existent articles.
    if (wg.wgIsMainPage || wg.wgArticleId === 0) return;

    if ($comments.length === 0) {
        // Check if the namespace would normally have comments
        if (wg.wgNamespaceNumber !== 0) return;

        // If there would be comments, but none were found, insert them synthetically
        // This behavior is for wikis that decide to have a bottom banner where the old comments would have been, but were disabled
        // Maybe to redirect viewers to a discord or something that doesn't suck, I dunno

        $comments = $('<div>', {
            id: 'ArticleCommentsHeader-container'
        });

        $('#WikiaMainContentContainer, .page-footer').append($comments);
    }

    function getHeader() {
        return $.Deferred(function(def) {
            var cached = sessionStorage.getItem('CachedCommentsHeader');

            if (cached !== null) {
                def.resolve(cached);
                return;
            }

            new mw.Api().get({
                action: 'query',
                meta: 'allmessages',
                ammessages: 'Custom-comments-header',
                amargs: wg.wgPageName,
                // Cache message contents on the CDN for 10 minutes for anonymous users
                smaxage: 600,
                maxage: 600
            }).then(function(res) {
                var message = res.query.allmessages[0];

                if (!message || message.hasOwnProperty('missing')) {
                    sessionStorage.setItem('CachedCommentsHeader', '');
                    def.resolve('');
                    return;
                }

                new mw.Api().get({
                    action: 'parse',
                    title: wg.wgPageName,
                    text: message['*'],
                    // Cache rendered message on the CDN for 10 minutes for anonymous users
                    smaxage: 600,
                    maxage: 600
                }).then(function(res) {
                    var html = res.parse.text['*'];

                    sessionStorage.setItem('CachedCommentsHeader', html);
                    def.resolve(html);
                }).fail(function(e) {
                    if (e.error) {
                        sessionStorage.setItem('CachedCommentsHeader', '');
                        def.resolve('');
                        return;
                    }
                });
            }).fail(function(e) {
                if (e.error) {
                    sessionStorage.setItem('CachedCommentsHeader', '');
                    def.resolve('');
                    return;
                }
            });
        });
    }

    getHeader().then(function(html) {
        var $container = $('<div>', {
            class: 'ArticleCommentsHeader-container',
            css: {
                marginBottom: '20px'
            }
        });

        // SAFETY: html comes straight out of the mw parser, pre-sanitized
        $container.html(html);

        $comments.before($container);

        // This line will expose the newly inserted parser output in the document
        // to hooks expecting it to add features and whatever, like collapsibles
        // This may bring issues with overriding the last seen event,
        // but that's not my problem to solve
        mw.hook('wikipage.content').fire($container);
    });
});