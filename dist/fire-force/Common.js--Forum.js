/*
 *
 * Make various changes to the new forums
 * Source: http://naruto.wikia.com/wiki/MediaWiki:Common.js/ForumChanges.js
 * Last Modified: 1st February 2016 @ 18:10
 *
*/
 
jQuery(function ($) {
    "use strict";
 
    // Add Edit Button for forum posts
    $('nav .edit-message').each(function () {
        $(this).closest('.buttons').prepend('<button class="secondary"><a href="#" accesskey="a" data-id="0" style="color:inherit; text-decoration:inherit;" class="edit-message">Edit</a></button>');
    });
 
    // Warning notice on the threads near reply.
    $(".new-reply .MiniEditorWrapper").last().before("<small>Before posting, please ensure your reply complies with our <a href='/wiki/Forum policy'>Forum policies</a> and the <a href='http://www.wikia.com/Terms of Use'>Wikia TOU</a>. Posts in violation will be edited or removed.</small>");
 
    // Warning notice when posting new thread.
    $(".ForumNewMessage .heading").after("<small>Before posting a new thread, please check below in case the topic already exists. If it doesn't, create a new thread, but ensure it complies with our <a href='/wiki/Forum policy'>Forum policies</a>.");
 
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