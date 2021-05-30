/* Any JavaScript here will be loaded for all users on every page load. */
/* Block Message */
window.MessageBlock = {
    title: 'Block',
    message: 'You have been blocked. If you think that the reason for you to be blocked is unfair, please contact an Administrator of the wiki to clarify.'
};

// Auto-refresh
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Replaces Template:USERNAME with the name of the user browsing the page. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* Locking Old Blogs */
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog is considered archived because it hasn't been commented on in over <expiryDays> days, please don't bump this blog!",
    nonexpiryCategory: "Never archived blogs"
};

(function(window, $, mw) {
    "use strict";

    // Bulk loading scripts.
    // scriptList are scripts to load everywhere
    // pageScriptList are scripts which only certain pages need.
    var scriptList = [],
        pageScriptList = [];

    window.UserTagsJS = {
        tags: {
            bureaucrat: {
                u: 'Bureaucrat',
                /*link: 'Project:Bureaucrats'*/
            },
            sysop: {
                u: 'Sysop',
                /*link: 'Project:Sysops'*/
            },
            'content-moderator': {
                u: 'Class Representative',
                /*link: 'Project:Content moderator'*/
            },
            rollback: {
                u: 'Rollback',
                /*link: 'Project:Rollback'*/
            },
            translator: {
                u: 'Translator',
                /*link: 'Project:Translation policy',*/
                order: -1 / 0
            },
            newuser: {
                u: 'New User'
            },
            'autoconfirmed-user': {
                u: 'Active User',
                /*link: 'Project:Autoconfirmed users'*/
            },
            user: {
                u: 'User',
                /*link: 'Project:Autoconfirmed users'*/
            },
            inactive: {
                u: 'Inactive User',
                title: 'The user hasn\'t edited for last 30 days'
            },
            nonuser: {
                u: 'Non-User',
                title: 'The user hasn\'t been granted membership on the wiki yet'
            },
            blocked: {
                u: 'Blocked',
                link: 'Project:Blocking policy'
            },
        },
        modules: {
            stopblocked: false,
            inactive: 30,
            mwGroups: [
                'bureaucrat',
                'rollback',
                'sysop',
                'content-moderator',
                'autoconfirmed-user',
                'user',
                'bot',
                'bot-global',
                'blocked',
                'nonuser'
            ],
            autoconfirmed: true,
            newuser: true,
            metafilter: {
                'content-moderator': ['bureaucrat'],
                rollback: ['bureaucrat', 'content-moderator'],
                threadmoderator: ['content-moderator'],
                user: [
                    'bureaucrat',
                    'sysop',
                    'content-moderator',
                    'rollback',
                    'translator',
                    'newuser',
                    'inactive',
                    'blocked'
                ],
                bot: ['bot-global'],
                newuser: ['inactive'],
                bureaucrat: ['inactive'],
                sysop: ['inactive'],
                founder: ['inactive'],
                blocked: ['inactive'],
            },
        },
    };

    /* Add custom groups to several users */
    UserTagsJS.modules.custom = {
        'Undella': ['Sysop'],
        'Aphrodite_Belleza': ['Sysop'],
        'TG_RBB': ['Sysop'],
    };

    // ArchiveTool
    window.archiveListTemplate = 'ArchiveList';
    window.archivePageTemplate = 'ArchivePage';

    // Custom Special:[Multiple]Upload UI
    if (({
            Upload: 1,
            MultipleUpload: 1
        })[mw.config.get('wgCanonicalSpecialPageName')] === 1) {
        pageScriptList.push('MediaWiki:Common.js/FairUseUpload.js');
    }


    // Add custom class for styling long list of refs
    if ($('.references li').length > 9)
        $('.references').addClass('compactreferences');

    // SMW default popup is broken in wikia
    // Use custom modal
    $('.ultisup-image-popup a').click(function(ev) {
        ev.preventDefault();
        $.showCustomModal(this.title, '<img id="ultisup-load" src="https://images.wikia.nocookie.net/__cb1498150157/common/skins/common/images/ajax.gif"/>', {
            width: 1000
        });
        $("#ultisup-load").parent().load(this.href + " #gallery-0");
    });

    // Oasis-only scripts
    if (mw.config.get('skin') === 'oasis') {
        // Template adder on file pages
        if (mw.config.get('wgCanonicalNamespace') === 'File')
            $(function() {
                if ($.inArray("autoconfirmed", mw.config.get("wgUserGroups")) === -1)
                    return;
                // <nowiki>
                var Options = {
                        '{\{No license}}': 'Unlicensed image',
                        '{\{No rationale}}': 'No Fairuse info',
                        '{\{Unused}}': 'Unused image',
                        '{\{Poor filename}}': 'Poor name'
                    },
                    tempOptStr = '';

                for (var i in Options) {
                    tempOptStr += '<option value="' + i + '" style="text-align:center;">' + Options[i] + '</option>';
                }

                var html = '<select id="FileTemplateAdder">' + tempOptStr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="templateSubmit">Add template</a>';
                $('.comments').after(html);
                $('#templateSubmit').click(function() {
                    $(this).html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
                    new mw.Api().post({
                            format: 'json',
                            action: 'edit',
                            title: mw.config.get('wgPageName'),
                            token: mw.user.tokens.get('editToken'),
                            summary: 'Adding template: ' + $('#FileTemplateAdder').val(),
                            minor: true,
                            prependtext: $('#FileTemplateAdder').val() + "\n"
                        })
                        .done(function() {
                            $('#templateSubmit').text('Add this Template too!');
                            new BannerNotification('Template: ' + $('#FileTemplateAdder').val() + ' Added Successfully', 'confirm').show();
                        })
                        .fail(function() {
                            new BannerNotification('Template addition failed!', 'error').show();
                        });
                });
            });
    }

    // Import all scripts in bulk (and minified)
    window.importArticles({
        type: 'script',
        articles: scriptList
    }, {
        type: 'script',
        articles: pageScriptList
    });
});

