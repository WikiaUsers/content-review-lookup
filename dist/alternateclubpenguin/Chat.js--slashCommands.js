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
chatPlugins.modules.slashCommands.settingsID = "slashCommandSettings";
chatPlugins.modules.slashCommands.settingsFunction = function() { 
	chatPlugins.settings.open("Slash Commands",'<div>List your slash commands here, one on each line with the command and its content separated by a single colon.</div><div>Please note that only the first colon (:) will be counted as the divider! The following characters will automatically be removed to prevent errors: <font color="red"><code>\" \' \\</code></font></div><div>Slash Commands formatting:<font color="red"><code>COMMAND:VALUE</code></font></div><textarea name="slashCommandsInput" id="slashCommandsInput" style="height:200px;width:580px;margin:5px;vertical-align:top;"></textarea><div>Mess something up? <a id="slashCommandsReset" href="#">Click Here</a> to restore the default commands.</div><div>This control panel edits <a href="/wiki/Special:MyPage/monobook.js" target="_new">this page</a> when you click save.</div>',600,function() {
		chatPlugins.pages.list.slashCommands.value = chatPlugins.modules.slashCommands.parse($("#slashCommandsInput").val().replace(/\"/gm,"\\\""));
		chatPlugins.pages.save();
		chatPlugins.modules.slashCommands.load();
		chatPlugins.settings.cancel();
		}
	)
	$("#slashCommandsInput").val(chatPlugins.modules.slashCommands.unparse(chatPlugins.pages.list.slashCommands.value));
	$("#slashCommandsReset").click(chatPlugins.modules.slashCommands.defaults);
}
chatPlugins.modules.slashCommands.unparse =  function(input) {
	str = input.replace(/^\{\"/g,""); //Remove leading bracket and quote
	str = str.replace(/"}$/g,""); //Remove trailing bracket and quote
	str = str.replace(/\"\:\"/g,":"); //Remove quotes around colons
	str = str.replace(/\"\,\"/g,"\n"); //Replace commas with line breaks
	return str;
}
chatPlugins.modules.slashCommands.parse =  function(input) {
	var result = "";
	input = input.replace(/[\\\"\']/gm,"");	
	for (i in input.match(/^[^$]+?$/gm)) {
		var str = input.match(/^[^$]+?$/gm)[i];
		result += "\"" + str.slice(0,input.match(/^[^$]+?$/gm)[i].indexOf(":")) + "\":\"" + str.slice(input.match(/^[^$]+?$/gm)[i].indexOf(":")+1,input.match(/^[^$]+?$/gm)[i].length) + "\"";
		if (i < input.match(/^[^$]+?$/gm).length-1) {
			result += ",";
		}
	}
	result = "{" + result + "}";
	return result;
}
chatPlugins.modules.slashCommands.defaults =  function() {
	if (confirm("Are you sure you want to erase your current slash commands?")==true) {
		chatPlugins.pages.list.slashCommands.value = '{"rules":"Please read the [[Club_Penguin_Wiki:Policy/Chat|rules]]!","snowball":"/me throws you a snowball!","help":"I need help!","coppa":"http://coppa.org - You must be 13 or older to legally have an account on Wikia.","haigb":"Her aim is getting better!"}';
		chatPlugins.pages.save();
		chatPlugins.modules.slashCommands.commands = JSON.parse(chatPlugins.pages.list.slashCommands.value);
		$("#slashCommandsInput").val(chatPlugins.modules.slashCommands.unparse(chatPlugins.pages.list.slashCommands.value));
	}
}
chatPlugins.modules.slashCommands.load = function() {
	chatPlugins.pages.list.slashCommands = {name:"SlashCommands"};
	chatPlugins.pages.load();
	if (chatPlugins.pages.list.slashCommands.value == "error") {
		chatPlugins.pages.list.slashCommands.value = '{"rules":"Please read the [[Club_Penguin_Wiki:Policy/Chat|rules]]!","snowball":"/me throws you a snowball!","help":"I need help!","coppa":"http://coppa.org - You must be 13 or older to legally have an account on Wikia.","haigb":"Her aim is getting better!"}';
		chatPlugins.pages.save();
	}
	chatPlugins.modules.slashCommands.commands = JSON.parse(chatPlugins.pages.list.slashCommands.value);
}
chatPlugins.modules.slashCommands.test = function(input) {
	commandkeys = Object.keys(chatPlugins.modules.slashCommands.commands)
	result = input;
	for (i in commandkeys) {
		match = new RegExp("^\/"+commandkeys[i] + "$", "i");
		if (input.match(match) != null) {
			result = chatPlugins.modules.slashCommands.commands[commandkeys[i]];
		}
	}
	return result;
}

//Alter default sendMessage behavior so we can look for slash commands before sending them
NodeChatController.prototype.sendMessage = function(event) {
    if (this.active && event.which == 13 && !event.shiftKey) {
        var inputField = $(event.target),
            inputValue = inputField.val(),
            inputValueLength = inputValue.length;
        event.preventDefault();
		inputValue = chatPlugins.modules.slashCommands.test(inputValue);
        if (inputValue.length && inputValueLength <= this.maxCharacterLimit && inputValue.match(/^\/(?!me\s)/)==null) {
            var chatEntry = new models.ChatEntry({
                roomId: this.roomId,
                name: wgUserName,
                text: inputValue
            });
            if (!this.isMain()) {
                if (this.afterInitQueue.length < 1 || this.model.users.length < 2) {
                    this.mainController.socket.send(this.model.privateRoom.xport());
                }
                if (!this.isInitialized) {
                    this.afterInitQueue.push(chatEntry.xport());
                    chatEntry.set({
                        temp: true,
                        avatarSrc: wgAvatarUrl
                    });
                    this.model.chats.add(chatEntry);
                } else {
                    this.socket.send(chatEntry.xport());
                }
            } else {
                this.socket.send(chatEntry.xport());
            }
            inputField.val('').focus();
            $('body').removeClass('warn limit-near limit-reached');
        }
    }
}
mainRoom.viewDiscussion.unbind('sendMessage');
mainRoom.viewDiscussion.bind('sendMessage', $.proxy(mainRoom.sendMessage, mainRoom));
chatPlugins.modules.slashCommands.load();

console.log("[OPTIONS] slashCommands: Loaded");