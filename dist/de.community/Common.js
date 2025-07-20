/* dev:MapsExtended */
window.mapsExtendedConfig = {
    "minimalLayout": true,
    "enableSidebar": true,
    "sidebarBehaviour": "autoAlways",
    "sidebarInitialState": "hide",
    "enableSearch": true,
    "enableFullscreen": true,
    "fullscreenMode": "window",
};
window.discussionsModuleConfig = {
    'size': 5,
    'mostrecent': true,
    'embed': true,
    'rail': false,
    'embedIcon': false
};
importArticle({
    type: "script",
    article: "MediaWiki:DiscussionsRailModule.js"
});