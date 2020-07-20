// Imports must end in .js
// importScriptPage('MediaWiki:Chat-headline');

/* Chat variables
 * Modifications by User:Spottedstar @ w:c:kungfupanda:User:Spottedstar
 */
function changeChatDesc() {
    try {
        if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc) {
            $('p.chat-name').html(''+chatDesc+'');
            setTimeout("changeChatDesc()", 200);
        }
 
    } catch (err) {
        setTimeout("changeChatDesc()", 200);
    }
};
 
$(function (){changeChatDesc()});