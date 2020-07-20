importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:InfoboxEditorPreview.js',
        'u:dev:MediaWiki:MinimalTestModeAlert.js',
        'u:dev:MediaWiki:DiscussionsFeed.js',
        ]
});

/* Insert new imports inside the importArticles brackets */

/*NOTE: All changes must be final before submitting the Javascript for review*/

/* Link Preview Config */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/wargaming/images/3/3c/5OnCndU.gif/revision/latest?cb=20191004063250';
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/wargaming/images/2/23/Ku-xlarge.gif/revision/latest?cb=20191004063356';
window.pPreview.tlen = 1000;

/* Messg and Block | Import must be below config*/
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 for the following reason: "$1"',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});