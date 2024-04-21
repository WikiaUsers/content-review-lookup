/* Any JavaScript here will be loaded for all users on every page load. */
// User time until considered Inactive
InactiveUsers = { months: 2 };
// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
//Rightrail customize
window.AddRailModule = [
    {page: 'Template:RailModuleTop', prepend: true},
    'Template:RailModule',
]