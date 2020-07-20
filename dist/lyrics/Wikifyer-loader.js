(function ($, mw) {
    'use strict';

    // Loading wikifyers only for particular pages:
    switch (mw.config.get('wgPageName')) {
    case 'Special:Wikify':
        importArticles({type: 'script', article: 'MediaWiki:Wikifyer-musicbrainz.js'});
        break;
    case 'User:Senvaikis/Wikifyer':
        importArticles({type: 'script', article: 'MediaWiki:Wikifyer-itunes.js'});
        break;
    case 'User:Senvaikis/SpWikifyer':
        importArticles({type: 'script', article: 'MediaWiki:Wikifyer-spotify.js'});
        break;
    }

    // Adding link to iTunes Wikifyer into MyTools menu:
    $(function () {
        var wikifyerUrl = mw.util.getUrl('User:Senvaikis/Wikifyer');

        // Include page name in url for pages in the main namespace
        if (mw.config.get('wgNamespaceNumber') === 0) {
            wikifyerUrl += '?page=' + encodeURIComponent(mw.config.get('wgPageName'));
        }

        $('#my-tools-menu, #p-tb ul').prepend('<li><a href="' + wikifyerUrl + '">Wikifyer</a></li>');
    });

}(jQuery, mediaWiki));