/* Adds icons to page header bottom border */
$(function() {
    if (skin == "oasis" || skin == "wikia") {
        $('.WikiaPageHeader').append($('#icons'));
        $('#icons').css({
            'position': 'absolute',
            'right': '0',
            'bottom': '-1.2em'
        });
    }
});

/* Parent Tab */
if ($(".parenttab").length) {
    $("#contentSub, .header-column.header-title > h2").hide();
}

/* On Interlanguage Hover Icon */
$(function() {
    // Setup language selector
    $('#langdiv img').each(function() {
        $(this).css({
            'height': 'auto',
            'width': '150px'
        });
    });
    $('#langdiv img').hover(function() {
        $(this).animate({
            width: '180px'
        }, 'fast');
        $('#langdiv span').text($(this).attr('alt'));
    }, function() {
        $('#langdiv span').text('The Promised Neverland Wiki Interlanguage');
        $(this).animate({
            width: '150px'
        }, 'fast');
    });
});

//Turns off autoscroll on hover
$('#sliderframe').on("mouseenter", function() {
    scrolltimer = window.clearInterval(scrolltimer);
}).on("mouseleave", function() {
    scrolltimer = window.setInterval(autoScroll, 6000);
});

/* Adapted from YouTubePlayer & DraggableYouTubePlayer for video previews on episode pages. */
mw.hook('wikipage.content').add(function($content) {
    $content.find('.episodepreview-video').each(function() {
        var $this = $(this),
            data = $this.data(),
            uri = new mw.Uri('https://www.youtube.com/embed/'),
            id = (data.id || '').trim(),
            loop = ('' + data.loop).trim();

        if (data.loaded || id === '') {
            return;
        }

        uri.path += id;
        uri.query = {
            autoplay: window.YoutubePlayerDisableAutoplay ? '0' : ('' + data.autoplay).trim(),
            loop: loop,
            playlist: (loop === '1') ? id : '',
            start: ('' + data.start).trim(),
            list: (data.list || '').trim(),
            controls: 0,
            fs: 0,
            showinfo: 0,
            rel: 0,
        };

        $this.html(mw.html.element('iframe', {
            width: ('' + data.width).trim(),
            height: ('' + data.height).trim(),
            src: uri.toString(),
            frameborder: '0',
            allowfullscreen: 'true'
        }));
        data.loaded = true;
    });
});

/* Discord Widget Customization */
// Import discord integrator widget CSS.
importArticles({
    type: "style",
    articles: [
        "MediaWiki:Common.js/CustomDiscordIntegrator.js/StyleLight.css"
    ]
});

/* Add connect button.
var $widgetFooterButton = document.createElement("a"),
    json;
$($widgetFooterButton)
    .addClass("widget-btn-connect")
    .attr("href", json.instant_invite + "?utm_source=Discord%20Widget&utm_medium=Connect")
    .attr("target", "_blank")
    .text("Venture Goldy Pond")
    .appendTo($widgetFooter);

// Add members online to header.
var $widgetHeaderMembersOnline = document.createElement("span");
$($widgetHeaderMembersOnline)
    .addClass("widget-header-count")
    .html("<strong>" + membersOnline + "</strong> Survivors Online")
    .appendTo($widgetHeader);
*/