$.getScript("https://raw.github.com/sactage/wikia-js-snippets/master/ChatOptions.js");

importScriptPage('ChatOptions/code.js', 'dev');

window.kockaEmoticons = {
    vocab: {
        emoticons: "Emojis",
        close: "Close!"
    },
    help: "Choose an emoji by clicking on it!"
};

importScriptPage('MediaWiki:Emoticons.js','kocka'); // Adds a window with all emoticons listed

//Clear chat button
$(function addClearChatText(){
   if ($('.clearChatText').length <= 0) {
      var clearChatText = document.createElement('span');
      $('<div class="clearChatText" onclick="clearChat()" style="margin: 10px auto;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;user-select: none;" align="center"><a class="clearChatButton wikia-button">Clear window</a></div>').prependTo('.Rail');
   }
});
 
function clearChat(){
   chatSize = $('div.Chat:first ul li').size()-1;
   $('.Chat:first li:lt('+chatSize+')').remove();
}
//END Clear chat button