/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
// <nowiki>

// dev:BackToTopButton
window.BackToTopModern = true;

// dev:AddRailModule
window.AddRailModule = [
    { page: 'Template:RailModule/prepend', prepend: true },
    'Template:RailModule/append',
];

// dev:ProfileTags
(window.dev || {}).profileTags = { noHideTags: true };