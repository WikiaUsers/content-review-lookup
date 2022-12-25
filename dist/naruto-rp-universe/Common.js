/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
window.AjaxRCRefreshText = 'Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"];
window.ajaxRefresh = 20000;

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

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();


function getElementsByClass(node, className, tagName) {
    if (node.getElementsByClassName && (tagName == undefined || tagName == null || tagName == '*')) return node.getElementsByClassName(className);
    var list = node.getElementsByTagName(tagName ? tagName : '*');
    var array = new Array();
    var i = 0;
    for (i in list) {
        if (hasClass(list[i], className))
            array.push(list[i]);
    }
    return array;
}

/* Creates the method getElementsByClass, if unsupported from the browser */
if (!document.getElementsByClass) document.getElementsByClass = function(className) {
    return getElementsByClass(document, className, '*');
};


function getElementsByName(name, root) {
    if (root == undefined) root = document;
    var e = root.getElementsByTagName('*');
    var r = new Array();
    for (var i = 0; i < e.length; i++) {
        if (e[i].getAttribute('name') == name) r[r.length] = e[i];
    }
    return r;
}

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
});

/* End of the {{USERNAME}} replacement */

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
scriptList.push('u:dev:UserTags/code.js');

// Null Edit button
// Conditionally load purge button if page cannot be edited
if ($("#ca-edit").length || $("a[data-id='editprofile']").length) {
    scriptList.push('u:dev:NullEditButton/code.js');
} else {
    scriptList.push('u:dev:PurgeButton/code.js');
}

// List Files. See [[Narutopedia:ListFiles]]
scriptList.push('u:dev:ListFiles/code.js');

// Warnings
scriptList.push('MediaWiki:Common.js/Warnings.js');

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
scriptList.push('u:dev:LockForums/code.js');

// Reference Popups, like on Wikipedia
scriptList.push('u:dev:ReferencePopups/code.js');

/* Page specific scripts */

// List Duplicate images
if (mw.config.get('wgPageName') === 'Narutopedia:Duplicate_Images') {
    pageScriptList.push('u:dev:DupImageList/code.js');
}

// Tag users in the forums
if (mw.config.get('wgNamespaceNumber') === 1201) {
    pageScriptList.push('MediaWiki:Common.js/ForumTags.js');
}

// Custom Special:[Multiple]Upload UI
if (({
        Upload: 1,
        MultipleUpload: 1
    })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
    pageScriptList.push(
        'MediaWiki:Common.js/FairUseUpload.js',
        'MediaWiki:Common.js/FixMultipleUpload.js' // Fix the Special:MultipleUpload page
    );
}

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

// Oasis-only scripts
if (mw.config.get('skin') === 'oasis') {
    // Detach the AJAX feature from Page/Image Creation/Upload
    // because the pop-up form does not obey the preloads and such.
    $(window).load(function() {
        $('a.createpage').off('click').attr('href', '/wiki/Special:Forms');
    });

    // Add link to ParentPage to Wiki-Nav
    // Idea from avatar wiki
    $("<li><a>").addClass('subnav-2-item')
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

    // Internationalization notice 
    scriptList.push('u:dev:LWN/code.js');
}
importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/code.js',
        // ...
    ]
});