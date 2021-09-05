/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Log", "AbuseLog"];
abuseLogRC_users = ['', ''];
abuseLogRC_collapsible = true;
abuseLogRC_entries = 5;

importArticles({
    type: 'script',
    articles: [
        'u:monchbox:MediaWiki:Torus.js',
        'u:kocka:MediaWiki:SiderailSpoilerWarning/code.js'
    ]
});

/**
 * Loading UserTags from a page with JSON
 */
$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-user-tags',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
});

/**
 * Spoiler Widget
 */
var mwApiCounterSiderailSpoilerWarning = setInterval(function()
{
    if(typeof mw !== 'undefined' && typeof mw.Api !== 'undefined')
    {
        clearInterval(mwApiCounterSiderailSpoilerWarning);
        if(localStorage.getItem("SiderailSpoilerWarningRead") === "yes" || $("#WikiaRail").length === 0) return;
        var SiderailSpoilerWarning = {
            api: new mw.Api(),
            config: $.extend({
                announceError: false,
                title: "Spoiler",
                page: "custom-spoiler-warning",
                vocab: {
                    fetchError: "An error occurred while fetching spoiler warning page",
                    dismiss: "Dismiss",
                    pageNotFound: "The following page was not found"
                }
            }, window.SiderailSpoilerWarningConfig),
            init: function()
            {
                this.i18n = this.config.vocab;
                this.checkExist();
 
            },
            checkExist: function()
            {
                var url = mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace(/\$1/, "MediaWiki:" + this.config.page);
                $.ajax({
                    url: url,
                    success: $.proxy(this.fetchPage, this),
                    error: $.proxy(function(d)
                    {
                        this.insertUI(this.i18n.pageNotFound + ": <a href='" + url + "'>MediaWiki:" + this.config.page + "</a>", 'error').show();
                    }, this)
                });
            },
            fetchPage: function()
            {
                this.api.get({
                    action: "parse",
                    text: "{{int:" + this.config.page + "}}"
                }).done($.proxy(function(d)
                {
                    if(d.error && this.config.announceError)
                        new BannerNotification(this.i18n.fetchError + ": " + d.error.code, 'error');
                    else this.insertUI(d.parse.text['*']);
                }, this)).fail($.proxy(function()
                {
                    if(this.config.announceError)
                        new BannerNotification(this.i18n.fetchError, 'error').show();
                }, this));
            },
            insertUI: function(html)
            {
 
                $("#WikiaRail").children().first().before("<div class='SiderailSpoilerWarningModule rail-module'>\
                    <h2 class='activity-heading'>" + this.config.title + "</h2>" + html + "</div>");
                $("#SiderailSpoilerWarningButton").click($.proxy(function()
                {
                    localStorage.setItem("SiderailSpoilerWarningRead", "yes");
                    $(".SiderailSpoilerWarningModule").slideToggle();
                }, this));
            }
        };
        $($.proxy(SiderailSpoilerWarning.init, SiderailSpoilerWarning));
    }
 
}, 100);

/**
 * Allows the entire box on Help:Contents to be clickable
  */
  
$(function() {
    // Allows the entire box on Help:Contents to be clickable
    // Taken from Community Central
    if (mw.config.get('wgPageName') === 'Help:Contents') {
        $('.centralhelpbox').click(function() {
            window.location.href = '/wiki/Help:' + $(this).attr('data-link');
        });
    }
    
    // Snippet for Template:Username
    if(mw.config.get('wgUserName')) {
        $('.insertusername').html(mw.config.get('wgUserName'));
    }
    
    // When people tell me to open RP boards -_-
    if(mw.config.get('wgCanonicalSpecialPageName') === 'Forum') {
        $.get(mw.util.wikiScript('index'), {
            title: 'MediaWiki:Custom-roleplaying-board',
            action: 'render'
        }, function(d) {
            $('.boards').append(d);
        });
    }
    
});

/* Spoiler tag + buttons */
if ($('.spoiler').length) {
    switch (wgCanonicalNamespace) {
        case 'User':
        case 'User_talk':
            $('.UserProfileActionButton .wikia-menu-button').before(
                '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
            );
            break;
    }
    $('.wikinav2 .WikiaPageHeader').css('padding-right', '0');
    $('#WikiaPageHeader .comments').after(
        '<button class="wikia-button" id="toggle-spoiler" title="Show all spoilers on page">Show Spoilers</button>'
    );
}
$('#toggle-spoiler').click(function() {
    if ($('.spoiler.on, .spoiler.off').length) {
        $('.spoiler').attr('class', 'spoiler').removeAttr('title');
        $('.wikia-button#toggle-spoiler').attr('title', 'Hide all spoilers on the page').html('Hide Spoilers');
    } else {
        $('.spoiler').attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
        $('.wikia-button#toggle-spoiler').attr('title', 'Show all spoilers on page').html('Show Spoilers');
    }
});
var spoilerConfig = function(i, el) {
    var $el = $(el);
    $el.attr('title', 'click to show the spoilers');
    $el.click(function() {
        var $this = $(this);
        if ($this.hasClass('on'))
            $this.attr('class', 'spoiler off').removeAttr('title');
        else
            $this.attr('class', 'spoiler on').attr('title', 'click to show the spoilers');
    });
};
$('.spoiler.on').each(spoilerConfig);

/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.html.escape(mw.config.get('wgUserName')));
});
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        threadmoderator: {
            link: 'Special:ListUsers/threadmoderator'
        }, 
        patroller: {
            link: 'Special:ListUsers/patroller'
        },
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'threadmoderator',
            'sysop',
            'rollback',
            'patroller',
            'bot'
        ],
        newuser: true
    }
};

/* Makes username template work */
$(function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.html.escape(mw.config.get('wgUserName')));
});

//************************************************
// Imported Scripts
//************************************************

importArticles({
	type:'script',
	articles: [
        'u:dev:AjaxRC/code.js',
        'u:dev:Countdown/code.js',
        'u:dev:MarkForDeletion/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:RevealAnonIP/code.js',
		'u:dev:UserTags/code.js',
        'u:dev:WallGreetingButton/code.js'
	]
});

//************************************************
// User Tag Config
//************************************************

//*** Tags New Accounts
UserTagsJS.modules.autoconfirmed = true;
 
//*** Tags New Users - <10 Days or <30 Edits
UserTagsJS.modules.newuser = {
	namespace: 0, 
	computation: function(days, edits) { return days < 10 && edits < 30; }
};
 
//*** Tags Inactive Users - >=40 Days 
UserTagsJS.modules.inactive = {
	days: 40,
	namespaces: [0]
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'chatmoderator',
    'rollback',
    'bannedfromchat',
    'bot'
];

//************************************************
// AJAX Auto-Refresh
//************************************************
 
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Log',
    'Special:NewFiles'
];
window.AjaxRCRefreshText = 'Automatically refresh this page',
window.AjaxRCRefreshHoverText = 'Enable auto-refreshing page loads',

//************************************************
// Misc
//************************************************
$('.accountname').text(mw.config.get('wgUserName'));