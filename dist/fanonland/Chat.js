/*User/Admin Imperial Wyrm is Forbidden from ever using CSS/JS without Alissa the Wise Wolf's permission.*/
var chatags = { images: true, videos: true };
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
    chatOptionsLoaded = 1;
}
importArticles({
    type: 'script',
    articles: [
        'u:shining-armor:MediaWiki:ChatTags/code.js',
         'u:dev:ChatSendButton.js',
         'u:kocka:MediaWiki:AjaxCommentDelete/code.js',
         'u:dev:MediaWiki:ChatOptions/code.js',
         'u:dev:MediaWiki:!mods/code.js',
         'u:kocka:MediaWiki:Emoticons.js',
    ]
});

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');

importScriptPage("MediaWiki:Custom-mod-icons/code.js", "kocka");

$(function(){
//////////////////////////////////////////////////////////////////////////////////////
//                           Custom Chat Pings                                      //
//----------------------------------------------------------------------------------//
// This is a script for displaying hearts next to names and using pings.            //
// Most of the code is modified Monchoman45's code from                             //
// [[w:User:Monchoman45/ChatHacks.js]]                                              //
//==================================================================================//
//                            CONFIGURATION                                         //
//==================================================================================//
 
// Source of file to be played instead of the default ping
var pingSrc = "https://vignette.wikia.nocookie.net/undertale/images/a/ac/Ping_sound.ogg";
 
//==================================================================================//
//                               END CONFIGURATION                                  //
//==================================================================================//
window.firstDing = false;
 
window.mainRoom.viewDiscussion.iconPing = function (chat)
{
    window.firstDing = !window.firstDing;
    if (window.firstDing)
    {
        var icon = window.modIcons[chat.attributes.name];
        if (icon)
        {
            var el = this.chatUL.children().last().children('.username');
            el.html(el.html() + " <img id='chat-icon' src='" + icon + "'/>");
        }
        if(chatOptions.modules.chatHacks.enabled)
        if (mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
            window.dinged = true;
            var text = chat.attributes.text;
            var pings = document.getElementById('pings').value.removeTrailing('\n').split('\n');
            for (var i = 0; i < pings.length; i++) if((text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion) && window.firstDing)
            {   
                var ping = document.createElement('audio');
                ping.src = pingSrc;
                ping.autoplay = true;
                this.scrollToBottom();
                if (this == mainRoom.viewDiscussion)
                {
                    var ref = text.toLowerCase().indexOf(pings[i].toLowerCase());
                    var phrase = text.slice(ref, ref + pings[i].length);
                    this.chatUL.children().last().children('.message').addClass('ping');
                }
                break;
            }
        }
    }
    this.chatUL.children().last().children('.message img').each(function() {this.outerHTML = '<span onclick="this.outerHTML = decodeURIComponent(\'' + encodeURIComponent(this.outerHTML) + '\');" style="color:blue; cursor:pointer;" title="' + i18n.emote + '">' + this.title + '</span>';});
};
window.mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.iconPing, mainRoom.viewDiscussion));
//==================================================================================//
//                           Custom Chat Pings - END                                //

});