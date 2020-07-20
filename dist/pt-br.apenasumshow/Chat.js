/**
 * Mark user groups
 */
setInterval(function () {
    "use strict";
    $('.User.chat-mod .username').each(function () {
        // Bureaucrats
        if (this.innerHTML.match(/GumballGuy2361|Mordelegal/)) {
            $(this).parent().addClass('bureaucrat').removeClass('chat-mod');
        }
    });
}, 1);

/**
 *   Import Script Pages
 */

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatTags/code.js',
        'MediaWiki:Chat.js/Custom.js'
    ]
});