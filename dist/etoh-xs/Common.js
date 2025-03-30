/* Any JavaScript here will be loaded for all users on every page load. */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{subst:' + 'TemplateUserPage}}',
        3: false,
        1202: false
    },
    summary: 'Welcome to the EToH XS Project Wiki!',
    notify: '<a href="/wiki/User:$2">Welcome to our wiki! Here is a link to your userpage, $1!</a>'
}; // Automatically creates user pages for first-time editors/posters

window.RollbackWikiDisable = true; // Disables the usage of the Fandom Developers Wiki "Rollback Script"

window.MessageBlock = {
	title : 'Blocked',
	message : 'You have been given a block by the wiki administration for the duration of $2, due to the reason given by staff.\n\nYou block reason is given as $1.\n\nPlease read the wiki rules to avoid any sort of blocks in the future. If you believe that this block was unjustified, please respond to this message with an appeal message, and it will be reviewed accordingly.',
	autocheck : true
};