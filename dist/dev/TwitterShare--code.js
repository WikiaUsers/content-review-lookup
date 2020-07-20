/**
 * TwitterShare
 *
 * Adds a button that allows sharing wiki articles via Twitter.
 * This functionality is now provided by the core of the Wikia/FANDOM skin, though it will still be maintained for Monobook.
 * Uses code from TumblrShare - https://dev.wikia.com/wiki/MediaWiki%3ATumblrShare/code.js
 * For personal use
 * @author KCCreations
 */

$(function() {
    if (window.TwitterShareLoaded) {
        return;
    }

    window.TwitterShareLoaded = true;

    $('#bodyContent').prepend(
        $('<div>', {
            id: 'twitterButton'
        }).append(
            $('<a>', {
                'class': 'twitter-share-button',
                'href': 'https://twitter.com/intent/tweet?text=' + document.title
            })
        )
    );

    mw.util.addCSS('#twitterButton { display: inline-block; padding: 0.25em; verticalAlign: top; }');

    importScriptURI('https://platform.twitter.com/widgets.js');
});