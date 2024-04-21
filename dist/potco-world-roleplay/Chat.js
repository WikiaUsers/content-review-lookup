//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<span style="color:#FFFFFF;"><img src="http://projects.cbe.ab.ca/glendale/showcase/oldworld-newworld/renaissance/transportation/images/globe.jpg" width="28" height="35"/></span></a>';
 
// END Chat topic

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

var blinkInterval = 1000; // Custom blink delay, 1000ms is default

importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatDelay/code.js',
        'u:dev:ChatSendButton.js',
        'u:dev:PrivateMessageAlert/code.js',

        'u:kocka:MediaWiki:Emoticons.js',

        'u:lmbtest:MediaWiki:ChatParty.js',
        'u:lmbtest:MediaWiki:ChatSkins.js',

        'u:lmbw:MediaWiki:LMBWChat.js',
    ]
});

//////////////////////////////////////////////////////////////////////////////////////
//                           Custom Chat Pings                                      //
//----------------------------------------------------------------------------------//
// This is a script for displaying hearts next to names and using pings.            //
// It is still in testing to prevent bugs if ChatHacks aren't enabled in options.   //
//==================================================================================//
//                            CONFIGURATION                                         //
//==================================================================================//
 
    /**
     * Source of file to be played instead of the default ping
     */
    var pingSrc = "https://vignette.wikia.nocookie.net/undertale/images/a/ac/Ping_sound.ogg";
 
//=============================================================================//
//                               END CONFIGURATION                             //
//=============================================================================//
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
//////////////////////////////////////////////////////////////////////////////////////

 /*Chat Party - by ShermanTheMythran Modified by Lil' Trunks*/
var partyLink1 =
"https://vignette.wikia.nocookie.net/potco-united-nations/images/d/dd/07-Where-Is-My-Mind_.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"https://vignette.wikia.nocookie.net/potco-united-nations/images/d/dd/07-Where-Is-My-Mind_.ogg"; //link to first song in mp3
 
var partyLinkText1 =
"Blue Falcon Groove"; //text for first song
 
var partyLink2 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/e/e1/Mark_Ronson.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/e/e1/Mark_Ronson.ogg"; //link to second song in mp3
 
var partyLinkText2 =
"Uptown Funk"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/2/20/Kill_Yourself.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"https://images.wikia.nocookie.net/zcrushersstrikeforce/images/2/20/Kill_Yourself.ogg"; //link to third song in ogg
 
var partyLinkText3 =
"Kill Yourself"; //text for third song
 
$('.public.wordmark').first().append(button);
    $('<p class="private" style="display:block" id="collapseUsersMain">Members [<a href="#" id="collapseUsersLink">show/hide</a>]</p>').insertAfter($("#Rail .public.wordmark").last());
    $('#collapseUsersLink').click(function(){console.log($("#WikiChatList").slideToggle())});
    $('.public.wordmark').first().append("<button class='kockaHideRailButton' style='float:right' onclick='$(\"#Rail\").toggle();var toggleWidth = ($(window).width() - ($(\".Chat\").offset().left+$(\".Chat\").outerWidth())) > 150 ? \"0px\" : \"150px\";$(\".Chat\").css({right:toggleWidth});'>Toggle side bar</button>");