/**
 * Wikia ChatPlugins
 * Change some options on Special:Chat to make it easier 
 * to use and more useful in general.
 * 
 * WARNING
 * Make sure you are not loading MediaWiki:Chat.js/load.js 
 * with MediaWiki:Chat-edit-count.
 * Load it with MediaWiki:Chat-welcome-message, or this
 * will malfunction badly.
 * 
 * Created from ChatOptions
 * by Callofduty4, Madnessfan34537, and Sactage
 * minor modifications by Dragonfree97
 */

//API
//Check for custom name
if (typeof(apiCustomName)=="undefined") {
  apiCustomName = "Javascript API";
}
//Define api object
var api = {
    version: 0.2,
    branch: "Stable",
    author: "Gamedezyner",
    cookie: {
        get:function(cookie_name,pos) {
	      var x, y, cookie_array = document.cookie.split(";");
	      for (var i=0; i < cookie_array.length; i++) {
		x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
		y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == cookie_name) {
		  var style_objects = y.split(", ");
		  return unescape(style_objects[pos]);
		}
	      }
	    },
	set:function (cookie_name,data) {
	      var domain = wgServer.split("//")[1];
	      document.cookie =
		cookie_name + "=" + data +
		"; max-age=" + 60*60*24*150 +
		"; path=/; domain=" + domain;
	    }
    },
    actions: {
		edit: function() {
			this.token = api.tokens().edit;
			this.action = "edit";
			this.bot = "true";
			this.format = "json";
		},
		patrol: function() {
			this.token = api.tokens().patrol;
			this.action = "patrol";
			this.bot = "true";
			this.format = "json";
		},
		query: function() {
			this.action = "query";
			this.format = "json";
		},
		post: function(params) {
			  $.ajax({
				  url:      wgServer + "/api.php",
				  type:     "POST",
				  async: false,
				  cache: false,
				  timeout: 30000,
				  dataType: "JSON",
				  data: params
			  }).done(function(data) { 
				  params.result = "Success";
				  params.response = data;
			  }).fail(function() {
				  params.result = "Fail";
			  });
		}
    },
    functions: {
        appendText: function(target, text, summary) {
	    thisEdit = new api.actions.edit;
	    thisEdit.title = target;
	    thisEdit.appendtext = text;
	    thisEdit.summary = summary;
	    api.actions.post(thisEdit);
	    return thisEdit;
	},
	prependText: function(target, text, summary) {
	    thisEdit = new api.actions.edit;
	    thisEdit.title = target;
	    thisEdit.prependtext = text;
	    thisEdit.summary = summary;
	    api.actions.post(thisEdit);
	    return thisEdit;
	},
	getCategoryMembers: function(targetcat) {
	    thisQuery = new api.actions.query;
	    thisQuery.list = "categorymembers";
	    thisQuery.cmtitle = targetcat;
	    thisQuery.cmlimit = api.settings.pagelimit;
	    api.actions.post(thisQuery);
	    return thisQuery.response;
	},
	getPageContents: function(targetpage) {
	    thisQuery = new api.actions.query;
	    thisQuery.prop = "revisions";
	    thisQuery.rvprop = "content";
	    thisQuery.titles = targetpage;
	    api.actions.post(thisQuery);
	    thisQuery.pages = thisQuery.response.query.pages;
	    key = Object.keys(thisQuery.pages)[0];
	    if (key!="-1") {
	      thisQuery.content = thisQuery.pages[key]["revisions"][0]["*"];
	      return thisQuery.content;
	    }
	    else {
	      return "error";
	    }
	},
	deletePage: function(target, reason) {
	    thisEdit = new api.actions.edit;
	    thisEdit.action = "delete";
            if (typeof(target)=="string") {thisEdit.title = target;}
            if (typeof(target)=="number") {thisEdit.pageid = target;}
	    thisEdit.reason = reason;
	    api.actions.post(thisEdit);
	    return thisEdit;
	},
	editPage: function(target, text, summary) {
	    thisEdit = new api.actions.edit;
            if (typeof(target)=="string") {thisEdit.title = target;}
            if (typeof(target)=="number") {thisEdit.pageids = target;}
	    thisEdit.text = text;
	    thisEdit.summary = summary;
	    api.actions.post(thisEdit);
	    return thisEdit;
	}
    },
    settings: {
        throttle: 1000,
        pagelimit: 100,
	name: apiCustomName
    },
    tokens: function() {
	if (mw.user.tokens.get("patrolToken") == null) {
		tokenQuery = new api.actions.query;
		tokenQuery.list = 'recentchanges';
		tokenQuery.rctoken = 'patrol';
		tokenQuery.rclimit=1;
		api.actions.post(tokenQuery);
		mw.user.tokens.values.patrolToken = tokenQuery.response.query.recentchanges[0].patroltoken;
	}
	return {
		edit: mw.user.tokens.get("editToken"),
		watch: mw.user.tokens.get("watchToken"),
		patrol: mw.user.tokens.get("patrolToken")
	}
    },
    menu: {
	loaded: false,
	load: function() {
		$(".tools").append("<li id='apiMenu' class='mytools menu'><span class='arrow-icon-ctr'><span class='arrow-icon arrow-icon-single'></span></span><a href='#'>" + api.settings.name + "</a><ul id='api-menu' class='tools-menu' style='left: inherit; right: auto; bottom: 15px; display: none;'></ul></li>");
		$("#apiMenu").mouseover(function() {$("#api-menu").css('display','block')});
		$("#apiMenu").mouseout(function() {$("#api-menu").css('display','none')});
		api.menu.loaded = true;
	},
	add: function(id, title) {
		if (!api.menu.loaded) {
			api.menu.load();
		}
		$('#api-menu').append('<li><a id="' + id + '" href="#">' + title + '</a></li>');
		$('#'+id).hover(function() { $(this).css("background-color","#cce1ef") },function() { $(this).css("background-color",$('#WikiaPage').css("background-color")) }); //Need to load background color from style
	},
	open: function(title,content,width,ok,cancel,okButton,cancelButton) {
		 $.showCustomModal( title, '<form method="" name="" class="WikiaForm "><fieldset><div id="apiPopupHeader"></div>' + content + '</fieldset></form>', {
			id: "apiPopupWindow",
				width: width,
				buttons: [
					{
						id: "cancel",
						message: cancelButton,
						handler: cancel
					},
					{
						id: "ok",
						defaultButton: true,
						message: okButton,
						handler: ok
					}
				]
		});
		$(".close").click(api.menu.cancel);
		$(".blackout").addClass("apiPopup")
	},
	cancel: function(cancel) {
		$('#apiPopupWindow').remove();
		$(".blackout.apiPopup").remove();
		
	}
    },
    userlevel: function() {
      userlevel = 0;
      if (wgUserGroups.indexOf("sysop")>-1) {
	userlevel = 1;
      }
      if (wgUserGroups.indexOf("bureaucrat")>-1) {
	userlevel = 2;
      }
      if (wgUserGroups.indexOf("staff")>-1) {
	userlevel = 3;
      }
      return userlevel
    }
};


