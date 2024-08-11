/* Any JavaScript here will be loaded for all users on every page load. */
nkch_gst_gadgets = [{
    name: "ThemeExtension",
    title: "Theme extension",
    description: "Extends the theme to other elements of the interface."
},{
    name: "BlurEffects",
    title: "Blur effects",
    description: "Enables blur effects."
},{
    name: "ImgTitleRemove",
    title: "Remove image titles",
    description: "Removes image titles, useful on Logos articles."
}];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GadgetsStateToggler.js',
    ]
});