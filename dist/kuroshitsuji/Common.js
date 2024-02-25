/* Any JavaScript here will be loaded for all users on every page load. */
/* Include Global Anime-Common.js Information */
importArticles({
    type: 'script',
    article: 'u:anime:MediaWiki:Anime-Common.js'
});

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
});
// ****** END: JavaScript for [[Special:Upload]] ******

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity"
];

/* Toggle spoiler button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (!button.length) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

/* Spoiler alert */
window.SpoilerAlertJS = {
    question: 'This page contains heavy spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};