/* Any JavaScript here will be loaded for all users on every page load. */

//Below code is to display Username
$(function() {
    $('.username').text(mw.config.get('wgUserName'));
});

//Custom Button Code to insert the Noinclude
if (mwCustomEditButtons.length) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20141112203239/science/images/8/8c/Delete.png",
		"speedTip": "Do not include text",
		"tagOpen": "<noinclude>",
		"tagClose": "</noinclude>",
		"sampleText": "Do not include",
	};
 
    //Custom Button for Reflist
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20081020114112/central/images/f/fd/Button_underline.png",
		"speedTip": "reference list",
		"tagOpen": "{{reflist}}",
		"tagClose": "",
		"sampleText": "",
	};
 
    //Insert a Template
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20070329065451/central/images/3/3b/Button_template_alt.png",
		"speedTip": "Insert Template",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "TemplateName/type",
	};
}

/* USER TAGS */
UserTagsJS.modules.prefLanguages = true;
UserTagsJS.modules.prefCoding = true;
 
window.UserTagsJS = {
	modules: {},
	tags: {
    montheditor: { u:'User of the Month' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		a: { u: 'Chief Editor', order:1 },
		b: { u: 'Administrator', order:2 },
 
	},
	oasisPlaceBefore: '> h1'
};
UserTagsJS.modules.custom = {
	'Supersonic414': ['a', 'b']
};
 
//OGGFILES CODE
var oggPlayerButtonOnly = false;

// From Destinypedia
// Link DIVs using data-url attribute
$('.HelpHover').click(function() {
	if (($(this).data("url")).match("^/wiki/")) {
		window.location.replace($(this).data("url"));
	}
});
// END Link DIVs using data-url attribute
 
// ============================================================
// Name: chat.js
// Author: Various
// Original by: Azliq7
// Original script: MediaWiki:Common.js/sitemeter.js
// Function: Advertise [[Special:Chat]]
// ============================================================
 
$(function() {
	if(skin == "monobook") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='*'>You can now <a href='http://mathgeek.wikia.com/wiki/Special:Chat?useskin=monobook' id='chatjs'>Start Talking</a>with other editors! Feel free to stop by and try it out.<br /></td><td style='text-align:right; padding-left:5px;'><a href='http://mathgeek.wikia.com/wiki/Special:Chat?useskin=monobook' id='chatjs'><img src='https://images.wikia.nocookie.net/__cb20060602123347/tea/images/a/a9/Example.jpg' alt='Chat' border=0 height='34' width='40' /></a></td></tr></table></div>"; 
		$sidebar.html($sidebar.html() + comboString);
	}
 
        // [[User:Ohmyn0]]'s addition
        $("#chatjs").click(function() {
                window.open('/wiki/Special:Chat?useskin=monobook', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
 
                return false;
        });
});

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/chat.js',
        'MediaWiki:Wikia.js/copyright.js',
        
        'u:admintools:MediaWiki:Wikia.js/accountNavigation.js',
        'u:admintools:MediaWiki:Wikia.js/editButton.js',
        'u:admintools:MediaWiki:Wikia.js/editCount.js',
        'u:admintools:MediaWiki:Wikia.js/cancelButton.js',
        'u:admintools:MediaWiki:Wikia.js/personalSkin.js',
        'u:admintools:MediaWiki:Wikia.js/uploadPhoto.js',

        'u:dev:InactiveUsers/code.js',
        'u:dev:RevealAnonIP/code.js',
        'u:dev:UserTags/code.js',
    ]
});