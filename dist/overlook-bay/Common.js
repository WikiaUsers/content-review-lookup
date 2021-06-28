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

/*** Back To Top Button Config ***/
window.BackToTopModern = true;
window.BackToTopStart = 200;

/*** Tooltips Customization ***/
window.tooltips_config = {
    noCSS: true,
}