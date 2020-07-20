// Message wall icons from The Amazing World of Gumball Wiki
setInterval(function () {
    "use strict";
   $('.comments li.message blockquote .MiniEditorWrapper .edited-by a:not(.subtle)').each(function () {
        var $user = $(this).text();
        if ($user.match(/Mordelegal/g)) {
            $(this).addClass('bureaucrat');
        }
        if ($user.match(/Leo d.sarrico|Derpy Star123/g)) {
            $(this).addClass('chat-mod');
        }
        if ($user.match(/GumballGuy2361/g)) {
            $(this).addClass('vstf');
        }
    });
}, 1);

// Import scripts from Wikia Developers' Wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:LockOldBlogs/code.js',
        'u:dev:ReferencePopups/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:LockForums/code.js',
        'u:dev:AjaxRC/code.js',
        'MediaWiki:Common.js/Notification.js'
    ]
});