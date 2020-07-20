/* Any JavaScript here will be loaded for all users on every page load. */

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
        'Gaeaman788': 'ADMIN',
        'SkyeGear': 'ADMIN',
        'Aldo_The_Fox': 'ADMIN',
        'StrangerAtaru': 'ADMIN'
    }
};
 
/* ================
 Imports
 ================ */
 
importArticles({
    type: "script",
    articles: [
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:MessageWallUserTags/code.js',
        'w:c:dev:ShowHide/code.js',
        'w:c:dev:DupImageList/code.js'
    ]
});