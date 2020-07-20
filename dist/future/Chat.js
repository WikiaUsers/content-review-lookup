// WARNING: For normal displaying use fullscreen editor
importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:ChatDelay/code.js",
        "u:dev:MediaWiki:ChatOptions/code.js",
        "u:kocka:MediaWiki:Emoticons/code.js",
        "u:kocka:MediaWiki:Custom-mod-icons/code.js",
        "u:kocka:MediaWiki:ChatRules/code.js"
    ]
});
 
$(function() {
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
 
window.mainRoom.viewDiscussion.iconPing = function (chat) {
    window.firstDing = !window.firstDing;
    if (window.firstDing) {
        var icon = window.modIcons[chat.attributes.name];
        if (icon) {
            var el = this.chatUL.children().last().children('.username');
            el.html(el.html() + " <img id='chat-icon' src='" + icon + "'/>");
        }
        if (chatOptions.modules.chatHacks.enabled && mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
            window.dinged = true;
            var text = chat.attributes.text;
            var pings = document.getElementById('pings').value.removeTrailing('\n').split('\n');
            for (var i = 0; i < pings.length; i++) if((text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion) && window.firstDing) {
                var ping = document.createElement('audio');
                ping.src = pingSrc;
                ping.autoplay = true;
                this.scrollToBottom();
                if (this == mainRoom.viewDiscussion) {
                    var ref = text.toLowerCase().indexOf(pings[i].toLowerCase());
                    var phrase = text.slice(ref, ref + pings[i].length);
                    this.chatUL.children().last().children('.message').addClass('ping');
                }
                break;
            }
        }
    }
    this.chatUL.children().last().children('.message img').each(function() {
        this.outerHTML = '<span onclick="this.outerHTML = decodeURIComponent(\'' + encodeURIComponent(this.outerHTML) + '\');" style="color:blue; cursor:pointer;" title="' + i18n.emote + '">' + this.title + '</span>';
    });
};
window.mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.iconPing, mainRoom.viewDiscussion));
//==================================================================================//
//                           Custom Chat Pings - END                                //
//==================================================================================//
// Adding certain slash commands (WIP)                                              //
//==================================================================================//
var intervalOptions = setInterval(function() {
    if(typeof window.commands !== 'undefined') {
        window.commands.shrug = function (com, text) {
            $('#Write [name="message"]').val('¯\\_(ツ)_/¯');
            return true;
        };
        // Other commands go here
        clearInterval(intervalOptions);
    }
}, 500);
//==================================================================================//
// Snippet for showing the collapse/expand user list as the default button is       //
// invisible on a darker skin (like we have >_>)                                    //
//==================================================================================//
$('<p class="private" style="display:block" id="collapseUsersMain">Members [<a href="#" id="collapseUsersLink">show/hide</a>]</p>').insertAfter($("#Rail .public.wordmark").last());
$('#collapseUsersLink').click(function() { $("#WikiChatList").slideToggle(); });
//==================================================================================//
// Hide siderail button                                                             //
//==================================================================================//
$('.public.wordmark').first().append("<button class='HideRailButton' style='float:right' onclick='$(\"#Rail\").toggle();var toggleWidth = ($(window).width() - ($(\".Chat\").offset().left+$(\".Chat\").outerWidth())) > 150 ? \"0px\" : \"150px\";$(\".Chat\").css({right:toggleWidth});'>Toggle side bar</button>");
//==================================================================================//
//                          Nothing to see anymore! :)                              //
//==================================================================================//
});