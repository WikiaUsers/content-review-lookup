/* Any JavaScript here will be loaded for all users on every page load. */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'TemplateUserPage}}',
        3: false,
        1202: false
    },
    summary: 'Welcome to the JToH Wiki!',
    notify: '<a href="/wiki/User:$2">Welcome to our wiki! Here is a link to your userpage, $1!</a>'
};

window.RollbackWikiDisable = true; //Disables the usage of the Fandom Developers Wiki "Rolback Script"