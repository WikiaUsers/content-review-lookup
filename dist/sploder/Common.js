/*** Extra Source Editor Buttons ***/

if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Strike",
		"tagOpen": "<s>",
		"tagClose": "</s>",
		"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
		"speedTip": "Line break",
		"tagOpen": "<br />",
		"tagClose": "",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};
}

/*** Extra User Tags Module ***/

/**
Config 
KEEP ALL CUSTOM CONFIGURATIONS OVER THE "importArticles({" LINE.
**/

UserTagsJS.modules.nonuser = true; 
UserTagsJS.modules.autoconfirmed = false;

importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});


document.getElementById('tes_div').innerHTML = '<b>this will appear bold</b>';

/****** UTC Clock Module ******/
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').html(mw.config.get('wgUserName'));
});