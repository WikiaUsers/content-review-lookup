/* Any JavaScript here will be loaded for all users on every page load. */


/* DiscussionTemplates https://dev.fandom.com/wiki/DiscussionTemplates*/
window.DiscussionTemplates = {
    templates: {
        'Warning': {
            name: 'Template:Vandalism',
            title: 'Warning'
        },
        'Banned': {
            name: 'Template:Ban1',
            title: 'Banned'
        },
        'Permaban': {
            name: 'Template:Ban2_-_Permaban',
            title: 'Permaban'
        }
    },

    allowedGroups: ['sysop', 'rollback', 'content-moderator', 'threadmoderator']
};


/*Navigation extension https://life-is-strange.fandom.com/wiki/MediaWiki:Wikia.js */
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
})