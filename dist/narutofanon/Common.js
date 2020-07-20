
/* Any JavaScript here will be loaded for all users on every page load. */

// =====================================
//        Variables for functions
// =====================================
/* @author: DazzlingEmerald(http://oproleplaying.wikia.com/wiki/User:DazzlingEmerald) */
/**
 * 5:03, July 1, 2015 (UTC)
 */
/* Auto Refresh */
window.ajaxRefresh = 20000;
window.AjaxRCRefreshText = 'Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];

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
        "sampleText": "your reason here"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
        "speedTip": "Add the ō character",
        "tagOpen": "ō",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
        "speedTip": "Add the ū character",
        "tagOpen": "ū",
        "tagClose": "",
        "sampleText": ""
    };
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

// Lock forums if not commented for 90 days
// Place a warning after 30 days
window.LockForums = {
    expiryDays: 90,
    expiryMessage: "This thread hasn't been commented on for over <actualDays> days. There is no need to reply.",
    warningDays: 30,
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
};

/* Small scripts which donot need a seperate page (Snippets) */

// Remove red-links (deleted pages) from Recent Changes
// [They stay red, they just don't link to ?action=edit]
if (({
        Recentchanges: 1,
        Log: 1
    })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
    var deNewRC = function() {
        $('a.new').each(function() {
            this.href = this.href.replace(/\?[^?]*$/, '');
        });
    };
    $(deNewRC);
    window.ajaxCallAgain.push(deNewRC);
}

$(window).load(function() {
    $('a.createpage').off('click').attr('href', '/wiki/Special:CreatePage');
});

// Add link to ParentPage to Wiki-Nav
// Idea from avatar wiki
$('<li><a>').addClass('subnav-2-item')
    .find('a').attr({
        'href': '/wiki/Project:ParentPage',
        'class': 'subnav-2a'
    }).text('Parent Page').end()
    .appendTo($('.WikiHeader nav ul li.marked ul'));

// Add Edit Button for forum posts
if (mw.config.get('wgNamespaceNumber') === 1201) {
    $('nav .edit-message').each(function() {
        $(this).closest('.buttons').prepend('<button class="secondary"><a href="#" accesskey="a" data-id="0" style="color:inherit; text-decoration:inherit;" class="edit-message">Edit</a></button>');
    });
}

/* Wam Module*/
window.railWAM = {
    logPage: "Project:WAM Log"
};