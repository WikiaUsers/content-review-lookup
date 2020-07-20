function setCookie( cookie_name, data ){
         var domain = wgServer.split("//");
         document.cookie = 
                  cookie_name + "=" + data +
                  "; max-age=" + 60*60*24*150 + 
                  "; path=/; domain=" + domain;
}

function getCookie( cookie_name, pos ){
         var x, y, cookie_array = document.cookie.split(";");
         for (var i = 0; i < cookie_array.length; i++){
             x = cookie_array[i].substr(0,cookie_array[i],indexOf("="));
             y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
             x = x.replace(/^\s+|\s+$/g,"");
             if (x == cookie_name){
                      var style_objects = y.split(", ");
                      return unescape(style_objects[pos]);
             }
          }
}

function isEnabled(module){
         var c;
         switch (module){
                 case "chatHacks":
                      c = getCookie("customization", 2);
                      break;
                 case "tabComplete":
                      c = getCookie("customization", 4);
                      break;
                 case "multiKick":
                      c = getCookie("customization", 5);
                      break;
                 case "multiPM":
                      c = getCookie("customization", 6);
                      break;
                 case "searchBar":
                      c = getCookie("customization", 7);
                      break;
                 case "ignoreURL":
                      c = getCookie("customization", 8);
                      break;
                 case "stopSideScroll":
                      c = getCookie("customization", 9);
                      break;
                 case "messageBlocker":
                      c = getCookie("customization", 12);
                      break;
                 case "chatRefresh":
                      c = getCookie("customization", 14);
                      break;
                 case "nightChatToggle":
                      c = getCookie("customization", 15);
                      break;
                 case "chatParty":
                      c = getCookie("customization", 16);
                 default:
                      return false;
           }
           return (c === "true");
}

var chatOptions = {
           look: {
                 fontColor = getCookie("customization", 1);
                 fontFamily = getCookie("customization", 3);
                 surroundColor = getCookie("customization", 10);
                 selfPostColor = getCookie("customization", 11);
                 chatListColor = getCookie("customization", 13);
                 backgroundColor = getCookie("customization", 0);
                 modalIcon: "http://www.derehamreclaim.co.uk/_images-pages/icon-hammerSpanner.jpg"
	   },
            modules: {
                 chatHacks: {
                          element: "#chatHacks",
                          enabled: isEnabled("chatHacks"),
                          loaded: false,
                          load: function(){
                                         if ($("#pingspan").length > 0 || this.loaded)
                                             return;
                                         importScriptPage("User:Monchoman45/ChatHacks.js", "community");
                                         this.loaded = true;
                                          }
                           },
                 tabComplete: {
                           element: "#tabComplete",
                           enabled: isEnabled("tabComplete"),
                           loaded: false,
                           load: function(){
                                          importScriptPage("User:Joeytje50/tabinsert.js", "runescape");
                                          this.loaded = true;
                                          }
                           },
                 multiKick: {
			element: "#multiKick",
			enabled: isEnabled("multiKick"),
			loaded: false,
			load: function () {
				importScriptPage("User:Madnessfan34537/multikick.js","cod");
				$('<a id="multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write'); // to prevent issues with the button not loading
				this.loaded = true;
			}
		},
		multiPM: {
			element: "#multiPM",
			enabled: isEnabled("multiPM"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Chat.js/multipms.js", "cod");
				this.loaded = true;
			}
		},
		searchBar: {
			element: "#searchBar",
			enabled: isEnabled("searchBar"),
			loaded: false,
			load: function () {
				importScriptPage("MediaWiki:Chat.js/searchbar.js","cod");
				this.loaded = true;
			}
		},
		ignoreURL: {
			element: "#ignoreURL",
			enabled: isEnabled("ignoreURL"),
			loaded: false,
			load: function () {
				$('head').append('<style type="text/css">li[data-user="URL"] {display:none;}</style>');
				this.loaded = true;
			}
		},
		stopSideScroll: {
			element: "#stopSideScroll",
			enabled: isEnabled("stopSideScroll"),
			loaded: false,
			load: function () {
				$('head').append('<style type="text/css">#WikiaPage .Chat .message { word-wrap: break-word; }</style>');
				this.loaded = true;
			}
		},
                 messageBlocker: {
                        element: "#messageBlocker",
                        enabled: isEnabled("messageBlocker"),
                        loaded: false,
                        load: function() {
                                 importScriptPage("MessageBlocker/code.js', 'dev");
                                 this.loaded = true;
                        }
                 },
                 chatRefresh: {
                        element: "#chatRefresh",
                        enabled: isEnabled("chatRefresh"),
                        loaded: false,
                        load: function(){
                                 importScriptPage("ChatRefresh/code.js", "dev");
                                 this.loaded = true;
                        }
                 },
                 /* You must have the last two enabled */
                 nightChatToggle: {
                        element: "#nightChatToggle",
                        enabled: isEnabled("nightChatToggle"),
                        loaded: false,
                        load: function(){
                                 importScript("MediaWiki:Chat.js/NightChat.js");
                                 this.loaded = true;
                        }
                 },
                 chatParty: {
                        element: "#chatParty",
                        enabled: isEnabled("chatParty"),
                        loaded: false,
                        load: function(){
                                 importScript("MediaWiki:Chat.js/ChatParty.js");
                                 this.loaded = true;
                        }
                 },
	}
}

