/*  Any JavaScript here will be loaded for all users using the Wikia skin,
    on every page load. */

// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
 
/* ================
   Imports
   ================ */
   
importArticles({
    type: 'script',
    articles: [
        "u:dev:AutoEditDropdown/code.js"
    ]
});