//STOP API

if (typeof(chatPluginsCustom)!="undefined") {
	if (typeof(chatPluginsCustom.staffIcon)=="undefined") {
		chatPluginsCustom.staffIcon = "https://images.wikia.nocookie.net/__cb20140626173406/gamedezyner/images/6/60/StaffIcon.png";
	}
	if (typeof(chatPluginsCustom.modIcon)=="undefined") {
		chatPluginsCustom.modIcon= "https://vignette.wikia.nocookie.net/clubpenguin/images/c/c6/Moderator_badge1.png";
	}  
	if (typeof(chatPluginsCustom.pingSound)=="undefined") {
		chatPluginsCustom.pingSound = "https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg";
	}
	if (typeof(chatPluginsCustom.loadedFrom)=="undefined") {
		chatPluginsCustom.loadedFrom = "chat.js";
	}
}
else {
	chatPluginsCustom = {
		staffIcon: "https://images.wikia.nocookie.net/__cb20140626173406/gamedezyner/images/6/60/StaffIcon.png",
		modIcon: "https://vignette.wikia.nocookie.net/clubpenguin/images/c/c6/Moderator_badge1.png",
		pingSound: "https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg",
		loadedFrom: "MediaWiki:Chat.js"
	}
}


var chatPlugins = {
	release: {
		version: 0.7
	},
	custom: {
		staffIcon: chatPluginsCustom.staffIcon,
		modIcon: chatPluginsCustom.modIcon,
		pingSound: chatPluginsCustom.pingSound
//		horsedModules: chatPluginsCustom.horsedModules,
//		horsedSettings: chatPluginsCustom.horsedSettings,
//		disabledModules: chatPluginsCustom.disabledModules
	},
	module: function(name, loadScript, loadWiki) {
		this.enabled = function() {
			return chatPlugins.cookie.arrays.modules[this.id];
		}
		this.id = Object.keys(chatPlugins.modules).length;
		this.loaded = false;
		this.modOnly = false;
		this.adminOnly = false;
		this.loadScript = loadScript;
		this.loadWiki = loadWiki;
		this.name = name;
		this.load = function() {
			if (this.loadWiki!="") {
				importScriptPage(this.loadScript,this.loadWiki);
			}
			else {
				importScriptPage(this.loadScript);
			}
			this.loaded = true;
		}
	},
	modules: {},
	pages: {
		list: {},
		save: function() { // Save all registered cookie arrays to respective cookies
			for (i in Object.keys(chatPlugins.pages.list)) {
			    console.log("%ccalling for 'chatPlugins.pages.save' through [[MediaWiki:Chat.js/options.js]] - FUNCTION START", "background: rgba(255, 128, 0, 0.15); color: #0c0; font-weight: bold;");
				api.functions.editPage("User:" + wgUserName + "/ChatPlugins/" + chatPlugins.pages.list[Object.keys(chatPlugins.pages.list)[i]].name,chatPlugins.pages.list[Object.keys(chatPlugins.pages.list)[i]].value);
			}
		console.log("%ccalling for 'chatPlugins.pages.save' through [[MediaWiki:Chat.js/options.js]] - FUNCTION END -- if this line appears, that means that no execution errors occured in the function block", "background: rgba(255, 128, 0, 0.15); color: #0c0; font-weight: bold;");
		},
		load: function() { // Save all registered cookie arrays to respective cookies
			for (i in Object.keys(chatPlugins.pages.list)) {
				if (typeof(api.functions.getPageContents("User:" + wgUserName + "/ChatPlugins/" + chatPlugins.pages.list[Object.keys(chatPlugins.pages.list)[i]].name))!="string") {
				  var content = "";
				}
				else {
				  content = api.functions.getPageContents("User:" + wgUserName + "/ChatPlugins/" + chatPlugins.pages.list[Object.keys(chatPlugins.pages.list)[i]].name);
				}
				chatPlugins.pages.list[Object.keys(chatPlugins.pages.list)[i]].value = content;
			}
		}
	},
	cookie: {
		arrays: {
			version: [],
			modules: []
		},
		get: function(cookie_name,pos) {
			var x, y, cookie_array = document.cookie.split(";");
			for (var i=0; i < cookie_array.length; i++) {
				x = cookie_array[i].substr(0,cookie_array[i].indexOf("="));
				y = cookie_array[i].substr(cookie_array[i].indexOf("=")+1);
				x = x.replace(/^\s+|\s+$/g,"");
				if (x == cookie_name) {
					return y;
				}
			}
		},
		set: function (cookie_name,data) {
			var domain = wgServer.split("//")[1];
			document.cookie =
			cookie_name + "=" + data + "; max-age=" + 60*60*24*150 + "; path=/; domain=" + domain;
		},
		load: function() { // Load all registered cookie arrays from respective cookies
			for (i in Object.keys(chatPlugins.cookie.arrays)) {
				chatPlugins.cookie.arrays[Object.keys(chatPlugins.cookie.arrays)[i]] = chatPlugins.cookie.get("chatPlugins"+Object.keys(chatPlugins.cookie.arrays)[i].charAt(0).toUpperCase() + Object.keys(chatPlugins.cookie.arrays)[i].slice(1)).split(",");
			}		  
		},
		save: function() { // Save all registered cookie arrays to respective cookies
			for (i in Object.keys(chatPlugins.cookie.arrays)) {
				chatPlugins.cookie.set("chatPlugins"+Object.keys(chatPlugins.cookie.arrays)[i].charAt(0).toUpperCase() + Object.keys(chatPlugins.cookie.arrays)[i].slice(1),chatPlugins.cookie.arrays[Object.keys(chatPlugins.cookie.arrays)[i]].toString());
			}
		},
		reset: function () { //Reset cookie data to default
			modules = Object.keys(chatPlugins.modules);
			for ( i in Object.keys(chatPlugins.modules) ) {
				module = chatPlugins.modules[modules[i]];
				chatPlugins.cookie.arrays.modules[module.id] = 0;
			}
			chatPlugins.cookie.arrays.version[0] = chatPlugins.release.version;
			chatPlugins.cookie.save();
		}
	},
	menu: {
		loaded: false,
		load: function() {
			$(".chattopic").append('<ul id="chatPluginsMenu" class="chatPluginsMenu" style="position:absolute;right:150px;top:20px;z-index:99;padding:5px;border: solid 2px ' + $('body').css("background-color") + ';font-size:12px;color:' + $('#WikiaPage').css("color") + ';background-color:' + $('#WikiaPage').css("background-color") + ';display:none;"></ul>');
			$(".chatPluginsMenu").mouseover(function() {$('#chatPluginsMenu').css('display','block')});
			$(".chatPluginsMenu").mouseout(function() {$('#chatPluginsMenu').css('display','none')});
			chatPlugins.menu.loaded = true;
		},
		add: function(id, title) {
			if (!chatPlugins.menu.loaded) {
				chatPlugins.menu.load();
			}
			$('#chatPluginsMenu').append('<li><a id="' + id + '" href="#">' + title + '</a></li>');
			$('#'+id).hover(function() { $(this).css("background-color","#cce1ef") },function() { $(this).css("background-color",$('#WikiaPage').css("background-color")) }); //Need to load background color from style
		},
		open: function() {
			var $optionsWindowHTML = $.showCustomModal( "Options", '<form method="" name="" class="WikiaForm "><fieldset>' + 
				'<div id="chatPluginsHeader">Please select the features you would like to enable:</div>' + 
				'<table id="chatPluginsTable"></table>' + 
				'<div>Note: Clicking Save will refresh the chat.</div></fieldset></form>', {
				id: "optionsWindow",
					width: 600,
					buttons: [
						{
							id: "cancel",
							message: "Cancel",
							handler: chatPlugins.menu.cancel
						},
						{
							id: "save",
							defaultButton: true,
							message: "Save",
							handler: chatPlugins.menu.save
						}
					]
			});
			$(".close").click(chatPlugins.menu.cancel);
			$(".blackout").click(chatPlugins.menu.cancel);
			$(".blackout").addClass("chatPlugins");
			chatPluginsTable = "";
			modules = Object.keys(chatPlugins.modules);
				for (i=0;i<modules.length;i++) {
					module = chatPlugins.modules[modules[i]];
					if (i%2) {
						chatPluginsTable += '<td style="padding:2px;"><label><input class="chatOption" type="checkbox" name="' + module.name + '" value="' + module.name + '"/>Enable ' + module.name + '</label>';
						if (typeof(module.settingsID)!="undefined"){
							chatPluginsTable += ' <a href="#" style="font-size:8pt;font-style:italic" id="' + module.settingsID + '">(Settings)</a>';
						}
						chatPluginsTable += '</td></tr>';
					}
					else {
						chatPluginsTable += '<tr><td style="padding:2px;"><label><input class="chatOption" type="checkbox" name="' + module.name + '" value="' + module.name + '"/>Enable ' + module.name + '</label>';
						if (typeof(module.settingsID)!="undefined"){
							chatPluginsTable += ' <a href="#" style="font-size:8pt;font-style:italic" id="' + module.settingsID + '">(Settings)</a>';
						}
						chatPluginsTable += '</td>';
					}
					if ((modules.length % 2)!=1) {
						chatPluginsTable += '</tr>';
					}
					$('#chatPluginsTable').html(chatPluginsTable);
					
				}
				for (i=0;i<modules.length;i++) {
					module = chatPlugins.modules[modules[i]];
					if (module.enabled()==1) {
						$('input[name="' + module.name + '"]').attr("checked",true);
					}
					if (module.modOnly && wgUserGroups.indexOf("chatmoderator") == -1 && wgUserGroups.indexOf("sysop") == -1) {
						$('input[name="' + module.name + '"]').attr("checked",false);
						$('input[name="' + module.name + '"]').attr("disabled",true);
					}
					$("#"+module.settingsID).click(module.settingsFunction);
					$("#"+module.settingsID).click(chatPlugins.menu.cancel);
				}
			
		},
		save: function() {
			modules = Object.keys(chatPlugins.modules);
			checked = $(".chatOption:checked");
			unchecked = $(".chatOption:not(:checked)");
			cookieString = "";
			for ( i in Object.keys(chatPlugins.modules) ) {
				module = chatPlugins.modules[modules[i]];
				if ($('input[name="' + module.name + '"]:checked').length > 0) {
					chatPlugins.cookie.arrays.modules[module.id] = 1;
				}
				else {
					chatPlugins.cookie.arrays.modules[module.id] = 0;
				}
			}
			chatPlugins.cookie.save();
			chatPlugins.menu.cancel(); 
			if (chatPluginsCustom.loadedFrom == "w:c:Special:MyPage/global.js") {
				chatPlugins.reload();
			}
			else {
				window.location.reload();
			}
		},
		cancel: function() {
			$('#optionsWindow').remove();
			$('.blackout.chatPlugins').remove();
		}
	},
	load: function() {
		if (typeof(chatPlugins.cookie.get("chatPluginsVersion"))=="undefined") { // Is ChatPlugins version saved in cookie? If not, initialize cookies for first time and continue loading.
			chatPlugins.cookie.reset();
			console.log('[OPTIONS] Cookies initialized for first run');
			chatPlugins.loading = true;
		}
		else {
			if (isNaN(parseFloat(chatPlugins.cookie.get("chatPluginsVersion")))) { // Is ChatPlugins version cookie invalid? If so, reset cookies to default values and continue loading.
				chatPlugins.cookie.reset();
				console.log('[OPTIONS] Error: Cookies invalid. Resetting cookies');
				chatPlugins.loading = true;
			}
			else {
				if (parseFloat(chatPlugins.cookie.get("chatPluginsVersion"))==chatPlugins.release.version) { // Is ChatPlugins version the same as last load? If so, log and continue loading.
					console.log('[OPTIONS] Cookies valid. Loading options');
					chatPlugins.loading = true;
				}
				if (parseFloat(chatPlugins.cookie.get("chatPluginsVersion"))<chatPlugins.release.version) { // Is ChatPlugins version newer than last load? If so, alert the user to the upgrade and continue loading.
					chatPlugins.cookie.set("chatPluginsVersion",chatPlugins.release.version.toString());
					chatPlugins.loading = true;
				}
			}
		}
		if (chatPlugins.loading) {
			chatPlugins.cookie.load();
			modules = Object.keys(chatPlugins.modules);
			for (i = 0; i < Object.keys(chatPlugins.modules).length; i++) {
				module = chatPlugins.modules[modules[i]];
				if (module.enabled() == true) {
					module.load();
				}
			}
			if( !$(".chatPluginsMenu.topiclink").length ) {
			    $("div.chattopic").append(' • <a href="#" id="chatPluginsButton" class="chatPluginsMenu topiclink"><img src="https://vignette.wikia.nocookie.net/clubpenguin/images/8/8b/Options.png" height="12px" class="optionsimage chattopic-icon" /> <span class="chattopic-text">Options</span></a>');
			}
			if (chatPluginsCustom.loadedFrom == "w:c:Special:MyPage/global.js" || chatPluginsCustom.loadedFrom == "bookmark") {
				$("#ChatHeader .public.wordmark").append('<a href="#" id="chatRefreshButton"><img src="https://images.wikia.nocookie.net/__cb20140818203356/gamedezyner/images/a/a9/ChatPluginsRefreshButton.png" height="32px"/></a>');
				$("#chatRefreshButton").click(function() {
					chatPlugins.reload();
				});
				function disableF5(e) { 
					if ((e.which || e.keyCode) == 116) {
						e.preventDefault();
						chatPlugins.reload();
					}
				};
				$(document).on("keydown", disableF5);
			}
			
			$("#chatPluginsButton").click(chatPlugins.menu.open);
			chatPlugins.loading = false;
			chatPlugins.loaded = true;
			var bgcolor = $("body").css("background-color");
			bgcolor = bgcolor.substring(4, bgcolor.length-1).replace(/ /g, '').split(',');
			var bgbrightness = Math.round(((parseInt(bgcolor[0]) * 299) + (parseInt(bgcolor[1]) * 587) + (parseInt(bgcolor[2]) * 114)) /1000);
			if (bgbrightness < 125) {
				$("#chatPluginsInfo").css("color","white");
				$("#chatPluginsInfoLink").css("color","lightblue");
			}
			else {
				$("#chatPluginsInfo").css("color","black");
				$("#chatPluginsInfoLink").css("color","#006cb0");
			}
			console.log('[OPTIONS] Loading successful');
		}
	  
	},
	alert: function(text) {
		newInlineAlert = new models.InlineAlert;
		newInlineAlert.attributes.text = text;
		mainRoom.model.chats.add(newInlineAlert);
	},
	settings:  {
		open: function(title,content,width,save) {
			 $.showCustomModal( title, '<form method="" name="" class="WikiaForm "><fieldset><div id="settingsHeader"></div>' + content + '</fieldset></form>', {
				id: "settingsWindow",
					width: width,
					buttons: [
						{
							id: "cancel",
							message: "Cancel",
							handler: chatPlugins.settings.cancel
						},
						{
							id: "save",
							defaultButton: true,
							message: "Save",
							handler: save
						}
					]
			});
			$(".close").click(chatPlugins.settings.cancel);
			$(".blackout:not(.chatPlugins)").addClass("chatSettings")
		},
		cancel: function() {
			$('#settingsWindow').remove();
			$(".blackout.chatSettings").remove()
		}
	},
	reload: function() {
		window.chatwindow = window.open('/wiki/Special:Chat?useskin=wikia', wgDBname + 'chat' + Math.round(Math.random()*100));
			window.chatwindow.onload = function () {
				window.chatwindow.importScriptPage('User:' + wgUserName + '/global.js', 'c');
				window.chatwindow.importScriptPage('User:' + wgUserName + '/wikia.js');
				if (api.functions.getPageContents("MediaWiki:Chat.js").indexOf("Stable/ChatPlugins/code.js")==-1) {
					window.chatwindow.chatPluginsCustom = {
						loadedFrom: chatPluginsCustom.loadedFrom
					}
					window.chatwindow.importScriptPage('Testing/ChatPlugins/code.js', 'gamedezyner');
				}
			}
		window.chatwindow.closeopener = true;
	}
	
};
// Append Chat Options Button to header


