/**
 * Add "Purge" content action link.
 *
 * Dependencies: mediawiki.util
 *
 * @source www.mediawiki.org/wiki/Snippets/Purge_action
 * @revision 2014-05-14
 */
$( function () {
    if ( !$( '#ca-purge' ).length && mw.config.get( 'wgIsArticle' ) ) {
        mw.util.addPortletLink(
            'p-cactions',
            mw.util.wikiScript() + '?' + $.param({ title: mw.config.get( 'wgPageName' ), action: 'purge' }),
            mw.config.get( 'skin' ) === 'vector' ? 'Purge' : '*',
            'ca-purge',
            'Purge the server cache of this page',
            '*'
        );
    }
} );


console.log('Niko testing!');

// Test123

/* this is just a test of review process */