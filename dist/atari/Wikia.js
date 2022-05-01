/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

// **************************************************
// AutoEditDropdown
// **************************************************
// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true,
};

// **************************************************
// RailWAM configuration (automatic)
// **************************************************
window.railWAM = {
        autoLogForUsers:"RickGT",
        logPage:"Project:WAM Log",
        lang: "en",
        showChange: true,
        showLogAlert: false,
        showToAnons: true
};

// **************************************************
// Config for customisable user tags
// **************************************************
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		inactive: { u:'Inactive' },
		topedit: { u:'Atari Expert' },
		tech: { u:'Code Guru' },
	}
};

UserTagsJS.modules.custom = {
        'RickGT': ['tech'],
};

UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.newuser = {
	namespace: 0, // Edits must be made to articles
	computation: function(days, edits) {
		// If true then new user
		// If false then not
		// Newuser removed when user has 40 edits, OR when present for 14 days, whichever first
		return days < 14 && edits < 40;
	}
};

// **************************************************
// Configuration for auto-archiving script
// **************************************************
window.LockForums = {
    expiryDays: 180,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 90,
    warningMessage: "This forum is now <actualDays> days old; out of courtesy to your fellow contributors, please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: true,
    warningPopup: true,
    warningPopupMessage: "Unless it is absolutely necessary, you should not post comments on an old forum post. If you are unsure whether or not to post a message, please contact an administrator",
};

// **************************************************
// Change BBTB visual to modern design
// **************************************************
window.BackToTopModern = true;