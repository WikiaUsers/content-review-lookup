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