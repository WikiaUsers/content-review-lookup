/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto-refreshing recent changes */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');

// Custom edit button for source mode by [[user:Thailog]] on [[w:c:avatar]]
mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insert Imagebox template",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| season      = \r| episode     = \r| source      = \r| cats        = \r\}\}",
		"sampleText": ""};

//Reference Popups
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});