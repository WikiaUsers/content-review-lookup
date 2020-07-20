// <syntaxhighlight lang="javascript">
/*

  this feature will create a blackout screen if you're away or if you force it
  REMEMBER!!!! do NOT use your actual Wikia account password as a confirmation keyword
  for personal use only

*/

console.log("Take #1.");

function openSecureChat(wind) {
	var s = a.document.createElement("script");
	s.type = "text/javascript";
	s.src = "http://cps05box.wikia.com/index.php?title=MediaWiki:ChatAwaySecurity.js&action=raw&ctype=text/javascript";
	wind.document.head.appendChild(s);
}

if (mw.config.get("wgCanonicalSpecialPageName") !== "Chat") {
	// this is not chat
	// open new chat function
	ChatEntryPoint.onClickChatButton = function (a) {
		window.a = window.open(a, "wikiachat", window.wgWikiaChatWindowFeatures);
		$(window.a).load(function() {
			openSecureChat(this);
		});
	}
} else {
	/* on F5 */
	$(window).keydown(function(k) {
		if (k.keyCode == 116) {
			k.preventDefault();
			window.a = window.open(location.pathname + "?cb=" + new Date().getTime(), "wikiachat", window.wgWikiaChatWindowFeatures);
			$(window.a).load(function() {
				openSecureChat(this);
				window.close();
			});
		}
	});

	/* main object */
	secure = {
		"alpha": 0.85, // opacity of blackout screen
		"key": "parrot", // <<=============================== special password !!!!REMEMBER NOT TO USE YOUR ACTUAL WIKIA PASS!!!! do NOT (!!!) use a password that you use anywhere else in the internet as well. it's also recommended that you don't use this password anywhere in the future
		"timeout": 600000, // default: 10 minutes
		"fn": {},
		"enabled": true
	}

	/* css */
	mw.util.addCSS(
		'#secure {\n' +
			'\twidth: ' + $(window).width() + 'px;\n' +
			'\theight: ' + $(window).height() + 'px;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 0;\n' +
			'\tleft: 0;\n' +
			'\tz-index: 10;\n' +
			'\tbackground: rgba(0,0,0,' + secure.alpha + ');\n' +
		'}\n' +
		'#secure .bold {\n' +
			'\tfont-weight: bold;\n' +
			'\ttext-decoration: underline;\n' +
		'}\n' +
		'#secure input#secure-input {\n' +
			'\twidth: 200px;\n' +
			'\tpadding-left: 18px;\n' +
			'\tbackground-image: url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Dialog-information.svg/18px-Dialog-information.svg.png\');\n' +
			'\tbackground-repeat: no-repeat;\n' +
			'\tbackground-position: left center;\n' +
		'}\n' +
		'#secure input#secure-input.true {\n' +
			'\tbackground-image: url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Dialog-information_on.svg/18px-Dialog-information_on.svg.png\');\n' +
		'}\n' +
		'#secure input#secure-input.false {\n' +
			'\tbackground-image: url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dialog-information_red.svg/18px-Dialog-information_red.svg.png\');\n' +
		'}\n' +
		'#secure > div {\n' +
			'\twidth: 370px;\n' +
			'\theight: 80px;\n' +
			'\tmargin: auto;\n' +
			'\tposition: relative;\n' +
			'\ttop: ' + ($(window).height() - 80) / 2 + 'px;\n' +
			'\tbackground: #ffffff;\n' +
			'\tborder: 1px solid #cccccc;\n' +
			'\tborder-radius: 7px;\n' +
			'\ttext-align: center;\n' +
		'}'
	);

	/* apply markup */
	$("body").append(
		'<div id="secure" style="display: none;">' +
			'\t<div>' +
				'\t\tChat has been locked for security purposes.<br />Please enter your secret key to chat again.<br /><span style="font-size: 10px;"><span class="bold">Remember!</span> the security key is different than your Wikia account password.</span><br />' +
				'\t\t<input type="text" id="secure-input" />' +
			'\t</div>' +
		'</div>'
	);

	/* functions */
	// trigger secure interface
	secure.fn.exe = function() {
		if (secure.enabled) {
			$("#secure").show();
			$("#secure-input")[0].select();
		}
	}

	// start
	secure.fn.start = function() {
		FOO = setTimeout(function() {
			secure.fn.exe();
		}, secure.timeout);
	}

	// force secure mode
	secure.fn.force = function() {
		clearTimeout(FOO);
		secure.enabled = true;
		secure.fn.exe();
	}

	// stop secure mode
	secure.fn.stop = function() {
		clearTimeout(FOO);
		secure.enabled = false;
	}

	// reset
	secure.fn.reset = function() {
		clearTimeout(FOO);
		secure.enabled = true;
		secure.fn.start();
	}

	// trigger by default if entering the chat room, even if the user hasn't moved the cursor around/typed in anything/clicked something
	secure.fn.start();

	/* events */
	// add help command when window loads
	$(".Chat:first > ul")
		.append('<li class="inline-alert secure-alert"><code>window.secure</code> enabled. Type in <span style="color: #4e4e4e; font-size: 11px;">!secure help</span> for the command list.')
		.parent().scrollTop($(".Chat > ul").height());

	// trigger instantly if secureOnJoin is enabled
	if ($.cookie("secureOnJoin") === "true") {
		secure.fn.force();
	}

	// reset timeout when user is active in chat
	$("body").on("mousemove click keydown", function() {
		var temp = secure.enabled;
		secure.fn.reset();
		secure.enabled = temp;
	});

	// check password
	$("#secure input#secure-input").keydown(function(k) {
		if (k.keyCode == 13) {
			if ($(this).val() == secure.key) {
				$(this).addClass("true");
				setTimeout(function() {
					$("#secure").hide();
					$("#secure input#secure-input").removeClass("true");
					secure.fn.reset();
				},200);
			} else {
				$(this).addClass("false");
				setTimeout(function() {
					$("#secure input#secure-input").removeClass("false");
				},800);
			}
			$(this).val("");
		}
	});

	// disable or enable feature
	$('textarea[name="message"]').on("keydown", function(k) {
		var v = $(this).val();
		if (k.keyCode == 13 && $(".Chat").first().css("display") == "block") {
			if (v == "!secure off") {
				$(this).val("");
				secure.fn.stop();
				$(".Chat:first > ul")
					.append('<li class="inline-alert secure-alert">Chat security: Off</li>')
					.parent().scrollTop($(".Chat > ul").height());
			} else if (v == "!secure on") {
				$(this).val("");
				secure.fn.reset();
				$(".Chat:first > ul")
					.append('<li class="inline-alert secure-alert">Chat security: On</li>')
					.parent().scrollTop($(".Chat > ul").height());
			} else if (v == "!secure force") {
				$(this).val("");
				secure.fn.force();
			} else if (v == "!secure onjoin on") {
				$(this).val("");
				$.cookie("secureOnJoin","true",{expires: new Date(new Date().getTime() + 68400*1000*60)});
				$(".Chat:first > ul")
					.append('<li class="inline-alert secure-alert">Secure-On-Join feature is now enabled: you\'d need to enter your secret key next time you enter chat</li>')
					.parent().scrollTop($(".Chat > ul").height());
			} else if (v == "!secure onjoin off") {
				$(this).val("");
				$.cookie("secureOnJoin","true",{expires: new Date(0)});
				$(".Chat:first > ul")
					.append('<li class="inline-alert secure-alert">Secure-On-Join feature is now disabled</li>')
					.parent().scrollTop($(".Chat > ul").height());
			} else if (v == "!secure help") {
				$(this).val("");
				$(".Chat:first > ul")
					.append('<li class="inline-alert secure-alert">A security feature was enabled in this chat room to prevent other people that have access to your computer from typing messages with your account. If you don\'t perform any type of action in chat for 10 minutes (or a custom time that you may have set) or more, the security mechanism would be triggered. See command list below:<br />\n<br /><div style="text-align: left; font-size: 11px; line-height: 12px; font-family: monospace, arial;">\n<span style="color: #4e4e4e;">!secure off</span> for disabling the feature<br />\n<span style="color: #4e4e4e;">!secure on</span> to enable it again<br />\n<span style="color: #4e4e4e;">!secure force</span> to force the security mechanism (useful when being AFK)<br />\n<span style="color: #4e4e4e;">!secure help</span> to view this message again<br />\n<span style="color: #4e4e4e;">!secure onjoin on</span> requires entering your secret key whenever entering chat<br />\n<span style="color: #4e4e4e;">!secure onjoin off</span> disables the previous feature</div></li>')
					.parent().scrollTop($(".Chat > ul").height());
			}
		}
	});

	// remove .continued class if follows special inline alert
	$("body").on("DOMNodeInserted", ".Chat:first > ul > li", function(a) {
		if ($(a.target).prev().is(".inline-alert.secure-alert") && $(a.target).is(".continued")) {
			$(a.target).removeClass("continued");
		}
	});
}
// </syntaxhighlight>