// Register our Modules
// Pings
chatPlugins.modules.pings = new chatPlugins.module("Pings", "MediaWiki:CustomChatPings/code.js", "dev");
// Multi PM
chatPlugins.modules.multiPM = new chatPlugins.module("Multi PM", "Mediawiki:chat.js/multiPM.js", "clubpenguin");
// Multi Kick
chatPlugins.modules.multiKick = new chatPlugins.module("Multi Kick", "Mediawiki:chat.js/multiKick.js", "clubpenguin");
chatPlugins.modules.multiKick.modOnly = true;
// Chat Style
chatPlugins.modules.style = new chatPlugins.module("Style", "Mediawiki:chat.js/style.js", "clubpenguin");
// Tab Complete
chatPlugins.modules.tabComplete = new chatPlugins.module("Tab Complete", "Mediawiki:chat.js/tabComplete.js", "clubpenguin");
// Chat Hacks
chatPlugins.modules.chatHacks = new chatPlugins.module("Chat Hacks", "Mediawiki:chat.js/chatHacks.js", "clubpenguin");
// Search Bar
chatPlugins.modules.searchBar = new chatPlugins.module("Search Bar", "Mediawiki:chat.js/searchBar.js", "clubpenguin");
// Slash Commands
chatPlugins.modules.slashCommands = new chatPlugins.module("Slash Commands", "Mediawiki:chat.js/slashCommands.js", "clubpenguin");
// Pin Tracker
chatPlugins.modules.pinTracker = new chatPlugins.module("the Pin Tracker", "Mediawiki:chat.js/pinTracker.js", "clubpenguin");
// Speed Emoticon
chatPlugins.modules.speedEmoticon = new chatPlugins.module("Speed Emoticon", "Mediawiki:chat.js/speedEmoticon.js", "clubpenguin");

// Load API plugin
if (typeof(api)=="undefined") {
	importScriptPage('Mediawiki:chat.js/API.js', 'clubpenguin');
}
// If this is a reloaded window, kill old window
if (window.opener!=null) {
	if(typeof(window.closeopener)!="undefined") {
		window.opener.close();
	}
}
// Initialize the script
chatPlugins.load();