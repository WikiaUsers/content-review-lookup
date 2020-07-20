///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/************************* Import Configurations *************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
/* Ajax Configs */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
//End AC*/

/* Banners */
window.BNnamespaces = [0, 1200, 1201, 2001, 2000, 14, 12, 2002];
window.BNusergroups = ['user'];
window.BNcookieExpiration = 7;
//End BN*/

/* Signature Check */
window.SignatureCheckJS = {
    preamble: 'There are a few potential problems with your edit:\n\n',
    epilogue: '\nAre you sure you want to post this anyway?',
    noSignature: 'It looks like you forgot to sign your post. Use \~\~\~\~ to sign your post so that we know who’s talking!\n',
    forumheader: false,
    checkSignature: true,
    extraNamespaces: [
            {
                    namespace: 2,
                    patterns:  [ '/Talk' ]
            }
    ]
};//End SC*/

/* Skin Switch */
window.monoBookText = "Switch to Monobook";
window.oasisText = "Switch to Oasis";
window.mobileText = "Show Mobile View";//End SS*/

/* Reference Popups */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;//End RP*/

/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'red',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#F77',
    users: {
        'Kuro redfox': 'Black Dragon'
    }
};//End MWUT*/

///////////////////////////////////////////////////////////////////////////
/*************************************************************************/
/******************************** Imports ********************************/
/*************************************************************************/
///////////////////////////////////////////////////////////////////////////
importArticles({
    type: 'script',
    articles: [
        'u:diepio:BackToThread/code.js',
        'u:diepio:ListUsers/code.js',
        'u:diepio:Miscellaneous/code.js',
        'u:diepio:Tournaments/code.js'
    ]
});//End*/