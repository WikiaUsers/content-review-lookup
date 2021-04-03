/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles", "Special:Videos"];
window.AjaxRCRefreshText = 'Auto-refresh';

//Custom Button Code to insert the deletion request
if (mwCustomEditButtons.length) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20141112203239/science/images/8/8c/Delete.png",
		"speedTip": "Deletion Request",
		"tagOpen": "{{Delete}}",
		"tagClose": "",
		"sampleText": "",
	};

    //Custom Button for Underline
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20081020114112/central/images/f/fd/Button_underline.png",
		"speedTip": "Underline",
		"tagOpen": "<u>",
		"tagClose": "</u>",
		"sampleText": "Underlined Text",
	};

    //Insert a Template
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20070329065451/central/images/3/3b/Button_template_alt.png",
		"speedTip": "Insert Template",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "TemplateName",
	};
}

/* USER TAGS 
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Chief Editor', order:1 },
		b: { u: 'Administrator', order:2 },
		
	},
	oasisPlaceBefore: '> h1'
};

UserTagsJS.modules.prefLanguages = true;
UserTagsJS.modules.prefCoding = true;

UserTagsJS.modules.custom = {
	'Drakenkaul': ['a', 'b']
};*/

//OGGFILES CODE
window.oggPlayerButtonOnly = false;