/* Any JavaScript here will be loaded for all users on every page load. */
/* Configuration for [[w:c:dev:AddRailModule]] */
window.AddRailModule = [{
    // {{DiscordRailModule}}
    page: 'Template:RailModule',
    prepend: true,
    maxAge: 86400,
}, {
/* Configuration for [[w:c:dev:AddRailModule]] */
    // {{DiscussionsRailModule}}
    page: 'Template:DiscussionsRailModule',
    maxAge: 86400,
}, {
/* Configuration for [[w:c:dev:AddRailModule]] */
    // {{MultipleBoxModule}}
    page: 'Template:MultipleBoxModule',
    maxAge: 86400,

}];
window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to see?',
    yes: 'Yep',
    no: 'Nah',
    fadeDelay: 1500
};