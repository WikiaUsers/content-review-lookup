/************************
* Originally taken / inspired by the steven-universe Wikia.
*************************/

importArticles({
    type: 'script',
    articles: [
        'u:dev:Tabinsert.js', //Tab Insert
        'u:dev:AjaxEmoticons/code.js', //AjaxEmoticons (so users don't have to refresh the chat to see the latest emoticons)

        'u:dev:ChatTags/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatOptions/code.js',
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:!kick/code.js'
    ]
});

/* Add Buttons */
function addButtons() {
    if ($('#chatOptionsButton').length === 0) {
        setTimeout(addButtons, 250);
    } else if ($('.chat-button').length === 0) {
        $('#chatOptionsButton').after($("<div>", { class:"custom-button-tray" }).append(dayNightButton(), clearChatText(), reAddKockaEmoticons()));
    }
}

/* Clear chat */
function clearChatText() {
    var $clearDiv = $('<div>').addClass('chat-button');
    var $clearLink = $('<a>').addClass('wikia-button').text('Clear');//('Clear chat');
    $clearDiv.html($clearLink);
    $clearLink.click(function() {
        $('.Chat li').remove();
    });
    return $clearDiv;
}

/* Day/Night Switch Feature */
function dayNightButton() {
    var dayText = '☀';//'Day theme';
    var nightText = '☽';//'Night theme';
    var $dayNightButton = $('<div>').addClass('chat-button');
    var $dayNightLink = $('<a>').addClass('wikia-button').text(dayText);
    var $body = $('body');
    $dayNightButton.html($dayNightLink);
    $dayNightLink.click(function() {
        $body.toggleClass('day');
        $body.toggleClass('night');
        $(this).text(function(index, text) {
            return text === dayText ? nightText : dayText;
        });
    });
    $body.addClass('night');
    return $dayNightButton;
}

window.onload = addButtons();
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Remember to troll responsibly, everymouse!';
 
$(function() { 
    $('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#00B2EE;font-weight:bold;line-height:1.6;margin-left:110px;">'+chatTopic+'</div>') 
.find('a').attr('style','position:relative;text-decoration:none;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

/* Blinking Title Bar (notifications about new private messages) by Dorumin */
(function() {
  var original = document.title;
  var timeout;
 
  window.flashTitle = function(newMsg, howManyTimes) {
    howManyTimes = 50000000000001;
 
    function step() {
      document.title = (document.title == original) ? newMsg : original;
      timeout = setTimeout(step, 1000);
    }
 
    cancelFlashTitle(timeout);
    step();
  };
 
  window.cancelFlashTitle = function() {
    clearTimeout(timeout);
    document.title = original;
  };
}());
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        $('#PrivateChatList').bind("DOMSubtreeModified", function(e) {
            if (!document.hasFocus()) {
                var usr = $( ".PrivateChatList .User" ).has( ".splotch" ).attr("data-user");
                flashTitle("New Message from " + usr + "!");
            }
        });
    }
});
 
window.onfocus = function() {
    cancelFlashTitle();
};

/* Credits to the Steven Universe Wiki for the JS and CSS! */

function reAddKockaEmoticons() {
    //  Move the location of emoticon button
    var kockaEmoticonsSpan = $(".kockaEmoticonsSpan");
    kockaEmoticonsSpan.html( "<img src='https://images.wikia.nocookie.net/atelier801/images/5/5b/E5_TFM.png/revision/latest/scale-to-width-down/19?format=.png' />" );
    var button = $("<div/>", { class:"chat-button" });
    kockaEmoticonsSpan.appendTo( button );
    kockaEmoticonsSpan.addClass("button");
    return button;
};