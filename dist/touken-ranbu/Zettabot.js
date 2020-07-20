/* 
 * CODE BY MONCHOMAN45 - Slight modifications by Zettanoia
 * ChatHacks.js, by Monchoman45.
 * Version 7.0
 * 
 * Features:
 *   Ability to clear your chat window
 *   A host of slash commands
 *   Inline alerts every time your away status changes
 *   Icons next to messages by staff and chat mods in the room
 *   Pings when someone mentions your name or any other specified phrases
 *
 * Modifications by Zettanoia:
 *   More slash commands
 *   Auto-replies (akin to TsuruBot)
 *   Autokick words (newbie-friendly)
 *   Autorespond words without need of zettabot
 *   Ability to turn off ping sound and silence zettabot via slash command
 */

if(wgCanonicalSpecialPageName == 'Chat') {
	window.autoreplies = {
		'^!$': '☆⌒∠(°∀° )?',
		'だよねっ！☆': 'だよねっ！☆',
		'^$': '(°∀° )?',
		'^hi$': 'ヾ(°∀° )',
		'^hello': 'ヾ(°∀° )',
		'^(tube|corndog.?hi)': 'ヾ(°∀° 」∠ )_',
		'^shrug': function (input,name) {
			var list = ['┐(\'～`,)┌', '┐(・ з ・)┌'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		'^(tako|taco)': '┐(・ з ・)┌',
		'^(homo|fujo)': '┌(┌^o^)┐',
		'^tears': 'ヽ(；▽；)ノ',
		'^(shishiou|cco|gao)': '(｢･ω･)｢が～おー',
		'^salt': '(salt) (ಠ益ಠ) (salt)',
		'^table.?flip': '(╯°□°）╯︵ ┻━┻',
		'^table.?back': '┬──┬ ﻿ノ( ゜-゜ノ)',
		'^sparkle': '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧*:･ﾟ✧',
		'^ohayou': 'おはよう。',
		'^おはよう': 'ohayou',
		'^(good.?night|oyasumi)': 'おやすみ。 (:з[＿＿＿]',
		'^(bye.?bye|bye)': 'じゃまたね！　ヾ(°∀° )',
		'^good.?bye': 'さようなら。',
		'^(okaeri|おかえり)': 'ただいま。 ヾ(°∀° )',
		'^(tadaima|ただいま)': 'おかえり。 ヾ(°∀° )',
		'(help|stupid question)': function (input,name) {
			var list = ['┐(\'～`,)┌', '[[FAQ]] ☆', 'The [[FAQ]] is right here.', 'Please clear your cache and cookies and redo the proxy step.'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		'^(corndog|_(:з」∠)_)': '_(:з」∠)_',
		'^cornsob': '_(；- ；」∠)_',
		'^seduce': '_(┐「ε: )_',
		'^(roll|goron|flail|slap|smack)': 'ヾ(:зﾉｼヾ)ﾉ゛',
		'^(baby cornseal|small cornseal)': '(:зっ )っ',
		'^cornseal': '(:3　っ　)つ',
		'^(back|exorcis|crawl|limbo)': '┏( .-. ┏ ) ┓',
		'(yamiochi.?ossan|dance|jazz)': 'ᕕ( ､ﾝ､)ᕗ',
		'maraca': '₍₍(૭ ᐕ)૭⁾⁾',
		'mochi': '(ﾉ)\'∨\'(ヾ)ﾓﾁﾓﾁ',
		'(ossan|osoi)': '_(」∠ ､ﾝ､)_',
		'lies? down': '읏',
		'^(pls|kuri)$': '눈_눈',
		'yamiochi': 'ᕕ(ᐛ)ᕗ',
		'ganbare': '(ง゜ω゜)ง',
		'(yay|yatta|celebrate)': 'ヽ(∀ﾟ )人(ﾟ∀ﾟ)人( ﾟ∀)ノ',
		'trash trio': 'ヽ(ᐖ )人(ᐕ)人(ᐛ)ノ',
		'(grab|hands)': 'ლ(́◉◞౪◟◉‵ლ)',
		'(dead|rip)': '†┏┛ 墓 ┗┓†',
		'(damage|dmg)': '【重傷】',
		'(stake|steak)': 'O|--T--<',
		'(spikes|iron.?maiden)': '\\/\\/\\/\\/\\/\\/\\/\\/\nO|-TTTT-<\n/\\/\\/\\/\\/\\/\\/\\/\\',
		'(isshin.?furan|trash)': '(isshinfuran)',
		'(bless|holy.?water|rngesus|cleanse)': '(cha) (rngesus) (cha)',
		'^stop': '(STOP)',
		'^(heshi|shumei)': '(shu) (mei) (to) (a) (ra) (ba) (heshi)',
		'^(rare.?4|r4|rarity-4)': '(ichi) (cha) (odoroita) (pray)',
		'^一人で戦い': '一人で死ぬ。',
		'Money in the bank': 'Pimpin\' ain\'t easy.',
		'(dark chocolate)': function (input, name) {
			var response = '(nyan) ?';
			if (name == 'Pandacath')
				response = '(stop)';
			Speak(response);
			return true;
		},
		'^(no massacre|alouette|ok,?.?well|develop)': function (input, name) {
			var list = ['No massacre', 'Alouette', 'Ok, well.', 'This is developed by DMM, Kadokawa Games, Alouette Games and Nitroplus.'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		'(fight|faito)': function (input, name) {
			var list = ['(งಠ_ಠ)ง', '(ง °∀°)ง', '(ง✿◠‿◠)ง', '(ง ಠ益ಠ)ง', '(ง＾o＾)ง', '┌(ง^o^)ง┐', '(ง ᐛ)ง', '(ง゜ω゜)ง', '(ง ､ﾝ､)ง', '(ง눈_눈)ง', 'ᕦ(눈o눈'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},

		'^(mad freedom|intense freedom|screech)': '\＜￣｀ヽ、　　　　　　　／￣＞   \n		　ゝ、　　＼　／⌒ヽ,ノ 　/´   \n		　　　ゝ、　`（ ´ಠ益ಠ)／  \n		　　 　　\>　 　 　,ノ 　   \n		　　　　　∠_,,,/´”',
		'^(freedom|murica)': '\＜￣｀ヽ、　　　　　　　／￣＞   \n		　ゝ、　　＼　／⌒ヽ,ノ 　/´   \n		　　　ゝ、　`（ ´･ω･)／  \n		　　 　　\>　 　 　,ノ 　   \n		　　　　　∠_,,,/´”',
		// source: https://twitter.com/MOUZ__XC/status/627317444562911232

		'(muscle|cornabs|^abs$)': ', _＿\n 　 / )))　　　 ＿\n `／ イ~　　　(((ヽ\n (　 ﾉ　　　　 ￣Ｙ＼\n |　(＼　∧＿∧　｜　)\n ヽ　ヽ`(´･ω･)／ノ/\n 　＼ |　⌒Ｙ⌒　/ /\n 　 ｜ヽ　 ｜　 ﾉ／\n 　　＼トー仝ーイ\n 　　 ｜ ミ土彡/\n 　　　)　　　｜',
		// http://piratepad.net/48Inj2fqxh

		'who are you': function (input, name) {
			var list = ['私はごみです。(・∀・)', 'I\'m zettabot! A rarity-3 scrub.'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		'^where do you (live|reside)': 'ゴミ箱で住んでいます。(・∀・)',

		'(who is|who\'?s) your (husband|husbando)': 'Kuri-chan (nyan)',
		'(who is|who\'?s) your (wife|waifu)': '[[User:Pandacath|Pandacath]] w',
		'(who is|who\'?s) my (husband|husbando)': function (input, name) {
			var list = ['Nobody w', 'You have one?', '(kakaka)', '(笑)', 'w'];
			if (name == 'Pandacath')
				list = ['Me? <3', 'Me? w'];
			if (name == 'Dtx3D')
				list = ['Hasebe.', 'Heshi.'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		'(who is|who\'?s) my (waifu|wife)': function (input, name) {
			var list = ['Nobody w', 'You have one?', 'Mitsutada is everyone\'s waifu w', '(笑)', 'w'];
			if (name == 'Pandacath')
				list = ['Mitsutada <3', 'Mitsutada w'];
			if (name == 'Dtx3D')
				list = ['Hasebe.', 'Heshi.'];
			if (name == 'Zettanoia')
				list = ['[[User:Pandacath|Pandacath]]? w'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		/* doesnt work atm
		'\'s (waifu|wife)': function (input, name) { // doesn't require specific user to say it
			var text = chat.attributes.text;
			var list = ['Nobody w', 'They have one?', 'w'];
			if (text.toLowerCase().indexOf(panda) != -1)
				list = ['Mitsutada <3', 'Mitsutada w'];
			if (text.toLowerCase().indexOf(dtx) != -1)
				list = ['Hasebe.', 'Heshi.'];
			if (text.toLowerCase().indexOf(zetta) != -1)
				list = ['[[User:Pandacath|Pandacath]]'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},

		'\'s (husbando|husband)': function (input, name) { // doesn't require specific user to say it
			var text = chat.attributes.text;
			var list = ['Nobody w', 'They have one?', 'w'];
			if (text.toLowerCase().indexOf(panda) != -1)
				list = ['[[User:Zettanoia|Me]]! <3'];
			if (text.toLowerCase().indexOf(dtx) != -1)
				list = ['Hasebe.', 'Heshi.'];
			if (text.toLowerCase().indexOf(zetta) != -1)
				list = ['Kuri-chan (nyan)'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},
		*/

		'^who': function (input, name) {
			var users = mainRoom.model.users.models;
			var rand = Math.floor(Math.random() * users.length);
			Speak(users[rand].attributes.name + '.');
			return true;
		},
		'(when)': function (input, name) {
			var list = ['Soon™', 'Never™'];
			var rand = Math.floor(Math.random() * list.length);
			Speak(list[rand]);
			return true;
		},

		//Game help
		'(smith|recipe|dismantl)': '[[Smithing]] ☆',
		'(server)': '[[Servers]] ☆',
		'(character|touken danshi|toudan)': '[[Characters]] ☆',
		'(kebiishi|kbc)': '[[Kebiishi]] ☆',
		'drop': '[[Drop List]] ☆',
		'(troop|armory)': '[[Armory]] ☆',
		'faq': '[[FAQ]] ☆',
		'(rules|polic)': '[[Rules and Policies]] ☆',


		'^silence$': function (input, name, isAdmin) {
			if (isAdmin) {
				Speak('Silencing now in the name of RNGesus.');
				window.silence = 1;
				return true;
			}
		},
		'^(unsilence|stop silence|end silence)': function (input, name, isAdmin) {
			if (isAdmin) {
				window.silence = 0;
				Speak('Stopping silence. ☆⌒∠(°∀° )');
				return true;
			}
		},

	};
		//End of autoreplies block

	window.randomreplies = [
		'No.', 'Obviously not.', 'You wish.', 'As if.', 'いやだ。', 
		'慣れ合うつもりはない。', '(nyan) にゃれあうつもりはにゃい', 'I don\'t plan to get along with you.',
		'I decide what I do.', 'I don\'t need your orders.', 'Hmph.', 'I don\'t really care.',
		'I don\'t have anything to say.', 'Leave me alone.', 'どうでもいいな。', '俺一人で十分だ。',
		'Yes.', 'Naturally.', 'Obviously.', 'Of course.',
		'[[FAQ]] ☆', 'Please clear your cache and cookies and redo the proxy step.',
		'w', '(www)',
		'┐(\'～`,)┌', '_(:з」∠)_', '_(」∠ ､ﾝ､)_', '눈_눈'
	];

	window.family = [
		'Pandacath', 'Dtx3D', 'Chuusagi', 'Miiandering',
		'1Epinard', 'Kit.ann', 'Miyorina', 'Shelia Lee', 'Yukigitsune',
		'Aryphel', 'Midorimakuns', 'Nullian', 'Timpeni', 'Tsurui-ka',
		'Egbert00', 'Honebami', 'Saniworm', 'Shinashi', 'TsukiNue',
		'BirbSage', 'Jeftai', 'Micrll', 'Divest'
	];

	window.suicides = {
		'(rngesuss)': 'Let us not use the name of our lord and savior in vain.',
		'kinky': '(stop)',
	}

	window.singlereply = { //does not require the use of 'zettabot' to reply
		'(sleep)': 'もう寝よう', // source: https://twitter.com/halogen97F/status/615213130147196928
		'opens ribs': 'closes ribs',
	}
	
	window.silence = 0;
	window.pinging = 1;

	window.hasFocus = true;
	window.dinged = false;
	window.ding = 0;
	window.titleorig = document.title;
	function Unding() { //for fixing the title after you've been dinged
		document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		clearInterval(window.ding);
		window.dinged = false;
	}
	$(window).bind('focus', Unding);
	$(window).bind('focus', function() {window.hasFocus = true;});
	$(window).bind('blur', function() {window.hasFocus = false;});

	//Function for adding messages to the window
	NodeChatDiscussion.prototype.iconPing = function (chat) {
	
		// If somebody logs in, it's an inline alert
		if (chat.attributes.isInlineAlert && chat.attributes.text.indexOf('has returned to the citadel.') != -1) {
			var name = chat.attributes.text.replace('has returned to the citadel.', '');
			/*
			var chatEntry = new models.ChatEntry({roomId: mainRoom.roomId, name: wgUserName, text: 'Hello, ' + name + '!'});
			mainRoom.socket.send(chatEntry.xport());
			*/
		}

		// All regular chats go here
		if (mainRoom.isInitialized && !chat.attributes.isInlineAlert) {
			var text = chat.attributes.text;
			var name = chat.attributes.name;

			window.dinged = true;
			//resolve HTML
			var pings = document.getElementById('pings').value.removeTrailing('\n').split('\n');
			for(var i = 0; i < pings.length; i++) {
				if(text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion) {
					if(!window.hasFocus) { //Only annoy people if the window isn't focused
						if (window.pinging == 1) { //only make sound if pinging is on
							document.getElementById('sound').innerHTML = '<audio src="https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg" autoplay=""></audio>';
							if(!window.dinged) {window.ding = setInterval('FlashTitle()', 500);}
						}
					}
					this.scrollToBottom();
					if(this == mainRoom.viewDiscussion) {
						var ref = text.toLowerCase().indexOf(pings[i].toLowerCase());
						var phrase = text.slice(ref, ref + pings[i].length);
						this.chatUL.children().last().children('.message').addClass('ping');
					}
					break;
				}
			}

			for (var keyword in window.suicides) {
				if (name != 'Zettanoia' && text.toLowerCase().indexOf(keyword) != -1) { //if text contains a suicide word
					for (var i = 0; i < window.family.length; i++) {
						if (window.family[i] == name) {
							Kick(name);
						}
					}
					Speak(window.suicides[keyword]);
				}
			}

			for (var keyword in window.singlereply) {
				if (name != 'Zettanoia' && text.toLowerCase().indexOf(keyword) != -1) { //if text contains a singlereply word
					Speak(window.singlereply[keyword]);
				}
			}

			// Pull the text apart into its pieces
			var regex = /^(ZettaBot|tablot|gznobot),?\s?([a-zA-Z0-9ぁ-ゟ-]*)\s?(.*)/gi;
			var match = regex.exec(text)
			if (!match)
				return true;
			match.splice(0, 2);

			// Activates as long as its not silenced
			if (window.silence == 0 || name == 'Zettanoia' || name == 'Pandacath') {
				for (var keyword in window.autoreplies) {
					var regexp = new RegExp(keyword, 'gi');
					if (regexp.test(match[0]) || regexp.test(match.join('')) || regexp.test(match.join(' '))) {
						while (typeof window.autoreplies[keyword] != 'function') {
							// If the end point is a string, we won't be finding a function and it'll turn undefined.
							if (typeof window.autoreplies[keyword] == 'undefined') {
								Speak(keyword);
								return true;
							}
							keyword = window.autoreplies[keyword];
						}
						return window.autoreplies[keyword].call(this, match[1], chat.attributes.name, icon);
					}
				}
				var rand = Math.floor(Math.random() * window.randomreplies.length);
				Speak(window.randomreplies[rand]);
			} //end response

		} //end regular chat


		var icon = '';
		for(var i in this.model.users.models) {
			if(this.model.users.models[i].attributes.name == chat.attributes.name) {
				if(this.model.users.models[i].attributes.isStaff) {
					icon = ' <img class="stafficon" src="https://images.wikia.nocookie.net/monchbox/images/f/f3/Icon-staff.png">';
				}
				else if(this.model.users.models[i].attributes.isModerator) {
					icon = ' <img class="modicon" src="https://images.wikia.nocookie.net/monchbox/images/6/6b/Icon-chatmod.png">';
				}
				break;
			}
		}
		if(icon) {this.chatUL.children().last().children('.username').html(this.chatUL.children().last().children('.username').html() + icon);}
		

		//Kill emoticons
		this.chatUL.children().last().children('.message img').each(function() {this.outerHTML = '<span onclick="this.outerHTML = decodeURIComponent(\'' + encodeURIComponent(this.outerHTML) + '\');" style="color:blue; cursor:pointer;" title="' + i18n['emote'] + '">' + this.title + '</span>';});
	}
	mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.iconPing, mainRoom.viewDiscussion));
	
	//Away status functions
	NodeChatController.prototype.setAway = function (msg){
		if(!msg) {var msg = '';}
		$().log("Attempting to go away with message: " + msg);
		var setStatusCommand = new models.SetStatusCommand({
			statusState: STATUS_STATE_AWAY,
			statusMessage: msg
		});
		this.inlineAlert(i18n['away']);
		this.socket.send(setStatusCommand.xport());
	}
	NodeChatController.prototype.setBack = function (){
		if( !this.comingBackFromAway ) { // if we have sent this command (but just haven't finished coming back yet), don't keep spamming the server w/this command
			$().log("Telling the server that I'm back.");
			this.comingBackFromAway = true;
			var setStatusCommand = new models.SetStatusCommand({
				statusState: STATUS_STATE_PRESENT,
				statusMessage: ''
			});
			this.inlineAlert(i18n['back']);
			this.socket.send(setStatusCommand.xport());
		}
	}
		
	//Send message function
	NodeChatController.prototype.sendMessage = function (event) {
		if(!this.active) {
			return true;
		}
		
		if (event.which == 13 && !event.shiftKey) {
			event.preventDefault();
			mainRoom.resetActivityTimer();
			var inputField = this.viewDiscussion.getTextInput();
			var send = Preparse.call(this, inputField.val());
	
			if (inputField.val() && send) {
				var chatEntry = new models.ChatEntry({roomId: this.roomId, name: wgUserName, text: inputField.val()});
				if( this.isPrivate == true ) { //is prive
					if( this.afterInitQueue.length < 1 || this.model.users.length < 2 ){
						this.mainController.socket.send( this.model.privateRoom.xport() );
					}
					if( !this.isInitialized  ) {
						this.afterInitQueue.push(chatEntry.xport());
						//temp chat entry in case of slow connection time
						chatEntry.set({temp : true, avatarSrc: wgAvatarUrl });  
						this.model.chats.add(chatEntry);
					} else {
						this.socket.send(chatEntry.xport());
					}
				} else {
					this.socket.send(chatEntry.xport());
				}
				
				event.preventDefault();
			}
			inputField.val('');
			$().log('submitting form');
			inputField.focus();
		}
	}
	mainRoom.viewDiscussion.unbind('sendMessage');
	mainRoom.viewDiscussion.bind('sendMessage', $.proxy(mainRoom.sendMessage, mainRoom));

	//Functions that have to be changed for interwiki chat
	NodeChatController.prototype.openPrivateRoom = function(users) {
		users.push( wgUserName );
		$.ajax({
			type: 'POST',
			url: wgScript + '?action=ajax&rs=ChatAjax&method=getPrivateRoomID',
			data: {
				users : users.join(',')
			},
			success: $.proxy(function(data) {
				$().log("Attempting create private room with users " + users.join(','));	
				var data = new models.OpenPrivateRoom({roomId: data.id, users: users});
				this.baseOpenPrivateRoom(data, true);
				this.showRoom(data.get('roomId') );
				this.chats.privates[ data.get('roomId') ].isPrivate = true;
				this.chats.privates[ data.get('roomId') ].init();
				//this.socket.send(data.xport());
			}, this)
		});
		this.viewUsers.hideMenu();
	}

	NodeRoomController.prototype.onJoin = function(message) {
		var joinedUser = new models.User();
		joinedUser.mport(message.joinData);

		var connectedUser = this.model.users.findByName(joinedUser.get('name'));
		
		if(typeof connectedUser == "undefined"){
			this.model.users.add(joinedUser);
			this.fire('afterJoin', joinedUser);
			
			//TODO: move it to other class
			if( !this.isPrivate ) {
				// Create the inline-alert (on client side so that we only display it if the user actually IS new to the room and not just disconnecting/reconnecting).
				var newChatEntry = new models.InlineAlert({text: $.msg('chat-user-joined', [joinedUser.get('name')] ) });
				this.model.chats.add(newChatEntry);				
			}
			
			this.disableRoom(joinedUser, false);
		} else {
			// The user is already in the room... just update them (in case they have changed).
			this.model.users.remove(connectedUser);
			this.model.users.add(joinedUser);
		}		
	}
	NodeRoomController.prototype.onPart = function(message) {
		var partedUser = new models.User();
		partedUser.mport(message.data);
		
		var connectedUser = this.model.users.findByName(partedUser.get('name'));

		if(typeof connectedUser != "undefined"){

			//TODO: move it to other class
			if( !this.isPrivate ) {
				var newChatEntry = new models.InlineAlert({text: $.msg('chat-user-parted', [connectedUser.get('name')] ) });
				this.model.chats.add(newChatEntry);
			}
			
			this.model.users.remove(connectedUser);
			this.disableRoom(connectedUser, true);
		}		
	}
	NodeRoomController.prototype.disableRoom = function(user, flag) {
		if( this.isPrivate == false ) {	
			//TODO: fix it for multiuser priv chat
			var privateUser =  this.model.privateUsers.findByName(user.get('name'));
			
			if(typeof privateUser != "undefined"){
				var roomId = privateUser.get('roomId');
				if( typeof( this.chats.privates[roomId] ) != "undefined" ){
					this.chats.privates[roomId].model.room.set({ 
						'blockedMessageInput': flag
					});
				}
				//try to reconnect
				if(flag === false && this.chats.privates[roomId].model.chats.length > 0) {
					this.socket.send( this.chats.privates[roomId].model.privateRoom.xport() );
				}
			}
		}
	}

	NodeChatController.prototype.showRoom = function(roomId) {
		$().log(roomId);
		if( this.activeRoom == roomId ) {
			return false;
		}
		
		this.activeRoom = roomId;
		if(roomId == 'main') {
			this.chats.main.setActive(true);
		} else {
			this.chats.main.setActive(false);
		}
		
		for(var i in this.chats.privates) {
			if(i == roomId) {
				this.chats.privates[i].setActive(true);
			} else {
				this.chats.privates[i].setActive(false);
			}
		}

		for(var i in this.chats.opens) {
			if(i == roomId) {
				this.chats.opens[i].setActive(true);
			} else {
				this.chats.opens[i].setActive(false);
			}
		}
		return true;
	}
	
	NodeChatController.prototype.openPublicRoom = function(roomId) {
		this.chats.opens[roomId] = new NodeRoomController(roomId);
		this.chats.opens[roomId].mainController = this; //set main controller for this chat room
		this.showRoom(roomId);
		this.chats.opens[roomId].init();
	}
	
	/*//For interwiki chatting, a merger of NodeRoomController's private management functions, and NodeChatController's public management functions.
	NodeInterwikiController = $.createClass(NodeRoomController, {
		constructor: function (roomId) {
			NodeInterwikiController.superclass.constructor.apply(this,arguments);

			this.socket.bind('updateUser',  $.proxy(this.onUpdateUser, this)); //Check

			this.bind('afterJoin', $.proxy(this.afterJoin, this));
			this.viewUsers = new NodeChatUsers({model: this.model, el: $('body')});
		
			this.viewUsers.bind('showPrivateMessage', $.proxy(this.privateMessage, this) );
			this.viewUsers.bind('kickBan', $.proxy(this.kickBan, this) );
			this.viewUsers.bind('giveChatMod', $.proxy(this.giveChatMod, this) );
			
			this.viewUsers.bind('blockPrivateMessage', $.proxy(this.blockPrivate, this) ); //Check
			this.viewUsers.bind('allowPrivateMessage', $.proxy(this.allowPrivate, this) ); //Check
		
			this.viewUsers.bind('mainListClick', $.proxy(this.mainListClick, this) ); //Check
			this.viewUsers.bind('privateListClick', $.proxy(this.privateListClick, this) ); //Check

			this.viewUsers.bind('clickAnchor', $.proxy(this.clickAnchor, this) ); //Check

			this.viewUsers.render();
			this.viewDiscussion.show();

			return this;
		}
		
		
	});*/

	NodeChatController.prototype.inlineAlert = function(text) {
		for(var i in text.split('\n')) {
			this.viewDiscussion.chatUL.append('<li class="inline-alert">' + text.split('\n')[i] + '</li>');
		}
		this.viewDiscussion.scrollToBottom();
	}

	function FlashTitle() {
		if(document.getElementsByTagName('title')[0].innerHTML == window.titleorig) {
			document.getElementsByTagName('title')[0].innerHTML = i18n['activity'].replace(/\$1/g, wgSiteName);
		}
		else {
			document.getElementsByTagName('title')[0].innerHTML = window.titleorig;
		}
	}
		

	function Preparse(input) { //Parse slash commands.
		if(input.charAt(0) == '/') {
			var com = input.split(' ');
			com[0] = com[0].substring(1, com[0].length);
			var ref = '.' + com[0].toLowerCase();
			if(window.commands[com[0].toLowerCase()] == undefined) {return true;}
			while(typeof eval('window.commands' + ref) != 'function') {
				if(typeof eval('window.commands' + ref) == 'string') {
					ref = ref.substring(0, ref.lastIndexOf('.')) + '.' + eval('window.commands' + ref).toLowerCase();
					continue;
				}
				if(typeof eval('window.commands' + ref) == 'object') {
					if(!com[1]) {
						if(typeof eval('window.commands' + ref).default == 'function') {eval('window.commands' + ref).default.call(this, '', chat);}
						return true;
					}
					if(eval('window.commands' + ref)[com[1].toLowerCase()]) {ref += '.' + com[1].toLowerCase();}
					else if(eval('window.commands' + ref).default) {
						ref += '.default';
						if(typeof eval('window.commands' + ref) == 'function') {break;}
					}
					else {return true;}
					com = com.slice(1, com.length);
					continue;
				}
				if(typeof eval('window.commands' + ref) == 'undefined') {return true;}
			}
			com = com.slice(1, com.length);
			return eval('window.commands' + ref).call(this, com.join(' '), input);
		}
		else {return true;}
	}
	
	window.commands = {
		'away': 'afk',
		'afk': function(com, text) {
			if($('#ChatHeader .User').hasClass('away') == false) {toggleAway();} //if you're away, hitting enter has already sent you back
		},
		'clear': function(com, text) { //Clear the active chat window
			this.clearWindow();
		},
		// Start Custom Functions
		'test1': function(com, text) { //Indicates which version of ChatHacksTest is being used
			$('#Write [name="message"]').val('私はzettabotです！ Please precede your command with the word zettabot');
			return true;
		},
		'nani': function(com, text) { //Writes (°∀° )?
			$('#Write [name="message"]').val('(°∀° )?');
			return true;
		},
		'hi': 'hello',
		'hello': function(com, text) { //Writes ヾ(°∀° )
			$('#Write [name="message"]').val('ヾ(°∀° )');
			return true;
		},
		'night': 'oyasumi',
		'oyasumi': function(com, text) { //Writes おやすみ。 (:з[＿＿＿]
			$('#Write [name="message"]').val('おやすみ。 (:з[＿＿＿]');
			return true;
		},
		'corndoghi': 'tube',
		'tube': function(com, text) { //Writes ヾ(°∀° )
			$('#Write [name="message"]').val('ヾ(°∀° 」∠ )_');
			return true;
		},
		'shrug': function(com, text) { //Writes ┐('～`；)┌
			$('#Write [name="message"]').val('┐(\'～`,)┌');
			return true;
		},
		'homoo': function(com, text) { //Writes ┌(┌^o^)┐
			$('#Write [name="message"]').val('┌(┌\^o\^)┐');
			return true;
		},
		'tears': function(com, text) { //Writes ヽ(；▽；)ノ
			$('#Write [name="message"]').val('ヽ(；▽；)ノ');
			return true;
		},
		'ouo': function(com, text) { //Writes ʘuʘ
			$('#Write [name="message"]').val('ʘ‿ʘ');
			return true;
		},
		'cco': 'gao',
		'gao': function(com, text) { //Writes (｢･ω･)｢が～おー
			$('#Write [name="message"]').val('(｢･ω･)｢が～おー');
			return true;
		},
		'corndog': function(com, text) { //Writes _(:з」∠)_
			$('#Write [name="message"]').val('_(:з」∠)_');
			return true;
		},
		'cornsob': function(com, text) { //Writes _(；- ；」∠)_
			$('#Write [name="message"]').val('_(；- ；」∠)_');
			return true;
		},
		'seduce': function(com, text) { //Writes _(┐「ε: )_
			$('#Write [name="message"]').val('_(┐「ε: )_');
			return true;
		},
		'rip': function(com, text) { //Writes †┏┛ 墓 ┗┓†
			$('#Write [name="message"]').val('†┏┛ 墓 ┗┓†');
			return true;
		},
		'dmg': function(com, text) { //Writes 【重傷】
			$('#Write [name="message"]').val('【重傷】');
			return true;
		},
		'steak': 'stake',
		'stake': function(com, text) { //Writes O|--T--<
			$('#Write [name="message"]').val('O|--T--<');
			return true;
		},
		'yamiochi': function(com, text) { //Writes ᕕ(ᐛ)ᕗ
			$('#Write [name="message"]').val('ᕕ(ᐛ)ᕗ');
			return true;
		},
		'ganbare': function(com, text) { //Writes (ง゜ω゜)ง
			$('#Write [name="message"]').val('(ง゜ω゜)ง');
			return true;
		},
		'osoi': 'ossan',
		'ossan': function(com, text) { //Writes _(」∠ ､ﾝ､)_
			$('#Write [name="message"]').val('_(」∠ ､ﾝ､)_');
			return true;
		},
		'nareau': function(com, text) { //Writes 慣れ合うつもりはない
			$('#Write [name="message"]').val('慣れ合うつもりはない');
			return true;
		},
		'hitori': function(com, text) { //Writes 一人で戦い、一人で死ぬ
			$('#Write [name="message"]').val('一人で戦い、一人で死ぬ');
			return true;
		},
		'tatakai': function(com, text) { //Writes 一人で戦い
			$('#Write [name="message"]').val('一人で戦い');
			return true;
		},
		'shinu': function(com, text) { //Writes 一人で死ぬ
			$('#Write [name="message"]').val('一人で死ぬ');
			return true;
		},
		'dayone': function(com, text) { //Writes だよねっ！☆
			$('#Write [name="message"]').val('だよねっ！☆');
			return true;
		},
		'futari': function(com, text) { //Writes (firegif) (kuri) (ccp) (firegif)
			$('#Write [name="message"]').val('(firegif) (kuri) (ccp) (firegif)');
			return true;
		},
		'holywater': function(com, text) { //Writes (cha) (rngesus) (cha)
			$('#Write [name="message"]').val('(cha) (rngesus) (cha)');
			return true;
		},
		'shumei': function(com, text) { //shumei to araba
			$('#Write [name="message"]').val('(shu) (mei) (to) (a) (ra) (ba) (heshi)');
			return true;
		},
		'r4': function(com, text) { //rare 4 tachis
			$('#Write [name="message"]').val('(ichi) (cha) (odoroita) (pray)');
			return true;
		},
		'develop': function(com, text) { //This is developed by DMM, Kadokawa Games, Alouette Games and Nitroplus.
			$('#Write [name="message"]').val('This is developed by DMM, Kadokawa Games, Alouette Games and Nitroplus.');
			return true;
		},
		'stop': function(com, text) { //(stop) (stop) (stop)
			$('#Write [name="message"]').val('(stop) (stop) (stop)');
			return true;
		},
		'faq': function(com, text) {
			$('#Write [name="message"]').val('[[FAQ]] ☆');
			return true;
		},
		'pingswitch': function(com, text) { //Toggle pinging noise
			if (window.pinging == 1) {
				window.pinging = 0; //turn off pinging
				$('#Write [name="message"]').val('_(」∠ ､ﾝ､)_');
			} else { 
				window.pinging = 1; //turn on pinging
				$('#Write [name="message"]').val('_(:з」∠)_');
			};
			
			return true;
		},
		'silence': function(com, text) { //Toggle zettabot on or off
			if (window.silence == 0) {
				window.silence = 1;
				$('#Write [name="message"]').val('...こっくり...');
			} else { 
				window.silence = 0;
				$('#Write [name="message"]').val('あ、寝ちゃった！ ☆⌒(°∀° )');
			};
			
			return true;
		},
		// End Custom Functions
		'kick': 'kickban',
		'ban': 'kickban',
		'kickban': function(com, text) { //Kickban a user
			if(com) {
				var mod = new models.KickBanCommand({userToBan: com});
				this.socket.send(mod.xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unban': function(com, text) { //Unban a user
			if(com) {
				api.newQuery(POST, 'action=userrights&user=' + com + '&remove=bannedfromchat', function(result) {
					if(result.userrights.removed[0] == 'bannedfromchat') {
						this.inlineAlert(i18n['unbanned'].replace(/\$1/g, com));
					}
					else {
						this.inlineAlert(i18n['notbanned'].replace(/\$1/g, com));
					}
				});
				api.send(0, true);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'mod': function(com, text) { //Make a user a mod
			if(com) {
				var giveChatModCommand = new models.GiveChatModCommand({userToPromote: com});
					this.socket.send(giveChatModCommand.xport());
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'demod': function(com, text) { //Remove a user's mod right
			if(com) {
				api.newQuery(POST, 'action=userrights&user=' + com + '&remove=chatmoderator', function(result) {
					if(result.userrights.removed[0] == 'chatmoderator') {
						this.inlineAlert(i18n['demodded'].replace(/\$1/g, com));
					}
					else {
						this.inlineAlert(i18n['notmod'].replace(/\$1/g, com));
					}
				});
				api.send(0, true);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'block': function(com, text) { //Block a user from private chatting you
			if(com) {this.blockPrivate({name: com});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'unblock': function(com, text) { //Unblock a user from private chatting you - should merge this into a toggle
			if(com) {this.allowPrivate({name: com});}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'chat': 'private',
		'room': 'private',
		'private': function(com, text) { //Invoke a private room
			if(com) {
				var arr = com.split(',');
				for(var i in arr) {array[i] = arr[i].removeTrailing(' ');}
				mainRoom.openPrivateChat(arr);
			}
			else {this.inlineAlert(i18n['erruser'].replace(/\$1/g, text.split(' ')[0]));}
		},
		/*case '/private': //Invoke a private room
				if(text[1]) {
					var array = build(text, 1).split('|');
					for(var i in array) {array[i] = array[i].removeTrailing(' ');}
					mainRoom.openPrivateChat(array);
				}
				else {this.inlineAlert(text[0] + ' error: Users must be specified');}
				break; */
		/*'enter': 'join',
		'join': function(com, text) { //Now for a command with chutzpah - join any chat on Wikia
			//Need to fix this so that joined rooms can be selected
			if(com) {
				var data = new models.OpenPrivateRoom({roomId: com});
 				mainRoom.baseOpenPrivateRoom(data, true);
				$('.private').before('<h1 id="Room_' + com + '" class="public wordmark" onclick="mainRoom.showRoom(' + com + ')"><span class="font-">' + com + '</span><span id="MsgCount_' + com + '" class="splotch">0</span></h1>');
				mainRoom.showRoom(com);
				mainRoom.chats.privates[com].init();
			}
			else {this.inlineAlert(i18n['errroom'].replace(/\$1/g, text.split(' ')[0]));}
		},
		'leave': 'part',
		'part': function(com, text) { //Leave the room you're looking at, or the room you specify
			if(!com) {var id = this.roomId; var chat = this;}
			else {var id = com; var chat = mainRoom.chats.privates[com];}
			$('#Room_' + id).remove();
			chat.socket.autoReconnect = false;
			chat.socket.socket.disconnect();
			if(!com) {mainRoom.show('main');}
		},*/
		'roomid': 'id',
		'id': function(com, text) {
			this.inlineAlert(i18n['id'] + ': ' + this.roomId);
		},
		
		'help': function(com, text) {
			if(com) {
				var ref = com.replace(/ /g, '.');
				var str = '';
				var subcoms = [];
				var subdirs = [];
				while(typeof eval('window.commands.' + ref) == 'string') {ref.substring(0, ref.lastIndexOf('.')) + '.' + eval('window.commands' + ref).toLowerCase();}
				var command = eval('window.commands.' + ref);
				if(i18n['help-' + ref]) {str += i18n['help'].replace(/\$1/g, ref.replace(/\./g, ' ')).replace(/\$2/g, i18n['help-' + ref].replace(/\$1/g, i18n['example']).replace(/\$1/g, i18n['exampleuser']));}
				if(typeof command == 'object') {
					for(var i in command) {
						if(typeof command[i] == 'function') {subcoms.push(i);}
						if(typeof command[i] == 'object') {subdirs.push(i);}
					}
				}
				if(subcoms.length > 0) {str += '\n' + i18n['subcoms'] + ': ' + subcoms.join(', ');}
				if(subdirs.length > 0) {str += '\n' + i18n['subdirs'] + ': ' + subdirs.join(', ');}
				str = str.removeTrailing('\n');
				if(str != '') {this.inlineAlert(str);}
				else {this.inlineAlert(i18n['nohelp'].replace(/\$1/g, command));}
			}
			else {
				var str = [];
				for(var i in window.commands) {
					if(typeof window.commands[i] == 'function' || typeof window.commands[i] == 'object') {str.push(i);}
				}
				this.inlineAlert(i18n['commands'].replace(/\$1/g, str.join(', ')));
			}
		}
	};

	//Parser helping function - takes an array of text created with .split(' '),
	//and an index number for where to start, then rebuilds the string.
	//Can also accept an index value for where to stop.
	function build(text, index, stop) {
		var newtext = '';
		if(stop == undefined || stop == 0) {stop = text.length}
		else if(stop < 0) {stop += text.length}
		if(index == stop || index == text.length - 1) {return text[index];}
		for(var i = index; i < stop; i++) {
			newtext += text[i] + ' ';
		}
		return newtext;
	}

	function toggleAway(msg) {
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == true) {
			mainRoom.setBack();
		}
		else {
			mainRoom.setAway(msg);
		}
	}
	toggleAway.back = function() { //Force back status
		if($('#ChatHeader .User').hasClass('away') == true) {mainRoom.setBack();}
	}
	toggleAway.away = function(msg) { //Force away status
		if(!msg) {var msg = '';}
		if($('#ChatHeader .User').hasClass('away') == false) {mainRoom.setAway(msg);}
	}

	NodeChatController.prototype.clearWindow = function() {
		this.viewDiscussion.chatUL.html('');
		this.inlineAlert(i18n['cleared']);
	}


	function active() { //Returns the NodeChatController for the active window
		if(mainRoom.activeRoom && mainRoom.activeRoom != 'main') {return mainRoom.chats.privates[mainRoom.activeRoom];}
		else {return mainRoom;}
	}

	String.prototype.removeTrailing = function(char) { //Remove extraneous characters
		var str = this;
		while(str.charAt(0) == char) {str = str.substring(1, str.length);}
		while(str.charAt(str.length - 1) == char) {str = str.substring(0, str.length - 1);}
		return str;
	}
	
	function Speak(text) { //speak from wgUserName
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

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	$(function () {
		if(!importScriptURI) {function importScriptURI(a){var b=document.createElement("script");b.setAttribute("src",a);b.setAttribute("type","text/javascript");document.getElementsByTagName("head")[0].appendChild(b);return b}}
		importScriptURI('http://c.wikia.com/index.php?title=User:Monchoman45/ChatHacks.js/i18n.js&action=raw&ctype=text/javascript');
		importScriptURI('http://monchbox.wikia.com/index.php?title=MediaWiki:APIQuery.js&action=raw&ctype=text/javascript'); //APIQuery for /unban

		$('head').append('<style type="text/css">\n.stafficon {\n\tmargin-bottom:-4px;\n\twidth:14px;\n\theight:14px;\n}\n.modicon {\n\tmargin-bottom:-3px;\n\twidth:14px;\n\theight:14px;\n}\n.UserStatsMenu {\n\tcolor:#000;\n}\n.Write [name="message"] {\n\twidth:93%;\n}\n.inline-alert span {\n\tcolor:#006CB0;\n\tcursor:pointer;\n}\n.inline-alert span:hover {\n\ttext-decoration:underline;\n}\n#pingspan {\n\tposition:absolute;\n\tz-index:5;\n\ttop:23px;\n\tmargin-left:15px;\n\tfont-size:15px;\n\tfont-weight:normal;\n\tline-height:15px;\n}\n#pings {\n\tresize:none;\n\tmargin-left:0;\n\tfont-size:12px;\n\theight:100px;\n\tdisplay:block;\n}\n#pingspan div span {\n\tfont-size:55%;\n}\n#ChatHeader {\n\tz-index:9999;\n}\n#ChatHeader {\n\tz-index:9999;\n}\n.message.ping {\n\tcolor:red;\n}\n</style>');

		//Unbind all of the window listeners that set your status to back
		$(window).unbind('mousemove').unbind('focus').unbind('keypress');
		//Add the sound space
		$('body').append('<span id="sound" style="display:none;"></span>');
	});
}
else {
	$(function () {
		var a = document.getElementsByTagName('a');
		for(var i = 0; i < a.length; i++) {
			if(a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
				a[i].addEventListener('click', function(event) {event.preventDefault(); OpenChatWindow();});
				a[i].removeAttribute('data-canonical');
			}
		}
		if(document.body.className.indexOf('skin-oasis') != -1) {window.chatcheck = setInterval('ChatCheck()', 200);}
	});

	function ChatCheck() {
		if($('.chat-join button').length != 0) {
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