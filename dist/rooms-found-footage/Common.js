/* Any JavaScript here will be loaded for all users on every page load. */
// User time until considered Inactive
InactiveUsers = { months: 2 };
// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
// Adding objects to RightRail
window.AddRailModule = [
    {page: 'Template:RailModuleTop', prepend: true},
    'Template:RailModule',
];
// Lock old comments customization
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;