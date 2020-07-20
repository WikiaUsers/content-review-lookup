
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
 
/* End of the {{USERNAME}} replacement */
    articles = [
        'w:c:spottra:MediaWiki:Common.js/Numeral.js', // Defines num.format('<fmt>')
        'w:c:spottra:MediaWiki:Common.js/AjaxGallery.js',
        'u:dev:Countdown/code.js',
        'u:dev:SpoilerAlert/code.js',
        'u:dev:TopEditors/code.js',
        'u:dev:WallGreetingButton/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:LockOldBlogs/code.js',
        'w:c:clashofclans:MediaWiki:Common.js/RGBColor.js',
        'w:c:clashofclans:MediaWiki:Common.js/Usernames.js',
        'u:dev:UserTags/code.js',
        'w:c:clashofclans:MediaWiki:Common.js/Sliders.js',
        'w:c:clashofclans:MediaWiki:Common.js/GemCalculators.js',
        'w:c:clashofclans:MediaWiki:Common.js/Experience.js',
        'w:c:clashofclans:MediaWiki:Common.js/TroopInfo.js',
        'w:c:clashofclans:MediaWiki:Common.js/BuildingInfo.js',
        'w:c:clashofclans:MediaWiki:Common.js/AchievementInfo.js',
        'w:c:clashofclans:MediaWiki:Common.js/Tabber2.js',
        'w:c:clashofclans:MediaWiki:Common.js/ImageHover.js',
        'w:c:clashofclans:MediaWiki:Common.js/CumulativeCosts.js',
        'w:c:clashofclans:MediaWiki:Common.js/UnitComparator.js',
        'w:c:clashofclans:MediaWiki:Common.js/ModeToggle.js',
        'w:c:clashofclans:MediaWiki:Common.js/PageVerify.js',
        'w:c:clashofclans:MediaWiki:Common.js/GorillaMan.js',
        'w:c:clashofclans:MediaWiki:Common.js/Lugia.js',
    ];
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
    console.log('Site-wide JavaScript in MediaWiki:Common.js will load the ' +
                'following JavaScript files:\n   ' + articles.join('\n   '));