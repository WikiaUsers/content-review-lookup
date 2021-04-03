/* Any JavaScript here will be loaded for all users on every page load. */
window.listUsers = {
    talk: true,
}
window.listUsers.customgroups = ['content-moderator','threadmoderator'];
importScriptPage('ListUsers/code.js', 'dev');
importScriptPage('ListUsers/code2.js', 'dev');