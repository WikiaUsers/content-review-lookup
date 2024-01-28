/* Any JavaScript here will be loaded for all users on every page load. */
/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // DiscordRailModule
    page: 'Template:RailModule',
    prepend: true,
    maxAge: 86400,
}, {
/* Configuration for [[w:c:dev:AddRailModule]] */
    // {{DiscussionsRailModule}}
    page: 'Template:DiscussionsRailModule',
    maxAge: 86400,
}];
/* Configuration for SpoilerWarning */
window.SpoilerAlertJS = {
    question: 'This area contains scary spoilers! You still wanna see it?',
    yes: 'Yup!',
    no: 'Better not!',
    fadeDelay: 1000
};