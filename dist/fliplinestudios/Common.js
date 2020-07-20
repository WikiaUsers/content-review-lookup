/* Any JavaScript here will be loaded for all users on every page load. */

window.dev = window.dev || {};
 
window.dev.editSummaries = {
    select: 'Template:SummariesBrowse'
};
 
// AjaxRC
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refreshes the page when new edits occur.';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Log",
    "Special:NewFiles",
    "Special:Videos",
    "Special:Contributions"
];

window.railWAM = {
    logPage:"Project:WAM Log"
};

/*function showPoll() {
    if ($.cookie(cookieName) === pollId) {
        $('.pollAnswerVotes').hide();
    }
}*/
/*function showPoll() {
    if (wgUserGroups.indexOf('sysop') === -1) {
    $('.pollAnswerVotes').hide();
}
}*/
/*(function ($, mw, rs) {
    var includes = {
Hides the mainpage poll results until after a user's vote has been cast
        mainpagePoll: {
            conditional: conf.wgIsMainPage,
            exec: function () {
                $('#mp-poll .pollAnswerVotes').hide();
 
                var cookieName = 'rs-mp-poll',
                    pollId = $('#mp-poll .ajax-poll').attr('id').split('-')[2];
 
                function showPoll() {
                    if ($.cookie(cookieName) === pollId) {
                        $('#mp-poll .pollAnswerVotes').show();
                    }
                }
 
                $('#mp-poll input[type="submit"]').click(function () {
                    $.cookie('rs-mp-poll', pollId, {expires: 365});
                    showPoll();
                });
 
                showPoll();
            }
        },
}
})*/



/*$(function () {
    // src: https://fliplinestudios.fandom.com/wiki/MediaWiki:Common.js
    if (wgPageName == "Flipline_Studios_Wiki") {
        $('.pollAnswerVotes').hide();
 
        var cookieName = 'rs-mp-poll',
            pollId = ($('.ajax-poll').attr('id') || '').split('-')[2];
 
        $('.ajax-poll input[type="submit"]').click(function () {
            $.cookie(cookieName, pollId, {expires: 365});
            showPoll();
        });
 
        showPoll();
    }
});*/


(function() {
    if (!mw.config.get('wgIsMainPage')) return;
 
    var pollIds = [];
    var userId = mw.config.get('wgUserId') || mw.user.id();
    var toggle = function(id) {
        var $res = $('#ajax-poll-' + id + ' .pollAnswerVotes'),
            $btn = $('#ajax-poll-' + id + ' input[name="wpVote"]');
        if (localStorage.getItem(id) &&
            localStorage.getItem(id).indexOf(userId) > -1) {
            // prevent changing votes and show results
            $btn.hide();
            $res.css('visibility', 'visible');
        } else {
            // user hasn't voted
            $res.css('visibility', 'hidden');
        }
    };
 
    // collect poll ids
    $('input[name="wpPollId"]').each(function(_, poll) {
        pollIds.push(poll.value);
    });
    pollIds.forEach(toggle);
 
    // use localStorage to remember user
    $('input[name="wpVote"]').on('click', function(e) {
        var thisPoll = $(e.target).parents('.ajax-poll'),
            pollId = thisPoll.find('input[name="wpPollId"]').val(),
            data   = localStorage.getItem(pollId);
        localStorage.setItem(pollId, data + ',' + userId);
        toggle(pollId);
    });
 
})();

//UserTags config
window.UserTagsJS = {
    modules: {
        inactive: 60,
        userage: true,
        mwGroups: true,
        autoconfirmed: true
    },
};

//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
 
/* Imports located at MediaWiki:ImportJS */