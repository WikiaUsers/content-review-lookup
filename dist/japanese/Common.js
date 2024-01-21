/* Any JavaScript here will be loaded for all users on every page load. */
window.AddRailModule = [{prepend: true}];
window.AddRailModule = [
    {page: 'Template:Foo', prepend: true},
    'Template:Bar',
    'Template:Baz',
];