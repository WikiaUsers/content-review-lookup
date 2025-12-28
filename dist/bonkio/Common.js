/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Project:Bureaucrats', order:1e101 },
		trial: { u:'Trial Moderator', link:'Staff:Moderator', order:1e103 },
		full: { u:'Moderator',link: 'Staff:Moderator', order:1e102 },
		bcdstaff: {u:'BCD Staff Member'},
	}
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

UserTagsJS.modules.custom = {
	'DasUnterstrich': ['bcdstaff'],
	'Levesile': ['bcdstaff'],
	'NotARagingPeep': ['bcdstaff'],
	'Lemon Juice 89': ['bcdstaff'],
	'Wopper1': ['bcdstaff']
};


// Allowing people to copy certain text elements to clipboard with clicking on it. 
$(function() {
    function notifyCopy(text) {
        var message = 'Copied to clipboard!';
        if (text) {
            // Limits the preview length to 25 characters
            var preview = text.length > 25 ? text.substring(0, 25) + '...' : text;
            message = 'Copied: "' + preview + '"';
        }

        // Use Fandom's native notification system
        if (window.BannerNotification) {
            new BannerNotification(message, 'confirm', null, 3000).show();
        } else {
            mw.notify(message);
        }
    }

    $('body').on('click', '.click-to-copy', function() {
        var $el = $(this);
        var textToCopy = $el.attr('data-copy') || $el.find('code').text() || $el.text();
        
        if (textToCopy) {
            textToCopy = textToCopy.trim();
            navigator.clipboard.writeText(textToCopy).then(function() {
                // Only trigger the toast notification
                notifyCopy(textToCopy);
            });
        }
    });
});