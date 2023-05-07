//Battleship game stuff for chat(nutt, PLEASE don't touch. This is really experimental and I need everything to stay as i remember it. -tato)

//importScriptPage('MediaWiki:Chatsnow.js');//this will be the basis for moving ships that follow a user's mouse, and also for weather in the chat
//^^^^^^^Temporarily disabled because I don't need it running unless I am testing things^^^^^^^^^^^^^^^^^//



// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
        chatOptionsLoaded = 1;
        importArticles({
            type: "script",
            articles: [
                "u:scripts:Chat/AutoLoad.js"
                //scripts.wikia.com/index.php?title=Chat/Autoload.js
                //http://scripts.wikia.com/wiki/Chat/AutoLoad.js
                //http://scripts.wikia.com/wiki/Chat/Options.js

            ]
        });
        $('#chatOptionsButton').remove()
        $('#chat-options-button').appendTo("#ChatHeader").css({'right' : '155px', 'bottom' : 0, 'position' : 'absolute', 'cursor' : 'pointer'});
}
 
// ****************
// END Chat options import
// ****************

/* Chat Options - Taken from Dev */
importScriptPage('MediaWiki:ChatOptions');
importScriptPage('MediaWiki:API.js');
 
importScriptPage('MediaWiki:ChatParty.js');
 
/* Chat Skins - by Seaside98 */
importScriptPage('MediaWiki:ChatSkins.js');