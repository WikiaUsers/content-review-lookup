/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh customisation */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* Lock Blog Script customisation */
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived due to not being commented on in over <expiryDays> days. If you are looking for somewhere to discuss a topic, please look through our recent blog posts, a link to which you can find on the main page where the blogs are located. If you are curious why this change occurred, please read Forum:Lock Old Blogs.",
    nonexpiryCategory: "Open Blogs"
};

/* Countdown.js */
importScriptPage('MediaWiki:Countdown.js', 'godisme');

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
});

// ****** END: JavaScript for [[Special:Upload]] ******

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
            return false;
        });
    });
});

if ($('.page-User_TheCarrotSaysYumYum').length != 0) {
    $("#WikiaRail").append('<div style="clear:both;" align="center"><img src="https://images.wikia.nocookie.net/fairytail/images/6/65/Jellal_Zeref%27s_Awakening_Full_size.jpg" width="300"></div>');
}

// Display Clock
window.DisplayClockJS = {
    format: '%d %B %Y, %2H:%2M:%2S (UTC)',
    hoverText: 'Click to purge the cache'
};