/* Standardization:
 * - Please use single quotes for strings
 * - Proper capitalization and grammar... generally.
 * - When applicable, end punctuation marks within array elements to avoid emoticon errors
 * - Upside-down A character for emoji mouth for consistency. w
 */
 
if (wgCanonicalSpecialPageName == 'Chat') {
 
    //Autoreplies: given 'input text':, tsurubot will respond with 'reply text',
    window.autoreplies = {
        '^!$': '☆⌒∠(°∀° )?',
        '^$': '∠(・∀・ )?',
        '^help': 'Check [[User:Tsurumaru_Kuninaga|my page]] for help commands. (°∀° )',
        '^hi$': 'ヾ(°∀° )',
        '^hello': 'ヾ(°∀° )',
        '^ohayou': 'おはよう。',
        '^おはよう': 'おはようございます！',
        '^ohio': 'Florida.',
        '^(good.?night|oyasumi)': 'おやすみ。 (:з[＿＿＿]',
        '^(bye.?bye|bye)': 'ヾ(°∀° )',
        '^good.?bye': 'さようなら。',
        '^(okaeri|おかえり)': 'ただいま。 (^∀^✿)',
        '^(tadaima|ただいま)': 'おかえり。 (^∀^✿)',
        '^stupid question': 'The [[FAQ]] is right here.',
        '^corndog': '_(:з」∠)_',
        '^isshin.?furan': '(isshinfuran)',
        '(dead|rip)': '†┏┛ 墓 ┗┓†',
        '(damage|dmg)': '【重傷】',
        'yamiochi corndog': '_(ᐛ」∠)_',
        '(darwin|evolution)': '_(:з」∠)_ _(ᐛ」∠)_ _(」∠ ᐛ)_ _(」∠ ､ﾝ､)_',
        'yamiochi': 'ᕕ(ᐛ)ᕗ',
        'unclam':'(:\\_/)',
        '(calm|clam)': '(:Y)',
        '^(ossan|osoi)': '_(」∠ ､ﾝ､)_',
        '^question': 'No.',
        '^thank you': 'You\'re welcome.',
        '^can i ask a question': '^ I think you mean \'may I ask a question\'.',
        '^may i ask a question': 'Denied.',
        '^what is life': '(1:30)',
        '^(bless with holy water|holy.?water)': '(cha) (rngesus) (cha)',
        '^(tea|cha)': '(cha) Bless you.',
        '^bless': '(rngesus)',
        'cereal': 'CRUSH.',
        'develop': 'Developed by DMM, Kadokawa Games, Alouette Games and Nitroplus.',
	'shrug': '┐(\'～`,)┌',
	'^gao': '(｢･ω･)｢ が～おー',
	'(spider|fujo|homo)': '┌(┌^o^)┐',
	'cornsob': '_(；- ；」∠)_',
	'(cray|not well)': '_(。 ワ ﾟ」∠)_',
	'(vomit|weed)': '_(´ཀ`」 ∠)_ ',
	'^(mitsu|ccp)': '(●ω・*)',
	'(shibari|bdsm)': '(:з||||||∠)_',
	'seduce': '_(┐「ε: )_',
	'shock': 'Σ(゜ロ゜;)',
 
 
        '^tsurunot': function (input, name, isAdmin) {
            var list = ['Tsuruyes!', 'Tsurumaybe~', 'Tsuruperchance.', 'Tsurudefinitelynot.'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
        '^what is heaven': function (input, name, isAdmin) {
            var list = ['But what is hell?', '(crane)', '(isshinfuran)'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
        '^what is hell': function (input, name, isAdmin) {
            var list = ['(1:30)', '(firegif)', '(isshinfuran)', 'LSS: Last Sword Syndrome.', 'CSS: Cold Somen Saga.'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
        '^(驚いたか|odoroita ka|odoroitaka)': '(odoroita)',
        '(crane|odoroita)': 'はっはは、驚いたか？',
 
        '^who am i': function (input, name, isAdmin) {
            var list = [', a rarity-3 scrub.', ', who I picked up from the combustible bin (firegif)', '. Please cleanse youself (cha) (rngesus) (cha) .'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(name + list[rand]);
            return true;
        },
	'^who are your best friends': function (input, name, isAdmin) {
	    var list = ['(kuri) (ccp) (heshi)', '(pray) (ichi) (tea)',];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
 
        //Sword husbandry
        '(who is|who\'?s) your (husband|husbando)': function (input, name, isAdmin) {
            var list = ['Mikazuki Munechika.', 'Ichigo Hitofuri.', 'Kogitsunemaru.', 'Ookurikara.', 'Uguisumaru.'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
        '(who is|who\'?s) my (husband|husbando)': function (input, name, isAdmin) {
            var list = ['Mitsutada.', 'Ookurikara.', 'Hasebe.', '(kakaka)', 'Nn, some other guy.'];
            if (name == 'Pandacath')
                list = ['Mitsutada <3'];
            if (name == 'Zettanoia')
                list = ['[[Sexual_Dark_Chocolate]].'];
            if (name == 'Dtx3D')
                list = ['Hasebe.'];
            if (name == 'Chuusagi' || name == 'Miiandering')
                list = ['Me? <3'];
            if (name == 'Shokudaikiri Mitsutada')
                list = ['Everyone, basically. w'];          
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
        '(who is|who\'?s) my (waifu|wife)': function (input, name, isAdmin) {
            var list = ['Mitsutada.', 'Mitsutada is everyone\'s waifu w'];
            if (name == 'Pandacath')
                list = ['Mitsutada <3'];
            if (name == 'Zettanoia')
                list = ['[[Sexual Dark Chocolate|Sexual Dark Chocolate (nyan) ]]'];
            if (name == 'Dtx3D')
                list = ['Hasebe.'];
            if (name == 'Chuusagi' || name == 'Miiandering')
                list = ['Me? (odoroita)']; 
            if (name == 'Shokudaikiri Mitsutada')
                list = ['But you\'re the wife? w'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
        '(who is|who\'?s) your (waifu|wife)': function (input, name, isAdmin) {
            var list = ['Mitsutada.', 'Mitsutada w', 'Mitsutada is everyone\'s waifu w', 'I\'d say Mitsutada but Kuri\'ll kill me w'];
            var rand = Math.floor(Math.random() * list.length);
            Speak(list[rand]);
            return true;
        },
 
        '^choose': '^pick',
        '^pick': function (input, name, isAdmin) {
            var choices = input.split(' or ');
            var rand = Math.floor(Math.random() * choices.length);
            Speak(choices[rand] + '.');
            return true;
        },
 
        'do you want to see my sword\\s?list': '^kickme',
        'i\'?m a kuso saniwa': '^kickme',
        '^kill me': '^kickme',
        '^dismantle me': '^kickme',
        '^burn me': '^kickme',
        '^chat\\s?nuke': '^kickme',
        '^kick me': '^kickme',
        '^roundhouse kick me': '^kickme',
        '^kickme': function (input, name, isAdmin) {
            Kick(name);
            return true;
        },
 
        '^destroy': '^kick',
        '^terminate': '^kick',
        '^exterminate': '^kick',
        '^slap': '^kick',
        '^punch': '^kick',
        '^nuke': '^kick',
        '^rekt': '^kick',
        '^break': '^kick',
        '^repair': '^kick',
        '^dismantle': '^kick',
        '^roundhouse kick': '^kick',
        '^kick': function (input, name, isAdmin) {
            if (!isAdmin) {
                Speak('Only admins can kick. （笑）');
                return true;
            }
            Speak('バイバイ（笑）');
            Kick(input);
            return true;
        },
 
        '^(steak|stake)': function (input, name, isAdmin) {
	    var ribs = 'O(-';
	    for (var i = parseInt(input); i > 0; i--) {
		if (i > 420) i = 420;
		ribs += 'T--';
	    }
	    ribs += '<';
            Speak(ribs);
            return true;
        },
 
        '^autokicklist': function (input, name, isAdmin) {
            if (isAdmin) {
                var str = [];
                var time = new Date().getTime();
                for (var key in window.autokick) {
                    var time_left = (parseInt(window.autokick[key]) - time) / 60000
                    str.push(key + ' (' + parseInt(time_left) + ')');
                }
                Speak('Auto-kick registries: ' + str.join(', '));
            }
            return true;
        },
 
        '^autokick': function (input, name, isAdmin) {
            if (isAdmin) {
                input = input.split(' ');
                var time = 300000;
                if (!isNaN(parseInt(input[0])))
                    time = parseInt(input.shift()) * 60000;
                input = input.join(' ');
                var kickname = input.removeTrailing('.');
                window.autokick[kickname] = new Date().getTime() + time;
                Kick(kickname);
            }
            return true;
        },
 
        '^release': '^free',
        '^resurrect': '^free',
        '^free': function (input, name, isAdmin) {
            if (isAdmin) {
                delete window.autokick[input.removeTrailing('.')];
            }
            return true;
        },
 
        '^resetcooldowns': '^resetall',
        '^resetall': function (input, name, isAdmin) {
            if (isAdmin) {
                window.personal_cooldowns = [];
                Speak('All cooldowns reset!');
            }
            return true;
        },
 
        '^reset': function (input, name, isAdmin) {
            if (isAdmin) {
                window.personal_cooldowns[input.removeTrailing('.')] = [];
                Speak('Cooldowns reset for ' + input.removeTrailing('.') + '!');
            }
            return true;
        },
 
 
        '^silenceleft': function (input, name, isAdmin) {
            if (!window.silence) {
                window.silence = 0;
                Speak('No silence right now.');
            }
            if (window.silence > 0) 
                Speak(parseInt((window.silence - new Date().getTime()) / 60000) + ' minutes remaining.');
            return true;
        },
        '^silence': function (input, name, isAdmin) {
            if (isAdmin) {
                window.silence = new Date().getTime() + (parseInt(input) * 60000);
                Speak('Silencing now. ☆⌒∠(°∀° ) ' + parseInt((window.silence - new Date().getTime()) / 60000) + ' minutes!');
            }
            return true;
        },
        '^(unsilence|stop silence|end silence)': function (input, name, isAdmin) {
            if (isAdmin) {
                window.silence = 0;
                Speak('Stopping silence. ☆⌒∠(・∀・ )');
            }
        },
 
        '^time.?check$': function (input, name, isAdmin){
            d = new Date();
            utc = d.getTime()+ (d.getTimezoneOffset() * 60000);
            nd = new Date(utc + (3600000*9));
            Speak('( ´ ∀`)ﾉ In Japan, it\'s ' + nd.toLocaleString() + ".");
            return true;
        },
 
        //Game help
        '(smith|recipe|dismantl)': '[[Smithing]] ☆',
        '(server|capacity)': '[[Servers]] ☆',
        '(your friends|character|touken danshi|toudan)': '[[Characters]] ☆',
        '(kebiishi|kbc)': '[[Kebiishi]] ☆',
        'drop': '[[Drop List]] ☆',
        //adding nodes doesn't sound feasible since users will have to check the stage's page anyway
        //'^Where do you drop?': '5-3 boss node; 5-4 nodes N, L, and boss.',
        '(troop|armory)': '[[Armory]] ☆',
        'faq': '[[FAQ]] ☆',
        '(rules|polic)': '[[Rules and Policies]] ☆',
 
        '^who are you': '俺は鶴ボット。(・∀・)',
 
        '^who': function (input, name, isAdmin) {
            var users = mainRoom.model.users.models;
            var rand = Math.floor(Math.random() * users.length);
            Speak(users[rand].attributes.name + '.');
            return true;
        },
 
    };
    //End of autoreplies block
 
 
    window.randomreplies = [
        'No.', 'Absolutely not.', 'Never.', 'You wish.',
        'Yes.', 'Definitely.', 'Absolutely.', 'Okay.',
        'Maybe.', 'I dunno.',
        'I can\'t tell you that right now.', 'Try asking again later.', '/me refrains from answering.',
        '/me laughs.', '<3', '/me goes to do horsekeeping.', '/me goes to do fieldwork.',
        '/me goes on an expedition.', '/me ditches this joint.',
        '（笑）', 'wwwww', 'Ok, well.', 'No massacre.', '(stop)',
    ];
 
    window.suicides = {
        'Pandacatch': 'isshin.?furan',
        'Dtx3D': '†┏┛ 墓 ┗┓†',
        'Zettanoia': '一人で死ぬ',
        'Chuusagi': 'O(-<',
            'Chuusagi': 'ribs',
            'Chuusagi': 'somen',
        'Miiandering':'pepe',
        'KireMoon': 'fire',
        '1Epinard': 'trash',
	        'Nullian': 'underwear',
            'Nullian': 'lingerie',
            'Nullian': 'curtains',
            'Nullian': 'underpants',
	'AlteredFoxros': 'nightmare',
            'AlteredFoxros': 'tease',
        'Tsurui-ka': 'eyepatch',
            'Tsurui-ka': 'kill',
    }
 
    //Explodables
    window.whitelist = ['Cloudglo', 'Aryphel', 'Shirotani', 'Timpeni', 'Miyorina', 'Honebami', '1Epinard', 'Shelia Lee', 'Nullian', 'Ookurikara', 'Shokudaikiri Mitsutada', 'Tsurui-ka', 'KusoAruji', 'Yukigitsune', 'TGAVANCE', 'KireMoon'];
 
    window.cooldown_time = new Date().getTime();
    window.personal_cooldowns = [];
    window.players = [];
    window.autokick = [];
    window.silence = 0;
 
    NodeChatDiscussion.prototype.respondToChat = function (chat) {
 
        // If somebody logs in, it's an inline alert
        if (chat.attributes.isInlineAlert && chat.attributes.text.indexOf('has joined the chat.') != -1) {
            var name = chat.attributes.text.replace(' has joined the chat.', '');
            /*
             var chatEntry = new models.ChatEntry({roomId: mainRoom.roomId, name: wgUserName, text: 'Hello, ' + name + '!'});
             mainRoom.socket.send(chatEntry.xport());
             */
 
            var time = new Date().getTime();
            for (var key in window.autokick) {
                if (key == name && window.autokick[key] > time) {
                    Kick(name);
                } else if (window.autokick[key] < time) {
                    delete window.autokick[key];
                }
            }
        }
 
        // All regular chats go here
        if (mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
            var text = chat.attributes.text;
            var name = chat.attributes.name;
 
            // Check if they're a mod or admin and put the stars
            var icon = '';
            for (var i in this.model.users.models) {
                if (this.model.users.models[i].attributes.name == chat.attributes.name) {
                    if (this.model.users.models[i].attributes.isStaff) {
                        icon = ' <img class="stafficon" src="https://images.wikia.nocookie.net/monchbox/images/f/f3/Icon-staff.png">';
                    } else if (this.model.users.models[i].attributes.isModerator) {
                        icon = ' <img class="modicon" src="https://images.wikia.nocookie.net/monchbox/images/6/6b/Icon-chatmod.png">';
                    }
                    break;
                }
            }
            if (text.indexOf('TsuruBot'))
                ;
            if (icon) {
                this.chatUL.children().last().children('.username').html(this.chatUL.children().last().children('.username').html() + icon);
            }
 
            if (icon && chat.attributes.text.match(/^TsuruBot,? silence left/gi) && !(chat.attributes.name == 'Pandacath' || chat.attributes.name == 'Zettanoia'|| chat.attributes.name == 'Dtx3D'|| chat.attributes.name == 'Chuusagi'|| chat.attributes.name == 'Miiandering'))
                window.autoreplies['silence left'].call(this, '', '', '');
            // If silence is activated, just return here
            if (!window.silence)
                window.silence = 0;
            if (new Date().getTime() < window.silence && !(chat.attributes.name == 'Pandacath' || chat.attributes.name == 'Zettanoia'|| chat.attributes.name == 'Dtx3D'|| chat.attributes.name == 'Chuusagi'|| chat.attributes.name == 'Miiandering'))
                return true;
 
 
            // Remove any personal cooldowns that are past 10 minutes old
            if (window.personal_cooldowns[name] === undefined)
                window.personal_cooldowns[name] = [];
            for (var i = 0; i < window.personal_cooldowns[chat.attributes.name].length; i++) {
                if (new Date().getTime() - window.personal_cooldowns[name][i] > 600000)
                    window.personal_cooldowns[name].shift();
                else
                    break;
            }
 
            //If name is in suicides window && non-case-sensitive command is said
            if (window.suicides[name] && text.toLowerCase().indexOf(window.suicides[name]) != -1) {
                Kick(name);
            }
 
            // somen explosion check
            if (name == 'Chuusagi' && /somen/.test(text)) {
                for (var i = 0; i < 3; i++) {
                    var rand = Math.floor(Math.random() * window.whitelist.length);
                    Kick(window.whitelist[rand]);
                }                
                Speak('The cold somen exploded, claiming several lives.');
            }
 
            // Pull the text apart into its pieces
            var regex = /^(TsuruBot),?\s?([a-zA-Z0-9ぁ-ゟ-]*)\s?(.*)/gi;
            var match = regex.exec(text)
            if (!match)
                return true;
            match.splice(0, 2);
 
            // Can only activate 3 times per 10 minutes UNLESS the user is a mod/admin
            if (window.personal_cooldowns[name].length < 60 || icon) {
                for (var keyword in window.autoreplies) {
                    var regexp = new RegExp(keyword, 'gi');
                    if (regexp.test(match[0]) || regexp.test(match.join('')) || regexp.test(match.join(' '))) {
                        while (typeof window.autoreplies[keyword] != 'function') {
                            // If the end point is a string, we won't be finding a function and it'll turn undefined.
                            if (typeof window.autoreplies[keyword] == 'undefined') {
                                window.cooldown_time = new Date().getTime();
                                window.personal_cooldowns[name].push(new Date().getTime());
                                Speak(keyword);
                                return true;
                            }
                            keyword = window.autoreplies[keyword];
                        }
                        window.cooldown_time = new Date().getTime();
                        window.personal_cooldowns[name].push(new Date().getTime());
                        return window.autoreplies[keyword].call(this, match[1], chat.attributes.name, icon);
                    }
                }
                var rand = Math.floor(Math.random() * window.randomreplies.length);
                Speak(window.randomreplies[rand]);
 
                window.cooldown_time = new Date().getTime();
                window.personal_cooldowns[name].push(new Date().getTime());
            }
        }
    }
    mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.respondToChat, mainRoom.viewDiscussion));
 
    NodeChatController.prototype.onOpenPrivateRoom = function (message) {
        var room = new models.OpenPrivateRoom();
        room.mport(message.data);
        var users = room.get('users');
        for (var i = 0; i < users.length; i++) {
            if (users[i] != wgUserName) {
                var blockedUser = this.model.blockedUsers.findByName(users[i]);
                if (typeof (blockedUser) != 'undefined' && blockedUser.get('name') == users[i]) {
                    return;
                }
            }
        }
        if (typeof (this.chats.privates[room.get('roomId')]) == 'undefined') {
            this.baseOpenPrivateRoom(room, false);
        }
        this.chats.privates[room.get('roomId')].init();
        this.chats.privates.model.chats.bind('afteradd', $.proxy(this.chats.privates[room.get('roomId')].viewDiscussion.respondToChat, this.chats.privates[room.get('roomId')].viewDiscussion));
    }
 
    NodeChatController.prototype.inlineAlert = function (text) {
        for (var i in text.split('\n')) {
            this.viewDiscussion.chatUL.append('<li class="inline-alert">' + text.split('\n')[i] + '</li>');
        }
        this.viewDiscussion.scrollToBottom();
    }
 
    function toggleAway() {
        if ($('#ChatHeader .User').hasClass('away') == true) {
            var setStatusCommand = new models.SetStatusCommand({statusState: STATUS_STATE_PRESENT, statusMessage: ''});
            mainRoom.inlineAlert('You are no longer Away.');
            mainRoom.socket.send(setStatusCommand.xport());
        } else {
            var setStatusCommand = new models.SetStatusCommand({statusState: STATUS_STATE_AWAY, statusMessage: ''});
            mainRoom.inlineAlert('You are now Away.');
            mainRoom.socket.send(setStatusCommand.xport());
        }
    }
 
    NodeChatController.prototype.clearWindow = function () {
        this.viewDiscussion.chatUL.html('');
        this.inlineAlert('The window has been cleared.');
    }
 
    function active() { //Returns the NodeChatController for the active window
        if (mainRoom.activeRoom && mainRoom.activeRoom != 'main') {
            return mainRoom.chats.privates[mainRoom.activeRoom];
        }
        else {
            return mainRoom;
        }
    }
 
    String.prototype.removeTrailing = function (char) { //Remove extraneous characters
        var str = this;
        while (str.charAt(0) == char) {
            str = str.substring(1, str.length);
        }
        while (str.charAt(str.length - 1) == char) {
            str = str.substring(0, str.length - 1);
        }
        return str;
    }
 
    function Speak(text) {
        var chatEntry = new models.ChatEntry({roomId: mainRoom.roomId, name: wgUserName, text: text});
        mainRoom.socket.send(chatEntry.xport());
    }
 
    function Kick(name) {
        if (mainRoom.model.users.findByName(name) === undefined && name.split('').pop() == '.') {
            name = name.split('');
            name.pop();
            name = name.join('');
        }
        var kickCommand = new models.KickCommand({userToKick: name});
        mainRoom.socket.send(kickCommand.xport());
    }
 
    $(function () {
        if (!importScriptURI) {
            function importScriptURI(a) {
                var b = document.createElement("script");
                b.setAttribute("src", a);
                b.setAttribute("type", "text/javascript");
                document.getElementsByTagName("head")[0].appendChild(b);
                return b
            }}
        $('#Write').append('<a class="wikia-button" href="javascript:toggleAway()" style="position:absolute; right:0; top:0;">Toggle Away Status</a><a class="wikia-button" href="javascript:active().clearWindow()" style="position:absolute; right:0; bottom:2px;">Clear window</a>');
 
        $('head').append('<style type="text/css">\n.stafficon {\n\tmargin-bottom:-4px;\n\twidth:14px;\n\theight:14px;\n}\n.modicon {\n\tmargin-bottom:-3px;\n\twidth:14px;\n\theight:14px;\n}\n.UserStatsMenu {\n\tcolor:#000;\n}\n.Write [name="message"] {\n\twidth:93%;\n}\n.inline-alert span {\n\tcolor:#006CB0;\n\tcursor:pointer;\n}\n.inline-alert span:hover {\n\ttext-decoration:underline;\n}\n#pingspan {\n\tposition:absolute;\n\tz-index:5;\n\ttop:23px;\n\tmargin-left:15px;\n\tfont-size:15px;\n\tfont-weight:normal;\n\tline-height:15px;\n}\n#pings {\n\tresize:none;\n\tmargin-left:0;\n\tfont-size:12px;\n\theight:100px;\n\tdisplay:block;\n}\n#pingspan div span {\n\tfont-size:55%;\n}\n#ChatHeader {\n\tz-index:9999;\n}\n#ChatHeader {\n\tz-index:9999;\n}\n.message.ping {\n\tcolor:red;\n}\n</style>');
 
        $(window).unbind('mousemove').unbind('focus').unbind('keypress');
    });
} else {
    $(function () {
        var a = document.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
                a[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    OpenChatWindow();
                });
                a[i].removeAttribute('data-canonical');
            }
        }
        if (document.body.className.indexOf('skin-oasis') != -1) {
            window.chatcheck = setInterval('ChatCheck()', 200);
        }
    });
 
    function ChatCheck() {
        if ($('.chat-join button').length != 0) {
            $('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()">' + $('.chat-join button').html() + '</a>');
            clearInterval(window.chatcheck);
        }
    }
 
    function OpenChatWindow() {
        window.chatwindow = window.open('/wiki/Special:Chat?useskin=wikia', 'chat');
        window.chatwindow.onload = function () {
            window.chatwindow.importScriptPage('User:' + wgUserName + '/global.js', 'c');
            window.chatwindow.importScript('User:' + wgUserName + '/wikia.js');
        }
    }
}