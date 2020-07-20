/* Add Buttons */
		$(window).load(function addButtons() {
		    var $o = $('#Rail');
		    if ($o.length === 0) {
		        setTimeout(addButtons, 250);
		    } else if ([0, 1].indexOf($('.chat-button').length) != -1) {
		        var $div = $('<div>').css('display', 'none').attr('id', 'chatOptionsButton');
		        $o.prepend($div, dayNightButton());
		    }
		});
		 
		/* Day/Night Switch Feature */
		function dayNightButton() {
		    var dayText = 'Day theme';
		    var nightText = 'Night theme';
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
		 
		window.chatAnnouncementsAll = true;
		window.ChatStatus = {
		    statuses: {
		        afk: 'On vacation',
		        edit: 'Editing',
		        food: 'Eating',
		        game: 'Gaming'
		    },
		    debug: false
		};
		importArticles({
		    type: 'script',
		    articles: [
		        'u:dev:IsTyping/code.js',
		         'u:dev:MediaWiki:EmoticonsWindow/code.js',
		         'u:dev:ChatImages/code.js',
		         'u:shining-armor:MediaWiki:ChatTags/code.js',
		         'u:dev:MediaWiki:ChatAnnouncements/code.js',
		         'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
		         'u:dev:MediaWiki:Jumbles/startup.js',
		         'u:dev:MediaWiki:ChatSendButton.js',
		         'u:dev:MediaWiki:ChatOptions/code.js',
		         'u:dev:MediaWiki:ChatBlockButton/code.2.js',
		         'u:dev:MediaWiki:GiveChatMod/code.js',
		         'u:dev:MediaWiki:TitleNotifications/code.js',
		         'u:dev:MediaWiki:ChatTimestamps/code.js',
		         'u:dev:MediaWiki:Day/Night_chat/code.js',
		         'u:dev:ChatStatus/code.js',
		         'u:dev:MediaWiki:PrivateMessageAlert/code.js',
		         'u:dev:!kick/code.js',
		    ]
		});
		 
		window.chatAnnouncementsAll = true;
		/*
			the following script blocks certain works in certain conditions
		*/
		 
		ChatStringsBlocker = {"count": 0};
		$('textarea[name="message"]').on("keypress", function(e) {
			if (e.keyCode == 13) {
				var a = $('textarea[name="message"]').val().toLowerCase(),
					b = [
						"ass",
						"asses",
						"bitch",
						"bitches",
						"bitchy",
						"boob",
						"boobs",
						"cunt",
						"dick",
						"fuck",
						"fucker",
						"fucking",
						"ratshit",
						"motherfucker",
						"penis",
						"penises",
						"piss",
						"pussy",
						"shit",
						"shitty",
						"tits",
						"sex",
						"whore",
						"whores",
						"pisses"
					],
					c = false; // prevent duplication if blocked word was detected already
				for (var i = 0; i < b.length; i++) { // loop through all words
					var d = b[i];
					if (
					(
					/* possibilities start */
						a == d ||                                                                      // whole message equals the word
						a.search(new RegExp(d + "[ ,\\.\\!\\?]")) == 0 ||                              // starts with the word
						a.search(new RegExp("[ ,\\.\\!\\?]" + d + "[ ,\\.\\!\\?]")) > -1 ||            // contains the word
						a.substr(a.length - d.length - 1).search(new RegExp("[ ,\\.\\!\\?]" + d)) > -1 // end with the word
					/* possibilities end */
					) && c === false
					) {
						var c = true;
						$('textarea[name="message"]').val("");
						ChatStringsBlocker.count++;
						if (ChatStringsBlocker.count < 2) {
							alert("Warning! You were caught using inappropriate language and your message has been blocked.");
						} else if (ChatStringsBlocker.count === 2) {
							alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. A third time would automatically kick you from the chat room!");
						} else if (ChatStringsBlocker.count === 3) {
							window.close(); // close on 3rd offense
						}
					}
				}
			}
		});