// Comments using the asterisk/slash format (/**/) are section headers (for multiple different scripts with similar functions). 
// The slash (//) comments are for stand-alone scripts.

// Automatic daily purge
(function DailyPurge(window, $, mw) {
    "use strict";
    /* Add pages to be purged every 1 hour directly below */
    const pagesList = [
        'Blog:Staff Blog Posts',
        'Category:Staff Blog Posts',
        'Special:Community'
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
********** Other/random
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

//Message for staffers and other global moderators
mw.loader.using(['mediawiki.user', 'mediawiki.util', 'mediawiki.storage'], function () {
    // Check user rights
    mw.user.getGroups().then(function(groups) {
        // Check if the message was dismissed
        var dismissedMessage = mw.storage.get('staffMessageDismissed');

        // Check if user belongs to certain groups and hasn't dismissed the message
        if (!dismissedMessage && (groups.includes('sysop') || groups.includes('soap') || groups.includes('helper') || groups.includes('vstf') || groups.includes('voldev') || groups.includes('vanguard') || groups.includes('global-discussions-moderator') || groups.includes('council') || groups.includes('content-reviewer') || groups.includes('content-volunteer'))) {
            // Create the content of the message
            var test = '<div style="text-align: left; font-size: 12px; filter: brightness(80%);">This message can only be seen by sysops, SOAP, staff, and other global moderators. Many apologies if you are receiving this message by mistake, it\'s likely due to you having a certain global right. Click the "X" to dismiss this message.</div><h2>Hello!</h2>Hey there. Since this Wiki has such a high chance of being considered a duplicate, <abbr title="I referring to User:Moonwatcher x Qibli">I\'ve</abbr> made this element to inform anyone who is here either following a report, or themselves looking into its duplicity.<br>There are many writing Wikis out there on Fandom; however, this one has a clear distinction: it\'s about how to write. All the other Wikis are to host user-written content or about written content themselves. None but this one are about writing itself.<br>The Wiki has also been approved by the support team: <a href="https://support.fandom.com/hc/en-us/requests/1325393">Zendesk ticket #1325393</a>.';

            // Create a new div element with innerHTML as 'test' and style it
            var staffMessage = $('<div>').html(test).css({
                'color': 'var(--theme-text-color--secondary)',
                'background-color': 'var(--theme-page-background-color--secondary)', // Set background color
                'padding': '10px',            // Add padding
                'border': '2px solid var(--theme-link-color--secondary)',    // Add a border
                'border-radius': '8px',       // Add border radius for rounded corners
                'text-align': 'center',       // Center the text
                'position': 'relative'        // Set position to relative for the close button
            });

            // Create the "x" button for closing the message
            var closeButton = $('<span>').text('x').css({
                'position': 'absolute',
                'top': '5px',
                'right': '10px',
                'cursor': 'pointer',
                'color': 'var(--theme-link-color--secondary)',
                'font-weight': 'bold',
                'font-size': '16px'
            }).attr('title', 'Click to close this message permanently.');

            // Append the close button to the staffMessage
            staffMessage.append(closeButton);

            // Append the new div to the page content
            $('#mw-content-text').prepend(staffMessage);

            // Add click event to close the message and save dismissal state
            closeButton.on('click', function() {
                staffMessage.remove();
                mw.storage.set('staffMessageDismissed', 'true');
            });
        }
    });
});

/*
*****
********** ImportJS Config
*****
*/

// AbuseLogRC 
window.abuseLogRC_entries = 5;
window.abuseLogRC_showTo = [ 'content-moderator' ];
  // window.abuseLogRC_users = [ 'USER' , 'USER' ];
window.abuseLogRC_userInfo = true;

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
    'newuser': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
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