/* Any JavaScript here will be loaded for all users on every page load. */

// MessageWallUserTags
window.MessageWallUserTags = {
    tagColor: '#000000',
    txtSize: '14px',
    glow: true,
    glowSize: '14px',
    glowColor: '#FFFFFF',
    users: {
        'Not real name': 'Founder • Bureaucrat',
        'DoCheonGong': 'Bureaucrat',
        'DoccocaubaiCAN': 'Bureaucrat',
        'Marisa1980': 'Bureaucrat',
        'HM100': 'Administrator',
        'Pops8459394': 'Administrator',
        'TokihikoH11': 'Administrator'
    }
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* AutoCreateUserPages */
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3: '{{autowelcome}}',
    1202: false
},
    summary: 'Auto creating user page',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AutoCreateUserPages.js',
    ]
});