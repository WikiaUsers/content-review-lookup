/*
	Chat+ 1.6.6.8 (23.07.2016)
 
	Stuff that needs to be changed:
	* Implement Sound Pick Menu
	(* Implement different Sounds)
 
	(c) Spycrab0 - 2015
*/

var chatPlusVersion = "1.6.6.8";
var settingsVisible=false;
var enableNotificationSound = {
	main: false,
	pm: false
};
var enableDesktopNotification = {
	main: false,
	pm: false
};
var notifications = [];
var notificationRemoveTime = 3500;
var defaultNotificationIcon = $("link[rel='shortcut icon']").attr('href');
var notificationAudio = new Audio("https://images.wikia.nocookie.net/creepypasta/de/images/8/85/Notification1.ogg");
 
/* Loading Font Awesome */
importStylesheetURI("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");
 
/* Generate Interface */
 
/* Settings Div */
 
var settingsDiv = $("<div/>").css({
	position: "absolute",
	display: "none",
	backgroundColor: "rgba(0,0,0,0.5)",
	color: "white",
	top: "56px",
	right: "160px",
	width: "240px",
	borderRadius: "5px",
	borderStyle: "solid",
	borderColor: "rgba(255,255,255,0.5)",
	borderWidth: "1px",
	wordWrap: "break-word",
	userSelect: "none",
	mozUserSelect: "none",
	webkitUserSelect: "none",
	msUserSelect: "none"
}).append($("<table/>")
	.append($("<tr/>")
		.append($("<th/>"))
		.append($("<th/>",{
			text: "Desktop"
		}).css("cursor","default"))
		.append($("<th/>",{
			text: "Ton"
		}).css("cursor","default")
			.append($("<span/>")
				.css({
					display: "block",
					width: "50px"
				})
			)
		)
	)
	.append($("<tr/>")
		.append($("<td/>",{
			text: "Hauptchat"
		}).css("cursor","default"))
		.append($("<td/>")
			.append($("<center/>")
			  .append($("<span/>",{id: "mainDesktop"})
					  .css({
						  cursor: "pointer",
						  color: "gray",
						  fontSize: "23px"
					  })
					  .addClass('fa fa-times')
					  .on("click",function() {
						  if ($(this).hasClass("fa-check")) {
								$(this)
									.removeClass("fa-check")
									.addClass("fa-times")
									.css("color","gray");
						  } else {
								$(this)
									.removeClass("fa-times")
									.addClass("fa-check")
									.css("color","red");
						  }	  
						  if ($(this).hasClass("fa-check")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						  } else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						  }
						  enableDesktopNotification.main=$(this).hasClass("fa-check");
					  })
					.mouseenter(function() {
						if ($(this).hasClass("fa-check")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						} else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						}
					})
					.mouseleave(function() {
						$(this).css("text-shadow","none");
					})
			  )
			 )
		)
		.append($("<td/>")
			.append($("<center/>")
			  .append($("<span/>",{id: "mainSound"})
			  		  .css({
						  cursor: "pointer",
						  color: "gray",
						  fontSize: "25px"
					  })
					  .addClass('fa fa-volume-off')
					  .on("click",function() {
						  if ($(this).hasClass("fa-volume-up")) {
								$(this)
									.removeClass("fa-volume-up")
									.addClass("fa-volume-off")
									.css("color","gray");
						  } else {
								$(this)
									.removeClass("fa-volume-off")
									.addClass("fa-volume-up")
									.css("color","red");
						  }	  
						  if ($(this).hasClass("fa-volume-up")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						  } else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						  }
						  enableNotificationSound.main=$(this).hasClass("fa-volume-up");
					  })
					.mouseenter(function() {
						if ($(this).hasClass("fa-volume-up")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						} else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						}
					})
					.mouseleave(function() {
						$(this).css("text-shadow","none");
					})
			  )
			)
		)
	)
	.append($("<tr/>")
		.append($("<td/>",{
			text: "Private Nachrichten (defekt)"
		})
			.css({
				fontSize: "12px",
				cursor: "default"
			})
		)
		.append($("<td/>")
			.append($("<center/>")
			  .append($("<span/>",{id: "pmDesktop"})
					  .css({
						  cursor: "pointer",
						  color: "gray",
						  fontSize: "23px"
					  })
					  .addClass('fa fa-times')
					  .on("click",function() {
						  if ($(this).hasClass("fa-check")) {
								$(this)
									.removeClass("fa-check")
									.addClass("fa-times")
									.css("color","gray");
						  } else {
								$(this)
									.removeClass("fa-times")
									.addClass("fa-check")
									.css("color","red");
						  }	  
						  if ($(this).hasClass("fa-check")) {
							  $(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						  } else {
							  $(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						  }
						  enableDesktopNotification.pm=$(this).hasClass("fa-check");
					  })
					.mouseenter(function() {
						if ($(this).hasClass("fa-check")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						} else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						}
					})
					.mouseleave(function() {
						$(this).css("text-shadow","none");
					})
			  )
			 )
		)
		.append($("<td/>")
			.append($("<center/>")
			  .append($("<span/>",{id: "pmSound"})
					  .css({
						  cursor: "pointer",
						  color: "gray",
						  fontSize: "25px"
					  })
					  .addClass('fa fa-volume-off')
					  .on("click",function() {
						  if ($(this).hasClass("fa-volume-up")) {
								$(this)
									.removeClass("fa-volume-up")
									.addClass("fa-volume-off")
									.css("color","gray");
						  } else {
								$(this)
									.removeClass("fa-volume-off")
									.addClass("fa-volume-up")
									.css("color","red");
						  }	  
						  if ($(this).hasClass("fa-volume-up")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						  } else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						  }
						  enableNotificationSound.pm=$(this).hasClass("fa-volume-up");
					  })
					.mouseenter(function() {
						if ($(this).hasClass("fa-volume-up")) {
							$(this).css("text-shadow","-1px 1px 8px red, 1px -1px 8px red");
						} else {
							$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
						}
					})
					.mouseleave(function() {
						$(this).css("text-shadow","none");
					})
			  )
			)
		)
	)
)
.append($("<span/>",{
	})
		.css({
			position: "relative",
			bottom: "2px",
			left: "10px",
			cursor: "default",
			fontSize: "25px",
			marginRight: "15px"
		})
		.addClass("fa fa-volume-up")
)
.append($("<span/>",{
	id: "volumeString",
	text: "100"
})
	.css({
		cursor: "default",
		display: "inline-block",
		position: "relative",
		bottom: "5px",
		width: "65px",
		fontSize: "17px",
		textAlign: "center"
	})
)
.append($("<input/>",{
	id: "volumeBar",
	type: "range",
	min: 0,
	max: 100,
	value: 100
})
	.css({
		display: "inline-block",
		cursor: "pointer",
		width: "120px"
	})
	.on("change",function() {
		notificationAudio.volume=this.value/100;
		$("#volumeString")[0].innerHTML = this.value;
	})
)
.append($("<button/>",{
	text: "Speichern"
})
.css({
	float: "right",
	position: "relative",
	bottom: "2px",
	right: "2px"
})
.on("click",function() {
	$.post("/api.php", {
		format: "json",
		action: "query",
		prop: "info|revisions",
		rvlimit: 1,
		intoken: "edit",
		titles: "User:"+wgUserName+"/chatPlusSettings.json",
	},function(response) {
		var revId = eval("for (var i in response.query.pages) {};i");
		var timestamp = response.query.pages[revId].starttimestamp;
		var edittoken = response.query.pages[revId].edittoken;
		$.post("/api.php",{
			format: "json",
			action: "edit",
			title: "User:"+wgUserName+"/chatPlusSettings.json",
			section: 0,
			text: JSON.stringify({
				desktopNotification: enableDesktopNotification,
				soundNotification: enableNotificationSound,
				volume: 1*$("#volumeString")[0].innerHTML
			}),
			summary: "Chat+ Einstellungen",
			token: edittoken
		},function(response) {
			if (response.edit.result == "Success") {
				alert("Einstellungen gespeichert.");
			} else {
				alert("Fehler beim Speichern aufgetreten! (api.php/SAVE2/"+response.edit.result);
			}
		}).fail(function() {
			alert("Fehler beim Speichern aufgetreten! (api.php/SAVE)");
		});
	}).fail(function() {
		alert("Fehler beim Speichern aufgetreten! (api.php/TOKEN)");
	})
})
)
.append($("<span/>",{
	text: "Chat+ "+chatPlusVersion
})
	.css({
		display: "inline-block",
		color: "lightgray",
		fontStyle: "italic",
		position: "relative",
		top: "4px"
	})
).appendTo(document.body);
 
