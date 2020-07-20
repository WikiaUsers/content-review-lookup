/* Any JavaScript here will be loaded for all users on every page load. */
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
    $(".new-reply .MiniEditorWrapper").last().before("<small>Before posting, please ensure that your message complies with <a href='/wiki/Kuroshitsuji_Wiki:Policies#Discussion_Policy'>our Discussion Policy</a> and <a href='http://www.wikia.com/Terms of Use'>the Wikia TOU</a>. Posts in violation will be edited or removed.</small>");
 
    // Warning notice when posting new thread.
    $(".ForumNewMessage .heading").after("<small>Before posting a new thread, please check previous threads to see if the topic already exists. If it does not, you may create a new thread, but ensure that it complies with <a href='/wiki/Kuroshitsuji_Wiki:Policies#Discussion_Policy'>our Discussion Policy</a>.");
});