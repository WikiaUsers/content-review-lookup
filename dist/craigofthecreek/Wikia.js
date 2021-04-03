//This is where all javascript codes, added upon from dev wiki

importScript('MediaWiki:Wikia.js/userRightsIcons.js');
EditIntroButtonText = 'intro';
importArticles({
    type: 'script',
    articles: [
        'u:diepio:MediaWiki:BlogLink/code.js'
    ]
});
window.ArticleRating = {
    title: {
        'Category:Episodes': 'Rate this episode',
        'Category:Songs': 'Rate this song',
        'Category:Video games': 'Rate this game',
        'Category:Seasons': 'Rate this season',
        'Category:Shorts': 'Rate this short',
        'Category:Main characters': 'Rate this character',
        'Category:Secondary characters': 'Rate this character'
    },
    excludeCats: ['Category:Browse','Category:Article stubs']
}

window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/craigofthecreek/images/7/7c/Craig_of_the_Creek_Logo.png/revision/latest/scale-to-width-down/200?cb=20180109160827';