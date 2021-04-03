window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Digifiend': 'ADMIN',
        'Nbajammer': 'ADMIN',
        'Guardianofthehall': 'ADMIN',
        'Digi': 'ADMIN',
        'Aldo_The_Fox': 'ADMIN',
        'Gokyr586': 'ADMIN',
        'Lord_Shaman': 'ADMIN',
        'Yugioht42': 'ADMIN',
        'Rgiacobbi1': 'ADMIN',
        'RedLegend1': 'ADMIN',
    }
};
 
/* ================
    Imports
 ================ */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SignatureCheck/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:ReferencePopups/code.js',
    ]
});