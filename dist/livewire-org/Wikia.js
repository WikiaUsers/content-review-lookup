SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:SpoilerAlert/code.js',
    'w:c:dev:FixMultipleUpload/code.js',
        'w:c:dev:AutoEditDropdown/code.js'
        'w:dev:CollapsibleEdittools/code.js',
    ]
});

function addMastheadTags() {
    var rights = {};

    // BEGIN List of Accounts Given Extra User Rights Icons - Must list all tags

    // END List of Accounts Given Extra User Rights Icons

    if (wgCanonicalSpecialPageName == "Contributions") {
        var user = wgPageName.substring(wgPageName.lastIndexOf("/") + 1).replace(/_/g, " ");
    } else {
        var user = wgTitle;
    }

    if (typeof rights[user] != "undefined") {
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[user].length; i < len; i++) {
            $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
                '</span>').appendTo('.masthead-info hgroup');
        }
    }
}

$(function () {
    if ($('#UserProfileMasthead')) {
        addMastheadTags();
    }
});

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});