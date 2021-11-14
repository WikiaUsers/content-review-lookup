/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */ 
 
function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
}
$(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
// </syntax>

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{sub'+'st:DefaultUserPage}}',
        3: false
    },
    summary: 'Auto creating user page',
    notify: '<a href="/wiki/User:$2">Welcome to the wiki, $1! Here is a link to your user page.</a>'
};