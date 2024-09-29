// Comments using the asterisk/slash format (/**/) are section headers (for multiple different scripts with similar functions). 
// The slash (//) comments are for stand-alone scripts.

// Automatic daily purge
(function DailyPurge(window, $, mw) {
    "use strict";
    /* Add pages to be purged every 1 hour directly below */
    const pagesList = [
        'Blog:Staff Blog Posts',
        'Special:Community',
        'Blog:Guide'
    ].map(function(string) {
        return string.replace(/ /g, '_');
    });
    if (!pagesList.includes(mw.config.get('wgPageName'))) return;
    mw.loader.using('mediawiki.api').then(function() {
        try {
            const lastPurgeTimestamp = mw.config.get('wgPageParseReport').cachereport.timestamp;
            const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
            const lastPurgeTime = new Date(Date.UTC(
                lastPurgeTimeParts[1],
                lastPurgeTimeParts[2] - 1,
                lastPurgeTimeParts[3],
                lastPurgeTimeParts[4],
                lastPurgeTimeParts[5],
                lastPurgeTimeParts[6]
            ));
            if (Date.now() - lastPurgeTime.valueOf() <= 60 * 1000) return;ci
        } catch (e) {
            return;
        }
        (new mw.Api()).post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });
})(window, jQuery, mediaWiki);

/*
*****
********** Admin/Moderator
*****
*/
// Only import these scripts for content mods and admins so we don't waste the
// bandwidth of users who can't actually use them.
if (mw.config.get("wgUserGroups").includes("content-moderator") || mw.config.get("wgUserGroups").includes("sysop")) {
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:AjaxBatchDelete.js",
            "u:dev:MediaWiki:MassEdit/code.js",
            "u:dev:MediaWiki:MassCategorization/code.js",
            "u:dev:MediaWiki:PowerDelete.js",
            "u:dev:MediaWiki:Stella.js",
            "u:dev:MediaWiki:DiscussionsRestoreAll.js",
            "u:dev:MediaWiki:AddAnnouncement/code.js",
            "u:dev:MediaWiki:DiscussionsAFLog.js",
            "u:dev:MediaWiki:PageRenameAuto-update/code.js",
            "u:dev:MediaWiki:AbuseLogRC.js",
            "u:dev:MediaWiki:MassBlock/code.js",
            "u:dev:MediaWiki:Nuke/code.js",
            "u:dev:MediaWiki:AjaxBatchDelete.js",
            "u:dev:MediaWiki:AjaxUndo/code.js",
            "u:dev:MediaWiki:AjaxDelete/code.js",
            "u:dev:MediaWiki:RedirectManagement/code.js",
            "u:dev:MediaWiki:RevisionDelete.js",
        ],
    });
}

// Discussions moderator and admin
if (mw.config.get("wgUserGroups").includes("discussions-moderator") || mw.config.get("wgUserGroups").includes("sysop")) {
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:DiscussionsDeleteAll/code.js",
        ],
    });
}

// Admin only
if (mw.config.get("wgUserGroups").includes("sysop")) {
    importArticles({
        type: "script",
        articles: [
            "u:dev:MediaWiki:AdminDashboard_block/code.js",
            "u:dev:MediaWiki:AdminDashboard_JS-Button/code.js",
            "u:dev:MediaWiki:MassProtect/code.js",
            "u:dev:MediaWiki:AddAnnouncement/code.js",
            "u:dev:MediaWiki:Reconstitution.js",
            "u:dev:MediaWiki:MessageBlock/code.js",
        ],
    });
}

/* 
***** Stylish scripts
*/
// Moonwatcher x Qibli background
if (mw.config.get('wgPageName') === 'User:Moonwatcher_x_Qibli' && mw.config.get('wgAction') !== 'edit') {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js',
        ]
    });
}

// Message wall greeting for [[Message wall:Moonwatcher_x_Qibli]], uses [[User:Moonwatcher_x_Qibli/MWG]]
if (mw.config.get('profileUserName') === 'Moonwatcher_x_Qibli' && mw.config.get('profileIsMessageWallPage')) {
    mw.loader.using('mediawiki.api').then(function () {
        new mw.Api().get({
            action: 'parse',
            format: 'json',
            page: 'User:Moonwatcher_x_Qibli/MWG',
            prop: 'text',
            wrapoutputclass: 'greeting',
            disablelimitreport: 1,
            formatversion: '2'
        }).done(function (data) {
            $('#MessageWall').prepend(data.parse.text).find('.greeting').css('margin-bottom', '20px');
        });
    });
}

/*
*****
********** End
*****
*/

// Enabling Google Forms to be embedded in articles
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true,
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});

// Wiki links have their target page stored in the title attribute, which on many browsers is displayed 
// as a tooltip when hovering over the link. The following snippet (by HumansCanWinElves) adds such 
// titles to redlinks too.

mw.loader.using('mediawiki.Uri').then(function() {
    $('.main-container').on('mouseover', 'a.new:not([title])[href]', function() {
        var regExp = /(?<=\/wiki\/)([^?]+)(?=(\?.+)?)/,
            match = regExp.exec($(this).attr('href')),
            title;
        if (match) {
            title = mw.Uri.decode(match[0]).replace(/_/g, ' ');
            $(this).attr('title', title);
        }
    });
});