function updateChatSkin() {
	$('body').css({"background":chatOptions.look.surroundColor});
	$('.WikiaPage').css({"background":chatOptions.look.backgroundColor, "color":chatOptions.look.fontColor, "font-family":chatOptions.look.fontFamily});
	$('.Chat').css({"font-family":chatOptions.look.fontFamily});
	$('.Rail').css({"font-family":chatOptions.look.fontFamily}); 
	$('.ChatHeader').css({"background":chatOptions.look.backgroundColor, "font-family":chatOptions.look.fontFamily});
	var selfPostElement = document.createElement('style');
	selfPostElement.innerHTML = '.Chat .you{background:' + chatOptions.look.selfPostColor + ' !important;}';
	$('head').append(selfPostElement);
	$('.Write [name="message"]').css({"color":chatOptions.look.fontColor});
	$('.Write .message').css({"background":chatOptions.look.backgroundColor});
	$('.ChatHeader .User .username').css({"color":chatOptions.look.fontColor});
        $('.ChatWindow #WikiaChatList').css({"background":chatOptions.look.chatListColor});
	for (var m in chatOptions.modules) {
		if ( chatOptions.modules.hasOwnProperty( m ) ) {
			var module = chatOptions.modules[m];
			if (typeof module.enabled === 'boolean' && module.enabled && !module.loaded) {
				module.load();
			}
		}
	}
}

