/* Any JavaScript here will be loaded for all users on every page load. */
 
 /* window.MessageWallUserTags = {
    tagColor: 'crimson',
    txtSize: '10px',
    glow: true,
    glowSize: '0 0 6px',
    glowColor: 'orange',
    users: {
        'Vanilladazzle': 'Founder',
        'MetsFan': 'Administrator',
        'KingCodeFish': 'Administrator',
       }
};
*/
//PurgeButton Config

PurgeButtonText = 'Purge';

//LastEdited Config

window.lastEdited = {
    avatar: false,
    size: false,
    diff: true,
    comment: false,
    time: 'timestamp'
   };



importArticles({
    type: 'script',
    articles: [
    //  'u:dev:MessageWallUserTags/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:ThreadIndicator/code.js',
        'u:dev:MediaWiki:LastEdited/code.js'
    ]
});