// Title        : UserBlockNotification modded 
// Description  : Whenever a user gets blocked, users will have notification alert. It will persist, making them unable to interact with the page.
// Author       : Vastmine1029/Moonwatcher x Qibli
mw.loader.using('mediawiki.api', function() {
    var api = new mw.Api(), block_data;
    var user = mw.config.get('wgUserName');
    // If no user is logged in, abort JS.
    if (!user) {
        console.error("No user is currently logged in. 'BlockUserNotification' JS aborted!");
        return;
    }
    function checkBlockStatus() {
        api.get({
            action: 'query',
            list: 'blocks',
            bkusers: user
        }).then(function(d) {
            block_data = d.query.blocks;
            // If user is not blocked, do not continue with the script. Abort JS.
            if (block_data.length < 1) {
                console.error(user + " is not blocked. 'BlockUserNotification' JS aborted!");
                return;
            }
            alert("You are currently blocked. More information about your block here: Special:MyContributions");
            // Call the function recursively to keep checking the block status
            checkBlockStatus();
        });
    }
    // Initial call to check block status
    checkBlockStatus();
});

/*
*****
********** ImportJS Config
*****
*/
// LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.piboxkeepprev = true;
window.pPreview.RegExp.iclasses = ['nolp'];
window.pPreview.defimage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAQAAACwAAAAAAQABAAACAkQBADs=';
window.pPreview.delay = 10;

// AbuseLogRC 
window.abuseLogRC_entries = 5;
window.abuseLogRC_showTo = [ 'content-moderator' ];
// window.abuseLogRC_users = [ 'USER' , 'USER' ];
window.abuseLogRC_userInfo = true;

// UTCClock
window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)',
    interval: 600, /* How often the timer updates in milliseconds (1000=1 second) */
    location: 'header',
    monofonts: 'Consolas, monospace', /* The font the clock uses by default */
};

/*
***
***** UserTagsJS Config
***
*/
// Init
window.UserTagsJS = {
    modules: {},
    tags: {},
    oasisPlaceBefore: ''
};

// Setting the inactive threshold 
UserTagsJS.modules.inactive = {
    days: 30, zeroIsInactive: true
};

// Ordering
window.UserTagsJS = {
    modules: {},
    tags: {
        inactive: { order: -2 },
        bot: { link:'Help:Bots', order: -1 },
        bureaucrat: { order: 0 }, // <- lower order value = will be placed before other tags (in space, not as of which loads first)
        sysop: { order: 1 },
        'content-moderator': { order: 2 },
        threadmoderator: { order: 3 }
    }
};

// Creating Tags
window.UserTagsJS = {
    modules: {},
    tags: {
        // groupname: { u:'Text when users sex is not listed', m:'When user is male', f:'When user is female', link:'Link the tag should lead to', title:'Text to display on hover', order:-1/0 }
        'inactive-bureaucrat': { u:'Inactive Bureaucrat', title:'This Bureaucrat is inactive.'},
        'inactive-sysop': { u:'Inactive Administrator', title:'This Administrator is inactive.'},
        'half-admin': { u:'Half-Admin', title:'This user has both the Content and Discussions moderator groups.'}
    }
};
// The order parameter is a number from negative infinity to positive infinity, lower numbers are closer to the start. In this case -1/0 is negative infinity so the tag will be placed at start.

// Assigning Tags
UserTagsJS.modules.custom = {
    //'Username': ['tag', 'tag', 'tag']
};

// Remove tag from a user
UserTagsJS.modules.userfilter = {
    //'UserName': ['tag'], // User never has the tag
};

// Remove tags from groups
UserTagsJS.modules.metafilter = {
    'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
    'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
};

// Combine group tags into a custom one
UserTagsJS.modules.implode = {
    'inactive-bureaucrat': ['bureaucrat', 'inactive'], // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive
    'inactive-sysop': ['sysop', 'inactive'],
    'half-sysop': ['threadmoderator', 'patroller', 'rollback']
};

// Add a tag to a user who has groups
// This module is the same as implode above, except without the combination part. That is, the groups you use will not be removed.
UserTagsJS.modules.explode = {
    //'vandal-patrol': ['rollback', 'patroller'] // Adds 'vandal-patrol' group BUT does NOT remove rollback or patroller
};

// Controlling where the tags are put
// The oasisPlaceBefore option allows you to control where the tags are positioned in the Oasis header. By default, 
// they are always placed at the end like the Fandom ones but you are free to change this by specifying a CSS 
// (jQuery) selector for this option. For example, if you would like to place the tags after the H1 (user name), 
// but before the H2 (real name) then you would do this:
// window.UserTagsJS = {
//     modules: {},
//     tags: {},
//     oasisPlaceBefore: '> h2' // Place tags before the H2
// };

// Tag new accounts as such
UserTagsJS.modules.autoconfirmed = true; // Switch on

// Tags users new to our Wiki
UserTagsJS.modules.newuser = {
    days: 10, // Must have been on the Wiki for 10 days
    edits: 10, // And have at least 10 edits to remove the tag
};

/*
***
***** End
***
*/

// FileUsageAuto-update
window.LIRoptions = {
    bottomMessage: '',
    delay: 1000
};

// InputUsername
// Adds a class to all usernames
window.UsernameReplaceSelector = '.inputUsername';

// Nuke 
window.nukeDeleteReason = "Cleanup of pages created by $1";
window.nukeDelay = 100;
window.nukeTitle = "Mass delete all pages created by this user";

// AjaxBatchDelete
window.batchDeleteDelay = 100;

// Done to dev:DupImageList/code.js

/*
*****
********** End
*****
*/

window.ExternalLinkWarningNamespaces = ['Message_Wall', '0', '1'];