function openOptions(){
       var $optionsWimdowHTML = $.showCustomModal( "Chat Options", '<form method="" name="options" class="wikia-form"><fieldset><p style="font-size:120%; font-weight:bold; font-style:italic;">Colour changes</p><p style="font-size:80%;">Enter a <a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">colour name</a> or <a href="http://html-color-codes.info/" target="_blank">colour hex</a><p>Chat background&nbsp;<input type="text" name="backgroundColourinput" id="backgroundColourinput" value="' + chatOptions.look.backgroundColor + '"/></p><br/><p>Self-post background&nbsp;<input type="text" name="selfPostColourinput" id="selfPostColourinput" value="' + chatOptions.look.selfPostColor + '"/></p><br/><p>Surround&nbsp;<input type="text" name="surroundColourinput" id="surroundColourinput" value="' + chatOptions.look.surroundColor + '"/></p><br/><p>Font colour&nbsp;<input type="text" name="fontColourinput" id="fontColourinput" value="' + chatOptions.look.fontColor + '"/></p><br/><p>Chat List Color<input type="text" name="chatListColorinput" id="chatListColorinput" value="' + chatOptions.look.chatListColor + '"/></p><br /><p style="font-size:120%; font-weight:bold; font-style:italic;">Font</p><p>Font family <select id="fontList"><option value="arial" style="font-family:arial;">Arial</option><option value="courier new" style="font-family:courier new;">Courier new</option><option value="georgia" style="font-family:georgia;">Georgia</option><option value="palatino linotype" style="font-family:palatino linotype;">Palatino linotype</option><option value="Comic Sans MS" style="font-family:Comic Sans MS;">Comic sans</option><option value="tahoma" style="font-family:tahoma;">Tahoma</option><option value="Trebuchet MS" style="font-family:Trebuchet MS;">Trebuchet MS</option><option value="Verdana" style="font-family:Verdana;">Verdana</option><option value="Lucida Console" style="font-family:Lucida Console;">Lucida Console</option><option value="Medieval" style="font-family:medieval;">Medieval</option><option value="Philosopher" style="font-family:Philosopher;">Philosopher</option><option value="Audiowide" style="font-family:Audiowide;">Audiowide</option></select></p><br/><p style="font-size:120%; font-weight:bold; font-style:italic;">Added functionality</p><input type="checkbox" name="chatHacks" value="chatHacks" id="chatHacks"/> Enable <a href="http://c.wikia.com/wiki/User:Monchoman45/ChatHacks.js" target="_blank">chathacks</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="multiPM" value="multiPM" id="multiPM"/> Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multipm.js" target="_blank">multi PM</a><br/><input type="checkbox" name="tabComplete" value="tabComplete" id="tabComplete"/>Enable <a href="http://runescape.wikia.com/wiki/User:Joeytje50/tabinsert.js" target="_blank">tab complete</a>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="searchBar" value="searchBar" id="searchBar"/>Enable <a href="http://callofduty.wikia.com/wiki/MediaWiki:Chat.js/searchbar.js" target="_blank">search bar</a><br/><input type="checkbox" name="multiKick" value="multiKick" id="multiKick" />Enable <a href="http://callofduty.wikia.com/wiki/User:Madnessfan34537/multikick.js" target="_blank">multi kick</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="ignoreURL" value="ignoreURL" id="ignoreURL"/>Ignore URL in main chat<br /><input type="checkbox" name="stopSideScroll" value="stopSideScroll" id="stopSideScroll"/>Stop the sidescroll bar to appear after someone spams<br /><input type="checkbox" name="messageBlocker" value="messageBlocker" id="messageBlocker"/>Enable <a href="http://dev.wikia.com/wiki/MessageBlocker/code.js" target="_blank">message blocker</a>&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="chatRefresh" value="chatRefresh" id="chatRefresh" />Enable <a href="http://dev.wikia.com/wiki/ChatRefresh/code.js">chat refresh</a><br /><input type="checkbox" name="nightChatToggle" value="nightChatToggle" id="nightChatToggle" />Enable night chat toggle button<br /><input type="checkbox" name="chatParty" value="chatParty" id="chatParty" />Enable chat party mode</fieldset></form>', {
                          id: "optionsWindow",
                          width: 600,
                          buttons: [
		{
			id: "cancel",
		    message: "Cancel",
		    handler: function () {
				cancelChanges();
		    }
		},
		{
			id: "updateCookie",
			defaultButton: true,
			message: "Update!",
			handler: function () {
				updateCookie();
		    }
	    }
		]
	});
         $(".close").click(cancelChanges);
	// Check if various modules have been enabled by the user, and check their boxes if so
	if (chatOptions.modules.chatHacks.enabled)
		$("#chatHacks").attr("checked",true);
	if (chatOptions.modules.multiPM.enabled)
		$("#multiPM").attr("checked",true);
	if (chatOptions.modules.tabComplete.enabled)
		$("#tabComplete").attr("checked",true);
	if (chatOptions.modules.searchBar.enabled)
		$("#searchBar").attr("checked",true);
	if (chatOptions.modules.multiKick.enabled)
		$("#multiKick").attr("checked",true);
	if (chatOptions.modules.ignoreURL.enabled)
		$("#ignoreURL").attr("checked",true);
	if (chatOptions.modules.stopSideScroll.enabled)
		$("#stopSideScroll").attr("checked",true);
	if (chatOptions.modules.messageBlocker.enabled)
		$("#messageBlocker").attr("checked",true);
         if (chatOptions.modules.chatRefresh.enabled)
                 $("#chatRefresh").attr("checked",true);
         if (chatOptions.modules.nightChatToggle.enabled)
                 $("#nightChatToggle").attr("checked",true);
         if (chatOptions.modules.chatParty.enabled)
                 $("#chatParty").attr("checked",true);

	if (typeof window.customFonts !== "undefined" && window.customFonts.length) {
		for (var i = 0; i < window.customFonts.length; i++) {
			var font = window.customFonts[i];
			$("#fontList").append('<option value="' + font+ '" style="font-family:' + font + ';">' + font.slice(0,1).toUpperCase() + font.slice(1) + '</option>');
		}
	}
	// Set certain modules' checkboxes to disabled if specific conditions are not met
	if (!wgUserGroups.indexOf("chatmoderator") && !wgUserGroups.indexOf("sysop") && !wgUserGroups.indexOf("staff") && !wgUserGroups.indexOf("helper") && !wgUserGroups.indexOf("vstf"))
		$("#multiKick").attr("disabled",true);
	if (wgServer !== "http://callofduty.wikia.com")
		$("#ignoreURL").attr("disabled",true);
		
	$("select option[value='" + chatOptions.look.fontFamily + "']").attr("selected","selected"); // sets the font selector to the one chosen currently
}

