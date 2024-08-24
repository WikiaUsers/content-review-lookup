/* Make various changes to the new forums */

jQuery(function ($) {
    "use strict";

    // Tag users in the new forums
    // Orginal script (http://dev.wikia.com/wiki/MessageWallUserTags/code.js)
    // by User:RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
    // This version made by User:UltimateSupreme

    var users = {
            // Tag all bureaucrats
            Utgarðar        : 'Bureaucrat',
        };

    $.each(users, function (name, v) {
        $('<span class="ForumTags"></span>').text('(' + v + ')').insertAfter($('a.subtle[href$="User_talk:' + name.replace(/(["])/g, '\\$1') + '"]'));
    });

    // Votes Tally Script
    // Works with [[Template:VotesTally]]
    var supportNum = $(".support").length - $("div.quote .support").length - $(".SpeechBubble.message-removed .support").length + $(".SpeechBubble.message-removed .quote .support").length - 2,
        neutralNum = $(".neutral-vote").length - $("div.quote .neutral-vote").length - $(".SpeechBubble.message-removed .neutral-vote").length + $(".SpeechBubble.message-removed .quote .neutral-vote").length - 2,
        opposeNum  = $(".oppose").length - $("div.quote .oppose").length - $(".SpeechBubble.message-removed .oppose").length + $(".SpeechBubble.message-removed .quote .oppose").length - 2,
        multiplier = 100 / (supportNum + neutralNum + opposeNum);

    $("#support_num").text(supportNum + (supportNum == 1 ? " vote" : " votes"));
    $("#neutral_num").text(neutralNum + (neutralNum == 1 ? " vote" : " votes"));
    $("#oppose_num").text(opposeNum + (opposeNum == 1 ? " vote" : " votes"));

    $("#support_bar").width(supportNum * multiplier + "%");
    $("#neutral_bar").width(neutralNum * multiplier + "%");
    $("#oppose_bar").width(opposeNum * multiplier + "%");

    // Add Edit Button for forum posts
    $('nav .edit-message').each(function () {
        $(this).closest('.buttons').prepend('<button class="secondary"><a href="#" accesskey="a" data-id="0" style="color:inherit; text-decoration:inherit;" class="edit-message">Edit</a></button>');
    });

    // Warning notice on the threads near reply.
    $(".new-reply .MiniEditorWrapper").last().before("<small>Before posting, please ensure your reply complies with our <a href='/wiki/Forum policy'>Forum policies</a> and the <a href='http://www.wikia.com/Terms of Use'>Wikia TOU</a>. Posts in violation will be edited or removed.</small>");

    // Warning notice when posting new thread.
    $(".ForumNewMessage .heading").after("<small>Before posting a new thread, please check below in case the topic already exists. If it doesn't, create a new thread, but ensure it complies with our <a href='/wiki/Forum policy'>Forum policies</a>.");

    // Notice on top of threads
    if(!$("#forum-warning-banner").length) {
        $("li.SpeechBubble").first().before(
            '<div id="forum-warning-banner" class="warningtemplate"><em>Note:</em>' +
            ' It is strongly recommended that the <a href="/Forum_policy">forum policy</a> be read before contributing to the forums.' +
            ' Also, do <em>NOT</em>  upload images specifically for use in the forums.' +
            ' For any assistance, request action from a forum moderator by going to the <a href="/Saint Seiya, Knights of the Zodiac Wikia:Sysop_Requests?action=edit&section=4">Requests page.</a></div>'
        );
    }

    // Prevent Double Posting
    $("button.replyButton").click(function() {
        var lastUser = $("li.message").not(".hide").last().find("div.edited-by a").text(),
            lastPost = $("#mw-content-text .timeago.abstimeago").last().text();
        
        if (/minute|second/.test(lastPost) && lastUser === mw.config.get("wgUserName")) {
            $.showModal("Double Posting", "You are the latest poster. Please edit your latest reply instead of attempting to leave multiple consecutive posts");
            return false;
        }
    });

});