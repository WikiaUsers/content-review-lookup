/* NewChatTab
 *
 * Lets the join chat button open in a new tab.
 * 
 * 
 */
 $(setTimeout('ChatCheck()', 200));
 
    function ChatCheck() {
            if($('.start-a-chat-button').length != 0) {
                    $('.start-a-chat-button').replaceWith('<a class="wds-is-secondary wds-button wds-is-squished start-a-chat-button" onclick="OpenChatWindow()">Join the Chat</a>');
            } else {
                    setTimeout('ChatCheck()', 200);
            }
    }
 
    function OpenChatWindow() {
            window.chatwindow = window.open('/index.php?title=Special:Chat&useskin=wikia');
    }