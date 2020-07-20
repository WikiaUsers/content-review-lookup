/* Any JavaScript here will be loaded for all users on every page load. */

// =====================================
//        Variables for functions
// =====================================
/**
 * 5:03, November 20th, 2015 (UTC)
 */
/* Auto Refresh */
window.AjaxRCRefreshText = 'Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the cache'
};

/* Code for custom edit buttons (ō, ū characters). */
if (mwCustomEditButtons) {

    /*** wrappers *****/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|reason=",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}

// User tags
	window.UserTagsJS = {
		tags: {
			bureaucrat: {
				link: 'Project:Bureaucrat'
			},
			sysop: {
				link: 'Project:Sysop',
				title: 'System-Operator ( Administrator )'
			},
			rollback: {
				link: 'Project:Rollback'
			},
			inactive: {
				title: 'The user hasn\'t edited for last 30 days'
			}
		},
		modules: {
			inactive: 30,
			mwGroups: [
				'bureaucrat', 'rollback', 'sysop', 'bot', 'bot-global'
			],
			autoconfirmed: false,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			},
			custom: {
				Wikia: 'bot-global',
				Default: 'bot-global'
			}
		}
	};
 
// =====================================
//                Imports
// =====================================
 
// See MediaWiki:ImportJS
 
// ====================================
//                Other
// ====================================
/* Portable infoboxes colors */
(function(){
    var infobox = $('.portable-infobox');
    if (infobox.length) {
        var color = '',
        classNames = infobox.attr('class').split(' ');
        for (var i = 0; i < classNames.length; i++) {
            if (classNames[i].indexOf('pi-theme-') !== -1) {
                color = classNames[i].replace('pi-theme-', '');
                break;
            }
        }
 
        if (color) {
            infobox.find('h2').css('background-color', '#' + color);
 
        }
    }
})();