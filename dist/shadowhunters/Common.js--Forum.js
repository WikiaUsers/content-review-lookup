/**
 * From http://riordan.wikia.com/wiki/MediaWiki:Common.js/Forum.js
 */

jQuery(function ($) {
    "use strict";
    // Warning notice on the threads near reply.
    $(".new-reply .MiniEditorWrapper").last().before("<small>Before posting, please ensure your reply complies with our <a href='/wiki/Project:Community Guidelines#Forum'>forum policies</a> and the <a href='http://www.wikia.com/Terms of Use'>Wikia TOU</a>. Posts in violation will be edited or removed.</small>");

    // Warning notice when posting new thread.
    $(".ForumNewMessage .heading").after("<small>Before posting a new thread, please check below in case the topic already exists. If it doesn't, create a new thread, but ensure it complies with our <a href='/wiki/Project:Community Guidelines#Forum'>forum policies</a>.");

    // Notice on top of threads
    if(!$("#forum-warning-banner").length) {
        $("li.SpeechBubble").first().before(
            '<div id="forum-warning-banner" class="warningtemplate"><em><a href="/Project:Community Guidelines#Forum">Always</a></em>' +
            ' specify a Topic below when starting a new thread.' +
            ' Also, do <em>NOT</em> pyramid quote, and do not upload images specifically for use in the forums.' +
            ' For any questions, please contact an <a href="/Project:Administrators">administrator</a>.</div>'
        );
    }
    });