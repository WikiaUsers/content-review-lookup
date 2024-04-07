/***************************/
/** Script Configuration ***/
/***************************
 
/* ChatStatus */
window.ChatStatus = {
    statuses: {
        shortafk: 'is AFK momentarily',
        longafk: 'is AFK indefinitely',
        waiting: 'is waiting',
        editing: 'is editing',
        occupied: 'is occupied',
        frustrated: 'is frustrated',
        mobile: 'is on mobile',
        lag: 'is experiencing lag'
    },
};
 
/***************************/
/***** Script Imports ******/
/***************************
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatStatus/code.js',
        'u:dev:IsTyping/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:shining-armor:MediaWiki:ChatTags/code.js'
    ]
});
*/