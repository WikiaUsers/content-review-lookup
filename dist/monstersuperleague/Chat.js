// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
// ****************
// END Chat options import
// ****************
 
//
/**
 * Replace YouTube video or playlist URL with YouTube video or playlist
 * Copyright © 2012, [[User:AnimatedCartoons]]
 */
setInterval(function () {
    "use strict";
    var $video1 = $('.Chat .message a[href*="www.youtube.com/watch?v="]').text(),
        video2 = $video1.replace('www.youtube.com/watch?v=', 'www.youtube-nocookie.com/embed/'),
        video3,
        $playlist1 = $('.Chat .message a[href*="www.youtube.com/playlist?list="]').text(),
        playlist2 = $playlist1.replace('www.youtube.com', 'www.youtube-nocookie.com/embed'),
        playlist3;
    if (video2.indexOf('http://') === 0) {
        video3 = video2.slice(7);
    } else if (video2.indexOf('https://') === 0) {
        video3 = video2.slice(8);
    } else if (playlist2.indexOf('http://') === 0) {
        playlist3 = playlist2.slice(7);
    } else if (playlist2.indexOf('https://') === 0) {
        playlist3 = playlist2.slice(8);
    }
    $('.Chat .message a[href*="www.youtube.com/watch?v="]').replaceWith('<iframe width="560" height="315" src="https://' + video3 + '?html5=1" frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>');
    $('.Chat .message a[href*="www.youtube.com/playlist?list="]').replaceWith('<iframe width="560" height="315" src="https://' + playlist3 + '" frameborder="0" webkitAllowFullScreen="webkitAllowFullScreen" mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>');
}, 1);
//
 
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
var chatags = { images: true, videos: true };
 
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:MediaWiki:!mods/code.js'
        // ...
    ]
} );
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
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