/**
 * Close the options window without saving any changes
 */
function cancelChanges() {
	var dialog = $('#optionsWindow');
	dialog.closeModal();
}

function updateCookie() {
	chatOptions.look.backgroundColor = $('#backgroundColourinput').val();
	chatOptions.look.fontColor = $('#fontColourinput').val();
	chatOptions.look.fontFamily = $('#fontList').val();
	chatOptions.look.surroundColor = $('#surroundColourinput').val();
     chatOptions.look.selfPostColor = $('#selfPostColourinput').val();
         chatOptions.look.chatListColor = $('#chatListColorinput').val();
	for (var m in chatOptions.modules) {
		if ( chatOptions.modules.hasOwnProperty( m ) ) {
			var module = chatOptions.modules[m];
			if (typeof module.element != 'undefined' && $(module.element).attr("checked")) {
				module.enabled = true;
			} else {
				module.enabled = false;
			}
		}
	}
	
	// Set the cookies
	setCookie("customization", chatOptions.look.backgroundColor + ", " + chatOptions.look.fontColor + ", " + chatOptions.modules.chatHacks.enabled + ", " + chatOptions.look.fontFamily + ", " + chatOptions.modules.tabComplete.enabled + ", " +  chatOptions.modules.multiKick.enabled + ", " + chatOptions.modules.multiPM.enabled + ", " + chatOptions.modules.searchBar.enabled + ", " + chatOptions.modules.ignoreURL.enabled + ", " + chatOptions.modules.stopSideScroll.enabled + ", " + chatOptions.look.surroundColor + ", " + chatOptions.look.selfPostColor + ", " + chatOptions.modules.messageBlocker.enabled + ", " + chatOptions.look.chatListColor + ", " + chatOptions.modules.chatRefresh.enabled + ", " + chatOptions.modules.nightChatToggle.enabled + ", " + chatOptions.modules.chatParty.enabled);
	updateChatSkin();
	cancelChanges();
}


// Add Options button
if (!$("#chatOptionsButton").length) {
	$('.Rail').prepend('<div id="chatOptionsButton" onclick="openOptions();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 1px solid #CCCCCC; width:90%; border-radius: 20px;" align="center"><img src="' + chatOptions.look.modalIcon + '" width="18px"/>&nbsp;Options</div>'); // Prevent multiple buttons from being appended
}

window.onload = updateChatSkin();