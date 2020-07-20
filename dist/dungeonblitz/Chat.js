importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Emoticons/code.js'
    ]
});

/* Add Buttons */
$(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    }
});

/* KockaEmoticons help text change */
window.kockaEmoticons = {
    help: 'Select an emoticon by clicking on it. <a href="/wiki/MediaWiki:Emoticons" target="_blank">Full list.</a>.'
};