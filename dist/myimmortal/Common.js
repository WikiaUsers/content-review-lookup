/* Any JavaScript here will be loaded for all users on every page load. */

window.listUsers = {
    talk: true,
    contribs: true
}
importScriptPage('ListUsers/code2.js', 'dev');

window.highlightUsersConfig = {
    colors: {
        'sysop': 'lightblue',
        'staff': '#da0da0',
        'helper': '#bf6240',
        'vstf': '#f77f77',
        'global-discussions-moderator': '#4286f4',
        'voldev': '#23c8d2',
        'vanguard': '#1eaf7a',
        'content-volunteer': '#ff7000',
        'bot': '#a400a4'
        },
    styles: {
        'sysop': 'font-weight: bold;',
        'staff': 'font-weight: bold;',
        'helper': 'font-weight: bold;',
        'vstf': 'font-weight: bold;',
        'global-discussions-moderator': 'font-weight: bold;',
        'voldev': 'font-weight: bold;',
        'vanguard': 'font-weight: bold;',
        'content-volunteer': 'font-weight: bold;',
        'bot': 'font-weight: bold;'
    }
};