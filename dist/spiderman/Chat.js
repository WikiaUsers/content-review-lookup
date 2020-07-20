$(document).ready(function () {
    //Importing Chat Options
    importScriptPage('MediaWiki:Chat.js/options.js', 'cod');
 
    // Credit to Runescape Wiki
 
    //Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
    var chatTopic = 'Welcome to the Spider-Man Wiki!'
 
    $(function () {
        $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:80%; z-index:0; font-size:18px; color:#FFFFFF; font-weight:bold; line-height:2.2; margin-left:110px;">' + chatTopic + '</div>')
            .find('a').attr('style', 'position:relative;text-decoration:underline;');
    });
    $('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
    // END Chat topic
 
 
    // Clear chat button
 
    function addClearChatText() {
        if ($('.clearChatText').length <= 0) {
            $('<span class="clearChatText" onclick="clearChat()"   style="margin: 10px;"><a class="clearChatButton wikia-button">Clear all replies</a></span>').prependTo('.chattopic');
        }
    }
 
    function clearChat() {
        $('.Chat li').remove();
    }
 
    window.onload = addClearChatText();