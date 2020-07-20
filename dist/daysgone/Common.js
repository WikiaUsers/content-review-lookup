window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'Linus Spacehead': 'Founder • Bureaucrat',
    }
};

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GlobalEditcount/code.js',
    ]
});

window.SpoilerAlertJS = {
    question: 'This page MAY contain spoilers. Are you sure you would like to continue?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};