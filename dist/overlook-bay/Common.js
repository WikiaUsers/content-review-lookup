/*** JavaScript Imports ***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});

/*** Discussion Templates Config ***/
window.DiscussionTemplates = {
    templates: {
        'block-message': {
            name: 'Template:Block Message',
            title: 'Block Notice'
          }
        },
    allowedGroups: ['sysop']
};

/*** Modern Back To Top Button Config ***/
window.BackToTopModern = true;