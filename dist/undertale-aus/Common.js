/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Log", "AbuseLog"];

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
    if (mw.config.get('wgPageName') === 'Help:Contents') {
        $('.centralhelpbox').click(function() {
            window.location.href = '/wiki/Help:' + $(this).attr('data-link');
        });
    }
    
    // Snippet for Template:Username
    if(mw.config.get('wgUserName')) {
        $('.insertusername').html(mw.config.get('wgUserName'));
    }
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

/* This will make Make ViewRemoved only viewable to staff */
if (/sysop|content-moderator|threadmoderator|chatmoderator/.test(mw.config.get('wgUserGroups'))) {
    importArticle({
        type: 'script',
        article: 'u:dev:ViewRemoved/code.js'
    });
}

/* This will lock the dead threads of the Forum */
var LockForums = {
    expiryDays: 14,
    expiryMessage: 'This thread has been archived due to inactivity.'
};

//************************************************
// The End
//************************************************