//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Cleric is Dead Wiki Chat'
$(function() {	
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

/**
 * '''ChatTags'''
 *   By [[User:AnimatedCartoons]]
 */
// <syntaxhighlight lang="javascript">
(function ($) {
    'use strict';
 
    var disable = $.isArray(window.chatTagsDisable) ? window.chatTagsDisable : [];
 
    mainRoom.model.chats.bind('afteradd', function (chat) {
        var t = chat.attributes.text,
            $m = $('#Chat_' + roomId + ' .message:last').html();
 
        if ($.inArray('tc', disable) === -1) {
            // Text Color
            if (t.match(/(?=.*\[tc\])(?=.*\[\/tc\])/i)) {
                $m = $m.replace(/\[tc\]/gi, '<span style="color: $1">').replace(/\[\/tc\]/gi, '</span>');
            }
        }
 
        if ($.inArray('l', disable) === -1) {
            // List
            if (t.match(/(?=.*\[l\])(?=.*\[\/l\])/i)) {
                $m = $m.replace(/\[l\]/gi, '<ul><li>').replace(/\[\/l\]/gi, '</li>');
            }
        }
 
        $('#Chat_' + roomId + ' .message:last').html($m);
    });
 
}(this.jQuery));

 
importArticles({
	type: "script",
	articles: [
	    "w:c:dev:ChatOptions/code.js",
        "w:c:community:User:Maulle_Breezy/global.js/chat.js",
    ]
});