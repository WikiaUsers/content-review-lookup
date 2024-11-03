/* Any JavaScript here will be loaded for all users on every page load. */
InactiveUsers = { 
    months: 2,
};
importScriptPage('InactiveUsers/code.js', 'dev');
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{:w:User:User1}}',
        3: '{{:w:User:User1/talk}}'
    },
    summary: 'Creating my pages',
    notify: '<a href="/wiki/User:$2">Here is a link to your userpage, $1!</a>'
};