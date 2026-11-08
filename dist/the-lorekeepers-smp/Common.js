/* Any JavaScript here will be loaded for all users on every page load. */
window.MassEditConfig = {
  interval: 1500,
  placement: {
    element: "toolbar",
    type: "append"
  }
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassEdit/code.js',
    ]
});