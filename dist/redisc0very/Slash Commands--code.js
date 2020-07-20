// @name   Slash Commands - Standalone 
// @author Static Whisper

;(function() {
    var commands = {
        // ...
        '/love?': 'What is love? Baby don\'t hurt me~ Don\'t hurt me~ No more~!',
        '/shrekt': function(user) {
            messageBox.val(user + ', you just got shrekt.');
            messageBox.trigger({
                type: 'keypress',
                which: 13
            });
        },
        '/hide': function() {
            $('.ChatWindow .Chat').css('display', 'none');
        },
        '/show': function() {
            $('.ChatWindow .Chat').css('display', 'block');
        },
        '/top': function() {
            $('.Chat').scrollTop(0);
        },
        '/btm': function() {
            $('.Chat').scrollTop($('.Chat > ul').height());
        },
        '/block': function(user) {
            if (typeof mainRoom.model.blockedUsers.findByName(user) !== 'undefined') {
                customIA('PMs from ' + user + ' are already blocked.');
            } else {
                mainRoom.blockPrivate({name:user});
                customIA('Blocked PMs from ' + user + '.');
            }
        },
        '/unblock': function(user) {
            if (typeof mainRoom.model.blockedUsers.findByName(user) !== 'undefined') {
                mainRoom.allowPrivate({name:user});
                customIA('Unblocked PMs from ' + user + '.');
            } else {
                customIA('PMs from ' + user + ' are already unblocked.');
            }
        },
        '/checkblock': function(user) {
            typeof mainRoom.model.blockedUsers.findByName(user) !== 'undefined' ? customIA('PMs from ' + user + ' are blocked.') : customIA('PMs from ' + user + ' are NOT blocked.');
        }
    };
    var messageBox = $('textarea[name="message"]');
    var command;
    if (typeof customCommands !== 'undefined') {
        for (command in customCommands) {
            commands[command] = customCommands[command];
        }
    }
    function customIA(message) {
        $('#Chat_' + mainRoom.roomId + ' ul').append('<li class="inline-alert">' + message + '</li>');
        $('.Chat').scrollTop($('.Chat > ul').height());
    }
    messageBox.keydown(function(e) {
        if (e.which === 13) {
            for (var command in commands) {
                var divideInput;
                var commandInput;
                var seekCommand = $(this).val();
                if (seekCommand.match(/\s/)) {
                    divideInput = seekCommand.split(/\s/);
                    seekCommand = divideInput[0];
                    divideInput.splice(0, 1);
                    commandInput = divideInput.join(' ');
                }
                if ((seekCommand.toLowerCase() === command) && (seekCommand.substring(0,1).match(/\//))) {
                    e.preventDefault();
                    $(this).val('');
                    if (typeof commands[command] === 'function') {
                        typeof commandInput !== undefined ? commands[command](commandInput) : commands[command]();
                    } else {
                        $(this).val(commands[command]);
                        $(this).trigger({
                            type: 'keypress',
                            which: 13
                        });
                    }
                }
            }
        }
    });
})();