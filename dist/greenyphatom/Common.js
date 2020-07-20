/* Usertag */
window.UserTagsJS = {
	modules: {},
	tags: {}
};

UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global'
];

UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});

/* End of the {{USERNAME}} replacement */

/* AjaxBatchDelete*/
window.batchDeleteDelay = 1000;

/* MassBlock*/
window.massBlockDelay = 1000;

window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:WikiActivity/activity",
    "Special:WikiActivity/watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:NewFiles",
    "Special:Statistics",
    "Special:NewPages",
    "Special:ListFiles"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page';

/** == Tabber == **/
importScriptPage('Project:JS/tabber.js', 'keroro');
/* <pre><nowiki> */

function showEras(className) {
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv === null || titleDiv === undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

function getFirstHeading() {
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

function moveRating() {
    var elements = getElementsByClass('ratings-top', document.getElementById('content'), 'div');
    if(elements[0] == null || elements[0] == undefined)
        return;
    var cloneNode = elements[0].cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag) {
	var classElements = new Array();

	if(node === null)
		node = document;

	if(tag === null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element) {
    return this.regex.test(element.className);
};
/*
    end getElementsByClass
*/

moveRating();
showEras('title-linktabs');

/******************** Level system ********************/
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if ($("#UserProfileMasthead").size()) {
            editRanks = {
                1:"ANONYMOUS",
                10:"BEGINNER",
                50:"STANDARD",
                100:"MILESTONE USER",
                250:"ADDICT",
                500:"MASTER",
                750:"GENERAL",
                1000:"TERMINATOR",
                2015:"SURVEILLANCE SUPERPOWER",
                9001:"BRUH",
                };
            editCount = $("#UserProfileMasthead .tally em").html().replace(",","");
            if (editCount) {
                for(i in editRanks) if (editCount >= parseInt(i)) editRank = editRanks[i];
                $("#UserProfileMasthead hgroup").append($("<span>").addClass("tag").html(editRank));
            }
        }
    }
}

/***********/
/* Imports */
/***********/
importArticles({
    type: 'script',
    articles: [
        'u:prototype:MediaWiki:Common.js/top.js'
    ]
});