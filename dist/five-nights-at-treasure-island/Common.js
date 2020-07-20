/***************** Five Nights at Treasure Island Common JS *****************/
/* Before use any code of this wiki and of this or any other MediaWiki Page */
/*  You should have the permission of Tobias Alcaraz. Your wiki should have */
/*   At least 10 pages. Remember to put the link of the wiki when you're    */
/*                        saging the Administrator.                         */
/********************************************************* Thanks! **********/

/* Any JavaScript here will be loaded for all users on every page load. */

//Last Edited Config
window.lastEdited = {
    avatar: false
};

$(function() { 
$('.wg-username').text(mw.config.get('wgUserName')); 
});

//Last Edited {{w:c:dev}} and some Imports...

importArticles({
    type: 'script',
    articles: [
        'u:dev:LastEdited/code.js',
        'MediaWiki:Common.js/plok.js',
        'u:dev:ExternalImageLoader/code.js',
        'MediaWiki:EditcountTag.js',
        'MediaWiki:Parallax.js'
    ]
});

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "ene": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "abr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "ago": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dic": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

importScriptPage('EditIntroButton/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'w:dev:WallGreetingButton/code.js'
    ]
});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});


importArticles({
    type: "script",
    articles: [
	"u:dev:DisplayClock/code.js",
    ]
});

//Clock Config
// Display 24 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2H:%2M:%2S - %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

/*** Wiki Activity Auto-refresh {{w:c:es.avatar}} ***/
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Auto refresh.';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Watchlist","Special:Log","Special:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');

// *****************************************************
// Aditional Buttons: To the edition page (w:c:es.gta)
// *****************************************************

 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
     "speedTip": "Font code",
     "tagOpen": "<code><nowiki>",
     "tagClose": "</"+ "nowiki></code>",
     "sampleText": "Font code"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100417162808/es.gta/images/e/ef/Borrar.png",
     "speedTip": "Propose the article to be deleted",
     "tagOpen": "{{Delete|",
     "tagClose": "}}",
     "sampleText": "Reasson to the page be deleted."};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
     "speedTip": "Disambiguation page",
     "tagOpen": "{{Disambig}}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
     "speedTip": "Templates",
     "tagOpen": "{{",
     "tagClose": "}}",
     "sampleText": "Template"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_user.png",
     "speedTip": "User",
     "tagOpen": "\{\{User|",
     "tagClose": "\}\}",
     "sampleText": "name"};
}

// Countdown
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

// RevealAnonIP (w:c:five-nights-at-warios-fangame)
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};