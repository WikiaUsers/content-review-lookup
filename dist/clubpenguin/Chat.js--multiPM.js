chatPlugins.modules.multiPM.open = function() {
	var $multiPMWindowHTML = $.showCustomModal( "Multi PM", '<form method="" name="" class="WikiaForm "><fieldset><div id="multiPMHeader">Select the users you would like to PM:</div><div id="multiPMNames" style="height:250px;overflow-y:scroll;"><table id="multiPMUserTable"></div></fieldset></form>', {
	      id: "multiPMWindow",
	      width: 400,
	      buttons: [
		  {
		  id: "cancel",
		  message: "Cancel",
		  handler: function () {
		    chatPlugins.modules.multiPM.cancel();
		    }
		  },
		  {
		  id: "chatPlugins.modules.multiPM.start",
		  defaultButton: true,
		  message: "Start",
		  handler: function () {
		    chatPlugins.modules.multiPM.start();
		    }
		  }
	      ]
	});
  $(".close").click(chatPlugins.modules.multiPM.cancel);
  $('body').append('<div style="height: 100%; width: 100%; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
  multiPMUserTable = ""
  for (i=0;i<Object.keys(mainRoom.model.users._byCid).length;i++) {
	if (i%2) {
		multiPMUserTable += '<td style="padding:2px;"><label><input class="multiPMUser" type="checkbox" name="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '" value="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '"/><img src="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.avatarSrc + '" style="vertical-align:middle;padding:2px;" />' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '</label></td>';
		multiPMUserTable += '</tr>';
	}
	else {
		multiPMUserTable += '<tr>';
		multiPMUserTable += '<td style="padding:2px;"><label><input class="multiPMUser" type="checkbox" name="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '" value="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '"/><img src="' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.avatarSrc + '" style="vertical-align:middle;padding:2px;" />' + mainRoom.model.users._byCid[Object.keys(mainRoom.model.users._byCid)[i]].attributes.name + '</label></td>';
	}
  }
	if ((Object.keys(mainRoom.model.users._byCid).length % 2)!=1) {
		multiPMUserTable += '</tr>';
	}
	$('#multiPMUserTable').append(multiPMUserTable);
}
chatPlugins.modules.multiPM.cancel = function() {
	$('#multiPMWindow').remove();
	$('.blackout').remove();
}
chatPlugins.modules.multiPM.start = function() {
	if ($(".multiPMUser:checked").length == 0) {
		$("#multiPMHeader").css("color", "red").css("font-weight", "bold");
		return;
	}
	else {
		users = [];
		for (i=0;i<$(".multiPMUser:checked").length;i++) {
			users.push($(".multiPMUser:checked")[i].value);
		}
		mainRoom.openPrivateChat(users);
		chatPlugins.modules.multiPM.cancel();
	}
}
if( !$("#multiPMButton").length ) {
  $('form#Write').append('<a class="wikia-button" href="#" id="multiPMButton" style="position:absolute; right:52px; top:22px;">Multi PM</a>');
}
$("#multiPMButton").click(chatPlugins.modules.multiPM.open);

console.log("[OPTIONS] Multi PM: Loaded");