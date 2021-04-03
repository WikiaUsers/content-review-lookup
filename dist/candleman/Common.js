/* Any JavaScript here will be loaded for all users on every page load. */
/* Message wall user tags */
window.MessageWallUserTags = {
    tagColor: 'red',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Botuczy': 'Wiki founder',
        'TalkingOddlySpooky': 'Bureaucrat',
        'MysticStars1201': 'Bureaucrat',
        'Limefong X': 'Bureaucrat',
        'Kelliegeorgiashadowsmith': 'Administrator',
        'Agency Pikachu': 'Administrator',
        'Baghead11': 'Administrator',
        'Random Pesron': 'Content Moderator',
        'TheEarthisround12': 'Content Moderator',
        'EverestMachine 4001': 'Content Moderator',
        'The Krusty Krab': 'Discussion Moderator',
        'BOT-tuczy': 'Bot'
    }
};

/* Recent Activity */
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : true,
    loadModule : false,
    customRendering : { },
    headerLink : true,
    refresh : true,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

const s = new WAStorage(k);
const v = s.get( "test" );