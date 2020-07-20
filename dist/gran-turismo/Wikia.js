// **************************************************
// Navigation portal by Tierrie */
// **************************************************
mw.loader.using( ['jquery.cookie']);
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
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

// **************************************************
// RailWAM config
// **************************************************
window.railWAM = {
    appendAfter: "#wikia-recent-activity",
    logPage: 'Project:WAM Log',
    autoLogForUsers: "Skipdraw",
    lang: "en",
    showChange: true,
    showLogAlert: false,
    showToAnons: true,
    };

// **************************************************
// ARM Prepend Config
// **************************************************
window.AddRailModule = [{prepend: true}];

// **************************************************
// AutoEditDropdown
// **************************************************
// AutoEditDropdown config - http://dev.wikia.com/wiki/AutoEditDropdown
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true,
};

// **************************************************
// Config for customisable user tags
// **************************************************
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		montheditor: { u:'Editor of the Month' },
		inactive: { u:'Inactive' },
		topedit: { u:'Top Editor' },
		discord: { u:'GTW Discord Owner' },
	}
};

UserTagsJS.modules.custom = {
        'TheGTGeek' : ['discord'],
        //'usernamehere' : ['montheditor'],
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
    expiryDays: 90,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 60,
    warningMessage: "This forum is now <actualDays> days old; out of courtesy to your fellow contributors, please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: true,
    warningPopup: true,
    warningPopupMessage: "Unless it is absolutely necessary, you should not post comments on an old forum post. If you are unsure whether or not to post a message, please contact an administrator",
};