/* Settings Button */
 
var settingsButton = $("<span/>")
.css({
	position: "absolute",
	cursor: "pointer",
	color: "white",
	top: "20px",
	right: "165px",
	height: "25px",
	width: "25px"
})
.mouseenter(function() {
   if (settingsVisible) {
		$(this).css("color","rgb(100,0,0)");
		$(this).css("text-shadow","-1px 1px 16px red, 1px -1px 16px red");
   } else {
		$(this).css("text-shadow","-1px 1px 8px gray, 1px -1px 8px gray");
   }
}).mouseleave(function() {
   if (settingsVisible) {
	   $(this).css("color","rgb(220,0,0)");
   }
   $(this).css("text-shadow","none");
})
.on("click",function() {
	if (settingsDiv.is(":visible")) {
		settingsVisible=false;
		settingsDiv.fadeOut(250);
		settingsButton.css("color","white")
		              .css("text-shadow","none");
	} else {
		settingsVisible=true;
		settingsDiv.fadeIn(250);
		settingsButton.css("color","rgb(100,0,0)")
		              .css("text-shadow","-1px 1px 16px red, 1px -1px 16px red");
	}
})
.addClass("fa fa-2x fa-cog").appendTo(document.body);
 
/* Chat Patch */
 
function patchChat(chat) {
	if (chat == undefined) return;
	if (chat.patched) return false;
	chat.socket.fire = function(e,f) {
		this.handler.event(f);
		var a = Array.prototype.slice.call(arguments, 1);
		if (!this.events[e])
               return true;
        var ee = this.events[e];
        for (var i = 0; i < ee.length; i++) {
			if (typeof ee[i].fn == 'function') {
				var scope = ee[i].scope || this;
                if (ee[i].fn.apply(scope, a) === false) {
					return false;
                }
            }
        }
		return true;
	};
	chat.socket.handler = {
		main: chat.isMain(),
		event: function(e) {
			var evt = JSON.parse(e.data).attrs;
			var evtName = e.event;
			if (evtName === "chat:add") this.onMessage(evt);
			if (evtName === "join") this.onJoin(evt);
			if (evtName === "updateUser") this.onUserStatusChanged(evt);
			if (evtName === "part") this.onLeave(evt);
			if (evtName === "openPrivateRoom") this.onPrivateRoom(evt);
		},
		onMessage: function(evt) {
			if (evt.name == mainRoom.userMain.attributes.name) return;
			showNotification((this.main ? "" : "[PM]")+evt.name+": \n"+evt.text,{icon: evt.avatarSrc},true,this.main);
		},
		onJoin: function(evt) {
			if (this.main) showNotification(evt.name+" ist dem Chat beigetreten.",{icon: evt.avatarSrc},true,this.main);
		},
		onLeave: function(evt) {
			if (this.main) showNotification(evt.name+" hat den Chat verlassen.",{icon: defaultNotificationIcon},true,this.main);
		},
		onUserStatusChanged: function(evt) {
			if (evt.name == mainRoom.userMain.attributes.name) return;
			showNotification(evt.name+" ist nun "+(evt.active ? "anwesend" : "abwesend"),{icon: evt.avatarSrc},false,this.main);
		},
		onPrivateRoom: function(evt) {
            return;
			var user = (evt.users.indexOf(mainRoom.userMain.attributes.name) ? evt.users[0] : evt.users[1]);
			var userIcon;
			try {
				userIcon=mainRoom.model.users.findByName(user).attributes.avatarSrc;
			} catch (e) {
				userIcon="";
			}
			if (evt.name == mainRoom.userMain.attributes.name) return;
			setTimeout(function() {
				if(patchChat(mainRoom.chats.privates[evt.roomId])) {
					if (!evt.active) showNotification("Privatchat mit "+user+" geöffnet",{icon: userIcon},false,this.main);
				}
			},5000);
		}
	};
	if (false) {
        chat.openPrivateChat = function(message) {
            var room = new models.OpenPrivateRoom();
            room.mport(message.data);
            this.socket.handler.onPrivateRoom(message.data);
            var users = room.get('users');
            for (var i = 0; i < users.length; i++) {
                if (users[i] != wgUserName) {
                    var blockedUser = this.model.blockedUsers.findByName(users[i]);
                    if (typeof(blockedUser) != 'undefined' && blockedUser.get('name') == users[i]) {
                        return;
                    }
                }
            }
            if (typeof(this.chats.privates[room.get('roomId')]) == 'undefined') {
                this.baseOpenPrivateRoom(room, false);
        }
            this.chats.privates[room.get('roomId')].init();
        };
        /*
		chat.openPrivateChat = function(users) {
        users.push(wgUserName);
        $.ajax({
            type: 'POST',
            url: wgScript + '?action=ajax&rs=ChatAjax&method=getPrivateRoomID',
            data: {
                users: JSON.stringify(users)
            },
            success: $.proxy(function(data) {
                $().log("Attempting create private room with users " + users.join(','));
                var data = new models.OpenPrivateRoom({
                    roomId: data.id,
                    users: users
                });
                this.baseOpenPrivateRoom(data, true);
                this.showRoom(data.get('roomId'));
				this.chats.privates[data.get('roomId')].init();
				data.attributes.active=true;
				this.socket.handler.onPrivateRoom(data.attributes);
			}, this)
        });
        this.viewUsers.hideMenu();
		};
        */
	}
	chat.patched=true;
	return true;
}
 
