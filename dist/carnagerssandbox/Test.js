/* Some of the code belongs to their respective owners */
function chatButton(handler, message, visibility, id){
    var button = '<div style="margin: 10px auto; -webkit-user-select: none; -moz-user-select: none; -khtml-user-select: none; user-select: none; visibility: ' + visibility + ';" id="' + id + '"><a class="wikia-button" onclick="' + handler + '" href="#">' + message + '</a></div>';
    $('.Rail .public').prepend(button);
}

function configureChatButtons(boolean_value){
    if (boolean_value == "true"){
       chatButton('openTestModal()', 'Test', 'visible', 'open-test-modal');
       chatButton('clearChat()', 'Clear Chat', 'hidden', 'clear-chat-button');
    }
    else if (boolean_value == "false"){
    }
}

window.onload = configureChatButtons('true');

function clearChat(){
    chatSize = $('div.Chat:first ul li').size() - 1;
    $('.Chat:first li:lt(' + chatSize + ')').remove();
}

function openTestModal(){
    $.openCustomModal('Test', '<form class="WikiaForm" method="" name=""><fieldset style="border: 1px solid orange;"><h2>Styles</h2><table id="styles-table" style="overflow-y: auto;"><tbody><tr><td><label for="chat-background">Chat Background: </label><input type="text" placeholder="Chat Background" id="chat-background" /></td><td><label for="self-post">Self Post:</label><input type="text" placeholder="Self Post Background" id="self-post" /></td></tr><tr><td><label for="surround">Surround: </label><input type="text" placeholder="Surround" id="surround" /></td><td><label for="self-postcolor">Self Post Color: </label><input type="text" placeholder="Self Post Color" id="self-postcolor" /></td></tr><tr><td><label for="chat-font">Chat Font: </label><select id="chat-font"><option selected>Arial</option><option>Trebuchet MS</option><option>Verdana</option><option>Georgia</option><option>Lucida Console</option></select></td><td><label for="self-postfont">Self Post Font: </label><select id="self-postfont"><option selected>Arial</option><option>Trebuchet MS</option><option>Verdana</option><option>Georgia</option><option>Lucida Console</option></select></td></tr><tr><td><label for="clear-chat">Clear Chat Button</label><input type="checkbox" id="clear-chat" value="clear-chat" checked /></td><td><label for="chatmenu-button">Chat Menu Button</label><input type="checkbox" id="chatmenu-button" value="clear-chat" /></td></tr></table></fieldset></form>',
          {
             id: 'testModalS',
             width: 625,
             buttons: [
                 {
                    id: 'closeModalS',
                    message: 'Cancel',
                    handler: function(){
                          closeTestModalS();
                    }
                 },
                 {
                    id: 'submitTestS',
                    defaultButton: true,
                    message: 'Submit',
                    handler: function(){
                          submitTestS();
                          setInterval(closeTestModalS(), 500);
                    }
                  }
             ]
    });

    function closeTestModalS(){
        var dialog = $('#testModalS');
        dialog.closeModal();
    }

    function submitTestS(){
        $('head').append('<style type="text/css">.ChatWindow { background: ' + $("#surround").val() + '; font-family: ' + $("#chat-font option:selected").text() + ';} .Chat { background: ' + $("#chat-background").val() + ';} .Chat .you { background: ' + $("#self-post").val() + '; color: ' + $("#self-postcolor").val() + '; font-family: ' + $("self-postfont option:selected").text() + ';}</style>');
        if ($('#clear-chat').is(':checked') && $('#clear-chat-button').is(':hidden')){
           $('#clear-chat-button').css('visibility', 'visible');
        }
        else {
           $('#clear-chat-button').css('visibility', 'hidden');
        }
    }
}