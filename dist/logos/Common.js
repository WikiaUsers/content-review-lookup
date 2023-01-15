window.mwCustomEditButtons = (window.mwCustomEditButtons || []).concat([
    {
        imageFile: 'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
        speedTip: 'Redirect',
        tagOpen: '#REDIRECT[[',
        tagClose: ']]',
        sampleText: 'Insert Text'
    },
    {
        imageFile: 'https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png',
        speedTip: 'Strike',
        tagOpen: '<s>',
        tagClose: '</s>',
        sampleText: 'Strike-through text'
    },
    {
        imageFile: 'https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png',
        speedTip: 'Line break',
        tagOpen: '<br />',
        tagClose: '',
        sampleText: ''
    },
    {
        imageFile: 'https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png',
        speedTip: 'Comment only visible for editors',
        tagOpen: '<!-- ',
        tagClose: ' -->',
        sampleText: 'Insert comment here'
    },
    {
        imageFile: 'https://vignette.wikia.nocookie.net/logopedia/images/3/31/Button_endash.png',
        speedTip: 'Insert en dash',
        tagOpen: '–',
        tagClose: '',
        sampleText: ''
    },
    {
        imageFile: 'https://vignette.wikia.nocookie.net/logopedia/images/b/b9/Button_A2YP.png',
        speedTip: 'Insert ==????–present==',
        tagOpen: '==????–present==',
        tagClose: '',
        sampleText: ''
    },
    {
        imageFile: 'https://vignette.wikia.nocookie.net/logopedia/images/f/f8/Button_A3YP.png',
        speedTip: 'Insert ===????–present===',
        tagOpen: '===????–present===',
        tagClose: '',
        sampleText: ''
    }
]);

/* Allows the entire box on Help:Contents to be clickable */

$('.centralhelpbox').click(function() {
    window.location.href = '/wiki/' + $(this).attr('data-link');
});

window.batchDeleteDelay = 100;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxBatchDelete.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassRename/code.js',
    ]
});

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord",
            id: "761725116773564427"
        }
    };
}