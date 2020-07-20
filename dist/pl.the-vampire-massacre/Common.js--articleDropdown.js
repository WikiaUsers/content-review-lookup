//===============================================================================
// Additional options for dropdown menu
//===============================================================================
/* Import displaytitle. see that page for usage */
importScriptPage('DISPLAYTITLE/code.js', 'dev');
/* Import dup image list. see that page for usage */
importScriptPage('DupImageList/code.js', 'dev');
/* add "view source" link to edit dropdown */
importScriptPage('View_Source/code.js', 'dev'); 
/* add "refresh" link to edit dropdown */
importScriptPage('PurgeButton/code.js', 'dev');
/* add "search suggestions" to search results */
importScriptPage('SearchSuggest/code.js', 'dev');

window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: false
};
/* automatically open edit menu on hover */
importScriptPage('AutoEditDropdown/code.js', 'dev');