/* Functions */
 
function showNotification(text,options,sound,main) {
	if (main && enableNotificationSound.main || !main && enableNotificationSound.pm) notificationAudio.play();
	if (main && !enableDesktopNotification.main) return;
	if (!main && !enableDesktopNotification.pm) return;
	notifications[notifications.length] = new Notification(text,options);
	setTimeout(function() {
		if (notifications.length > 0) {
			notifications[0].close();
			notifications.splice(0,1);
		}
	},notificationRemoveTime);
}
 
/* Load Settings */
 
$.post("/api.php",{
	format: "json",
	action: "query",
	prop: "revisions",
	rvprop: "user|content",
	rvlimit: 1,
	titles: "User:"+wgUserName+"/chatPlusSettings.json"
},function(response) {
	var revId = eval("for (var i in response.query.pages) {};i");
	if (response.query.pages[revId].missing != undefined) {return;}
	var revUsername = response.query.pages[revId].revisions[0].user;
	var revJSON = JSON.parse($.parseHTML(response.query.pages[revId].revisions[0]['*'])[0].data);
	if (wgUserName == revUsername) {
		enableDesktopNotification = revJSON.desktopNotification;
		enableNotificationSound = revJSON.soundNotification;
		notificationAudio.volume = revJSON.volume/100;
		$("#volumeString")[0].innerHTML = revJSON.volume;
		$("#volumeBar").attr("value",revJSON.volume);
		$("#mainDesktop")
				.removeClass("fa-times")
				.addClass((revJSON.desktopNotification.main ? "fa-check" : "fa-times"))
				.css("color",(revJSON.desktopNotification.main ? "red" : "gray"));
		$("#mainSound")
				.removeClass("fa-volume-off")
				.addClass((revJSON.soundNotification.main ? "fa-volume-up" : "fa-volume-off"))
				.css("color",(revJSON.soundNotification.main ? "red" : "gray"));
		$("#pmDesktop")
				.removeClass("fa-times")
				.addClass((revJSON.desktopNotification.pm ? "fa-check" : "fa-times"))
				.css("color",(revJSON.desktopNotification.pm ? "red" : "gray"));
		$("#pmSound")
				.removeClass("fa-volume-off")
				.addClass((revJSON.soundNotification.pm ? "fa-volume-up" : "fa-volume-off"))
				.css("color",(revJSON.soundNotification.pm ? "red" : "gray"));
		console.log("Einstellungen erfolgreich geladen.");
	} else {
		alert("Jemand scheint an deinen Einstellungen rumgepfuscht zu haben.\nMelde das bitte umgehend einem Admin und speichere deine Einstellungen erneut ab um diesen Fehler zu beheben.\n");	
	}
}).fail(function() {
	console.log("Einstellungen wurden aufgrund eines Fehlers nicht geladen.");
});
 
/* Patching */
 
patchChat(mainRoom);
 
/* END OF Chat+ */