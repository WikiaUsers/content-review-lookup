$(document).ready(function(){
     $.showCustomModal('Welcome to the Anime Project Chat!', '<fieldset><p>Welcome to the Anime Project Chat! If you want to use this chat, you must have at least an edit, and follow the <a href="/wiki/Project:Rules">rules.</a> If you have read the rules, you can go on and enjoy the chat. <span style="font-weight: bold;">Note:</span> This chat may have profanity at any time, so beware for trolls and do not feed them.</p>&nbsp;<form class="WikiaForm" method="" name=""><label for="css" style="font-weight: bold;">CSS:</label><textarea id="css" placeholder="Add Custom CSS" cols="50" rows="5" style="font-family: Lucida Console, monospace;"></textarea></form></fieldset>', 
        {
           id: "welcomeModal",
           width: 650,
           buttons: [
                 {
                    id: "close",
                    message: "Cancel",
                    handler: function(){
                         closeWelcome();
                    }
                 },
                 {
                    id: "submit",
                    message: "Submit",
                    handler: function(){
                         submitTest();
                         setTimeout(closeWelcome(), 1000);
                    }
                 }
              ]
     });
  function closeWelcome(){
     $('#welcomeModal').closeModal();
  }
  function submitTest(){
     $('head').append('<style type="text/css">' + $('textarea#css').val() + '</style>');
  }
});

window.onload = function(){
   if (wgUserGroups.indexOf('sysop') != -1 || wgUserGroups.indexOf('chatmoderator') != -1) {
     $('.multikick-button').css('display','block');
   }
   else {
     $('.multikick-button').css('display', 'none');
   }
};

var chatTopic = '<span style="color: orange;">Welcome to the <em style="font-style: normal; font-weight: 600;">Anime Project!</em> Take your starting positions!</span><a href="javascript:clearChat();" class="wikia-button clearchat-button">Clear Chat</a><a href="javascript:multiKick();" class="wikia-button multikick-button" style="display: none;">Multi Kick</a>';

function clearChat(){
  $('.Chat li').remove();
}
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:180px;">' + chatTopic + '</div>')
	.find('a').attr('style','position:relative;')
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

setInterval(function(){
       $('.User.chat-mod .username').each(function(){
           if (this.innerHTML.match(/Ultimate Dark Carnage|JjBlueDreamer1|HypercaneTeen/)){
                   $(this).parent().addClass('admin').removeClass('chat-mod');
           }
       });
}, 1000);

// Based on the Day/Night chat code
// Written by Foodbandlt
var altThemeButton = 'Test Theme';
var regThemeButton = 'Normal Theme';

var textColor     = 'red';
var bgColor       = '#00003A';
var selfPost      = 'red';
var selfPostColor = 'white';
var fgColor       = 'rgba(0, 0, 0, 0.6)';
var linkColor     = 'black';

function configureTheme(){
    var styleElement  = document.createElement('style');
    styleElement.setAttribute('id', 'alt-APtheme');
    styleElement.innerHTML = 
       'body.ChatWindow {' +
           'background-color: ' + bgColor + ';' +
       '}' +

       '.username,' +
       '.message,' +
       'div.chattopic,' +
       '.info' +
       '#ChatHeader h1.private,' +
       '.Write textarea {' +
           'color: ' + textColor + ';' +
       '}' +

       '#ChatHeader,' +
       '#Rail,' +
       '.Chat,' +
       '.UserStatsMenu,' +
       '.Write div {' +
           'background-color: ' + fgColor + ';' +
       '}' +

       '.Chat .you {' +
           'background-color: ' + selfPost + ';' +
           'color: ' + selfPostColor + ';' +
       '}' +

       'a {' +
           'color: ' + linkColor + ';' +
       '}';
    $('head').append(styleElement);
}

function addTestButton(){
    var r = $('#chatOptionsButton');
    var s = document.createElement('div');
    s.setAttribute('class', 'test-button-overlay');
    s.onclick = changeTheme();
    s.setAttribute('style', 'margin: 10px auto; text-align: center; cursor: pointer');
    s.innerHTML = '<a class="wikia-button test-button"></a>';
    r.after(s);

    if ($('style#alt-APtheme').size() < 1 && $('style#alt-APtheme .User').size() < 1){
        configureNormalTheme();
    }
}

function alt_reg(which){
    if (which == "alt"){
        $('style#reg-APtheme').remove();
        $('.Rail .test-button-overlay .test-button').text(regThemeButton);
        configureTheme();
    }
    else {
        $('style#alt-APtheme').remove();
        $('.Rail .test-button-overlay .test-button').text(altThemeButton);
        configureNormalTheme();
    }
}

function changeTheme(){
    if ($('.Rail .test-button-overlay .test-button').text() == altThemeButton){
        alt_reg('alt');
    }
    else {
        alt_reg('reg');
    }
}

if ($('.Rail .test-button').text() == ""){
   addTestButton();
}

while ($('.Rail .test-button-overlay').size() > 1){
   $('.WikiaPage .Rail div:last-child').remove();
}