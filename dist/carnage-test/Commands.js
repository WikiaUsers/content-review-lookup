// This is just a sample script. Paste your real code (javascript or HTML) here.
void(function init(mw, $, commands, ChatCommands) {
    /* Creating the main chat commands object */
    $.extend(ChatCommands, {
        /**
         * Adds a new command if it does not exist
         * 
         * @param {string} name - The name of the command
         * @param {function} cb - The callback used for the command
         **/
        addCommand: function addCommand(name, cb) {
            if(typeof commands[name] === 'undefined') {
                commands[name] = cb;
            }
        },
        /**
         * Removes a command from the list
         * 
         * @param {string} name - The name of the command
         **/
        removeCommand: function removeCommand(name) {
            if(typeof commands[name] !== 'undefined') {
                delete commands[name];
            }
        },
        /**
         * Sets the command or adds a new command. This method is similar
         * to the addCommand function, but it can set the callback of the
         * command.
         * 
         * @param {string} name - The name of the command
         * @param {function} cb - The callback used for the command
         **/
        setCommand: function setCommand(name, cb) {
            commands[name] = cb;
        },
        /**
         * Checks if a command exists
         * 
         * @param {string} name - The name of the command
         * @param {function} cb - The function used if the command does exists
         * @return {boolean} The value used to determine whether a command exists
         **/
        exists: function exists(name) {
            var value = typeof commands[name] !== 'undefined';
            if(typeof cb === 'function') {
                if(value === true) {
                    cb.apply(window, [commands[name]]);
                } else return value;
            } else return value;
        },
        /**
         * @type {boolean} isActive - Determines whether the commands are active
         **/
        isActive: (function(timer) {
            if(typeof timer === 'object') {
                if(timer.value === timer.limit) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }).apply(window, [ChatCommands.timer])
    });

    function initTimer() {
        if(typeof ChatCommands.timer !== 'object') return;
        ChatCommands.timer.value += 1;
        init.apply(window, [mw, $, commands, ChatCommands]);
    }

    if(typeof ChatCommands.timer == 'object') {
        if(ChatCommands.timer.value === ChatCommands.timer.limit) {
            clearInterval(initTimer);
        } else {
            setInterval(initTimer, 1);
            return;
        }
    }

    if(ChatCommands.isActive === true) {
        NodeChatController.prototype.sendMessage = function(event) {
            if(!this.isActive) return true;
            if((
                    (event.which || event.keyCode) === 13 ||
                    (event.keyIdentifier || event.key) === 'Enter'
                ) && !event.shiftKey) {
                event.preventDefault();
                this.resetActivityTimer();
                var input = this.viewDiscussion.getTextInput(),
                    send = Preparse.call(this, input.val());
                if(input.val() && send) {
                    var entry = new models.ChatEntry({
                        roomId: this.roomId,
                        name: mw.config.get('wgUserName'),
                        text: input.val()
                    });
                    if(this.isPrivate === true) {
                        if(this.afterInitQueue.length < 1 || this.model.users.length < 2) {
                            this.mainController.socket.send(this.model.privateRoom.xport());
                        }
                        if(!this.isInitialized) {
                            this.afterInitQueue.push(chatEntry.xport());
                            entry.set({
                                temp: true,
                                avatarSrc: mw.config.get('wgAvatarUrl', mainRoom.model.users.findByName(wgUserName).attributes.avatarSrc)
                            });
                            this.model.chats.add(entry);
                        } else {
                            this.socket.send(entry.xport());
                        }
                    } else {
                        this.socket.send(entry.xport());
                    }

                    event.preventDefault();
                }

                input.val('');
                input.focus();
            }
        };

        //Away status functions
        NodeChatController.prototype.setAway = function(msg) {
            if(!msg) {
                msg = '';
            }
            $().log("Attempting to go away with message: " + msg);
            var setStatusCommand = new models.SetStatusCommand({
                statusState: STATUS_STATE_AWAY,
                statusMessage: msg
            });
            this.inlineAlert(i18n['away']);
            this.socket.send(setStatusCommand.xport());
        };
      
        NodeChatController.prototype.setBack = function() {
            if(!this.comingBackFromAway) { // if we have sent this command (but just haven't finished coming back yet), don't keep spamming the server w/this command
                $().log("Telling the server that I'm back.");
                this.comingBackFromAway = true;
                var setStatusCommand = new models.SetStatusCommand({
                    statusState: STATUS_STATE_PRESENT,
                    statusMessage: ''
                });
                this.inlineAlert(i18n['back']);
                this.socket.send(setStatusCommand.xport());
            }
        };
      
        NodeChatController.prototype.clearWindow = function() {
            this.viewDiscussion.chatUL.html('');
            this.inlineAlert(i18n['cleared']);
        };

        mainRoom.viewDiscussion.unbind('sendMessage');
        mainRoom.viewDiscussion.bind('sendMessage', $.proxy(mainRoom.sendMessage, mainRoom));

        function Preparse(text) {
            var args = text.slice(1).trim().split(/\s+/),
                command = args.shift(),
                _commands = commands,
                done = false;
            if((text.charAt(0) === '/') && command.length > 0) {
                while(!done) {
                    switch(typeof commands[command]) {
                        case 'string':
                            while(typeof _commands[command] == 'string') {
                                command = _commands[command];
                            }
                            break;
                        case 'object':
                            _commands = _commands[command];
                            if(args.length === 0) {
                                command = 'fallback';
                            } else {
                                command = args[0];
                                if(typeof _commands[command] === 'undefined') {
                                    ref = 'fallback';
                                } else {
                                    args.shift();
                                }
                            }
                            break;
                        default:
                            done = true;
                    }
                }
                if(_commands[command] === 'function') {
                    return _commands[command].apply(this, [args.join(' '), text]);
                }
            }
        }

        commands = $.extend(commands, {
            'away': 'afk',
            'afk': function(com, text) {
                if($('#ChatHeader .User').hasClass('away') === false) {
                    if(!text) text = '';
                    mainRoom.setAway(text);
                }
            },
            'clear': function(com, text) {
                this.clearWindow();
            },
            'coppa': function(com, text) {
                $('#Write [name="message"]').val('https://coppa.org/ ' + (com || i18n['coppa']));
                return true;
            }
        });
    }
})(mediaWiki, jQuery, window.commands = {}, window.ChatCommands = window.ChatCommands || {});