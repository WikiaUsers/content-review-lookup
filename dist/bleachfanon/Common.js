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
window.ajaxRefresh = 20000;
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

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

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();
 
 
function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }
 
/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};
 
 
function getElementsByName (name, root) {
 if (root == undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') == name) r[r.length] = e[i];
 }
 return r;
}

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */ 
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */
 
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

// =====================================
//                Imports
// =====================================
 
// See MediaWiki:ImportJS