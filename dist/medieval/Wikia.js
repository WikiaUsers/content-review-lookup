// wall tags, plus other assorted scripts
window.MessageWallUserTags = {
    tagColor: 'white',
    users: {
        'LordWeirdo': 'Archduke',
        'Grovyle4Life': 'Inactive Archduke',
        'Akamichi': 'History Wiki Bureaucrat',
    }
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:LastEdited/code.js',
        'u:dev:QuickDiff/code.js'
    ]
});

// Replaces {{USERNAME}} with the name of the user browsing the page.
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);