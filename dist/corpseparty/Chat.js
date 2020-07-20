// Credit to Runescape Wiki

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
// Emoticons List and Chat Rules List written by KockaAdmiralac for the Undertale Wikia
// Theme Switch Feature From SU Wikia
	
// IMPORTS
var chatags = { images: true, videos: true };

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:ChatRules/code.js',
        'MediaWiki:Emoticons/code.js',
        'MediaWiki:YoutubePlayer/code.js',

        'u:dev:AjaxEmoticons/code.js',
        'u:dev:ChatNotifications/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatReload/code.js',
        'u:dev:ChatTags/code.js',
    ]
});

window.chatReloadTime = 60000;

/* Add Buttons */
$(window).load(function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after(noZoomButton());
    }
});

/* Zoom Switch Feature */
function noZoomButton() {
    var noZoomText = 'Zoom out';
    var zoomText = 'Zoom in';
    var $noZoomButton = $('<div>').addClass('chat-button');
    var $noZoomLink = $('<a>').addClass('wikia-button').text(noZoomText);
    var $body = $('body');
    $noZoomButton.html($noZoomLink);
    $noZoomLink.click(function() {
        $body.toggleClass('nozoom');
        $body.toggleClass('zoom');
        $(this).text(function(index, text) {
            return text === noZoomText ? zoomText : noZoomText;
        });
    });
    $body.addClass('zoom');
    return $noZoomButton;
}

//Random YTPlayer
$(window).load(function addPlayer() {
    if ($('#Rail').length === 0) {
        setTimeout(addPlayer, 250);
    } else if ($('.youtubeplayerdiv').length === 0) {
        $('#Rail').after(ytPlayer());
    }
});

function ytPlayer(){
    mw.util.addCSS(".youtubeplayerdiv{position:absolute; right:0; bottom:0; font-weight:bold;}");
    var $random = Math.floor(Math.random() * (41 - 0 + 1)) + 0;
    var ytp = $('<div class="youtubeplayerdiv">Music Player:<br/><iframe class="youtubeplayer" width="135" height="90" src="//www.youtube.com/embed/?feature=player_embedded&autoplay=0&loop=1&list=PLyidEMQkXOKnarDF-FJnNNQxCbWCKltmP&index=' + $random + '&disablekb=0" frameborder="0" allowfullscreen></iframe></div>');
    return ytp;
}

//Random Chat BG
$(function RandomBkgnd() {
    var bkgndArray = new Array(); 
    bkgndArray[0] = 'https://vignette.wikia.nocookie.net/corpseparty/images/0/02/Background_wiki.png';
    bkgndArray[1] = 'https://vignette.wikia.nocookie.net/corpseparty/images/5/59/Main_bg2.png';
    bkgndArray[2] = 'https://vignette.wikia.nocookie.net/corpseparty/images/2/24/Main_bg.png';
    bkgndArray[3] = 'https://vignette.wikia.nocookie.net/corpseparty/images/b/b3/Bg2.png';
    bkgndArray[4] = 'https://vignette.wikia.nocookie.net/corpseparty/images/e/ee/Bg3.png';
    bkgndArray[5] = 'https://vignette.wikia.nocookie.net/corpseparty/images/1/1e/Bg4.png';
    bkgndArray[6] = 'https://vignette.wikia.nocookie.net/corpseparty/images/6/68/Bg5.png';
    bkgndArray[7] = 'https://vignette.wikia.nocookie.net/corpseparty/images/7/77/Bg6.png';
    bkgndArray[8] = 'https://vignette.wikia.nocookie.net/corpseparty/images/5/55/Chat_bg.png';
    var chosenBkgnd = Math.floor( Math.random() * bkgndArray.length );
 
    $("#WikiaPage").css("background", 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(' + bkgndArray[chosenBkgnd] + ') fixed no-repeat center');
});

//ChatBotTag
$(window).load(function(){
    $('#user-SachiBot > .details').after("<span style='color:#6b6a6a;'>Chat Bot</span>");
});