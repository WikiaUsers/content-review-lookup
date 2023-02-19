/* Any JavaScript here will be loaded for all users on every page load. */

/*** Back To Top Button Config ***/
window.BackToTopModern = true;
window.BackToTopStart = 200;


/*** RailModule Config ***/
window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}, {
    // {{DiscussionsRailModule}}
    page: 'Template:DiscussionsRailModule',
    maxAge: 86400,
}];