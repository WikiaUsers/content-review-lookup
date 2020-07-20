jQuery(function ($) {
    "use strict";
    // Warning notice on the threads near reply.
    $(".new-reply .MiniEditorWrapper").last().before("<small>Before posting, please ensure your reply complies with our <a href='/wiki/Riordan Wiki:Forum Policy'>forum policies</a> and the <a href='http://www.wikia.com/Terms of Use'>Wikia TOU</a>. Posts in violation will be edited or removed.</small>");

    // Warning notice when posting new thread.
    $(".ForumNewMessage .heading").after("<small>Before posting a new thread, please check below in case the topic already exists. If it doesn't, create a new thread, but ensure it complies with our <a href='/wiki/Riordan Wiki:Forum Policy'>forum policies</a>.");

    // Notice on top of threads
    if(!$("#forum-warning-banner").length) {
        $("li.SpeechBubble").first().before(
            '<div id="forum-warning-banner" class="warningtemplate"><em>Note:</em>' +
            ' It is strongly recommended that the <a href="/Riordan Wiki:Forum_Policy">forum policy</a> be read before contributing to the forums.' +
            ' Also, do <em>NOT</em>  upload images specifically for use in the forums.' +
            ' For any questions, please contact a <a href="/Riordan Wiki:Forum Moderators">forum moderator</a> or <a href="/Riordan Wiki:Adminstrators">administrator</a>.</div>'
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