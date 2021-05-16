/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: []
});

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution
 */
 
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
 

window.MassEditConfig = {
  interval: 1500,
  placement: {
    element: "toolbar",
    type: "append"
  }
};