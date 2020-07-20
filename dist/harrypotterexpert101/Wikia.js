/* Any JavaScript here will be loaded for all users on every page load. See w:c:dev:AjaxRC for info & attribution  */  
AjaxRCRefreshText = 'Auto-Refresh'; AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"]; 
importScriptPage('AjaxRC/code.js', 'dev')
 
/* Last edit header */
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: true,
    time: 'timeago',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
 
window.i = window.i || 0; //Required for SignatureCheck to work properly